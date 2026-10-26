/**
 * Turns the check results (six page checks, then domain and email) into what
 * the visitor and Ben read: the one recommended offer (funnel/CHECKS.md
 * section 4), the "which offer covers this" notes, counts, and the
 * plain-text summary sent with a report request.
 *
 * Pure and client-safe: no Node imports.
 */

import { websiteRescue } from '@/data/offers';
import { tiers } from '@/data/tiers';
import type { CheckId, CheckResult, CheckStatus, OfferId, WebsiteCheckResult } from './types';

export interface StatusCounts {
  fail: number;
  warn: number;
  pass: number;
  unknown: number;
}

export function countStatuses(checks: CheckResult[]): StatusCounts {
  const counts: StatusCounts = { fail: 0, warn: 0, pass: 0, unknown: 0 };
  for (const check of checks) counts[check.status] += 1;
  return counts;
}

function statusOf(checks: CheckResult[], id: CheckResult['id']): CheckStatus | undefined {
  return checks.find((check) => check.id === id)?.status;
}

/** The operations checks read public data about the domain, not the page. */
const OPS_CHECKS = new Set<CheckId>(['domain', 'email']);

/**
 * First matching rule wins:
 * 1. C1, C2 or C3 fails, C1 is a parked page, or C6 fails: Website Rescue.
 * 2. C1 to C3 all pass and C5 warns: Lead Capture & Follow-Up System.
 * 3. Anything else: Lead Flow Audit.
 * No page check could run: no offer (the page offers a call instead), even
 * when the domain and email checks have results.
 * The domain and email checks do not change the offer; their notes point to
 * Site Care.
 */
export function recommendOffer(checks: CheckResult[]): OfferId | null {
  const pageChecks = checks.filter((check) => !OPS_CHECKS.has(check.id));
  if (pageChecks.length === 0 || pageChecks.every((check) => check.status === 'unknown')) return null;
  const loads = checks.find((check) => check.id === 'loads');
  const coreFail = (['loads', 'https', 'mobile'] as const).some((id) => statusOf(checks, id) === 'fail');
  if (coreFail || loads?.data?.parked === true || statusOf(checks, 'speed') === 'fail') return 'website-rescue';
  const corePass = (['loads', 'https', 'mobile'] as const).every((id) => statusOf(checks, id) === 'pass');
  if (corePass && statusOf(checks, 'form') === 'warn') return 'lead-capture-system';
  return 'lead-flow-audit';
}

/** The "which offer covers this" note under a warn or fail line. */
export function fixLine(check: CheckResult, offer: OfferId | null): string | undefined {
  if (check.status !== 'warn' && check.status !== 'fail') return undefined;
  switch (check.id) {
    case 'loads':
    case 'https':
    case 'mobile':
      return 'Website Rescue fixes this.';
    case 'call':
      return 'The Lead Flow Audit looks at this.';
    case 'form':
      return offer === 'website-rescue'
        ? 'Website Rescue includes a quote form.'
        : 'The Lead Capture & Follow-Up System covers this.';
    case 'speed':
      return check.status === 'fail' ? 'Website Rescue fixes this.' : 'The Lead Flow Audit looks at this.';
    case 'domain':
    case 'email':
      return 'Site Care covers this.';
    default:
      return undefined;
  }
}

/** Adds the recommended offer and the fix notes to the raw checks. */
export function withRecommendation(checks: CheckResult[]): { offer: OfferId | null; checks: CheckResult[] } {
  const offer = recommendOffer(checks);
  return {
    offer,
    checks: checks.map((check) => {
      const fix = fixLine(check, offer);
      return fix ? { ...check, fix } : check;
    }),
  };
}

export interface OfferDetails {
  id: OfferId;
  name: string;
  price: string;
  priceNote: string;
  includes: string[];
}

/** Name, price and includes for an offer, from the site's own data files. */
export function offerDetails(id: OfferId): OfferDetails {
  if (id === 'website-rescue') {
    return {
      id,
      name: websiteRescue.name,
      price: websiteRescue.price,
      priceNote: websiteRescue.priceNote,
      includes: websiteRescue.includes,
    };
  }
  const tier = tiers.find((item) => item.id === id);
  if (!tier) throw new Error(`Unknown offer ${id}`);
  return { id, name: tier.name, price: tier.price, priceNote: tier.priceNote, includes: tier.includes };
}

const SEVERITY: Record<CheckStatus, number> = { fail: 0, warn: 1, unknown: 2, pass: 3 };

/** Worst first, keeping the check order within a status. */
export function sortBySeverity(checks: CheckResult[]): CheckResult[] {
  return checks
    .map((check, index) => ({ check, index }))
    .sort((a, b) => SEVERITY[a.check.status] - SEVERITY[b.check.status] || a.index - b.index)
    .map((entry) => entry.check);
}

/** Screen-reader line when checking finishes (COPY.md section 6). */
export function doneAnnouncement(counts: StatusCounts): string {
  return `Done. ${counts.fail} need a fix, ${counts.warn} worth a look, ${counts.pass} look good.`;
}

const STATUS_TEXT: Record<CheckStatus, string> = {
  fail: 'FAIL',
  warn: 'WARN',
  pass: 'PASS',
  unknown: 'NOT CHECKED',
};

/**
 * Plain-text results sent to Ben with a report request. Everything in it came
 * from the check result; nothing about the visitor except what they typed.
 */
export function formatSummaryText(result: WebsiteCheckResult): string {
  const counts = countStatuses(result.checks);
  const offer = result.offer ? offerDetails(result.offer) : null;
  const lines = [
    `Website check: ${result.host}`,
    `Address entered: ${result.inputUrl}`,
    `Final URL: ${result.finalUrl ?? 'did not load'}`,
    `Checked: ${result.checkedAt}`,
    `Totals: ${counts.fail} fail, ${counts.warn} warn, ${counts.pass} pass, ${counts.unknown} not checked`,
    `Recommendation: ${offer ? `${offer.name} (${offer.price})` : 'none, the site could not be checked'}`,
    '',
    ...sortBySeverity(result.checks).map((check) => `${STATUS_TEXT[check.status]} | ${check.label}: ${check.line}`),
  ];
  const notes = result.checks.filter((check) => check.note).map((check) => `Note | ${check.label}: ${check.note}`);
  if (notes.length > 0) lines.push('', ...notes);
  return lines.join('\n');
}
