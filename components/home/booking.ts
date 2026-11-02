import { INQUIRY_PATH, getBookingHref } from '@/lib/constants';
import type { CatalogServicePath } from '@/data/catalog';

/**
 * Booking href for a homepage CTA: /book when Cal.com is configured, else
 * /inquiry. When it falls back to the form, `path` prefills the project type
 * (app/inquiry/page.tsx pathMap); /book never carries a query.
 */
export function homeBookingHref(path?: CatalogServicePath): string {
  const base = getBookingHref();
  return base === INQUIRY_PATH && path ? `${base}?path=${path}` : base;
}
