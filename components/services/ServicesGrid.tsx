import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { servicePaths } from '@/data/servicePaths';
import Pill from '@/components/ui/Pill';
import AccentPhrase from '@/components/ui/AccentPhrase';
import ServiceMedia from './ServiceMedia';

/**
 * All three paths visible at once, no click required to see what each one
 * covers. Replaces the earlier accordion, where only one path's detail (and
 * media) showed at a time and two of three read as headline-only.
 */
export default function ServicesGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {servicePaths.map((path, index) => (
        <article
          key={path.id}
          className="flex h-full flex-col overflow-hidden rounded-xl border border-white/15"
        >
          <ServiceMedia path={path.id} height={200} className="rounded-none" />
          <div className="flex flex-1 flex-col p-6">
            <span className="font-mono text-mono-meta text-accent-300">0{index + 1}</span>
            <p className="mt-3 text-eyebrow uppercase text-white/55">{path.eyebrow}</p>
            <h3 className="mt-2 font-display text-display-sm text-cream-300">
              <AccentPhrase accent={path.titleAccent}>{path.title}</AccentPhrase>
            </h3>
            <p className="mt-4 text-body-lg text-white/[0.68]">{path.outcome}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {path.capabilities.map((capability) => (
                <Pill key={capability} variant="ink">
                  {capability}
                </Pill>
              ))}
            </div>
            <Link
              href={`/services/${path.id}`}
              className="group mt-auto inline-flex min-h-11 items-center gap-2 border-b border-accent-400 pb-1 pt-6 font-semibold text-white"
            >
              Explore {path.eyebrow.toLowerCase()}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
