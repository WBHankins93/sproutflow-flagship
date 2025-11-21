// app/work/page.tsx - Sproutflow Work Showcase

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Code2, FileCode, Layers, Zap, Globe, Database, Palette } from 'lucide-react';

import { workProjects } from '@/data/workProjects';
import type { ProjectStatus } from '@/data/workProjects';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';

// Tech stack icon mapping
const techIcons: Record<string, React.ReactNode> = {
  'Next.js': <Code2 className="h-3 w-3" />,
  'TypeScript': <FileCode className="h-3 w-3" />,
  'Tailwind CSS': <Palette className="h-3 w-3" />,
  'Vercel': <Globe className="h-3 w-3" />,
  'Framer Motion': <Zap className="h-3 w-3" />,
  'React': <Layers className="h-3 w-3" />,
  'Node.js': <Code2 className="h-3 w-3" />,
  'PostgreSQL': <Database className="h-3 w-3" />,
};

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
  // Single set of projects for manual scrolling
  const carouselProjects = workProjects;

  return (
    <>
      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="absolute inset-0 -z-10">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getImageUrl('work/sprouting.jpg')})`,
            }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)] opacity-40" />
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
                Real websites for real businesses
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Every project starts with listening—to you, your customers, and what actually moves the needle for your business. What you&apos;ll see below are live sites built to work hard from day one, with room to grow as you do.
              </p>
            </div>
            <div className="rounded-3xl border border-primary-200/60 bg-white/70 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
                How I show up
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>• Listen first, build second—your goals drive every decision</li>
                <li>• Focus on what moves the needle, not just what looks good</li>
                <li>• Build sites that work hard from launch and grow with you</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/40 via-white to-white" />

        <div className="mx-auto max-w-[110rem] px-4 md:px-8">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4">
              {carouselProjects.map((project, index) => (
                <article
                  key={`${project.id}-${index}`}
                  className="flex-shrink-0 w-[85vw] max-w-[28rem] rounded-3xl border border-gray-200 bg-white shadow-lg overflow-hidden md:w-[32rem]"
                >
                  {/* Gradient Header Section */}
                  <div
                    className="relative px-6 pt-6 pb-8 md:px-8 md:pt-8"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${project.gradient
                        .filter(Boolean)
                        .join(', ')})`,
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[project.status]}`}
                      >
                        {project.status}
                      </span>
                      <span className="text-sm font-medium text-white/90">
                        {project.client}
                      </span>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-4 drop-shadow md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-white/90 mb-6 drop-shadow-sm md:text-base">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-700 shadow-sm transition hover:bg-white hover:text-primary-800"
                      >
                        View project
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      {project.logo && (
                        <div className="relative h-12 w-12 md:h-14 md:w-14 bg-white/20 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center border border-white/30 flex-shrink-0">
                          <Image
                            src={getImageUrl(project.logo)}
                            alt={`${project.title} logo`}
                            width={48}
                            height={48}
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* White Content Section */}
                  <div className="flex flex-col gap-6 px-6 pb-8 pt-8 md:px-8">

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary-700 mb-3">
                          Services
                        </p>
                        <div className="flex flex-wrap gap-2">
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
                      <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4">
                        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-primary-700 mb-3">
                          Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-wide text-white"
                            >
                              {techIcons[tech] || <Code2 className="h-3 w-3" />}
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
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


