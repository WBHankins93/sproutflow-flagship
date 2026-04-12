'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Handshake, Wrench, SearchCheck, LifeBuoy } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const valuePoints = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary-600" />,
    title: 'Trust starts in seconds',
    description:
      'Your website is often your first impression. A professional presence helps serious buyers trust you faster.',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-primary-600" />,
    title: 'Conversion is the real goal',
    description:
      'A better site guides visitors to take action—book a call, request a quote, or make contact with confidence.',
  },
  {
    icon: <Handshake className="h-6 w-6 text-primary-600" />,
    title: 'One great client can justify the investment',
    description:
      'For many small businesses, a single high-value project won through your website can cover the cost of doing it right.',
  },
];

const supportItems = [
  {
    icon: <Wrench className="h-5 w-5 text-white" />,
    title: 'Ongoing maintenance',
    description: 'Security, updates, and performance checks to keep your site stable and reliable.',
  },
  {
    icon: <SearchCheck className="h-5 w-5 text-white" />,
    title: 'SEO and growth improvements',
    description: 'Continuous optimization opportunities so your site keeps improving after launch.',
  },
  {
    icon: <LifeBuoy className="h-5 w-5 text-white" />,
    title: 'Responsive technical support',
    description: 'When questions or issues come up, you have a partner—not a disappearing freelancer.',
  },
];

export default function ValueSupportSection() {
  return (
    <section className="bg-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-4xl md:text-5xl font-display font-bold text-text-primary">
            A better website does more than look good
          </h2>
          <p className="text-lg text-text-secondary">
            Enterprise-level thinking, built for small businesses that need credibility, conversion, and measurable momentum.
          </p>
        </motion.div>

        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {valuePoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-nature-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex rounded-full bg-primary-50 p-3">{point.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-text-primary">{point.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-primary-600 p-8 md:p-10"
        >
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-3xl font-display font-semibold text-white mb-2">We don&apos;t disappear after launch</h3>
              <p className="text-white/90 max-w-2xl">
                You get support beyond launch so your site keeps performing as your business grows.
              </p>
            </div>
            <a
              href="/inquiry"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary-700 transition hover:bg-white/90"
            >
              See if we&apos;re a fit
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {supportItems.map((item) => (
              <div key={item.title} className="rounded-xl border border-white/25 bg-white/10 p-4">
                <div className="mb-3 inline-flex rounded-full bg-white/20 p-2">{item.icon}</div>
                <h4 className="mb-1 font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-white/85">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
