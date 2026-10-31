// data/catalog.ts - The v3 offer menu: three fixed-price offers and one
// custom-quote path (DIRECTION.md §8, 29 Oct 2026).
//
// The only place prices live. The homepage menu, the care section, the
// website check, the inquiry page, structured data (components/StructuredData.tsx)
// and public/llms.txt all read from or mirror this file, so change prices here
// first and then update llms.txt.
//
// Fixed price (book and start): Starter landing page, Lead Flow Audit, Site
// Care. Everything else is a custom quote: "Bring me the problem.", one range
// line and a call. The custom quote has no price of its own.

/** The four ways in, in menu order. Also the `/inquiry?offer=` values. */
export type OfferKey = 'starter' | 'audit' | 'care' | 'custom';
export type FixedOfferKey = Exclude<OfferKey, 'custom'>;

export const OFFER_KEYS: readonly OfferKey[] = ['starter', 'audit', 'care', 'custom'];

export type CatalogCategoryId = 'websites' | 'systems' | 'care';

/** Service page each category maps to; also the /inquiry `path` prefill when booking is off. */
export type CatalogServicePath = 'websites' | 'business-systems' | 'growth-support';

export interface CatalogCategory {
  id: CatalogCategoryId;
  name: string;
  /** One line under the category name. */
  blurb: string;
  servicePath: CatalogServicePath;
}

export interface CatalogPrice {
  /** Whole US dollars. Every published price is fixed. */
  amount: number;
  /** Billing period for recurring prices. Omit for a one-time price. */
  per?: 'month';
  /** Who this price applies to, when an offer has more than one price. */
  appliesTo?: string;
}

export interface CatalogOffer {
  key: FixedOfferKey;
  /** Homepage anchor (`/#starter-landing-page`). Never a homepage section id. */
  id: string;
  category: CatalogCategoryId;
  name: string;
  /** What it is and who it is for, in one or two short sentences (structured data). */
  summary: string;
  /** One short line shown on every screen size, under the name and price. */
  line: string;
  /** Short facts for the "What's included" list (per-plan prices and the price note are added after). */
  includes: string[];
  prices: CatalogPrice[];
  /** One line under the price, e.g. "Credited toward any build." */
  priceNote?: string;
}

export interface CustomQuoteStep {
  title: string;
  body: string;
}

export interface CustomQuote {
  key: 'custom';
  /** Homepage anchor (`/#custom-quote`). */
  id: string;
  /** Short name, used in structured data, llms.txt and the check summary. */
  name: string;
  heading: string;
  /** What it covers and how it is priced, in plain sentences (structured data, llms.txt). */
  summary: string;
  /** One short paragraph under the heading. */
  intro: string;
  /** What a custom quote covers. No prices. */
  examples: string[];
  /** The one range line, verbatim. The only place these two figures appear. */
  range: string;
  steps: CustomQuoteStep[];
  primaryCta: string;
  secondaryCta: { label: string; href: string };
}

export const catalogCategories: CatalogCategory[] = [
  {
    id: 'websites',
    name: 'Websites',
    blurb: 'New sites and rebuilds, sized to the job.',
    servicePath: 'websites',
  },
  {
    id: 'systems',
    name: 'Lead & Business Systems',
    blurb: 'What happens after someone reaches out.',
    servicePath: 'business-systems',
  },
  {
    id: 'care',
    name: 'Care',
    blurb: 'I keep it working after launch.',
    servicePath: 'growth-support',
  },
];

/** The three fixed-price offers, in menu order. */
export const fixedOffers: CatalogOffer[] = [
  {
    key: 'starter',
    id: 'starter-landing-page',
    category: 'websites',
    name: 'Starter landing page',
    summary:
      'One page on your own domain with up to 6 sections (what you do, services, photos, reviews, about, contact), tap-to-call and a quote form that reaches your phone and email. Built from my starter templates and live within 5 business days after your content arrives.',
    line: 'One page that gets you found and called.',
    includes: [
      'One page on your domain, up to 6 sections',
      'Tap-to-call and a quote form to your phone and email',
      'Mobile-ready, basic search setup, Google Business Profile link',
      'One round of changes',
    ],
    prices: [{ amount: 500 }],
    priceNote: 'Live within 5 business days after content arrives.',
  },
  {
    key: 'audit',
    id: 'lead-flow-audit',
    category: 'systems',
    name: 'Lead Flow Audit',
    summary: 'I find where good inquiries get lost, then hand you a plan and a fixed build quote.',
    line: 'Find where good inquiries get lost.',
    includes: [
      'The path from first inquiry to booked work, mapped',
      'The tools and handoffs you use now, reviewed',
      'A prioritized plan and a fixed build quote',
    ],
    prices: [{ amount: 500 }],
    priceNote: 'Credited toward any build.',
  },
  {
    key: 'care',
    id: 'site-care',
    category: 'care',
    name: 'Site Care',
    summary: 'Updates, checks and fixes for a live website, so it keeps working.',
    line: 'Updates, checks and fixes for a live site.',
    includes: ['I watch your forms, domain and email', 'Updates, and fixes when something breaks'],
    prices: [
      { amount: 99, per: 'month', appliesTo: 'starter and small sites' },
      { amount: 150, per: 'month', appliesTo: 'larger sites' },
    ],
  },
];

/** Everything else: one range line, three steps and a call. No price of its own. */
export const customQuote: CustomQuote = {
  key: 'custom',
  id: 'custom-quote',
  name: 'Custom quote',
  heading: 'Bring me the problem.',
  summary:
    'Everything without a fixed price: multi-page sites, booking, catalogs and online stores, galleries, lead capture and follow-up systems, custom business software and System Care. Quoted after a 15-minute call, with written options at fixed prices within 2 business days, paid in parts.',
  intro: 'Everything else is built around your business. Tell me what is getting in the way and I’ll lay out options.',
  examples: [
    'Multi-page sites',
    'Booking',
    'Catalogs and online stores',
    'Galleries',
    'Lead capture and follow-up systems',
    'Custom business software',
    'System Care',
  ],
  range: 'Most projects land between $1,500 and $6,000, paid in parts.',
  steps: [
    { title: '15-minute call', body: 'You tell me the problem. I ask a few questions.' },
    { title: 'Written options', body: 'Fixed prices for each, within 2 business days.' },
    { title: 'Pick one', body: 'You pay in parts, not all up front.' },
  ],
  primaryCta: 'Book a 15-minute call',
  secondaryCta: { label: 'Describe your problem', href: '/inquiry?offer=custom' },
};

/** Backward-compatible name for the fixed offers (the only offers with prices). */
export const catalog = fixedOffers;

const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** "$500", "$99/mo". */
export function formatAmount(price: CatalogPrice): string {
  return `${USD.format(price.amount)}${price.per === 'month' ? '/mo' : ''}`;
}

/** Plain-text price for one price. Same as formatAmount now that every price is fixed. */
export function formatPrice(price: CatalogPrice): string {
  return formatAmount(price);
}

/** Plain-text price line for an offer: "$500", or "$99/mo (starter and small sites) or $150/mo (larger sites)". */
export function formatOfferPrice(offer: CatalogOffer): string {
  return offer.prices
    .map((price) => (price.appliesTo ? `${formatPrice(price)} (${price.appliesTo})` : formatPrice(price)))
    .join(' or ');
}

/** Short price for tight spots: "$500", "$99/mo or $150/mo". */
export function formatShortPrice(offer: CatalogOffer): string {
  return offer.prices.map(formatPrice).join(' or ');
}

export function getCategory(id: CatalogCategoryId): CatalogCategory {
  const category = catalogCategories.find((entry) => entry.id === id);
  if (!category) throw new Error(`Unknown catalog category: ${id}`);
  return category;
}

export function getOffersByCategory(id: CatalogCategoryId): CatalogOffer[] {
  return fixedOffers.filter((offer) => offer.category === id);
}

/**
 * The "What's included" list for an offer: its includes, then one line per
 * price when it has several ("$99/mo for starter and small sites"), then its
 * price note. Built from the catalog, so prices still live only here.
 */
export function getIncludedItems(offer: CatalogOffer): string[] {
  const perPrice =
    offer.prices.length > 1
      ? offer.prices.map((price) => `${formatPrice(price)}${price.appliesTo ? ` for ${price.appliesTo}` : ''}`)
      : [];
  return [...offer.includes, ...perPrice, ...(offer.priceNote ? [offer.priceNote] : [])];
}

/** A fixed offer by its key ("starter") or its anchor id ("starter-landing-page"). */
export function getOffer(idOrKey: string): CatalogOffer | undefined {
  return fixedOffers.find((offer) => offer.id === idOrKey || offer.key === idOrKey);
}

/**
 * Offer ids from before the 29 Oct restructure, mapped to the new keys, so old
 * links (`/inquiry?tier=website-rescue`) and old check results keep working.
 */
export const LEGACY_OFFER_KEYS: Readonly<Record<string, OfferKey>> = {
  'website-rescue': 'starter',
  'business-website': 'custom',
  'growth-website': 'custom',
  'catalog-custom-build': 'custom',
  'lead-flow-audit': 'audit',
  'lead-capture-system': 'custom',
  'lead-capture-follow-up': 'custom',
  'custom-business-software': 'custom',
  'site-care': 'care',
  'system-care': 'custom',
};

/**
 * Reads an `offer=` or old `tier=` value: a new key, a homepage anchor id or
 * an old offer id. Anything else that is not empty is a custom quote, so an
 * unknown link still lands somewhere useful. Undefined when nothing was given.
 */
export function toOfferKey(value: string | string[] | undefined | null): OfferKey | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== 'string') return undefined;
  const id = raw.trim().toLowerCase();
  if (!id) return undefined;
  if ((OFFER_KEYS as readonly string[]).includes(id)) return id as OfferKey;
  if (id === customQuote.id) return 'custom';
  const fixed = fixedOffers.find((offer) => offer.id === id);
  if (fixed) return fixed.key;
  return LEGACY_OFFER_KEYS[id] ?? 'custom';
}
