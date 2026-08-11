import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { Container } from '../layout/StudioLayout';

const projects = [
  {
    client: 'Second Line Psychiatry',
    result: '50% more qualified inquiries',
    image: 'work/client-logos/second-line-project.png',
    alt: 'Second Line Psychiatry website designed by Sproutflow Studio',
    href: '/case-studies/second-line-psychiatry',
    className: 'lg:col-span-7 lg:row-span-2',
  },
  {
    client: 'NOLA Pool Solutions',
    result: '30% customer acquisition growth',
    image: 'work/client-logos/nps-project.png',
    alt: 'NOLA Pool Solutions website designed by Sproutflow Studio',
    href: '/case-studies/nola-pool-solutions',
    className: 'lg:col-span-5',
  },
  {
    client: 'Nealy Event Decor',
    result: '2x consultation requests',
    image: 'work/client-logos/nealy-project.png',
    alt: 'Nealy Event Decor website designed by Sproutflow Studio',
    href: '/case-studies/nealy-events',
    className: 'lg:col-span-5',
  },
];

export default function WorktableSection() {
  return (
    <section aria-labelledby="selected-work-heading" className="bg-white py-20 md:py-28">
      <Container>
        <div className="mb-10 grid gap-8 border-t border-primary-800 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
              Selected work
            </p>
            <h2 id="selected-work-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl lg:text-6xl">
              Real businesses. Real work. Results you can verify.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="mb-5 text-lg leading-relaxed text-text-secondary">
              Each project starts with a business problem, not a visual trend. The finished work is live, attributable, and built around a useful customer action.
            </p>
            <Link href="/work" className="inline-flex min-h-11 items-center gap-2 border-b border-primary-700 pb-1 font-semibold text-primary-800 hover:text-primary-600">
              See all client work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          {projects.map((project, index) => (
            <Link
              key={project.client}
              href={project.href}
              className={`group relative min-h-[300px] overflow-hidden rounded-xl border border-primary-900/15 bg-background-card focus-visible:outline-accent-500 ${project.className} ${index === 0 ? 'lg:min-h-[640px]' : 'lg:min-h-[312px]'}`}
            >
              <Image
                src={getImageUrl(project.image)}
                alt={project.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                sizes={index === 0 ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 42vw'}
              />
              <div className="absolute inset-x-0 bottom-0 bg-primary-900/95 p-5 text-white sm:flex sm:items-end sm:justify-between sm:gap-6">
                <div>
                  <p className="text-sm text-white/70">{project.client}</p>
                  <p className="mt-1 font-display text-xl font-semibold sm:text-2xl">{project.result}</p>
                </div>
                <ArrowUpRight className="mt-4 h-5 w-5 flex-none text-accent-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:mt-0" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
