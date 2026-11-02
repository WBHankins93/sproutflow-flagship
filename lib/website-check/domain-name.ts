/**
 * Which domain a website check is about: the registrable domain (eTLD+1)
 * behind the host the visitor typed, and whether that host is a shared
 * platform address that has no domain of its own.
 *
 * Pure and client-safe: no Node imports, no network.
 *
 * Limits (this is not the Public Suffix List):
 * - Two-part public suffixes are a short hand-kept list of the common ones
 *   (co.uk, com.au, co.nz...), plus a rule for country domains whose second
 *   level is a generic word (com, net, org, co, ac, gov, edu...): example.com.vn
 *   is treated as registrable under com.vn. A two-part suffix that is neither
 *   listed nor generic (for example the Japanese prefecture domains such as
 *   tokyo.jp) resolves one level too high and reports on the wrong name.
 * - Three-part suffixes are not modelled. US state and locality domains
 *   (ci.city.la.us, k12 schools) are detected by shape and reported as
 *   "could not check" rather than guessed.
 * - Shared platform addresses (wixsite.com, github.io...) are a short list.
 *   One that is missing reports on the platform's own domain, so add new
 *   ones to SHARED_PLATFORM_SUFFIXES when they turn up.
 */

/** Common public suffixes with two labels. Registrations sit one label below. */
const TWO_PART_SUFFIXES = new Set([
  // United Kingdom
  'co.uk',
  'org.uk',
  'me.uk',
  'ltd.uk',
  'plc.uk',
  'net.uk',
  'ac.uk',
  'gov.uk',
  'sch.uk',
  // Australia and New Zealand
  'com.au',
  'net.au',
  'org.au',
  'edu.au',
  'gov.au',
  'asn.au',
  'id.au',
  'co.nz',
  'net.nz',
  'org.nz',
  'ac.nz',
  'govt.nz',
  // Americas
  'com.br',
  'net.br',
  'org.br',
  'com.mx',
  'org.mx',
  'com.ar',
  'com.co',
  'com.pe',
  // Asia
  'co.jp',
  'ne.jp',
  'or.jp',
  'ac.jp',
  'com.sg',
  'com.my',
  'co.in',
  'net.in',
  'org.in',
  'com.cn',
  'com.hk',
  'com.tw',
  'co.kr',
  'com.ph',
  'co.th',
  'co.id',
  'co.il',
  // Africa and the Middle East
  'co.za',
  'org.za',
  'com.ng',
  'co.ke',
  'com.eg',
  'com.sa',
  'com.tr',
]);

/**
 * Shared hosting and builder addresses. A site at mybiz.wixsite.com has no
 * domain of its own, so the domain and email checks have nothing to look at.
 */
const SHARED_PLATFORM_SUFFIXES = [
  'wixsite.com',
  'squarespace.com',
  'godaddysites.com',
  'wordpress.com',
  'blogspot.com',
  'weebly.com',
  'square.site',
  'myshopify.com',
  'webflow.io',
  'framer.website',
  'framer.app',
  'carrd.co',
  'github.io',
  'gitlab.io',
  'netlify.app',
  'vercel.app',
  'pages.dev',
  'web.app',
  'firebaseapp.com',
  'herokuapp.com',
  'onrender.com',
  'azurewebsites.net',
  'cloudfront.net',
  'amazonaws.com',
];

/** Second-level words that mark a two-part suffix under a two-letter country TLD. */
const GENERIC_SECOND_LEVEL = new Set(['com', 'net', 'org', 'co', 'ac', 'gov', 'govt', 'edu', 'or', 'ne', 'go', 'mil', 'gob', 'nom', 'ltd', 'plc', 'sch']);

function cleanHost(hostname: string): string {
  return hostname.toLowerCase().replace(/\.$/, '');
}

/** Approximate registrable domain: last two labels, or three under a two-part suffix. */
export function registrableDomain(hostname: string): string {
  const labels = cleanHost(hostname).split('.');
  if (labels.length <= 2) return labels.join('.');
  const lastTwo = labels.slice(-2).join('.');
  const tld = labels[labels.length - 1];
  const second = labels[labels.length - 2];
  const twoPart = TWO_PART_SUFFIXES.has(lastTwo) || (/^[a-z]{2}$/.test(tld) && GENERIC_SECOND_LEVEL.has(second));
  return twoPart ? labels.slice(-3).join('.') : lastTwo;
}

/** The top-level domain (last label), lowercase. */
export function topLevelDomain(hostname: string): string {
  const labels = cleanHost(hostname).split('.');
  return labels[labels.length - 1];
}

/**
 * The shared platform suffix a host sits under (for example "wixsite.com"),
 * or null when the host has a domain of its own. The bare platform domain
 * itself (wixsite.com) is not "shared".
 */
export function sharedPlatform(hostname: string): string | null {
  const host = cleanHost(hostname);
  for (const suffix of SHARED_PLATFORM_SUFFIXES) {
    if (host.length > suffix.length && host.endsWith(`.${suffix}`)) return suffix;
  }
  return null;
}

/**
 * What the domain and email checks should look at for a host:
 * - `domain`: its registrable domain and top-level domain.
 * - `shared`: a shared platform address, nothing of the visitor's own to check.
 * - `unsupported`: a suffix this approximation cannot place (US locality
 *   domains), so the checks say "could not check" instead of guessing.
 */
export type CheckableDomain =
  | { kind: 'domain'; domain: string; tld: string }
  | { kind: 'shared'; suffix: string }
  | { kind: 'unsupported'; suffix: string };

export function checkableDomain(hostname: string): CheckableDomain {
  const shared = sharedPlatform(hostname);
  if (shared) return { kind: 'shared', suffix: shared };
  const labels = cleanHost(hostname).split('.');
  const tld = labels[labels.length - 1];
  // state.us and city.state.us style names: the registrable level varies.
  if (tld === 'us' && labels.length >= 3 && /^[a-z]{2}$/.test(labels[labels.length - 2])) {
    return { kind: 'unsupported', suffix: labels.slice(-2).join('.') };
  }
  return { kind: 'domain', domain: registrableDomain(hostname), tld };
}
