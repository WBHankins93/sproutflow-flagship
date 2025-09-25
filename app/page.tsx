// app/page.tsx - Professional Studio Homepage

import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import ProcessSection from '@/components/sections/ProcessSection'
import PortfolioSection from '../components/sections/PortfolioSection'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      {/* 1. FIRST IMPRESSION: Professional impact */}
      <HeroSection />
      
      {/* 2. EMPATHY & TRUST: We understand small business challenges */}
      <AboutSection />
      
      {/* 3. METHODOLOGY: Here's how we'll work together */}
      <ProcessSection />
      
      {/* 4. PROOF: Here's evidence it works */}
      <PortfolioSection />
      
      {/* 5. INVESTMENT: Now that you're confident, here's how to get started */}
      <ServicesSection />
      
      {/* 6. CONVERSATION: Multiple ways to connect */}
      <ContactSection />
    </>
  )
}