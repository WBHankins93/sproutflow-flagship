// data/servicePaths.ts - The three "what I build" category pages
// (/services/websites, /services/business-systems, /services/growth-support).
//
// Ids and exported names are stable: the sitemap, the footer and the inquiry
// prefill (`/inquiry?path=`) read them. Prices never live here. Each path names
// its catalog category, and the page reads that category's offers (and, where
// `customQuote` is true, the custom quote) from data/catalog.ts.
// Copy rules: Ben's "I" voice, no em dashes, no results that are not in data.

import type { CatalogCategoryId } from './catalog';

export type ServicePathId = 'websites' | 'business-systems' | 'growth-support';

export interface ServicePath {
  id: ServicePathId;
  /** The data/catalog.ts category whose offers close the page. */
  category: CatalogCategoryId;
  /** Show the "Bring me the problem." custom quote after the fixed offers. */
  customQuote: boolean;
  /** Category name, as in data/catalog.ts and the footer. */
  eyebrow: string;
  title: string;
  /** One word of `title` set in Instrument Serif italic on the page h1. */
  titleAccent: string;
  outcome: string;
  description: string;
  goodFit: string;
  /** Three short fit statements, split out of goodFit for the detail page. */
  fitStatements: [string, string, string];
  capabilities: string[];
  ctaLabel: string;
  /** Heading and one line over this category's offers (prices come from data/catalog.ts). */
  offersHeading: string;
  offersSub: string;
  metaTitle: string;
  metaDescription: string;
  relatedCaseStudy: string;
  checkpoints: string[];
  faq: { question: string; answer?: string }[];
}

export const servicePaths: ServicePath[] = [
  {
    id: 'websites',
    category: 'websites',
    customQuote: true,
    eyebrow: 'Websites',
    title: 'Websites that earn trust',
    titleAccent: 'trust',
    outcome: 'A site that tells customers what you do and makes it easy to call.',
    description:
      'I build fast, mobile-first sites on your own domain, from a one-page starter to a multi-page site with booking or a store.',
    goodFit:
      'You have no website, a site that looks fine but does not get calls, or a business that has outgrown the site you started with.',
    fitStatements: [
      'You have no website, or one you avoid sending people to.',
      'Your site looks fine, but the phone stays quiet.',
      'Your business has outgrown the site you started with.',
    ],
    capabilities: [
      'Starter landing pages, built from my templates',
      'Multi-page sites, booking and galleries',
      'Rebuilds and Shopify',
      'Tap-to-call, quote forms and basic search setup',
      'Pages you can update yourself',
    ],
    ctaLabel: 'Ask about a website',
    offersHeading: 'Start with one page, or bring me the problem.',
    offersSub:
      'The starter landing page has a fixed price. Anything bigger starts with a 15-minute call and written options.',
    metaTitle: 'Web Design in New Orleans',
    metaDescription:
      'Small business websites, from a one-page starter to multi-page sites, booking and online stores. Based in New Orleans, working with businesses anywhere. You own the domain, code and accounts.',
    relatedCaseStudy: 'second-line-psychiatry',
    checkpoints: [
      'A 15-minute call, then written options',
      'Your content in a starter template or a custom layout',
      'Working pages, reviewed each week',
      'Launch, 30 days of fixes, and the keys',
    ],
    faq: [
      {
        question: 'Starter landing page or a custom site?',
        answer:
          'If one page can tell customers what you do and get them to call, the starter landing page is the fast, fixed-price option. If you need several pages, booking, a catalog or a store, it is a custom quote. I will recommend the simpler option when it can do the job.',
      },
      {
        question: 'Can you rebuild an existing site or Shopify store?',
        answer:
          'Yes. Rebuilds and Shopify storefronts are both regular work. I start from what is bringing in customers today and what is not, so the rebuild keeps what already works instead of starting from zero.',
      },
      {
        question: 'What will I be able to update myself?',
        answer:
          'On a multi-page site, pages, images and posts, through an editor set up around how you actually work. I document it before launch and walk you through it. Anything structural you can send to me instead of fighting a page builder.',
      },
    ],
  },
  {
    id: 'business-systems',
    category: 'systems',
    customQuote: true,
    eyebrow: 'Lead & Business Systems',
    title: 'Lead capture and follow-up',
    titleAccent: 'follow-up',
    outcome: 'Turn scattered inquiries into a clear path from first contact to booked work.',
    description:
      'I start with a Lead Flow Audit to find where good inquiries get lost, then build the smallest system that fixes it.',
    goodFit:
      'Leads slip through, repeat admin work is slowing you down, or your current tools do not match how the business actually operates.',
    fitStatements: [
      'Leads slip through before anyone follows up.',
      'Repeat admin work is slowing you down.',
      'Your tools do not match how the business actually operates.',
    ],
    capabilities: [
      'Capture: forms, calls, email, referrals, and job details',
      'Coordinate: clean, qualify, assign, and track every lead',
      'Follow through: acknowledgments, reminders, estimates, and booking',
      'Measure: lead sources, response time, conversion, and lost opportunities',
    ],
    ctaLabel: 'Ask about a lead system',
    offersHeading: 'Start with the audit.',
    offersSub:
      'The audit finds where inquiries get lost and ends with a fixed build quote. The build itself is quoted to fit your business.',
    metaTitle: 'CRM & Business Automation',
    metaDescription:
      'Lead Flow Audits, lead capture and follow-up systems, and custom business software for small businesses. Stop losing leads in the handoff between tools.',
    relatedCaseStudy: 'nola-pool-solutions',
    checkpoints: [
      'Audit: map the work as it happens now',
      'Choose the smallest useful system',
      'Test the workflow with real scenarios',
      'Handoff, training, and 30 days of fixes',
    ],
    faq: [
      {
        question: 'Do I need to replace the tools I already use?',
        answer:
          'Usually not. Most of the work is connecting what you already pay for so information stops being retyped. I only suggest replacing a tool when keeping it costs more than moving off it.',
      },
      {
        question: 'Do I have to start with the audit?',
        answer:
          'For a lead system, yes. The audit shows where inquiries get lost before anything is built, and it ends with a plan and a fixed build quote. Its fee is credited toward the build if you go ahead.',
      },
      {
        question: 'How do access, backups, and ownership work?',
        answer:
          'Everything ends up in your name. Access uses per-client credentials, managed providers handle backups, and when backups matter to daily operations the project includes a written recovery plan. The data and ownership page covers this in full.',
      },
    ],
  },
  {
    id: 'growth-support',
    category: 'care',
    customQuote: false,
    eyebrow: 'Care',
    title: 'Care that keeps your site working',
    titleAccent: 'working',
    outcome: 'Catch the quiet breaks before a customer does.',
    description:
      'I watch your forms, domain and email, keep things updated, and fix what breaks, so the site keeps bringing in work.',
    goodFit:
      'Your site is live and bringing in work, and you would rather not find out from a customer that the form stopped sending.',
    fitStatements: [
      'Your site is live and you rely on it for calls.',
      'You would rather not watch renewals, updates and forms yourself.',
      'You want to keep ownership of your site and accounts.',
    ],
    capabilities: [
      'Watching your forms, domain and email',
      'Updates, and fixes when something breaks',
      'Care for sites I did not build, after a review',
      'System Care for larger systems, as a custom quote',
    ],
    ctaLabel: 'Ask about care',
    offersHeading: 'A fixed monthly price, sized to your site.',
    offersSub: 'Site Care is optional after launch, and you keep ownership of everything either way.',
    metaTitle: 'Website Care & Maintenance',
    metaDescription:
      'Site Care for small business websites: I watch your forms, domain and email, keep things updated and fix what breaks. You keep ownership of everything.',
    relatedCaseStudy: 'nealy-events',
    checkpoints: [
      'Review the site and what it depends on',
      'Agree in writing what I watch',
      'Checks, updates and fixes, as agreed',
      'Every account stays in your name',
    ],
    faq: [
      {
        question: 'Can you look after a site you did not build?',
        answer:
          'Often yes. It depends on how it was built and what it runs on. I review the current setup first and tell you honestly whether looking after it makes sense or whether the money is better spent elsewhere.',
      },
      {
        question: 'What does Site Care cover?',
        answer:
          'I watch your forms, domain and email, keep things updated, and fix what breaks. Before care starts, I write down what I watch, who gets the alerts and how quickly I respond.',
      },
      {
        question: 'Do I have to keep you on after launch?',
        answer:
          'No. Care is optional. You keep ownership of the domain, site and connected accounts whether or not you keep me on.',
      },
    ],
  },
];

export function getServicePath(id: string): ServicePath | undefined {
  return servicePaths.find((path) => path.id === id);
}
