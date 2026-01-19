// app/page.tsx - FIXED VERSION

import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Professional Web Design in New Orleans, LA | Custom Websites for Small Businesses',
  description: 'Professional web design and development for small businesses in New Orleans, LA. Enterprise-level strategy with small business heart. Local web design services.',
  keywords: [
    'web design New Orleans',
    'website design New Orleans',
    'custom website development New Orleans',
    'small business web design New Orleans',
    'professional website design New Orleans',
    'New Orleans web designer',
    'local web design New Orleans',
    'business website New Orleans',
    'responsive web design New Orleans',
    'SEO web design New Orleans'
  ],
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <PortfolioSection /> */}
      <ProcessSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}