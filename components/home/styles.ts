/** Shared class strings for the homepage sections. */

/** Text-link CTA: underlined in Redline, at least 44px tall, visible focus ring. */
export const TEXT_LINK_CLASS =
  'inline-flex min-h-[44px] items-center gap-2 font-body text-body font-semibold text-primary-900 underline decoration-redline decoration-2 underline-offset-[6px] transition-colors hover:decoration-primary-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline';

/**
 * The same text link on Pine or Fern, where red is never used: Birch text
 * (11.38:1 on Pine, 5.38:1 on Fern), Sun gold underline, Birch focus ring.
 */
export const TEXT_LINK_ON_DARK_CLASS =
  'inline-flex min-h-[44px] items-center gap-2 font-body text-body font-semibold text-cream-300 underline decoration-forest-sungold decoration-2 underline-offset-[6px] transition-colors hover:decoration-cream-300 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-cream-300';

/** Mono figures: tabular, no ligatures. */
export const NUMERAL_CLASS = 'tabular-nums [font-variant-ligatures:none]';
