// Explicit optimized derivatives ship with the site; other assets keep their blob/local fallback.
import optimizedImages from './optimized-images.json';

/**
 * Get the blob URL for an image
 * Known optimized assets resolve locally in every environment.
 * Unmapped assets use Vercel Blob Storage when configured, otherwise local paths.
 */
export function getBlobImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  const optimized = (optimizedImages as Record<string, string>)[cleanPath];
  if (optimized) return optimized;

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
  const cleanPath = path.replace(/^\//, '');
  const imagePath = cleanPath.startsWith('images/') ? cleanPath : `images/${cleanPath}`;
  return getBlobImageUrl(imagePath);
}

