import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_LABEL } from '@/lib/constants';

export default function NotFound() {
  return (
    <section className="grain rings relative flex min-h-[calc(100svh-88px)] items-center bg-ink-900 text-white">
      <div className="relative mx-auto w-full max-w-[1186px] px-5 py-20 md:px-11">
        <p className="font-mono text-mono-meta text-accent-300">404 · page not found</p>
        <h1 className="mt-7 max-w-4xl font-display text-display-lg text-cream-300">
          That page does not exist anymore.
        </h1>
        <p className="mt-6 max-w-xl text-body-lg text-white/[0.68]">
          The useful part may have moved. Start with the work, the services, or book a short call and tell me what you were looking for.
        </p>
        <div className="mt-9 flex flex-wrap gap-5">
          <Link href="/work" className="border-b border-accent-400 pb-1 font-semibold">
            Work
          </Link>
          <Link href="/services" className="border-b border-accent-400 pb-1 font-semibold">
            Services
          </Link>
          <BookCallLink
            data-cta="not-found"
            className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 font-semibold text-ink-900"
          >
            {BOOKING_CTA_LABEL} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </BookCallLink>
        </div>
      </div>
    </section>
  );
}
