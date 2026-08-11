import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Work & Results',
  description:
    'Browse live Sproutflow Studio client work, attributed results, and deeper project stories in one focused portfolio.',
  alternates: {
    canonical: '/work',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CaseStudiesRedirect() {
  permanentRedirect('/work');
}
