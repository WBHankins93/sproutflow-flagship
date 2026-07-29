import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const results = [
  { metric: '50%', label: 'more qualified inquiries', client: 'Second Line Psychiatry', href: '/case-studies/second-line-psychiatry' },
  { metric: '30%', label: 'customer acquisition growth', client: 'NOLA Pool Solutions', href: '/case-studies/nola-pool-solutions' },
  { metric: '2×', label: 'consultation requests', client: 'Nealy Events', href: '/case-studies/nealy-events' },
];

export default function TrustBarSection() {
  return (
    <section className="bg-white" aria-label="Client results">
      <div className="mx-auto grid max-w-[90rem] border-x border-primary-900/15 lg:grid-cols-[1fr_1fr_1fr_1.35fr]">
        {results.map((result) => (
          <Link
            key={result.client}
            href={result.href}
            className="group border-b border-primary-900/15 p-6 hover:bg-primary-50 lg:border-b-0 lg:border-r md:p-8"
          >
            <p className="font-body text-4xl font-bold tabular-nums text-primary-900">{result.metric}</p>
            <p className="mt-1 text-sm font-semibold text-primary-900">{result.label}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-xs text-text-muted">
              {result.client}
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
        <figure className="bg-primary-900 p-7 text-white md:p-8">
          <blockquote className="font-display text-xl leading-snug md:text-2xl">
            “We were working through referrals only. Now we see a tremendous growth of incoming clients.”
          </blockquote>
          <figcaption className="mt-4 text-xs leading-relaxed text-white/60">
            Dr. Lauryn Richard, PMHNP · Second Line Psychiatry
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
