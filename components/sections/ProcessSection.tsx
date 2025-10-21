// components/sections/ProcessSection.tsx - Streamlined & Scannable

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Leaf, Flower, Sun } from 'lucide-react';

const processSteps = [
  {
    id: 'sprout',
    number: 1,
    stage: 'Sprout',
    icon: <Sprout className="w-8 h-8" />,
    title: 'Strategic Foundation',
    subtitle: 'Breaking through limitations',
    description: 'We break through the surface together, establishing the foundation for everything to come.',
    highlights: [
      'Deep dive into your business',
      'Understand your customers',
      'Map your competitive edge',
      'Create clear roadmap'
    ],
    outcome: 'Shared vision and strategic direction',
    color: {
      bg: 'bg-green-50',
      icon: 'text-green-500',
      border: 'border-green-200',
      accent: 'bg-green-500',
      gradientColor: 'rgba(34, 197, 94, 0.12)' // Light green
    }
  },
  {
    id: 'leaf',
    number: 2,
    stage: 'Leaf',
    icon: <Leaf className="w-8 h-8" />,
    title: 'Growth & Development',
    subtitle: 'Building strength and framework',
    description: 'We develop the structure and messaging that will help your business thrive.',
    highlights: [
      'Craft resonant messaging',
      'Design site architecture',
      'Develop brand voice',
      'Build content strategy'
    ],
    outcome: 'Professional design direction',
    color: {
      bg: 'bg-green-100',
      icon: 'text-green-600',
      border: 'border-green-300',
      accent: 'bg-green-600',
      gradientColor: 'rgba(22, 163, 74, 0.15)' // Medium green
    }
  },
  {
    id: 'bloom',
    number: 3,
    stage: 'Bloom',
    icon: <Flower className="w-8 h-8" />,
    title: 'Design & Development',
    subtitle: 'Beautiful transformation',
    description: 'Your business blooms as we build a website that captures attention and converts.',
    highlights: [
      'Build fast, secure site',
      'Implement conversion design',
      'Integrate tools & systems',
      'Test everything thoroughly'
    ],
    outcome: 'Beautiful website ready to launch',
    color: {
      bg: 'bg-green-100',
      icon: 'text-green-700',
      border: 'border-green-400',
      accent: 'bg-green-700',
      gradientColor: 'rgba(21, 128, 61, 0.18)' // Dark green
    }
  },
  {
    id: 'flourish',
    number: 4,
    stage: 'Flourish',
    icon: <Sun className="w-8 h-8" />,
    title: 'Launch & Partnership',
    subtitle: 'Continued success',
    description: 'We launch your site and ensure you have everything needed to flourish.',
    highlights: [
      'Smooth launch process',
      'Train you on management',
      'Set up analytics',
      'Ongoing support available'
    ],
    outcome: 'Thriving business with confidence',
    color: {
      bg: 'bg-amber-50',
      icon: 'text-amber-500',
      border: 'border-amber-300',
      accent: 'bg-amber-500',
      gradientColor: 'rgba(245, 158, 11, 0.15)' // Bright amber/gold
    }
  }
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-20 bg-white overflow-hidden">
      
      {/* Subtle Background */}
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
          <div className="inline-flex items-center gap-2 text-primary-600 font-medium mb-4">
            <div className="w-12 h-px bg-primary-400"></div>
            <span className="text-sm uppercase tracking-wider">Our Process</span>
            <div className="w-12 h-px bg-primary-400"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            How We{' '}
            <span className="text-primary-600">Grow Together</span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Four stages. Total transparency. You're involved every step.
          </p>
        </motion.div>

        {/* Process Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Compact Card - NO TIMELINE TAG */}
              <div className={`relative bg-white rounded-2xl p-6 shadow-md border-2 ${step.color.border} hover:shadow-lg transition-shadow h-full overflow-hidden`}>
                
                {/* Gradient Overlay - Top to Bottom Fade */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    background: `linear-gradient(to bottom, ${step.color.gradientColor} 0%, transparent 50%)`
                  }}
                />

                {/* Content Container - Relative to sit above gradient */}
                <div className="relative z-10">
                  {/* Header - Just Number Badge */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-10 h-10 ${step.color.accent} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md`}>
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 ${step.color.bg} rounded-xl flex items-center justify-center ${step.color.icon}`}>
                    {step.icon}
                  </div>

                  {/* Stage Name */}
                  <div className="text-center mb-4">
                    <h3 className={`text-2xl font-display font-bold mb-1 ${step.color.icon}`}>
                      {step.stage}
                    </h3>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {step.title}
                    </p>
                    <p className={`text-xs ${step.color.icon} italic`}>
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed text-center">
                    {step.description}
                  </p>

                  {/* Highlights - Compact */}
                  <ul className="space-y-1.5 mb-4">
                    {step.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                        <div className={`w-1 h-1 rounded-full flex-shrink-0 ${step.color.accent}`}></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Outcome */}
                  <div className={`${step.color.accent} rounded-lg p-3 border-2 ${step.color.border} text-center`}>
                    <p className="text-xs font-bold text-white">
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Simple Partnership Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center bg-primary-50 rounded-xl p-6 border border-primary-200 mb-12"
        >
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
            <strong className="text-gray-900">Here's our promise:</strong> You'll know exactly what's happening at every stage. 
            Regular updates, clear timelines, and your feedback welcomed throughout.
          </p>
        </motion.div>

      </div>
    </section>
  );
}