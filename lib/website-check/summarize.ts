/**
 * Turns the check results (six page checks, then domain and email) into what
 * the visitor and Ben read: the one recommended offer (funnel/CHECKS.md
 * section 4), the "which offer covers this" notes, counts, and the
 * plain-text summary sent with a report request.
 *
 * Pure and client-safe: no Node imports.
 */

import { customQuote, formatShortPrice, getIncludedItems, getOffer, toOfferKey } from '@/data/catalog';
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

const isIssue = (check: CheckResult) => check.status === 'warn' || check.status === 'fail';

/** The operations checks read public data about the domain, not the page. */
const OPS_CHECKS = new Set<CheckId>(['domain', 'email']);

/**
 * First matching rule wins (offer keys from data/catalog.ts):
 * 1. C1, C2 or C3 fails, C1 is a parked page, or C6 fails: a dead, missing or
 *    broken site, so the Starter landing page (old id website-rescue).
 * 2. C1 to C3 all pass and C5 warns: a custom quote, "Bring me the problem"
 *    (old id lead-capture-system).
 * 3. Any other page check warns or fails (the lead path: call, form, speed):
 *    the Lead Flow Audit.
 * 4. Every page check passes but the domain or email check warns or fails:
 *    Site Care.
 * 5. Everything passes: the Lead Flow Audit, the next place to look.
 * No page check could run: no offer (the page offers a call instead), even
 * when the domain and email checks have results.
 */
export function recommendOffer(checks: CheckResult[]): OfferId | null {
  const pageChecks = checks.filter((check) => !OPS_CHECKS.has(check.id));
  if (pageChecks.length === 0 || pageChecks.every((check) => check.status === 'unknown')) return null;
  const loads = checks.find((check) => check.id === 'loads');
  const coreFail = (['loads', 'https', 'mobile'] as const).some((id) => statusOf(checks, id) === 'fail');
  if (coreFail || loads?.data?.parked === true || statusOf(checks, 'speed') === 'fail') return 'starter';
  const corePass = (['loads', 'https', 'mobile'] as const).every((id) => statusOf(checks, id) === 'pass');
  if (corePass && statusOf(checks, 'form') === 'warn') return 'custom';
  if (pageChecks.some(isIssue)) return 'audit';
  if (checks.some((check) => OPS_CHECKS.has(check.id) && isIssue(check))) return 'care';
  return 'audit';
}

/** Fix lines, one per offer, so every note names an offer that is on the site. */
export const FIX_LINES = {
  starter: 'A starter landing page fixes this.',
  starterForm: 'A starter landing page includes a quote form.',
  audit: 'The Lead Flow Audit looks at this.',
  custom: 'A custom quote covers this. Bring me the problem.',
  care: 'Site Care covers this.',
} as const;

/** The "which offer covers this" note under a warn or fail line. */
export function fixLine(check: CheckResult, offer: OfferId | null): string | undefined {
  if (!isIssue(check)) return undefined;
  switch (check.id) {
    case 'loads':
    case 'https':
    case 'mobile':
      return FIX_LINES.starter;
    case 'call':
      return FIX_LINES.audit;
    case 'form':
      if (offer === 'starter') return FIX_LINES.starterForm;
      return offer === 'custom' ? FIX_LINES.custom : FIX_LINES.audit;
    case 'speed':
      return check.status === 'fail' ? FIX_LINES.starter : FIX_LINES.audit;
    case 'domain':
    case 'email':
      return FIX_LINES.care;
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
  /** "$500", "$99/mo or $150/mo"; null for the custom quote, which has no price. */
  price: string | null;
  /** The price note, or the range line for the custom quote. */
  priceNote: string;
  includes: string[];
}

/**
 * Name, price and includes for an offer, all from data/catalog.ts. An old id
 * from before the 29 Oct restructure ("website-rescue") maps to its new key.
 */
export function offerDetails(offerId: OfferId): OfferDetails {
  const id: OfferId = toOfferKey(offerId) ?? 'custom';
  if (id === 'custom') {
    return {
      id,
      name: customQuote.name,
      price: null,
      priceNote: customQuote.range,
      includes: customQuote.steps.map((step) => `${step.title}. ${step.body}`),
    };
  }
  const offer = getOffer(id);
  if (!offer) throw new Error(`Unknown offer ${id}`);
  return {
    id,
    name: offer.name,
    price: formatShortPrice(offer),
    priceNote: offer.priceNote ?? '',
    includes: getIncludedItems(offer).filter((item) => item !== offer.priceNote),
  };
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
    `Recommendation: ${offer ? `${offer.name} (${offer.price ?? 'quoted after a call'})` : 'none, the site could not be checked'}`,
    '',
    ...sortBySeverity(result.checks).map((check) => `${STATUS_TEXT[check.status]} | ${check.label}: ${check.line}`),
  ];
  const notes = result.checks.filter((check) => check.note).map((check) => `Note | ${check.label}: ${check.note}`);
  if (notes.length > 0) lines.push('', ...notes);
  return lines.join('\n');
}
