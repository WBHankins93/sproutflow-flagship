import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import Marquee from './Marquee';

export default function FooterCta() {
  return (
    <section className="grain rings relative overflow-hidden bg-ink-900 pb-20 pt-10 text-white md:pb-28">
      <Marquee
        variant="ghost"
        speed={58}
        ariaLabel="Start with what needs to work better"
        items={['START WITH WHAT NEEDS TO WORK BETTER', 'A CLEAR NEXT STEP']}
      />
      <div className="relative mx-auto mt-14 max-w-[1440px] px-5 md:px-11">
        <div className="grid gap-10 border-t border-white/20 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="text-eyebrow uppercase text-accent-300">Start a useful conversation</p>
            <h2 className="mt-5 max-w-5xl font-display text-display-lg text-cream-300">
              Tell me what needs to work better. I will help name the next step.
            </h2>
            <Link
              href="/inquiry"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-accent-500 px-7 py-3.5 font-semibold text-ink-900 hover:bg-accent-400"
            >
              Tell me about your project
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="grid content-end gap-4 lg:col-span-4">
            <a
              href="mailto:ben@sproutflow-studio.com"
              className="grid min-h-14 grid-cols-[auto_1fr] items-center gap-x-3 border-t border-white/20 pt-4 text-white/75 hover:text-white"
            >
              <Mail className="h-5 w-5 text-accent-300" aria-hidden="true" />
              <span>
                <span className="block text-xs uppercase tracking-[0.16em] text-white/40">Email</span>
                ben@sproutflow-studio.com
              </span>
            </a>
            <a
              href="tel:+15043261676"
              className="grid min-h-14 grid-cols-[auto_1fr] items-center gap-x-3 border-t border-white/20 pt-4 text-white/75 hover:text-white"
            >
              <Phone className="h-5 w-5 text-accent-300" aria-hidden="true" />
              <span>
                <span className="block text-xs uppercase tracking-[0.16em] text-white/40">Phone</span>(504) 326-1676
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
