// components/sections/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin, UserRound, CheckCircle2 } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';

export default function HeroSection() {
  return (
    <>
      {/* Full-Screen Image Hero */}
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden md:min-h-screen">
        
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

        {/* Hero Content - Centered, with vertical padding so badges and the scroll
            indicator never touch the header or the section below on any viewport */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 text-center sm:py-16 md:px-8 md:py-24">
          
          {/* Trust Badges - Floating above headline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 flex flex-wrap justify-center gap-2 md:mb-12 md:gap-4"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md md:px-4">
              <MapPin className="w-4 h-4 text-accent-600" />
              <span className="text-xs font-semibold text-gray-800 sm:text-sm md:text-base">New Orleans based</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md md:px-4">
              <UserRound className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-semibold text-gray-800 sm:text-sm md:text-base">Founder-led from start to launch</span>
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
            className="mx-auto mb-5 max-w-[22rem] text-3xl font-bold leading-[1.08] text-white sm:max-w-2xl sm:text-4xl md:mb-8 md:max-w-full md:text-6xl lg:text-7xl"
            style={{
              textShadow: '4px 4px 20px rgba(0,0,0,0.9), 2px 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'
            }}
          >
            Websites that win the right clients—and systems that make growth easier.
          </motion.h1>

          {/* Value Proposition */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mb-8 max-w-[21rem] text-base font-semibold leading-relaxed text-white sm:max-w-2xl sm:text-lg md:mb-10 md:max-w-3xl md:text-xl lg:text-2xl"
            style={{
              textShadow: '3px 3px 12px rgba(0,0,0,0.9), 1px 1px 6px rgba(0,0,0,0.8)'
            }}
          >
            Sproutflow designs and builds custom websites, CRMs, admin tools, and automation for small businesses. One partner from the first strategy call through launch and support.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8 md:mb-12"
          >
            <a
              href="/inquiry"
              className="group inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-base font-bold text-text-primary shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl sm:w-auto md:px-14 md:py-5 md:text-xl"
            >
              Tell us about your project
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <p
              className="mt-5 text-base md:text-lg text-white/95 font-medium"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}
            >
              Takes 3–5 minutes. We reply within one business day.
            </p>
            <div className="mx-auto mt-6 flex max-w-xs flex-col items-start gap-2 text-left text-sm text-white/95 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:text-center">
              {['Win more qualified inquiries', 'Cut repeat admin work', 'Own what we build'].map((point) => (
                <div key={point} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-200" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/90">
              <a href="/case-studies" className="hover:text-white underline underline-offset-4">
                See client results
              </a>
              <span aria-hidden>•</span>
              <a href="/work" className="hover:text-white underline underline-offset-4">
                View our work
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      
    </>
  );
}
