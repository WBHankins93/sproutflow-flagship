import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BookCallLink } from './BookCallLink';
import { BOOKING_CTA_LABEL, INQUIRY_PATH } from '@/lib/constants';
import { BUTTON_LINK_VARIANTS } from '@/components/v3/ButtonLink';
import { Eyebrow, Heading, Section } from '@/components/v3';

// The v3 ButtonLink onDark look (Goldenrod fill, Pine text, 5.81:1) on the booking link,
// which has to stay a BookCallLink so it falls back to /inquiry when booking is off.
const bookButton = `group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 px-6 py-2 font-semibold leading-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] ${BUTTON_LINK_VARIANTS.onDark}`;

const contactLink =
  'grid min-h-14 content-center gap-1 border-t border-cream-300/20 pt-4 text-cream-300 hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent-300';

const contactLabel = 'font-mono text-label uppercase text-[#C9CFC4] [font-variant-ligatures:none]';

/** The closing call to action on inner pages: book a call, write it out, or call. */
export default function FooterCta() {
  return (
    <Section tone="pine" rhythm="loose" labelledBy="footer-cta-h" className="border-b border-cream-300/15">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <Eyebrow onDark>Start a useful conversation</Eyebrow>
          <Heading id="footer-cta-h" italic="better" className="mt-5 max-w-[22ch] text-cream-300">
            Tell me what needs to work better. I will help name the next step.
          </Heading>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <BookCallLink data-cta="footer" className={bookButton}>
              {BOOKING_CTA_LABEL}
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </BookCallLink>
            <Link
              href={INQUIRY_PATH}
              data-cta="footer-inquiry"
              className="inline-flex min-h-11 items-center rounded-sm font-semibold text-cream-300 underline decoration-accent-300 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent-300"
            >
              Or send the details in writing
            </Link>
          </div>
        </div>
        <div className="grid content-end gap-4 lg:col-span-4">
          <a href="tel:+15043261676" className={contactLink}>
            <span className={contactLabel}>Phone</span>
            <span className="font-mono text-price tabular-nums [font-variant-ligatures:none]">(504) 326-1676</span>
          </a>
          <a href="mailto:ben@sproutflow-studio.com" className={contactLink}>
            <span className={contactLabel}>Email</span>
            <span className="[overflow-wrap:anywhere]">ben@sproutflow-studio.com</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
