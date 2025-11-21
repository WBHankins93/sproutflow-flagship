// lib/blob-images.ts - Utility for Vercel Blob Storage image URLs

/**
 * Get the blob URL for an image
 * In development, falls back to local /images path
 * In production, uses Vercel Blob Storage
 */
export function getBlobImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // In development or if BLOB_STORE_URL is not set, use local images
  if (process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_BLOB_STORE_URL) {
    return `/${cleanPath}`;
  }
  
  // In production, use Vercel Blob Storage
  const blobBaseUrl = process.env.NEXT_PUBLIC_BLOB_STORE_URL;
  return `${blobBaseUrl}/${cleanPath}`;
}

/**
 * Get blob URL for images in the images directory
 */
export function getImageUrl(path: string): string {
  // Ensure path starts with images/
  const imagePath = path.startsWith('images/') ? path : `images/${path}`;
  return getBlobImageUrl(imagePath);
}

