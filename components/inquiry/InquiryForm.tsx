'use client';

import { useState, useRef } from 'react';
import { Heading, BodyText, Button } from '@/components/layout/StudioLayout';
import {
  PROJECT_TYPES,
  PROJECT_GOALS,
  HAS_WEBSITE_OPTIONS,
  WEBSITE_PLATFORMS,
  PROJECT_SCOPE_OPTIONS,
  TIMELINE_OPTIONS,
  REFERRAL_SOURCES,
  type InquiryFormData,
} from '@/types/inquiry';
import { serviceTiers } from '@/data/services';
import { ArrowRight } from 'lucide-react';

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
  projectDetails: '',
  referralSource: '',
};

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-4 border-0 p-0">
      <legend className="text-subsection font-display font-semibold text-text-primary mb-2">
        {title}
      </legend>
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
    <label
      htmlFor={htmlFor}
      className="block text-body font-body font-medium text-text-primary mb-1.5"
    >
      {children}
      {required && <span className="text-primary-600 ml-0.5" aria-hidden>*</span>}
    </label>
  );
}

const inputBase =
  'w-full min-h-[44px] rounded-lg border border-nature-200 bg-white px-4 py-3 text-body font-body text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors';

export function InquiryForm() {
  const [data, setData] = useState<InquiryFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitGuard = useRef(false);

  const update = (field: keyof InquiryFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const next: Partial<Record<keyof InquiryFormData, string>> = {};
    if (!data.name.trim()) next.name = 'Name is required.';
    if (!data.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = 'Please enter a valid email.';
    setErrors(next);
    if (next.name) nameInputRef.current?.focus();
    else if (next.email) emailInputRef.current?.focus();
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitGuard.current || isSubmitting) return;
    if (!validate()) return;

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (!formId) {
      setErrors({ projectDetails: 'Form is not configured. Please set NEXT_PUBLIC_FORMSPREE_FORM_ID.' });
      return;
    }

    submitGuard.current = true;
    setIsSubmitting(true);
    setErrors({});

    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      current_website_url: data.currentWebsiteUrl,
      project_type: data.projectType,
      project_goal: data.projectGoal,
      has_current_website: data.hasCurrentWebsite,
      current_website_platform: data.currentWebsitePlatform,
      project_scope: data.projectScope,
      budget_range: data.budgetRange,
      timeline: data.timeline,
      project_details: data.projectDetails,
      referral_source: data.referralSource,
    };

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      setErrors({ projectDetails: 'Something went wrong. Please try again or email us directly.' });
      submitGuard.current = false;
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl space-y-6 rounded-2xl border border-nature-200 bg-nature-50/50 p-6 sm:p-8 text-center">
        <Heading level={2} className="text-primary-800">
          Thanks for reaching out.
        </Heading>
        <BodyText size="lg" color="secondary">
          We’ll review your project details and get back to you within 24 hours.
        </BodyText>
        <div className="pt-4">
          <Button
            href={DISCOVERY_CALL_URL}
            variant="primary"
            size="md"
            icon={<ArrowRight className="h-5 w-5" />}
          >
            Schedule a Discovery Call
          </Button>
        </div>
      </div>
    );
  }

  const budgetOptions = [
    ...serviceTiers.map((t) => `${t.priceRange} (${t.name})`),
    'Not sure yet',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-4 pt-8 md:pt-10">
      {/* 1. Contact Information */}
      <FormSection title="Contact Information">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="inquiry-name" required>Name</Label>
            <input
              ref={nameInputRef}
              id="inquiry-name"
              type="text"
              name="name"
              value={data.name}
              onChange={update('name')}
              className={`${inputBase} ${errors.name ? 'border-primary-500 ring-2 ring-primary-500/20' : ''}`}
              placeholder="Your name"
              required
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'inquiry-name-error' : undefined}
            />
            {errors.name && (
              <p id="inquiry-name-error" className="mt-1.5 text-body-sm text-primary-600" role="alert">
                {errors.name}
              </p>
            )}
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
              className={`${inputBase} ${errors.email ? 'border-primary-500 ring-2 ring-primary-500/20' : ''}`}
              placeholder="you@example.com"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'inquiry-email-error' : undefined}
            />
            {errors.email && (
              <p id="inquiry-email-error" className="mt-1.5 text-body-sm text-primary-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="inquiry-company">Company / Organization</Label>
            <input
              id="inquiry-company"
              type="text"
              name="company"
              value={data.company}
              onChange={update('company')}
              className={inputBase}
              placeholder="Company / Organization"
            />
          </div>
          <div>
            <Label htmlFor="inquiry-phone">Phone (optional)</Label>
            <input
              id="inquiry-phone"
              type="tel"
              name="phone"
              value={data.phone}
              onChange={update('phone')}
              className={inputBase}
              placeholder="Phone (optional)"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="inquiry-current-website-url">Current website URL (optional)</Label>
            <input
              id="inquiry-current-website-url"
              type="url"
              name="currentWebsiteUrl"
              value={data.currentWebsiteUrl}
              onChange={update('currentWebsiteUrl')}
              className={inputBase}
              placeholder="Current website URL (optional)"
            />
          </div>
        </div>
      </FormSection>

      {/* 2. Project Type */}
      <FormSection title="Project Type">
        <p className="text-body font-body text-text-secondary mb-3">
          What are you looking to build or improve?
        </p>
        <div className="space-y-2">
          {PROJECT_TYPES.map((value) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="projectType"
                value={value}
                checked={data.projectType === value}
                onChange={update('projectType')}
                className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* 3. Project Goals */}
      <FormSection title="Project Goals">
        <p className="text-body font-body text-text-secondary mb-3">
          What is the primary goal of this project?
        </p>
        <div className="space-y-2">
          {PROJECT_GOALS.map((value) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="projectGoal"
                value={value}
                checked={data.projectGoal === value}
                onChange={update('projectGoal')}
                className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* 4. Current Website */}
      <FormSection title="Current Website">
        <p className="text-body font-body text-text-secondary mb-3">
          Do you currently have a website?
        </p>
        <div className="space-y-2">
          {HAS_WEBSITE_OPTIONS.map((value) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="hasCurrentWebsite"
                value={value}
                checked={data.hasCurrentWebsite === value}
                onChange={update('hasCurrentWebsite')}
                className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
            </label>
          ))}
        </div>
        {data.hasCurrentWebsite === 'Yes' && (
          <div className="mt-6 pl-0">
            <p className="text-body font-body text-text-secondary mb-3">
              If yes, what platform is it built on?
            </p>
            <div className="space-y-2">
              {WEBSITE_PLATFORMS.map((value) => (
                <label key={value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="currentWebsitePlatform"
                    value={value}
                    checked={data.currentWebsitePlatform === value}
                    onChange={update('currentWebsitePlatform')}
                    className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </FormSection>

      {/* 5. Project Scope */}
      <FormSection title="Project Scope">
        <p className="text-body font-body text-text-secondary mb-3">
          What best describes your project?
        </p>
        <div className="space-y-2">
          {PROJECT_SCOPE_OPTIONS.map((value) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="projectScope"
                value={value}
                checked={data.projectScope === value}
                onChange={update('projectScope')}
                className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* 6. Budget Range */}
      <FormSection title="Budget Range">
        <p className="text-body font-body text-text-secondary mb-3">
          What investment range best fits your project?
        </p>
        <div className="space-y-2">
          {budgetOptions.map((value) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="budgetRange"
                value={value}
                checked={data.budgetRange === value}
                onChange={update('budgetRange')}
                className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* 7. Timeline */}
      <FormSection title="Timeline">
        <p className="text-body font-body text-text-secondary mb-3">
          When are you hoping to launch?
        </p>
        <div className="space-y-2">
          {TIMELINE_OPTIONS.map((value) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="timeline"
                value={value}
                checked={data.timeline === value}
                onChange={update('timeline')}
                className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* 8. Project Details */}
      <FormSection title="Project Details">
        <Label htmlFor="inquiry-project-details">Tell us a little about your business and what you&apos;re hoping this project will accomplish.</Label>
        <textarea
          id="inquiry-project-details"
          name="projectDetails"
          value={data.projectDetails}
          onChange={update('projectDetails')}
          rows={5}
          className={`${inputBase} min-h-[120px] resize-y ${errors.projectDetails ? 'border-primary-500 ring-2 ring-primary-500/20' : ''}`}
          placeholder="Tell us a little about your business and what you're hoping this project will accomplish."
          aria-invalid={!!errors.projectDetails}
          aria-describedby={errors.projectDetails ? 'inquiry-project-details-error' : undefined}
        />
        {errors.projectDetails && (
          <p id="inquiry-project-details-error" className="mt-1.5 text-body-sm text-primary-600" role="alert">
            {errors.projectDetails}
          </p>
        )}
      </FormSection>

      {/* 9. Referral Source */}
      <FormSection title="Referral Source">
        <p className="text-body font-body text-text-secondary mb-3">
          How did you hear about Sproutflow?
        </p>
        <div className="space-y-2">
          {REFERRAL_SOURCES.map((value) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="referralSource"
                value={value}
                checked={data.referralSource === value}
                onChange={update('referralSource')}
                className="h-4 w-4 border-nature-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-body font-body text-text-primary group-hover:text-text-secondary">{value}</span>
            </label>
          ))}
        </div>
      </FormSection>

      <div className="pt-6 pb-16 md:pb-20">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto min-h-[48px] [touch-action:manipulation]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending…' : 'Submit inquiry'}
        </Button>
        {isSubmitting && (
          <p className="mt-2 text-body-sm text-text-muted">Please don’t close this page.</p>
        )}
      </div>
    </form>
  );
}
