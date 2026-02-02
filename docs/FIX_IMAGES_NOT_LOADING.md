# Fix: Images Not Loading in Production

If images are uploaded to Vercel Blob Storage but not showing on your website, the `NEXT_PUBLIC_BLOB_STORE_URL` environment variable is likely not set in Vercel.

## Quick Fix Steps

### 1. Get Your Blob Store URL

Run this command locally (make sure you have `BLOB_READ_WRITE_TOKEN` in your `.env.local`):

```bash
npm run get-blob-url
```

This will output the `NEXT_PUBLIC_BLOB_STORE_URL` you need.

### 2. Add Environment Variable to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select your project (`sproutflow-flagship`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key**: `NEXT_PUBLIC_BLOB_STORE_URL`
   - **Value**: (the URL from step 1, e.g., `https://[hash].public.blob.vercel-storage.com`)
   - **Environment**: Select **Production**, **Preview**, and **Development**
6. Click **Save**

### 3. Redeploy

After adding the environment variable, you need to redeploy:

1. Go to **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**

Or push a new commit to trigger a new deployment.

## Alternative: Get URL from Vercel Dashboard

If the script doesn't work, you can get the URL directly:

1. Go to [Vercel Dashboard > Storage](https://vercel.com/dashboard/storage)
2. Click on your blob store (`sproutflow-flagship`)
3. Click on any image in the `images/` folder
4. Copy the URL
5. Remove everything after `/images/` to get the base URL
   - Example: If URL is `https://abc123.public.blob.vercel-storage.com/images/logo.png`
   - Base URL is: `https://abc123.public.blob.vercel-storage.com`

## Verify It's Working

After redeploying, check:
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for image requests - they should be going to `*.vercel-storage.com` domain
5. Check the **Console** for any image loading errors

## Still Not Working?

- Verify the environment variable is set correctly in Vercel
- Check that images are actually in the blob store (Vercel Dashboard > Storage)
- Ensure `next.config.js` has the blob storage domain in `remotePatterns` (already configured)
- Check browser console for CORS or 404 errors

