// components/sections/BusinessSystemsSection.tsx - Layer 2: custom business software
//
// The differentiator behind the website offer. Websites are the front door;
// this section sells the operations layer that justifies the upper price tiers.
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, FileEdit, Workflow, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const systems = [
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    title: 'Internal admin tools and dashboards',
    description:
      'Role-based tools for owners, managers, and staff. See jobs, customers, and numbers in one place instead of five apps and a spreadsheet.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Custom CRM and customer management',
    description:
      'Track every lead, customer, and job in a system built around how your business actually works. No per-seat software bloat you only use 10% of.',
  },
  {
    icon: <FileEdit className="w-6 h-6" />,
    title: 'Lightweight CMS builds',
    description:
      'Update your own content. Change a price, add a photo, post an update. No developer needed and no waiting.',
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: 'Workflow automation',
    description:
      'Intake, follow-up, scheduling, and document processing that run on their own. Hours back every week, and fewer leads slipping through.',
  },
];

// TODO: Confirm each proof point below is approved as a public reference before deploy.
const proofPoints = [
  // TODO: confirm public reference is approved
  'Custom multi-tenant operations platform for a 64-location service business',
  // TODO: confirm inclusion
  'AI-powered resume screening product (Greenlit), live in beta',
  // TODO: confirm inclusion
  'Missed-call automation systems for trade businesses',
];

export default function BusinessSystemsSection() {
  return (
    <section id="business-systems" className="relative py-24 bg-nature-800 text-white overflow-hidden">
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
          <div className="inline-flex items-center gap-2 text-green-300 font-medium mb-6">
            <div className="w-12 h-px bg-green-300/60"></div>
            <span className="text-sm uppercase tracking-wider">Beyond the Website</span>
            <div className="w-12 h-px bg-green-300/60"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Already have a website?{' '}
            <span className="text-green-300 italic">The next bottleneck is what happens after the click.</span>
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We build the internal tools and automation that handle it. Anyone can sell you a website. Very few local providers can build the operations layer behind it. That is where we are different.
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
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-green-300 mb-5">
                {item.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
              <p className="text-[0.95rem] text-white/75 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Proof points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/15 bg-white/5 p-7 md:p-8 mb-12"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-green-300 mb-5">
            Systems we have shipped
          </p>
          <ul className="grid gap-4 md:grid-cols-3">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/85 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Pricing connection + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
            Websites start our pricing range. Systems work extends it. The upper tiers are where custom CRMs, admin tools, and automation come in.
          </p>
          <a
            href="/inquiry"
            className="inline-flex items-center gap-3 bg-white text-nature-800 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
          >
            Book a Discovery Call
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
