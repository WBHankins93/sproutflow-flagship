// data/caseStudies.ts: case study content for /case-studies pages.
//
// Each entry drives one page rendered by components/case-studies/CaseStudyLayout.tsx.
// Proof rules (DIRECTION.md section 7, no invented proof): every stat carries a
// source. "client-reported" is what the owner told me (shown with that label);
// "delivered" is what I built and shipped (timelines, features). A headline that
// states a result or a number names its source in headlineSource. No estimate of
// mine is ever shown as a result.

/** Where a figure or claim comes from. Rendered as a label next to it. */
export type ProofSource = 'client-reported' | 'delivered';

export const PROOF_SOURCE_LABELS: Record<ProofSource, string> = {
  'client-reported': 'client-reported',
  delivered: 'delivered',
};

export interface CaseStudyStat {
  value: string;
  label: string;
  source: ProofSource;
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
  /** Required when the headline states a result or a number. Rendered as a label under the h1. */
  headlineSource?: ProofSource;
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
  /** Detail shot for the "what I built" panel. Omit until a real capture exists; the panel simply does not render. */
  builtImage?: string;
  builtImageAlt?: string;
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
    // Ben to confirm source (client-reported) before final launch
    headline: '50% more qualified inquiries for a New Orleans telehealth practice',
    headlineSource: 'client-reported',
    summary:
      'Second Line Psychiatry is a telehealth psychiatry practice serving families in New Orleans. The practice had no current website and new patients arrived through referrals alone. I designed and built a trauma-informed, privacy-first website with booking connected to the practice’s Google Business profile. After launch, the practice reported 50% more qualified patient inquiries.',
    heroImage: 'work/client-logos/second-line-project.png',
    heroStats: [
      // Ben to confirm source (client-reported) before final launch
      { value: '50%', label: 'More qualified inquiries', source: 'client-reported' },
      { value: 'Privacy-first', label: 'Design built for sensitive care decisions', source: 'delivered' },
      { value: 'New Orleans', label: 'Rooted in local culture', source: 'delivered' },
    ],
    problem:
      'Families looking for psychiatric care need to trust a practice before they ever pick up the phone. Second Line Psychiatry had the clinical expertise but no current website, so growth depended entirely on referrals. Prospective patients could not find the practice, see what made it different, or book without calling.',
    built: [
      'A custom website designed around the patient journey, from first visit to booked appointment',
      'A booking platform connected to the practice’s Google Business profile, so patients book from search',
      'Trauma-informed copy and structure that answers the questions families actually have',
      'Accessibility work so the site serves everyone, including assistive technology users',
      'A visual identity inspired by New Orleans second line traditions',
    ],
    results: [
      // Ben to confirm source (client-reported) before final launch
      { value: '50%', label: 'Increase in qualified patient inquiries', source: 'client-reported' },
      { value: 'Connected', label: 'Booking available from the Google Business profile', source: 'delivered' },
      { value: 'Live', label: 'Serving families across the New Orleans area', source: 'delivered' },
    ],
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
      'A trauma-informed telehealth presence that helps families trust the practice before the first call. The practice reported 50% more qualified inquiries after launch.',
    cardStats: [
      // Ben to confirm source (client-reported) before final launch
      { value: '50%', label: 'More qualified inquiries', source: 'client-reported' },
      { value: '4 wks', label: 'Delivery', source: 'delivered' },
    ],
    metaTitle: 'Second Line Psychiatry Case Study: 50% More Qualified Inquiries',
    metaDescription:
      'How Second Line Psychiatry, a New Orleans telehealth practice, reported 50% more qualified patient inquiries after a trauma-informed, privacy-first website built by Sproutflow Studio.',
  },
  {
    slug: 'nola-pool-solutions',
    clientName: 'NOLA Pool Solutions',
    // Ben to confirm source (client-reported) before final launch
    headline: '30% customer acquisition growth, starting from no website at all',
    headlineSource: 'client-reported',
    summary:
      'NOLA Pool Solutions is a pool maintenance and renovation company serving the New Orleans metro area. The business ran entirely on word of mouth with no website. I built a lead capture site that establishes credibility, helps prospects choose the right service, and collects the details needed for a quote. The site went live in three weeks, and the owner reported 30% growth in customer acquisition.',
    heroImage: 'work/client-logos/nps-project.png',
    heroStats: [
      // Ben to confirm source (client-reported) before final launch
      { value: '30%', label: 'Customer acquisition growth', source: 'client-reported' },
      { value: '3 weeks', label: 'From nothing to live', source: 'delivered' },
      { value: 'One path', label: 'Service details flow into a quote request', source: 'delivered' },
    ],
    problem:
      'All business came through word of mouth and a bare Google Business profile. The owner spent hours on discovery calls with people who were never going to buy, while serious prospects had no way to vet the company before calling. Competitors with websites were winning work on credibility alone.',
    built: [
      'A lead capture form system as the primary call to action, not just a phone number',
      'Service packaging that pre-qualifies prospects before they reach out',
      'Trust signals up front: licensing, metro-area expertise, response time',
      'A local SEO foundation targeting New Orleans metro pool service searches',
      'Automated email notifications when a quote request is submitted',
    ],
    results: [
      // Ben to confirm source (client-reported) before final launch
      { value: '30%', label: 'Growth in customer acquisition', source: 'client-reported' },
      { value: '3 weeks', label: 'From no website to a live customer path', source: 'delivered' },
      { value: 'Direct', label: 'Quote details now arrive through one intake flow', source: 'delivered' },
    ],
    liveUrl: 'https://nolapoolsolutions.com/',
    details: {
      timeline: '3 weeks',
      services: 'Web Design, Quote Intake Flow, Service Packaging, SEO Foundation',
      industry: 'Pool Maintenance & Renovation',
      location: 'New Orleans metro',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Formspree', 'Resend', 'Vercel'],
    cardImage: 'work/client-logos/nps-project.png',
    cardBlurb:
      'From no web presence to a live site in three weeks, with an intake flow that collects quote details before the first call. The owner reported 30% customer acquisition growth.',
    cardStats: [
      // Ben to confirm source (client-reported) before final launch
      { value: '30%', label: 'Acquisition growth', source: 'client-reported' },
      { value: '3 wks', label: 'Delivery', source: 'delivered' },
    ],
    metaTitle: 'NOLA Pool Solutions Case Study: 30% Customer Acquisition Growth',
    // The former local search ranking claim had no source and was removed (Wave 3).
    metaDescription:
      'How NOLA Pool Solutions went from no website to a lead capture site with a quote request flow, built by Sproutflow Studio in three weeks. The owner reported 30% customer acquisition growth.',
  },
  {
    slug: 'nealy-events',
    clientName: 'Nealy Event Decor',
    // The former consultation-request multiplier was Ben's estimate, not client-reported,
    // and is gone everywhere (Wave 3). The headline now comes from the owner's testimonial:
    // "we are already fully booked for next month".
    headline: 'Fully booked for next month, with inventory the team runs itself',
    headlineSource: 'client-reported',
    summary:
      'Nealy Event Decor creates luxury custom fabrications for high-end events in Dallas: bespoke arches, bars, and premium rentals. I designed and built a website with editorial gallery layouts and an inventory system the team updates themselves. The site launched in six weeks and presents the brand at the level of the work. Since launch, the owner says bookings have grown and the studio is fully booked for next month.',
    heroImage: 'work/client-logos/nealy-project.png',
    heroStats: [
      { value: 'Fully booked', label: 'For next month, in the owner’s words', source: 'client-reported' },
      { value: '6 weeks', label: 'Design to launch', source: 'delivered' },
      { value: 'In-house', label: 'Inventory managed by the team', source: 'delivered' },
    ],
    problem:
      'Nealy delivers luxury-grade work, but the business was running on word of mouth and Facebook Marketplace, and bookings were slow and inconsistent. Prospective clients could not browse the inventory or picture their event, so the brand online did not match the quality of the work.',
    built: [
      'Editorial-style gallery layouts modeled on high-end design magazines',
      'A custom inventory categorization system so clients can browse by piece and style',
      'A CMS the Nealy team uses to add and update inventory without a developer',
      'A story-driven brand experience that positions Nealy as a luxury studio',
    ],
    results: [
      { value: 'Fully booked', label: 'For next month, in the owner’s words after launch', source: 'client-reported' },
      { value: 'In-house', label: 'Inventory updates handled by the team, no developer needed', source: 'delivered' },
      { value: '6 weeks', label: 'From kickoff to a launch-ready luxury brand', source: 'delivered' },
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
      'A luxury fabrication showcase with editorial galleries and a self-managed inventory system. Since launch, the owner says the studio is fully booked for next month.',
    cardStats: [
      { value: 'Fully booked', label: 'Next month, per the owner', source: 'client-reported' },
      { value: '6 wks', label: 'Delivery', source: 'delivered' },
    ],
    metaTitle: 'Nealy Event Decor Case Study: Fully Booked for Next Month',
    metaDescription:
      'An editorial brand site and a team-managed inventory CMS for Nealy Event Decor, a luxury event fabrication studio in Dallas, built by Sproutflow Studio in six weeks. The owner reports being fully booked for next month.',
  },
  {
    slug: 'djn-services',
    clientName: 'DJN Services LLC',
    headline: 'A two-week rebuild for a 20-year service business',
    headlineSource: 'delivered',
    summary:
      'DJN Services LLC is a veteran-owned welding, hauling, and removal company in North Alabama with more than 20 years in business. Its template website buried that track record. I rebuilt the site around two decades of work, veteran ownership, and fast response. The new site launched in two weeks and captures quote details while the owner is in the field. Since we started working together, the owner reports a 35% increase in total bookings.',
    heroImage: 'work/client-logos/djn-new-home-page.png',
    heroImageFit: 'contain',
    heroStats: [
      { value: '20 yrs', label: 'Company experience highlighted on the site', source: 'client-reported' },
      { value: '2 weeks', label: 'Delivery timeline', source: 'delivered' },
      { value: 'Quote form', label: 'Captures leads while the owner is working', source: 'delivered' },
    ],
    problem:
      'DJN had two decades of reputation in its community and a website that looked two months old. The veteran-owned story was buried, services read as walls of text, and there was no way to capture a lead while the owner was on a job. The online presence did not match the size of the operation.',
    built: [
      'A homepage that leads with the 20-year track record and veteran ownership',
      'Services packaged visually with clear pricing and a clear next step',
      'A quote form as the primary action, capturing leads while the owner works',
      'Email notifications the moment a quote request is submitted',
    ],
    results: [
      // Verbatim in the owner's testimonial: "we have seen a 35% increase in total bookings".
      { value: '35%', label: 'Increase in total bookings, in the owner’s words', source: 'client-reported' },
      { value: '2 weeks', label: 'From outdated template to live website', source: 'delivered' },
      { value: '20 years', label: 'Company history now visible before a prospect calls', source: 'client-reported' },
      { value: 'One form', label: 'Quote details arrive through a defined intake path', source: 'delivered' },
    ],
    builtImage: 'case-studies/djn-services-after.png',
    builtImageAlt: 'DJN Services new services page, with mobile welding, trash removal, and handyman services packaged into clear categories',
    liveUrl: 'https://djnservicesllc.com/',
    beforeAfter: [
      {
        beforeSrc: 'case-studies/djn-before-home.png',
        beforeAlt: 'DJN Services old homepage',
        beforeCaption: 'Template site: centered logo, no hierarchy, no clear direction',
        afterSrc: 'case-studies/djn-new-home-page.png',
        afterAlt: 'DJN Services new homepage',
        afterCaption: 'Bold and built for action: clear calls to action, real positioning',
      },
      {
        beforeSrc: 'case-studies/djn-before-services.png',
        beforeAlt: 'DJN Services old services page',
        beforeCaption: 'Old services page: a wall of text, no visual packaging',
        afterSrc: 'case-studies/djn-services-after.png',
        afterAlt: 'DJN Services new services page',
        afterCaption: 'Clean service cards: easy to scan, clear pricing and action',
      },
      {
        beforeSrc: 'case-studies/djn-before-about.png',
        beforeAlt: 'DJN Services old about page',
        beforeCaption: 'Veteran-owned story buried in dense paragraphs',
        afterSrc: 'case-studies/djn-after-about.png',
        afterAlt: 'DJN Services new about page',
        afterCaption: 'Veteran-owned story up front, where it builds trust',
      },
    ],
    details: {
      timeline: '2 weeks',
      services: 'Web Design, Brand Positioning, Quote Intake Flow',
      industry: 'Welding, Hauling & Removal',
      location: 'North Alabama',
      notable: '100% Veteran-Owned',
    },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Formspree', 'Resend', 'Vercel'],
    cardImage: 'work/client-logos/djn-new-home-page.png',
    cardImageFit: 'contain',
    cardBlurb:
      'Twenty years of veteran-owned welding and hauling work, finally represented online. The rebuilt site launched in two weeks.',
    cardStats: [
      { value: '20 yrs', label: 'In business', source: 'client-reported' },
      { value: '2 wks', label: 'Delivery', source: 'delivered' },
    ],
    metaTitle: 'DJN Services Case Study: 20 Years of Work, Finally Online',
    metaDescription:
      'How DJN Services LLC, a 20-year veteran-owned welding and hauling company, replaced an outdated template site in two weeks. The owner reports a 35% increase in total bookings since.',
  },
  {
    slug: 'big-butt-association',
    clientName: 'Big Butt Association',
    headline: 'A festival apparel brand with a storefront as bold as its name',
    summary:
      'Big Butt Association is an EDM festival clothing brand. I designed a custom Shopify storefront that matches the energy of festival culture: bold, neon, and unmistakable. The store gives the brand a complete e-commerce experience, from product discovery to checkout, that looks nothing like a default template.',
    heroImage: 'work/client-logos/bba-homepage.png',
    heroImageFit: 'contain',
    heroStats: [
      { value: 'Custom', label: 'Shopify theme built for the brand', source: 'delivered' },
      { value: '3 weeks', label: 'Design to launch', source: 'delivered' },
      { value: 'Live', label: 'Selling direct to the festival community', source: 'delivered' },
    ],
    problem:
      'Festival fashion is a crowded market where brand energy is the product. A default Shopify template would have made Big Butt Association look like every other merch store. The brand needed a storefront with the same bold identity as the clothing itself, without giving up Shopify’s proven checkout and inventory infrastructure.',
    built: [
      'A custom Shopify theme designed around the brand’s neon festival aesthetic',
      'Product discovery and catalog layouts built for impulse-friendly browsing',
      'A cohesive brand experience from homepage to checkout',
    ],
    results: [
      { value: 'Distinct', label: 'A storefront no template could produce', source: 'delivered' },
      { value: 'Cohesive', label: 'One brand experience from homepage to checkout', source: 'delivered' },
      { value: 'Live', label: 'Selling at bigbuttassociation.com', source: 'delivered' },
    ],
    // No client testimonial yet. Until one is approved, the testimonial block
    // simply does not render on this page.
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
      { value: 'Custom', label: 'Shopify build', source: 'delivered' },
      { value: '3 wks', label: 'Delivery', source: 'delivered' },
    ],
    metaTitle: 'Big Butt Association Case Study: Custom Shopify Storefront',
    metaDescription:
      'How an EDM festival apparel brand got a custom Shopify storefront with bold brand identity on proven e-commerce infrastructure, designed by Sproutflow Studio.',
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

/** True when a string states a number ("50%", "2 weeks", "20-year"). */
export function hasFigure(text: string): boolean {
  return /\d/.test(text);
}
