import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { Container } from '../layout/StudioLayout';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background-primary py-16 sm:py-20 lg:min-h-[calc(100svh-4rem)] lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pr-10">
          <div className="studio-reveal mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-primary-800">
            <span className="border-l-2 border-accent-500 pl-3">New Orleans based</span>
            <span>Founder-led from first call to launch</span>
          </div>

          <h1
            style={{ animationDelay: '80ms' }}
            className="studio-reveal max-w-4xl font-display text-[clamp(3rem,7.8vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-primary-900"
          >
            Clear websites.
            <span className="block text-primary-600">Useful systems.</span>
            <span className="block">One real partner.</span>
          </h1>

          <p style={{ animationDelay: '160ms' }} className="studio-reveal mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
            Sproutflow helps small businesses earn trust, win better inquiries, and spend less time holding disconnected tools together. You work directly with the person doing the strategy and the build.
          </p>

          <div style={{ animationDelay: '240ms' }} className="studio-reveal mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/inquiry"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary-800 px-7 py-3.5 font-semibold text-white hover:bg-primary-700"
            >
              Tell us what you need
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary-800 px-7 py-3.5 font-semibold text-primary-900 hover:bg-white/60"
            >
              See the work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <p style={{ animationDelay: '300ms' }} className="studio-reveal mt-5 text-sm text-text-muted">
            Share a best guess about scope and budget. We reply within one business day with a practical next step.
          </p>
        </div>

        <div style={{ animationDelay: '140ms' }} className="studio-reveal relative lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-primary-900/20 bg-background-card">
            <Image
              src={getImageUrl('ben-photo.png')}
              alt="Ben Hankins, founder and builder at Sproutflow Studio"
              fill
              priority
              quality={90}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <div className="relative -mt-14 ml-5 max-w-[19rem] rounded-lg border border-primary-900/15 bg-white p-5 sm:ml-auto sm:mr-[-1rem]">
            <p className="font-display text-xl font-semibold text-primary-900">Ben Hankins</p>
            <p className="mt-1 text-sm leading-relaxed text-text-secondary">
              Founder, strategist, designer, and engineer. No sales handoff and no mystery team after kickoff.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
