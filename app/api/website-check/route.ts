/**
 * POST /api/website-check  { "url": "yourbusiness.com" }
 *
 * Runs the free website check (lib/website-check) and returns the six
 * results. v0 stores nothing and sends nothing: the visitor's browser posts a
 * report request to Formspree itself.
 *
 * Responses:
 * - 200 { result }
 * - 400 { error: 'empty' | 'invalid' | 'blocked', message }
 * - 429 { error: 'rate_limited', message } with Retry-After
 * - 500 { error: 'server', message }
 */

import { ERROR_MESSAGES } from '@/lib/website-check/messages';
import { clientIp, takeCheck } from '@/lib/website-check/rate-limit';
import { runWebsiteCheck } from '@/lib/website-check/run';
import type { WebsiteCheckErrorCode } from '@/lib/website-check/types';
import { normalizeInput } from '@/lib/website-check/url-guard';

// node:dns needs the Node runtime; never run this on the edge.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// The check itself is capped at 8 s; leave headroom for a cold start.
export const maxDuration = 20;

const MAX_REQUEST_BYTES = 4096;
/** Hard stop for the whole handler, above the 8 s fetch budget. */
const HANDLER_TIMEOUT_MS = 12000;

function json(status: number, body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
      ...headers,
    },
  });
}

function error(status: number, code: WebsiteCheckErrorCode, headers?: Record<string, string>): Response {
  return json(status, { error: code, message: ERROR_MESSAGES[code] }, headers);
}

export async function POST(request: Request): Promise<Response> {
  const limit = takeCheck(clientIp(request.headers));
  if (!limit.ok) return error(429, 'rate_limited', { 'Retry-After': String(limit.retryAfterSeconds) });

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (declaredLength > MAX_REQUEST_BYTES) return error(400, 'invalid');

  let payload: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_REQUEST_BYTES) return error(400, 'invalid');
    payload = JSON.parse(text);
  } catch {
    return error(400, 'invalid');
  }

  const raw = payload && typeof payload === 'object' ? (payload as { url?: unknown }).url : undefined;
  const input = normalizeInput(raw);
  if (!input.ok) return error(400, input.reason);

  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const outcome = await Promise.race([
      runWebsiteCheck(input),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error('website check handler timeout')), HANDLER_TIMEOUT_MS);
      }),
    ]);
    if (outcome.kind === 'blocked') return error(400, 'blocked');
    return json(200, { result: outcome.result });
  } catch {
    return error(500, 'server');
  } finally {
    clearTimeout(timer);
  }
}
