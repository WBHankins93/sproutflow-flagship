// types/inquiry.ts - Inquiry form data shape for Formspree and future Admin integration

export const PROJECT_TYPES = [
  'New website',
  'Website redesign',
  'Improve an existing site',
  'E-commerce website',
  'Landing pages',
  'Not sure yet',
] as const;

export const PROJECT_GOALS = [
  'Generate more leads',
  'Launch a new business',
  'Improve credibility',
  'Increase conversions',
  'Replace an outdated website',
] as const;

export const HAS_WEBSITE_OPTIONS = ['Yes', 'No', 'Under development'] as const;

export const WEBSITE_PLATFORMS = [
  'WordPress',
  'Wix / Squarespace',
  'Webflow',
  'Custom',
  'Not sure',
] as const;

export const PROJECT_SCOPE_OPTIONS = [
  'Small informational website',
  'Business website with multiple sections',
  'Website with content management',
  'Website with advanced features',
  'Not sure yet',
] as const;

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  '1–2 months',
  '3–6 months',
  'Just exploring options',
] as const;

export const REFERRAL_SOURCES = [
  'Referral',
  'Google search',
  'LinkedIn',
  'Social media',
  'Previous client',
  'Event or conference',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type ProjectGoal = (typeof PROJECT_GOALS)[number];
export type HasWebsite = (typeof HAS_WEBSITE_OPTIONS)[number];
export type WebsitePlatform = (typeof WEBSITE_PLATFORMS)[number];
export type ProjectScope = (typeof PROJECT_SCOPE_OPTIONS)[number];
export type Timeline = (typeof TIMELINE_OPTIONS)[number];
export type ReferralSource = (typeof REFERRAL_SOURCES)[number];

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  currentWebsiteUrl: string;
  projectType: string;
  projectGoal: string;
  hasCurrentWebsite: string;
  currentWebsitePlatform: string;
  projectScope: string;
  budgetRange: string;
  timeline: string;
  projectDetails: string;
  referralSource: string;
}
