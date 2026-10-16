/**
 * Canonical site and asset origins. One source for every absolute URL the site
 * emits: metadataBase, canonicals, sitemap, robots.txt, and JSON-LD.
 *
 * www is the serving host. The apex (https://sproutflow-studio.com) 307s to it,
 * so canonicals and sitemap entries on the apex point crawlers at a redirect.
 */

export const DEFAULT_SITE_URL = 'https://www.sproutflow-studio.com';

/**
 * Public Vercel Blob store that serves everything under public/images (which is
 * gitignored). Same value as NEXT_PUBLIC_BLOB_STORE_URL in .env.example.
 */
export const DEFAULT_BLOB_STORE_URL = 'https://kektfntppap5yky4.public.blob.vercel-storage.com';

function normalizeOrigin(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return (trimmed || fallback).replace(/\/+$/, '');
}

/** NEXT_PUBLIC_SITE_URL when set, else the www origin. Never ends in a slash. */
export function getSiteUrl(value: string | undefined = process.env.NEXT_PUBLIC_SITE_URL): string {
  return normalizeOrigin(value, DEFAULT_SITE_URL);
}

export const SITE_URL = getSiteUrl();

/**
 * Absolute URL for a file under images/ on the Blob store. Unlike getImageUrl()
 * in lib/blob-images.ts, this never falls back to a relative /images path, so it
 * is safe for JSON-LD and anything else read off-site.
 */
export function getAbsoluteImageUrl(
  path: string,
  blobStoreUrl: string | undefined = process.env.NEXT_PUBLIC_BLOB_STORE_URL,
): string {
  const clean = path.replace(/^\/+/, '');
  const imagePath = clean.startsWith('images/') ? clean : `images/${clean}`;
  return `${normalizeOrigin(blobStoreUrl, DEFAULT_BLOB_STORE_URL)}/${imagePath}`;
}

/** Brand logo used for the Organization node in structured data. */
export const ORGANIZATION_LOGO_URL = getAbsoluteImageUrl('logo/main-logo-Photoroom.png');

/** Portrait used for the Person node in structured data. */
export const FOUNDER_PHOTO_URL = getAbsoluteImageUrl('ben-photo.png');
