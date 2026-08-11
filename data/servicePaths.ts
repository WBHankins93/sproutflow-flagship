export type ServicePathId = 'websites' | 'business-systems' | 'growth-support';

export interface ServicePath {
  id: ServicePathId;
  eyebrow: string;
  title: string;
  outcome: string;
  description: string;
  goodFit: string;
  capabilities: string[];
  ctaLabel: string;
}

export const servicePaths: ServicePath[] = [
  {
    id: 'websites',
    eyebrow: 'Websites',
    title: 'Websites that earn trust',
    outcome: 'Help the right customer understand your value and take the next step.',
    description:
      'I shape the message and customer path before building a fast, accessible site that is easy for you to own.',
    goodFit:
      'Your business has outgrown its current site, relies too heavily on referrals, or needs a credible place to send new customers.',
    capabilities: [
      'Positioning and customer path',
      'Responsive design and development',
      'Copy, CMS, and SEO foundations',
      'Rebuilds and Shopify',
    ],
    ctaLabel: 'Ask about a website',
  },
  {
    id: 'business-systems',
    eyebrow: 'Business systems',
    title: 'Systems that remove friction',
    outcome: 'Give your team a clearer way to move a customer from inquiry to completed work.',
    description:
      'I connect leads, customer information, scheduling, and follow-up so the team is not stitching the work together by hand.',
    goodFit:
      'Leads slip through, repeat admin work is slowing the team down, or your current tools do not match how the business actually operates.',
    capabilities: [
      'CRM and customer records',
      'Intake and booking flows',
      'Dashboards and admin tools',
      'Automation, integrations, and reporting',
    ],
    ctaLabel: 'Ask about a business system',
  },
  {
    id: 'growth-support',
    eyebrow: 'Growth and support',
    title: 'Ongoing growth and support',
    outcome: 'Protect the work you have already done and make the next improvement with evidence.',
    description:
      'Keep the site healthy, review what customers are doing, and add new work when the business is ready for it.',
    goodFit:
      'You want a dependable partner for upkeep and measured improvements without giving up ownership of your website or accounts.',
    capabilities: [
      'Maintenance and hosting',
      'Search and performance reviews',
      'New pages, copy, and content',
      'Photography and email coordination',
    ],
    ctaLabel: 'Ask about ongoing support',
  },
];
