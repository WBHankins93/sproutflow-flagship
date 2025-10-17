import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      {/* 1. Hero - First impression */}
      <HeroSection />
      
      {/* 2. Portfolio - MOVED UP - Show work first */}
      <PortfolioSection />
      
      {/* 3. Services - Clear pricing */}
      <ServicesSection />
      
      {/* 4. Process - How we work */}
      <ProcessSection />
      
      {/* 5. About - Build connection */}
      <AboutSection />
      
      {/* 6. Contact - Convert */}
      <ContactSection />
    </>
  )
}