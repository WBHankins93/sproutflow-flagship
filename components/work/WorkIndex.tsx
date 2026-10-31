import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { listedProjectProof, type ProjectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';
import { ProofLabel, splitFigure } from '@/components/case-studies/proof';

/**
 * The listed client projects as a grid, each linking to its case study.
 * Hidden projects (listed: false) stay off. Server rendered; no filters,
 * since four projects read faster as one grid. The whole card is the link
 * target (the name's link stretches over it).
 */
export default function WorkIndex({ projects = listedProjectProof }: { projects?: ProjectProof[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2">
      {projects.map((project, index) => (
        <li key={project.id} className="min-w-0">
          <WorkCard project={project} priority={index < 2} />
        </li>
      ))}
    </ul>
  );
}

function WorkCard({ project, priority }: { project: ProjectProof; priority: boolean }) {
  const { figure, rest } = splitFigure(project.result);

  return (
    <article className="group relative flex h-full flex-col">
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-xl border border-primary-900/15 bg-forest-white transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
        style={{ backgroundColor: project.canvasColor }}
      >
        <Image
          src={getImageUrl(project.screenshot)}
          alt={project.screenshotAlt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain object-top"
        />
      </div>
      <p className="mt-5 font-mono text-label uppercase text-[#4A574D] [font-variant-ligatures:none]">
        {project.industry} · {project.location}
      </p>
      <h2 className="mt-2 font-display text-display-md font-normal">
        <Link
          href={project.href}
          data-cta={`work-${project.id}`}
          className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline"
        >
          {project.name}
        </Link>
      </h2>
      <p className="mt-3 max-w-[60ch] font-body text-body text-[#4A574D]">{project.summary}</p>
      <div data-result className="mt-5 border-t-2 border-primary-900 pt-4">
        {figure ? (
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-numeral tabular-nums [font-variant-ligatures:none]">{figure}</span>{' '}
            <span className="font-body text-body">{rest}</span>
          </p>
        ) : (
          <p className="font-body text-body-lg font-semibold">{project.result}</p>
        )}
        <ProofLabel source={project.resultSource} className="mt-2 block" />
      </div>
      <ul aria-label="Scope" className="mt-5 flex flex-wrap gap-2">
        {project.scope.map((item) => (
          <li
            key={item}
            className="rounded-full border border-primary-900/20 px-3 py-1 font-mono text-label text-[#4A574D] [font-variant-ligatures:none]"
          >
            {item}
          </li>
        ))}
      </ul>
      <p
        aria-hidden="true"
        className="mt-auto inline-flex items-center gap-2 pt-6 font-body text-body font-semibold underline decoration-redline decoration-2 underline-offset-[6px] group-hover:decoration-primary-900"
      >
        Read the case study
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
      </p>
    </article>
  );
}
