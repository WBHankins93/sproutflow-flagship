export type ServicePathId = 'websites' | 'business-systems' | 'growth-support';

export interface ServicePath {
  id: ServicePathId;
  eyebrow: string;
  title: string;
  outcome: string;
  description: string;
  goodFit: string;
  capabilities: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  ctaLabel: string;
}

export const servicePaths: ServicePath[] = [
  {
    id: 'websites',
    eyebrow: 'Websites',
    title: 'Websites that earn trust',
    outcome: 'Help the right customer understand your value and take the next step.',
    description:
      'We shape the message, customer path, and finished site as one system—then build it to be fast, accessible, and easy to own.',
    goodFit:
      'Your business has outgrown its current site, relies too heavily on referrals, or needs a credible place to send new customers.',
    capabilities: [
      'Strategy and market positioning',
      'Responsive design and development',
      'Clear copy and customer pathways',
      'CMS and SEO foundations',
      'Website rebuilds and migrations',
      'Shopify builds and rebuilds',
    ],
    image: 'work/client-logos/second-line-project.png',
    imageAlt: 'Second Line Psychiatry website designed and built by Sproutflow Studio',
    imageCaption: 'Second Line Psychiatry · New Orleans',
    ctaLabel: 'Discuss your website',
  },
  {
    id: 'business-systems',
    eyebrow: 'Business systems',
    title: 'Systems that remove friction',
    outcome: 'Give your team a clearer way to move a customer from inquiry to completed work.',
    description:
      'We connect the work behind the website so leads, customer information, scheduling, and follow-up do not depend on memory or scattered tools.',
    goodFit:
      'Leads slip through, repeat admin work is slowing the team down, or your current tools do not match how the business actually operates.',
    capabilities: [
      'Custom CRM and customer management',
      'Intake and booking workflows',
      'Internal dashboards and admin tools',
      'Workflow and document automation',
      'Platform integrations',
      'Analytics and operational reporting',
    ],
    image: 'work/client-logos/nps-project.png',
    imageAlt: 'NOLA Pool Solutions website and customer inquiry experience built by Sproutflow Studio',
    imageCaption: 'NOLA Pool Solutions · New Orleans metro',
    ctaLabel: 'Discuss a business system',
  },
  {
    id: 'growth-support',
    eyebrow: 'Growth and support',
    title: 'Ongoing growth and support',
    outcome: 'Protect the work you have already done and make the next improvement with evidence.',
    description:
      'Ongoing help stays optional. Add only the maintenance, content, search, or conversion work your business needs as it changes.',
    goodFit:
      'You want a dependable partner for upkeep and measured improvements without giving up ownership of your website or accounts.',
    capabilities: [
      'Maintenance and hosting',
      'SEO growth and performance reviews',
      'Additional pages and landing pages',
      'Copywriting and content support',
      'Photography coordination',
      'Email marketing integrations',
    ],
    image: 'work/client-logos/nealy-project.png',
    imageAlt: 'Nealy Event Decor website designed and built by Sproutflow Studio',
    imageCaption: 'Nealy Event Decor · Dallas',
    ctaLabel: 'Ask about ongoing support',
  },
];
