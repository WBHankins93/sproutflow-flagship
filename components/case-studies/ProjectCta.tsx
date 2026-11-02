import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, Heading, Section } from '@/components/v3';
import { BUTTON_LINK_VARIANTS } from '@/components/v3/ButtonLink';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_LABEL } from '@/lib/constants';
import { TEXT_LINK_ON_FERN_CLASS } from './proof';

// The v3 ButtonLink onFern look on the booking link, which has to stay a
// BookCallLink so it falls back to /inquiry when booking is turned off.
const BOOK_BUTTON = `group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 px-6 py-2 font-body text-base font-semibold leading-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] ${BUTTON_LINK_VARIANTS.onFern}`;

export interface ProjectCtaProps {
  /** Heading id, unique on the page. */
  id: string;
  heading: string;
  body: string;
  /** Analytics tag for the booking link. */
  cta: string;
  /** Optional link to the next case study. */
  next?: { href: string; name: string };
}

/**
 * Closing band for /work, the case studies and /resources: book a call, or
 * take the problem to the custom quote on the homepage offer menu. Fern, so
 * every colour is Birch and the underline is Sun gold. No red here.
 */
export default function ProjectCta({ id, heading, body, cta, next }: ProjectCtaProps) {
  return (
    <Section tone="fern" rhythm="loose" labelledBy={id}>
      <Eyebrow onFern>Next step</Eyebrow>
      <Heading id={id} className="mt-5 max-w-[22ch] text-cream-300">
        {heading}
      </Heading>
      <p className="mt-5 max-w-[60ch] font-body text-body-lg text-cream-300">{body}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
        <BookCallLink data-cta={cta} className={BOOK_BUTTON}>
          {BOOKING_CTA_LABEL}
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </BookCallLink>
        <Link href="/#offers" data-cta={`${cta}-custom`} className={TEXT_LINK_ON_FERN_CLASS}>
          Bring me the problem.
        </Link>
      </div>
      {next && (
        <nav aria-label="More work" className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-cream-300/25 pt-6">
          <Link href={next.href} className={TEXT_LINK_ON_FERN_CLASS}>
            <span className="font-mono text-label uppercase [font-variant-ligatures:none]">Next project</span>
            <span>{next.name}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/work" className={TEXT_LINK_ON_FERN_CLASS}>
            All work
          </Link>
        </nav>
      )}
    </Section>
  );
}
