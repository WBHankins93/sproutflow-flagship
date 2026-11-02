import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CalEmbed } from '@/components/booking/CalEmbed';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow, Heading, MarginNote, Section } from '@/components/v3';
import { BOOKING_PATH, INQUIRY_PATH, getCalLink } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book a 15-minute call',
  description:
    'Book a short call with me, Ben, the person behind Sproutflow Studio. Fifteen minutes to talk through what you need and whether I can help. Based in New Orleans, working with businesses anywhere.',
  alternates: { canonical: BOOKING_PATH },
};

const covers = [
  'What is happening in your business right now.',
  'Whether a website, a lead system, or care fits.',
  'A straight answer on price and timing.',
];

export default function BookPage() {
  const calLink = getCalLink();
  if (!calLink) {
    redirect(INQUIRY_PATH);
  }

  return (
    <>
      <Section tone="clearing" labelledBy="book-h">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4">
            <Eyebrow>15 minutes with Ben</Eyebrow>
            <Heading as="h1" size="lg" id="book-h" italic="time" className="mt-5">
              Pick a time that works.
            </Heading>
            <p className="mt-5 max-w-[60ch] text-body-lg text-[#4A574D]">
              A short call with me, no prep required. Here is what we will cover.
            </p>
            <ol className="mt-10 border-t border-primary-900/20">
              {covers.map((item, index) => (
                <li key={item} className="grid grid-cols-[32px_1fr] gap-3 border-b border-primary-900/20 py-5">
                  <span
                    className="font-mono text-label leading-6 tabular-nums text-redline [font-variant-ligatures:none]"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <p className="text-primary-900">{item}</p>
                </li>
              ))}
            </ol>
            <MarginNote arrow="none" className="mt-6">
              just me on the call, no sales team
            </MarginNote>
            <div className="mt-8">
              <p className="font-semibold text-primary-900">Prefer to write it out?</p>
              <p className="mt-1 text-sm text-[#4A574D]">
                <Link
                  href={INQUIRY_PATH}
                  data-cta="book-inquiry"
                  className="rounded-sm font-semibold text-primary-900 underline underline-offset-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-redline"
                >
                  Send me the details instead
                </Link>
                . I reply within one business day.
              </p>
            </div>
          </aside>
          <div className="min-w-0 border-t border-primary-900/20 pt-8 lg:col-span-7 lg:col-start-6">
            <CalEmbed calLink={calLink} />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
