// data/catalog.ts - The v3 offer menu: Websites, Lead & Business Systems, Care.
//
// The only place prices live. The homepage menu, the care section, structured
// data (components/StructuredData.tsx) and public/llms.txt all read from or
// mirror this file, so change prices here first and then update llms.txt.
//
// Website prices are PENDING Ben's confirmation (DIRECTION.md §8, 19 Oct 2026)
// and are flagged `pending: true`. The top website tier is quoted after a call
// and carries no price at all.

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
  /** Whole US dollars. */
  amount: number;
  /** 'fixed' is the exact price; 'from' is a starting price. */
  basis: 'fixed' | 'from';
  /** Billing period for recurring prices. Omit for a one-time price. */
  per?: 'month';
  /** Who this price applies to, when an offer has more than one price. */
  appliesTo?: string;
}

export interface CatalogOffer {
  /** Also the homepage anchor (`/#website-rescue`). */
  id: string;
  category: CatalogCategoryId;
  name: string;
  /** What it is and who it is for, in one or two short sentences (structured data). */
  summary: string;
  /** One short line shown on every screen size, under the name and price. */
  line: string;
  /** Short facts for the "What's included" list (price notes and per-plan prices are added after). */
  includes: string[];
  /** Empty when the offer is quoted after a call. */
  prices: CatalogPrice[];
  /** Shown instead of a price when `prices` is empty. */
  priceLabel?: string;
  /** One line under the price, e.g. "Credited toward a build." */
  priceNote?: string;
  /** True while Ben has not confirmed the price. */
  pending: boolean;
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

export const catalog: CatalogOffer[] = [
  // Websites. Prices pending Ben.
  {
    id: 'website-rescue',
    category: 'websites',
    name: 'Website Rescue',
    summary: 'For a dead, missing or broken site. Up to 5 pages on the domain you already own.',
    line: 'For a dead, missing or broken site.',
    includes: ['Up to 5 pages on the domain you own'],
    prices: [{ amount: 1500, basis: 'fixed' }],
    priceNote: 'Live 10 business days after your content arrives.',
    pending: true,
  },
  {
    id: 'business-website',
    category: 'websites',
    name: 'Business Website',
    summary: '5 to 8 pages that explain what you do and make the next step obvious.',
    line: 'The right size for most businesses.',
    includes: ['5 to 8 pages', 'Fixed quote after a 15-minute call'],
    prices: [{ amount: 3000, basis: 'from' }],
    pending: true,
  },
  {
    id: 'growth-website',
    category: 'websites',
    name: 'Growth Website',
    summary: 'Up to 15 pages, with online booking and galleries.',
    line: 'Room to grow, with booking and galleries.',
    includes: ['Up to 15 pages', 'Online booking and galleries'],
    prices: [{ amount: 5000, basis: 'from' }],
    pending: true,
  },
  {
    id: 'catalog-custom-build',
    category: 'websites',
    name: 'Catalog & Custom Build',
    summary: '30-page catalogs, online stores, portals and custom features.',
    line: 'Catalogs, stores, portals and custom features.',
    includes: ['30-page catalogs and online stores', 'Portals and custom features'],
    prices: [],
    priceLabel: 'Quoted after a call',
    priceNote: 'Most land between $6,000 and $12,000, payable in three parts.',
    pending: true,
  },

  // Lead & Business Systems.
  {
    id: 'lead-flow-audit',
    category: 'systems',
    name: 'Lead Flow Audit',
    summary: 'I find where good inquiries get lost, then hand you a plan and a fixed build quote.',
    line: 'Find where good inquiries get lost.',
    includes: ['A plan and a fixed build quote'],
    prices: [{ amount: 500, basis: 'fixed' }],
    priceNote: 'Credited toward a build.',
    pending: false,
  },
  {
    id: 'lead-capture-follow-up',
    category: 'systems',
    name: 'Lead Capture & Follow-Up',
    summary: 'Every inquiry captured, answered and followed up, from the channels you already use.',
    line: 'Every inquiry answered and followed up.',
    includes: ['Works with the channels you already use'],
    prices: [{ amount: 3500, basis: 'from' }],
    priceNote: 'Fixed scope and 30 days of launch support.',
    pending: false,
  },
  {
    id: 'custom-business-software',
    category: 'systems',
    name: 'Custom Business Software',
    summary: 'Admin tools, customer records and dashboards built around how your business runs.',
    line: 'Tools built around how your business runs.',
    includes: ['Admin tools and dashboards', 'Customer records'],
    prices: [{ amount: 10000, basis: 'from' }],
    pending: false,
  },

  // Care.
  {
    id: 'site-care',
    category: 'care',
    name: 'Site Care',
    summary: 'Updates, checks and fixes for a live website, so it keeps working.',
    line: 'Updates, checks and fixes for a live site.',
    includes: [],
    prices: [
      { amount: 99, basis: 'fixed', per: 'month', appliesTo: 'Rescue and Business sites' },
      { amount: 150, basis: 'fixed', per: 'month', appliesTo: 'larger sites' },
    ],
    pending: false,
  },
  {
    id: 'system-care',
    category: 'care',
    name: 'System Care',
    summary: 'I watch the integrations, fix what breaks and review how leads are flowing.',
    line: 'I keep your lead system working.',
    includes: ['Integrations watched, breaks fixed', 'Lead flow reviewed'],
    prices: [{ amount: 450, basis: 'from', per: 'month' }],
    pending: false,
  },
];

const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

/** "$1,500", "$99/mo". The "from" is rendered separately so it can sit in body type. */
export function formatAmount(price: CatalogPrice): string {
  return `${USD.format(price.amount)}${price.per === 'month' ? '/mo' : ''}`;
}

/** Plain-text price for one price: "$1,500", "from $3,000", "$99/mo". */
export function formatPrice(price: CatalogPrice): string {
  return `${price.basis === 'from' ? 'from ' : ''}${formatAmount(price)}`;
}

/** Plain-text price line for an offer: every price, or its quoted label. */
export function formatOfferPrice(offer: CatalogOffer): string {
  if (offer.prices.length === 0) return offer.priceLabel ?? 'Quoted after a call';
  return offer.prices
    .map((price) => (price.appliesTo ? `${formatPrice(price)} (${price.appliesTo})` : formatPrice(price)))
    .join(' or ');
}

export function getCategory(id: CatalogCategoryId): CatalogCategory {
  const category = catalogCategories.find((entry) => entry.id === id);
  if (!category) throw new Error(`Unknown catalog category: ${id}`);
  return category;
}

export function getOffersByCategory(id: CatalogCategoryId): CatalogOffer[] {
  return catalog.filter((offer) => offer.category === id);
}

/**
 * The "What's included" list for an offer: its includes, then one line per
 * price when it has several ("$99/mo for Rescue and Business sites"), then its
 * price note. Built from the catalog, so prices still live only here.
 */
export function getIncludedItems(offer: CatalogOffer): string[] {
  const perPrice =
    offer.prices.length > 1
      ? offer.prices.map((price) => `${formatPrice(price)}${price.appliesTo ? ` for ${price.appliesTo}` : ''}`)
      : [];
  return [...offer.includes, ...perPrice, ...(offer.priceNote ? [offer.priceNote] : [])];
}

export function getOffer(id: string): CatalogOffer | undefined {
  return catalog.find((offer) => offer.id === id);
}
