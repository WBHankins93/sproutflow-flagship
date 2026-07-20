// components/sections/BusinessSystemsSection.tsx - Layer 2: custom business software
//
// The differentiator behind the website offer. Websites are the front door;
// this section sells the operations layer that justifies the upper price tiers.
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, FileEdit, Workflow, ArrowRight } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const systems = [
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: 'Internal admin tools and dashboards',
    description:
      'Give owners and staff one place to see jobs, customers, and the numbers that matter.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Custom CRM and customer management',
    description:
      'Track leads, customers, and jobs in a system shaped around the way your business actually works.',
  },
  {
    icon: <FileEdit className="w-6 h-6" />,
    title: 'Lightweight CMS builds',
    description:
      'Change a price, add a photo, or publish an update without waiting for a developer.',
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: 'Workflow automation',
    description:
      'Automate repeat intake, follow-up, scheduling, and document tasks so fewer leads slip through.',
  },
];

const systemPricingBands = [
  {
    band: 'Single-location tool',
    fit: 'One dashboard, basic CRM, one workflow automated',
  },
  {
    band: 'Multi-location platform',
    fit: 'Multi-tenant system, roughly 2-15 locations',
  },
  {
    band: 'Enterprise franchise rollout',
    fit: '40+ locations, phased per-store implementation',
  },
];

// Single proof point. The platform is a working demo, no client named.
// Personal projects (Greenlit, missed-call systems) intentionally not mentioned.

export default function BusinessSystemsSection() {
  return (
    <section id="business-systems" className="relative py-24 bg-primary-800 text-white overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 text-primary-300 font-medium mb-6">
            <div className="w-12 h-px bg-primary-300/60"></div>
            <span className="text-sm uppercase tracking-wider">Behind the website</span>
            <div className="w-12 h-px bg-primary-300/60"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            When the website works, make the business behind it work better
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We build practical internal tools and automation for the work that happens after a lead comes in.
          </p>
        </motion.div>

        {/* Systems Grid */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-12">
          {systems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/10 hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-primary-300 mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
              <p className="text-[0.95rem] text-white/75 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Proof point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/15 bg-white/5 p-7 md:p-8 mb-12 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300 mb-4">
            Working example
          </p>
          <p className="text-white/85 leading-relaxed max-w-2xl mx-auto">
            {/* {{CONFIRM: is this a live client deployment or capability/demo language?}} */}
            We built a multi-location operations platform that brings 64 locations into one dashboard. Ask to see the workflow during your project call.
          </p>
        </motion.div>

        {/* Pricing bands + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mx-auto mb-8 max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-white/5 text-left">
            {systemPricingBands.map((item) => (
              <div
                key={item.band}
                className="grid gap-3 border-b border-white/10 p-5 last:border-b-0 md:grid-cols-[1.1fr_1.6fr] md:items-center"
              >
                <p className="font-display text-lg font-bold text-white">{item.band}</p>
                <p className="text-sm leading-relaxed text-white/75">{item.fit}</p>
              </div>
            ))}
          </div>
          <a
            href="/inquiry"
            className="inline-flex items-center gap-3 bg-white text-primary-800 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            Discuss a business system
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
