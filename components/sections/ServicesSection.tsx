// components/sections/ServicesSection.tsx - Simplified Pricing Cards

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Zap, Target, Rocket, Check, ArrowRight, Package, Sparkles } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { serviceTiers as dataServiceTiers } from '@/data/services';
import type { ServiceTier } from '@/data/services';
import { Container } from '../layout/StudioLayout';

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
    lifestyle: getImageUrl('sprout.jpg'),
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
  highlights: tier.businessOutcomes.slice(0, 1),
  services: [...tier.technicalFeatures, ...tier.strategicInclusions].slice(0, 3),
  buttonText: 'Discuss this option',
}));

// Add-on accordion data
const addOnCategories = [
  {
    id: 'optimization',
    title: 'Optimization & Strategy',
    subtitle: 'Performance and ongoing support',
    items: [
      {
        name: 'SEO Growth Package (monthly)',
        description: 'Ongoing keyword tracking, metadata updates, and small on-page improvements',
        // {{CONFIRM PRICING: $300-$800/mo}}
        price: 'Ask on your discovery call',
        icon: <Check className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Maintenance & Hosting Retainer',
        description: 'Security updates, backups, and uptime monitoring',
        // {{CONFIRM PRICING: starting $75-$150/mo}}
        price: 'Ask on your discovery call',
        icon: <Check className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Quarterly Performance Review',
        description: 'Analytics reporting and a strategy check-in',
        price: 'Ask on your discovery call',
        icon: <Check className="w-5 h-5 text-primary-600" />,
      },
    ],
  },
  {
    id: 'enhancements',
    title: 'Website Enhancements',
    subtitle: 'Extend or improve your website',
    items: [
      {
        name: 'Additional pages beyond your package scope',
        description: 'Expand your site with new service, location, team, or landing pages',
        price: 'Ask on your discovery call',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Copywriting / content pass',
        description: 'Sharpen page copy, calls to action, and content structure',
        price: 'Ask on your discovery call',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Custom photography coordination',
        description: 'Plan and coordinate original visuals that fit your brand',
        price: 'Ask on your discovery call',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Booking or scheduling integration',
        description: 'Connect booking flows so visitors can take action immediately',
        price: 'Ask on your discovery call',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Shopify builds and rebuilds',
        description: 'Launch or rebuild a Shopify storefront with stronger presentation, product flow, and conversion paths',
        price: 'Ask on your discovery call',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Email marketing integration',
        description: 'Connect your site to your email platform and list-building workflows',
        price: 'Ask on your discovery call',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
    ],
  },
];

function AddOnsAccordion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative rounded-2xl border border-gray-200 overflow-hidden shadow-lg"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-accent-100/60 to-nature-100/70 z-0" />

      <div className="relative z-10 p-6 md:p-8">
        <h3 className="text-2xl font-display font-bold text-text-primary mb-1 text-center">
          Optional support
        </h3>
        <p className="text-sm text-text-secondary mb-6 text-center">
          Add only what your project needs. We quote each item after scope is clear.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {addOnCategories.map((category) => (
              <details
                key={category.id}
                className="group rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                <summary className="cursor-pointer list-none p-5 focus-visible:outline-offset-[-3px]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                    <h4 className="font-semibold text-text-primary text-lg">
                      {category.title}
                    </h4>
                    <p className="text-sm text-text-muted mt-0.5">{category.subtitle}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-700 group-open:hidden">View</span>
                    <span className="hidden text-sm font-semibold text-primary-700 group-open:inline">Close</span>
                  </div>
                </summary>

                <div className="border-t border-gray-200 p-5 pt-4">
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white/60 border border-gray-100"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center mt-0.5">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-text-primary text-[0.95rem]">
                            {item.name}
                          </h5>
                          <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 bg-gradient-to-b from-white via-primary-50/50 to-white overflow-hidden">
      
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #5F755E 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <Container className="relative z-10">
        
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
            <span className="text-sm uppercase tracking-wider">Website packages and pricing</span>
            <div className="w-12 h-px bg-primary-400"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Choose the right starting point
          </h2>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Transparent ranges, clear scope, and a fixed quote before work begins. Start where your business is today and leave room to grow.
          </p>
        </motion.div>

        {/* Service Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
          
          {serviceTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              className="relative min-h-[480px] md:min-h-[520px]"
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-accent-300 text-primary-900 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl h-full min-h-[480px] md:min-h-[520px] flex flex-col transition-shadow duration-300 ${tier.popular ? 'ring-2 ring-primary-500' : 'border border-gray-200'}`}
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
                        <div className="bg-primary-600 text-white px-3 py-2 rounded-full font-bold shadow-lg text-xs md:text-sm whitespace-nowrap transition-transform duration-300 hover:scale-110">
                          {tier.priceRange}
                        </div>
                      </div>

                      {/* Tier Badge - Bottom Left */}
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full max-w-fit">
                          {tier.icon}
                          <span className="font-display font-bold text-text-primary whitespace-nowrap text-sm md:text-base">{tier.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-6 md:p-8 z-10 flex-1 flex flex-col min-h-0">
                      <p className="font-display text-primary-600 font-semibold italic mb-2 text-sm md:text-base">{tier.tagline}</p>
                      <p className="font-body text-xs md:text-sm text-text-muted mb-5 line-clamp-2">{tier.idealFor}</p>

                      <div className="mb-5">
                        <p className="font-body text-xs uppercase tracking-wide text-text-muted mb-2">Included</p>
                        <div className="space-y-2">
                          {tier.services.map((service, idx) => (
                            <div key={idx} className="flex items-start gap-2 md:gap-3">
                              <div className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary-100 flex items-center justify-center mt-0.5">
                                <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary-600" />
                              </div>
                              <span className="font-body text-xs md:text-sm text-text-primary leading-relaxed font-medium">{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1 min-h-0">
                        {tier.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 md:gap-3">
                            <Target className="w-4 h-4 md:w-5 md:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                            <span className="font-body text-xs md:text-sm text-text-secondary leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <a
                          href="/inquiry"
                          className={`w-full py-3 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 group ${
                            tier.popular 
                              ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl' 
                              : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                          }`}
                        >
                          {tier.buttonText}
                          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
              </div>
            </motion.div>
          ))}

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl border border-primary-200 bg-primary-50 p-6 text-center"
        >
          <h3 className="mb-2 text-xl font-display font-semibold text-text-primary">A good fit if</h3>
          <p className="mx-auto max-w-3xl text-sm md:text-base text-text-secondary leading-relaxed">
            You want a clearer customer path, stronger proof, and a partner who can also improve the systems behind the site. If price is the only deciding factor, a DIY builder may be the better fit.
          </p>
        </motion.div>

        {/* Add-on Services - Accordion */}
        <AddOnsAccordion />

      </Container>
    </section>
  );
}
