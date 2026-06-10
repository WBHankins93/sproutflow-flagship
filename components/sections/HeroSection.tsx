// components/sections/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Award, Heart, CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';

export default function HeroSection() {
  return (
    <>
      {/* Full-Screen Image Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={getImageUrl('sprout-hero.jpg')} 
            alt="Growing seedling representing business growth" 
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Sophisticated gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
          {/* Additional vignette for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30"></div>
        </div>

        {/* Hero Content - Centered with mobile top padding to account for header */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-6xl mx-auto pt-32 md:pt-0">
          
          {/* Trust Badges - Floating above headline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
          >
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
              <Award className="w-4 h-4 text-accent-500" />
              <span className="font-semibold text-gray-800 text-sm md:text-base">Enterprise-Level Thinking</span>
            </div>
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
              <Heart className="w-4 h-4 text-primary-600" />
              <span className="font-semibold text-gray-800 text-sm md:text-base">Built for Small Businesses</span>
            </div>
            {/* <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
              <span className="text-blue-600 text-lg">📈</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">$750-$5K Investment</span>
            </div> */}
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 md:mb-8"
            style={{
              textShadow: '4px 4px 20px rgba(0,0,0,0.9), 2px 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'
            }}
          >
            Custom websites and the business systems behind them.
            <br />
            <span className="text-green-300 italic">Built in New Orleans with enterprise-grade engineering, priced for small business.</span>
          </motion.h1>

          {/* Value Proposition */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-3xl text-white font-semibold mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{
              textShadow: '3px 3px 12px rgba(0,0,0,0.9), 1px 1px 6px rgba(0,0,0,0.8)'
            }}
          >
            Your website gets clients in the door. Your systems keep them. We build both - custom Next.js sites, internal admin tools, CRMs, and the automation that connects them.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16 md:mb-20"
          >
            <a
              href="/inquiry"
              className="inline-flex items-center gap-3 bg-white text-text-primary px-10 md:px-14 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
            >
              Book a Discovery Call
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <p
              className="mt-5 text-base md:text-lg text-white/95 font-medium"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            >
              Bring your goals. Leave with a clear plan and a fixed quote.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/95">
              {['Websites that win clients', 'Systems that keep them', 'Automation that saves hours'].map((point) => (
                <div key={point} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-300" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/90">
              <a href="/work" className="hover:text-white underline underline-offset-4">
                View Portfolio
              </a>
              <span aria-hidden>•</span>
              <a href="/case-studies" className="hover:text-white underline underline-offset-4">
                See Client Results
              </a>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-8 h-8 text-white/90" strokeWidth={3} />
            </motion.div>
            
          </motion.div>

        </div>
      </section>

      
    </>
  );
}
