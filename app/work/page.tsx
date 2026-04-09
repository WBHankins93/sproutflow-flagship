import type { Metadata } from 'next';
import WorkPageClient from './WorkPageClient';

export const metadata: Metadata = {
  title: 'Web Design Portfolio | Small Business Website Examples | Sproutflow Studio',
  description:
    'Explore live website projects built for small businesses. See examples of conversion-focused web design, strategy, and development by Sproutflow Studio.',
  keywords: [
    'web design portfolio',
    'small business website examples',
    'web design case studies',
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
