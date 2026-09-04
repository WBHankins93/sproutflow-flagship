export interface DemoScreenshot {
  src: string;
  alt: string;
}

export interface Demo {
  id: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  screenshots: DemoScreenshot[];
}

/**
 * Sproutflow's own products, shown alongside client case studies as proof of
 * business-systems capability. Neither is a client engagement: ClipBoard is
 * Ben's white-label rebuild of a system originally built for an NDA'd
 * client (the client stays unnamed; the tool itself carries no NDA), and
 * the Growth Desk is the internal tool Ben uses to run Sproutflow's own
 * pipeline. Screenshots are the public demo environments, sample data only.
 */
export const demos: Demo[] = [
  {
    id: 'clipboard',
    name: 'ClipBoard',
    eyebrow: "Sproutflow's own product",
    tagline: 'Multi-location scheduling and revenue tracking',
    description:
      'A booking and operations system for service businesses running more than one location: staff schedules, guest history, and revenue by site in one dashboard.',
    screenshots: [
      { src: 'demos/clipboard-overview.png', alt: 'ClipBoard revenue and bookings overview dashboard' },
      { src: 'demos/clipboard-schedule.png', alt: 'ClipBoard weekly booking schedule across locations' },
      { src: 'demos/clipboard-salons.png', alt: 'ClipBoard multi-location revenue cards' },
    ],
  },
  {
    id: 'growth-desk',
    name: 'Growth Desk',
    eyebrow: "Ben's internal tool",
    tagline: 'How Sproutflow runs its own client pipeline',
    description:
      'The system Ben uses to run Sproutflow itself: prospect pipeline, invoicing, and active project tracking in one private workspace.',
    screenshots: [
      { src: 'demos/admin-dashboard.png', alt: 'Growth Desk dashboard with client and invoice metrics' },
      { src: 'demos/admin-pipeline.png', alt: 'Growth Desk prospecting pipeline and workflow funnel' },
      { src: 'demos/admin-projects.png', alt: 'Growth Desk active projects list' },
    ],
  },
];
