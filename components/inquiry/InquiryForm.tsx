'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react';
import {
  PROJECT_GOALS,
  PROJECT_TYPES,
  REFERRAL_SOURCES,
  TIMELINE_OPTIONS,
  type InquiryFormData,
} from '@/types/inquiry';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { getFormspreeFormId, isBookingConfigured } from '@/lib/constants';

const STORAGE_KEY = 'sproutflow-inquiry-draft';
const initialData: InquiryFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  currentWebsiteUrl: '',
  projectType: '',
  projectGoal: '',
  hasCurrentWebsite: '',
  currentWebsitePlatform: '',
  projectScope: '',
  budgetRange: '',
  timeline: '',
  decisionMaker: '',
  projectDetails: '',
  referralSource: '',
};
const inputBaseClass =
  'min-h-12 w-full rounded-lg border bg-white px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2';
const inputClass = `${inputBaseClass} border-primary-900/20 focus:border-primary-700 focus:ring-primary-600/20`;
// red-700 (#B91C1C) is 5.64:1 on the Birch Paper canvas (#F4EFE3) and 6.47:1
// on the white input fill, so the message text clears 4.5:1 and the border
// clears the 3:1 non-text minimum. The thicker ring keeps the invalid state
// visible without relying on hue alone.
const invalidInputClass = `${inputBaseClass} border-red-700 ring-1 ring-red-700 focus:border-red-700 focus:ring-red-700/30`;

type ContactField = 'name' | 'email';

// Same rules the submit handler has always used. Pulled out so a field that is
// already showing an error can re-check itself while the visitor fixes it.
function validateContactField(field: ContactField, value: string): string | undefined {
  if (field === 'name') return value.trim() ? undefined : 'Enter your name.';
  if (!value.trim()) return 'Enter your email.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
  return undefined;
}

function prefersReducedMotion() {
  try {
    return typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

// jsdom and some older browsers lack scrollIntoView; never let a missing
// scroll helper break the form.
function scrollToElement(element: HTMLElement | null, block: ScrollLogicalPosition) {
  if (!element || typeof element.scrollIntoView !== 'function') return;
  element.scrollIntoView({ block, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-none" aria-hidden="true" />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-primary-900">
        {label}
        {required && <span className="ml-1 text-accent-700">*</span>}
      </span>
      {children}
    </label>
  );
}

export function InquiryForm({ initialProjectType = '' }: { initialProjectType?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<InquiryFormData>({ ...initialData, projectType: initialProjectType });
  const [errors, setErrors] = useState<{ name?: string; email?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitGuard = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const legendRef = useRef<HTMLLegendElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // Only steps the visitor moves through (Continue/Back) should move focus and
  // scroll. The first render and a restored draft must leave the page alone.
  const stepChangedByUser = useRef(false);
  const focusFirstError = useRef(false);
  const idPrefix = useId();
  const nameErrorId = `${idPrefix}-name-error`;
  const emailErrorId = `${idPrefix}-email-error`;

  useEffect(() => {
    // Storage access itself can throw, not just the parse: Safari private mode
    // and hardened privacy settings reject sessionStorage outright. An
    // unguarded read here takes down the whole inquiry form, which is the only
    // conversion path on the site.
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as { step?: number; data?: InquiryFormData };
      if (parsed.data) setData({ ...parsed.data, projectType: initialProjectType || parsed.data.projectType });
      if (parsed.step && parsed.step >= 1 && parsed.step <= 3) setStep(parsed.step);
    } catch {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* storage unavailable; drafts simply do not persist */
      }
    }
  }, [initialProjectType]);

  useEffect(() => {
    if (submitted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
    } catch {
      /* quota exceeded or storage disabled; the form still works without a draft */
    }
  }, [data, step, submitted]);

  useEffect(() => {
    if (!stepChangedByUser.current) return;
    stepChangedByUser.current = false;
    scrollToElement(formRef.current, 'start');
    legendRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (!focusFirstError.current) return;
    focusFirstError.current = false;
    const target = errors.name ? nameRef.current : errors.email ? emailRef.current : null;
    if (!target) return;
    target.focus({ preventScroll: true });
    scrollToElement(target, 'center');
  }, [errors]);

  const goToStep = (next: number) => {
    stepChangedByUser.current = true;
    setStep(next);
  };

  const update =
    (field: keyof InquiryFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value } = event.target;
      setData((current) => ({ ...current, [field]: value }));
      if (field === 'name' || field === 'email') {
        setErrors((current) => {
          if (!current[field]) return current;
          return { ...current, [field]: validateContactField(field, value) };
        });
      }
    };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      goToStep(step + 1);
      return;
    }
    const nextErrors: typeof errors = {};
    const nameError = validateContactField('name', data.name);
    const emailError = validateContactField('email', data.email);
    if (nameError) nextErrors.name = nameError;
    if (emailError) nextErrors.email = emailError;
    if (Object.keys(nextErrors).length) {
      focusFirstError.current = true;
      setErrors(nextErrors);
      return;
    }
    const formId = getFormspreeFormId();
    if (!formId) {
      setErrors({ form: 'The form is unavailable right now. Email me directly instead.' });
      return;
    }
    if (submitGuard.current) return;
    submitGuard.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Submission failed');
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        /* storage unavailable; nothing to clear */
      }
      setSubmitted(true);
    } catch {
      submitGuard.current = false;
      setIsSubmitting(false);
      setErrors({ form: 'Something went wrong. Try again or email me directly.' });
    }
  };

  if (submitted)
    return (
      <div className="border-y border-primary-900/20 py-12">
        <p className="text-eyebrow uppercase text-accent-700">Project received</p>
        <h2 className="mt-4 font-display text-display-md text-primary-900">Thanks. Your project is in.</h2>
        <p className="mt-4 max-w-xl text-text-secondary">
          I will review the details and reply within one business day.
        </p>
        {isBookingConfigured() && (
          <p className="mt-4 max-w-xl text-text-secondary">
            Want to move faster?{' '}
            <BookCallLink
              data-cta="inquiry-success"
              className="font-semibold text-primary-800 underline underline-offset-2"
            >
              Book a 15-minute call now
            </BookCallLink>
          </p>
        )}
        <Link
          href="/work"
          className="mt-7 inline-flex border-b border-primary-700 pb-1 font-semibold text-primary-800"
        >
          See recent client work while you wait
        </Link>
      </div>
    );

  return (
    <form ref={formRef} onSubmit={submit} className="scroll-mt-24 md:scroll-mt-28">
      <div className="mb-10 grid grid-cols-3 gap-2" aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((item) => (
          <div key={item}>
            <span className={`block h-1 ${item <= step ? 'bg-accent-500' : 'bg-primary-900/15'}`} />
            <span className={`mt-2 block font-mono text-xs ${item === step ? 'text-primary-900' : 'text-text-muted'}`}>
              0{item}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <fieldset className="space-y-6">
          <legend ref={legendRef} tabIndex={-1} className="font-display text-display-md text-primary-900 focus:outline-none">What is happening now?</legend>
          <p className="text-text-secondary">A rough description is enough. Nothing in this step is required.</p>
          <Field label="Which path feels closest?">
            <select value={data.projectType} onChange={update('projectType')} className={inputClass}>
              <option value="">Choose a path</option>
              {PROJECT_TYPES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
          <Field label="Current website, if there is one">
            <input
              type="url"
              value={data.currentWebsiteUrl}
              onChange={update('currentWebsiteUrl')}
              placeholder="https://"
              className={inputClass}
            />
          </Field>
          <Field label="What keeps getting in the way?">
            <textarea
              value={data.projectDetails}
              onChange={update('projectDetails')}
              rows={6}
              className={inputClass}
              placeholder="The customer, operational problem, or repeated task you want to improve."
            />
          </Field>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="space-y-6">
          <legend ref={legendRef} tabIndex={-1} className="font-display text-display-md text-primary-900 focus:outline-none">
            What would useful progress look like?
          </legend>
          <p className="text-text-secondary">Best guesses are fine. We can clarify the details together.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Primary goal">
              <select value={data.projectGoal} onChange={update('projectGoal')} className={inputClass}>
                <option value="">Select an option</option>
                {PROJECT_GOALS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
            <Field label="Ideal timing">
              <select value={data.timeline} onChange={update('timeline')} className={inputClass}>
                <option value="">Select an option</option>
                {TIMELINE_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Comfortable budget, optional">
            <input
              value={data.budgetRange}
              onChange={update('budgetRange')}
              className={inputClass}
              placeholder="A range is enough. This stays private."
            />
          </Field>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="space-y-6">
          <legend ref={legendRef} tabIndex={-1} className="font-display text-display-md text-primary-900 focus:outline-none">How can I reach you?</legend>
          <p className="text-text-secondary">Name and email are the only required fields.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Field label="Name" required>
                <input
                  ref={nameRef}
                  value={data.name}
                  onChange={update('name')}
                  className={errors.name ? invalidInputClass : inputClass}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? nameErrorId : undefined}
                />
              </Field>
              {errors.name && <FieldError id={nameErrorId} message={errors.name} />}
            </div>
            <div>
              <Field label="Email" required>
                <input
                  ref={emailRef}
                  type="email"
                  value={data.email}
                  onChange={update('email')}
                  className={errors.email ? invalidInputClass : inputClass}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? emailErrorId : undefined}
                />
              </Field>
              {errors.email && <FieldError id={emailErrorId} message={errors.email} />}
            </div>
            <Field label="Business name">
              <input
                value={data.company}
                onChange={update('company')}
                className={inputClass}
                autoComplete="organization"
              />
            </Field>
            <Field label="How did you find Sproutflow?">
              <select value={data.referralSource} onChange={update('referralSource')} className={inputClass}>
                <option value="">Select an option</option>
                {REFERRAL_SOURCES.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </Field>
          </div>
        </fieldset>
      )}

      {errors.form && (
        <p className="mt-6 flex items-start gap-2 border-l-2 border-red-700 pl-4 font-medium text-red-700" role="alert">
          <AlertCircle className="mt-1 h-4 w-4 flex-none" aria-hidden="true" />
          <span>
            <span className="sr-only">Error: </span>
            {errors.form}
          </span>
        </p>
      )}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-primary-900/20 pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-ink-900 px-7 py-3.5 font-semibold text-white hover:bg-primary-800 disabled:opacity-60"
        >
          {step < 3 ? 'Continue' : isSubmitting ? 'Sending…' : 'Send project details'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <p className="mt-5 flex gap-2 text-sm text-text-muted">
        <LockKeyhole className="mt-0.5 h-4 w-4 flex-none" />
        <span>
          I use these details only to respond to your inquiry. Read{' '}
          <Link href="/data-and-ownership" className="font-semibold text-primary-800 underline underline-offset-2">
            how I handle your data
          </Link>
          .
        </span>
      </p>
    </form>
  );
}
