// components/sections/HeroSection.tsx - Enterprise Psychology + Small Business Heart

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, TrendingUp } from 'lucide-react';
import { Container, Heading, BodyText, Button } from '../layout/StudioLayout';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-nature-50/30 to-neutral-50/40">
      
      {/* Sophisticated Background Pattern - Subtle Enterprise Feel */}
      <div className="absolute inset-0">
        {/* Organic flow patterns - professional but warm */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
          <svg viewBox="0 0 1200 800" className="w-full h-full">
            <path
              d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
              fill="currentColor"
              className="text-primary-500"
            />
          </svg>
        </div>
        
        {/* Subtle grid for professional credibility */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(95, 117, 94, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(95, 117, 94, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '60px 60px'
             }}
        />
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Trust Indicators - Enterprise Psychology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2 text-text-muted">
              <Star className="w-5 h-5 fill-accent-500 text-accent-500" />
              <span className="text-sm font-medium">Enterprise-Grade Design</span>
            </div>
            <div className="w-px h-4 bg-nature-300" />
            <div className="flex items-center gap-2 text-text-muted">
              <Award className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-medium">Small Business Focused</span>
            </div>
            <div className="w-px h-4 bg-nature-300" />
            <div className="flex items-center gap-2 text-text-muted">
              <TrendingUp className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-medium">$750-$5K Investment</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column - Sophisticated Typography Hierarchy */}
            <div className="lg:col-span-7">
              
              {/* Main Headline - Enterprise Impact */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mb-8"
              >
                <Heading 
                  level={1} 
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[0.9] tracking-tight mb-6"
                >
                  <span className="text-text-primary">Your small business</span>
                  <br />
                  <span className="text-primary-600 relative">
                    deserves to compete
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 h-1 bg-accent-500/40 rounded-full"
                    />
                  </span>
                  <br />
                  <span className="text-text-primary">with the big leagues</span>
                </Heading>
              </motion.div>

              {/* Empowering Subheading - Small Business Heart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="mb-8"
              >
                <BodyText 
                  size="lg" 
                  className="text-xl md:text-2xl leading-relaxed text-text-secondary max-w-2xl"
                >
                  We bring Fortune 500-level design psychology to small businesses. 
                  Because when customers judge you in 50 milliseconds, 
                  <strong className="text-text-primary font-semibold"> you deserve every advantage</strong>.
                </BodyText>
              </motion.div>

              {/* Value Proposition - Professional yet Accessible */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                className="mb-10"
              >
                <BodyText className="text-text-muted max-w-xl">
                  Professional websites that signal credibility, build trust, and convert visitors into customers. 
                  No corporate bureaucracy. No impossible budgets. Just results that help you compete.
                </BodyText>
              </motion.div>

              {/* Strategic CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  variant="primary"
                  size="lg"
                  href="#contact"
                  icon={<ArrowRight className="w-5 h-5" />}
                  className="group shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <span>Let's Level the Playing Field</span>
                </Button>
                
                <Button 
                  variant="secondary"
                  size="lg"
                  href="#portfolio"
                  className="group"
                >
                  <span>See Small Business Transformations</span>
                </Button>
              </motion.div>
            </div>

            {/* Right Column - Visual Credibility */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="relative"
              >
                
                {/* Sophisticated Card Grid - Shows Transformation */}
                <div className="grid grid-cols-1 gap-6">
                  
                  {/* Before/After Concept Card */}
                  <div className="bg-white rounded-lg border border-nature-200 p-6 shadow-soft">
                    <div className="grid grid-cols-2 gap-4">
                      
                      {/* "Before" Side */}
                      <div className="text-center">
                        <div className="text-text-muted text-sm font-medium mb-3">Typical Small Business</div>
                        <div className="bg-neutral-100 rounded p-3 mb-3 border-2 border-dashed border-neutral-300">
                          <div className="h-2 bg-neutral-300 rounded mb-2"></div>
                          <div className="h-1 bg-neutral-300 rounded mb-1"></div>
                          <div className="h-1 bg-neutral-300 rounded w-3/4"></div>
                        </div>
                        <div className="text-xs text-text-muted">DIY Template Look</div>
                      </div>

                      {/* "After" Side */}
                      <div className="text-center">
                        <div className="text-primary-600 text-sm font-medium mb-3">With Sproutflow</div>
                        <div className="bg-gradient-to-br from-primary-50 to-white rounded p-3 mb-3 border border-primary-200 shadow-sm">
                          <div className="h-2 bg-primary-500 rounded mb-2"></div>
                          <div className="h-1 bg-primary-300 rounded mb-1"></div>
                          <div className="h-1 bg-primary-300 rounded w-4/5"></div>
                        </div>
                        <div className="text-xs text-primary-600 font-medium">Professional Presence</div>
                      </div>
                    </div>
                  </div>

                  {/* Results Metrics Card */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white shadow-nature">
                    <div className="text-primary-100 text-sm font-medium mb-3">Average Impact</div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">3x</div>
                        <div className="text-xs text-primary-100">Credibility</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">65%</div>
                        <div className="text-xs text-primary-100">More Inquiries</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">2.4x</div>
                        <div className="text-xs text-primary-100">Conversions</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Animation Elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-accent-500/20 rounded-full blur-sm"
                />
                
                <motion.div
                  animate={{ 
                    rotate: [0, -3, 3, 0],
                    scale: [1, 0.98, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary-500/10 rounded-full blur-md"
                />
              </motion.div>
            </div>
          </div>

          {/* Social Proof - Small Business Success Stories */}
          
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;