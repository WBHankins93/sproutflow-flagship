# Vercel Blob Storage Setup Guide

This guide will help you migrate your images from GitHub to Vercel Blob Storage for faster load times.

## Prerequisites

1. A Vercel account with a Blob Store created
2. Your `BLOB_READ_WRITE_TOKEN` from the Vercel dashboard

## Step 1: Get Your Blob Store Token

1. Go to [Vercel Dashboard > Storage](https://vercel.com/dashboard/storage)
2. Select your Blob Store (or create one if you haven't)
3. Copy the `BLOB_READ_WRITE_TOKEN` from the `.env.local` section

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root of your project:

```bash
BLOB_READ_WRITE_TOKEN=your_token_here
```

**Note:** After running the upload script, it will provide you with the `NEXT_PUBLIC_BLOB_STORE_URL` to add to your `.env.local` file.

## Step 3: Upload Images to Blob Storage

Run the upload script:

```bash
npx tsx scripts/upload-images-to-blob.ts
```

This script will:
- Find all image files in `public/images/`
- Upload them to Vercel Blob Storage
- Preserve the directory structure
- Show you the `NEXT_PUBLIC_BLOB_STORE_URL` to add to your `.env.local`

## Step 4: Add Blob Store URL to Environment

After the upload completes, add the provided URL to your `.env.local`:

```bash
BLOB_READ_WRITE_TOKEN=your_token_here
NEXT_PUBLIC_BLOB_STORE_URL=https://your-blob-store-url.vercel-storage.com
```

## Step 5: Update Vercel Environment Variables

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add both variables:
   - `BLOB_READ_WRITE_TOKEN` (for server-side operations)
   - `NEXT_PUBLIC_BLOB_STORE_URL` (for client-side image URLs)

## Step 6: Deploy

After setting up the environment variables, deploy your project:

```bash
git add .
git commit -m "Migrate images to Vercel Blob Storage"
git push
```

Vercel will automatically use the environment variables during build.

## How It Works

- **Development**: Images are served from `/public/images/` (local files)
- **Production**: Images are served from Vercel Blob Storage (CDN)
- The `getImageUrl()` utility function handles the switching automatically

## Benefits

✅ Faster load times (CDN delivery)  
✅ Reduced GitHub repo size  
✅ Better scalability  
✅ Automatic image optimization via Next.js Image component  

## Troubleshooting

### Images not loading in production
- Verify `NEXT_PUBLIC_BLOB_STORE_URL` is set in Vercel environment variables
- Check that images were successfully uploaded (check the upload script output)
- Ensure `next.config.js` includes the blob storage domain in `remotePatterns`

### Upload script fails
- Verify `BLOB_READ_WRITE_TOKEN` is correct
- Check that you have write permissions to the Blob Store
- Ensure the token hasn't expired

## Future Image Uploads

For new images:
1. Add them to `public/images/` (for local development)
2. Run the upload script again to sync to Blob Storage
3. The script will skip already-uploaded images (or you can modify it to handle updates)

