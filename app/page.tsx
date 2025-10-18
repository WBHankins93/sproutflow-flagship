// app/page.tsx or wherever you're rendering sections

import HeroSection from '@/components/sections/HeroSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main>
      {/* 1. Emotional Hook */}
      <HeroSection />
      
      {/* 2. Prove Value - Impact Stats are in Hero now */}
      
      {/* 3. Show Results */}
      <PortfolioSection />
      
      {/* 4. How We Work (MOVED UP) */}
      <ProcessSection />
      
      {/* 5. Investment Options (AFTER process) */}
      <ServicesSection />
      
      {/* 6. Meet the Team */}
      <AboutSection />
      
      {/* 7. Final CTA */}
      <ContactSection />
    </main>
  );
}