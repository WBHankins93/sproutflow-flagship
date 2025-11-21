// scripts/get-blob-store-url.ts - Get the blob store URL from Vercel
// Run with: npx tsx scripts/get-blob-store-url.ts

import { list } from '@vercel/blob';

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
  console.log('Get your token from: https://vercel.com/dashboard/storage');
  process.exit(1);
}

async function main() {
  console.log('🔍 Getting blob store URL...\n');
  
  try {
    // List blobs to get the store URL
    const { blobs } = await list({
      token: BLOB_READ_WRITE_TOKEN,
      prefix: 'images/',
      limit: 1,
    });
    
    if (blobs.length === 0) {
      console.log('⚠️  No blobs found. Make sure you\'ve uploaded images first.');
      console.log('Run: npm run upload-images');
      process.exit(1);
    }
    
    const firstBlob = blobs[0];
    const blobUrl = firstBlob.url;
    
    // Extract the base URL (everything before /images/)
    const baseUrl = blobUrl.substring(0, blobUrl.indexOf('/images/'));
    
    console.log('✅ Found blob store URL:');
    console.log('='.repeat(50));
    console.log(`NEXT_PUBLIC_BLOB_STORE_URL=${baseUrl}`);
    console.log('='.repeat(50));
    console.log('\n📝 Add this to your Vercel environment variables:');
    console.log('1. Go to: https://vercel.com/dashboard/[your-project]/settings/environment-variables');
    console.log('2. Add: NEXT_PUBLIC_BLOB_STORE_URL');
    console.log(`3. Value: ${baseUrl}`);
    console.log('4. Make sure it\'s available for Production, Preview, and Development');
    console.log('5. Redeploy your project');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

