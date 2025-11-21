// data/workProjects.ts - Sproutflow Work Showcase

export type ProjectStatus = 'Live' | 'In Progress';

export interface WorkProject {
  id: string;
  title: string;
  client: string;
  location?: string;
  status: ProjectStatus;
  description: string;
  url: string;
  services: string[];
  tech: string[];
  highlight?: string;
  gradient: [string, string, string?];
  logo?: string; // Path to client logo image
}

export const workProjects: WorkProject[] = [
  {
    id: 'personal-portfolio',
    title: 'Ben Hankins Portfolio',
    client: 'Personal Project · New Orleans, LA',
    status: 'Live',
    description:
      'First end-to-end build that paired storytelling with motion to launch my personal brand online and experiment with modern UI patterns.',
    url: 'https://benhankins.vercel.app/',
    services: ['Creative Direction', 'Visual Design', 'Content Strategy'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlight:
      'The project that sparked Sproutflow.',
    gradient: ['#163323', '#22543D', '#5BA461'],
    logo: 'work/client-logos/b-logo-back-removed.png',
  },
  {
    id: 'second-line-psychiatry',
    title: 'Second Line Psychiatry',
    client: 'Second Line Psychiatry · New Orleans, LA',
    status: 'Live',
    description:
      'Built a trauma-informed telehealth presence inspired by New Orleans second line traditions to guide families through compassionate care decisions.',
    url: 'https://www.secondlinepsychiatry.com/',
    services: ['Web Design', 'Copy Refinement', 'Accessibility'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlight:
      'Privacy-first design that honors New Orleans culture.',
    gradient: ['#0F172A', '#334155', '#60A5FA'],
    logo: 'work/client-logos/second-line.png',
  },
  {
    id: 'nealy-event-decor',
    title: 'Nealy Event Decor',
    client: 'Nealy Event Decor · Dallas, TX',
    status: 'Live',
    description:
      'Designed a luxury fabrication showcase with editorial gallery layouts that highlight bespoke arches, bars, and premium rentals for high-end events.',
    url: 'https://nealyevents.com/',
    services: ['Creative Direction', 'CMS Setup', 'Conversion Strategy'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlight:
      'Turns visual storytelling into qualified leads.',
    gradient: ['#3F2B96', '#A8C0FF', '#F8E7F6'],
    logo: 'work/client-logos/NealyLogo.png',
  },
  {
    id: 'nola-pool-solutions',
    title: 'NOLA Pool Solutions',
    client: 'NOLA Pool Solutions · Gulf South',
    status: 'In Progress',
    description:
      'Shaping a premium maintenance and renovation experience tailored to the Gulf South climate, emphasizing trust, licensing, and rapid quoting.',
    url: 'https://nolapoolsolutions.com/',
    services: ['Positioning', 'Service Packaging', 'Lead Capture'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlight:
      'A lead funnel built for rapid quoting.',
    gradient: ['#0B2447', '#19376D', '#A5D7E8'],
    logo: 'work/client-logos/logo.png',
  },
  {
    id: 'bekky-community',
    title: 'Bekky Community Platform',
    client: 'Bekky · Festival Membership Brand',
    status: 'In Progress',
    description:
      'Building a playful, perks-driven community hub that channels festival energy into adventures, galleries, and membership rewards with Bekky Bucks.',
    url: 'https://bekky.vercel.app/',
    services: ['Experience Design', 'Member Journey', 'UI Implementation'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlight:
      'Reusable components that keep the purple personality.',
    gradient: ['#3B0CA2', '#7F2AEF', '#F58EE5'],
    logo: 'work/client-logos/bekky-no-background.png',
  },
];


