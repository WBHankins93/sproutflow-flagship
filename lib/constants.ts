/**
 * Shared site constants and booking helpers.
 *
 * Booking degrades safely: when booking is turned off (NEXT_PUBLIC_CAL_LINK
 * set to `off`), every booking CTA points at the inquiry form and /book
 * redirects there.
 */

/** Route that hosts the embedded Cal.com scheduler. */
export const BOOKING_PATH = '/book';

/** Route that hosts the written inquiry form. Always available. */
export const INQUIRY_PATH = '/inquiry';

/** Full label for primary booking CTAs. */
export const BOOKING_CTA_LABEL = 'Book a 15-minute call';

/** Short label for tight spaces such as the header. */
export const BOOKING_CTA_SHORT = 'Book a call';

const CAL_ORIGIN = 'https://cal.com';

/**
 * Sproutflow's public 15-minute Cal.com event. It is a public URL, like the
 * phone number, so it lives in code. NEXT_PUBLIC_CAL_LINK overrides it;
 * setting that variable to `off` (or blank) turns booking off.
 */
export const DEFAULT_CAL_LINK = 'ben-hankins-sproutflow-studio/15min';

/**
 * Returns the Cal.com link path (for example `sproutflow/15min`) or null when
 * booking is turned off. Accepts a pasted full URL and normalizes it.
 *
 * The env var is read on every call (direct property access so Next inlines
 * it at build time) so tests can change it between cases.
 */
export function getCalLink(): string | null {
  const env = process.env.NEXT_PUBLIC_CAL_LINK;
  const raw = env === undefined ? DEFAULT_CAL_LINK : env;
  if (raw.trim().toLowerCase() === 'off') return null;
  const link = raw
    .trim()
    .replace(/^https?:\/\/(www\.)?cal\.com\//i, '')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
  return link.length > 0 ? link : null;
}

/** True when a Cal.com link is configured. */
export function isBookingConfigured(): boolean {
  return getCalLink() !== null;
}

/** Where booking CTAs should point: /book when configured, else /inquiry. */
export function getBookingHref(): string {
  return isBookingConfigured() ? BOOKING_PATH : INQUIRY_PATH;
}

/** Public Cal.com URL for the booking page, or null when not configured. */
export function getCalPublicUrl(): string | null {
  const link = getCalLink();
  return link ? `${CAL_ORIGIN}/${link}` : null;
}

/**
 * Formspree form that receives /inquiry submissions. It is public by design
 * (every visitor's browser posts to formspree.io/f/<id>), so it lives in code
 * and the form works without a Vercel variable. NEXT_PUBLIC_FORMSPREE_FORM_ID
 * overrides it; a blank value falls back to this default.
 */
export const DEFAULT_FORMSPREE_FORM_ID = 'mbdzzbpn';

/** The Formspree form ID the inquiry form should post to. */
export function getFormspreeFormId(): string {
  const env = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
  return env ? env : DEFAULT_FORMSPREE_FORM_ID;
}
