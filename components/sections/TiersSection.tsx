import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { tiers } from '@/data/tiers';

/**
 * A rough scale of engagement so a visitor can place themselves before the
 * first call. Deliberately no prices - see data/tiers.ts. This sits right
 * after "ways to work together" because it's a continuation of the same
 * idea: those are the three paths, this is roughly how far along each one
 * can go.
 */
export default function TiersSection() {
  return (
    <SectionShell index="03" label="scope of work" variant="cream" tone="raised" labelledBy="tiers-heading">
      <div className="mb-12 grid gap-7 lg:grid-cols-12 lg:items-end">
        <h2 id="tiers-heading" className="font-display text-display-md text-primary-900 lg:col-span-8">
          Most projects land somewhere on a{' '}
          <span className="font-accent font-normal italic text-accent-700">simple scale.</span>
        </h2>
        <div className="lg:col-span-4">
          <p className="text-body-lg text-text-secondary">
            Not a price list. A sense of scale, so you have a starting point before we talk about your actual scope.
          </p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier, index) => (
          <article key={tier.id} className="flex h-full flex-col rounded-xl border border-primary-900/15 bg-white p-6">
            <span className="font-mono text-mono-meta text-accent-700">0{index + 1}</span>
            <h3 className="mt-3 font-display text-h4 text-primary-900">{tier.name}</h3>
            <p className="mt-1 text-body-sm font-semibold text-accent-700">{tier.tagline}</p>
            <p className="mt-4 text-body-sm text-text-secondary">{tier.goodFit}</p>
            <ul className="mt-5 space-y-2.5">
              {tier.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body-sm text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-accent-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/inquiry?tier=${tier.id}`}
              className="group mt-auto inline-flex min-h-11 items-center gap-2 border-b border-accent-600 pb-1 pt-6 font-semibold text-primary-900"
            >
              Ask about {tier.name}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
