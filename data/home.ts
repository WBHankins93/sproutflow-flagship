// data/home.ts - Copy and proof wiring for the v3 homepage (components/home/*).
//
// Prices never live here; they come from data/catalog.ts. Client results and
// quotes never live here either; they are read from data/projectProof.ts and
// data/testimonials.ts by id, so the homepage cannot drift from the case
// studies. Copy rules: Ben's "I" voice, no em dashes, results labelled
// client-reported, testimonials verbatim.

import type { RedlineMarkSpec } from '@/components/redline';
import { projectProof, type ProjectProof } from './projectProof';
import { getTestimonialForCaseStudy } from './testimonials';

export const homeHero = {
  eyebrow: 'Sproutflow Studio · Websites, lead systems and care',
  /** The whole headline, for metadata and tests. The component underlines "Find the leaks.", period included, so it never wraps alone. */
  headline: 'Find the leaks. Fix the site. Book the work.',
  sentences: ['Find the leaks.', 'Fix the site.', 'Book the work.'] as const,
  underline: 'Find the leaks.',
  sub: 'I’m Ben. I find where your website loses customers, fix it at a fixed price, and keep it working after launch.',
  primaryCta: 'Book a 15-minute call',
  secondaryCta: { label: 'Check your website free', href: '/check' },
  note: 'hi, I’m Ben. You’ll talk to me.',
  photoAlt: 'Ben Hankins, founder of Sproutflow Studio',
};

export const homeTrust = {
  label: 'What you can count on',
  promises: [
    { title: 'A written, fixed price', body: 'You get the price in writing before I start.' },
    { title: 'You own everything', body: 'Your domain, code and accounts stay in your name.' },
    { title: '30 days of fixes', body: 'If something isn’t right in the first 30 days after launch, I fix it.' },
  ],
  location: 'Based in New Orleans. Working with businesses anywhere.',
};

export interface ProofSpec {
  /** projectProof id. */
  projectId: string;
  /** Which published field holds the result for this client. */
  from: 'projectResult' | 'testimonialMetric';
}

export const homeProof = {
  heading: 'Sites I built, and what the owners reported after launch.',
  /** Order: DIRECTION.md §4. DJN's result is its testimonial metric; the rest are project results. */
  items: [
    { projectId: 'second-line-psychiatry', from: 'projectResult' },
    { projectId: 'nola-pool-solutions', from: 'projectResult' },
    { projectId: 'nealy-events', from: 'projectResult' },
    { projectId: 'djn-services', from: 'testimonialMetric' },
  ] satisfies ProofSpec[],
  resultTag: 'client-reported',
  source: 'Results as reported by each client.',
};

export interface HomeProofItem {
  project: ProjectProof;
  /** The published result string, unchanged. */
  result: string;
  /** Leading figure of the result ("35%"), or null when it has none. */
  figure: string | null;
  /** The result after the figure ("increase in total bookings"). */
  rest: string;
}

/** Leading figure of a result string: "35% increase..." gives "35%", "2x consultation..." gives "2x". */
export function leadingFigure(text: string): string | null {
  const match = text.trim().match(/^(\d+(?:\.\d+)?(?:%|x))(?=\s)/i);
  return match ? match[1] : null;
}

/** Proof items with results read from published data. Items whose source is missing are dropped. */
export function getHomeProof(specs: readonly ProofSpec[] = homeProof.items): HomeProofItem[] {
  return specs.flatMap((spec) => {
    const project = projectProof.find((entry) => entry.id === spec.projectId);
    if (!project) return [];
    const result =
      spec.from === 'testimonialMetric' ? getTestimonialForCaseStudy(spec.projectId)?.metric : project.result;
    if (!result) return [];
    const figure = leadingFigure(result);
    const rest = figure ? result.trim().slice(figure.length).trim() : result;
    return [{ project, result, figure, rest }];
  });
}

export const homeCheck = {
  eyebrow: 'Free website check',
  heading: 'Is your website doing its job?',
  sub: 'I check what a customer runs into first and show you the results. No sign-up.',
  inputLabel: 'Your website address',
  placeholder: 'yourbusiness.com',
  button: 'Check my site',
  fine: 'Free. Nothing is stored unless you ask me to email the report.',
  listHeading: 'What it checks',
  /**
   * One line per check id. The list itself follows CHECK_LABELS in
   * lib/website-check/messages.ts, so checks added there (domain and email in
   * check v1) show up here with no homepage change.
   */
  details: {
    loads: 'Does the page open, and how fast does it start?',
    https: 'Does it use https, or do browsers warn “Not secure”?',
    mobile: 'Is it set up to fit a phone screen?',
    call: 'Can a customer tap your number to call you?',
    form: 'Is there a form, not just an email address?',
    speed: 'Is the page small enough to load on a weak signal?',
    domain: 'Is your domain about to expire?',
    email: 'Is your email set up so it lands in inboxes?',
  } as Record<string, string>,
};

export const homeOffers = {
  eyebrow: 'Prices',
  heading: 'Prices up front.',
  sub: 'Every project starts with a 15-minute call and a written, fixed quote. Not sure which fits? That is what the call is for.',
  cta: 'Book a call',
  included: 'What’s included',
};

export const homeCare = {
  eyebrow: 'Care',
  heading: 'Websites break quietly.',
  italic: 'quietly',
  intro:
    'Most websites don’t crash. One small part stops working, and nobody notices until the phone goes quiet. These are the two I see most.',
  examples: [
    {
      label: 'Silent form',
      title: 'A contact form that silently stops sending.',
      body: 'The page looks fine. The messages go nowhere, and customers think you never wrote back.',
    },
    {
      label: 'Lapsed renewal',
      title: 'A domain or email that lapses over billing.',
      body: 'A card expires, a renewal fails, and your site or your email stops working without a warning.',
    },
  ],
  /** Followed by the Site Care price from data/catalog.ts. */
  pitch: 'Care is me watching for exactly this, and fixing it before a customer finds it. Site Care starts at',
  careOfferId: 'site-care',
  cta: 'Ask about care',
};

export const homeWork = {
  eyebrow: 'Work',
  heading: 'Same business. Fewer reasons to leave.',
  /** caseStudies slug for the before/after slider; images come from its first beforeAfter pair. */
  featuredSlug: 'djn-services',
  featuredProjectId: 'djn-services',
  sliderLabel: 'Compare DJN Services’ old and new homepage',
  sliderHint: 'Drag the line, or use your arrow keys.',
  featuredCaption: 'A rebuilt site with the phone number up top and a quote form.',
  /** projectProof ids for the compact cards, in order. */
  cardIds: ['second-line-psychiatry', 'nola-pool-solutions', 'nealy-events'],
  caseStudyLink: 'Read the case study',
};

export const homeOwn = {
  eyebrow: 'Honest markup',
  heading: 'I start with my own.',
  italic: 'own',
  body: 'This was my homepage in August 2026. Before I mark up yours, here is what I got wrong on mine.',
  note: 'my August homepage, marked up',
  image: {
    src: '/redesign/sproutflow-v1-home.jpg',
    width: 1600,
    height: 1424,
    alt: 'Sproutflow Studio’s August 2026 homepage: a large headline, Make it easier for customers to choose you, a button that says Tell me about your project, and a project carousel on the right.',
  },
  caption: 'Sproutflow Studio, August 2026.',
  listLabel: 'What I marked on my own homepage',
  /** Measured on the 1600 x 1424 screenshot. Notes are 8 words or fewer. */
  marks: [
    {
      variant: 'circle',
      x: 49,
      y: 0.5,
      w: 49,
      h: 6.5,
      note: 'no phone number up top',
      detail: 'The header had three links and a project button, but no number to call.',
      notePlacement: 'below',
      noteWidth: 26,
    },
    {
      variant: 'underline',
      x: 2.5,
      y: 46.5,
      w: 32,
      h: 3.5,
      note: 'no price, and results hide small',
      detail: 'A big promise with no price beside it. The one client result sat in small type inside a rotating carousel.',
      notePlacement: 'right',
      noteWidth: 24,
      noteRotate: 1.5,
    },
    {
      variant: 'box',
      x: 2,
      y: 72,
      w: 38,
      h: 10,
      note: 'asks for a project brief, not a call',
      detail: 'Tell me about your project meant writing a brief. Booking a 15-minute call is easier.',
      notePlacement: 'right',
      noteWidth: 26,
      noteRotate: -1.5,
    },
  ] satisfies RedlineMarkSpec[],
};

export const homeBen = {
  eyebrow: 'Who you’ll work with',
  heading: 'One person. The same one, start to finish.',
  paragraphs: [
    'I’m Ben Hankins, and Sproutflow Studio is just me. I take the first call, find what’s costing you customers, build the fix, and I’m the one who picks up after launch. No account managers, no handoffs.',
    'I write the plan in plain English, test the work on real phones, and keep watching it once it’s live. You get straight answers on price and timing from the person doing the work.',
  ],
  credentials: '7 years keeping software running at large companies, including IBM',
  /** A verbatim, contiguous excerpt of this testimonial's quote. Attribution comes from data/testimonials.ts. */
  testimonialId: 'nealy-events',
  excerpt: 'Ben was helpful and professional, and always made time for me even outside our scheduled calls.',
  photoAlt: 'Ben Hankins, founder of Sproutflow Studio',
  aboutLink: 'More about how I work',
};

export const homeBook = {
  eyebrow: 'Book',
  heading: 'Fifteen minutes.',
  underline: 'One clear next step.',
  body: 'Tell me what’s going on. I’ll tell you what I’d fix first, what it costs, and whether I’m the right person to do it.',
  cta: 'Book a 15-minute call',
  phoneLead: 'Or call',
  phoneDisplay: '(504) 326-1676',
  phoneHref: 'tel:+15043261676',
  faqHeading: 'Short answers',
  faqs: [
    {
      id: 'fixed-price',
      question: 'Is the price really fixed?',
      answer:
        'Yes. After the call I send a written quote with the scope, the price and the timeline, and I don’t start until you’ve agreed to it.',
    },
    {
      id: 'ownership',
      question: 'Who owns the website?',
      answer:
        'You do. The domain, code, accounts and data are yours. I document the handoff, and if care ever ends, I remove my access.',
    },
    {
      id: 'speed',
      question: 'How fast can it be live?',
      answer:
        'Website Rescue is live 10 business days after your content arrives. Larger sites and lead systems take longer, and the written quote says exactly when.',
    },
  ],
};

/** Section anchors, in page order. Exported for tests and the Wave 3 nav. */
export const HOME_SECTION_IDS = [
  'top',
  'promises',
  'results',
  'check',
  'offers',
  'care',
  'work',
  'my-own',
  'about',
  'book',
] as const;
