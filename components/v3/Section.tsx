import type { ReactNode } from 'react';
import Container, { type ContainerSize } from './Container';

export type SectionTone = 'birch' | 'paper' | 'lichen' | 'pine' | 'clearing' | 'leaf' | 'fern' | 'sunlight' | 'white';
export type SectionRhythm = 'tight' | 'default' | 'loose' | 'none';

/**
 * Canvas + default text colour per tone (WCAG). The lowest pair is Fern with
 * Birch text at 5.38:1; every light tone carries Pine text at 9.5:1 or more
 * (Leaf 9.52, Sunlight 10.73, Clearing 11.41, Birch 11.38, White 12.68).
 * Red pen only on the light tones, never on Fern or Pine.
 */
export const SECTION_TONES: Record<SectionTone, string> = {
  birch: 'bg-cream-300 text-primary-900', // Birch Paper #F4EFE3, the default canvas
  paper: 'bg-[#FBF8F1] text-primary-900', // Paper, a lighter step for cards and the check
  lichen: 'bg-cream-500 text-primary-900', // Lichen #E4E3D2, a seam between light sections
  pine: 'bg-primary-900 text-cream-300', // Pine Shadow #223528, the deep dark canvas
  clearing: 'bg-forest-clearing text-primary-900', // Sunlit forest hero
  leaf: 'bg-forest-leaf text-primary-900', // Spring leaf
  fern: 'bg-forest-fern text-cream-300', // Fern, the lighter dark canvas (5.38:1); no red pen
  sunlight: 'bg-forest-sunlight text-primary-900', // warm light behind Ben
  white: 'bg-forest-white text-primary-900', // near-white for proof and work
};

/** Vertical padding, from the --v3-rhythm-* tokens in app/globals.css. */
export const SECTION_RHYTHM: Record<SectionRhythm, string> = {
  tight: 'py-[var(--v3-rhythm-tight)]',
  default: 'py-[var(--v3-rhythm)]',
  loose: 'py-[var(--v3-rhythm-loose)]',
  none: '',
};

export interface SectionProps {
  tone?: SectionTone;
  rhythm?: SectionRhythm;
  id?: string;
  /** id of the heading that names this section (sets aria-labelledby). */
  labelledBy?: string;
  /** Use only when the section has no visible heading. */
  ariaLabel?: string;
  /** Wrap children in a Container of this size, or false to manage width yourself. Default 'default'. */
  container?: ContainerSize | false;
  className?: string;
  children: ReactNode;
}

/** A v3 page section: one tone, one rhythm, contained content. */
export default function Section({
  tone = 'birch',
  rhythm = 'default',
  id,
  labelledBy,
  ariaLabel,
  container = 'default',
  className = '',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      data-tone={tone}
      className={['relative scroll-mt-20', SECTION_TONES[tone], SECTION_RHYTHM[rhythm], className].filter(Boolean).join(' ')}
    >
      {container === false ? children : <Container size={container}>{children}</Container>}
    </section>
  );
}
