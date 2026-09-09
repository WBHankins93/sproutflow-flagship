import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import DeviceFrame from '@/components/ui/DeviceFrame';
import ImageCarousel from '@/components/ui/ImageCarousel';
import StatRail from '@/components/ui/StatRail';
import { listedProjectProof } from '@/data/projectProof';
import { demos } from '@/data/demos';

export default function HeroSection() {
  const showcaseSlides = [
    ...listedProjectProof.map((project) => ({ src: project.screenshot, alt: project.screenshotAlt })),
    ...demos.map((demo) => ({ src: demo.screenshots[0].src, alt: `${demo.name} — ${demo.tagline}` })),
  ];
  const stats = [
    { value: '100%', label: 'projects shipped live' },
    { value: '1:1', label: 'with the founder' },
    { value: 'Fixed', label: 'quote before work' },
  ];

  return (
    <section className="grain rings relative overflow-hidden bg-ink-900 text-white">
      <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-16 md:px-11 md:py-20 lg:min-h-[calc(100svh-88px)] lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-3 text-eyebrow uppercase text-white/55">
            <span className="h-px w-8 bg-accent-400" aria-hidden="true" />
            New Orleans studio · Working directly with Ben
          </p>
          <h1 className="mt-7 max-w-4xl font-display text-display-xl text-cream-300">
            Make it easier for customers to{' '}
            <span className="font-accent font-normal italic text-accent-300">choose you.</span>
          </h1>
          <p className="mt-7 max-w-xl text-body-lg text-white/[0.68]">
            Sproutflow builds websites, intake flows, and follow-up systems for small businesses that need customers to
            take the next step.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/inquiry"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-ink-900 hover:bg-accent-400"
            >
              Tell me about your project
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 font-semibold text-white/75 hover:text-white"
            >
              See client work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <StatRail stats={stats} variant="ink" className="mt-12 max-w-xl" />
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[620px] pb-16 pr-6 md:pb-0 md:pr-0">
            <DeviceFrame kind="laptop" className="w-full">
              <div className="media-shimmer absolute inset-0 bg-ink-700/40" aria-hidden="true" />
              <ImageCarousel slides={showcaseSlides} priority />
            </DeviceFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
