# Add Environment Variable to Vercel

Your `NEXT_PUBLIC_BLOB_STORE_URL` is set locally but needs to be added to Vercel for production.

## Quick Steps:

1. Go to: https://vercel.com/dashboard
2. Select your project: **sproutflow-flagship**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key**: `NEXT_PUBLIC_BLOB_STORE_URL`
   - **Value**: `https://kektfntppap5yky4.public.blob.vercel-storage.com`
   - **Environment**: ✅ Production, ✅ Preview, ✅ Development
6. Click **Save**

## After Adding:

**You MUST redeploy** for the environment variable to take effect:

1. Go to **Deployments** tab
2. Click the **⋯** (three dots) on your latest deployment
3. Click **Redeploy**

Or simply push a new commit to trigger a new deployment.

## Verify:

After redeploying, check your site. Images should load from:
`https://kektfntppap5yky4.public.blob.vercel-storage.com/images/...`

