'use client';

import { forwardRef } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_LABEL } from '@/lib/constants';
import { countStatuses, offerDetails, sortBySeverity } from '@/lib/website-check/summarize';
import type { OfferId, WebsiteCheckResult } from '@/lib/website-check/types';
import { ReportRequest } from './ReportRequest';
import { StatusChip } from './StatusChip';
import { cardClass, offerCardClass, primaryButtonClass } from './styles';

function OfferCard({ offer, allPass }: { offer: OfferId | null; allPass: boolean }) {
  const phoneLine = (
    <p className="mt-3 text-sm text-text-secondary">
      15 minutes with me, Ben. No pitch deck, no prep. Or call{' '}
      <a href="tel:+15043261676" className="font-semibold text-primary-800 underline underline-offset-2">
        (504) 326-1676
      </a>
      .
    </p>
  );

  if (!offer) {
    return (
      <div className={offerCardClass}>
        <p className="text-eyebrow uppercase text-accent-700">Next step</p>
        <h3 className="mt-3 font-display text-display-sm text-primary-900">Let me check it with you.</h3>
        <p className="mt-3 text-text-secondary">
          Some sites turn away automated checkers. Ask for the report below and I will check it by hand, or book a
          call and I will check it with you.
        </p>
        <BookCallLink data-cta="website-check-offer" className={`mt-5 w-full ${primaryButtonClass}`}>
          {BOOKING_CTA_LABEL}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </BookCallLink>
        {phoneLine}
      </div>
    );
  }

  const details = offerDetails(offer);
  const audit = offer === 'lead-capture-system' ? offerDetails('lead-flow-audit') : null;
  const intro =
    offer === 'website-rescue'
      ? 'This is the fixed-price way I fix what I found.'
      : offer === 'lead-capture-system'
        ? 'Your site covers the first basics. The next step is giving every inquiry a clear way to reach you.'
        : 'The next place to look is what happens after someone reaches out.';

  return (
    <div className={offerCardClass}>
      <p className="text-eyebrow uppercase text-accent-700">{allPass ? 'Your site covers the basics' : 'My recommendation'}</p>
      <h3 className="mt-3 font-display text-display-sm text-primary-900">{details.name}</h3>
      <p className="mt-2">
        <span className="font-display text-2xl font-bold text-primary-900">{details.price}</span>{' '}
        <span className="text-sm text-text-secondary">{details.priceNote}</span>
      </p>
      <p className="mt-3 text-primary-900">{intro}</p>
      <ul className="mt-4 space-y-2">
        {details.includes.map((item) => (
          <li key={item} className="grid grid-cols-[18px_minmax(0,1fr)] gap-2 text-[15px] text-text-secondary">
            <Check className="mt-1 h-[18px] w-[18px] text-primary-700" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {audit && (
        <p className="mt-4 text-sm text-text-secondary">
          Want a smaller first step? The {audit.name} is {audit.price}, {audit.priceNote}.
        </p>
      )}
      <div className="mt-5 border-t border-primary-900/15 pt-5">
        <BookCallLink data-cta="website-check-offer" inquiryQuery={`tier=${offer}`} className={`w-full ${primaryButtonClass}`}>
          {BOOKING_CTA_LABEL}
          <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
        </BookCallLink>
        {phoneLine}
      </div>
    </div>
  );
}

type Props = { result: WebsiteCheckResult; onRestart: () => void };

/** Screen 3 of check-flow.html: results, the one offer, and the report request. */
export const CheckResults = forwardRef<HTMLHeadingElement, Props>(function CheckResults({ result, onRestart }, headingRef) {
  const counts = countStatuses(result.checks);
  const allPass = counts.pass === result.checks.length;
  const heading =
    result.outcome === 'not-checked'
      ? `I could not check ${result.host}`
      : allPass
        ? 'Your site covers the basics.'
        : `Here is what I found on ${result.host}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <div className={`${cardClass} min-w-0`}>
        <p className="text-eyebrow uppercase text-accent-700">Your results</p>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-3 font-display text-display-md text-primary-900 [overflow-wrap:anywhere] focus:outline-none"
        >
          {heading}
        </h2>
        {allPass && <p className="mt-3 text-text-secondary">The next place to look is what happens after someone reaches out.</p>}

        <div className="mt-5 flex flex-wrap gap-2">
          {counts.fail > 0 && <StatusChip status="fail">{counts.fail} {counts.fail === 1 ? 'needs' : 'need'} a fix</StatusChip>}
          {counts.warn > 0 && <StatusChip status="warn">{counts.warn} worth a look</StatusChip>}
          {counts.pass > 0 && <StatusChip status="pass">{counts.pass} {counts.pass === 1 ? 'looks' : 'look'} good</StatusChip>}
          {counts.unknown > 0 && <StatusChip status="unknown">{counts.unknown} not checked</StatusChip>}
        </div>

        {result.outcome === 'not-loaded' && (
          <p className="mt-4 text-text-secondary">I could not load this site, so the other checks did not run.</p>
        )}

        <ul className="mt-6 border-t border-primary-900/15">
          {sortBySeverity(result.checks).map((check) => (
            <li
              key={check.id}
              className="grid gap-2 border-b border-primary-900/15 py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-4"
            >
              <div>
                <StatusChip status={check.status} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-primary-900">{check.label}</p>
                <p className="mt-1 text-primary-900 [overflow-wrap:anywhere]">{check.line}</p>
                {check.fix && <p className="mt-1 text-sm text-text-secondary">{check.fix}</p>}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-text-muted">
          Checked from my server just now. The speed line is an estimate from the page code, not a lab test.
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-800 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Check another site
        </button>
      </div>

      <aside className="min-w-0 space-y-6" aria-label="Next step">
        <OfferCard offer={result.offer} allPass={allPass} />
        <ReportRequest result={result} />
      </aside>
    </div>
  );
});
