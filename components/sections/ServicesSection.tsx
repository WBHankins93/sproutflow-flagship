import Link from 'next/link';
import { ArrowRight, Check, MonitorCheck, TrendingUp, Workflow } from 'lucide-react';
import { servicePaths } from '@/data/servicePaths';
import { Container } from '../layout/StudioLayout';

const serviceIcons = {
  websites: MonitorCheck,
  'business-systems': Workflow,
  'growth-support': TrendingUp,
};

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-background-primary py-20 md:py-28">
      <Container>
        <div className="grid gap-8 border-t border-primary-900 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Ways to work together</p>
            <h2 id="services-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl lg:text-6xl">
              Start with the part that is slowing you down.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-text-secondary">
              You do not need to diagnose the whole system. Pick the closest path and tell me what is happening now.
            </p>
          </div>
        </div>

        <div className="mt-12 grid border-y border-primary-900/20 md:mt-16 lg:grid-cols-3">
          {servicePaths.map((path, index) => {
            const Icon = serviceIcons[path.id];
            return (
              <article
                key={path.id}
                data-service-path-id={path.id}
                className={`flex h-full flex-col py-8 lg:px-7 lg:py-10 ${index > 0 ? 'border-t border-primary-900/20 lg:border-l lg:border-t-0' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-800">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg font-semibold text-accent-700" aria-hidden="true">0{index + 1}</span>
                </div>

                <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">{path.eyebrow}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-primary-900">{path.title}</h3>
                <p className="mt-4 text-lg font-semibold leading-snug text-primary-700">{path.outcome}</p>
                <p className="mt-4 leading-relaxed text-text-secondary">{path.description}</p>

                <div className="mt-7 border-t border-primary-900/15 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">Good fit if</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-primary">{path.goodFit}</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {path.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-primary-600" aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/inquiry" className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-primary-700 pb-1 font-semibold text-primary-800 hover:text-primary-600 lg:mt-auto lg:pt-8">
                  {path.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
