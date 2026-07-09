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
  /** Omit until a real, approved client quote exists - the section simply won't render. */
  testimonial?: {
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
      'Second Line Psychiatry is a telehealth psychiatry practice serving families in New Orleans. The practice had no current website and new patients arrived through referrals alone. We designed and built a trauma-informed, privacy-first website with booking connected to the practice’s Google Business profile. After launch, qualified patient inquiries grew 50%, and the team now spends its first conversations on care, not on explaining the basics.',
    heroImage: 'work/client-logos/second-line-project.png',
    heroStats: [
      { value: '50%', label: 'More qualified inquiries' },
      { value: 'Privacy-first', label: 'Design built for sensitive care decisions' },
      { value: 'New Orleans', label: 'Rooted in local culture' },
    ],
    problem:
      'Families looking for psychiatric care need to trust a practice before they ever pick up the phone. Second Line Psychiatry had the clinical expertise but no current website - growth depended entirely on referrals. Prospective patients could not find the practice, see what made it different, or book without calling.',
    built: [
      'A custom website designed around the patient journey, from first visit to booked appointment',
      'A booking platform connected to the practice’s Google Business profile, so patients book from search',
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
      quote:
        'We didn’t have a current website and were working through client referrals only, but thanks to Sproutflow Studio we have seen a tremendous growth of incoming clients. The booking platform connected to our Google business account really helped our team.',
      name: 'Dr. Lauryn Richard, PMHNP',
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
    // Metric is an estimate approved by Ben (June 2026); adjust if the client reports differently.
    headline: 'Consultation requests doubled for a luxury event studio',
    summary:
      'Nealy Event Decor creates luxury custom fabrications for high-end events in Dallas: bespoke arches, bars, and premium rentals. We designed and built a website with editorial gallery layouts and an inventory system the team updates themselves. The site launched in six weeks and now presents the brand at the level of the work. Consultation requests have doubled since launch.',
    heroImage: 'nealy-case-study.png',
    heroStats: [
      { value: '2x', label: 'Consultation requests since launch' },
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
      { value: '2x', label: 'Consultation requests since launch' },
      { value: 'In-house', label: 'Inventory updates handled by the team, no developer needed' },
      { value: '6 weeks', label: 'From kickoff to a launch-ready luxury brand' },
    ],
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
      'A luxury fabrication showcase with editorial galleries and a self-managed inventory system. Consultation requests have doubled since launch.',
    cardStats: [
      { value: '2x', label: 'Consultation requests' },
      { value: '6 wks', label: 'Delivery' },
    ],
    metaTitle: 'Nealy Event Decor Case Study: Consultation Requests Doubled',
    metaDescription:
      'How Nealy Event Decor, a luxury event fabrication studio in Dallas, doubled consultation requests with an editorial brand site and a self-managed inventory CMS by Sproutflow Studio.',
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
    slug: 'big-butt-association',
    clientName: 'Big Butt Association',
    headline: 'A festival apparel brand with a storefront as bold as its name',
    summary:
      'Big Butt Association is an EDM festival clothing brand. We designed a custom Shopify storefront that matches the energy of festival culture: bold, neon, and unmistakable. The store gives the brand a complete e-commerce experience, from product discovery to checkout, that looks nothing like a default template.',
    heroImage: 'work/client-logos/bba-homepage.png',
    heroImageFit: 'contain',
    heroStats: [
      { value: 'Custom', label: 'Shopify theme built for the brand' },
      { value: '3 weeks', label: 'Design to launch' },
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
      { value: 'Distinct', label: 'A storefront no template could produce' },
      { value: 'Cohesive', label: 'One brand experience from homepage to checkout' },
      { value: 'Live', label: 'Selling at bigbuttassociation.com' },
    ],
    // TODO: Add a client testimonial when one is approved. Until then the
    // testimonial block simply does not render on this page.
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
      { value: 'Custom', label: 'Shopify build' },
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
