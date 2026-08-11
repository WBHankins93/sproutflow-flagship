import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/StudioLayout';
import ProjectThumbnail from '@/components/work/ProjectThumbnail';
import { caseStudies } from '@/data/caseStudies';
import { projectProof } from '@/data/projectProof';

export const metadata: Metadata = {
  title: 'Client Work',
  description:
    'Websites and business systems Sproutflow Studio has built for service businesses, professional practices, and independent brands.',
  keywords: [
    'web design portfolio',
    'small business website examples',
    'New Orleans web design portfolio',
    'web design case studies',
  ],
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <header className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-8 border-t border-primary-900 pt-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Client work</p>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-primary-900 sm:text-6xl lg:text-7xl">
                What changed, shown with the work.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-relaxed text-text-secondary">
                Each project page puts the business situation, the decisions, and the finished work in one place. Results appear only where they can be attributed.
              </p>
            </div>
          </div>
        </Container>
      </header>

      <section id="projects" aria-label="Sproutflow client work" className="bg-background-primary pb-20 md:pb-28">
        <Container>
          <div className="grid gap-x-5 gap-y-14 md:grid-cols-2">
            {projectProof.map((project, index) => {
              const caseStudy = caseStudies.find((study) => study.slug === project.id);
              return (
                <article key={project.id} className={index === 4 ? 'md:col-span-2 md:max-w-[calc(50%-0.625rem)]' : ''}>
                  <ProjectThumbnail project={project} priority={index < 2} />
                  {caseStudy && (
                    <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">{caseStudy.cardBlurb}</p>
                  )}
                </article>
              );
            })}
          </div>

          <section className="mt-20 grid gap-8 border-y border-primary-900/20 py-12 lg:grid-cols-12 lg:items-center md:py-16">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Have a project in mind?</p>
              <h2 className="font-display text-4xl font-semibold leading-tight text-primary-900 sm:text-5xl">
                Show me what customers see now.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <p className="mb-6 leading-relaxed text-text-secondary">
                Send a site, a form, a rough idea, or a description of the work your team keeps repeating. I will recommend a useful starting point.
              </p>
              <Link href="/inquiry" className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-primary-800 px-6 py-3.5 font-semibold text-white hover:bg-primary-700">
                Tell me about your project
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
