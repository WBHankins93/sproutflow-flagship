import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';
import Pill from './Pill';
import ClientLogo from './ClientLogo';
import type { ShellVariant } from './SectionShell';

interface ProjectRowProps {
  project: ProjectProof;
  index?: number;
  priority?: boolean;
  variant?: ShellVariant;
}

const TONE = {
  ink: {
    rule: 'border-white/15',
    meta: 'text-accent-300',
    status: 'border-white/20 text-white/65',
    eyebrow: 'text-white/50',
    title: 'text-cream-300',
    body: 'text-white/[0.68]',
    result: 'text-accent-300',
    link: 'border-accent-400 text-white',
  },
  cream: {
    rule: 'border-primary-900/15',
    meta: 'text-accent-700',
    status: 'border-primary-900/20 text-text-secondary',
    eyebrow: 'text-text-muted',
    title: 'text-primary-900',
    body: 'text-text-secondary',
    result: 'text-accent-700',
    link: 'border-accent-600 text-primary-900',
  },
} as const;

export default function ProjectRow({ project, index = 0, priority = false, variant = 'ink' }: ProjectRowProps) {
  const reverse = index % 2 === 1;
  const tone = TONE[variant];

  return (
    <article className={`group border-t ${tone.rule} py-10 md:py-14`}>
      <Link
        href={project.href}
        className="grid gap-8 focus-visible:outline-none lg:grid-cols-12 lg:items-center"
        aria-label={`Read the ${project.name} case study`}
      >
        <div className={`${reverse ? 'lg:col-start-8' : 'lg:col-start-1'} lg:col-span-5`}>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-4">
              <p className={`font-mono text-mono-meta ${tone.meta}`}>{String(index + 1).padStart(2, '0')}</p>
              <ClientLogo project={project} variant={variant} size="sm" />
            </span>
            <span className={`rounded-full border px-3 py-1 text-body-sm ${tone.status}`}>
              {project.status}
            </span>
          </div>
          <p className={`mt-8 text-eyebrow uppercase ${tone.eyebrow}`}>
            {project.industry} · {project.location}
          </p>
          <h2 className={`mt-3 font-display text-display-md ${tone.title}`}>{project.name}</h2>
          <p className={`mt-5 text-body-lg ${tone.body}`}>{project.summary}</p>
          <p className={`mt-5 font-mono text-sm uppercase tracking-[0.12em] ${tone.result}`}>{project.result}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.scope.map((item) => (
              <Pill key={item} variant={variant}>
                {item}
              </Pill>
            ))}
          </div>
          <p className={`mt-8 inline-flex items-center gap-2 border-b pb-1 font-semibold ${tone.link}`}>
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
