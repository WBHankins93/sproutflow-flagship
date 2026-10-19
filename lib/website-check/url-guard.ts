/**
 * The SSRF boundary for the website check.
 *
 * Everything the checker fetches passes through here first: the visitor's
 * input, every redirect hop and the one contact-page follow-up. The module is
 * pure (no Node imports) so the client can reuse normalizeInput() for instant
 * errors; DNS is injected by the caller (the fetcher passes
 * dns.promises.lookup).
 *
 * Rules (funnel/CHECKS.md section 1 and the v0 brief):
 * - http and https only, ports 80 and 443 only, no user:pass@, no IP literals.
 * - Host must look public: a dot, a plausible TLD, not localhost/.local/etc.
 * - DNS must resolve, and EVERY resolved address must be public. A mixed
 *   answer (one public, one private) is rejected.
 *
 * Known gap (v1): this validates the addresses DNS returns, then fetch()
 * resolves the host again when it connects. A hostile DNS server could answer
 * the second lookup with a private address (DNS rebinding). Closing that needs
 * IP pinning: connecting to the validated address through a custom `lookup`
 * on node:http/node:https or an undici Agent. The short TTL window, the
 * GET-only, no-credentials request and the 2 MB / 8 s caps limit the damage
 * in the meantime.
 */

export const MAX_URL_LENGTH = 2048;
export const MAX_HOST_LENGTH = 253;

export type InputRejection = 'empty' | 'invalid' | 'blocked';

export interface NormalizedInput {
  ok: true;
  /** The URL to check, with scheme (https:// added when missing). */
  url: URL;
  /** Lowercase hostname, no trailing dot. */
  hostname: string;
  /** Hostname without a leading www., for display. */
  displayHost: string;
  /** The trimmed text the visitor typed. */
  input: string;
}

export type NormalizeResult = NormalizedInput | { ok: false; reason: InputRejection };

/** Suffixes that are never public websites. */
const BLOCKED_HOST_SUFFIXES = ['localhost', 'local', 'internal', 'lan', 'home.arpa', 'localdomain', 'intranet', 'corp'];

function hostEndsWith(hostname: string, suffix: string): boolean {
  return hostname === suffix || hostname.endsWith(`.${suffix}`);
}

/** Strict dotted-quad parser. Returns four octets or null. */
export function parseIPv4(input: string): number[] | null {
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(input);
  if (!match) return null;
  const octets = match.slice(1).map(Number);
  return octets.every((octet) => octet <= 255) ? octets : null;
}

/** Parses an IPv6 address (with optional [brackets], zone id or dotted tail) into 8 groups. */
export function parseIPv6(input: string): number[] | null {
  let value = input.trim().toLowerCase();
  if (value.startsWith('[') && value.endsWith(']')) value = value.slice(1, -1);
  const zone = value.indexOf('%');
  if (zone >= 0) value = value.slice(0, zone);
  if (!value.includes(':')) return null;

  // An embedded IPv4 tail (::ffff:127.0.0.1) becomes two hex groups.
  const lastColon = value.lastIndexOf(':');
  const tail = value.slice(lastColon + 1);
  if (tail.includes('.')) {
    const v4 = parseIPv4(tail);
    if (!v4) return null;
    const high = ((v4[0] << 8) | v4[1]).toString(16);
    const low = ((v4[2] << 8) | v4[3]).toString(16);
    value = `${value.slice(0, lastColon + 1)}${high}:${low}`;
  }

  const halves = value.split('::');
  if (halves.length > 2) return null;
  const toGroups = (part: string) => (part === '' ? [] : part.split(':'));
  const head = toGroups(halves[0]);
  const rest = halves.length === 2 ? toGroups(halves[1]) : [];
  const all = [...head, ...rest];
  if (!all.every((group) => /^[0-9a-f]{1,4}$/.test(group))) return null;

  let groups: string[];
  if (halves.length === 2) {
    const missing = 8 - head.length - rest.length;
    if (missing < 1) return null;
    groups = [...head, ...Array(missing).fill('0'), ...rest];
  } else {
    if (head.length !== 8) return null;
    groups = head;
  }
  return groups.map((group) => parseInt(group, 16));
}

/**
 * True when an IPv4 address is private, loopback, link-local (including the
 * 169.254.169.254 cloud metadata address), CGNAT, documentation, benchmark,
 * multicast or reserved.
 */
export function isBlockedIPv4(octets: number[]): boolean {
  const [a, b, c] = octets;
  if (a === 0) return true; // 0.0.0.0/8 "this network"
  if (a === 10) return true; // 10.0.0.0/8 private
  if (a === 100 && b >= 64 && b <= 127) return true; // 100.64.0.0/10 CGNAT
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local, cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12 private
  if (a === 192 && b === 0 && c === 0) return true; // 192.0.0.0/24 IETF protocol
  if (a === 192 && b === 0 && c === 2) return true; // TEST-NET-1
  if (a === 192 && b === 88 && c === 99) return true; // 6to4 relay anycast
  if (a === 192 && b === 168) return true; // 192.168.0.0/16 private
  if (a === 198 && (b === 18 || b === 19)) return true; // 198.18.0.0/15 benchmarking
  if (a === 198 && b === 51 && c === 100) return true; // TEST-NET-2
  if (a === 203 && b === 0 && c === 113) return true; // TEST-NET-3
  if (a >= 224) return true; // multicast 224.0.0.0/4, reserved 240.0.0.0/4, broadcast
  return false;
}

/**
 * True unless the IPv6 address is global unicast (2000::/3) outside the
 * documentation, Teredo and 6to4-to-private ranges. IPv4-mapped addresses
 * (::ffff:a.b.c.d) are judged by their IPv4 part. Fail closed: anything not
 * clearly public is blocked (::, ::1, fc00::/7, fe80::/10, ff00::/8, NAT64...).
 */
export function isBlockedIPv6(groups: number[]): boolean {
  const firstFiveZero = groups.slice(0, 5).every((group) => group === 0);
  if (firstFiveZero && groups[5] === 0xffff) {
    return isBlockedIPv4([groups[6] >> 8, groups[6] & 0xff, groups[7] >> 8, groups[7] & 0xff]);
  }
  const first = groups[0];
  if ((first & 0xe000) !== 0x2000) return true; // not 2000::/3 global unicast
  if (first === 0x2001 && groups[1] === 0x0db8) return true; // 2001:db8::/32 documentation
  if (first === 0x2001 && groups[1] === 0) return true; // 2001::/32 Teredo
  if (first === 0x2001 && groups[1] < 0x0200) return true; // 2001::/23 IETF special purpose
  if (first === 0x2002) {
    // 6to4 embeds an IPv4 address in groups 1 and 2.
    return isBlockedIPv4([groups[1] >> 8, groups[1] & 0xff, groups[2] >> 8, groups[2] & 0xff]);
  }
  return false;
}

/** True for any address that is not clearly public. Unparseable input is blocked. */
export function isBlockedIp(address: string): boolean {
  const v4 = parseIPv4(address.trim());
  if (v4) return isBlockedIPv4(v4);
  const v6 = parseIPv6(address);
  if (v6) return isBlockedIPv6(v6);
  return true;
}

/** True when the string is an IPv4 or IPv6 literal (bracketed or not). */
export function isIpLiteral(hostname: string): boolean {
  return parseIPv4(hostname) !== null || parseIPv6(hostname) !== null || hostname.startsWith('[');
}

/**
 * Synchronous checks on a URL the checker is about to request: scheme, port,
 * credentials, IP literals and host shape. Used for the input and for every
 * redirect hop. Returns null when the URL may proceed to DNS.
 */
export function validateTargetUrl(url: URL): InputRejection | null {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return 'blocked';
  if (url.username || url.password) return 'blocked';
  if (url.port !== '' && url.port !== '80' && url.port !== '443') return 'blocked';
  if (url.href.length > MAX_URL_LENGTH) return 'invalid';

  const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
  if (!hostname) return 'invalid';
  if (isIpLiteral(hostname)) return 'blocked';
  if (BLOCKED_HOST_SUFFIXES.some((suffix) => hostEndsWith(hostname, suffix))) return 'blocked';
  if (hostname.length > MAX_HOST_LENGTH) return 'invalid';
  if (!hostname.includes('.')) return 'invalid';

  const labels = hostname.split('.');
  if (!labels.every((label) => /^[a-z0-9_](?:[a-z0-9_-]{0,61}[a-z0-9_])?$/.test(label))) return 'invalid';
  const tld = labels[labels.length - 1];
  if (!/^[a-z]{2,24}$/.test(tld) && !/^xn--[a-z0-9-]{1,59}$/.test(tld)) return 'invalid';
  return null;
}

/**
 * Turns what a visitor typed into a URL the checker may fetch, or a reason it
 * cannot. Adds https:// when no scheme is given, drops any #fragment, keeps
 * the path. Never touches the network.
 */
export function normalizeInput(raw: unknown): NormalizeResult {
  if (typeof raw !== 'string') return { ok: false, reason: 'empty' };
  const input = raw.trim();
  if (!input) return { ok: false, reason: 'empty' };
  if (input.length > MAX_URL_LENGTH) return { ok: false, reason: 'invalid' };
  if (/\s/.test(input)) return { ok: false, reason: 'invalid' };

  const hasScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(input);
  if (!hasScheme && /^[a-z][a-z0-9+.-]*:(?!\d)/i.test(input) && !/^[^:/]+\.[^:/]+:/.test(input)) {
    // A non-web scheme without slashes (mailto:, javascript:, data:).
    return { ok: false, reason: 'blocked' };
  }

  let url: URL;
  try {
    url = new URL(hasScheme ? input : `https://${input}`);
  } catch {
    return { ok: false, reason: 'invalid' };
  }
  url.hash = '';

  const rejection = validateTargetUrl(url);
  if (rejection) return { ok: false, reason: rejection };

  const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
  return {
    ok: true,
    url,
    hostname,
    displayHost: hostname.replace(/^www\./, ''),
    input,
  };
}

export interface LookupAddress {
  address: string;
  family: number;
}

/** The shape of dns.promises.lookup(hostname, { all: true }). */
export type LookupFn = (hostname: string, options: { all: true }) => Promise<LookupAddress[]>;

export type ResolveResult =
  | { ok: true; addresses: string[] }
  | { ok: false; reason: 'dns' | 'blocked' | 'error'; code?: string };

const NO_RECORD_CODES = new Set(['ENOTFOUND', 'ENODATA', 'EAI_NONAME', 'EAI_NODATA', 'ESERVFAIL', 'ENONAME']);

/**
 * Resolves a hostname and rejects it when ANY returned address is private or
 * reserved. "dns" means the domain has no usable record; "error" is any other
 * lookup failure (the caller reports it as "could not check").
 */
export async function resolvePublicAddresses(hostname: string, lookup: LookupFn): Promise<ResolveResult> {
  let answers: LookupAddress[];
  try {
    answers = await lookup(hostname, { all: true });
  } catch (error) {
    const code = (error as { code?: string })?.code;
    if (code && NO_RECORD_CODES.has(code)) return { ok: false, reason: 'dns', code };
    return { ok: false, reason: 'error', code };
  }
  if (!Array.isArray(answers) || answers.length === 0) return { ok: false, reason: 'dns' };
  const addresses = answers.map((answer) => answer.address);
  if (addresses.some((address) => isBlockedIp(address))) return { ok: false, reason: 'blocked' };
  return { ok: true, addresses };
}
