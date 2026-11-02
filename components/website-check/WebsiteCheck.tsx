'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, ArrowRight, Check, Circle, LoaderCircle } from 'lucide-react';
import { getOffer } from '@/data/catalog';
import { CHECK_ORDER, ERROR_MESSAGES, OFFLINE_MESSAGE, STEP_NAMES } from '@/lib/website-check/messages';
import { countStatuses, doneAnnouncement } from '@/lib/website-check/summarize';
import type { WebsiteCheckErrorCode, WebsiteCheckResult } from '@/lib/website-check/types';
import { normalizeInput } from '@/lib/website-check/url-guard';
import { Heading } from '@/components/v3';
import { CheckResults } from './CheckResults';
import { cardClass, inputClass, invalidInputClass, labelClass, primaryButtonClass, softTextClass } from './styles';

/** "starter landing page", from data/catalog.ts, for the no-website line. */
const STARTER_NAME = (getOffer('starter')?.name ?? 'Starter landing page').toLowerCase();

type Phase = 'idle' | 'checking' | 'results';

/** How long each cosmetic progress step shows while the server works. */
const STEP_MS = 700;

const WHAT_I_CHECK = [
  ['It loads.', 'Does the page open, and how fast does it start?'],
  ['It is secure.', 'Does it use https, or do browsers warn "Not secure"?'],
  ['It fits a phone.', 'Is it set up to size to a phone screen?'],
  ['Tap to call.', 'Can a customer tap your number to call you?'],
  ['A way to ask for a quote.', 'Is there a form, not just an email address?'],
  ['It is light.', 'Is the page small enough to load on a weak signal?'],
] as const;

const FIELD_ERRORS = new Set<WebsiteCheckErrorCode>(['empty', 'invalid', 'blocked']);

function isOffline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

/**
 * The free website check: enter a URL, watch it check, read eight results, and
 * optionally ask for the full report. Flow and copy follow
 * funnel/check-flow.html and funnel/COPY.md.
 *
 * `initialUrl` prefills the field (from /check?url=). The check never runs on
 * its own; the visitor presses "Check my site".
 */
export function WebsiteCheck({ initialUrl = '' }: { initialUrl?: string } = {}) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [url, setUrl] = useState(initialUrl);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>(null);
  const [host, setHost] = useState('');
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<WebsiteCheckResult | null>(null);
  const [status, setStatus] = useState('');
  const inFlight = useRef(false);
  const focusTarget = useRef<'input' | 'results' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const inputId = `${id}-url`;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  // Move focus after the screen changes: to the results heading when results
  // arrive, back to the field after an error or "check another site".
  useEffect(() => {
    const target = focusTarget.current;
    if (!target) return;
    focusTarget.current = null;
    if (target === 'results') resultsHeadingRef.current?.focus();
    else inputRef.current?.focus();
  }, [phase, fieldError]);

  // Cosmetic progress while the single request runs. It holds on the last
  // step until the server answers.
  useEffect(() => {
    if (phase !== 'checking') return;
    const timer = setInterval(() => setStep((current) => Math.min(current + 1, CHECK_ORDER.length - 1)), STEP_MS);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'checking') return;
    setStatus(`Checking ${host}. Step ${step + 1} of ${CHECK_ORDER.length}: ${STEP_NAMES[CHECK_ORDER[step]]}.`);
  }, [phase, step, host]);

  const backToForm = useCallback((message: string, asFieldError: boolean) => {
    setPhase('idle');
    setStatus('');
    if (asFieldError) {
      setFieldError(message);
      setAlert(null);
    } else {
      setAlert(message);
    }
    focusTarget.current = 'input';
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inFlight.current) return;
    const normalized = normalizeInput(url);
    if (!normalized.ok) {
      setFieldError(ERROR_MESSAGES[normalized.reason]);
      setAlert(null);
      inputRef.current?.focus();
      return;
    }
    setFieldError(null);
    if (isOffline()) {
      setAlert(OFFLINE_MESSAGE);
      return;
    }
    setAlert(null);
    setHost(normalized.displayHost);
    setStep(0);
    setResult(null);
    setPhase('checking');
    inFlight.current = true;

    try {
      const response = await fetch('/api/website-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized.input }),
      });
      const data = (await response.json().catch(() => null)) as
        | { result?: WebsiteCheckResult; error?: WebsiteCheckErrorCode; message?: string }
        | null;
      if (response.ok && data?.result) {
        setResult(data.result);
        setPhase('results');
        setStatus(doneAnnouncement(countStatuses(data.result.checks)));
        focusTarget.current = 'results';
        return;
      }
      const code = data?.error && data.error in ERROR_MESSAGES ? data.error : 'server';
      backToForm(ERROR_MESSAGES[code], FIELD_ERRORS.has(code));
    } catch {
      backToForm(isOffline() ? OFFLINE_MESSAGE : ERROR_MESSAGES.server, false);
    } finally {
      inFlight.current = false;
    }
  };

  const restart = () => {
    setPhase('idle');
    setResult(null);
    setStatus('');
    setAlert(null);
    focusTarget.current = 'input';
  };

  return (
    <div>
      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>

      {phase === 'idle' && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
          <div className={`${cardClass} min-w-0`}>
            <form onSubmit={submit} noValidate aria-label="Free website check">
              <label htmlFor={inputId} className="mb-2 block font-semibold text-primary-900">
                Your website address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  ref={inputRef}
                  id={inputId}
                  name="url"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="yourbusiness.com"
                  value={url}
                  onChange={(event) => {
                    setUrl(event.target.value);
                    if (fieldError) setFieldError(null);
                  }}
                  aria-required="true"
                  aria-invalid={fieldError ? true : undefined}
                  aria-describedby={fieldError ? `${errorId} ${helpId}` : helpId}
                  className={`${fieldError ? invalidInputClass : inputClass} text-[17px] sm:flex-1`}
                />
                <button type="submit" className={`${primaryButtonClass} sm:flex-none`}>
                  Check my site
                  <ArrowRight className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
              {fieldError && (
                <p id={errorId} className="mt-3 flex items-start gap-1.5 text-sm font-medium text-red-700">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Error: </span>
                    {fieldError}
                  </span>
                </p>
              )}
              {alert && (
                <p className="mt-4 border-l-4 border-redline bg-redline-soft px-3 py-2.5 text-[15px] text-primary-900" role="alert">
                  {alert}
                </p>
              )}
              <p id={helpId} className="mt-3 text-sm text-text-muted">
                Free. Nothing is stored unless you ask me to email the report.
              </p>
              <noscript>
                <p className="mt-4 border-l-4 border-redline bg-redline-soft px-3 py-2.5 text-[15px] text-primary-900">
                  The checker needs JavaScript. You can also email me your address at ben@sproutflow-studio.com and I
                  will run it for you.
                </p>
              </noscript>
            </form>
          </div>

          <div className="min-w-0">
            <Heading as="h2" size="sm" className="text-primary-900">
              What I check
            </Heading>
            <ol className="mt-4 border-t border-primary-900/15">
              {WHAT_I_CHECK.map(([title, body], index) => (
                <li key={title} className="grid grid-cols-[32px_minmax(0,1fr)] gap-x-3 border-b border-primary-900/15 py-3.5">
                  <span className="font-mono text-label leading-6 tabular-nums text-redline [font-variant-ligatures:none]" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-primary-900">{title}</p>
                    <p className={`text-[15px] ${softTextClass}`}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className={`mt-4 text-sm ${softTextClass}`}>
              No website at all? That is what my <strong className="text-primary-900">{STARTER_NAME}</strong> is for.
            </p>
          </div>
        </div>
      )}

      {phase === 'checking' && (
        <div className={`${cardClass} mx-auto max-w-2xl`} aria-busy="true">
          <p className={labelClass}>Checking</p>
          <Heading as="h2" size="sm" className="mt-3 text-primary-900 [overflow-wrap:anywhere]">
            Checking <span className="font-mono text-[0.8em]">{host}</span>
          </Heading>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-cream-500" aria-hidden="true">
            <div
              className="h-full rounded-full bg-primary-700 motion-safe:transition-[width] motion-safe:duration-500"
              style={{ width: `${Math.round(((step + 0.5) / CHECK_ORDER.length) * 100)}%` }}
            />
          </div>
          <ol className="mt-5 border-t border-primary-900/15">
            {CHECK_ORDER.map((checkId, index) => {
              const state = index < step ? 'done' : index === step ? 'running' : 'waiting';
              return (
                <li
                  key={checkId}
                  className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 border-b border-primary-900/15 py-3.5"
                >
                  <span className="flex h-6 w-6 items-center justify-center" aria-hidden="true">
                    {state === 'done' && <Check className="h-5 w-5 text-primary-700" />}
                    {state === 'running' && <LoaderCircle className="h-5 w-5 text-primary-700 motion-safe:animate-spin" />}
                    {state === 'waiting' && <Circle className="h-3 w-3 text-primary-900/30" />}
                  </span>
                  <span className={state === 'waiting' ? 'text-text-muted' : 'text-primary-900'}>{STEP_NAMES[checkId]}</span>
                  <span className="whitespace-nowrap font-mono text-label uppercase text-text-muted [font-variant-ligatures:none]">
                    {state === 'done' ? 'Done' : state === 'running' ? 'Checking' : 'Waiting'}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-sm text-text-muted">
            Usually under 10 seconds. I load your homepage from my server and read it.
          </p>
        </div>
      )}

      {phase === 'results' && result && <CheckResults ref={resultsHeadingRef} result={result} onRestart={restart} />}
    </div>
  );
}
