import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'See Sproutflow Studio’s concise, founder-led process for planning, designing, building, launching, and supporting client work.',
  alternates: {
    canonical: '/#process',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HowWeWorkRedirect() {
  permanentRedirect('/#process');
}
