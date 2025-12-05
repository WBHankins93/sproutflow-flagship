// components/sections/ServicesSection.tsx - Card Flip Version

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Zap, Target, Rocket, Check, ArrowRight, X, Clock, Package, Sparkles } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { serviceTiers as dataServiceTiers } from '@/data/services';
import type { ServiceTier } from '@/data/services';

// Icon mapping for service tiers
const tierIcons: Record<string, React.ReactNode> = {
  starter: <Sparkles className="w-6 h-6" />,
  foundation: <Zap className="w-6 h-6" />,
  growth: <Target className="w-6 h-6" />,
  'market-leader': <Rocket className="w-6 h-6" />,
};

// Image mapping for service tiers
const tierImages: Record<string, { lifestyle: string; treeRing: string }> = {
  starter: {
    lifestyle: getImageUrl('sprout-starter.jpg'),
    treeRing: getImageUrl('tree-ring-split.jpg'),
  },
  foundation: {
    lifestyle: getImageUrl('service/growth.jpg'),
    treeRing: getImageUrl('tree-ring-1.jpg'),
  },
  growth: {
    lifestyle: getImageUrl('service/yellow-flower.jpg'),
    treeRing: getImageUrl('tree-ring-3.jpg'),
  },
  'market-leader': {
    lifestyle: getImageUrl('service/farm-1.jpg'),
    treeRing: getImageUrl('tree-ring-4.webp'),
  },
};

// Transform data tier to UI tier with additional properties
const serviceTiers = dataServiceTiers.map((tier: ServiceTier) => ({
  ...tier,
  icon: tierIcons[tier.id] || <Zap className="w-6 h-6" />,
  lifestyleImage: tierImages[tier.id]?.lifestyle || getImageUrl('service/growth.jpg'),
  treeRingImage: tierImages[tier.id]?.treeRing || getImageUrl('tree-ring-1.jpg'),
  highlights: tier.businessOutcomes.slice(0, 4), // Use first 4 business outcomes as highlights
  buttonText: 'Learn More',
  includes: [...tier.technicalFeatures, ...tier.strategicInclusions].slice(0, 6), // Combine and limit
  perfectFor: tier.idealFor,
}));

export default function ServicesSection() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleFlip = (tierId: string) => {
    setFlippedCard(flippedCard === tierId ? null : tierId);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Scroll first, then flip card back after scroll completes
    const element = document.querySelector('#contact');
    if (element) {
      const yOffset = -80; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Flip card back after scroll animation (typically 500-1000ms)
      setTimeout(() => {
        setFlippedCard(null);
      }, 800);
    }
  };

  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #5F755E 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary-600 font-medium mb-6">
            <div className="w-12 h-px bg-primary-400"></div>
            <span className="text-sm uppercase tracking-wider">Pricing</span>
            <div className="w-12 h-px bg-primary-400"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 mb-6">
            Four Ways to{' '}
            <span className="text-primary-600">Work Together</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pick the tier that matches where you are. You can always grow into more.
          </p>
        </motion.div>

        {/* Service Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
          
          {serviceTiers.map((tier, index) => {
            const isFlipped = flippedCard === tier.id;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                style={{ perspective: '1000px' }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-accent-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Flip Container */}
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="relative"
                >
                  
                  {/* FRONT OF CARD */}
                  <div 
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isFlipped ? 'none' : 'auto'
                    }}
                    className={`relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${tier.popular ? 'ring-2 ring-primary-500' : 'border border-gray-200'}`}
                  >
                    {/* Tree Ring Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                      <Image 
                        src={tier.treeRingImage}
                        alt=""
                        fill
                        className="object-cover scale-110"
                      />
                    </div>

                    {/* Lifestyle Image Header */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 z-10 flex-shrink-0">
                      <Image 
                        src={tier.lifestyleImage}
                        alt={tier.name}
                        fill
                        className="object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* Price Badge - Top Right */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary-600 text-white px-3 py-2 rounded-full font-bold shadow-lg text-xs md:text-sm whitespace-nowrap">
                          {tier.priceRange}
                        </div>
                      </div>

                      {/* Tier Badge - Bottom Left */}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full max-w-fit">
                          {tier.icon}
                          <span className="font-bold text-gray-900 whitespace-nowrap text-sm md:text-base">{tier.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 md:p-8 z-10 flex-1 flex flex-col min-h-0">
                      <p className="text-primary-600 font-semibold mb-2 text-sm md:text-base">{tier.tagline}</p>
                      <p className="text-xs md:text-sm text-gray-500 mb-4 line-clamp-2">{tier.idealFor}</p>
                      <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed line-clamp-3">{tier.description}</p>

                      {/* Highlights */}
                      <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1 min-h-0">
                        {tier.highlights.slice(0, 3).map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 md:gap-3">
                            <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                              <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary-600" />
                            </div>
                            <span className="text-xs md:text-sm text-gray-700 leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button - FLIP TRIGGER */}
                      <button 
                        onClick={() => handleFlip(tier.id)}
                        className={`w-full py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 group mt-auto ${
                          tier.popular 
                            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl' 
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {tier.buttonText}
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div 
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      pointerEvents: isFlipped ? 'auto' : 'none'
                    }}
                    className={`absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col ${tier.popular ? 'ring-2 ring-primary-500' : ''}`}
                  >
                    {/* Tree Ring Background on Back */}
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                      <Image 
                        src={tier.treeRingImage}
                        alt=""
                        fill
                        className="object-cover scale-110"
                      />
                    </div>

                    <div className="relative h-full p-6 md:p-8 flex flex-col text-white z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4 md:mb-6 relative z-20">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                          <div className="bg-white/20 p-1.5 md:p-2 rounded-lg flex-shrink-0">
                            {tier.icon}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-lg md:text-2xl truncate">{tier.name}</h3>
                            <p className="text-white/80 text-xs md:text-sm truncate">{tier.priceRange}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setFlippedCard(null);
                          }}
                          className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors cursor-pointer relative z-50"
                          style={{ pointerEvents: 'auto' }}
                          aria-label="Close card"
                        >
                          <X className="w-5 h-5 pointer-events-none" />
                        </button>
                      </div>

                      {/* Perfect For */}
                      <div className="mb-4 md:mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <h4 className="font-semibold text-sm md:text-base">Perfect For:</h4>
                        </div>
                        <p className="text-white/90 text-xs md:text-sm">{tier.perfectFor}</p>
                      </div>

                      {/* Timeline */}
                      <div className="mb-4 md:mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <h4 className="font-semibold text-sm md:text-base">Timeline:</h4>
                        </div>
                        <p className="text-white/90 text-xs md:text-sm">{tier.timeline}</p>
                      </div>

                      {/* What's Included */}
                      <div className="flex-1 min-h-0">
                        <div className="flex items-center gap-2 mb-2 md:mb-3">
                          <Package className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          <h4 className="font-semibold text-sm md:text-base">What&apos;s Included:</h4>
                        </div>
                        <ul className="space-y-1.5 md:space-y-2 overflow-y-auto">
                          {tier.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0 mt-0.5" />
                              <span className="text-white/90 text-xs md:text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <a
                        href="#contact"
                        onClick={handleContactClick}
                        className="mt-4 md:mt-6 w-full bg-white text-primary-700 py-3 md:py-4 rounded-full font-bold text-sm md:text-base hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

        </div>

        {/* Add-on Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-gray-200 p-8 md:p-10 shadow-lg overflow-hidden"
        >
          {/* Background with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white to-primary-50/20 z-0" />
          
          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-2 text-center">
              Add-ons
            </h3>
            <p className="text-gray-600 mb-8 text-center">
              Enhance your website with these optional services
            </p>

          {/* CATEGORY A: Website Enhancements */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-primary-700 mb-6 text-center">
              Website Enhancements
            </h4>
            <p className="text-sm text-gray-500 mb-6 text-center max-w-2xl mx-auto">
              Services that extend or improve your website
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Shopify Design Refresh */}
              <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Shopify Design Refresh</h4>
                  <p className="text-sm text-gray-600 mb-3">Quick design uplift for existing Shopify stores—template customization to match your brand</p>
                  <p className="text-primary-600 font-bold text-lg">Starting at $800</p>
                </div>
              </div>

              {/* Professional Photography */}
              <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Professional Photography</h4>
                  <p className="text-sm text-gray-600 mb-3">High-quality photography packages for your website and brand materials</p>
                  <p className="text-primary-600 font-bold text-lg">From $500</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Essentials: $500 (2hrs, 20 photos) • Professional: $750 (3hrs, 40 photos)
                  </p>
                </div>
              </div>

              {/* Content & Blog Setup */}
              <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Content & Blog Setup</h4>
                  <p className="text-sm text-gray-600 mb-3">SEO-optimized blog posts and content strategy</p>
                  <p className="text-primary-600 font-bold text-lg">From $250/post</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Single post: $250 • Full strategy: $600 (3 posts + roadmap)
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* CATEGORY B: Optimization & Strategy */}
          <div>
            <h4 className="text-lg font-semibold text-primary-700 mb-6 text-center">
              Optimization & Strategy
            </h4>
            <p className="text-sm text-gray-500 mb-6 text-center max-w-2xl mx-auto">
              Services that improve performance or ongoing support
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* SEO Strategy & Optimization */}
              <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">SEO Strategy</h4>
                  <p className="text-sm text-gray-600 mb-3">Strategic SEO optimization for existing websites—keyword research, content optimization, and performance tracking</p>
                  <p className="text-primary-600 font-bold text-lg">$800 - $2,000</p>
                  <p className="text-xs text-gray-500 mt-2">Perfect for sites that need a boost</p>
                </div>
              </div>

              {/* Professional Copywriting */}
              <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Professional Copywriting</h4>
                  <p className="text-sm text-gray-600 mb-3">Transform your content into conversion-focused copy</p>
                  <p className="text-primary-600 font-bold text-lg">$400 - $1,200</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Small sites: $400-$600 • Established: $800-$1,000 • Complex: $1,200+
                  </p>
                </div>
              </div>

              {/* Website Care Plans */}
              <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-lg">Website Care Plans</h4>
                  <p className="text-sm text-gray-600 mb-3">True agency-managed hosting with proactive security and priority support</p>
                  <p className="text-primary-600 font-bold text-lg">From $200/mo</p>
                </div>
              </div>

            </div>
          </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}