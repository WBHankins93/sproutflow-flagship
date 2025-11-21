// lib/blob-images.ts - Utility for Vercel Blob Storage image URLs

/**
 * Get the blob URL for an image
 * In development, falls back to local /images path
 * In production, uses Vercel Blob Storage
 * Logo images always use local paths (never uploaded to blob storage)
 */
export function getBlobImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Logo images always stay local - never use blob storage
  if (cleanPath.includes('client-logos') || cleanPath.includes('logo/')) {
    return `/${cleanPath}`;
  }
  
  // Check if we have the blob store URL set
  const blobStoreUrl = process.env.NEXT_PUBLIC_BLOB_STORE_URL;
  
  // In development, prefer local images (but allow blob override)
  if (process.env.NODE_ENV === 'development' && !blobStoreUrl) {
    return `/${cleanPath}`;
  }
  
  // If blob store URL is set, use it (production or development with override)
  if (blobStoreUrl) {
    // Ensure the base URL doesn't have a trailing slash
    const baseUrl = blobStoreUrl.endsWith('/') ? blobStoreUrl.slice(0, -1) : blobStoreUrl;
    return `${baseUrl}/${cleanPath}`;
  }
  
  // Fallback to local images if blob URL not set
  return `/${cleanPath}`;
}

/**
 * Get blob URL for images in the images directory
 */
export function getImageUrl(path: string): string {
  // Ensure path starts with images/
  const imagePath = path.startsWith('images/') ? path : `images/${path}`;
  return getBlobImageUrl(imagePath);
}

