'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Grid, Card, Heading, BodyText, Button } from '../layout/StudioLayout';
import { ArrowRight, Check, Zap, Target, Star } from 'lucide-react';
import { servicesContent } from '@/data/content';

const ServicesSection = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <div>
      <Section id="services" padding="default" background="white">
        <Container>
        
        {/* Section Header - SIMPLIFIED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Heading level={2} className="mb-4">
            Three ways to work together
          </Heading>
          <BodyText size="lg" color="secondary" className="max-w-3xl mx-auto">
            Pick the tier that matches where you are. You can always grow into more.
          </BodyText>
        </motion.div>

        {/* Service Tiers Grid */}
        <Grid cols={3} gap="lg" className="mb-16">
          {servicesContent.tiers.map((tier, index) => {
            const isPopular = tier.name === "Elevate";
            const IconComponent = tier.name === "Launch" ? Zap : tier.name === "Elevate" ? Target : Star;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Card 
                  padding="lg" 
                  className={`h-full flex flex-col relative ${isPopular ? 'border-primary-500 border-2' : ''}`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-nature-700" />
                  </div>

                  {/* Tier Header */}
                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold text-text-primary mb-2">
                      {tier.name}
                    </h3>
                    <div className="font-display text-3xl font-bold text-primary-600 mb-2">
                      {tier.priceRange}
                    </div>
                    <div className="text-sm text-text-muted">
                      {tier.timeline} • {tier.ideal}
                    </div>
                  </div>

                  {/* Description - REDUCED TO 1 SENTENCE */}
                  <BodyText size="sm" color="secondary" className="mb-6">
                    {tier.description.split('.')[0]}.
                  </BodyText>

                  {/* Business Outcomes - TOP 2 ONLY */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3 text-sm">
                      What You Get
                    </h4>
                    <ul className="space-y-2">
                      {tier.businessOutcomes.slice(0, 2).map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary-600 shrink-0 mt-0.5" />
                          <span className="text-text-secondary">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Includes - COLLAPSIBLE */}
                  <details className="mb-6 group">
                    <summary className="font-semibold text-text-primary text-sm cursor-pointer list-none flex items-center justify-between">
                      <span>Full Details</span>
                      <span className="text-primary-600 text-xs group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <ul className="mt-3 space-y-1.5 text-sm text-text-muted">
                      {tier.technicalIncludes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-nature-600">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  {/* CTA Button */}
                  <div className="mt-auto pt-4">
                    <Button
                      variant={isPopular ? "primary" : "secondary"}
                      className="w-full"
                      href="#contact"
                      icon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      Choose {tier.name}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </Grid>

        {/* Add-Ons - SIMPLIFIED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Heading level={3} className="mb-6">
            Add-ons
          </Heading>
          
          <Grid cols={2} gap="md" className="max-w-4xl mx-auto">


            {/* Care Plans */}
            <Card padding="md" className="text-left h-full md:col-span-2">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-body font-semibold text-text-primary mb-1">
                    Website Care Plans
                  </h4>
                  <BodyText size="sm" color="secondary">
                    Updates, optimization, support
                  </BodyText>
                </div>
                <span className="font-display font-bold text-primary-600 whitespace-nowrap">
                  From $150/mo
                </span>
              </div>
            </Card>
          </Grid>
        </motion.div>
        </Container>
      </Section>
    </div>
  );
};

export default ServicesSection;