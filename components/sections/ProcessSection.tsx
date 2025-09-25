'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Leaf, Flower, Trees, ArrowRight, Clock, Users, Lightbulb, Rocket } from 'lucide-react';
import { Container, Section, Heading, BodyText, Card } from '../layout/StudioLayout';

type ProcessStep = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: 'primary' | 'accent' | 'nature';
  timeline: string;
  details: string[];
  outcome: string;
};

const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps: ProcessStep[] = [
    {
      id: 'sprout',
      title: 'Sprout',
      subtitle: 'Strategic Foundation',
      description: 'Like a sprout breaking through soil, we build the strategic foundation—your brand positioning, messaging, and the psychological triggers that will make customers trust you instantly.',
      icon: Sprout,
      color: 'accent',
      timeline: '1-2 days',
      details: [
        'Deep-dive conversation about your vision',
        'Understanding your customers and competition',
        'Identifying what makes you uniquely valuable',
        'Setting goals that actually matter to your business'
      ],
      outcome: 'Clear roadmap that feels authentically you'
    },
    {
      id: 'leaf',
      title: 'Leaf',
      subtitle: 'Growth & Development',
      description: 'Your business develops its strength and presence. We craft the messaging, visual identity, and strategic framework that will fuel your upcoming transformation.',
      icon: Leaf,
      color: 'primary',
      timeline: '3-5 days',
      details: [
        'Crafting messaging that resonates with your audience',
        'Developing visual identity that builds trust',
        'Creating the strategic framework for growth',
        'Planning user experience that converts'
      ],
      outcome: 'Professional foundation ready to compete'
    },
    {
      id: 'bloom',
      title: 'Bloom',
      subtitle: 'Design & Development',
      description: 'This is where the magic happens. We bring your vision to life with enterprise-level design that makes small businesses look like industry leaders. Every pixel has purpose.',
      icon: Flower,
      color: 'nature',
      timeline: '1-3 weeks',
      details: [
        'Custom design that tells your story powerfully',
        'Development with enterprise-grade quality',
        'Testing across all devices and browsers',
        'Optimization for speed and conversion'
      ],
      outcome: 'Professional website that commands respect'
    },
    {
      id: 'flourish',
      title: 'Flourish',
      subtitle: 'Launch & Partnership',
      description: 'Your business is ready to flourish. We launch your professional presence and begin a partnership focused on your continued growth and success.',
      icon: Trees,
      color: 'accent',
      timeline: 'Ongoing',
      details: [
        'Smooth launch with comprehensive training',
        'Analytics setup to track your success',
        'Ongoing support and growth consultation',
        'Celebration of your business transformation'
      ],
      outcome: 'Confidence to compete with anyone'
    }
  ];

  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      icon: 'text-primary-600',
      accent: 'text-primary-600'
    },
    accent: {
      bg: 'bg-accent-50',
      border: 'border-accent-200', 
      icon: 'text-accent-600',
      accent: 'text-accent-600'
    },
    nature: {
      bg: 'bg-nature-50',
      border: 'border-nature-200',
      icon: 'text-nature-700',
      accent: 'text-nature-700'
    }
  } as const;

  return (
    <Section id="process" background="nature" padding="lg">
      <Container>
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <Heading level={2} className="mb-8">
              <span className="text-text-primary">How we </span>
              <span className="text-primary-600 relative">
                grow together
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 h-1 bg-accent-500/40 rounded-full"
                />
              </span>
            </Heading>
            
            <BodyText size="lg" className="max-w-3xl mx-auto leading-relaxed">
              Every small business has a unique story. Our process is designed to honor that story 
              while building the professional presence that helps you compete with confidence.
            </BodyText>
          </motion.div>

          {/* Process Steps - Interactive Timeline */}
          <div className="relative mb-20">
            
            {/* Background Growth Line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-200 via-primary-300 to-nature-400 rounded-full opacity-30 hidden lg:block" />
            
            <div className="space-y-16 lg:space-y-24">
              {processSteps.map((step, index) => {
                const colors = colorMap[step.color];
                const Icon = step.icon;
                const isActive = activeStep === index;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    onMouseEnter={() => setActiveStep(index)}
                    className={`relative grid lg:grid-cols-12 gap-8 items-center ${
                      index % 2 === 0 ? '' : 'lg:direction-rtl'
                    }`}
                  >
                    
                    {/* Step Content */}
                    <div className={`lg:col-span-5 ${index % 2 === 0 ? '' : 'lg:order-2'}`}>
                      <Card className={`${colors.bg} ${colors.border} border-2 transition-all duration-300 ${
                        isActive ? 'shadow-nature scale-105' : 'hover:shadow-soft'
                      }`}>
                        
                        {/* Step Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center border-2 ${colors.border}`}>
                            <Icon className={`w-8 h-8 ${colors.icon}`} />
                          </div>
                          <div>
                            <h3 className={`text-2xl font-display font-bold ${colors.accent}`}>
                              {step.title}
                            </h3>
                            <h4 className="text-lg font-semibold text-text-primary">
                              {step.subtitle}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Clock className="w-4 h-4 text-text-muted" />
                              <span className="text-sm text-text-muted">{step.timeline}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step Description */}
                        <BodyText className="mb-6 leading-relaxed">
                          {step.description}
                        </BodyText>
                        
                        {/* Step Details */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h5 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4" />
                              What We Do
                            </h5>
                            <ul className="space-y-2">
                              {step.details.slice(0, 2).map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 ${colors.bg.replace('50', '400')} rounded-full mt-2 flex-shrink-0`} />
                                  <BodyText size="sm" color="muted">{detail}</BodyText>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Your Role
                            </h5>
                            <ul className="space-y-2">
                              {step.details.slice(2, 4).map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <div className={`w-1.5 h-1.5 ${colors.bg.replace('50', '400')} rounded-full mt-2 flex-shrink-0`} />
                                  <BodyText size="sm" color="muted">{detail}</BodyText>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Outcome */}
                        <div className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Rocket className={`w-4 h-4 ${colors.icon}`} />
                            <span className={`font-semibold ${colors.accent}`}>Outcome:</span>
                          </div>
                          <BodyText size="sm" className="font-medium">
                            {step.outcome}
                          </BodyText>
                        </div>
                      </Card>
                    </div>

                    {/* Central Icon (Desktop) */}
                    <div className="hidden lg:block lg:col-span-2">
                      <div className="flex justify-center">
                        <motion.div
                          animate={isActive ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`w-20 h-20 ${colors.bg} rounded-full flex items-center justify-center border-4 ${colors.border} shadow-soft bg-white`}
                        >
                          <Icon className={`w-10 h-10 ${colors.icon}`} />
                        </motion.div>
                      </div>
                      
                      {/* Connection Arrow */}
                      {index < processSteps.length - 1 && (
                        <div className="flex justify-center mt-8">
                          <ArrowRight className="w-6 h-6 text-nature-400 transform rotate-90" />
                        </div>
                      )}
                    </div>

                    {/* Visual Element */}
                    <div className={`lg:col-span-5 ${index % 2 === 0 ? '' : 'lg:order-1'}`}>
                      <motion.div
                        animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative"
                      >
                        {/* Step Number */}
                        <div className={`absolute -top-4 -left-4 w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center border-2 ${colors.border} font-bold text-xl ${colors.accent} shadow-soft bg-white z-10`}>
                          {index + 1}
                        </div>
                        
                        {/* Growth Visualization */}
                        <div className="bg-white rounded-lg shadow-soft border border-nature-200 p-8">
                          <div className="text-center">
                            <div className={`inline-flex w-24 h-24 ${colors.bg} rounded-full items-center justify-center mb-4`}>
                              <Icon className={`w-12 h-12 ${colors.icon}`} />
                            </div>
                            <h4 className="text-lg font-display font-bold text-text-primary mb-2">
                              {step.title} Stage
                            </h4>
                            <BodyText size="sm" color="muted">
                              {step.subtitle}
                            </BodyText>
                          </div>
                        </div>
                        
                        {/* Floating decorative elements */}
                        <motion.div
                          animate={{ 
                            rotate: [0, 15, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          }}
                          className={`absolute -bottom-2 -right-2 w-6 h-6 ${colors.bg.replace('50', '200')} rounded-full blur-sm`}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Process Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-lg shadow-soft border border-nature-200 p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <Heading level={3} className="mb-4">
                Why our process works for small businesses
              </Heading>
              <BodyText size="lg" color="muted">
                Unlike corporate agencies, we designed our process specifically for small business owners who value partnership over transactions.
              </BodyText>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Collaborative</h4>
                <BodyText size="sm" color="muted">
                  You're involved every step. No black boxes or surprise reveals.
                </BodyText>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-accent-600" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Efficient</h4>
                <BodyText size="sm" color="muted">
                  Respectful of your time. Clear timelines. No endless revisions.
                </BodyText>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-nature-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-nature-700" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Strategic</h4>
                <BodyText size="sm" color="muted">
                  Every decision serves your business goals. No design for design's sake.
                </BodyText>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default ProcessSection;