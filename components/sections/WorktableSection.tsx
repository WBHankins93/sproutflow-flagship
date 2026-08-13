import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import ProjectRow from '@/components/ui/ProjectRow';
import { listedProjectProof } from '@/data/projectProof';

export default function WorktableSection() {
  return (
    <SectionShell
      index="03"
      label="selected work"
      variant="ink"
      labelledBy="selected-work-heading"
      className="bg-ink-800"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h2 id="selected-work-heading" className="font-display text-display-lg text-cream-300 lg:col-span-8">
          The work, and what <span className="font-accent font-normal italic text-accent-300">changed after.</span>
        </h2>
        <div className="lg:col-span-4">
          <p className="text-body-lg text-white/[0.68]">
            Project stories put the business situation, the decisions, and the finished work in one place.
          </p>
          <Link
            href="/work"
            className="group mt-6 inline-flex items-center gap-2 border-b border-accent-400 pb-1 font-semibold text-white"
          >
            Browse all client work{' '}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="mt-12">
        {listedProjectProof.slice(0, 3).map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} priority={index === 0} />
        ))}
      </div>
    </SectionShell>
  );
}
