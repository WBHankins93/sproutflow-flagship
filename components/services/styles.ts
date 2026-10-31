/** Shared class strings and helpers for the v3 inner pages (services, about, faq, how-we-work, data). */

import { INQUIRY_PATH, getBookingHref } from '@/lib/constants';

export { TEXT_LINK_CLASS, TEXT_LINK_ON_DARK_CLASS, NUMERAL_CLASS } from '@/components/home/styles';

/** Ink soft: secondary text on every light canvas (5.54:1 on Leaf, 6.64:1 on Clearing, 7.38:1 on white). */
export const SOFT_TEXT = 'text-[#4A574D]';

/** Soft text on Pine (8.21:1). Never on Fern. */
export const ON_PINE_SOFT = 'text-[#C9CFC4]';

/** Mono label in capitals: eyebrow-like small labels inside a section. */
export const LABEL_CLASS = 'font-mono text-label uppercase tabular-nums [font-variant-ligatures:none]';

/**
 * Booking href for a CTA: /book when Cal.com is configured, else /inquiry with
 * `query` (for example `offer=audit` or `path=websites`) so the form keeps its
 * prefill. /book never carries a query.
 */
export function bookingHref(query?: string): string {
  const base = getBookingHref();
  return base === INQUIRY_PATH && query ? `${base}?${query}` : base;
}
