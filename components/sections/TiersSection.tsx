import { ArrowRight, Check } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_SHORT } from '@/lib/constants';
import { tiers } from '@/data/tiers';
import { websiteRescue } from '@/data/offers';

/**
 * Three ways to begin, with the core lead system given the most visual weight.
 * This sits after the broader service paths and turns the business-systems
 * category into a concrete first purchase.
 */
export default function TiersSection() {
  return (
    <SectionShell index="03" label="a clear starting point" variant="cream" tone="raised" labelledBy="tiers-heading">
      <div className="mb-12 grid gap-7 lg:grid-cols-12 lg:items-end">
        <h2 id="tiers-heading" className="font-display text-display-md text-primary-900 lg:col-span-8">
          Start with the smallest system that{' '}
          <span className="font-accent font-normal italic text-accent-700">solves the problem.</span>
        </h2>
        <div className="lg:col-span-4">
          <p className="text-body-lg text-text-secondary">
            Begin with a focused audit, a fixed-scope build, or optional care for a system already in use.
          </p>
        </div>
      </div>
      {/*
        Fixed-price entry offer. Deliberately lighter than the cards below
        (no fill, hairline border) so it reads as a side door, not a fourth tier.
      */}
      <div
        id={websiteRescue.id}
        aria-labelledby="website-rescue-heading"
        role="region"
        className="mb-5 scroll-mt-28 rounded-xl border border-primary-900/20 px-6 py-5 lg:px-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="min-w-0">
            <p className="text-body-sm font-semibold text-accent-700">{websiteRescue.audience}</p>
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 id="website-rescue-heading" className="font-display text-h4 text-primary-900">
                {websiteRescue.name}
              </h3>
              <p className="font-display text-h4 text-primary-900">{websiteRescue.price}</p>
              <p className="text-xs text-text-muted">{websiteRescue.priceNote}</p>
            </div>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {websiteRescue.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-body-sm text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-accent-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <BookCallLink
            data-cta="website-rescue"
            inquiryQuery={`tier=${websiteRescue.id}`}
            className="group inline-flex min-h-11 flex-none items-center gap-2 self-start border-b border-accent-600 pb-1 font-semibold text-primary-900 lg:self-center"
          >
            {BOOKING_CTA_SHORT}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </BookCallLink>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-12 lg:items-stretch">
        {tiers.map((tier) => (
          <article
            key={tier.id}
            className={`flex h-full flex-col rounded-xl border p-6 ${
              tier.id === 'lead-capture-system'
                ? 'border-primary-900 bg-primary-900 text-white lg:col-span-6 lg:p-8'
                : 'border-primary-900/15 bg-white lg:col-span-3'
            }`}
          >
            <h3 className={`font-display text-h4 ${tier.id === 'lead-capture-system' ? 'text-cream-300' : 'text-primary-900'}`}>
              {tier.name}
            </h3>
            <p className="mt-1 text-body-sm font-semibold text-accent-700">{tier.tagline}</p>
            <p className={`mt-4 text-body-sm ${tier.id === 'lead-capture-system' ? 'text-white/70' : 'text-text-secondary'}`}>
              {tier.goodFit}
            </p>
            <p className={`mt-5 font-display text-h4 ${tier.id === 'lead-capture-system' ? 'text-white' : 'text-primary-900'}`}>
              {tier.price}
            </p>
            <p className={`mt-1 text-xs ${tier.id === 'lead-capture-system' ? 'text-white/55' : 'text-text-muted'}`}>
              {tier.priceNote}
            </p>
            <ul className="mt-5 space-y-2.5">
              {tier.includes.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-2 text-body-sm ${tier.id === 'lead-capture-system' ? 'text-white/75' : 'text-text-secondary'}`}
                >
                  <Check className="mt-0.5 h-4 w-4 flex-none text-accent-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <BookCallLink
              data-cta={`tier-${tier.id}`}
              inquiryQuery={`tier=${tier.id}`}
              className={`group mt-auto inline-flex min-h-11 items-center gap-2 border-b border-accent-600 pb-1 pt-6 font-semibold ${
                tier.id === 'lead-capture-system' ? 'text-white' : 'text-primary-900'
              }`}
            >
              {tier.id === 'lead-flow-audit' ? 'Book the audit' : `Ask about ${tier.name}`}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </BookCallLink>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
