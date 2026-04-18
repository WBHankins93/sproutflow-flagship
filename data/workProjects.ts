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
  backgroundImage?: string; // Path to project background image
}

export const workProjects: WorkProject[] = [
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
    backgroundImage: 'work/client-logos/nealy-project.png',
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
    backgroundImage: 'work/client-logos/second-line-project.png',
  },
  {
    id: 'nola-pool-solutions',
    title: 'NOLA Pool Solutions',
    client: 'NOLA Pool Solutions · New Orleans Metro',
    status: 'Live',
    description:
      'Shaping a premium maintenance and renovation experience for the New Orleans metro area, emphasizing trust, licensing, and rapid quoting.',
    url: 'https://nolapoolsolutions.com/',
    services: ['Positioning', 'Service Packaging', 'Lead Capture'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlight:
      'A lead funnel built for rapid quoting.',
    gradient: ['#0B2447', '#19376D', '#A5D7E8'],
    logo: 'work/client-logos/logo.png',
    backgroundImage: 'work/client-logos/nps-project.png',
  },
  {
    id: 'big-butt-association',
    title: 'Big Butt Association',
    client: 'Big Butt Association · EDM Festival Brand',
    status: 'Live',
    description:
      'Designed an edgy, neon-drenched e-commerce experience for an EDM festival clothing brand that celebrates bold style and festival culture with a distinctive toxic green aesthetic.',
    url: 'https://bigbuttassociation.com/',
    services: ['Brand Identity', 'E-commerce Design', 'Visual Design'],
    tech: ['Shopify Liquid', 'JavaScript', 'CSS', 'Shopify'],
    highlight:
      'Where bass meets booty and style meets statement.',
    gradient: ['#00FF00', '#FFD700', '#9D4EDD'],
    logo: 'work/client-logos/bekky-no-background.png',
    backgroundImage: 'work/client-logos/bba-homepage.png',
  },
  {
    id: 'personal-portfolio',
    title: 'Ben Hankins Portfolio',
    client: 'Personal Project · New Orleans, LA',
    status: 'Live',
    description:
      'A bold, dark-themed personal portfolio with neon green accents showcasing 6+ years of building customer-facing applications across enterprise architecture and production reliability.',
    url: 'https://benhankins.vercel.app/',
    services: ['Creative Direction', 'Visual Design', 'Content Strategy'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlight:
      'The project that sparked Sproutflow.',
    gradient: ['#0A0A0A', '#1A1A1A', '#00FF41'],
    logo: 'work/client-logos/b-logo-back-removed.png',
    backgroundImage: 'work/client-logos/benhankins-project.png',
  },
  {
    id: 'djn-services',
    title: 'DJN Services LLC',
    client: 'DJN Services LLC · North Alabama',
    status: 'Live',
    description:
      'A rugged, high-contrast site for a welding, hauling, and removal company built around fast response, clear pricing, and same-day scheduling for residential and commercial clients.',
    url: 'https://djnservices.com/',
    services: ['Web Design', 'Brand Positioning', 'Lead Capture'],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    highlight:
      'Reliable work. Built to last.',
    gradient: ['#1A1A1A', '#FF6B00', '#FF8C00'],
    logo: 'work/client-logos/djn-logo.webp',
    backgroundImage: 'work/client-logos/djn-project.png',
  },
];


