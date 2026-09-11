export interface Tier {
  id: string;
  name: string;
  tagline: string;
  goodFit: string;
  price: string;
  priceNote: string;
  includes: string[];
}

/**
 * Three concrete ways to begin. The audit diagnoses the handoff, the fixed
 * build installs the core system, and ongoing care keeps a live system healthy.
 * Prices are starting points; scope and the fixed quote are still written
 * before any work begins.
 */
export const tiers: Tier[] = [
  {
    id: 'lead-flow-audit',
    name: 'Lead Flow Audit',
    tagline: 'Find where good inquiries get lost',
    goodFit: 'For a business that knows follow-up is inconsistent but does not yet know what to change.',
    price: '$500',
    priceNote: 'fixed, credited toward a build',
    includes: [
      'Map the path from inquiry to booked work',
      'Review the tools and handoffs in use now',
      'Identify the highest-cost gaps',
      'Receive a prioritized plan and fixed build quote',
    ],
  },
  {
    id: 'lead-capture-system',
    name: 'Lead Capture & Follow-Up System',
    tagline: 'Give every inquiry a clear next step',
    goodFit: 'For a service business losing time or revenue between first contact, estimate, scheduling, and follow-up.',
    price: 'From $3,500',
    priceNote: 'fixed scope and 30 days of launch support',
    includes: [
      'Capture leads from the channels you already use',
      'Clean, qualify, assign, and track each inquiry',
      'Automate acknowledgments and follow-up reminders',
      'Add a practical pipeline view, training, and handoff',
    ],
  },
  {
    id: 'system-care',
    name: 'Ongoing System Care',
    tagline: 'Keep the workflow healthy after launch',
    goodFit: 'For a business that wants one accountable person watching the system and improving it with evidence.',
    price: 'From $450/mo',
    priceNote: 'optional after a build',
    includes: [
      'Monitor integrations and failed automations',
      'Maintain credentials, APIs, and connected tools',
      'Review lead flow and response performance',
      'Make small fixes and planned improvements',
    ],
  },
];
