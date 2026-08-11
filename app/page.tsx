// app/page.tsx

import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import WorktableSection from '@/components/sections/WorktableSection';
import HomeTestimonialsSection from '@/components/sections/HomeTestimonialsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Websites & Business Systems | Sproutflow Studio - New Orleans Web Design',
  },
  description:
    'Sproutflow Studio builds custom websites, CRMs, admin tools, and workflow automation for small businesses in New Orleans. Clear scope, fixed quotes, and founder-led delivery.',
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
    <>
      <HeroSection />
      <WorktableSection />
      <HomeTestimonialsSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
