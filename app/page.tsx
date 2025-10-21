// app/page.tsx - FIXED VERSION

import HeroSection from '@/components/sections/HeroSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      {/* 1. Emotional Hook */}
      <section id="home">
        <HeroSection />
      </section>
      
      {/* 2. Show Results */}
      {/* <section id="work">
        <PortfolioSection />
      </section> */}
      
      {/* 3. How We Work */}
      <section id="process">
        <ProcessSection />
      </section>
      
      {/* 4. Investment Options */}
      <section id="services">
        <ServicesSection />
      </section>
      
      {/* 5. Meet the Team */}
      <section id="about">
        <AboutSection />
      </section>
      
      {/* 6. Final CTA */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}