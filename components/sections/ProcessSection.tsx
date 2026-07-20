// components/sections/ProcessSection.tsx - Streamlined & Scannable

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Leaf, Flower, Sun } from 'lucide-react';
import Link from 'next/link';
import { Container } from '../layout/StudioLayout';

const processSteps = [
  {
    id: 'sprout',
    number: 1,
    stage: 'Plan',
    icon: <Sprout className="w-8 h-8" />,
    title: 'Strategy and scope',
    description: 'We define the buyer, the business goal, the project scope, and a fixed quote.',
    color: {
      bg: 'bg-primary-50',
      icon: 'text-primary-500',
      border: 'border-primary-200',
      accent: 'bg-primary-500',
      gradientColor: 'rgba(95, 117, 94, 0.12)' // Primary brand color
    }
  },
  {
    id: 'leaf',
    number: 2,
    stage: 'Write and design',
    icon: <Leaf className="w-8 h-8" />,
    title: 'Message and direction',
    description: 'We shape the copy, page structure, and visual direction before development starts.',
    color: {
      bg: 'bg-primary-100',
      icon: 'text-primary-600',
      border: 'border-primary-300',
      accent: 'bg-primary-600',
      gradientColor: 'rgba(95, 117, 94, 0.15)' // Primary brand color
    }
  },
  {
    id: 'bloom',
    number: 3,
    stage: 'Build and test',
    icon: <Flower className="w-8 h-8" />,
    title: 'Development and review',
    description: 'We build with real content, then test the experience across devices.',
    color: {
      bg: 'bg-nature-100',
      icon: 'text-nature-700',
      border: 'border-nature-300',
      accent: 'bg-nature-700',
      gradientColor: 'rgba(66, 83, 60, 0.18)' // Nature/Feldgrau color
    }
  },
  {
    id: 'flourish',
    number: 4,
    stage: 'Launch and support',
    icon: <Sun className="w-8 h-8" />,
    title: 'Handoff and next steps',
    description: 'We launch, train you, transfer ownership, and stay available if you want support.',
    color: {
      bg: 'bg-accent-50',
      icon: 'text-accent-500',
      border: 'border-accent-300',
      accent: 'bg-accent-500',
      gradientColor: 'rgba(196, 154, 69, 0.15)' // Accent gold color
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

      <Container className="relative z-10">
        
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
            <span className="text-sm uppercase tracking-wider">What happens next</span>
            <div className="w-12 h-px bg-primary-400"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            A clear path from first call to launch
          </h2>
          
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Four stages, clear approvals, and no mystery about who owns the next step.
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
                <div className="relative z-10 flex flex-col h-full">
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
                  <div className="text-center mb-4 flex-1">
                    <h3 className={`text-2xl font-display font-bold mb-1 ${step.color.icon}`}>
                      {step.stage}
                    </h3>
                    <p className="text-sm font-semibold text-text-primary mb-1">
                      {step.title}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed text-center font-body">
                      {step.description}
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
          <p className="text-text-secondary leading-relaxed max-w-3xl mx-auto">
            <strong className="text-text-primary">Our promise:</strong> You&apos;ll know what is happening, what we need from you, and what comes next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/how-we-work"
            className="inline-flex items-center justify-center rounded-full border border-primary-300 px-6 py-3 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
          >
            See the full process
          </Link>
        </motion.div>

      </Container>
    </section>
  );
}
