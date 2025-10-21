// components/sections/ServicesSection.tsx - Card Flip Version

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Zap, Target, Rocket, Check, ArrowRight, X, Clock, Package } from 'lucide-react';

const serviceTiers = [
  {
    id: 'launch',
    name: 'Launch',
    icon: <Zap className="w-6 h-6" />,
    tagline: 'Get online fast',
    priceRange: '$750 - $1,250',
    idealFor: 'New businesses and focused market entry',
    description: 'Strategic website foundation designed to establish immediate professional credibility and drive customer acquisition from day one.',
    lifestyleImage: '/images/service/growth.jpg',
    treeRingImage: '/images/tree-ring-1.jpg',
    highlights: [
      'Immediate professional market presence',
      'Clear customer conversion pathway',
      'Mobile-optimized for modern shoppers',
      'SEO foundations for local discovery'
    ],
    buttonText: 'Choose Launch',
    popular: false,
    // BACK OF CARD INFO
    timeline: '5-7 business days',
    includes: [
      '1-3 strategic pages',
      'Mobile responsive design',
      'Contact form integration',
      'Basic SEO setup',
      'Social media links',
      '30-day support'
    ],
    perfectFor: 'New businesses getting online quickly'
  },
  {
    id: 'elevate',
    name: 'Elevate',
    icon: <Target className="w-6 h-6" />,
    tagline: 'Stand out from competitors',
    priceRange: '$2,000 - $2,500',
    idealFor: 'Established businesses ready for competitive advantage',
    description: 'Comprehensive digital presence that positions your business as the clear choice in your market through strategic design and content architecture.',
    lifestyleImage: '/images/service/yellow-flower.jpg',
    treeRingImage: '/images/tree-ring-3.jpg',
    highlights: [
      'Clear market differentiation from competitors',
      'Improved customer acquisition metrics',
      'Advanced conversion optimization',
      'Professional content strategy'
    ],
    buttonText: 'Choose Elevate',
    popular: true,
    // BACK OF CARD INFO
    timeline: '2-3 weeks',
    includes: [
      '4-6 custom pages',
      'Advanced animations',
      'Blog/CMS integration',
      'Advanced SEO',
      'Analytics setup',
      '60-day support'
    ],
    perfectFor: 'Businesses ready to dominate their market'
  },
  {
    id: 'thrive',
    name: 'Thrive',
    icon: <Rocket className="w-6 h-6" />,
    tagline: 'Custom competitive advantages',
    priceRange: 'Starting at $5,000',
    idealFor: 'Growing businesses with specific technical requirements',
    description: 'Fully custom solutions designed to solve specific business challenges and create measurable competitive advantages through advanced functionality.',
    lifestyleImage: '/images/service/farm-1.jpg',
    treeRingImage: '/images/tree-ring-4.webp',
    highlights: [
      'Technical competitive advantages in market',
      'Streamlined business operations',
      'Platform designed for scaling',
      'Advanced customer acquisition systems'
    ],
    buttonText: 'Choose Thrive',
    popular: false,
    // BACK OF CARD INFO
    timeline: '4-8 weeks',
    includes: [
      '8+ comprehensive pages',
      'Full custom build',
      'E-commerce/booking systems',
      'CRM integration',
      'Custom applications',
      '90-day priority support'
    ],
    perfectFor: 'Complex needs & growth-focused businesses'
  }
];

export default function ServicesSection() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const handleFlip = (tierId: string) => {
    setFlippedCard(flippedCard === tierId ? null : tierId);
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
            Three Ways to{' '}
            <span className="text-primary-600">Work Together</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pick the tier that matches where you are. You can always grow into more.
          </p>
        </motion.div>

        {/* Service Tiers Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 items-center">
          
          {serviceTiers.map((tier, index) => {
            const isFlipped = flippedCard === tier.id;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative ${tier.popular ? 'lg:scale-110 lg:z-10' : 'lg:scale-95'}`}
                style={{ perspective: '1000px' }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-accent-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
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
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                    className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${tier.popular ? 'ring-2 ring-primary-500' : 'border border-gray-200'}`}
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
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 z-10">
                      <Image 
                        src={tier.lifestyleImage}
                        alt={tier.name}
                        fill
                        className="object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* Tier Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          {tier.icon}
                          <span className="font-bold text-gray-900">{tier.name}</span>
                        </div>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-primary-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                          {tier.priceRange}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-8 z-10">
                      <p className="text-primary-600 font-semibold mb-2">{tier.tagline}</p>
                      <p className="text-sm text-gray-500 mb-4">{tier.idealFor}</p>
                      <p className="text-gray-600 mb-6 leading-relaxed">{tier.description}</p>

                      {/* Highlights */}
                      <div className="space-y-3 mb-8">
                        {tier.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                              <Check className="w-3 h-3 text-primary-600" />
                            </div>
                            <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button - FLIP TRIGGER */}
                      <button 
                        onClick={() => handleFlip(tier.id)}
                        className={`w-full py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 group ${
                          tier.popular 
                            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl' 
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {tier.buttonText}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div 
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                    className={`absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl overflow-hidden shadow-2xl ${tier.popular ? 'ring-2 ring-primary-500' : ''}`}
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

                    <div className="relative h-full p-8 flex flex-col text-white z-10">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded-lg">
                            {tier.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-2xl">{tier.name}</h3>
                            <p className="text-white/80 text-sm">{tier.priceRange}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleFlip(tier.id)}
                          className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Perfect For */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4" />
                          <h4 className="font-semibold">Perfect For:</h4>
                        </div>
                        <p className="text-white/90 text-sm">{tier.perfectFor}</p>
                      </div>

                      {/* Timeline */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4" />
                          <h4 className="font-semibold">Timeline:</h4>
                        </div>
                        <p className="text-white/90 text-sm">{tier.timeline}</p>
                      </div>

                      {/* What's Included */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-4 h-4" />
                          <h4 className="font-semibold">What&apos;s Included:</h4>
                        </div>
                        <ul className="space-y-2">
                          {tier.includes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span className="text-white/90">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Button */}
                      <a
                        href="#contact"
                        className="mt-6 w-full bg-white text-primary-700 py-4 rounded-full font-bold hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
          className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-lg"
        >
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-2 text-center">
            Add-ons
          </h3>
          <p className="text-gray-600 mb-8 text-center">
            Enhance your website with these optional services
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Website Care Plans</h4>
                <p className="text-sm text-gray-600 mb-3">Ongoing updates, optimization, and support to keep your site performing at its best</p>
                <p className="text-primary-600 font-bold text-lg">From $150/mo</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">SEO Foundation</h4>
                <p className="text-sm text-gray-600 mb-3">Get found on Google with local SEO optimization and search strategy</p>
                <p className="text-primary-600 font-bold text-lg">$300</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}