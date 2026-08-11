import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '../layout/StudioLayout';
import ProjectReel from './ProjectReel';

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-background-primary pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="studio-reveal mb-7 border-l-2 border-accent-500 pl-3 text-sm font-semibold text-primary-800">
            New Orleans studio · Working directly with Ben
          </p>

          <h1
            style={{ animationDelay: '80ms' }}
            className="studio-reveal max-w-3xl font-display text-[clamp(3.2rem,6.6vw,6.6rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-primary-950"
          >
            Make it easier for customers to choose you.
          </h1>

          <p
            style={{ animationDelay: '160ms' }}
            className="studio-reveal mt-7 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl"
          >
            Sproutflow builds websites, intake flows, and follow-up systems for small businesses. You work directly with Ben from the first call through launch.
          </p>

          <div
            style={{ animationDelay: '240ms' }}
            className="studio-reveal mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/inquiry"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary-800 px-7 py-3.5 font-semibold text-white hover:bg-primary-700"
            >
              Tell me about your project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-primary-800 px-7 py-3.5 font-semibold text-primary-900 hover:bg-white/60"
            >
              See client work
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <p style={{ animationDelay: '300ms' }} className="studio-reveal mt-5 max-w-lg text-sm leading-relaxed text-text-muted">
            No polished brief needed. Share the problem and a comfortable budget; I will reply with a useful next step.
          </p>
        </div>

        <div style={{ animationDelay: '140ms' }} className="studio-reveal lg:col-span-7">
          <ProjectReel />
        </div>
      </Container>
    </section>
  );
}
