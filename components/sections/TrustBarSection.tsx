// components/sections/TrustBarSection.tsx - Client-attributed results bar
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const results = [
  {
    client: 'Second Line Psychiatry',
    result: '50% more qualified inquiries',
    href: '/case-studies/second-line-psychiatry',
  },
  {
    client: 'NOLA Pool Solutions',
    result: '30% customer acquisition growth',
    href: '/case-studies/nola-pool-solutions',
  },
  {
    // TODO: Replace with the real, approved Nealy Events result metric.
    // "Zero-to-traction launch" is the existing site claim; swap in a number when confirmed.
    client: 'Nealy Events',
    result: 'Zero-to-traction launch',
    href: '/case-studies/nealy-events',
  },
];

export default function TrustBarSection() {
  return (
    <section className="relative bg-nature-800 py-10 md:py-12">
      <Container>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {results.map((item, index) => (
            <motion.div
              key={item.client}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={item.href} className="group block text-center md:text-left">
                <p className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                  {item.result}
                </p>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  {item.client}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
