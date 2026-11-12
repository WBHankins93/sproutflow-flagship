import type { ServicePathId } from './servicePaths';

export const projectResponsibilities = [
  { title: 'What I need from you', body: 'Share your business goals, existing content, photographs, and account access. Name one person to collect feedback and approve the direction, working version, and launch. We agree on content deadlines and review rounds in the quote.' },
  { title: 'What I handle', body: 'I turn the agreed scope into the design, build, testing, and handoff. You review working pieces at agreed checkpoints; you do not need to manage the technical implementation. The project plan sets the update schedule and decisions needed from you.' },
];

export const supportScope = 'Before care begins, we need to agree in writing on the systems monitored, who receives failure alerts, response expectations, reporting frequency, and the allowance for fixes or improvements. We also need to identify separate software and hosting charges and a handoff plan if I am unavailable. Coverage depends on that agreement; the starting price alone does not define it.';

export const serviceOfferDetails: Record<ServicePathId, { title: string; intro: string; items: { title: string; body: string }[] }> = {
  websites: {
    title: 'Website Rescue or a custom project?',
    intro: 'Choose the scope around what your customers need. The $1,500 Rescue offer is a focused five-page website, not a price for every website project.',
    items: [
      { title: 'Website Rescue · $1,500', body: 'For a missing or broken contractor or home-service website: five pages on your existing domain, a quote form, Google Business Profile cleanup, and a mobile-first build. The stated 10-business-day launch window starts after your content arrives.' },
      { title: 'Custom website · quoted to scope', body: 'For work beyond Rescue, such as a different content structure, CMS, Shopify store, or connected booking and intake tools. We define the pages and integrations first, then agree a fixed quote.' },
      { title: 'What the quote settles', body: 'You provide the business information, approved copy, images, and account access unless content work is included in the quote. The quote lists review rounds, content help, launch support, exclusions, and any domain, hosting, or software charges. Extra pages, commerce, and custom integrations are separately scoped.' },
    ],
  },
  'business-systems': {
    title: 'See the handoffs before you buy the build.',
    intro: 'An illustrative workflow for a service business follows below. It is an example to discuss, not a client result or a promise that every integration is included.',
    items: [
      { title: '1. Capture and acknowledge', body: 'A customer requests a quote. Their contact and job details enter a lead record, and an acknowledgment explains the next step.' },
      { title: '2. Assign and follow up', body: 'The inquiry is assigned to someone on your team. A reminder flags unanswered leads, and the team records an estimate and next action.' },
      { title: '3. Book and review', body: 'The team records the booking or reason the lead did not proceed. A pipeline view makes open inquiries and missing follow-up visible.' },
      { title: 'What the $500 audit delivers', body: 'A map of the current inquiry-to-booking path, a review of the tools and handoffs, a prioritized gap list, and a plan with a fixed build quote. For example, the plan might identify an unassigned inquiry and recommend an owner and reminder. This is an illustrative deliverable outline, not a completed client audit.' },
      { title: 'Agree the scope before starting', body: 'The audit fee is credited toward a build. Confirm the credit application and audit delivery date in the written agreement. The system starts at $3,500; channels, integrations, data migration, and workflow complexity determine the fixed quote. It specifies the 30 days of launch support and any separate software charges.' },
    ],
  },
  'growth-support': {
    title: 'Know what care covers.',
    intro: 'Ongoing System Care starts at $450/month and is optional after a build. Website support is scoped around the site and services you actually need.',
    items: [
      { title: 'Coverage agreed in writing', body: supportScope },
      { title: 'Your role after launch', body: 'Keep business details and team access current, report issues you notice, and approve priorities for planned changes. The agreed care plan determines which routine checks and updates I handle independently.' },
    ],
  },
};
