/**
 * Shared types for the free website check (v1: six page checks plus the
 * domain and email operations checks).
 *
 * Pure type module: safe to import from client components.
 */

import type { OfferKey } from '@/data/catalog';

/** Six page checks, then two operations checks from public data (domain registry, DNS). */
export type CheckId = 'loads' | 'https' | 'mobile' | 'call' | 'form' | 'speed' | 'domain' | 'email';

/** `unknown` displays as a grey "not checked" line. */
export type CheckStatus = 'pass' | 'warn' | 'fail' | 'unknown';

/**
 * The recommended next step: one of the catalog offer keys (data/catalog.ts).
 * Old ids map through LEGACY_OFFER_KEYS: website-rescue is now `starter`,
 * lead-capture-system is `custom`, lead-flow-audit is `audit`.
 */
export type OfferId = OfferKey;

export interface CheckResult {
  id: CheckId;
  label: string;
  status: CheckStatus;
  /** What was found, first person, no promises. */
  line: string;
  /** Which offer covers it. Only set on warn or fail. */
  fix?: string;
  /** A short aside that is not a result, for example what could not be checked (DKIM). */
  note?: string;
  data?: Record<string, string | number | boolean>;
}

/**
 * - `checked`: the homepage loaded (any HTML or non-HTML 2xx, or an error status).
 * - `not-loaded`: DNS, timeout, refused or TLS on both schemes, too many redirects.
 * - `not-checked`: the site turned the checker away (403 challenge and similar), or a fetch failed in a way I cannot judge safely.
 */
export type CheckOutcome = 'checked' | 'not-loaded' | 'not-checked';

export interface WebsiteCheckResult {
  checkedAt: string;
  /** What the visitor typed, trimmed. */
  inputUrl: string;
  /** Host shown to the visitor, without a leading www. */
  host: string;
  finalUrl: string | null;
  outcome: CheckOutcome;
  /** One recommended next step, or null when nothing could be checked. */
  offer: OfferId | null;
  checks: CheckResult[];
}

/** Error codes the API returns, mapped to COPY.md section 6 lines. */
export type WebsiteCheckErrorCode = 'empty' | 'invalid' | 'blocked' | 'rate_limited' | 'server';
