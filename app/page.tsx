// app/page.tsx - The v3 homepage: find the leaks, fix the site, book the work,
// and keep it working. Ten sections from components/home (DIRECTION.md §3 as
// amended by §8). Every price comes from data/catalog.ts.

import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import BenSection from '@/components/home/BenSection';
import BookSection from '@/components/home/BookSection';
import CareSection from '@/components/home/CareSection';
import CheckTeaser from '@/components/home/CheckTeaser';
import HomeHero from '@/components/home/HomeHero';
import OfferMenu from '@/components/home/OfferMenu';
import OwnSiteSection from '@/components/home/OwnSiteSection';
import ProofStrip from '@/components/home/ProofStrip';
import TrustStrip from '@/components/home/TrustStrip';
import WorkSection from '@/components/home/WorkSection';

export const metadata: Metadata = {
  title: {
    absolute: 'Websites, Lead Systems and Care for Small Businesses | Sproutflow Studio',
  },
  description:
    'Find the leaks. Fix the site. Book the work. Ben Hankins finds where your website loses customers, fixes it at a fixed price and keeps it working. Based in New Orleans, working with businesses anywhere.',
  keywords: [
    'small business website design',
    'website rescue',
    'website redesign for small business',
    'lead capture and follow-up',
    'custom business software',
    'website care plan',
    'free website check',
    'web designer New Orleans',
    'web design New Orleans',
  ],
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ProofStrip />
      <CheckTeaser />
      <OfferMenu />
      <CareSection />
      <WorkSection />
      <OwnSiteSection />
      <BenSection />
      <BookSection />
      <Footer />
    </>
  );
}
