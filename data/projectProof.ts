export interface ProjectProof {
  id: string;
  name: string;
  location: string;
  result: string;
  screenshot: string;
  screenshotAlt: string;
  logo: string;
  href: string;
  liveUrl: string;
  canvasColor: string;
  inkColor: string;
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
    href: '/case-studies/second-line-psychiatry',
    liveUrl: 'https://www.secondlinepsychiatry.com/',
    canvasColor: '#DCE9F2',
    inkColor: '#16324A',
  },
  {
    id: 'nola-pool-solutions',
    name: 'NOLA Pool Solutions',
    location: 'New Orleans metro',
    result: '30% customer acquisition growth',
    screenshot: 'work/client-logos/nps-project.png',
    screenshotAlt: 'NOLA Pool Solutions homepage shown inside a laptop frame',
    logo: 'work/client-logos/logo.png',
    href: '/case-studies/nola-pool-solutions',
    liveUrl: 'https://nolapoolsolutions.com/',
    canvasColor: '#DDEDF1',
    inkColor: '#0B3954',
  },
  {
    id: 'nealy-events',
    name: 'Nealy Event Decor',
    location: 'Dallas, Texas',
    result: '2x consultation requests',
    screenshot: 'work/client-logos/nealy-project.png',
    screenshotAlt: 'Nealy Event Decor homepage shown inside a laptop frame',
    logo: 'work/client-logos/NealyLogo.png',
    href: '/case-studies/nealy-events',
    liveUrl: 'https://nealyevents.com/',
    canvasColor: '#EEE6F2',
    inkColor: '#3F2B5B',
  },
  {
    id: 'djn-services',
    name: 'DJN Services',
    location: 'North Alabama',
    result: 'Website launched in 2 weeks',
    screenshot: 'work/client-logos/djn-new-home-page.png',
    screenshotAlt: 'DJN Services homepage shown inside a laptop frame',
    logo: 'work/client-logos/djn-logo.webp',
    href: '/case-studies/djn-services',
    liveUrl: 'https://djnservices.com/',
    canvasColor: '#E7E0D7',
    inkColor: '#2C2119',
  },
];
