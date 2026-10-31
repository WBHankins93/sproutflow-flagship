import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BUTTON_LINK_VARIANTS } from '@/components/v3/ButtonLink';
import { Eyebrow, Heading, Section } from '@/components/v3';
import { BOOKING_CTA_LABEL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Page not found',
  // Next already emits <meta name="robots" content="noindex"> with the 404
  // status. Clearing robots here stops the root layout's "index, follow" from
  // rendering beside it, and clearing canonical stops the 404 claiming the
  // homepage as its canonical.
  robots: null,
  alternates: { canonical: null },
};

const LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Free website check', href: '/check' },
];

// Birch text with a gold light underline on Pine (7.98:1); never Redline on Pine.
const textLink =
  'inline-flex min-h-11 items-center rounded-sm font-semibold text-cream-300 underline decoration-accent-300 decoration-2 underline-offset-[6px] hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent-300';

const bookButton = `group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 px-6 py-2 font-semibold leading-tight transition-colors duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] ${BUTTON_LINK_VARIANTS.onDark}`;

export default function NotFound() {
  return (
    <>
      <Section
        tone="pine"
        rhythm="loose"
        labelledBy="not-found-h"
        className="flex min-h-[calc(100svh-72px)] items-center border-b border-cream-300/15 md:min-h-[calc(100svh-80px)]"
      >
        <Eyebrow onDark index="404">
          Page not found
        </Eyebrow>
        <Heading as="h1" id="not-found-h" italic="anymore" className="mt-6 max-w-[18ch] text-cream-300">
          That page does not exist anymore.
        </Heading>
        <p className="mt-6 max-w-[60ch] text-body-lg text-[#C9CFC4]">
          The useful part may have moved. Start with the services or the work, check your own website, or book a short
          call and tell me what you were looking for.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={textLink}>
              {link.label}
            </Link>
          ))}
          <BookCallLink data-cta="not-found" className={bookButton}>
            {BOOKING_CTA_LABEL}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </BookCallLink>
        </div>
      </Section>
      <Footer />
    </>
  );
}
