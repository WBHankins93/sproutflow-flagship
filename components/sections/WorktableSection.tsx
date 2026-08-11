import Link from 'next/link';
import { ArrowUpRight, Quote } from 'lucide-react';
import { projectProof } from '@/data/projectProof';
import { testimonials } from '@/data/testimonials';
import ProjectThumbnail from '../work/ProjectThumbnail';
import { Container } from '../layout/StudioLayout';

export default function WorktableSection() {
  const featuredTestimonial = testimonials[0];

  return (
    <section aria-labelledby="selected-work-heading" className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-8 border-t border-primary-800 pt-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Client work</p>
            <h2 id="selected-work-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl lg:text-6xl">
              See the business and the work side by side.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="mb-5 text-lg leading-relaxed text-text-secondary">
              These are live projects for real service businesses. Open a case study to see what changed and what happened next.
            </p>
            <Link href="/work" className="inline-flex min-h-11 items-center gap-2 border-b border-primary-700 pb-1 font-semibold text-primary-800 hover:text-primary-600">
              Browse all client work
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-12 md:grid-cols-2 md:mt-16">
          {projectProof.map((project, index) => (
            <ProjectThumbnail key={project.id} project={project} priority={index < 2} />
          ))}
        </div>

        <figure className="mt-16 grid border-y border-primary-900/20 py-8 lg:grid-cols-12 lg:gap-8 lg:py-12">
          <div className="lg:col-span-1">
            <Quote className="h-9 w-9 text-accent-600" aria-hidden="true" />
          </div>
          <blockquote className="mt-5 font-display text-2xl font-semibold leading-snug text-primary-900 sm:text-3xl lg:col-span-7 lg:mt-0">
            “{featuredTestimonial.quote}”
          </blockquote>
          <figcaption className="mt-6 border-t border-primary-900/15 pt-4 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="font-semibold text-primary-900">{featuredTestimonial.name}</p>
            <p className="mt-1 text-sm text-text-secondary">{featuredTestimonial.role}, {featuredTestimonial.business}</p>
            <p className="mt-4 font-display text-xl font-semibold text-primary-700">{featuredTestimonial.metric}</p>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
