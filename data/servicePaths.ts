export type ServicePathId = 'websites' | 'business-systems' | 'growth-support';

export interface ServicePath {
  id: ServicePathId;
  eyebrow: string;
  title: string;
  /** Substring of `title` set in the accent face on the detail page header. */
  titleAccent: string;
  outcome: string;
  description: string;
  goodFit: string;
  capabilities: string[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
  mediaPlaceholder: string;
  relatedCaseStudy: string;
  checkpoints: string[];
  faq: { question: string; answer?: string }[];
}

export const servicePaths: ServicePath[] = [
  {
    id: 'websites',
    eyebrow: 'Websites',
    title: 'Websites that earn trust',
    titleAccent: 'earn trust',
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
    metaTitle: 'Web Design in New Orleans',
    metaDescription:
      'Custom website design and development for New Orleans small businesses. New builds, rebuilds, and Shopify. You own the domain, code, and accounts.',
    mediaPlaceholder: 'Client website loop goes here',
    relatedCaseStudy: 'second-line-psychiatry',
    checkpoints: [
      'Message and customer path',
      'Visual direction and written scope',
      'Working pages and review rounds',
      'Launch, documentation, and ownership',
    ],
    faq: [
      { question: 'What kind of website is the right fit here?' },
      { question: 'Can you rebuild an existing site or Shopify store?' },
      { question: 'What will I be able to update myself?' },
    ],
  },
  {
    id: 'business-systems',
    eyebrow: 'Business systems',
    title: 'Systems that remove friction',
    titleAccent: 'remove friction',
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
    metaTitle: 'CRM & Business Automation',
    metaDescription:
      'Custom CRMs, booking and intake flows, dashboards, and automation for small businesses. Stop losing leads in the handoff between tools.',
    mediaPlaceholder: 'CRM, booking, or dashboard capture goes here',
    relatedCaseStudy: 'nola-pool-solutions',
    checkpoints: [
      'Map the work as it happens now',
      'Choose the smallest useful system',
      'Test the workflow with real scenarios',
      'Handoff, training, and support plan',
    ],
    faq: [
      { question: 'Do I need to replace the tools I already use?' },
      { question: 'What information belongs in a custom CRM?' },
      { question: 'How do access, backups, and ownership work?' },
    ],
  },
  {
    id: 'growth-support',
    eyebrow: 'Growth and support',
    title: 'Ongoing growth and support',
    titleAccent: 'growth and support',
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
    metaTitle: 'Website Maintenance & SEO',
    metaDescription:
      'Ongoing hosting, maintenance, search and performance reviews for small business websites. Measured improvements without giving up ownership.',
    mediaPlaceholder: 'Analytics and improvement capture goes here',
    relatedCaseStudy: 'nealy-events',
    checkpoints: [
      'Review site health and current goals',
      'Choose one measurable improvement',
      'Ship and verify the change',
      'Record what happened and choose what is next',
    ],
    faq: [
      { question: 'Can you support a site you did not build?' },
      { question: 'What is included in ongoing maintenance?' },
      { question: 'How do we decide what to improve next?' },
    ],
  },
];

export function getServicePath(id: string): ServicePath | undefined {
  return servicePaths.find((path) => path.id === id);
}
