// scripts/upload-images-to-blob.ts - Upload images to Vercel Blob Storage
// Run with: npx tsx scripts/upload-images-to-blob.ts

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { put, del } from '@vercel/blob';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_READ_WRITE_TOKEN) {
  console.error('❌ BLOB_READ_WRITE_TOKEN environment variable is required');
  console.log('Get your token from: https://vercel.com/dashboard/storage');
  process.exit(1);
}

const IMAGES_DIR = join(process.cwd(), 'public', 'images');

interface UploadResult {
  success: boolean;
  path: string;
  url?: string;
  error?: string;
}

async function uploadImage(filePath: string, relativePath: string): Promise<UploadResult> {
  try {
    const fileBuffer = await readFile(filePath);
    const blobPath = `images/${relativePath}`;
    
    // Allow overwrite for logo files since they may be updated
    const isLogoFile = relativePath.includes('logo/');
    
    console.log(`📤 Uploading: ${blobPath}...`);
    
    const blob = await put(blobPath, fileBuffer, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
      ...(isLogoFile && { addRandomSuffix: false }),
    });
    
    console.log(`✅ Uploaded: ${blob.url}`);
    
    return {
      success: true,
      path: blobPath,
      url: blob.url,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // If it's a logo file or nealy-case-study and already exists, delete first then upload
    if (errorMessage.includes('already exists') && (relativePath.includes('logo/') || relativePath.includes('nealy-case-study'))) {
      try {
        const blobPath = `images/${relativePath}`;
        const blobStoreUrl = process.env.NEXT_PUBLIC_BLOB_STORE_URL;
        const fullBlobUrl = blobStoreUrl ? `${blobStoreUrl}/${blobPath}` : `https://kektfntppap5yky4.public.blob.vercel-storage.com/${blobPath}`;
        
        console.log(`🗑️  Deleting existing logo: ${blobPath}...`);
        try {
          await del(fullBlobUrl, { token: BLOB_READ_WRITE_TOKEN });
          console.log(`✅ Deleted existing logo`);
        } catch (deleteError) {
          // If delete fails, continue anyway - might not exist or already deleted
          console.log(`⚠️  Could not delete (may not exist): ${deleteError instanceof Error ? deleteError.message : 'Unknown error'}`);
        }
        
        const fileBuffer = await readFile(filePath);
        console.log(`🔄 Uploading new logo: ${blobPath}...`);
        
        const blob = await put(blobPath, fileBuffer, {
          access: 'public',
          token: BLOB_READ_WRITE_TOKEN,
        });
        
        console.log(`✅ Uploaded: ${blob.url}`);
        
        return {
          success: true,
          path: blobPath,
          url: blob.url,
        };
      } catch (retryError) {
        const retryErrorMessage = retryError instanceof Error ? retryError.message : 'Unknown error';
        console.error(`❌ Failed to overwrite ${relativePath}: ${retryErrorMessage}`);
        return {
          success: false,
          path: relativePath,
          error: retryErrorMessage,
        };
      }
    }
    
    console.error(`❌ Failed to upload ${relativePath}: ${errorMessage}`);
    
    return {
      success: false,
      path: relativePath,
      error: errorMessage,
    };
  }
}

async function getAllImageFiles(dir: string, basePath: string = ''): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
    
    if (entry.isDirectory()) {
      const subFiles = await getAllImageFiles(fullPath, relativePath);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      // Only upload image files
      const ext = entry.name.toLowerCase().split('.').pop();
      if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext || '')) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

async function main() {
  console.log('🚀 Starting image upload to Vercel Blob Storage...\n');
  
  try {
    const imageFiles = await getAllImageFiles(IMAGES_DIR);
    console.log(`Found ${imageFiles.length} image files to upload\n`);
    
    const results: UploadResult[] = [];
    
    for (const filePath of imageFiles) {
      const relativePath = filePath.replace(IMAGES_DIR + '/', '');
      const result = await uploadImage(filePath, relativePath);
      results.push(result);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n📊 Upload Summary:');
    console.log('='.repeat(50));
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log('\n✅ Successfully uploaded images:');
      successful.forEach(r => {
        console.log(`   ${r.path} -> ${r.url}`);
      });
    }
    
    if (failed.length > 0) {
      console.log('\n❌ Failed uploads:');
      failed.forEach(r => {
        console.log(`   ${r.path}: ${r.error}`);
      });
    }
    
    // Generate .env.local content
    if (successful.length > 0) {
      const firstUrl = successful[0].url;
      if (firstUrl) {
        const blobBaseUrl = firstUrl.substring(0, firstUrl.lastIndexOf('/images'));
        console.log('\n📝 Add this to your .env.local file:');
        console.log('='.repeat(50));
        console.log(`NEXT_PUBLIC_BLOB_STORE_URL=${blobBaseUrl}`);
        console.log('='.repeat(50));
      }
    }
    
    console.log('\n✨ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

