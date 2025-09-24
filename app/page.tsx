// app/page.tsx - Professional Studio Homepage

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import ProcessSection from '@/components/sections/ProcessSection'
// import PortfolioSection from '../components/sections/PortfolioSection'
// import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <ServicesSection />
      
      <AboutSection />
      
      <ProcessSection />
      {/* <PortfolioSection /> */}
      {/* <ContactSection /> */}
    </>
  )
}