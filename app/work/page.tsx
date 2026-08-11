import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/StudioLayout';
import { caseStudies } from '@/data/caseStudies';
import { workProjects } from '@/data/workProjects';
import { getImageUrl } from '@/lib/blob-images';

export const metadata: Metadata = {
  title: 'Work & Results',
  description:
    'Live websites and attributed client results from Sproutflow Studio, including work for service businesses, professional practices, local brands, and e-commerce.',
  keywords: [
    'web design portfolio',
    'small business website examples',
    'New Orleans web design portfolio',
    'web design case studies',
  ],
  alternates: {
    canonical: '/work',
  },
};

const caseStudyByProjectId: Record<string, string> = {
  'djn-services': 'djn-services',
  'nola-pool-solutions': 'nola-pool-solutions',
  'second-line-psychiatry': 'second-line-psychiatry',
  'nealy-event-decor': 'nealy-events',
};

const orderedProjects = [...workProjects].sort((a, b) => a.sortPriority - b.sortPriority);

export default function WorkPage() {
  return (
    <>
      <header className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-8 border-t border-primary-900 pt-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
                Work &amp; results
              </p>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-primary-900 sm:text-6xl lg:text-7xl">
                One place for the work and what changed.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-relaxed text-text-secondary">
                Browse the finished work, the business goal behind it, and attributed outcomes where clients have approved them. Deeper project stories are attached to the work—not separated into another gallery.
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section id="projects" aria-label="Client work and results" className="bg-background-primary pb-20 md:pb-28">
        <Container>
          <div className="border-b border-primary-900/20">
            {orderedProjects.map((project, index) => {
              const caseStudySlug = caseStudyByProjectId[project.id];
              const caseStudy = caseStudySlug
                ? caseStudies.find((study) => study.slug === caseStudySlug)
                : undefined;

              return (
                <article
                  key={project.id}
                  className="grid gap-8 border-t border-primary-900/20 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
                >
                  <div className="lg:col-span-5">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-primary-900/15 bg-white">
                      {project.backgroundImage ? (
                        <Image
                          src={getImageUrl(project.backgroundImage)}
                          alt={`${project.title} website project`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          priority={index < 2}
                        />
                      ) : null}
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                      {project.client}
                    </p>
                  </div>

                  <div className="flex flex-col lg:col-span-7">
                    <div className="flex items-start gap-4">
                      <span className="font-display text-xl font-semibold text-accent-700" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-700">
                          {project.category} · {project.status}
                        </p>
                        <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-primary-900 sm:text-4xl">
                          {project.title}
                        </h2>
                      </div>
                    </div>

                    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-text-secondary">
                      {project.description}
                    </p>

                    {caseStudy?.cardStats && (
                      <dl className="mt-7 grid gap-5 border-y border-primary-900/15 py-5 sm:grid-cols-2">
                        {caseStudy.cardStats.map((stat) => (
                          <div key={`${stat.value}-${stat.label}`}>
                            <dt className="font-display text-3xl font-semibold text-primary-800">{stat.value}</dt>
                            <dd className="mt-1 text-sm leading-relaxed text-text-secondary">{stat.label}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-primary-700" aria-label="Services provided">
                      {project.services.map((service) => (
                        <li key={service}>{service}</li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap gap-x-6 gap-y-4 pt-8">
                      {caseStudy && (
                        <Link
                          href={`/case-studies/${caseStudy.slug}`}
                          className="group inline-flex min-h-11 items-center gap-2 border-b border-primary-700 pb-1 font-semibold text-primary-800 hover:text-primary-600"
                        >
                          Read the project story
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      )}
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-11 items-center gap-2 border-b border-primary-900/30 pb-1 font-semibold text-text-secondary hover:text-primary-700"
                      >
                        Visit the live site
                        <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="grid gap-8 border-b border-primary-900/20 py-14 lg:grid-cols-12 lg:items-center md:py-20">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Your turn</p>
              <h2 className="font-display text-4xl font-semibold leading-tight text-primary-900 sm:text-5xl">
                Tell us what needs to work better.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="mb-6 leading-relaxed text-text-secondary">
                A short note and a comfortable budget range are enough. We will reply with a practical recommendation and a fixed quote if the fit is right.
              </p>
              <Link
                href="/inquiry"
                className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-primary-800 px-6 py-3.5 font-semibold text-white hover:bg-primary-700"
              >
                Share your project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </Container>
      </section>

      <Footer />
    </>
  );
}
