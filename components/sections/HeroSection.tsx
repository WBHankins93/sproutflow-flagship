import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowRight, MapPin } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="paper-grain relative overflow-hidden border-b border-primary-900/15 bg-[#f7f4ec]">
      <div className="mx-auto grid min-h-[650px] max-w-[90rem] items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:min-h-[720px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative z-10 min-w-0">
          <p className="eyebrow mb-6 flex items-center gap-2 text-primary-700">
            <MapPin className="h-3.5 w-3.5" />
            New Orleans · Founder-led
          </p>
          <h1 className="max-w-[12ch] text-[clamp(3.4rem,7.5vw,7.5rem)] leading-[0.89] text-primary-900">
            Websites that win the <em className="font-normal text-primary-600">right</em> clients.
          </h1>
          <p className="mt-8 max-w-[39rem] text-lg leading-relaxed text-text-secondary md:text-xl">
            Strategy, copy, design, and development for small businesses ready to look as good as the work they do.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/inquiry"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.35rem] bg-primary-900 px-6 py-3 font-bold text-white hover:bg-primary-700"
            >
              Tell us about your project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.35rem] border border-primary-900/35 px-6 py-3 font-bold text-primary-900 hover:bg-white/60"
            >
              See client results
              <ArrowDownRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-text-muted">
            About five minutes. Ben replies within one business day.
          </p>
        </div>

        <div className="relative mx-auto hidden w-full min-w-0 max-w-3xl pb-12 lg:block lg:pb-0">
          <div className="absolute -right-16 -top-12 h-64 w-64 rounded-full border border-primary-700/20" />
          <div className="absolute -right-5 -top-1 h-40 w-40 rounded-full bg-[#d9a558]" />
          <div className="absolute -left-6 top-16 h-52 w-52 rounded-full bg-[#c7d9de]" />
          <div className="relative ml-auto aspect-[1.25] w-[92%] overflow-hidden border border-primary-900/20 bg-primary-900 shadow-[18px_22px_0_rgba(40,69,47,0.12)]">
            <Image
              src="/images/nealy-case-study.png"
              alt="Nealy Event Decor website designed and built by Sproutflow Studio"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 92vw, 52vw"
            />
          </div>
          <div className="absolute -bottom-2 left-0 max-w-[17rem] border border-primary-900/20 bg-[#f7f4ec] p-5 shadow-lg">
            <p className="eyebrow text-primary-700">Recent work</p>
            <p className="mt-2 font-display text-2xl leading-tight text-primary-900">Nealy Event Decor</p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              A custom catalog, gallery, wishlist, and inquiry path—built around how clients actually plan an event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
