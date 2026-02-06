// scripts/delete-blob-image.ts - Delete an image from Vercel Blob Storage
// Usage: npx tsx scripts/delete-blob-image.ts <image-path>
// Example: npx tsx scripts/delete-blob-image.ts images/case-studies/title-background.png

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { del } from '@vercel/blob';

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
  console.log('Get your token from: https://vercel.com/dashboard/storage');
  process.exit(1);
}

const imagePath = process.argv[2];

if (!imagePath) {
  console.error('❌ Please provide an image path');
  console.log('Usage: npx tsx scripts/delete-blob-image.ts <image-path>');
  console.log('Example: npx tsx scripts/delete-blob-image.ts images/case-studies/title-background.png');
  process.exit(1);
}

async function deleteImage() {
  try {
    const blobStoreUrl = process.env.NEXT_PUBLIC_BLOB_STORE_URL || 'https://kektfntppap5yky4.public.blob.vercel-storage.com';
    const fullBlobUrl = `${blobStoreUrl}/${imagePath}`;
    
    console.log(`🗑️  Deleting: ${fullBlobUrl}...`);
    
    await del(fullBlobUrl, { token: BLOB_READ_WRITE_TOKEN });
    
    console.log(`✅ Successfully deleted: ${imagePath}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed to delete ${imagePath}: ${errorMessage}`);
    process.exit(1);
  }
}

deleteImage();
