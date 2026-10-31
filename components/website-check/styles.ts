/**
 * Shared class strings for the website check, on design system v3
 * (docs/design-system-v3.md). Kept here so the whole flow reskins from one place.
 */

const inputBase =
  'min-h-12 w-full min-w-0 rounded-lg border bg-white px-4 py-3 text-primary-900 placeholder:text-text-muted focus:outline-none focus:ring-2';

export const inputClass = `${inputBase} border-primary-900/30 focus:border-primary-900 focus:ring-redline/40`;

// red-700 clears 4.5:1 on white and on the cream canvas (same as the inquiry form).
export const invalidInputClass = `${inputBase} border-red-700 ring-1 ring-red-700 focus:border-red-700 focus:ring-red-700/30`;

/** v3 ButtonLink primary: Pine fill, Birch text (11.38:1), 3px Redline focus ring. */
export const primaryButtonClass =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-primary-900 bg-primary-900 px-6 py-3 font-semibold leading-tight text-cream-300 transition-colors duration-150 hover:border-primary-800 hover:bg-primary-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline disabled:opacity-60';

/** v3 ButtonLink secondary: Pine outline on a light canvas. */
export const secondaryButtonClass =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-primary-900 bg-transparent px-6 py-3 font-semibold leading-tight text-primary-900 transition-colors duration-150 hover:bg-primary-900/[0.06] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline disabled:opacity-60';

/** Form and results card on Sunlit forest white (#FBFCF8). */
export const cardClass = 'rounded-2xl border border-primary-900/15 bg-forest-white p-5 md:p-7';

/** The recommended offer: same card, heavier Pine border. */
export const offerCardClass = 'rounded-2xl border-2 border-primary-900 bg-[#FBF8F1] p-5 md:p-7';

/** Fira Code label (eyebrow) in ink soft: 7.17:1 on Paper, 6.63:1 on Birch. */
export const labelClass = 'font-mono text-label uppercase tabular-nums text-[#4A574D] [font-variant-ligatures:none]';

/** Secondary body text on light canvases (ink soft). */
export const softTextClass = 'text-[#4A574D]';
