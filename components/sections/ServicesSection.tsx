import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { servicePaths } from '@/data/servicePaths';
import { Container } from '../layout/StudioLayout';

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-background-primary py-16 md:py-24">
      <Container>
        <div className="grid gap-8 border-t border-primary-900 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
              Ways to work together
            </p>
            <h2 id="services-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl lg:text-6xl">
              Clear help, shaped around the problem.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-text-secondary">
              Choose the path that feels closest. Share what needs to change and the budget that feels comfortable; we will recommend a practical scope and fixed quote.
            </p>
          </div>
        </div>

        <div className="mt-12 border-b border-primary-900/20 md:mt-16">
          {servicePaths.map((path, index) => (
            <article
              key={path.id}
              data-service-path-id={path.id}
              className="grid gap-7 border-t border-primary-900/20 py-10 lg:grid-cols-12 lg:gap-8 lg:py-12"
            >
              <div className="font-display text-xl font-semibold text-accent-700 lg:col-span-1" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="lg:col-span-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
                  {path.eyebrow}
                </p>
                <h3 className="font-display text-3xl font-semibold leading-tight text-primary-900 sm:text-4xl">
                  {path.title}
                </h3>
                <p className="mt-4 text-xl font-medium leading-snug text-primary-700">
                  {path.outcome}
                </p>
                <p className="mt-4 leading-relaxed text-text-secondary">{path.description}</p>
                <Link
                  href="/inquiry"
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 border-b border-primary-700 pb-1 font-semibold text-primary-800 hover:text-primary-600"
                >
                  {path.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>

              <div className="lg:col-span-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Good fit if</p>
                <p className="mt-3 leading-relaxed text-text-primary">{path.goodFit}</p>
                <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {path.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-primary-600" aria-hidden="true" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <figure className="max-w-sm lg:col-span-3 lg:max-w-none lg:self-start">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-primary-900/15 bg-background-card">
                  <Image
                    src={getImageUrl(path.image)}
                    alt={path.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 360px, 25vw"
                  />
                </div>
                <figcaption className="mt-3 text-xs font-semibold leading-relaxed text-text-muted">
                  Project proof · {path.imageCaption}
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
