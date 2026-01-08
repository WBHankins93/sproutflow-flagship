// components/sections/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
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
              <span className="text-yellow-500 text-lg">⭐</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">Enterprise-Grade Design</span>
            </div>
            <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
              <span className="text-green-600 text-lg">💡</span>
              <span className="font-semibold text-gray-800 text-sm md:text-base">Small Business Focused</span>
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
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-6 md:mb-8"
            style={{
              textShadow: '4px 4px 20px rgba(0,0,0,0.9), 2px 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'
            }}
          >
            Your small business
            <br />
            <span className="text-green-300">
              deserves to compete
            </span>
            <br />
            with the big leagues
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
            <br className="hidden md:block" />
            Small business heart. No impossible budgets.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16 md:mb-20"
          >
            <a 
              href="#contact"
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 md:px-14 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
            >
              Let&apos;s get started today!
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
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