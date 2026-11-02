/**
 * Domain renewal check (website check v1, DIRECTION.md section 8, 19 Oct
 * "Care is the real product"): when does the domain's registration expire,
 * read from the public registry over RDAP.
 *
 * - Which RDAP server: IANA's bootstrap file for DNS
 *   (https://data.iana.org/rdap/dns.json), cached in memory for 24 h. When it
 *   is unavailable, or does not list a TLD, a small static map covers the
 *   common ones (com, net, org, us, co, io, biz, info). In Oct 2026 the IANA
 *   file does not list us, co or io at all, so those always use the map.
 * - Network safety: https only, and only to hosts named in the bootstrap file
 *   or the static map (an allowlist checked on the first request and on every
 *   redirect). Redirects are followed by hand, at most 2, and never to another
 *   host. 5 s timeout per request, 256 KB body cap, GET only, no cookies.
 * - Privacy: RDAP bodies can include registrant contact data. Only the
 *   expiration date is kept; bodies are never logged or stored.
 * - Never fails for a reason on my side: no RDAP server, a timeout, a rate
 *   limit or a missing expiration event all give "could not check" (unknown).
 *
 * Server-only (imports the fetcher, which imports node:dns).
 */

import { checkableDomain } from './domain-name';
import { readBodyCapped } from './fetcher';
import { CHECK_LABELS, USER_AGENT } from './messages';
import type { CheckResult, CheckStatus } from './types';
import { isIpLiteral } from './url-guard';

export const BOOTSTRAP_URL = 'https://data.iana.org/rdap/dns.json';
export const BOOTSTRAP_TTL_MS = 24 * 60 * 60 * 1000;
/** After a failed bootstrap fetch, wait this long before asking IANA again. */
export const BOOTSTRAP_RETRY_MS = 10 * 60 * 1000;
/** How long one check waits on a cold bootstrap before using the static map. */
export const BOOTSTRAP_WAIT_MS = 2500;
export const RDAP_TIMEOUT_MS = 5000;
export const RDAP_MAX_BYTES = 256 * 1024;
export const MAX_RDAP_REDIRECTS = 2;
/** Warn when the domain expires this many days from now or sooner. */
export const RENEWAL_WARN_DAYS = 60;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Fallback RDAP base URLs, checked by hand in Oct 2026. The IANA file wins
 * when it lists the TLD.
 */
export const STATIC_RDAP: Record<string, string> = {
  com: 'https://rdap.verisign.com/com/v1/',
  net: 'https://rdap.verisign.com/net/v1/',
  org: 'https://rdap.publicinterestregistry.org/rdap/',
  us: 'https://rdap.nic.us/',
  co: 'https://rdap.registry.co/co/',
  io: 'https://rdap.identitydigital.services/rdap/',
  biz: 'https://rdap.nic.biz/',
  info: 'https://rdap.identitydigital.services/rdap/',
};

/** TLD (lowercase, no dot) to RDAP base URLs (https, trailing slash). */
export type RdapServices = Map<string, string[]>;

/* ------------------------------------------------------------------ */
/* Allowlist                                                           */
/* ------------------------------------------------------------------ */

/** The URL shape every RDAP request must have, before the host allowlist. */
function safeHttpsUrl(url: URL): boolean {
  if (url.protocol !== 'https:') return false;
  if (url.username || url.password) return false;
  if (url.port !== '' && url.port !== '443') return false;
  const host = url.hostname.toLowerCase();
  return !!host && host.indexOf('.') > 0 && !isIpLiteral(host);
}

/** A base URL from the bootstrap file or static map, normalized, or null when unsafe. */
function rdapBase(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (!safeHttpsUrl(url) || url.search || url.hash) return null;
  return url.href.endsWith('/') ? url.href : `${url.href}/`;
}

function hostOf(base: string): string {
  return new URL(base).hostname.toLowerCase();
}

/** Every host an RDAP request may go to: those in the bootstrap file and the static map. */
export function allowedRdapHosts(services: RdapServices | null): Set<string> {
  const hosts = new Set<string>();
  Object.keys(STATIC_RDAP).forEach((tld) => hosts.add(hostOf(STATIC_RDAP[tld])));
  if (services) services.forEach((bases) => bases.forEach((base) => hosts.add(hostOf(base))));
  return hosts;
}

export function isAllowedRdapUrl(url: URL, allowedHosts: Set<string>): boolean {
  return safeHttpsUrl(url) && allowedHosts.has(url.hostname.toLowerCase());
}

/* ------------------------------------------------------------------ */
/* Bootstrap                                                           */
/* ------------------------------------------------------------------ */

/**
 * Reads IANA's bootstrap JSON ({ services: [[tlds], [urls]][] }). Keeps only
 * https base URLs that pass the URL checks. Null when nothing usable is left.
 */
export function parseBootstrap(json: unknown): RdapServices | null {
  const services = json && typeof json === 'object' ? (json as { services?: unknown }).services : undefined;
  if (!Array.isArray(services)) return null;
  const map: RdapServices = new Map();
  for (const entry of services) {
    if (!Array.isArray(entry) || !Array.isArray(entry[0]) || !Array.isArray(entry[1])) continue;
    const bases = (entry[1] as unknown[]).map(rdapBase).filter((base): base is string => base !== null);
    if (bases.length === 0) continue;
    for (const tld of entry[0] as unknown[]) {
      if (typeof tld !== 'string') continue;
      const key = tld.toLowerCase().replace(/^\./, '');
      if (/^[a-z0-9-]{2,63}$/.test(key)) map.set(key, bases);
    }
  }
  return map.size > 0 ? map : null;
}

interface BootstrapCache {
  services: RdapServices | null;
  fetchedAt: number;
  failedAt: number;
  inFlight: Promise<RdapServices | null> | null;
}

let cache: BootstrapCache = { services: null, fetchedAt: 0, failedAt: 0, inFlight: null };

/** Test hook: forget the cached bootstrap. */
export function resetRdapCache(): void {
  cache = { services: null, fetchedAt: 0, failedAt: 0, inFlight: null };
}

/** Background timers must not keep a Node process (or a test run) alive. */
function unref(timer: ReturnType<typeof setTimeout>): ReturnType<typeof setTimeout> {
  (timer as { unref?: () => void }).unref?.();
  return timer;
}

function waitAtMost<T>(promise: Promise<T>, ms: number, fallback: () => T): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<T>((resolve) => {
    timer = unref(setTimeout(() => resolve(fallback()), Math.max(ms, 0)));
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * The IANA bootstrap, from the 24 h memory cache or a fresh fetch. A stale
 * copy is kept when a refresh fails. Waits at most `waitMs` for a fetch in
 * progress (it keeps running and fills the cache for the next check), and
 * resolves to whatever is cached, possibly null, after that.
 */
export async function getBootstrap(options: { fetchImpl: typeof fetch; now: () => number; waitMs: number }): Promise<RdapServices | null> {
  const { fetchImpl, now, waitMs } = options;
  const time = now();
  if (cache.services && time - cache.fetchedAt < BOOTSTRAP_TTL_MS) return cache.services;
  if (cache.failedAt && time - cache.failedAt < BOOTSTRAP_RETRY_MS) return cache.services;

  if (!cache.inFlight) {
    const iana = new Set([new URL(BOOTSTRAP_URL).hostname]);
    const current = cache;
    current.inFlight = fetchRdapJson(BOOTSTRAP_URL, { fetchImpl, now, timeoutMs: RDAP_TIMEOUT_MS, allowedHosts: iana })
      .then((response) => (response.ok ? parseBootstrap(response.body) : null))
      .catch(() => null)
      .then((services) => {
        if (services) {
          current.services = services;
          current.fetchedAt = now();
          current.failedAt = 0;
        } else {
          current.failedAt = now();
        }
        current.inFlight = null;
        return current.services;
      });
  }
  const inFlight = cache.inFlight as Promise<RdapServices | null>;
  return waitAtMost(inFlight, waitMs, () => cache.services);
}

/** Where to ask about a TLD: the IANA file first, then the static map. */
export function rdapBaseFor(tld: string, services: RdapServices | null): { base: string; source: 'iana' | 'static' } | null {
  const key = tld.toLowerCase();
  const listed = services?.get(key);
  if (listed && listed.length > 0) return { base: listed[0], source: 'iana' };
  const fallback = Object.prototype.hasOwnProperty.call(STATIC_RDAP, key) ? STATIC_RDAP[key] : undefined;
  return fallback ? { base: fallback, source: 'static' } : null;
}

/* ------------------------------------------------------------------ */
/* The capped request                                                  */
/* ------------------------------------------------------------------ */

export type RdapFailure = 'refused' | 'timeout' | 'rate-limited' | 'not-found' | 'http' | 'too-large' | 'bad-json' | 'error';

export type RdapFetchResult = { ok: true; body: unknown } | { ok: false; reason: RdapFailure; status?: number };

class RdapTimeout extends Error {
  constructor() {
    super('rdap timeout');
    this.name = 'RdapTimeout';
  }
}

function beforeDeadline<T>(promise: Promise<T>, deadline: number, now: () => number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = unref(setTimeout(() => reject(new RdapTimeout()), Math.max(deadline - now(), 0)));
  });
  promise.catch(() => undefined);
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

function discardBody(response: Response): void {
  try {
    response.body?.cancel().catch(() => undefined);
  } catch {
    /* already consumed or locked */
  }
}

/**
 * GETs an RDAP (or bootstrap) URL as JSON with the limits above. Never
 * throws. Refuses any URL, first or redirected, whose host is not allowed.
 */
export async function fetchRdapJson(
  url: string,
  options: { fetchImpl: typeof fetch; now: () => number; timeoutMs: number; allowedHosts: Set<string>; maxBytes?: number },
): Promise<RdapFetchResult> {
  const { fetchImpl, now, timeoutMs, allowedHosts, maxBytes = RDAP_MAX_BYTES } = options;
  let current: URL;
  try {
    current = new URL(url);
  } catch {
    return { ok: false, reason: 'refused' };
  }
  if (!isAllowedRdapUrl(current, allowedHosts)) return { ok: false, reason: 'refused' };
  if (timeoutMs <= 0) return { ok: false, reason: 'timeout' };

  const deadline = now() + timeoutMs;
  const controller = new AbortController();
  const abortTimer = unref(setTimeout(() => controller.abort(), timeoutMs));
  try {
    for (let redirects = 0; ; redirects += 1) {
      const response = await beforeDeadline(
        fetchImpl(current.href, {
          method: 'GET',
          redirect: 'manual',
          signal: controller.signal,
          cache: 'no-store',
          credentials: 'omit',
          headers: { Accept: 'application/rdap+json, application/json;q=0.9', 'User-Agent': USER_AGENT },
        }),
        deadline,
        now,
      );

      if (response.status >= 300 && response.status < 400) {
        discardBody(response);
        const location = response.headers.get('location');
        let next: URL | null = null;
        try {
          next = location ? new URL(location, current) : null;
        } catch {
          next = null;
        }
        // Same host only, and that host must still pass the allowlist.
        if (!next || next.hostname.toLowerCase() !== current.hostname.toLowerCase() || !isAllowedRdapUrl(next, allowedHosts)) {
          return { ok: false, reason: 'refused', status: response.status };
        }
        if (redirects >= MAX_RDAP_REDIRECTS) return { ok: false, reason: 'error', status: response.status };
        current = next;
        continue;
      }

      if (response.status === 429) return discarded(response, { ok: false, reason: 'rate-limited', status: 429 });
      if (response.status === 404) return discarded(response, { ok: false, reason: 'not-found', status: 404 });
      if (response.status < 200 || response.status >= 300) {
        return discarded(response, { ok: false, reason: 'http', status: response.status });
      }
      const declared = Number(response.headers.get('content-length') || 0);
      if (declared > maxBytes) return discarded(response, { ok: false, reason: 'too-large', status: response.status });

      const read = await readBodyCapped(response, maxBytes, deadline, now);
      if (read.truncated) return { ok: false, reason: 'too-large', status: response.status };
      try {
        return { ok: true, body: JSON.parse(read.text) };
      } catch {
        return { ok: false, reason: 'bad-json', status: response.status };
      }
    }
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === 'RdapTimeout' || name === 'DeadlineError' || name === 'AbortError' || name === 'TimeoutError') {
      return { ok: false, reason: 'timeout' };
    }
    return { ok: false, reason: 'error' };
  } finally {
    clearTimeout(abortTimer);
    controller.abort();
  }
}

function discarded(response: Response, result: RdapFetchResult): RdapFetchResult {
  discardBody(response);
  return result;
}

/* ------------------------------------------------------------------ */
/* The check                                                           */
/* ------------------------------------------------------------------ */

/** The registration's expiry from an RDAP domain object, or null when it is not listed. */
export function expirationDate(body: unknown): Date | null {
  const events = body && typeof body === 'object' ? (body as { events?: unknown }).events : undefined;
  if (!Array.isArray(events)) return null;
  for (const event of events) {
    if (!event || typeof event !== 'object') continue;
    const { eventAction, eventDate } = event as { eventAction?: unknown; eventDate?: unknown };
    if (typeof eventAction !== 'string' || eventAction.toLowerCase() !== 'expiration') continue;
    if (typeof eventDate !== 'string') continue;
    const time = Date.parse(eventDate);
    if (!isNaN(time)) return new Date(time);
  }
  return null;
}

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "Nov 4, 2026", in UTC (registries publish UTC timestamps). */
export function formatDay(date: Date): string {
  return DATE_FORMAT.format(date);
}

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function result(status: CheckStatus, line: string, data?: CheckResult['data']): CheckResult {
  const base: CheckResult = { id: 'domain', label: CHECK_LABELS.domain, status, line };
  return data ? { ...base, data } : base;
}

export const DOMAIN_LINES = {
  shared: (suffix: string) => `Your site is on a shared ${suffix} address, so there is no domain of your own for me to check.`,
  unsupported: (suffix: string) => `I cannot tell which part of a .${suffix} address is your domain, so I did not check when it renews.`,
  noRegistry: (tld: string) => `The registry for .${tld} addresses does not publish renewal dates, so I could not check when your domain renews.`,
  noDate: (domain: string) => `The registry does not list a renewal date for ${domain}, so I could not check it.`,
  unavailable: 'I could not get an answer from the domain registry in time, so I could not check when your domain renews.',
};

/** Pass, warn or fail from the expiry date (funnel brief: warn at 60 days or fewer). */
export function judgeExpiry(domain: string, expiry: Date, nowMs: number): CheckResult {
  const msLeft = expiry.getTime() - nowMs;
  const daysLeft = Math.floor(msLeft / DAY_MS);
  const day = formatDay(expiry);
  const data = { domain, expires: isoDay(expiry), days_left: daysLeft };
  if (msLeft <= 0) {
    return result(
      'fail',
      `The public registry shows your domain expired on ${day}. Until it is renewed, your site and email can stop working at any time.`,
      data,
    );
  }
  if (daysLeft <= RENEWAL_WARN_DAYS) {
    const when = daysLeft === 0 ? 'today' : `in ${daysLeft} ${daysLeft === 1 ? 'day' : 'days'}`;
    return result('warn', `Your domain renews by ${day}, ${when}. If auto-renew is off, your site and email stop.`, data);
  }
  return result('pass', `Your domain, ${domain}, is registered until ${day}. No renewal is due in the next ${RENEWAL_WARN_DAYS} days.`, data);
}

export interface DomainCheckDeps {
  fetchImpl?: typeof fetch;
  now?: () => number;
  /** Epoch ms shared with the rest of the website check. */
  deadline?: number;
  /** Override BOOTSTRAP_WAIT_MS (tests). */
  bootstrapWaitMs?: number;
}

/** The domain renewal check for a host. Never throws; never fails for a reason on my side. */
export async function checkDomain(hostname: string, deps: DomainCheckDeps = {}): Promise<CheckResult> {
  const now = deps.now ?? Date.now;
  const fetchImpl = deps.fetchImpl ?? fetch;
  const deadline = deps.deadline ?? now() + BOOTSTRAP_WAIT_MS + RDAP_TIMEOUT_MS;

  const target = checkableDomain(hostname);
  if (target.kind === 'shared') return result('unknown', DOMAIN_LINES.shared(target.suffix), { reason: 'shared-address' });
  if (target.kind === 'unsupported') {
    return result('unknown', DOMAIN_LINES.unsupported(target.suffix), { reason: 'unsupported-suffix' });
  }
  const { domain, tld } = target;
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain)) return result('unknown', DOMAIN_LINES.unavailable, { reason: 'bad-domain' });

  try {
    const waitMs = Math.min(deps.bootstrapWaitMs ?? BOOTSTRAP_WAIT_MS, deadline - now());
    const services = await getBootstrap({ fetchImpl, now, waitMs });
    const endpoint = rdapBaseFor(tld, services);
    if (!endpoint) return result('unknown', DOMAIN_LINES.noRegistry(tld), { domain, reason: 'no-rdap' });

    const response = await fetchRdapJson(`${endpoint.base}domain/${domain}`, {
      fetchImpl,
      now,
      timeoutMs: Math.min(RDAP_TIMEOUT_MS, deadline - now()),
      allowedHosts: allowedRdapHosts(services),
    });
    if (!response.ok) return result('unknown', DOMAIN_LINES.unavailable, { domain, reason: response.reason });

    const expiry = expirationDate(response.body);
    if (!expiry) return result('unknown', DOMAIN_LINES.noDate(domain), { domain, reason: 'no-expiration' });
    return judgeExpiry(domain, expiry, now());
  } catch {
    return result('unknown', DOMAIN_LINES.unavailable, { domain, reason: 'error' });
  }
}
