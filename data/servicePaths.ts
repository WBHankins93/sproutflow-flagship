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
  /** Three short fit statements, split out of goodFit for the detail page. */
  fitStatements: [string, string, string];
  capabilities: string[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
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
    fitStatements: [
      'Your business has outgrown its current site.',
      'You rely too heavily on referrals.',
      'You need a credible place to send new customers.',
    ],
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
    relatedCaseStudy: 'second-line-psychiatry',
    checkpoints: [
      'Message and customer path',
      'Visual direction and written scope',
      'Working pages and review rounds',
      'Launch, documentation, and ownership',
    ],
    faq: [
      {
        question: 'What kind of website is the right fit here?',
        answer:
          'A template works when your message and customer path fit a standard layout. A custom build makes sense when positioning, integrations, or the way customers buy needs a different structure. I will recommend the simpler option when it can do the job.',
      },
      {
        question: 'Can you rebuild an existing site or Shopify store?',
        answer:
          'Yes. Rebuilds and Shopify storefronts are both regular work. We start from what is converting today and what is not, so the rebuild keeps what already works instead of starting from zero.',
      },
      {
        question: 'What will I be able to update myself?',
        answer:
          'Pages, images, blog posts, and metadata, through a CMS set up around how you actually work. I document it before launch and walk you through it. Anything structural you can send to me instead of fighting a page builder.',
      },
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
    fitStatements: [
      'Leads slip through before anyone follows up.',
      'Repeat admin work is slowing the team down.',
      'Your tools do not match how the business actually operates.',
    ],
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
    relatedCaseStudy: 'nola-pool-solutions',
    checkpoints: [
      'Map the work as it happens now',
      'Choose the smallest useful system',
      'Test the workflow with real scenarios',
      'Handoff, training, and support plan',
    ],
    faq: [
      {
        question: 'Do I need to replace the tools I already use?',
        answer:
          'Usually not. Most of the work is connecting what you already pay for so information stops being retyped. I only suggest replacing a tool when keeping it costs more than moving off it.',
      },
      {
        question: 'What information belongs in a custom CRM?',
        answer:
          'Whatever your team looks up on a normal day. Contact details, where the job stands, what was quoted, what was promised, and the history of the conversation. If nobody uses a field, it does not belong in there.',
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
    eyebrow: 'Growth and support',
    title: 'Ongoing growth and support',
    titleAccent: 'growth and support',
    outcome: 'Protect the work you have already done and make the next improvement with evidence.',
    description:
      'Keep the site healthy, review what customers are doing, and add new work when the business is ready for it.',
    goodFit:
      'You want a dependable partner for upkeep and measured improvements without giving up ownership of your website or accounts.',
    fitStatements: [
      'You want a dependable partner for upkeep.',
      'You want the next improvement decided by evidence.',
      'You do not want to give up ownership of your site or accounts.',
    ],
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
    relatedCaseStudy: 'nealy-events',
    checkpoints: [
      'Review site health and current goals',
      'Choose one measurable improvement',
      'Ship and verify the change',
      'Record what happened and choose what is next',
    ],
    faq: [
      {
        question: 'Can you support a site you did not build?',
        answer:
          'Often yes. It depends on how it was built and what it runs on. I review the current setup first and tell you honestly whether supporting it makes sense or whether the money is better spent elsewhere.',
      },
      {
        question: 'What is included in ongoing maintenance?',
        answer:
          'Hosting, updates, monitoring, and content changes, plus search and performance reviews. It stays optional, and you keep ownership of the domain, site, and connected accounts whether or not you keep me on.',
      },
      {
        question: 'How do we decide what to improve next?',
        answer:
          'We look at what customers actually do on the site rather than what either of us assumes. I bring the numbers and a short list of options, you pick one, and we measure whether it moved.',
      },
    ],
  },
];

export function getServicePath(id: string): ServicePath | undefined {
  return servicePaths.find((path) => path.id === id);
}
