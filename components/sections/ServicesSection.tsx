// components/sections/ServicesSection.tsx - Strategic Service Presentation

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star, Zap, Target } from 'lucide-react';
import { Container, Section, Heading, BodyText, Button, Card, Grid } from '../layout/StudioLayout';
import { servicesContent } from '../../data/content';
import { serviceTiers } from '../../data/services';

const ServicesSection: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const tierIcons = {
    launch: Zap,
    elevate: Target, 
    thrive: Star
  };

  return (
    <div id="services">
      <Section background="nature" padding="lg">
        <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading level={2} className="mb-6">
            {servicesContent.headline}
          </Heading>
          <BodyText size="lg" className="max-w-2xl mx-auto">
            {servicesContent.description}
          </BodyText>
        </motion.div>

        {/* Service Tiers Grid */}
        <Grid cols={3} gap="lg" className="mb-16">
          {serviceTiers.map((tier, index) => {
            const IconComponent = tierIcons[tier.id as keyof typeof tierIcons];
            const isPopular = tier.popular;
            
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <Card
                  className={`h-full transition-all duration-300 ${
                    selectedTier === tier.id ? 'ring-2 ring-primary-500 shadow-strong' : ''
                  } ${isPopular ? 'ring-1 ring-primary-200 shadow-nature' : ''}`}
                  hover={false}
                >
                  {/* Tier Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full mb-4">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    
                    <Heading level={3} className="mb-2">
                      {tier.name}
                    </Heading>
                    
                    <BodyText color="muted" className="mb-4">
                      {tier.tagline}
                    </BodyText>
                    
                    <div className="mb-2">
                      <span className="text-3xl font-display font-bold text-text-primary">
                        {tier.priceRange.split(' - ')[0]}
                      </span>
                      {tier.priceRange.includes(' - ') && (
                        <span className="text-lg text-text-muted">
                          {' - ' + tier.priceRange.split(' - ')[1]}
                        </span>
                      )}
                    </div>
                    
                    <BodyText size="sm" color="muted">
                      {tier.timeline} • {tier.idealFor}
                    </BodyText>
                  </div>

                  {/* Service Description */}
                  <div className="mb-8">
                    <BodyText className="leading-relaxed">
                      {tier.description}
                    </BodyText>
                  </div>

                  {/* Business Outcomes */}
                  <div className="mb-8">
                    <h4 className="font-body font-semibold text-text-primary mb-4">
                      Business Outcomes
                    </h4>
                    <ul className="space-y-3">
                      {tier.businessOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <BodyText size="sm" color="secondary">
                            {outcome}
                          </BodyText>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technical Features */}
                  <div className="mb-8">
                    <h4 className="font-body font-semibold text-text-primary mb-4">
                      Technical Includes
                    </h4>
                    <ul className="space-y-2">
                      {tier.technicalFeatures.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-nature-400 rounded-full flex-shrink-0 mt-2" />
                          <BodyText size="sm" color="muted">
                            {feature}
                          </BodyText>
                        </li>
                      ))}
                      {tier.technicalFeatures.length > 4 && (
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-nature-400 rounded-full flex-shrink-0 mt-2" />
                          <BodyText size="sm" color="muted">
                            +{tier.technicalFeatures.length - 4} additional features
                          </BodyText>
                        </li>
                      )}
                    </ul>
                  </div>

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

        {/* Strategic Add-Ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Heading level={3} className="mb-6">
            {servicesContent.addOns.headline}
          </Heading>
          
          <Grid cols={2} gap="md" className="max-w-4xl mx-auto">
            {servicesContent.addOns.services.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Card padding="md" className="text-left h-full">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-body font-semibold text-text-primary">
                      {addon.name}
                    </h4>
                    <span className="font-display font-bold text-primary-600">
                      {addon.price}
                    </span>
                  </div>
                  <BodyText size="sm" color="secondary">
                    {addon.description}
                  </BodyText>
                </Card>
              </motion.div>
            ))}
          </Grid>

          {/* Professional CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-white rounded-lg border border-nature-200"
          >
            <Heading level={3} className="mb-4">
              Ready to establish professional market presence?
            </Heading>
            <BodyText size="lg" color="secondary" className="mb-6 max-w-2xl mx-auto">
              Every project begins with understanding your specific business objectives 
              and competitive positioning requirements.
            </BodyText>
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Discuss Your Project
            </Button>
          </motion.div>
        </motion.div>
        </Container>
      </Section>
    </div>
  );
};

export default ServicesSection;