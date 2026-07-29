// app/page.tsx

import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TrustBarSection from '@/components/sections/TrustBarSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import BusinessSystemsSection from '@/components/sections/BusinessSystemsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import MobileProjectBar from '@/components/layout/MobileProjectBar';

export const metadata: Metadata = {
  title: {
    absolute: 'Custom Websites & Business Systems | Sproutflow Studio - New Orleans Web Design',
  },
  description:
    'Websites that help good businesses win more work. Clear scope, published starting prices, and founder-led delivery from New Orleans.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <ServicesSection />
      <BusinessSystemsSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <MobileProjectBar />
    </>
  );
}
