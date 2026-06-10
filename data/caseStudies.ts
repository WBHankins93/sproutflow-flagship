// data/caseStudies.ts - Case study content for /case-studies pages
//
// Each entry drives one page rendered by components/case-studies/CaseStudyLayout.tsx.
// Search this file for "TODO" before deploying - placeholders are clearly marked
// and must be replaced with real, client-approved numbers and quotes.

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface BeforeAfterPair {
  beforeSrc: string;
  beforeAlt: string;
  beforeCaption: string;
  afterSrc: string;
  afterAlt: string;
  afterCaption: string;
}

export interface CaseStudy {
  slug: string;
  clientName: string;
  /** One-line outcome. The headline is the result, not the project. */
  headline: string;
  /** Answer-first paragraph. Must fully summarize the engagement and result on its own. */
  summary: string;
  heroImage: string;
  heroImageFit?: 'cover' | 'contain';
  heroStats: CaseStudyStat[];
  /** The problem from the client's business perspective. 2-3 sentences. */
  problem: string;
  /** What was built. Brief, outcomes emphasized. */
  built: string[];
  results: CaseStudyStat[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  liveUrl: string;
  beforeAfter?: BeforeAfterPair[];
  details: {
    timeline: string;
    services: string;
    industry: string;
    location: string;
    notable?: string;
  };
  /** Stack is mentioned once per page, here. */
  stack: string[];
  cardImage: string;
  cardImageFit?: 'cover' | 'contain';
  cardBlurb: string;
  cardStats: CaseStudyStat[];
  metaTitle: string;
  metaDescription: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'second-line-psychiatry',
    clientName: 'Second Line Psychiatry',
    headline: '50% more qualified inquiries for a New Orleans telehealth practice',
    summary:
      'Second Line Psychiatry is a telehealth psychiatry practice serving families in New Orleans. We designed and built a trauma-informed, privacy-first website that helps families understand their care options and reach out with confidence. After launch, qualified patient inquiries grew 50%. The practice now spends its first conversations on care, not on explaining the basics.',
    heroImage: 'work/client-logos/second-line-project.png',
    heroStats: [
      { value: '50%', label: 'More qualified inquiries' },
      { value: 'Privacy-first', label: 'Design built for sensitive care decisions' },
      { value: 'New Orleans', label: 'Rooted in local culture' },
    ],
    problem:
      'Families looking for psychiatric care need to trust a practice before they ever pick up the phone. Second Line Psychiatry had the clinical expertise but no web presence that reflected its compassionate, culturally grounded approach. Prospective patients could not tell what made the practice different, and inquiries that did arrive often were not a fit.',
    built: [
      'A custom website designed around the patient journey, from first visit to booked appointment',
      'Trauma-informed copy and structure that answers the questions families actually have',
      'Accessibility work so the site serves everyone, including assistive technology users',
      'A visual identity inspired by New Orleans second line traditions',
    ],
    results: [
      { value: '50%', label: 'Increase in qualified patient inquiries' },
      { value: 'Better fit', label: 'Inquiries arrive pre-qualified and informed' },
      { value: 'Live', label: 'Serving families across the New Orleans area' },
    ],
    testimonial: {
      // TODO: Replace with a real, approved client quote from Second Line Psychiatry.
      quote: '[PLACEHOLDER - client testimonial pending approval]',
      name: '[PLACEHOLDER - name]',
      role: 'Second Line Psychiatry',
    },
    liveUrl: 'https://www.secondlinepsychiatry.com/',
    details: {
      timeline: '4 weeks',
      services: 'Web Design, Copy Refinement, Accessibility',
      industry: 'Telehealth Psychiatry',
      location: 'New Orleans, LA',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    cardImage: 'work/client-logos/second-line-project.png',
    cardBlurb:
      'A trauma-informed telehealth presence that helps families trust the practice before the first call. Qualified inquiries grew 50% after launch.',
    cardStats: [
      { value: '50%', label: 'More qualified inquiries' },
      { value: '4 wks', label: 'Delivery' },
    ],
    metaTitle: 'Second Line Psychiatry Case Study: 50% More Qualified Inquiries',
    metaDescription:
      'How Second Line Psychiatry, a New Orleans telehealth practice, grew qualified patient inquiries 50% with a trauma-informed, privacy-first website built by Sproutflow Studio.',
  },
  {
    slug: 'nola-pool-solutions',
    clientName: 'NOLA Pool Solutions',
    headline: '30% customer acquisition growth, starting from no website at all',
    summary:
      'NOLA Pool Solutions is a pool maintenance and renovation company serving the New Orleans metro area. The business ran entirely on word of mouth with no website. We built a lead capture site that establishes credibility, pre-qualifies prospects, and books work before a phone call happens. The site went live in three weeks. Customer acquisition grew 30%, the company ranks first in local search for its services, and the calendar now fills further in advance than ever.',
    heroImage: 'work/client-logos/nps-project.png',
    heroStats: [
      { value: '30%', label: 'Customer acquisition growth' },
      { value: '#1', label: 'Local Google ranking' },
      { value: '3 weeks', label: 'From nothing to live' },
    ],
    problem:
      'All business came through word of mouth and a bare Google Business profile. The owner spent hours on discovery calls with people who were never going to buy, while serious prospects had no way to vet the company before calling. Competitors with websites were winning work on credibility alone.',
    built: [
      'A lead capture form system as the primary call to action, not just a phone number',
      'Service packaging that pre-qualifies prospects before they reach out',
      'Trust signals up front: licensing, metro-area expertise, response time',
      'A local SEO foundation targeting New Orleans metro pool service searches',
      'Automated email notifications so no inquiry sits unanswered',
    ],
    results: [
      { value: '30%', label: 'Growth in customer acquisition' },
      { value: '#1', label: 'Google ranking for local pool services' },
      { value: 'Booked', label: 'Calendar filling further in advance than before' },
    ],
    testimonial: {
      quote:
        'Incredible professionalism. Handled the project quickly and kept constant communication throughout. Really pleased with the maintenance and upkeep service after the project was completed. It’s nice to know that I can focus on my business without worrying about this anymore.',
      name: 'Owner',
      role: 'NOLA Pool Solutions',
    },
    liveUrl: 'https://nolapoolsolutions.com/',
    details: {
      timeline: '3 weeks',
      services: 'Web Design, Lead Capture System, Service Packaging, SEO Foundation',
      industry: 'Pool Maintenance & Renovation',
      location: 'New Orleans metro',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Formspree', 'Resend', 'Vercel'],
    cardImage: 'work/client-logos/nps-project.png',
    cardBlurb:
      'From zero web presence to a 30% lift in customer acquisition. A lead funnel that pre-qualifies prospects and ranks first in local search.',
    cardStats: [
      { value: '30%', label: 'Acquisition growth' },
      { value: '3 wks', label: 'Delivery' },
    ],
    metaTitle: 'NOLA Pool Solutions Case Study: 30% Customer Acquisition Growth',
    metaDescription:
      'How NOLA Pool Solutions went from no website to 30% customer acquisition growth and a #1 local Google ranking with a lead capture site built by Sproutflow Studio in New Orleans.',
  },
  {
    slug: 'nealy-events',
    clientName: 'Nealy Event Decor',
    // TODO: Replace headline with the real, approved result metric for Nealy Events.
    headline: 'From new brand to booked consultations for a luxury event studio',
    summary:
      // TODO: Insert the real, approved result metric in this summary before deploy.
      'Nealy Event Decor creates luxury custom fabrications for high-end events in Dallas: bespoke arches, bars, and premium rentals. We designed and built a website with editorial gallery layouts and an inventory system the team updates themselves. The site launched in six weeks and now presents the brand at the level of the work, turning browsers into booked consultations.',
    heroImage: 'nealy-case-study.png',
    heroStats: [
      // TODO: Replace with real, approved metrics. Do not deploy placeholder values.
      { value: '[METRIC]', label: 'TODO: consultation or inquiry result' },
      { value: '6 weeks', label: 'Design to launch' },
      { value: 'In-house', label: 'Inventory managed by the team' },
    ],
    problem:
      'Nealy delivers luxury-grade work, but the old website read like a side project. Prospective clients could not browse the inventory or picture their event, so they moved on to competitors with stronger presentation. The brand perception online did not match the quality of the work, and that gap was costing consultations.',
    built: [
      'Editorial-style gallery layouts modeled on high-end design magazines',
      'A custom inventory categorization system so clients can browse by piece and style',
      'A CMS the Nealy team uses to add and update inventory without a developer',
      'A story-driven brand experience that positions Nealy as a luxury studio',
    ],
    results: [
      // TODO: Replace with real, approved metrics from the client before deploy.
      { value: '[METRIC]', label: 'TODO: inquiry or consultation metric' },
      { value: '[METRIC]', label: 'TODO: project value or booking metric' },
      { value: 'In-house', label: 'Inventory updates handled by the team, no developer needed' },
    ],
    testimonial: {
      // TODO: Confirm this quote is approved and add real attribution, or replace it.
      quote:
        'Working with Sproutflow transformed how potential clients perceive our business. We went from looking like a side hustle to a legitimate luxury brand. The site pays for itself every month.',
      name: '[PLACEHOLDER - name]',
      role: 'Owner, Nealy Event Decor',
    },
    liveUrl: 'https://nealyevents.com/',
    details: {
      timeline: '6 weeks',
      services: 'Web Design, CMS Setup, Conversion Strategy',
      industry: 'Event Planning & Luxury Rentals',
      location: 'Dallas, TX',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Vercel'],
    cardImage: 'work/client-logos/nealy-project.png',
    cardBlurb:
      'A luxury fabrication showcase with editorial galleries and a self-managed inventory system that turns browsers into booked consultations.',
    cardStats: [
      // TODO: Replace with the real, approved metric for Nealy Events.
      { value: '[METRIC]', label: 'TODO: result metric' },
      { value: '6 wks', label: 'Delivery' },
    ],
    metaTitle: 'Nealy Event Decor Case Study: Luxury Brand, Booked Consultations',
    metaDescription:
      'How Nealy Event Decor, a luxury event fabrication studio in Dallas, turned its website into a consultation booking engine with editorial galleries and a self-managed inventory CMS.',
  },
  {
    slug: 'djn-services',
    clientName: 'DJN Services LLC',
    headline: '20 years of reliable work, finally winning bookings online',
    summary:
      'DJN Services LLC is a veteran-owned welding, hauling, and removal company in North Alabama with more than 20 years in business. Its template website buried that track record. We rebuilt the site around the company’s strongest assets: two decades of work, veteran ownership, and fast response. Delivered in two weeks, the new site captures quotes while the owner is in the field and is already driving more bookings.',
    heroImage: 'work/client-logos/djn-new-home-page.png',
    heroImageFit: 'contain',
    heroStats: [
      { value: '20 yrs', label: 'In business before going digital' },
      { value: '2 weeks', label: 'Delivery timeline' },
      { value: 'More', label: 'Bookings through the new site' },
    ],
    problem:
      'DJN had two decades of reputation in its community and a website that looked two months old. The veteran-owned story was buried, services read as walls of text, and there was no way to capture a lead while the owner was on a job. The online presence did not match the size of the operation, and growth beyond referrals had stalled.',
    built: [
      'A homepage that leads with the 20-year track record and veteran ownership',
      'Services packaged visually with clear pricing and a clear next step',
      'A quote form as the primary action, capturing leads while the owner works',
      'Instant email notifications so every inquiry gets a fast response',
    ],
    results: [
      { value: 'More', label: 'Bookings through the new quote form' },
      { value: 'Online', label: 'A presence that finally matches 20 years of reputation' },
      { value: '2 wks', label: 'From outdated template to live, converting site' },
    ],
    testimonial: {
      quote:
        'The new site has helped tremendously. It’s already driving more bookings through the form, and it’s great to finally have something that represents the business the way it deserves.',
      name: 'Owner',
      role: 'DJN Services LLC',
    },
    liveUrl: 'https://djnservices.com/',
    beforeAfter: [
      {
        beforeSrc: 'case-studies/djn-before-home.png',
        beforeAlt: 'DJN Services old homepage',
        beforeCaption: 'Template site - centered logo, no hierarchy, no clear direction',
        afterSrc: 'case-studies/djn-new-home-page.png',
        afterAlt: 'DJN Services new homepage',
        afterCaption: 'Bold and built for action - clear CTAs, real positioning',
      },
      {
        beforeSrc: 'case-studies/djn-before-services.png',
        beforeAlt: 'DJN Services old services page',
        beforeCaption: 'Old services page - wall of text, no visual packaging',
        afterSrc: 'case-studies/djn-services-after.png',
        afterAlt: 'DJN Services new services page',
        afterCaption: 'Clean service cards - easy to scan, clear pricing and action',
      },
      {
        beforeSrc: 'case-studies/djn-before-about.png',
        beforeAlt: 'DJN Services old about page',
        beforeCaption: 'Veteran-owned story buried in dense paragraphs',
        afterSrc: 'case-studies/djn-after-about.png',
        afterAlt: 'DJN Services new about page',
        afterCaption: 'Veteran-owned story front and center - builds trust immediately',
      },
    ],
    details: {
      timeline: '2 weeks',
      services: 'Web Design, Brand Positioning, Lead Capture System',
      industry: 'Welding, Hauling & Removal',
      location: 'North Alabama',
      notable: '100% Veteran-Owned',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Formspree', 'Resend', 'Vercel'],
    cardImage: 'work/client-logos/djn-new-home-page.png',
    cardImageFit: 'contain',
    cardBlurb:
      '20 years of veteran-owned welding and hauling work, finally represented online. A complete before and after, from basic template to authoritative brand.',
    cardStats: [
      { value: '20 yrs', label: 'In business' },
      { value: '2 wks', label: 'Delivery' },
    ],
    metaTitle: 'DJN Services Case Study: 20 Years of Work, Finally Online',
    metaDescription:
      'How DJN Services LLC, a 20-year veteran-owned welding and hauling company, replaced an outdated template site with a lead-capturing presence that drives bookings.',
  },
  {
    // TODO: Confirm Big Butt Association should be included in case studies before deploy.
    // The project is already public on /work. Delete this entry to remove the page.
    slug: 'big-butt-association',
    clientName: 'Big Butt Association',
    // TODO: Replace headline with a real, approved result metric.
    headline: 'A festival apparel brand with a storefront as bold as its name',
    summary:
      // TODO: Insert real, approved sales or traffic metrics before deploy.
      'Big Butt Association is an EDM festival clothing brand. We designed a custom Shopify storefront that matches the energy of festival culture: bold, neon, and unmistakable. The store gives the brand a complete e-commerce experience, from product discovery to checkout, that looks nothing like a default template.',
    heroImage: 'work/client-logos/bba-homepage.png',
    heroImageFit: 'contain',
    heroStats: [
      // TODO: Replace with real, approved metrics.
      { value: '[METRIC]', label: 'TODO: sales or conversion result' },
      { value: 'Custom', label: 'Shopify theme built for the brand' },
      { value: 'Live', label: 'Selling direct to the festival community' },
    ],
    problem:
      'Festival fashion is a crowded market where brand energy is the product. A default Shopify template would have made Big Butt Association look like every other merch store. The brand needed a storefront with the same bold identity as the clothing itself, without giving up Shopify’s proven checkout and inventory infrastructure.',
    built: [
      'A custom Shopify theme designed around the brand’s neon festival aesthetic',
      'Product discovery and catalog layouts built for impulse-friendly browsing',
      'A cohesive brand experience from homepage to checkout',
    ],
    results: [
      // TODO: Replace with real, approved metrics from the client before deploy.
      { value: '[METRIC]', label: 'TODO: sales or store performance metric' },
      { value: 'Distinct', label: 'A storefront no template could produce' },
      { value: 'Live', label: 'Selling at bigbuttassociation.com' },
    ],
    testimonial: {
      // TODO: Replace with a real, approved client quote.
      quote: '[PLACEHOLDER - client testimonial pending approval]',
      name: '[PLACEHOLDER - name]',
      role: 'Big Butt Association',
    },
    liveUrl: 'https://bigbuttassociation.com/',
    details: {
      timeline: '3 weeks',
      services: 'Brand Identity, E-commerce Design, Visual Design',
      industry: 'Festival Apparel & E-commerce',
      location: 'Online',
    },
    stack: ['Shopify', 'Shopify Liquid', 'JavaScript', 'CSS'],
    cardImage: 'work/client-logos/bba-homepage.png',
    cardImageFit: 'contain',
    cardBlurb:
      'A custom Shopify storefront with the same bold identity as the clothing itself, built on proven e-commerce infrastructure.',
    cardStats: [
      // TODO: Replace with real, approved metrics.
      { value: '[METRIC]', label: 'TODO: result metric' },
      { value: '3 wks', label: 'Delivery' },
    ],
    metaTitle: 'Big Butt Association Case Study: Custom Shopify Storefront',
    metaDescription:
      'How an EDM festival apparel brand got a custom Shopify storefront with bold brand identity on proven e-commerce infrastructure, designed by Sproutflow Studio.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
