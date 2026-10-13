import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CalEmbed } from '@/components/booking/CalEmbed';
import { Footer } from '@/components/layout/Footer';
import { BOOKING_PATH, INQUIRY_PATH, getCalLink } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book a 15-minute call',
  description:
    'Book a short fit call with me, Ben, the New Orleans web designer behind Sproutflow Studio. Fifteen minutes to talk through what you need and whether I can help.',
  alternates: { canonical: BOOKING_PATH },
};

const covers = [
  'What is happening in your business right now.',
  'Whether a website, an audit, or a lead system fits.',
  'A straight answer on price and timing.',
];

export default function BookPage() {
  const calLink = getCalLink();
  if (!calLink) {
    redirect(INQUIRY_PATH);
  }

  return (
    <>
      <section className="bg-cream-300 py-14 md:py-20">
        <div className="mx-auto grid max-w-[1186px] gap-12 px-5 md:px-11 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="text-eyebrow uppercase text-accent-700">15 minutes with Ben</p>
            <h1 className="mt-5 font-display text-display-lg text-primary-900">Pick a time that works.</h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              A short call with me, no prep required. Here is what we will cover.
            </p>
            <ul className="mt-10 border-t border-primary-900/20">
              {covers.map((item, index) => (
                <li key={item} className="grid grid-cols-[32px_1fr] gap-3 border-b border-primary-900/20 py-5">
                  <span className="font-mono text-xs leading-6 text-accent-700">0{index + 1}</span>
                  <p className="text-primary-900">{item}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="font-semibold text-primary-900">Prefer to write it out?</p>
              <p className="mt-1 text-sm text-text-secondary">
                <Link
                  href={INQUIRY_PATH}
                  data-cta="book-inquiry"
                  className="font-semibold text-primary-900 underline underline-offset-4"
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
      </section>
      <Footer />
    </>
  );
}
