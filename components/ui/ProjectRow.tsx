import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';
import Pill from './Pill';

interface ProjectRowProps {
  project: ProjectProof;
  index?: number;
  priority?: boolean;
}

export default function ProjectRow({ project, index = 0, priority = false }: ProjectRowProps) {
  const reverse = index % 2 === 1;

  return (
    <article className="group border-t border-white/15 py-10 md:py-14">
      <Link
        href={project.href}
        className="grid gap-8 focus-visible:outline-none lg:grid-cols-12 lg:items-center"
        aria-label={`Read the ${project.name} case study`}
      >
        <div className={`${reverse ? 'lg:col-start-8' : 'lg:col-start-1'} lg:col-span-5`}>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-mono-meta text-accent-300">{String(index + 1).padStart(2, '0')}</p>
            <span className="rounded-full border border-white/20 px-3 py-1 text-body-sm text-white/65">
              {project.status}
            </span>
          </div>
          <p className="mt-8 text-eyebrow uppercase text-white/50">
            {project.industry} · {project.location}
          </p>
          <h2 className="mt-3 font-display text-display-md text-cream-300">{project.name}</h2>
          <p className="mt-5 text-body-lg text-white/[0.68]">{project.summary}</p>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.12em] text-accent-300">{project.result}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.scope.map((item) => (
              <Pill key={item} variant="ink">
                {item}
              </Pill>
            ))}
          </div>
          <p className="mt-8 inline-flex items-center gap-2 border-b border-accent-400 pb-1 font-semibold text-white">
            Open project story
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </p>
        </div>

        <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-7'} lg:col-span-6`}>
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
            style={{ backgroundColor: project.canvasColor }}
          >
            <Image
              src={getImageUrl(project.screenshot)}
              alt={project.screenshotAlt}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:translate-x-2 motion-reduce:transition-none"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
