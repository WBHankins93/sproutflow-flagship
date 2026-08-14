#!/usr/bin/env node
/**
 * Asset budget check.
 *
 * Every image the site references is fetched, measured, and checked against the
 * budget for its class. Documentation alone did not stop a 542 KB logo being
 * served into a 40px slot, so this is the enforcement.
 *
 *   npm run check:assets           report only
 *   npm run check:assets -- --ci   exit non-zero on any error
 *
 * Requires NEXT_PUBLIC_BLOB_STORE_URL (see .env.example). Without it the script
 * skips rather than failing, so it never blocks someone who has not set up
 * local env yet.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const CI = process.argv.includes('--ci');

function blobBase() {
  if (process.env.NEXT_PUBLIC_BLOB_STORE_URL) return process.env.NEXT_PUBLIC_BLOB_STORE_URL;
  for (const f of ['.env.local', '.env']) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    const m = readFileSync(p, 'utf8').match(/^NEXT_PUBLIC_BLOB_STORE_URL=(.+)$/m);
    if (m) return m[1].trim();
  }
  return null;
}

/**
 * Budgets per asset class.
 *
 * `maxEdge` is the longest side. Rendered sizes are small, so 2x the largest
 * render is the ceiling; anything past that is a file nobody resized.
 */
const CLASSES = [
  {
    id: 'client-logo',
    match: (p) => /client-logos\//.test(p) && !/-project|-homepage|home-page/.test(p),
    maxBytes: 40 * 1024,
    maxEdge: 400,
    note: 'renders 28 to 56px tall',
  },
  {
    id: 'screenshot',
    match: (p) => /client-logos\/.*(-project|-homepage|home-page)/.test(p),
    maxBytes: 400 * 1024,
    maxEdge: 2000,
    note: 'renders up to 1000px wide',
  },
  {
    id: 'brand-logo',
    match: (p) => /^logo\//.test(p),
    maxBytes: 80 * 1024,
    maxEdge: 800,
    note: 'renders up to 220px wide',
  },
  {
    id: 'photography',
    match: () => true,
    maxBytes: 500 * 1024,
    maxEdge: 2400,
    note: 'renders up to 1200px wide',
  },
];

const classOf = (p) => CLASSES.find((c) => c.match(p));

/** Collect every asset path referenced from the data layer. */
function collectPaths() {
  const paths = new Set();
  const files = ['data/projectProof.ts', 'data/caseStudies.ts', 'data/testimonials.ts'];
  for (const f of files) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    const src = readFileSync(p, 'utf8');
    for (const m of src.matchAll(/'((?:images\/)?(?:work|logo)\/[^']+\.(?:png|jpe?g|webp|avif|svg))'/g)) {
      paths.add(m[1].replace(/^images\//, ''));
    }
  }
  // Brand assets referenced directly in components.
  for (const m of readFileSync(join(ROOT, 'components/layout/Footer.tsx'), 'utf8')
    .matchAll(/getImageUrl\('([^']+)'\)/g)) paths.add(m[1]);
  for (const m of readFileSync(join(ROOT, 'components/layout/Header.tsx'), 'utf8')
    .matchAll(/getImageUrl\('([^']+)'\)/g)) paths.add(m[1]);
  return [...paths].sort();
}

/** Dimensions from the file header. Enough for PNG, JPEG, WebP, GIF. */
function dimensions(buf) {
  if (buf.length < 24) return null;
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: 'png' };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i += 1; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7), type: 'jpeg' };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return { type: 'jpeg' };
  }
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') {
    const fourcc = buf.slice(12, 16).toString();
    if (fourcc === 'VP8X') {
      return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1, type: 'webp' };
    }
    if (fourcc === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1, type: 'webp' };
    }
    if (fourcc === 'VP8 ') {
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff, type: 'webp' };
    }
    return { type: 'webp' };
  }
  return null;
}

const kb = (n) => `${Math.round(n / 1024)}KB`;

const base = blobBase();
if (!base) {
  console.log('check:assets skipped. NEXT_PUBLIC_BLOB_STORE_URL is not set (see .env.example).');
  process.exit(0);
}

const paths = collectPaths();
const rows = [];

for (const path of paths) {
  const url = `${base.replace(/\/$/, '')}/images/${path}`;
  let bytes = 0;
  let dim = null;
  let status = 0;
  try {
    const res = await fetch(url);
    status = res.status;
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      bytes = buf.length;
      dim = dimensions(buf);
    }
  } catch {
    status = 0;
  }

  const cls = classOf(path);
  const edge = dim && dim.w ? Math.max(dim.w, dim.h) : null;
  const problems = [];
  if (status !== 200) problems.push(`HTTP ${status || 'failed'}`);
  else {
    if (bytes > cls.maxBytes) problems.push(`${kb(bytes)} over ${kb(cls.maxBytes)} budget`);
    if (edge && edge > cls.maxEdge) problems.push(`${edge}px longest edge over ${cls.maxEdge}px`);
  }
  rows.push({ path, cls: cls.id, bytes, dim, edge, problems, status });
}

const pad = (s, n) => String(s).padEnd(n);
const widest = Math.max(...rows.map((r) => r.path.length), 10);

console.log('\nAsset budget report\n');
for (const r of rows) {
  const size = r.dim && r.dim.w ? `${r.dim.w}x${r.dim.h}` : r.dim?.type || '?';
  const flag = r.problems.length ? 'FAIL' : ' ok ';
  console.log(`  ${flag}  ${pad(r.path, widest)}  ${pad(r.cls, 12)} ${pad(size, 12)} ${pad(kb(r.bytes), 8)}`);
  for (const p of r.problems) console.log(`        ${p}`);
}

const failed = rows.filter((r) => r.problems.length);
const totalKb = rows.reduce((a, r) => a + r.bytes, 0);
console.log(`\n  ${rows.length} assets, ${kb(totalKb)} total, ${failed.length} over budget.`);
console.log('  Budgets and export requirements: docs/ASSET_SPEC.md\n');

if (failed.length && CI) process.exit(1);
