// app/work/page.tsx - Sproutflow Work Showcase

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { workProjects } from '@/data/workProjects';
import type { ProjectStatus } from '@/data/workProjects';
import { Footer } from '@/components/layout/Footer';

const statusStyles: Record<ProjectStatus, string> = {
  Live: 'bg-emerald-100 text-emerald-900 ring-1 ring-inset ring-emerald-200',
  'In Progress':
    'bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-200',
};

export const metadata = {
  title: 'Work | Sproutflow Studio',
  description:
    'Selected web design and platform projects by Sproutflow Studio, covering launched client engagements and in-progress builds.',
};

export default function WorkPage() {
  const carouselProjects = [...workProjects, ...workProjects];

  return (
    <>
      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)]" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:px-8 md:py-28">
          <div className="inline-flex items-center gap-2 text-primary-700">
            <span className="h-px w-12 bg-primary-500/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              Selected Work
            </span>
            <span className="h-px w-12 bg-primary-500/60" />
          </div>
          <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
            <div className="space-y-6">
              <h1 className="text-4xl font-display font-bold text-gray-900 md:text-6xl">
                Websites that pair heart with high standards
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Every build below is grounded in customer interviews, practical
                automation, and launch-ready polish. Live projects are already
                in the wild; in-progress builds are shipping in staged releases.
              </p>
            </div>
            <div className="rounded-3xl border border-primary-200/60 bg-white/70 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
                How I show up
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>• Translate stakeholder goals into clear product stories</li>
                <li>• Build composable systems that scale past MVP</li>
                <li>• Ground every launch in measurable business outcomes</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/40 via-white to-white" />

        <div className="mx-auto max-w-[110rem] px-0 md:px-8">
          <div className="group relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white via-white/90 to-transparent md:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white via-white/90 to-transparent md:w-32" />

            <div className="flex animate-carousel-slow gap-6 whitespace-nowrap group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
              {carouselProjects.map((project, index) => (
                <article
                  key={`${project.id}-${index}`}
                  className="relative w-[85vw] max-w-[28rem] flex-shrink-0 whitespace-normal rounded-3xl border border-gray-200 bg-white/95 shadow-lg transition hover:shadow-2xl md:w-[32rem]"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-80"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${project.gradient
                        .filter(Boolean)
                        .join(', ')})`,
                    }}
                  />

                  <div className="relative flex h-full flex-col gap-8 px-6 pb-8 pt-6 md:px-8 md:pt-10">
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[project.status]}`}
                          >
                            {project.status}
                          </span>
                          <span className="text-sm font-medium text-white/80">
                            {project.client}
                          </span>
                        </div>
                        <h2 className="text-2xl font-display font-bold text-white drop-shadow md:text-3xl">
                          {project.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-gray-700 md:text-base">
                          {project.description}
                        </p>
                      </div>
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/50 bg-white/80 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-primary-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:text-primary-800"
                      >
                        View project
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-gray-100 bg-white/85 p-4 shadow-sm">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary-700">
                          Services
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.services.map((service) => (
                            <span
                              key={service}
                              className="rounded-full bg-primary-50 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-primary-700"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-white/85 p-4 shadow-sm">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary-700">
                          Stack
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-gray-900/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-white/90"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {project.highlight ? (
                      <div className="rounded-2xl border border-primary-200 bg-primary-50/70 p-5 shadow-inner">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary-700">
                          Why it matters
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-primary-900">
                          {project.highlight}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Have a project you want to launch with confidence?
          </h3>
          <p className="text-base text-gray-600 md:text-lg">
            Let’s talk about your goals, timelines, and how we can ship something
            that actually moves the business forward.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            Book a discovery call
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}


