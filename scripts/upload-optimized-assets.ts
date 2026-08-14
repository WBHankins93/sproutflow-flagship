// scripts/upload-optimized-assets.ts
//
// Uploads everything staged in optimized-assets/ to Vercel Blob, then prints
// the data-file edits needed for the extension change.
//
//   npx tsx scripts/upload-optimized-assets.ts --dry-run
//   npx tsx scripts/upload-optimized-assets.ts
//
// Needs BLOB_READ_WRITE_TOKEN and NEXT_PUBLIC_BLOB_STORE_URL in .env.local.
//
// The optimised files are WebP, so their paths differ from the PNG originals
// by extension. Old blobs are left in place rather than deleted, so a bad
// upload can be rolled back by reverting the data files alone. Delete them
// once the new assets are confirmed live.

import { config } from 'dotenv';
import { resolve, join, relative } from 'path';
import { readdir, readFile, writeFile, stat } from 'fs/promises';

config({ path: resolve(process.cwd(), '.env.local') });

import { put } from '@vercel/blob';

const STAGE = resolve(process.cwd(), 'optimized-assets');
const DRY = process.argv.includes('--dry-run');
const APPLY = process.argv.includes('--apply-paths');

/** Data files that reference asset paths. */
const DATA_FILES = ['data/projectProof.ts', 'data/caseStudies.ts', 'data/testimonials.ts'];

/**
 * Find the path a data file currently uses for a given asset basename.
 * The originals are a mix of .png, .webp and .jpg, so matching on basename
 * rather than assuming an extension is the only reliable way.
 */
function findCurrentPaths(sources: string[], baseNoExt: string): string[] {
  const hits = new Set<string>();
  const re = new RegExp(`'((?:images/)?${baseNoExt.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&')}\\.[a-z]+)'`, 'g');
  for (const src of sources) for (const m of src.matchAll(re)) hits.add(m[1]);
  return [...hits];
}

async function walk(dir: string): Promise<string[]> {
  const out: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token && !DRY) {
    console.error('BLOB_READ_WRITE_TOKEN is not set in .env.local.');
    console.error('Grab it from the Vercel dashboard: Storage, your blob store, then the tokens tab.');
    process.exit(1);
  }

  let files: string[];
  try {
    files = await walk(STAGE);
  } catch {
    console.error(`Nothing staged at ${STAGE}. Run the optimisation step first.`);
    process.exit(1);
  }

  const renames: Array<[string, string]> = [];
  let uploaded = 0;
  let bytes = 0;

  for (const file of files.sort()) {
    const rel = relative(STAGE, file).split('\\').join('/');
    const blobPath = `images/${rel}`;
    const size = (await stat(file)).size;
    bytes += size;

    if (DRY) {
      console.log(`  would upload  ${blobPath}  (${Math.round(size / 1024)}KB)`);
    } else {
      const body = await readFile(file);
      await put(blobPath, body, {
        access: 'public',
        token,
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      console.log(`  uploaded      ${blobPath}  (${Math.round(size / 1024)}KB)`);
      uploaded += 1;
    }

    if (rel.endsWith('.webp')) renames.push([rel.slice(0, -'.webp'.length), rel]);
  }

  console.log(
    `\n${DRY ? 'Dry run.' : `Uploaded ${uploaded} files,`} ${Math.round(bytes / 1024)}KB total.\n`
  );
  // Resolve what the data files actually reference today.
  const loaded = await Promise.all(
    DATA_FILES.map(async (f) => {
      try {
        return { file: f, src: await readFile(resolve(process.cwd(), f), 'utf8') };
      } catch {
        return { file: f, src: '' };
      }
    })
  );
  const sources = loaded.map((l) => l.src);

  const edits: Array<[string, string]> = [];
  for (const [base, rel] of renames) {
    for (const current of findCurrentPaths(sources, base)) {
      const next = current.startsWith('images/') ? `images/${rel}` : rel;
      if (current !== next) edits.push([current, next]);
    }
  }

  if (!edits.length) {
    console.log('Data files already point at the optimised paths.\n');
  } else if (APPLY && !DRY) {
    for (const { file, src } of loaded) {
      if (!src) continue;
      let next = src;
      for (const [from, to] of edits) next = next.split(`'${from}'`).join(`'${to}'`);
      if (next !== src) {
        await writeFile(resolve(process.cwd(), file), next);
        console.log(`  rewrote       ${file}`);
      }
    }
    console.log('\nData files updated.');
  } else {
    console.log('Path changes needed in the data files:');
    for (const [from, to] of edits) console.log(`  '${from}'  ->  '${to}'`);
    console.log('\nRe-run with --apply-paths to rewrite them automatically.');
  }

  console.log('\nFinally: npm run check:assets\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
