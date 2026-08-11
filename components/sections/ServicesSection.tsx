import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { servicePaths } from '@/data/servicePaths';
import { Container } from '../layout/StudioLayout';

export default function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-background-primary py-20 md:py-28">
      <Container>
        <div className="mb-16 grid gap-8 border-t border-primary-800 pt-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
              Ways to work together
            </p>
            <h2 id="services-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl lg:text-6xl">
              Start with the problem. Shape the right scope together.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-lg leading-relaxed text-text-secondary">
              You do not need to diagnose the project before contacting us. Choose the path that feels closest, share your comfortable budget, and we will recommend a practical next step.
            </p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-10">
          {servicePaths.map((path, index) => {
            const imageFirst = index !== 1;

            return (
              <article
                key={path.id}
                data-service-path-id={path.id}
                className="grid overflow-hidden rounded-xl border border-primary-900/15 bg-white lg:grid-cols-12"
              >
                <div className={`relative min-h-[300px] lg:col-span-7 lg:min-h-[520px] ${imageFirst ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Image
                    src={getImageUrl(path.image)}
                    alt={path.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  <p className="absolute bottom-4 left-4 rounded-md bg-primary-900/95 px-3 py-2 text-xs font-semibold text-white">
                    {path.imageCaption}
                  </p>
                </div>

                <div className={`flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10 ${imageFirst ? 'lg:order-2' : 'lg:order-1'}`}>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
                    {path.eyebrow}
                  </p>
                  <h3 className="font-display text-3xl font-semibold leading-tight text-primary-900 sm:text-4xl">
                    {path.title}
                  </h3>
                  <p className="mt-5 text-xl font-medium leading-snug text-primary-700">
                    {path.outcome}
                  </p>
                  <p className="mt-4 leading-relaxed text-text-secondary">{path.description}</p>

                  <div className="mt-7 border-y border-primary-900/15 py-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Good fit if</p>
                    <p className="leading-relaxed text-text-primary">{path.goodFit}</p>
                  </div>

                  <ul className="mt-6 grid gap-x-5 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {path.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-primary-600" aria-hidden="true" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      href="/inquiry"
                      className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary-800 px-6 py-3.5 font-semibold text-white hover:bg-primary-700"
                    >
                      {path.ctaLabel}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
