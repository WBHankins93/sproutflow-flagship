// app/page.tsx

import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TrustBarSection from '@/components/sections/TrustBarSection';
import HomeTestimonialsSection from '@/components/sections/HomeTestimonialsSection';
import ValuePropsSection from '@/components/sections/ValuePropsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import BusinessSystemsSection from '@/components/sections/BusinessSystemsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Websites & Business Systems | Sproutflow Studio - New Orleans Web Design',
  },
  description:
    'Sproutflow Studio builds custom websites and the business systems behind them for small businesses in New Orleans, LA. Custom Next.js sites, internal admin tools, CRMs, and workflow automation. Enterprise-grade engineering, priced for small business.',
  keywords: [
    'web design New Orleans',
    'website design New Orleans',
    'custom website development New Orleans',
    'small business web design New Orleans',
    'custom software development New Orleans',
    'CRM for small business New Orleans',
    'business automation New Orleans',
    'New Orleans web designer',
    'local web design New Orleans',
    'business website New Orleans',
  ],
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBarSection />
      <HomeTestimonialsSection />
      <ValuePropsSection />
      <ProcessSection />
      <BusinessSystemsSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
