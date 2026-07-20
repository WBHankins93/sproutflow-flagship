'use client';

import { useRef, useState } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { BodyText, Button, Heading } from '@/components/layout/StudioLayout';
import { serviceTiers } from '@/data/services';
import {
  PROJECT_GOALS,
  PROJECT_TYPES,
  REFERRAL_SOURCES,
  TIMELINE_OPTIONS,
  type InquiryFormData,
} from '@/types/inquiry';

const DISCOVERY_CALL_URL = 'https://calendar.app.google/hMkRd7yqsovDwZuL7';

const initialFormData: InquiryFormData = {
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

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5 border-0 p-0">
      <legend className="mb-1 font-display text-2xl font-semibold text-text-primary">
        {title}
      </legend>
      {description && <p className="text-text-secondary">{description}</p>}
      {children}
    </fieldset>
  );
}

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-body font-medium text-text-primary">
      {children}
      {required && <span className="ml-0.5 text-primary-700" aria-hidden>*</span>}
    </label>
  );
}

const inputBase =
  'w-full min-h-12 rounded-xl border border-nature-200 bg-white px-4 py-3 font-body text-text-primary placeholder:text-text-muted focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-colors';

export function InquiryForm() {
  const [data, setData] = useState<InquiryFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitGuard = useRef(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const update =
    (field: keyof InquiryFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((previous) => ({ ...previous, [field]: event.target.value }));
      if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
    };

  const validate = () => {
    const next: Partial<Record<keyof InquiryFormData, string>> = {};

    if (!data.name.trim()) next.name = 'Enter your name.';
    if (!data.email.trim()) next.email = 'Enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      next.email = 'Enter a valid email address.';
    }

    setErrors(next);
    if (next.name) nameInputRef.current?.focus();
    else if (next.email) emailInputRef.current?.focus();
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitGuard.current || isSubmitting || !validate()) return;

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (!formId) {
      setErrors({ projectDetails: 'The form is unavailable right now. Please email us directly.' });
      return;
    }

    submitGuard.current = true;
    setIsSubmitting(true);
    setErrors({});

    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      current_website_url: data.currentWebsiteUrl,
      project_type: data.projectType,
      project_goal: data.projectGoal,
      budget_range: data.budgetRange,
      timeline: data.timeline,
      project_details: data.projectDetails,
      referral_source: data.referralSource,
    };

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setErrors({ projectDetails: 'Something went wrong. Try again or email us directly.' });
      submitGuard.current = false;
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl space-y-6 rounded-2xl border border-nature-200 bg-nature-50/50 p-6 text-center sm:p-8">
        <Heading level={2} className="text-primary-800">
          Thanks—your project is in.
        </Heading>
        <BodyText size="lg" color="secondary">
          We&apos;ll review the details and reply within one business day. If you are ready, you can choose a call time now.
        </BodyText>
        <div className="pt-3">
          <Button
            href={DISCOVERY_CALL_URL}
            variant="primary"
            size="md"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Choose a call time
          </Button>
        </div>
      </div>
    );
  }

  const budgetOptions = [
    ...serviceTiers.map((tier) => `${tier.priceRange} (${tier.name})`),
    'Not sure yet',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-6 pt-4 md:pt-6">
      <FormSection title="Your details" description="Only your name and email are required.">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="inquiry-name" required>Name</Label>
            <input
              ref={nameInputRef}
              id="inquiry-name"
              name="name"
              value={data.name}
              onChange={update('name')}
              className={`${inputBase} ${errors.name ? 'border-primary-600 ring-2 ring-primary-600/20' : ''}`}
              autoComplete="name"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            />
            {errors.name && <p id="inquiry-name-error" className="mt-1.5 text-sm text-primary-700" role="alert">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="inquiry-email" required>Email</Label>
            <input
              ref={emailInputRef}
              id="inquiry-email"
              type="email"
              name="email"
              value={data.email}
              onChange={update('email')}
              className={`${inputBase} ${errors.email ? 'border-primary-600 ring-2 ring-primary-600/20' : ''}`}
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
            />
            {errors.email && <p id="inquiry-email-error" className="mt-1.5 text-sm text-primary-700" role="alert">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="inquiry-company">Business name</Label>
            <input
              id="inquiry-company"
              name="company"
              value={data.company}
              onChange={update('company')}
              className={inputBase}
              autoComplete="organization"
            />
          </div>

          <div>
            <Label htmlFor="inquiry-current-website-url">Current website</Label>
            <input
              id="inquiry-current-website-url"
              type="url"
              name="currentWebsiteUrl"
              value={data.currentWebsiteUrl}
              onChange={update('currentWebsiteUrl')}
              className={inputBase}
              placeholder="https://"
              inputMode="url"
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="The project" description="Best guesses are fine. We will clarify the details together.">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="inquiry-project-type">What do you need?</Label>
            <select id="inquiry-project-type" name="projectType" value={data.projectType} onChange={update('projectType')} className={inputBase}>
              <option value="">Select an option</option>
              {PROJECT_TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <Label htmlFor="inquiry-project-goal">Primary goal</Label>
            <select id="inquiry-project-goal" name="projectGoal" value={data.projectGoal} onChange={update('projectGoal')} className={inputBase}>
              <option value="">Select an option</option>
              {PROJECT_GOALS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <Label htmlFor="inquiry-budget">Comfortable investment range</Label>
            <select id="inquiry-budget" name="budgetRange" value={data.budgetRange} onChange={update('budgetRange')} className={inputBase}>
              <option value="">Select an option</option>
              {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>

          <div>
            <Label htmlFor="inquiry-timeline">Ideal timing</Label>
            <select id="inquiry-timeline" name="timeline" value={data.timeline} onChange={update('timeline')} className={inputBase}>
              <option value="">Select an option</option>
              {TIMELINE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="inquiry-project-details">What would make this project a win?</Label>
          <textarea
            id="inquiry-project-details"
            name="projectDetails"
            value={data.projectDetails}
            onChange={update('projectDetails')}
            rows={5}
            className={`${inputBase} min-h-[132px] resize-y ${errors.projectDetails ? 'border-primary-600 ring-2 ring-primary-600/20' : ''}`}
            placeholder="A few sentences about the business, the problem, and the result you want."
            aria-invalid={!!errors.projectDetails}
            aria-describedby={errors.projectDetails ? 'inquiry-project-details-error' : undefined}
          />
          {errors.projectDetails && <p id="inquiry-project-details-error" className="mt-1.5 text-sm text-primary-700" role="alert">{errors.projectDetails}</p>}
        </div>

        <div>
          <Label htmlFor="inquiry-referral">How did you hear about Sproutflow?</Label>
          <select id="inquiry-referral" name="referralSource" value={data.referralSource} onChange={update('referralSource')} className={inputBase}>
            <option value="">Select an option</option>
            {REFERRAL_SOURCES.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </FormSection>

      <div className="border-t border-nature-200 pt-7">
        <Button type="submit" variant="primary" size="lg" className="min-h-12 w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send project details'}
        </Button>
        <p className="mt-4 flex items-start gap-2 text-sm text-text-muted">
          <LockKeyhole className="mt-0.5 h-4 w-4 flex-none" />
          <span>We use these details only to respond to your inquiry. Read <a href="/how-we-handle-your-data" className="font-semibold text-primary-700 underline underline-offset-2">how we handle your data</a>.</span>
        </p>
        {isSubmitting && <p className="mt-2 text-sm text-text-muted">Keep this page open while the form sends.</p>}
      </div>
    </form>
  );
}
