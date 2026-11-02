// types/inquiry.ts - Inquiry form data shape for Formspree and future Admin integration

import {
  LEGACY_OFFER_KEYS,
  OFFER_KEYS,
  customQuote,
  fixedOffers,
  toOfferKey,
  type CatalogServicePath,
  type OfferKey,
} from '@/data/catalog';

/**
 * "Which path feels closest?" on the inquiry form: the four ways in from
 * data/catalog.ts (starter, audit, care, custom), then "Not sure yet". The
 * three fixed-offer labels are the catalog offer names.
 */
export const PROJECT_TYPES = [
  'Starter landing page',
  'Lead Flow Audit',
  'Site Care',
  'A custom project',
  'Not sure yet',
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

/** The project type for each catalog offer key (`/inquiry?offer=`). */
export const PROJECT_TYPE_BY_OFFER: Readonly<Record<OfferKey, ProjectType>> = {
  starter: 'Starter landing page',
  audit: 'Lead Flow Audit',
  care: 'Site Care',
  custom: 'A custom project',
};

/**
 * The project type for each service page (`/inquiry?path=`). Websites covers
 * both the starter page and custom sites, so it leaves the choice to the visitor.
 */
export const PROJECT_TYPE_BY_PATH: Readonly<Record<CatalogServicePath, ProjectType | ''>> = {
  websites: '',
  'business-systems': 'Lead Flow Audit',
  'growth-support': 'Site Care',
};

/** Labels used before the 29 Oct offer restructure, mapped to today's options (saved drafts, old links). */
export const LEGACY_PROJECT_TYPES: Readonly<Record<string, ProjectType | ''>> = {
  'Websites that earn trust': '',
  'Lead capture and follow-up': 'Lead Flow Audit',
  'Ongoing growth and support': 'Site Care',
};

/**
 * Reads any project hint into a form option: a current label, an old label, a
 * service path id, or a known offer value (new key, anchor id or old tier id,
 * via data/catalog.ts toOfferKey). Anything else is an empty string, so free
 * text never turns into a custom quote here.
 */
const has = (record: object, key: string) => Object.prototype.hasOwnProperty.call(record, key);

export function toProjectType(value: string | string[] | undefined | null): ProjectType | '' {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string' || !raw.trim()) return '';
  const text = raw.trim();
  if ((PROJECT_TYPES as readonly string[]).includes(text)) return text as ProjectType;
  if (has(LEGACY_PROJECT_TYPES, text)) return LEGACY_PROJECT_TYPES[text];
  if (has(PROJECT_TYPE_BY_PATH, text)) return PROJECT_TYPE_BY_PATH[text as CatalogServicePath];
  const id = text.toLowerCase();
  const known =
    (OFFER_KEYS as readonly string[]).includes(id) ||
    id === customQuote.id ||
    fixedOffers.some((offer) => offer.id === id) ||
    has(LEGACY_OFFER_KEYS, id);
  const offer = known ? toOfferKey(id) : undefined;
  return offer ? PROJECT_TYPE_BY_OFFER[offer] : '';
}

export const PROJECT_GOALS = [
  'Generate more leads',
  'Launch a new business',
  'Improve credibility',
  'Increase conversions',
  'Save time with automation or internal tools',
  'Replace an outdated website',
] as const;

export const HAS_WEBSITE_OPTIONS = ['Yes', 'No', 'Under development'] as const;

export const WEBSITE_PLATFORMS = ['WordPress', 'Wix / Squarespace', 'Webflow', 'Custom', 'Not sure'] as const;

export const PROJECT_SCOPE_OPTIONS = [
  'Small informational website',
  'Business website with multiple sections',
  'Website with content management',
  'Website with advanced features',
  'Not sure yet',
] as const;

export const TIMELINE_OPTIONS = ['As soon as possible', '1-2 months', '3-6 months', 'Just exploring options'] as const;

export const DECISION_MAKER_OPTIONS = [
  'Yes, I make the final decision',
  'I decide together with a partner',
  "I'm researching for someone else",
] as const;

export const REFERRAL_SOURCES = [
  'Referral',
  'Google search',
  'LinkedIn',
  'Social media',
  'Previous client',
  'Event or conference',
] as const;

export type ProjectGoal = (typeof PROJECT_GOALS)[number];
export type HasWebsite = (typeof HAS_WEBSITE_OPTIONS)[number];
export type WebsitePlatform = (typeof WEBSITE_PLATFORMS)[number];
export type ProjectScope = (typeof PROJECT_SCOPE_OPTIONS)[number];
export type Timeline = (typeof TIMELINE_OPTIONS)[number];
export type DecisionMaker = (typeof DECISION_MAKER_OPTIONS)[number];
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
  decisionMaker: string;
  projectDetails: string;
  referralSource: string;
}
