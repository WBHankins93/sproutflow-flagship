/**
 * Email records check (website check v1, DIRECTION.md section 8, 19 Oct
 * "Care is the real product"): can the business's domain send and receive
 * email that inboxes trust? Read from public DNS only.
 *
 * - SPF: a TXT record on the domain starting "v=spf1".
 * - DMARC: a TXT record at _dmarc.<domain> starting "v=DMARC1"; its p= tag.
 * - MX: whether the domain has mail servers at all.
 *
 * pass: SPF and DMARC with p=quarantine or p=reject.
 * warn: anything in between (no DMARC, p=none, no SPF but mail servers).
 * fail: no MX records and no SPF (the domain cannot reliably send or receive).
 * unknown: a lookup timed out or the resolver failed, or there is no domain
 * of the visitor's own to check.
 *
 * DKIM cannot be verified without the sending service's selector, so the
 * result carries a note saying so instead of a guess.
 *
 * Three DNS lookups in parallel, 3 s timeout each, inside the shared check
 * deadline. Server-only (node:dns).
 */

import { promises as dnsPromises } from 'node:dns';
import type { MxRecord } from 'node:dns';
import { checkableDomain } from './domain-name';
import { CHECK_LABELS } from './messages';
import type { CheckResult, CheckStatus } from './types';

export const DNS_TIMEOUT_MS = 3000;

/** The two dns.promises calls this check needs (injectable for tests). */
export interface EmailDns {
  resolveTxt(hostname: string): Promise<string[][]>;
  resolveMx(hostname: string): Promise<MxRecord[]>;
}

/** A resolver that gives up after 3 s on one try, instead of the default 4 tries. */
export function defaultEmailDns(): EmailDns {
  const resolver = new dnsPromises.Resolver({ timeout: DNS_TIMEOUT_MS, tries: 1 });
  return {
    resolveTxt: (hostname) => resolver.resolveTxt(hostname),
    resolveMx: (hostname) => resolver.resolveMx(hostname),
  };
}

/** "No such record" answers. Anything else (timeout, SERVFAIL, refused) means I could not tell. */
const NO_RECORD_CODES = new Set(['ENODATA', 'ENOTFOUND', 'NXDOMAIN', 'ENONAME', 'EAI_NONAME', 'EAI_NODATA']);

type Lookup<T> = { ok: true; value: T } | { ok: false; missing: boolean };

class DnsTimeout extends Error {
  constructor() {
    super('dns timeout');
    this.name = 'DnsTimeout';
  }
}

async function lookup<T>(run: () => Promise<T>, timeoutMs: number): Promise<Lookup<T>> {
  if (timeoutMs <= 0) return { ok: false, missing: false };
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new DnsTimeout()), timeoutMs);
  });
  try {
    const pending = run();
    pending.catch(() => undefined);
    return { ok: true, value: await Promise.race([pending, timeout]) };
  } catch (error) {
    const code = (error as { code?: string })?.code;
    return { ok: false, missing: !!code && NO_RECORD_CODES.has(code) };
  } finally {
    clearTimeout(timer);
  }
}

/** TXT answers arrive split into 255-byte chunks; join each record back together. */
function joinTxt(records: string[][]): string[] {
  return records.map((chunks) => (Array.isArray(chunks) ? chunks.join('') : String(chunks)).trim());
}

export function findSpf(records: string[]): string | null {
  return records.find((record) => /^v=spf1(\s|$)/i.test(record)) ?? null;
}

export function findDmarc(records: string[]): string | null {
  return records.find((record) => /^v\s*=\s*DMARC1\s*(;|$)/i.test(record)) ?? null;
}

/** The p= policy of a DMARC record, lowercased, or null when it has none. */
export function dmarcPolicy(record: string): string | null {
  for (const part of record.split(';')) {
    const match = /^\s*p\s*=\s*([a-z]+)\s*$/i.exec(part);
    if (match) return match[1].toLowerCase();
  }
  return null;
}

const STRONG_POLICIES = new Set(['quarantine', 'reject']);

export const EMAIL_NOTE =
  'I did not check DKIM, the third email record, because it can only be looked up with a name your email provider picks.';

export const EMAIL_LINES = {
  pass: (policy: string) =>
    `Your domain has SPF and a DMARC policy set to ${policy}, the records inboxes look for before trusting your email.`,
  noDmarc: 'Your domain has SPF but no DMARC record, so nothing tells inboxes what to do with mail that fakes your address.',
  weakDmarc: (policy: string) =>
    `Your domain has SPF and DMARC, but DMARC is set to ${policy === 'none' ? 'watch only (p=none)' : 'no clear policy'}, so inboxes still deliver mail that fakes your address.`,
  noSpf: 'Your domain has a DMARC policy but no SPF record, so inboxes cannot confirm which servers may send email as you.',
  neither:
    'Your domain has no SPF record and no DMARC policy that inboxes act on, so they cannot confirm your email really comes from you and may send it to spam.',
  noMail: 'Your domain has no mail server (MX) record and no SPF record, so it cannot reliably send or receive email.',
  shared: (suffix: string) => `Your site is on a shared ${suffix} address, so there are no email records of your own for me to check.`,
  unsupported: (suffix: string) => `I cannot tell which part of a .${suffix} address is your domain, so I did not check its email records.`,
  unavailable: (domain: string) => `I could not read the email records for ${domain} in time, so I could not check them.`,
};

function result(status: CheckStatus, line: string, data?: CheckResult['data'], note?: string): CheckResult {
  const base: CheckResult = { id: 'email', label: CHECK_LABELS.email, status, line };
  return { ...base, ...(data ? { data } : {}), ...(note ? { note } : {}) };
}

export interface EmailCheckDeps {
  dns?: EmailDns;
  now?: () => number;
  /** Epoch ms shared with the rest of the website check. */
  deadline?: number;
}

/** The email records check for a host. Never throws. */
export async function checkEmail(hostname: string, deps: EmailCheckDeps = {}): Promise<CheckResult> {
  const target = checkableDomain(hostname);
  if (target.kind === 'shared') return result('unknown', EMAIL_LINES.shared(target.suffix), { reason: 'shared-address' });
  if (target.kind === 'unsupported') {
    return result('unknown', EMAIL_LINES.unsupported(target.suffix), { reason: 'unsupported-suffix' });
  }
  const { domain } = target;

  const now = deps.now ?? Date.now;
  const timeoutMs = Math.min(DNS_TIMEOUT_MS, (deps.deadline ?? now() + DNS_TIMEOUT_MS) - now());

  let dns: EmailDns;
  try {
    dns = deps.dns ?? defaultEmailDns();
  } catch {
    return result('unknown', EMAIL_LINES.unavailable(domain), { domain, reason: 'error' });
  }

  const [txt, dmarcTxt, mx] = await Promise.all([
    lookup(() => dns.resolveTxt(domain), timeoutMs),
    lookup(() => dns.resolveTxt(`_dmarc.${domain}`), timeoutMs),
    lookup(() => dns.resolveMx(domain), timeoutMs),
  ]);

  // Without both TXT answers I cannot judge SPF or DMARC either way.
  if ((!txt.ok && !txt.missing) || (!dmarcTxt.ok && !dmarcTxt.missing)) {
    return result('unknown', EMAIL_LINES.unavailable(domain), { domain, reason: 'dns' });
  }

  const spf = txt.ok ? findSpf(joinTxt(txt.value)) : null;
  const dmarc = dmarcTxt.ok ? findDmarc(joinTxt(dmarcTxt.value)) : null;
  const policy = dmarc ? dmarcPolicy(dmarc) : null;
  const strong = !!policy && STRONG_POLICIES.has(policy);
  // A "null MX" (RFC 7505: exchange ".") says the domain takes no mail.
  const hasMx: boolean | null = mx.ok
    ? mx.value.some((record) => !!record && !!record.exchange && record.exchange !== '.')
    : mx.missing
      ? false
      : null;

  const data: CheckResult['data'] = {
    domain,
    spf: !!spf,
    dmarc: dmarc ? policy ?? 'no-policy' : 'missing',
    mx: hasMx === null ? 'unknown' : hasMx,
  };

  if (spf && strong) return result('pass', EMAIL_LINES.pass(policy as string), data, EMAIL_NOTE);
  if (!spf && hasMx === false) return result('fail', EMAIL_LINES.noMail, data, EMAIL_NOTE);
  if (spf && !dmarc) return result('warn', EMAIL_LINES.noDmarc, data, EMAIL_NOTE);
  if (spf) return result('warn', EMAIL_LINES.weakDmarc(policy ?? ''), data, EMAIL_NOTE);
  if (strong) return result('warn', EMAIL_LINES.noSpf, data, EMAIL_NOTE);
  return result('warn', EMAIL_LINES.neither, data, EMAIL_NOTE);
}
