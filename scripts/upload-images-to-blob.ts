// scripts/upload-images-to-blob.ts - Upload images to Vercel Blob Storage
// Run with: npx tsx scripts/upload-images-to-blob.ts

import { put } from '@vercel/blob';
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
    
    console.log(`📤 Uploading: ${blobPath}...`);
    
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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
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
      // Skip logo images - they stay local
      if (relativePath.includes('client-logos') || relativePath.includes('logo/')) {
        console.log(`⏭️  Skipping logo (stays local): ${relativePath}`);
        continue;
      }
      
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

