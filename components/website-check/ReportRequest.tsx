'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AlertCircle, CircleCheck, LockKeyhole } from 'lucide-react';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_LABEL, getFormspreeFormId } from '@/lib/constants';
import { REPORT_MESSAGES } from '@/lib/website-check/messages';
import { formatSummaryText } from '@/lib/website-check/summarize';
import type { WebsiteCheckResult } from '@/lib/website-check/types';
import { cardClass, inputClass, invalidInputClass, primaryButtonClass } from './styles';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * "Email me the full report". v0 posts the request straight to the site's
 * existing Formspree form and Ben replies by hand. The payload is exactly:
 * email, name (only when given), url, results (plain text) and source.
 */
export function ReportRequest({ result }: { result: WebsiteCheckResult }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  const submitGuard = useRef(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const sentHeadingRef = useRef<HTMLHeadingElement>(null);
  const id = useId();
  const emailId = `${id}-email`;
  const nameId = `${id}-name`;
  const emailErrorId = `${id}-email-error`;
  const promiseId = `${id}-promise`;
  const privacyId = `${id}-privacy`;

  useEffect(() => {
    if (sentTo) sentHeadingRef.current?.focus();
  }, [sentTo]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    const problem = !value ? REPORT_MESSAGES.empty : EMAIL_PATTERN.test(value) ? null : REPORT_MESSAGES.invalid;
    if (problem) {
      setEmailError(problem);
      emailRef.current?.focus();
      return;
    }
    setEmailError(null);
    if (submitGuard.current) return;

    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (honeypotRef.current?.value) {
      setSentTo(value);
      return;
    }

    submitGuard.current = true;
    setSending(true);
    setSendError(null);
    const payload: Record<string, string> = {
      email: value,
      url: result.finalUrl ?? result.inputUrl,
      results: formatSummaryText(result),
      source: 'website-check',
    };
    if (name.trim()) payload.name = name.trim();
    try {
      const response = await fetch(`https://formspree.io/f/${getFormspreeFormId()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Report request failed');
      setSentTo(value);
    } catch {
      submitGuard.current = false;
      setSendError(REPORT_MESSAGES.failed);
    } finally {
      setSending(false);
    }
  };

  if (sentTo) {
    return (
      <div className={cardClass}>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-50 text-primary-800">
          <CircleCheck className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3
          ref={sentHeadingRef}
          tabIndex={-1}
          className="mt-4 font-display text-display-sm text-primary-900 focus:outline-none"
        >
          Your report is on its way.
        </h3>
        <p className="mt-3 text-text-secondary [overflow-wrap:anywhere]">
          I will send the full marked-up report to {sentTo} within one business day. It comes from
          me, Ben, so keep an eye out for a personal email.
        </p>
        <p className="mt-4 text-primary-900">Want to go through it together?</p>
        <BookCallLink
          data-cta="website-check-sent"
          inquiryQuery={result.offer ? `tier=${result.offer}` : undefined}
          className={`mt-3 ${primaryButtonClass}`}
        >
          {BOOKING_CTA_LABEL}
        </BookCallLink>
      </div>
    );
  }

  return (
    <div className={cardClass}>
      <h3 className="font-display text-h4 text-primary-900">Prefer to read first? Get the full report by email.</h3>
      <form onSubmit={submit} noValidate className="mt-5 space-y-4">
        <div>
          <label htmlFor={emailId} className="mb-2 block text-sm font-semibold text-primary-900">
            Your email
          </label>
          <input
            ref={emailRef}
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError(null);
            }}
            aria-required="true"
            aria-invalid={emailError ? true : undefined}
            aria-describedby={[emailError ? emailErrorId : null, promiseId, privacyId].filter(Boolean).join(' ')}
            className={emailError ? invalidInputClass : inputClass}
          />
          {emailError && (
            <p id={emailErrorId} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
              <span>
                <span className="sr-only">Error: </span>
                {emailError}
              </span>
            </p>
          )}
        </div>
        <div>
          <label htmlFor={nameId} className="mb-2 block text-sm font-semibold text-primary-900">
            Your name <span className="font-normal text-text-muted">(optional)</span>
          </label>
          <input
            id={nameId}
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
          />
        </div>
        {/* Honeypot: hidden from people and assistive tech, left empty by humans. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor={`${id}-company-site`}>Leave this empty</label>
          <input ref={honeypotRef} id={`${id}-company-site`} type="text" name="company_site" tabIndex={-1} autoComplete="off" />
        </div>
        {sendError && (
          <p className="flex items-start gap-2 border-l-2 border-red-700 pl-3 text-sm font-medium text-red-700" role="alert">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
            <span>{sendError}</span>
          </p>
        )}
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-primary-900 px-6 py-3 font-semibold text-primary-900 hover:bg-primary-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Email me the report'}
        </button>
        <p id={promiseId} className="text-sm text-text-secondary">
          I will send the full marked-up report within one business day.
        </p>
        <p id={privacyId} className="flex gap-2 text-sm text-text-muted">
          <LockKeyhole className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
          <span>I only use this to send your report. Nothing is stored on this site.</span>
        </p>
      </form>
    </div>
  );
}
