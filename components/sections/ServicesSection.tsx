// components/sections/ServicesSection.tsx - Simplified Pricing Cards

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Zap, Target, Rocket, Check, ArrowRight, Package, Sparkles, ChevronDown } from 'lucide-react';
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
  highlights: tier.businessOutcomes.slice(0, 2),
  services: [...tier.technicalFeatures, ...tier.strategicInclusions].slice(0, 3),
  buttonText: 'Start this tier',
}));

// Add-on accordion data
const addOnCategories = [
  {
    id: 'optimization',
    title: 'Optimization & Strategy',
    subtitle: 'Performance and ongoing support',
    items: [
      {
        name: 'SEO Strategy',
        description: 'Keyword research, content optimization, and performance tracking',
        price: '$800 - $2,000',
        icon: <Check className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Professional Copywriting',
        description: 'Conversion-focused copy for your website',
        price: '$400 - $1,200',
        icon: <Check className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Website Care Plans',
        description: 'Agency-managed hosting with proactive security',
        price: 'From $200/mo',
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
        name: 'Shopify Design Refresh',
        description: 'Template customization to match your brand',
        price: 'Starting at $1,000',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
      {
        name: 'Content & Blog Setup',
        description: 'SEO-optimized blog posts and content strategy',
        price: 'From $250/post',
        icon: <Package className="w-5 h-5 text-primary-600" />,
      },
    ],
  },
];

function AddOnsAccordion() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

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
          Add-ons
        </h3>
        <p className="text-sm text-text-secondary mb-6 text-center">
          Optional services to enhance your website
        </p>

        <div className="space-y-3 max-w-3xl mx-auto">
          {addOnCategories.map((category) => {
            const isOpen = openCategory === category.id;
            return (
              <div
                key={category.id}
                className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm overflow-hidden transition-shadow hover:shadow-md"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <div>
                    <h4 className="font-semibold text-text-primary text-lg group-hover:text-primary-700 transition-colors">
                      {category.title}
                    </h4>
                    <p className="text-sm text-text-muted mt-0.5">{category.subtitle}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown className="w-5 h-5 text-text-muted" />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1">
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
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                  <h5 className="font-semibold text-text-primary text-[0.95rem]">
                                    {item.name}
                                  </h5>
                                  <span className="text-primary-600 font-bold text-sm whitespace-nowrap">
                                    {item.price}
                                  </span>
                                </div>
                                <p className="text-sm text-text-secondary mt-1">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
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
            <span className="text-sm uppercase tracking-wider">Pricing</span>
            <div className="w-12 h-px bg-primary-400"></div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Four Ways to{' '}
            <span className="text-primary-600 italic">Work Together</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Outcome-first packages built to improve trust, increase leads, and support sustainable growth.
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
                  <span className="bg-accent-500 text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg whitespace-nowrap">
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
                        <p className="font-body text-xs uppercase tracking-wide text-text-muted mb-2">You get</p>
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
          <h3 className="mb-2 text-xl font-display font-semibold text-text-primary">Who we&apos;re the best fit for</h3>
          <p className="mx-auto max-w-3xl text-sm md:text-base text-text-secondary leading-relaxed">
            Sproutflow Studio is built for owners who want a strategic, professional web presence that drives results.
            If you&apos;re only looking for the cheapest possible option, we may not be the right fit. And that&apos;s okay.
          </p>
        </motion.div>

        {/* Add-on Services - Accordion */}
        <AddOnsAccordion />

      </Container>
    </section>
  );
}
