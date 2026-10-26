/**
 * The six page checks from funnel/CHECKS.md section 3, as pure functions over
 * the fetch results. (The domain and email checks live in rdap.ts and
 * email-dns.ts; they look at public registry and DNS data, not the page.) No network, no Node imports: tests feed saved HTML fixtures.
 *
 * Where a rule cannot be judged reliably from a server-side fetch it is warn
 * only (C4 tap-to-call, C5 quote form), and a page built in the browser by
 * JavaScript (`jsShell`) makes the mobile, call and form checks say so
 * instead of guessing.
 */

import type { FetchError, FetchSuccess, SafeFetchResult } from './fetcher';
import { registrableDomain } from './domain-name';
import { CHECK_LABELS } from './messages';
import type { CheckId, CheckOutcome, CheckResult, CheckStatus } from './types';

/* ------------------------------------------------------------------ */
/* HTML analysis                                                       */
/* ------------------------------------------------------------------ */

export interface TagMatch {
  name: string;
  attrs: Record<string, string>;
}

export interface LinkMatch {
  href: string;
  text: string;
}

export interface PageAnalysis {
  title: string;
  visibleText: string;
  /** Any <script> element at all (inline or src). */
  scriptCount: number;
  /** <script src> values. */
  scriptSrcs: string[];
  viewport: string | null;
  links: LinkMatch[];
  /** At least one <form> with an email or tel input, or a textarea. */
  hasLeadForm: boolean;
  /** Known form or booking embed found in an iframe or script src. */
  embedHost: string | null;
  imageCount: number;
  lazyImageCount: number;
  /** Fewer than 300 characters of visible text and at least one script. */
  jsShell: boolean;
}

const ATTR_PATTERN = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

function parseAttrs(source: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  ATTR_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = ATTR_PATTERN.exec(source))) {
    const name = match[1].toLowerCase();
    if (!(name in attrs)) attrs[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attrs;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '-',
  mdash: '-',
  rsquo: "'",
  lsquo: "'",
  ldquo: '"',
  rdquo: '"',
  hellip: '...',
};

export function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]{1,6}|#\d{1,7}|[a-z]{2,8});/gi, (whole, entity: string) => {
    const lower = entity.toLowerCase();
    if (lower.startsWith('#x')) {
      const code = parseInt(lower.slice(2), 16);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    }
    if (lower.startsWith('#')) {
      const code = parseInt(lower.slice(1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    }
    return NAMED_ENTITIES[lower] ?? whole;
  });
}

function collapse(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/*
 * Parsing note: the HTML comes from a stranger's server, up to 2 MB. Every
 * pattern here is linear. Tag attributes are capped at 8,000 characters, and
 * blocks (script, a, form...) are paired with a single forward scan instead of
 * lazy `[\s\S]*?` patterns, which go quadratic on thousands of unclosed tags
 * and would block the event loop where no timeout can interrupt them.
 */

/** All opening tags with a given name. */
function findTags(html: string, name: string): TagMatch[] {
  const pattern = new RegExp(`<${name}\\b([^<>]{0,8000})>`, 'gi');
  const tags: TagMatch[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html))) tags.push({ name, attrs: parseAttrs(match[1] || '') });
  return tags;
}

/** Start offsets of every `</name` in the HTML, in order. */
function closingOffsets(html: string, name: string): number[] {
  const pattern = new RegExp(`</${name}\\b`, 'gi');
  const offsets: number[] = [];
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html))) offsets.push(match.index);
  return offsets;
}

interface Block {
  /** Offset of the opening `<`. */
  start: number;
  /** Offset just after the closing tag's `>` (or where the block was cut off). */
  end: number;
  attrs: string;
  inner: string;
}

/** Elements whose content is raw text: it ends only at the matching close tag. */
const RAW_TEXT = new Set(['script', 'style', 'template', 'noscript', 'svg', 'title']);

/**
 * Pairs each <name> with the next </name>, in one forward scan. For normal
 * elements (a, form) a block also ends where the next <name> opens, since
 * they do not nest. For raw-text elements (script, style...) the content runs
 * to the close tag and any `<script` inside it is skipped. Blocks never
 * overlap, so the total work stays linear. An unclosed block runs to the end.
 */
function findBlocks(html: string, name: string): Block[] {
  const rawText = RAW_TEXT.has(name);
  const openPattern = new RegExp(`<${name}\\b([^<>]{0,8000})>`, 'gi');
  const opens: Array<{ start: number; contentStart: number; attrs: string }> = [];
  let match: RegExpExecArray | null;
  while ((match = openPattern.exec(html))) {
    opens.push({ start: match.index, contentStart: match.index + match[0].length, attrs: match[1] || '' });
  }
  const closes = closingOffsets(html, name);
  const blocks: Block[] = [];
  let next = 0;
  let consumedTo = 0;
  opens.forEach((open, index) => {
    if (open.start < consumedTo) return; // inside the previous raw-text block
    while (next < closes.length && closes[next] < open.contentStart) next += 1;
    const close = next < closes.length ? closes[next] : html.length;
    const nextOpen = !rawText && index + 1 < opens.length ? opens[index + 1].start : html.length;
    const contentEnd = Math.min(close, nextOpen);
    let end = contentEnd;
    if (contentEnd === close && close < html.length) {
      const gt = html.indexOf('>', close);
      end = gt === -1 ? html.length : gt + 1;
    }
    consumedTo = end;
    blocks.push({ start: open.start, end, attrs: open.attrs, inner: html.slice(open.contentStart, contentEnd) });
  });
  return blocks;
}

/** Replaces whole blocks of the given elements (open tag to close tag) with a space. */
function removeBlocks(html: string, names: string[]): string {
  const ranges = names
    .flatMap((name) => findBlocks(html, name).map((block) => [block.start, block.end] as const))
    .sort((a, b) => a[0] - b[0]);
  let out = '';
  let position = 0;
  for (const [start, end] of ranges) {
    if (end <= position) continue;
    if (start > position) out += html.slice(position, start);
    out += ' ';
    position = Math.max(position, end);
  }
  return out + html.slice(position);
}

function stripTags(html: string): string {
  return collapse(decodeEntities(html.replace(/<[^<>]*>/g, ' ')));
}

/** Form and booking embeds that count as "a way to ask for a quote" (C5 rule 2). */
const EMBED_HOSTS = [
  'jotform',
  'typeform',
  'forms.gle',
  'docs.google.com/forms',
  'hsforms',
  'hubspot',
  'wufoo',
  'cognitoforms',
  'formstack',
  'paperform',
  'tally.so',
  'calendly',
  'cal.com',
  'housecallpro',
  'getjobber',
  'servicetitan',
  'squareup.com/appointments',
  'acuityscheduling',
  'formspree',
];

export function analyzeHtml(rawHtml: string): PageAnalysis {
  // An unclosed comment runs to the end, so this is one linear pass.
  const html = rawHtml.replace(/<!--[\s\S]*?(?:-->|$)/g, ' ');

  // Script tags (with their attributes) before the contents are removed.
  const scriptTags = findTags(html, 'script');
  const scriptSrcs = scriptTags.map((tag) => tag.attrs.src).filter((src): src is string => !!src && !!src.trim());

  // Drop non-visible blocks so strings inside scripts, styles and noscript
  // fallbacks (GTM iframes, "enable JavaScript" notices) are not counted.
  const cleaned = removeBlocks(html, ['script', 'style', 'template', 'noscript', 'svg']);

  const titleBlock = findBlocks(cleaned, 'title')[0];
  const title = titleBlock ? stripTags(titleBlock.inner) : '';

  const bodyOpen = /<body\b[^<>]{0,8000}>/i.exec(cleaned);
  const visibleText = stripTags(
    bodyOpen ? cleaned.slice(bodyOpen.index + bodyOpen[0].length) : removeBlocks(cleaned, ['head']),
  );

  const viewportTag = findTags(cleaned, 'meta').find((tag) => (tag.attrs.name || '').toLowerCase() === 'viewport');
  const viewport = viewportTag ? viewportTag.attrs.content ?? '' : null;

  const links: LinkMatch[] = [];
  for (const block of findBlocks(cleaned, 'a')) {
    const attrs = parseAttrs(block.attrs);
    if (attrs.href !== undefined) links.push({ href: attrs.href.trim(), text: stripTags(block.inner).slice(0, 200) });
  }

  const hasLeadForm = findBlocks(cleaned, 'form').some(
    (block) =>
      /<textarea\b/i.test(block.inner) ||
      findTags(block.inner, 'input').some((tag) => ['email', 'tel'].includes((tag.attrs.type || '').toLowerCase())),
  );

  const embedSources = [...findTags(cleaned, 'iframe').map((tag) => tag.attrs.src || ''), ...scriptSrcs].map((src) =>
    src.toLowerCase(),
  );
  let embedHost: string | null = null;
  for (const src of embedSources) {
    const hit = EMBED_HOSTS.find((host) => src.includes(host));
    if (hit) {
      embedHost = hit;
      break;
    }
  }

  const images = findTags(cleaned, 'img');
  const lazyImageCount = images.filter((tag) => (tag.attrs.loading || '').toLowerCase() === 'lazy').length;

  return {
    title,
    visibleText,
    scriptCount: scriptTags.length,
    scriptSrcs,
    viewport,
    links,
    hasLeadForm,
    embedHost,
    imageCount: images.length,
    lazyImageCount,
    jsShell: visibleText.length < 300 && scriptTags.length > 0,
  };
}

/* ------------------------------------------------------------------ */
/* Helpers used by the checks                                          */
/* ------------------------------------------------------------------ */

// Shared with the domain and email checks (domain-name.ts).
export { registrableDomain };

function digitsOf(value: string): string {
  return value.replace(/\D/g, '');
}

/** Formats a 10 or 11 digit US number as (504) 555-0142. */
export function formatPhone(raw: string): string {
  const digits = digitsOf(raw);
  const ten = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (ten.length !== 10) return raw.trim();
  return `(${ten.slice(0, 3)}) ${ten.slice(3, 6)}-${ten.slice(6)}`;
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function hasTelLink(page: PageAnalysis): boolean {
  return page.links.some((link) => {
    if (!/^tel:/i.test(link.href)) return false;
    return digitsOf(safeDecode(link.href.slice(4))).length >= 10;
  });
}

const PHONE_PATTERN = /(?<![\d-])\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}(?![\d-])/;

export function findPhoneText(page: PageAnalysis): string | null {
  const match = PHONE_PATTERN.exec(page.visibleText);
  return match ? formatPhone(match[0]) : null;
}

export function hasMailtoLink(page: PageAnalysis): boolean {
  return page.links.some((link) => /^mailto:/i.test(link.href));
}

const CONTACT_PATTERN = /contact|quote|estimate|free-estimate|request|book|schedule/i;

function sameSite(a: string, b: string): boolean {
  return a.replace(/^www\./, '') === b.replace(/^www\./, '');
}

/**
 * The first same-origin link whose path or text looks like a contact or quote
 * page (C5 rule 3). Returns null when there is none.
 */
export function findContactLink(page: PageAnalysis, pageUrl: string): { url: string; pageName: string } | null {
  let base: URL;
  try {
    base = new URL(pageUrl);
  } catch {
    return null;
  }
  for (const link of page.links) {
    if (!link.href || /^(mailto|tel|javascript|data|sms):/i.test(link.href) || link.href.startsWith('#')) continue;
    let target: URL;
    try {
      target = new URL(link.href, base);
    } catch {
      continue;
    }
    if (target.protocol !== base.protocol || !sameSite(target.hostname, base.hostname)) continue;
    target.hash = '';
    if (target.href === base.href) continue;
    if (!CONTACT_PATTERN.test(target.pathname) && !CONTACT_PATTERN.test(link.text)) continue;
    return { url: target.href, pageName: pageNameFor(link.text, target.pathname) };
  }
  return null;
}

function pageNameFor(text: string, pathname: string): string {
  const fromText = collapse(text).toLowerCase();
  if (fromText && fromText.length <= 40) return fromText;
  const segment = pathname.split('/').filter(Boolean).pop() || 'contact';
  return safeDecode(segment).replace(/\.[a-z]{2,5}$/i, '').replace(/[-_]+/g, ' ').toLowerCase().slice(0, 40);
}

/* ------------------------------------------------------------------ */
/* The six checks                                                      */
/* ------------------------------------------------------------------ */

const PARKED_PATTERN =
  /domain (is )?for sale|parked|coming\s+soon|under construction|website coming|default web site page|account suspended|this site can.?t be reached/i;
const PARKING_HOSTS = ['sedoparking', 'parkingcrew', 'bodis', 'dan.com', 'afternic', 'hugedomains'];

/**
 * Bot challenges and security screens. Matched against the title and the
 * start of the page, plus the cf-mitigated header Cloudflare sends.
 */
const CHALLENGE_PATTERN =
  /just a moment\.\.\.|attention required!? \| cloudflare|cf-chl|challenge-platform|checking your browser|ddos protection by|sgcaptcha|incapsula incident|access denied|request unsuccessful|verify you are (a )?human|captcha/i;

const HTML_TYPES = new Set(['text/html', 'application/xhtml+xml']);

const TYPE_NAMES: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/json': 'JSON',
  'text/plain': 'plain text',
  'application/xml': 'XML',
  'text/xml': 'XML',
  'application/zip': 'ZIP',
};

function typeName(contentType: string): string {
  if (TYPE_NAMES[contentType]) return TYPE_NAMES[contentType];
  if (contentType.startsWith('image/')) return 'image';
  if (contentType.startsWith('video/')) return 'video';
  return 'non-web-page';
}

function seconds(ms: number): string {
  return (Math.round(ms / 100) / 10).toFixed(1);
}

function result(id: CheckId, status: CheckStatus, line: string, data?: CheckResult['data']): CheckResult {
  return data ? { id, label: CHECK_LABELS[id], status, line, data } : { id, label: CHECK_LABELS[id], status, line };
}

export interface CheckInputs {
  /** Host as the visitor sees it, for result lines. */
  host: string;
  /** The https request (the first attempt). */
  https: SafeFetchResult;
  /** The http fallback, only made when https failed to connect or had a TLS error. */
  httpFallback?: SafeFetchResult | null;
  /** Header-only probe of http://host/ that stops at the first https redirect. */
  httpProbe?: SafeFetchResult | null;
  /** The contact or quote page follow-up, when one was fetched. */
  contactPage?: { pageName: string; fetch: SafeFetchResult } | null;
}

export interface CheckRun {
  outcome: CheckOutcome;
  finalUrl: string | null;
  checks: CheckResult[];
}

/** The response the page checks run on: https when it answered, else the http fallback. */
function pickPage(inputs: CheckInputs): SafeFetchResult {
  if (inputs.https.ok) return inputs.https;
  if (inputs.httpFallback && (inputs.httpFallback.ok || inputs.https.reason === 'tls' || inputs.https.reason === 'connect')) {
    return inputs.httpFallback;
  }
  return inputs.https;
}

export function isChallenge(page: FetchSuccess): boolean {
  if ((page.headers['cf-mitigated'] || '').toLowerCase() === 'challenge') return true;
  if (page.status === 401 || page.status === 403 || page.status === 429) return true;
  const head = page.body.slice(0, 20000);
  if (page.status === 503 || page.status === 202) return CHALLENGE_PATTERN.test(head);
  if (page.status >= 200 && page.status < 300) {
    const analysis = analyzeHtml(head);
    return CHALLENGE_PATTERN.test(analysis.title) || (analysis.visibleText.length < 300 && CHALLENGE_PATTERN.test(analysis.visibleText));
  }
  return false;
}

function notLoadedLine(failure: FetchError, host: string): string {
  switch (failure.reason) {
    case 'timeout':
      return 'Your homepage did not finish loading within 8 seconds.';
    case 'dns':
      return `I could not find a website at ${host}. The domain may have lapsed or not be connected to a site.`;
    case 'too-many-redirects':
      return 'Your homepage redirected more than 3 times without reaching a page.';
    default:
      return 'Your domain exists, but no website answered when I knocked.';
  }
}

function certificateWord(code: string | undefined): string | null {
  if (!code) return null;
  if (code === 'CERT_HAS_EXPIRED') return 'expired';
  if (code === 'ERR_TLS_CERT_ALTNAME_INVALID' || code === 'HOSTNAME_MISMATCH') return 'issued for a different name';
  if (code === 'DEPTH_ZERO_SELF_SIGNED_CERT' || code === 'SELF_SIGNED_CERT_IN_CHAIN') return 'self-signed';
  return null;
}

/** C2. */
function checkHttps(inputs: CheckInputs, pageLoaded: boolean): CheckResult {
  const { https, httpFallback, httpProbe } = inputs;
  if (!https.ok && https.reason === 'tls') {
    const word = certificateWord(https.code);
    if (word) {
      return result(
        'https',
        'fail',
        `Your site's security certificate is ${word}, so browsers show a warning before the page.`,
        { error: https.code || 'TLS' },
      );
    }
    // Incomplete chains and other verification codes: Chrome often repairs
    // a missing intermediate on its own, so this cannot be called a fail
    // from the server.
    return result(
      'https',
      'warn',
      'Your site answers on https, but I could not verify its security certificate from my server. Some browsers may show a warning.',
      { error: https.code || 'TLS' },
    );
  }
  if (!https.ok) {
    if (https.reason === 'connect' && httpFallback?.ok) {
      return result('https', 'fail', 'Your site does not open over https. Browsers such as Chrome label pages like this "Not secure".');
    }
    return result('https', 'unknown', pageLoaded ? 'Not checked, the secure connection did not answer.' : 'Not checked, the page did not load.');
  }
  // https answered, but the chain ended on plain http.
  if (new URL(https.url).protocol === 'http:') {
    return result('https', 'fail', 'Your site does not open over https. Browsers such as Chrome label pages like this "Not secure".');
  }
  const forwards =
    !!httpProbe &&
    httpProbe.ok &&
    httpProbe.status >= 300 &&
    httpProbe.status < 400 &&
    !!httpProbe.location &&
    httpProbe.location.startsWith('https:');
  if (forwards) {
    return result('https', 'pass', 'Your site uses a secure https connection, and the plain http address forwards to it.');
  }
  return result('https', 'warn', 'Your site works on https, but the plain http address does not forward to it.');
}

/** C3. */
function checkMobile(page: PageAnalysis): CheckResult {
  if (page.viewport === null) {
    if (page.jsShell) {
      return result('mobile', 'warn', 'Your page is built by JavaScript, so I could not confirm how it sizes on phones.');
    }
    return result(
      'mobile',
      'fail',
      'Your homepage is missing the mobile screen setting, so phones show the desktop layout zoomed out.',
    );
  }
  const settings: Record<string, string> = {};
  for (const part of page.viewport.toLowerCase().split(/[,;]/)) {
    const [key, value = ''] = part.split('=').map((piece) => piece.trim());
    if (key) settings[key] = value;
  }
  const maxScale = parseFloat(settings['maximum-scale'] ?? '');
  if (settings['user-scalable'] === 'no' || settings['user-scalable'] === '0' || (!Number.isNaN(maxScale) && maxScale <= 1)) {
    return result('mobile', 'warn', 'Your site stops visitors from pinching to zoom, which makes small text hard to read.');
  }
  if (settings.width === 'device-width') {
    return result('mobile', 'pass', 'Your site tells phones to fit the page to the screen.');
  }
  // No width but an initial scale: phones treat that as the device width.
  if (!settings.width && settings['initial-scale']) {
    return result('mobile', 'pass', 'Your site tells phones to fit the page to the screen.');
  }
  return result('mobile', 'warn', 'Your site sets a fixed page width, so phones may show it shrunk or cut off.');
}

/** C4, warn only. */
function checkCall(page: PageAnalysis): CheckResult {
  if (hasTelLink(page)) return result('call', 'pass', 'Your phone number is a tap-to-call link.');
  if (page.jsShell) {
    return result('call', 'warn', 'Your page is built by JavaScript, so I could not confirm a tap-to-call link.');
  }
  const number = findPhoneText(page);
  if (number) {
    return result('call', 'warn', `I found your number, ${number}, on the page, but it is not a tap-to-call link.`, { number });
  }
  return result('call', 'warn', 'I could not find a tap-to-call phone number on your homepage.');
}

/** C5, warn only. */
function checkForm(page: PageAnalysis, contact: CheckInputs['contactPage']): CheckResult {
  if (page.hasLeadForm || page.embedHost) {
    return result('form', 'pass', 'I found a contact or quote form on your homepage.');
  }
  if (page.jsShell) {
    return result('form', 'warn', 'Your page is built by JavaScript, so I could not confirm a quote form.');
  }
  let contactAnalysis: PageAnalysis | null = null;
  if (contact && contact.fetch.ok && contact.fetch.status >= 200 && contact.fetch.status < 300 && isHtml(contact.fetch)) {
    contactAnalysis = analyzeHtml(contact.fetch.body);
    if (contactAnalysis.hasLeadForm || contactAnalysis.embedHost) {
      return result(
        'form',
        'pass',
        `I found a contact or quote form on your ${contact.pageName} page, one click from the homepage.`,
        { page: contact.pageName },
      );
    }
  }
  if (hasMailtoLink(page) || (contactAnalysis && hasMailtoLink(contactAnalysis))) {
    return result('form', 'warn', 'I found an email link, but no form a customer can fill in for a quote.');
  }
  return result('form', 'warn', 'I could not find a contact or quote form on your homepage or contact page.');
}

/** C6, an estimate from the HTML. */
function checkSpeed(page: PageAnalysis, fetched: FetchSuccess): CheckResult {
  const htmlKb = Math.min(Math.round(fetched.bytes / 1024), 2048);
  const scripts = page.scriptSrcs.length;
  let pageHost = '';
  try {
    pageHost = new URL(fetched.url).hostname;
  } catch {
    /* keep empty */
  }
  const own = registrableDomain(pageHost);
  const thirdParty = page.scriptSrcs.filter((src) => {
    try {
      const host = new URL(src, fetched.url).hostname;
      return registrableDomain(host) !== own;
    } catch {
      return false;
    }
  }).length;
  const data = {
    html_kb: htmlKb,
    scripts,
    third_party_scripts: thirdParty,
    images: page.imageCount,
    lazy_images: page.lazyImageCount,
    ttfb_ms: fetched.ttfbMs,
  };
  if (fetched.truncated) {
    return result('speed', 'fail', 'Your homepage code alone is over 2 MB, which is very heavy on a phone connection.', data);
  }
  if (fetched.totalMs > 6000) {
    return result('speed', 'fail', `Your homepage took ${seconds(fetched.totalMs)} seconds to download from my server.`, data);
  }
  if (htmlKb <= 250 && scripts <= 15 && fetched.ttfbMs <= 1500) {
    return result('speed', 'pass', `Your homepage looks light: ${htmlKb} KB of page code and ${scripts} scripts.`, data);
  }
  return result(
    'speed',
    'warn',
    `Your homepage looks heavy for a phone: ${htmlKb} KB of page code and ${scripts} scripts, ${thirdParty} of them from other companies.`,
    data,
  );
}

function isHtml(page: FetchSuccess): boolean {
  if (HTML_TYPES.has(page.contentType)) return true;
  // No content type at all: trust the body if it looks like markup.
  return page.contentType === '' && /^\s*</.test(page.body);
}

function looksParked(page: FetchSuccess, analysis: PageAnalysis): boolean {
  let host = '';
  try {
    host = new URL(page.url).hostname;
  } catch {
    /* keep empty */
  }
  if (PARKING_HOSTS.some((parking) => host.includes(parking))) return true;
  if (PARKED_PATTERN.test(analysis.title)) return true;
  // Visible text only on short pages. A contractor's homepage that says
  // "homes under construction" is not a placeholder page.
  return analysis.visibleText.length < 1500 && PARKED_PATTERN.test(analysis.visibleText);
}

const UNKNOWN_IDS: CheckId[] = ['mobile', 'call', 'form', 'speed'];

function unknowns(ids: CheckId[], line: string): CheckResult[] {
  return ids.map((id) => result(id, 'unknown', line));
}

/** Runs all six checks over the fetch results. */
export function evaluateChecks(inputs: CheckInputs): CheckRun {
  const page = pickPage(inputs);

  // The site never produced a page.
  if (!page.ok) {
    if (page.reason === 'blocked' || page.reason === 'error') {
      // Fail closed: anything unclear is "could not check", never a fail.
      return {
        outcome: 'not-checked',
        finalUrl: null,
        checks: [
          result('loads', 'unknown', 'I could not check this site from my server.'),
          ...unknowns(['https', ...UNKNOWN_IDS], 'Not checked, the page did not load for my checker.'),
        ],
      };
    }
    const https = checkHttps(inputs, false);
    return {
      outcome: 'not-loaded',
      finalUrl: null,
      checks: [
        result('loads', 'fail', notLoadedLine(page, inputs.host), { error: page.code || page.reason }),
        https,
        ...unknowns(UNKNOWN_IDS, 'Not checked, the page did not load.'),
      ],
    };
  }

  // The site turned the checker away (bot challenge, 401, 403, 429).
  if (isChallenge(page)) {
    return {
      outcome: 'not-checked',
      finalUrl: page.url,
      checks: [
        result('loads', 'unknown', `Your site turned my checker away (status ${page.status}), so I could not check it from my server.`, {
          code: page.status,
        }),
        ...unknowns(['https', ...UNKNOWN_IDS], 'Not checked, the site did not let my checker in.'),
      ],
    };
  }

  const timing = { code: page.status, ttfb_ms: page.ttfbMs, total_ms: page.totalMs };
  const https = checkHttps(inputs, true);

  // A redirect with nowhere to go, or an error status.
  if (page.status < 200 || page.status >= 300) {
    return {
      outcome: 'checked',
      finalUrl: page.url,
      checks: [
        result('loads', 'fail', `Your homepage returned an error (status ${page.status}) instead of a page.`, timing),
        https,
        ...unknowns(UNKNOWN_IDS, 'Not checked, the homepage returned an error.'),
      ],
    };
  }

  if (!isHtml(page)) {
    return {
      outcome: 'checked',
      finalUrl: page.url,
      checks: [
        result('loads', 'warn', `Your address returned a ${typeName(page.contentType)} file instead of a web page.`, timing),
        https,
        ...unknowns(UNKNOWN_IDS, 'Not checked, I could not read a web page at this address.'),
      ],
    };
  }

  const analysis = analyzeHtml(page.body);
  let loads: CheckResult;
  if (looksParked(page, analysis)) {
    loads = result('loads', 'warn', 'Your domain answers, but the page looks like a parked or placeholder page.', {
      ...timing,
      parked: true,
    });
  } else if (page.ttfbMs > 3000) {
    loads = result('loads', 'warn', `Your homepage loaded, but it took ${seconds(page.ttfbMs)} seconds to start answering.`, timing);
  } else {
    loads = result('loads', 'pass', `Your homepage loaded in ${seconds(page.totalMs)} seconds from my server.`, timing);
  }

  return {
    outcome: 'checked',
    finalUrl: page.url,
    checks: [
      loads,
      https,
      checkMobile(analysis),
      checkCall(analysis),
      checkForm(analysis, inputs.contactPage),
      checkSpeed(analysis, page),
    ],
  };
}

/** Whether the homepage needs the one extra contact-page fetch (C5 rule 3). */
export function needsContactPage(page: SafeFetchResult): { url: string; pageName: string } | null {
  if (!page.ok || page.status < 200 || page.status >= 300 || !isHtml(page) || isChallenge(page)) return null;
  const analysis = analyzeHtml(page.body);
  if (analysis.jsShell || analysis.hasLeadForm || analysis.embedHost) return null;
  return findContactLink(analysis, page.url);
}
