'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ResourceEntry } from '@/data/resources';

const filters = ['all', 'guide', 'note'] as const;

const LABEL = 'font-mono text-label uppercase tabular-nums [font-variant-ligatures:none]';

/** The resource library with a type filter. Sits on the white tone: Pine text, ink soft labels, red index. */
export default function ResourceIndex({ resources }: { resources: ResourceEntry[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const visible = filter === 'all' ? resources : resources.filter((resource) => resource.type === filter);

  return (
    <>
      <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={`min-h-11 rounded-full border-2 px-5 font-body text-body-sm font-semibold capitalize transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline ${
              filter === item
                ? 'border-primary-900 bg-primary-900 text-cream-300'
                : 'border-primary-900/25 text-primary-900 hover:border-primary-900'
            }`}
          >
            {item === 'all' ? 'All' : `${item}s`}
          </button>
        ))}
      </div>
      <ul className="mt-10 border-t border-primary-900/20">
        {visible.map((resource, index) => (
          <li key={resource.slug}>
            <article className="group relative grid gap-4 border-b border-primary-900/20 py-8 md:grid-cols-[64px_1fr_auto] md:items-center">
              <span aria-hidden="true" className={`${LABEL} text-redline`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <p className={`${LABEL} text-[#4A574D]`}>
                    {resource.type} · {resource.track}
                  </p>
                  {resource.draft && (
                    <span className={`${LABEL} rounded-full border border-primary-900/20 px-2 py-1 text-[#4A574D]`}>
                      Draft skeleton
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-display-sm font-normal">
                  <Link
                    href={`/resources/${resource.slug}`}
                    className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline"
                  >
                    {resource.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-[60ch] font-body text-body text-[#4A574D]">{resource.summary}</p>
              </div>
              <span
                aria-hidden="true"
                className="hidden h-11 w-11 items-center justify-center rounded-full border-2 border-primary-900/25 text-primary-900 transition-colors group-hover:border-primary-900 md:flex"
              >
                <ArrowRight className="h-4 w-4" />
              </span>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
