// components/sections/ServicesSection.tsx - Card Flip Version

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Zap, Target, Rocket, Check, ArrowRight, X, Clock, Package } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';

const serviceTiers = [
  {
    id: 'foundation',
    name: 'Foundation',
    icon: <Zap className="w-6 h-6" />,
    tagline: 'Strategic foundation for validated presence',
    priceRange: '$1,800 - $2,400',
    idealFor: 'New businesses or rebrands needing validated presence',
    description: 'Strategic discovery process that ensures your website aligns with business goals. Custom solutions rather than template installations—a foundation for long-term growth, not just online presence.',
    lifestyleImage: getImageUrl('service/growth.jpg'),
    treeRingImage: getImageUrl('tree-ring-1.jpg'),
    highlights: [
      'Validated professional market presence',
      'Clear customer conversion pathway aligned with business goals',
      'Strategic architecture that scales with growth',
      'Foundation for digital marketing initiatives'
    ],
    buttonText: 'Learn More',
    popular: false,
    // BACK OF CARD INFO
    timeline: '2-3 weeks',
    includes: [
      '5-10 pages with strategic architecture',
      'Semi-custom design (not pure templates)',
      'Mobile optimization and performance tuning',
      'SEO foundation with keyword research',
      '2-hour strategy session on business goals',
      'CMS training and documentation'
    ],
    perfectFor: 'New businesses or rebrands needing validated presence'
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: <Target className="w-6 h-6" />,
    tagline: 'Competitive differentiation for market share',
    priceRange: '$3,800 - $5,500',
    idealFor: 'Established businesses ready to compete for market share',
    description: 'Comprehensive digital presence that positions your business as the clear choice in your market. Custom design reflecting brand personality with conversion optimization and professional copywriting.',
    lifestyleImage: getImageUrl('service/yellow-flower.jpg'),
    treeRingImage: getImageUrl('tree-ring-3.jpg'),
    highlights: [
      'Clear market differentiation from competitors',
      'Improved customer acquisition metrics',
      'Tracked revenue growth from digital presence',
      'Professional copywriting for key pages'
    ],
    buttonText: 'Learn More',
    popular: true,
    // BACK OF CARD INFO
    timeline: '4-6 weeks',
    includes: [
      '10-20 pages with conversion optimization',
      'Fully custom responsive design',
      'Professional copywriting (5-8 pages)',
      'Comprehensive SEO with competitive analysis',
      'Blog integration with content strategy',
      'Analytics and conversion tracking setup'
    ],
    perfectFor: 'Established businesses ready to compete for market share'
  },
  {
    id: 'market-leader',
    name: 'Market Leader',
    icon: <Rocket className="w-6 h-6" />,
    tagline: 'Revenue-driving digital presence',
    priceRange: '$8,000 - $18,000',
    idealFor: 'Businesses where digital presence drives significant revenue',
    description: 'Fully custom solutions designed to solve specific business challenges and create measurable competitive advantages. Deep strategic planning with advanced functionality for businesses where digital presence is a primary revenue driver.',
    lifestyleImage: getImageUrl('service/farm-1.jpg'),
    treeRingImage: getImageUrl('tree-ring-4.webp'),
    highlights: [
      'Technical competitive advantages in market',
      'Measurable ROI from digital investment',
      'Platform designed for significant scaling',
      'Advanced customer acquisition and retention systems'
    ],
    buttonText: 'Learn More',
    popular: false,
    // BACK OF CARD INFO
    timeline: '8-12 weeks',
    includes: [
      '20-50+ pages with advanced functionality',
      'Fully custom design and interactive elements',
      'Full-site professional copywriting',
      'Advanced SEO with technical implementations',
      'Custom integrations (CRM, email marketing, etc.)',
      'Priority support and dedicated account management'
    ],
    perfectFor: 'Businesses where digital presence drives significant revenue'
  }
];

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
                      WebkitBackfaceVisibility: 'hidden',
                      pointerEvents: isFlipped ? 'none' : 'auto'
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
                      transform: 'rotateY(180deg)',
                      pointerEvents: isFlipped ? 'auto' : 'none'
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
                      <div className="flex items-center justify-between mb-6 relative z-20">
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
                        onClick={handleContactClick}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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

            <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Professional Photography</h4>
                <p className="text-sm text-gray-600 mb-3">High-quality photography that captures your brand and products professionally</p>
                <p className="text-primary-600 font-bold text-lg">$800 - $2,000</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-lg">Ongoing SEO Strategy</h4>
                <p className="text-sm text-gray-600 mb-3">Strategic SEO services separate from maintenance - keyword research, content optimization, and performance tracking</p>
                <p className="text-primary-600 font-bold text-lg">$800 - $2,000/mo</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}