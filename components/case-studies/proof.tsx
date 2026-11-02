import { hasFigure, PROOF_SOURCE_LABELS, type ProofSource } from '@/data/caseStudies';

/**
 * Proof helpers for /work and the case studies. Every figure or result on
 * these pages sits next to a ProofLabel saying where it came from:
 * "client-reported" (the owner told me) or "delivered" (I built and shipped it).
 */

/** Ink soft on every light tone used here: 7.38 on white, 6.64 on clearing, 5.54 on leaf, 6.25 on sunlight. */
const LABEL_CLASS = 'font-mono text-label uppercase tabular-nums text-[#4A574D] [font-variant-ligatures:none]';

export function ProofLabel({ source, className = '' }: { source: ProofSource; className?: string }) {
  return (
    <span data-proof-source={source} className={[LABEL_CLASS, className].filter(Boolean).join(' ')}>
      {PROOF_SOURCE_LABELS[source]}
    </span>
  );
}

/** One line that explains the two labels, shown under a results grid. */
export const PROOF_LEGEND = 'Client-reported means the owner told me. Delivered means I built and shipped it.';

/** "50% more qualified inquiries" gives { figure: "50%", rest: "more qualified inquiries" }. */
export function splitFigure(text: string): { figure: string | null; rest: string } {
  const match = text.trim().match(/^(\d+(?:\.\d+)?%)\s+(.+)$/);
  return match ? { figure: match[1], rest: match[2] } : { figure: null, rest: text };
}

/** A stat value: mono numerals when it states a number, the display serif when it is a word. */
export function StatValue({ value }: { value: string }) {
  if (hasFigure(value)) {
    return (
      <span className="block font-mono text-numeral tabular-nums text-primary-900 [font-variant-ligatures:none]">
        {value}
      </span>
    );
  }
  return <span className="block font-display text-display-md font-normal text-primary-900">{value}</span>;
}

/** Text link on light tones: Pine text, Redline underline (6.38 on white, 5.74 on clearing), red focus ring. */
export const TEXT_LINK_CLASS =
  'inline-flex min-h-[44px] items-center gap-2 font-body text-body font-semibold text-primary-900 underline decoration-redline decoration-2 underline-offset-[6px] transition-colors hover:decoration-primary-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline';

/** Text link on Fern: Birch text (5.38), Sun gold underline, Birch focus ring. Never red. */
export const TEXT_LINK_ON_FERN_CLASS =
  'inline-flex min-h-[44px] items-center gap-2 font-body text-body font-semibold text-cream-300 underline decoration-forest-sungold decoration-2 underline-offset-[6px] transition-colors hover:text-white hover:decoration-cream-300 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-cream-300';
