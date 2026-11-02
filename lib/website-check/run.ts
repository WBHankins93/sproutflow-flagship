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
 * every hop).
 *
 * Alongside steps 1 to 3, from the start and under the same deadline, the two
 * operations checks read public data about the domain, never the site itself:
 * - domain: the registry's RDAP record (rdap.ts; allowlisted https hosts only).
 * - email: SPF, DMARC and MX records over DNS (email-dns.ts).
 * They never throw and end as "could not check" when the deadline passes, so
 * the whole check still finishes within 8 s. Server-only.
 */

import { evaluateChecks, needsContactPage } from './checks';
import { checkEmail, type EmailDns } from './email-dns';
import { safeFetch, TOTAL_BUDGET_MS, type SafeFetchOptions, type SafeFetchResult } from './fetcher';
import { CHECK_LABELS } from './messages';
import { checkDomain } from './rdap';
import { withRecommendation } from './summarize';
import type { CheckResult, WebsiteCheckResult } from './types';
import type { NormalizedInput } from './url-guard';

/** Skip the contact-page fetch when less than this much budget is left. */
const MIN_CONTACT_BUDGET_MS = 750;

export type RunDeps = Pick<SafeFetchOptions, 'fetchImpl' | 'lookup' | 'now'> & {
  /** fetch for RDAP requests (registry servers, not the target site). Defaults to global fetch. */
  rdapFetch?: typeof fetch;
  /** DNS for the email check. Defaults to a dns.promises Resolver with a 3 s timeout. */
  emailDns?: EmailDns;
};

export type RunOutcome = { kind: 'result'; result: WebsiteCheckResult } | { kind: 'blocked' };

/** The domain and email checks. Never rejects. */
async function opsChecks(hostname: string, deps: RunDeps, deadline: number): Promise<CheckResult[]> {
  const now = deps.now ?? Date.now;
  const fallback = (id: 'domain' | 'email'): CheckResult => ({
    id,
    label: CHECK_LABELS[id],
    status: 'unknown',
    line: 'Not checked, something went wrong on my end.',
  });
  return Promise.all([
    checkDomain(hostname, { fetchImpl: deps.rdapFetch, now, deadline }).catch(() => fallback('domain')),
    checkEmail(hostname, { dns: deps.emailDns, now, deadline }).catch(() => fallback('email')),
  ]);
}

function blocked(result: SafeFetchResult | null | undefined): boolean {
  return !!result && !result.ok && result.reason === 'blocked';
}

export async function runWebsiteCheck(input: NormalizedInput, deps: RunDeps = {}): Promise<RunOutcome> {
  const now = deps.now ?? Date.now;
  const deadline = now() + TOTAL_BUDGET_MS;
  const common = { fetchImpl: deps.fetchImpl, lookup: deps.lookup, now: deps.now, deadline };

  // Started first so they overlap the page fetches; awaited at the end.
  const ops = opsChecks(input.hostname, deps, deadline);

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
  const { offer, checks } = withRecommendation([...run.checks, ...(await ops)]);

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
