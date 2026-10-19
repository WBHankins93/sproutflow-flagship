/**
 * Runs one website check end to end inside a single 8 s budget:
 *
 * 1. In parallel: GET https://host/path (body read, capped) and a header-only
 *    probe of http://host/ that stops at the first redirect to https.
 * 2. If https could not connect or failed TLS: GET http://host/path instead.
 * 3. If the homepage has no form or embed: at most one same-origin GET of a
 *    contact or quote page.
 *
 * At most 4 requests to the target, every one through safeFetch (url-guard on
 * every hop). Server-only.
 */

import { evaluateChecks, needsContactPage } from './checks';
import { safeFetch, TOTAL_BUDGET_MS, type SafeFetchOptions, type SafeFetchResult } from './fetcher';
import { withRecommendation } from './summarize';
import type { WebsiteCheckResult } from './types';
import type { NormalizedInput } from './url-guard';

/** Skip the contact-page fetch when less than this much budget is left. */
const MIN_CONTACT_BUDGET_MS = 750;

export type RunDeps = Pick<SafeFetchOptions, 'fetchImpl' | 'lookup' | 'now'>;

export type RunOutcome = { kind: 'result'; result: WebsiteCheckResult } | { kind: 'blocked' };

function blocked(result: SafeFetchResult | null | undefined): boolean {
  return !!result && !result.ok && result.reason === 'blocked';
}

export async function runWebsiteCheck(input: NormalizedInput, deps: RunDeps = {}): Promise<RunOutcome> {
  const now = deps.now ?? Date.now;
  const deadline = now() + TOTAL_BUDGET_MS;
  const common = { ...deps, deadline };

  // Ports are limited to 80 and 443 (the scheme defaults), so build both
  // schemes from the host and path alone.
  const path = `${input.url.pathname}${input.url.search}`;
  const httpsUrl = `https://${input.hostname}${path}`;
  const httpUrl = `http://${input.hostname}${path}`;

  const [httpsResult, httpProbe] = await Promise.all([
    safeFetch(httpsUrl, common),
    safeFetch(`http://${input.hostname}/`, {
      ...common,
      readBody: false,
      followRedirect: (next) => next.protocol === 'http:',
    }),
  ]);
  if (blocked(httpsResult)) return { kind: 'blocked' };

  let httpFallback: SafeFetchResult | null = null;
  if (!httpsResult.ok && (httpsResult.reason === 'tls' || httpsResult.reason === 'connect')) {
    httpFallback = await safeFetch(httpUrl, common);
    if (blocked(httpFallback)) return { kind: 'blocked' };
  }

  const page = httpsResult.ok ? httpsResult : httpFallback ?? httpsResult;
  let contactPage: { pageName: string; fetch: SafeFetchResult } | null = null;
  const contact = needsContactPage(page);
  if (contact && deadline - now() >= MIN_CONTACT_BUDGET_MS) {
    // A blocked contact page simply counts as "no form found".
    contactPage = { pageName: contact.pageName, fetch: await safeFetch(contact.url, common) };
  }

  const run = evaluateChecks({
    host: input.displayHost,
    https: httpsResult,
    httpFallback,
    httpProbe,
    contactPage,
  });
  const { offer, checks } = withRecommendation(run.checks);

  return {
    kind: 'result',
    result: {
      checkedAt: new Date().toISOString(),
      inputUrl: input.input,
      host: input.displayHost,
      finalUrl: run.finalUrl,
      outcome: run.outcome,
      offer,
      checks,
    },
  };
}
