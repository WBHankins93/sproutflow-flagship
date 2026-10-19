/**
 * The one way the website check touches the network.
 *
 * - Every hop (the first request and each redirect) is re-validated by
 *   url-guard: scheme, port, credentials, host shape, then DNS with every
 *   resolved address checked against the private and reserved ranges.
 * - Redirects are followed by hand (redirect: 'manual'), max 3 hops. Relative
 *   Locations resolve against the current URL.
 * - One deadline covers DNS, every hop and the body (the caller passes it so
 *   all requests in a check share the same 8 s budget).
 * - The body is streamed and reading stops at the byte cap (2 MB); the rest is
 *   never downloaded.
 * - GET only, honest User-Agent, no cookies, no auth headers.
 *
 * DNS rebinding: see the note at the top of url-guard.ts (v1: IP pinning).
 *
 * Server-only: imports node:dns. Keep stream reading here (jsdom lacks parts
 * of the Streams API); tests run under the node environment.
 */

import { promises as dnsPromises } from 'node:dns';
import { USER_AGENT } from './messages';
import { resolvePublicAddresses, validateTargetUrl, type LookupFn } from './url-guard';

export const TOTAL_BUDGET_MS = 8000;
export const MAX_BODY_BYTES = 2 * 1024 * 1024;
export const MAX_REDIRECTS = 3;

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);

export type FetchFailure =
  | 'blocked' // a hop failed url-guard (private IP, bad port, bad scheme)
  | 'dns' // the domain has no record
  | 'timeout' // the shared deadline passed
  | 'tls' // certificate or TLS handshake problem (see `code`)
  | 'connect' // refused, reset or unreachable
  | 'too-many-redirects'
  | 'error'; // anything else; reported as "could not check"

export interface FetchSuccess {
  ok: true;
  /** URL of the final response (after any redirects followed). */
  url: string;
  status: number;
  /** Absolute Location of a redirect that was not followed, else null. */
  location: string | null;
  /** Lowercased content-type without parameters, '' when absent. */
  contentType: string;
  /** A few response headers the checks look at, lowercased names. */
  headers: Record<string, string>;
  body: string;
  /** Bytes read (decompressed), never more than the cap. */
  bytes: number;
  /** True when the body hit the cap and reading stopped. */
  truncated: boolean;
  /** Request start to response headers, final hop. */
  ttfbMs: number;
  /** First request start (including DNS and redirects) to end of body. */
  totalMs: number;
  redirects: number;
}

export interface FetchError {
  ok: false;
  reason: FetchFailure;
  /** Node/undici error code when there is one, for example CERT_HAS_EXPIRED. */
  code?: string;
  /** The URL being requested when it failed. */
  url: string;
  totalMs: number;
  redirects: number;
}

export type SafeFetchResult = FetchSuccess | FetchError;

export interface SafeFetchOptions {
  /** Epoch ms after which everything is aborted. */
  deadline: number;
  maxRedirects?: number;
  maxBytes?: number;
  /** false: stop after the headers (used for the http-to-https probe). */
  readBody?: boolean;
  /**
   * Called before following each redirect. Return false to stop and return
   * the redirect response itself (its `location` is set).
   */
  followRedirect?: (next: URL, current: URL) => boolean;
  fetchImpl?: typeof fetch;
  lookup?: LookupFn;
  now?: () => number;
}

const KEPT_HEADERS = ['content-type', 'cf-mitigated', 'server', 'location'];

class DeadlineError extends Error {
  constructor() {
    super('deadline exceeded');
    this.name = 'DeadlineError';
  }
}

/** Rejects with DeadlineError at the deadline, even if the promise ignores abort signals. */
function beforeDeadline<T>(promise: Promise<T>, deadline: number, now: () => number): Promise<T> {
  const remaining = deadline - now();
  if (remaining <= 0) {
    promise.catch(() => undefined);
    return Promise.reject(new DeadlineError());
  }
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new DeadlineError()), remaining);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

const TIMEOUT_CODES = new Set(['ETIMEDOUT', 'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT']);
const CONNECT_CODES = new Set([
  'ECONNREFUSED',
  'ECONNRESET',
  'EHOSTUNREACH',
  'ENETUNREACH',
  'EPIPE',
  'UND_ERR_SOCKET',
  'UND_ERR_CLOSED',
]);
const DNS_CODES = new Set(['ENOTFOUND', 'EAI_AGAIN', 'ENODATA', 'EAI_NONAME']);

/** Maps a thrown fetch error (undici nests the real cause) to a failure kind. */
export function classifyFetchError(error: unknown): { reason: FetchFailure; code?: string } {
  let current: unknown = error;
  for (let depth = 0; depth < 5 && current; depth += 1) {
    const candidate = current as { name?: string; code?: string; cause?: unknown };
    if (candidate.name === 'DeadlineError' || candidate.name === 'AbortError' || candidate.name === 'TimeoutError') {
      return { reason: 'timeout' };
    }
    const code = typeof candidate.code === 'string' ? candidate.code : undefined;
    if (code) {
      if (TIMEOUT_CODES.has(code)) return { reason: 'timeout', code };
      if (/CERT|^ERR_TLS|^ERR_SSL|^EPROTO$|SELF_SIGNED|UNABLE_TO_VERIFY|UNABLE_TO_GET_ISSUER/.test(code)) {
        return { reason: 'tls', code };
      }
      if (CONNECT_CODES.has(code)) return { reason: 'connect', code };
      if (DNS_CODES.has(code)) return { reason: 'dns', code };
    }
    current = candidate.cause;
  }
  return { reason: 'error' };
}

function charsetOf(contentTypeHeader: string): string {
  const match = /charset\s*=\s*"?([\w.:-]+)"?/i.exec(contentTypeHeader);
  return match ? match[1].toLowerCase() : 'utf-8';
}

function makeDecoder(charset: string): TextDecoder {
  try {
    return new TextDecoder(charset);
  } catch {
    return new TextDecoder('utf-8');
  }
}

/** Fire-and-forget body cancel; never throws. */
function discardBody(response: Response): void {
  try {
    response.body?.cancel().catch(() => undefined);
  } catch {
    /* already consumed or locked */
  }
}

/**
 * Reads a response body as text, stopping at maxBytes or the deadline.
 * Throws DeadlineError when the deadline passes mid-body.
 */
export async function readBodyCapped(
  response: Response,
  maxBytes: number,
  deadline: number,
  now: () => number = Date.now,
): Promise<{ text: string; bytes: number; truncated: boolean }> {
  const decoder = makeDecoder(charsetOf(response.headers.get('content-type') || ''));
  if (!response.body) return { text: '', bytes: 0, truncated: false };
  const reader = response.body.getReader();
  let bytes = 0;
  let text = '';
  let truncated = false;
  try {
    while (true) {
      const { done, value } = await beforeDeadline(reader.read(), deadline, now);
      if (done) break;
      if (!value || value.byteLength === 0) continue;
      const room = maxBytes - bytes;
      if (value.byteLength >= room) {
        if (room > 0) text += decoder.decode(value.subarray(0, room), { stream: true });
        bytes += Math.max(room, 0);
        truncated = value.byteLength > room || !(await isStreamDone(reader, deadline, now));
        break;
      }
      bytes += value.byteLength;
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } finally {
    reader.cancel().catch(() => undefined);
  }
  return { text, bytes, truncated };
}

/** After filling the cap exactly, peeks whether more data follows. */
async function isStreamDone(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  deadline: number,
  now: () => number,
): Promise<boolean> {
  try {
    const next = await beforeDeadline(reader.read(), deadline, now);
    return next.done || !next.value || next.value.byteLength === 0;
  } catch {
    return false;
  }
}

/**
 * Fetches a URL for the website check with every safety limit applied.
 * Never throws; failures come back as { ok: false, reason }.
 */
export async function safeFetch(startUrl: string | URL, options: SafeFetchOptions): Promise<SafeFetchResult> {
  const {
    deadline,
    maxRedirects = MAX_REDIRECTS,
    maxBytes = MAX_BODY_BYTES,
    readBody = true,
    followRedirect,
    fetchImpl = fetch,
    lookup = dnsPromises.lookup as unknown as LookupFn,
    now = Date.now,
  } = options;

  const started = now();
  let redirects = 0;
  let current: URL;
  try {
    current = new URL(String(startUrl));
  } catch {
    return { ok: false, reason: 'blocked', url: String(startUrl), totalMs: 0, redirects };
  }

  const controller = new AbortController();
  const abortTimer = setTimeout(() => controller.abort(), Math.max(deadline - now(), 0));
  const fail = (reason: FetchFailure, code?: string): FetchError => ({
    ok: false,
    reason,
    code,
    url: current.href,
    totalMs: now() - started,
    redirects,
  });

  try {
    while (true) {
      if (now() >= deadline) return fail('timeout');

      // 1. Static checks on this hop.
      if (validateTargetUrl(current)) return fail('blocked');

      // 2. DNS: every resolved address must be public.
      let resolved;
      try {
        resolved = await beforeDeadline(resolvePublicAddresses(current.hostname.replace(/\.$/, ''), lookup), deadline, now);
      } catch {
        return fail('timeout');
      }
      if (!resolved.ok) {
        if (resolved.reason === 'blocked') return fail('blocked');
        return fail(resolved.reason === 'dns' ? 'dns' : 'error', resolved.code);
      }

      // 3. The request itself.
      const hopStarted = now();
      let response: Response;
      try {
        response = await beforeDeadline(
          fetchImpl(current.href, {
            method: 'GET',
            redirect: 'manual',
            signal: controller.signal,
            cache: 'no-store',
            credentials: 'omit',
            headers: {
              'User-Agent': USER_AGENT,
              Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5',
              'Accept-Language': 'en-US,en;q=0.8',
            },
          }),
          deadline,
          now,
        );
      } catch (error) {
        const { reason, code } = classifyFetchError(error);
        return fail(reason, code);
      }
      const ttfbMs = now() - hopStarted;

      const headers: Record<string, string> = {};
      for (const name of KEPT_HEADERS) {
        const value = response.headers.get(name);
        if (value !== null) headers[name] = value;
      }
      const contentTypeHeader = headers['content-type'] || '';
      const contentType = contentTypeHeader.split(';')[0].trim().toLowerCase();

      // 4. Redirects, followed by hand and re-validated on the next loop.
      if (REDIRECT_STATUSES.has(response.status)) {
        discardBody(response);
        let next: URL | null = null;
        try {
          next = headers.location ? new URL(headers.location, current) : null;
        } catch {
          next = null;
        }
        const stop = (location: string | null): FetchSuccess => ({
          ok: true,
          url: current.href,
          status: response.status,
          location,
          contentType,
          headers,
          body: '',
          bytes: 0,
          truncated: false,
          ttfbMs,
          totalMs: now() - started,
          redirects,
        });
        if (!next) return stop(null);
        if (followRedirect && !followRedirect(next, current)) return stop(next.href);
        if (redirects >= maxRedirects) return fail('too-many-redirects');
        redirects += 1;
        current = next;
        continue;
      }

      // 5. The body, streamed and capped.
      let body = '';
      let bytes = 0;
      let truncated = false;
      if (readBody) {
        try {
          const read = await readBodyCapped(response, maxBytes, deadline, now);
          body = read.text;
          bytes = read.bytes;
          truncated = read.truncated;
        } catch (error) {
          const { reason, code } = classifyFetchError(error);
          return fail(reason, code);
        }
      } else {
        discardBody(response);
      }

      return {
        ok: true,
        url: current.href,
        status: response.status,
        location: null,
        contentType,
        headers,
        body,
        bytes,
        truncated,
        ttfbMs,
        totalMs: now() - started,
        redirects,
      };
    }
  } finally {
    clearTimeout(abortTimer);
    // Abort anything still in flight (a capped body, a cancelled redirect).
    controller.abort();
  }
}
