export interface ProjectProof {
  id: string;
  name: string;
  location: string;
  result: string;
  screenshot: string;
  screenshotAlt: string;
  logo: string;
  /** Intrinsic aspect ratio (width / height) of the logo artwork. */
  logoAspect: number;
  /**
   * Optical size correction, multiplied against the logo box height.
   * Square badges read far heavier than wide wordmarks at equal height, so
   * they are scaled down. Tuned by eye, not by aspect ratio maths.
   */
  logoScale?: number;
  href: string;
  liveUrl: string;
  canvasColor: string;
  inkColor: string;
  industry: string;
  filterTags: string[];
  status: 'Live' | 'In progress';
  scope: string[];
  summary: string;
  listed?: boolean;
}

export const projectProof: ProjectProof[] = [
  {
    id: 'second-line-psychiatry',
    name: 'Second Line Psychiatry',
    location: 'New Orleans, Louisiana',
    result: '50% more qualified inquiries',
    screenshot: 'work/client-logos/second-line-project.png',
    screenshotAlt: 'Second Line Psychiatry homepage shown inside a laptop frame',
    logo: 'work/client-logos/second-line.png',
    logoAspect: 3.92,
    href: '/case-studies/second-line-psychiatry',
    liveUrl: 'https://www.secondlinepsychiatry.com/',
    canvasColor: '#DCE9F2',
    inkColor: '#16324A',
    industry: 'Professional practice',
    filterTags: ['Websites', 'Systems', 'Ongoing care'],
    status: 'Live',
    scope: ['Web design', 'Booking flow', 'Accessibility'],
    summary:
      'A trauma-informed website and booking path that helps families understand the practice before the first call.',
  },
  {
    id: 'nola-pool-solutions',
    name: 'NOLA Pool Solutions',
    location: 'New Orleans metro',
    result: '30% customer acquisition growth',
    screenshot: 'work/client-logos/nps-project.png',
    screenshotAlt: 'NOLA Pool Solutions homepage shown inside a laptop frame',
    logo: 'work/client-logos/logo.png',
    logoAspect: 1.0,
    logoScale: 0.86,
    href: '/case-studies/nola-pool-solutions',
    liveUrl: 'https://nolapoolsolutions.com/',
    canvasColor: '#DDEDF1',
    inkColor: '#0B3954',
    industry: 'Service business',
    filterTags: ['Websites', 'Systems', 'Ongoing care'],
    status: 'Live',
    scope: ['Web design', 'Lead capture', 'Local SEO'],
    summary: 'A service site and intake flow built to collect useful quote details before the owner calls back.',
  },
  {
    id: 'nealy-events',
    name: 'Nealy Event Decor',
    location: 'Dallas, Texas',
    result: '2x consultation requests',
    screenshot: 'work/client-logos/nealy-project.png',
    screenshotAlt: 'Nealy Event Decor homepage shown inside a laptop frame',
    logo: 'work/client-logos/NealyLogo.png',
    logoAspect: 1.0,
    logoScale: 0.88,
    href: '/case-studies/nealy-events',
    liveUrl: 'https://nealyevents.com/',
    canvasColor: '#EEE6F2',
    inkColor: '#3F2B5B',
    industry: 'Creative service',
    filterTags: ['Websites', 'Systems'],
    status: 'Live',
    scope: ['Web design', 'CMS', 'Conversion strategy'],
    summary: 'An editorial showcase and self-managed inventory system for a luxury event fabrication studio.',
  },
  {
    id: 'djn-services',
    name: 'DJN Services',
    location: 'North Alabama',
    result: 'Website launched in 2 weeks',
    screenshot: 'work/client-logos/djn-new-home-page.png',
    screenshotAlt: 'DJN Services homepage shown inside a laptop frame',
    logo: 'work/client-logos/djn-logo.webp',
    logoAspect: 1.78,
    logoScale: 0.95,
    href: '/case-studies/djn-services',
    liveUrl: 'https://djnservices.com/',
    canvasColor: '#E7E0D7',
    inkColor: '#2C2119',
    industry: 'Service business',
    filterTags: ['Websites', 'Systems'],
    status: 'Live',
    scope: ['Web design', 'Positioning', 'Lead capture'],
    summary:
      'A fast rebuild that makes twenty years of field experience visible and captures quote details while the owner works.',
  },
  {
    id: 'big-butt-association',
    name: 'Big Butt Association',
    location: 'Online apparel brand',
    result: 'Custom Shopify storefront',
    screenshot: 'work/client-logos/bba-homepage.png',
    screenshotAlt: 'Big Butt Association Shopify homepage shown inside a browser frame',
    logo: 'work/client-logos/bekky-no-background.png',
    logoAspect: 1.0,
    logoScale: 0.86,
    href: '/case-studies/big-butt-association',
    liveUrl: 'https://bigbuttassociation.com/',
    canvasColor: '#F4D8E9',
    inkColor: '#5E2147',
    industry: 'Independent brand',
    filterTags: ['Shopify'],
    status: 'Live',
    scope: ['Shopify', 'E-commerce design', 'Brand system'],
    summary: 'A custom Shopify storefront built around the energy and visual language of the brand.',
    listed: false,
  },
];

export const listedProjectProof = projectProof.filter((project) => project.listed !== false);
