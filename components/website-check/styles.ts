/**
 * Shared class strings for the website check. Kept here so the redesign can
 * reskin the whole flow from one place.
 */

const inputBase =
  'min-h-12 w-full min-w-0 rounded-lg border bg-white px-4 py-3 text-primary-900 placeholder:text-text-muted focus:outline-none focus:ring-2';

export const inputClass = `${inputBase} border-primary-900/30 focus:border-primary-700 focus:ring-primary-600/25`;

// red-700 clears 4.5:1 on white and on the cream canvas (same as the inquiry form).
export const invalidInputClass = `${inputBase} border-red-700 ring-1 ring-red-700 focus:border-red-700 focus:ring-red-700/30`;

export const primaryButtonClass =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 font-semibold text-white hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 disabled:opacity-60';

export const cardClass = 'rounded-2xl border border-primary-900/15 bg-white p-5 md:p-7';

/** The recommended offer: same card, heavier border. */
export const offerCardClass = 'rounded-2xl border-2 border-primary-900 bg-white p-5 md:p-7';
