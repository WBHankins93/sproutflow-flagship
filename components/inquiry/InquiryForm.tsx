'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, LockKeyhole } from 'lucide-react';
import {
  PROJECT_GOALS,
  PROJECT_TYPES,
  REFERRAL_SOURCES,
  TIMELINE_OPTIONS,
  type InquiryFormData,
} from '@/types/inquiry';

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
const inputClass =
  'min-h-12 w-full rounded-lg border border-primary-900/20 bg-white px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600/20';

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

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as { step?: number; data?: InquiryFormData };
      if (parsed.data) setData({ ...parsed.data, projectType: initialProjectType || parsed.data.projectType });
      if (parsed.step && parsed.step >= 1 && parsed.step <= 3) setStep(parsed.step);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [initialProjectType]);

  useEffect(() => {
    if (!submitted) sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step, data }));
  }, [data, step, submitted]);

  const update =
    (field: keyof InquiryFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step < 3) {
      setStep((current) => current + 1);
      return;
    }
    const nextErrors: typeof errors = {};
    if (!data.name.trim()) nextErrors.name = 'Enter your name.';
    if (!data.email.trim()) nextErrors.email = 'Enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) nextErrors.email = 'Enter a valid email address.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
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
      sessionStorage.removeItem(STORAGE_KEY);
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
        <Link
          href="/resources/what-you-should-own-after-launch"
          className="mt-7 inline-flex border-b border-primary-700 pb-1 font-semibold text-primary-800"
        >
          Read a useful guide while you wait
        </Link>
      </div>
    );

  return (
    <form onSubmit={submit}>
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
          <legend className="font-display text-display-md text-primary-900">What is happening now?</legend>
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
          <legend className="font-display text-display-md text-primary-900">
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
          <legend className="font-display text-display-md text-primary-900">How can I reach you?</legend>
          <p className="text-text-secondary">Name and email are the only required fields.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" required>
              <input
                value={data.name}
                onChange={update('name')}
                className={inputClass}
                autoComplete="name"
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="mt-2 block text-sm text-primary-700">{errors.name}</span>}
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                value={data.email}
                onChange={update('email')}
                className={inputClass}
                autoComplete="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && <span className="mt-2 block text-sm text-primary-700">{errors.email}</span>}
            </Field>
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
        <p className="mt-6 border-l-2 border-primary-700 pl-4 text-primary-800" role="alert">
          {errors.form}
        </p>
      )}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-primary-900/20 pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((current) => current - 1)}
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
