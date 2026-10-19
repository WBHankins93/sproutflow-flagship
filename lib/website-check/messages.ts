/**
 * Visitor-facing copy for the website check, from funnel/COPY.md section 6.
 * Shared by the API route and the client component. "I" voice, no em dashes.
 */

import type { CheckId, WebsiteCheckErrorCode } from './types';

export const ERROR_MESSAGES: Record<WebsiteCheckErrorCode, string> = {
  empty: 'Enter your website address first, like yourbusiness.com.',
  invalid: 'That does not look like a website address. Try something like yourbusiness.com.',
  blocked: 'I can only check public websites. Try the address your customers type.',
  rate_limited: 'You have run a lot of checks in a short time. Try again in a few minutes.',
  server: 'Something went wrong on my end, not yours. Try again in a minute.',
};

export const OFFLINE_MESSAGE = 'You look offline. Check your connection and try again.';

export const REPORT_MESSAGES = {
  empty: 'Enter your email so I can send the report.',
  invalid: 'That email does not look right. Check for a typo.',
  failed: 'Your report did not send. Try again, or email me at ben@sproutflow-studio.com.',
};

/** Short labels shown next to each result (check-flow.html screen 3). */
export const CHECK_LABELS: Record<CheckId, string> = {
  loads: 'It loads',
  https: 'It is secure',
  mobile: 'It fits a phone',
  call: 'Tap to call',
  form: 'Quote form',
  speed: 'It is light',
};

/** Step names announced while checking (check-flow.html screen 2). */
export const STEP_NAMES: Record<CheckId, string> = {
  loads: 'Loading your homepage',
  https: 'Checking the secure connection',
  mobile: 'Checking the phone layout',
  call: 'Looking for tap-to-call',
  form: 'Looking for a quote form',
  speed: 'Estimating page weight',
};

export const CHECK_ORDER: CheckId[] = ['loads', 'https', 'mobile', 'call', 'form', 'speed'];

/** The checker identifies itself honestly on every request. */
export const USER_AGENT = 'SproutflowSiteCheck/1.0 (+https://www.sproutflow-studio.com/check)';
