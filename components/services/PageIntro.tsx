import type { ReactNode } from 'react';
import { Eyebrow, Heading, Section, type SectionTone } from '@/components/v3';
import { SOFT_TEXT } from './styles';

export interface PageIntroProps {
  /** Heading id; the section is labelled by it. */
  id: string;
  eyebrow: string;
  title: string;
  /** One word of `title` in Instrument Serif italic. */
  italic?: string;
  intro?: ReactNode;
  /** Light header tones only: Clearing (default) or white. */
  tone?: Extract<SectionTone, 'clearing' | 'white'>;
  /** CTAs or extra lines under the intro. */
  children?: ReactNode;
  /** Right-hand column from 1024px (a photo, a short list). */
  aside?: ReactNode;
}

/** The v3 inner-page header: eyebrow, display-serif h1, intro, CTAs. Replaces components/ui/PageHeader. */
export default function PageIntro({ id, eyebrow, title, italic, intro, tone = 'clearing', children, aside }: PageIntroProps) {
  return (
    <Section tone={tone} rhythm="none" labelledBy={id} className="pb-[var(--v3-rhythm)] pt-[var(--v3-rhythm-tight)]">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className={`min-w-0 ${aside ? 'lg:col-span-7' : 'lg:col-span-9'}`}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" id={id} italic={italic} className="mt-5 max-w-[18ch]">
            {title}
          </Heading>
          {intro && <div className={`mt-5 max-w-[60ch] font-body text-body-lg ${SOFT_TEXT}`}>{intro}</div>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {aside && <div className="min-w-0 lg:col-span-5">{aside}</div>}
      </div>
    </Section>
  );
}
