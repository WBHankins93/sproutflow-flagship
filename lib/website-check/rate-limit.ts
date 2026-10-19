/**
 * Best-effort, in-memory, per-IP limit for the website check: 10 checks per
 * rolling hour.
 *
 * Best effort only: each serverless instance keeps its own memory, so the
 * count resets on a cold start and is not shared between instances. A shared
 * store (Upstash, Vercel KV) is the v1 upgrade if abuse shows up.
 */

export const CHECKS_PER_WINDOW = 10;
export const WINDOW_MS = 60 * 60 * 1000;
const MAX_TRACKED_IPS = 5000;

const hits = new Map<string, number[]>();

export interface LimitDecision {
  ok: boolean;
  /** Seconds until the oldest hit leaves the window (only when limited). */
  retryAfterSeconds: number;
}

function prune(now: number): void {
  for (const [ip, times] of hits) {
    const fresh = times.filter((time) => now - time < WINDOW_MS);
    if (fresh.length === 0) hits.delete(ip);
    else hits.set(ip, fresh);
  }
  // Still too many distinct IPs: drop the oldest entries (Map keeps insertion order).
  while (hits.size > MAX_TRACKED_IPS) {
    const oldest = hits.keys().next().value;
    if (oldest === undefined) break;
    hits.delete(oldest);
  }
}

/** Records one check for this IP and says whether it is allowed. */
export function takeCheck(ip: string, now: number = Date.now()): LimitDecision {
  if (hits.size > MAX_TRACKED_IPS) prune(now);
  const times = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (times.length >= CHECKS_PER_WINDOW) {
    hits.set(ip, times);
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((times[0] + WINDOW_MS - now) / 1000)) };
  }
  times.push(now);
  hits.set(ip, times);
  return { ok: true, retryAfterSeconds: 0 };
}

/** Test helper: forget every recorded hit. */
export function resetRateLimits(): void {
  hits.clear();
}

/**
 * The client IP. Vercel sets x-real-ip and x-forwarded-for itself and
 * overwrites values a client sends, so the first entry is the visitor.
 */
export function clientIp(headers: Headers): string {
  const real = headers.get('x-real-ip')?.trim();
  if (real) return real;
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || 'unknown';
}
