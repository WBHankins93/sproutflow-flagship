'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ResourceEntry } from '@/data/resources';

const filters = ['all', 'guide', 'note'] as const;

export default function ResourceIndex({ resources }: { resources: ResourceEntry[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const visible = filter === 'all' ? resources : resources.filter((resource) => resource.type === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={`min-h-11 rounded-full border px-5 text-sm font-semibold capitalize ${filter === item ? 'border-accent-500 bg-accent-500 text-ink-900' : 'border-primary-900/20 text-primary-900'}`}
          >
            {item === 'all' ? 'All' : `${item}s`}
          </button>
        ))}
      </div>
      <div className="mt-10 border-t border-primary-900/20">
        {visible.map((resource, index) => (
          <article
            key={resource.slug}
            className="grid gap-5 border-b border-primary-900/20 py-8 md:grid-cols-[70px_1fr_auto] md:items-center"
          >
            <span className="font-mono text-mono-meta text-accent-700">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-eyebrow uppercase text-primary-700">
                  {resource.type} · {resource.track}
                </p>
                {resource.draft && (
                  <span className="rounded-full border border-primary-900/20 px-2 py-1 text-xs text-text-muted">
                    Draft skeleton
                  </span>
                )}
              </div>
              <h2 className="mt-3 font-display text-display-md text-primary-900">{resource.title}</h2>
              <p className="mt-3 max-w-3xl text-text-secondary">{resource.summary}</p>
            </div>
            <Link
              href={`/resources/${resource.slug}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-900/20 text-primary-900"
              aria-label={`Open ${resource.title}`}
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
