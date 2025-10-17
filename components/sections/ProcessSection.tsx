'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container, Section, Heading, BodyText } from '../layout/StudioLayout';
import { Sprout, Leaf, Flower2, TreeDeciduous, ArrowRight } from 'lucide-react';

const processStages = [
  {
    id: 'discover',
    number: '1',
    icon: Sprout,
    iconColor: 'text-nature-700',
    iconBg: 'bg-nature-100',
    title: 'Discover',
    description: 'We learn your business, customers, and what makes you different.',
    outcome: 'Clear roadmap'
  },
  {
    id: 'design',
    number: '2',
    icon: Leaf,
    iconColor: 'text-primary-700',
    iconBg: 'bg-primary-100',
    title: 'Design',
    description: 'We craft messaging and visuals that build trust and drive action.',
    outcome: 'Professional look'
  },
  {
    id: 'develop',
    number: '3',
    icon: Flower2,
    iconColor: 'text-accent-700',
    iconBg: 'bg-accent-100',
    title: 'Develop',
    description: 'We build your site with attention to speed, security, and conversion.',
    outcome: 'Flawless website'
  },
  {
    id: 'grow',
    number: '4',
    icon: TreeDeciduous,
    iconColor: 'text-nature-700',
    iconBg: 'bg-nature-100',
    title: 'Grow',
    description: 'We launch your site and make sure you know how to use it.',
    outcome: 'Thriving business'
  }
];

const ProcessSection = () => {
  return (
    <Section id="process" padding="lg" background="nature">
      <Container>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading level={2} className="mb-4">
            How we work together
          </Heading>
          <BodyText size="lg" color="secondary" className="max-w-2xl mx-auto">
            Four clear stages. No surprises. You're involved the whole way.
          </BodyText>
        </motion.div>

        {/* Process Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {processStages.map((stage, index) => {
            const IconComponent = stage.icon;
            const isLast = index === processStages.length - 1;
            
            return (
              <React.Fragment key={stage.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Card */}
                  <div className="bg-white rounded-xl p-6 border border-nature-200 shadow-soft h-full flex flex-col hover:shadow-md transition-shadow">
                    
                    {/* Icon & Number */}
                    <div className="relative mb-4">
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className={`w-16 h-16 rounded-full ${stage.iconBg} flex items-center justify-center mx-auto group-hover:rotate-360 transition-transform duration-600`}
                      >
                        <IconComponent className={`w-8 h-8 ${stage.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </motion.div>
                      
                      {/* Number Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                        {stage.number}
                      </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-3">
                      <h3 className="font-display text-xl font-bold text-text-primary">
                        {stage.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <BodyText size="sm" color="secondary" className="text-center mb-4 flex-grow">
                      {stage.description}
                    </BodyText>

                    {/* Outcome */}
                    <div className="pt-3 border-t border-nature-100 text-center">
                      <span className="text-xs font-semibold text-text-muted">Outcome: </span>
                      <span className="text-sm text-primary-600 font-medium">{stage.outcome}</span>
                    </div>
                  </div>

                  {/* Arrow Between Cards (desktop only, not after last card) */}
                  {!isLast && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary-600" />
                    </div>
                  )}

                  {/* Arrow Between Cards (tablet/mobile - below card) */}
                  {!isLast && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight className="w-6 h-6 text-primary-600 rotate-90" />
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Timeline Summary - UPDATED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-white rounded-lg p-6 border border-nature-200 shadow-soft max-w-3xl mx-auto text-center"
        >
          <div className="mb-4">
            <BodyText size="base" className="font-semibold text-text-primary mb-2">
              Timeline varies by project tier
            </BodyText>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-text-secondary">
              <span className="px-3 py-1 bg-nature-50 rounded-full">Launch: 5-7 days</span>
              <span className="text-nature-300">•</span>
              <span className="px-3 py-1 bg-primary-50 rounded-full font-medium">Elevate: 2-3 weeks</span>
              <span className="text-nature-300">•</span>
              <span className="px-3 py-1 bg-accent-50 rounded-full">Thrive: 4-8 weeks</span>
            </div>
          </div>
          <BodyText size="sm" color="secondary">
            Every small business has a unique story. Our process honors that story while 
            building the professional presence you need to compete.
          </BodyText>
        </motion.div>

      </Container>
    </Section>
  );
};

export default ProcessSection;