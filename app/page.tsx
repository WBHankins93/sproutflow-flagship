// app/page.tsx - Professional Studio Homepage

import React from 'react'
import HeroSection from '../components/sections/HeroSection'
import ServicesSection from '../components/sections/ServicesSection'
// Import additional sections as we create them
// import AboutSection from '../components/sections/AboutSection'
// import ProcessSection from '../components/sections/ProcessSection'
// import PortfolioSection from '../components/sections/PortfolioSection'
// import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      {/* Professional Hero Section */}
      <HeroSection />
      
      {/* Strategic Services Section */}
      <ServicesSection />
      
      {/* Additional sections will be added as we create them */}
      {/* <AboutSection /> */}
      {/* <ProcessSection /> */}
      {/* <PortfolioSection /> */}
      {/* <ContactSection /> */}
    </>
  )
}