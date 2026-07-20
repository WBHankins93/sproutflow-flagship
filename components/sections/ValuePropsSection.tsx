// components/sections/ValuePropsSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, DollarSign, Wrench, BarChart3, HeadphonesIcon, ArrowRight } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const valueProps = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Be understood faster',
    description:
      'Clear positioning helps the right buyer quickly understand what you do, who it is for, and why they should trust you.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Turn attention into action',
    description:
      'Focused pages guide visitors toward one useful next step: call, book, request a quote, or buy.',
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Know what is working',
    description:
      'Analytics and conversion tracking show where leads come from and where the customer journey needs improvement.',
  },
];

const supportItems = [
  {
    icon: <Wrench className="w-5 h-5" />,
    title: 'Ongoing maintenance',
    description: 'Security, updates, and performance checks to keep your site stable and reliable.',
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'SEO and growth improvements',
    description: 'Continuous optimization, analytics reporting, and strategic growth consulting.',
  },
  {
    icon: <HeadphonesIcon className="w-5 h-5" />,
    title: 'Responsive technical support',
    description: 'Fast, reliable help when you need changes, fixes, or have questions about your site.',
  },
];

export default function ValuePropsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-primary-50/40 to-white overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #5F755E 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-display text-text-primary mb-5 leading-tight">
            A better website should make buying easier
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto font-body leading-relaxed">
            The job is simple: help the right person understand your value, trust your business, and take the next step.
          </p>
        </motion.div>

        {/* Value Prop Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-200 p-7 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-text-secondary mb-5 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors duration-300">
                  {prop.icon}
                </div>

                {/* Title - using display font for variety */}
                <h3 className="text-xl md:text-[1.35rem] font-display font-bold text-text-primary mb-3 leading-snug">
                  {prop.title}
                </h3>

                {/* Description - body font, slightly lighter weight for contrast */}
                <p className="text-[0.95rem] text-text-secondary leading-relaxed font-body">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* "We don't disappear after launch" Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-2xl bg-primary-800 text-white overflow-hidden"
        >
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />

          <div className="relative z-10 p-8 md:p-10">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h3 className="text-2xl md:text-[1.7rem] font-display font-bold leading-tight">
                Support that continues after launch
              </h3>
              <a
                href="/inquiry"
                className="inline-flex items-center gap-2 bg-white text-primary-800 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap group"
              >
                Ask about support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <p className="text-white/80 text-sm mb-8 font-body max-w-2xl">
              Maintenance, reporting, and improvements are optional. Your site and accounts still belong to you.
            </p>

            {/* Support Cards */}
            <div className="grid md:grid-cols-3 gap-5">
              {supportItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white/90 mb-3">
                    {item.icon}
                  </div>
                  <h4 className="font-display text-base font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed font-body">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
