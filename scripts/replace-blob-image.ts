// scripts/replace-blob-image.ts - Replace a single image in Vercel Blob Storage
// Deletes the existing blob (if any) and uploads the local file at the same path,
// so the URL stays stable. Usage:
//   npx tsx scripts/replace-blob-image.ts images/ben-photo.png
// The path is relative to public/.

import { config } from 'dotenv';
import { resolve, join } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { put, del } from '@vercel/blob';
import { readFile } from 'fs/promises';

const token = process.env.BLOB_READ_WRITE_TOKEN;
const baseUrl = process.env.NEXT_PUBLIC_BLOB_STORE_URL;

async function main() {
  const blobPath = process.argv[2];
  if (!blobPath) {
    console.error('Usage: npx tsx scripts/replace-blob-image.ts <path-relative-to-public>');
    process.exit(1);
  }
  if (!token || !baseUrl) {
    console.error('BLOB_READ_WRITE_TOKEN and NEXT_PUBLIC_BLOB_STORE_URL are required in .env.local');
    process.exit(1);
  }

  const localPath = join(process.cwd(), 'public', blobPath);
  const buffer = await readFile(localPath);

  const fullUrl = `${baseUrl.replace(/\/$/, '')}/${blobPath}`;
  try {
    await del(fullUrl, { token });
    console.log(`Deleted existing blob: ${fullUrl}`);
  } catch (e) {
    console.log(`Delete skipped (may not exist): ${e instanceof Error ? e.message : e}`);
  }

  const blob = await put(blobPath, buffer, {
    access: 'public',
    token,
    addRandomSuffix: false,
  });
  console.log(`Uploaded: ${blob.url} (${(buffer.length / 1024).toFixed(0)} KB)`);
}

main();
