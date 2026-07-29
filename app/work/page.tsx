import type { Metadata } from 'next';
import WorkPageClient from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Web Design Portfolio',
  description:
    'Live websites built for real small businesses by Sproutflow Studio in New Orleans: telehealth, trades, events, e-commerce, and more. Every site is in production and working for its owner.',
  keywords: [
    'web design portfolio',
    'small business website examples',
    'New Orleans web design portfolio',
    'conversion focused web design',
  ],
  alternates: {
    canonical: '/work',
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
