'use client';

import { useMemo, useState } from 'react';
import { listedProjectProof } from '@/data/projectProof';
import ProjectRow from '@/components/ui/ProjectRow';

const filters = ['All', 'Websites', 'Shopify', 'Systems', 'Ongoing care'];

export default function WorkIndex() {
  const [active, setActive] = useState('All');
  const projects = useMemo(
    () =>
      active === 'All'
        ? listedProjectProof
        : listedProjectProof.filter((project) => project.filterTags.includes(active)),
    [active],
  );

  return (
    <>
      <div className="sticky top-[72px] z-30 -mx-5 border-y border-primary-900/15 bg-cream-300/95 px-5 py-4 backdrop-blur-md md:top-[88px] md:-mx-11 md:px-11">
        <div className="mx-auto flex max-w-[1186px] items-center gap-4">
          <div className="mask-fade-x scrollbar-hide flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 md:px-0">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                aria-pressed={active === filter}
                className={`min-h-11 flex-none rounded-full border px-5 text-sm font-semibold ${active === filter ? 'border-accent-700 bg-accent-700 text-white' : 'border-primary-900/20 text-text-secondary hover:border-primary-900/50 hover:text-primary-900'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <p className="hidden flex-none font-mono text-mono-meta text-text-muted sm:block">
            {String(projects.length).padStart(2, '0')} projects
          </p>
        </div>
      </div>

      <div className="mt-8">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} priority={index === 0} variant="cream" />
          ))
        ) : (
          <div className="border-y border-primary-900/20 py-16 text-center">
            <p className="font-display text-display-md text-primary-900">No listed project uses that filter yet.</p>
            <button
              type="button"
              onClick={() => setActive('All')}
              className="mt-5 border-b border-accent-600 pb-1 font-semibold text-primary-900"
            >
              Show all work
            </button>
          </div>
        )}
      </div>
    </>
  );
}
