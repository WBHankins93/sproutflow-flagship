export interface Tier {
  id: string;
  name: string;
  tagline: string;
  goodFit: string;
  includes: string[];
}

/**
 * A rough scale of engagement, not a price sheet. No figures here on
 * purpose - Ben is deciding pricing separately after a competitor review.
 * These exist so a visitor can place themselves before the first call,
 * while the actual scope and quote still only get written after we talk.
 * Named for the site's own growth-ring motif: sprout, leaf, bloom, canopy.
 */
export const tiers: Tier[] = [
  {
    id: 'sprout',
    name: 'Sprout',
    tagline: 'A credible first presence',
    goodFit: 'A new business or a rebrand that needs somewhere real to send people.',
    includes: [
      'Semi-custom design built around your positioning',
      'Mobile-first build and performance tuning',
      'Basic CMS: edit pages, images, and metadata yourself',
      'SEO foundations',
    ],
  },
  {
    id: 'leaf',
    name: 'Leaf',
    tagline: 'A site that does the selling',
    goodFit: 'An established business that needs the site itself to build trust and convert.',
    includes: [
      'Fully custom design and conversion-focused customer path',
      'Professional copywriting for key pages',
      'Comprehensive SEO strategy',
      'Blog or content integration',
    ],
  },
  {
    id: 'bloom',
    name: 'Bloom',
    tagline: 'The systems behind the site',
    goodFit: 'The website works, but leads, scheduling, or follow-up are still stitched together by hand.',
    includes: [
      'CRM and customer records',
      'Intake and booking flows',
      'Dashboards for the team',
      'Automation between the tools you already use',
    ],
  },
  {
    id: 'canopy',
    name: 'Canopy',
    tagline: 'One connected business',
    goodFit: 'The site is a growth engine and needs to run together with the rest of your operation.',
    includes: [
      'Full content platform with CRM integrations',
      'Custom systems built around how your business runs',
      'Marketing and reporting automation',
      'Ongoing, measured improvement',
    ],
  },
];
