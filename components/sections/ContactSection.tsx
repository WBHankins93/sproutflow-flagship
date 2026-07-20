'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, Mail, Phone } from 'lucide-react';
import { BodyText, Container, Heading, Section } from '../layout/StudioLayout';

const callBenefits = [
  'A recommendation based on your goals and budget',
  'A realistic scope and timeline',
  'A fixed quote before any work begins',
];

export default function ContactSection() {
  return (
    <Section id="contact" background="white" padding="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-primary-200 bg-primary-50/60 shadow-sm"
        >
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">
                <Calendar className="h-4 w-4" />
                Start a project
              </div>

              <Heading level={2} className="mb-5">
                Tell us what you want to improve
              </Heading>

              <BodyText size="lg" className="reading-width mb-7 text-pretty">
                Share the basics in about five minutes. We&apos;ll review your project and reply within one business day with the clearest next step.
              </BodyText>

              <ul className="mb-8 space-y-3">
                {callBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-text-secondary">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary-600" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/inquiry"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-primary-700 px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-primary-800 sm:w-auto"
              >
                Tell us about your project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <aside className="border-t border-primary-200 bg-white/75 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="mb-3 text-xl font-display font-semibold text-text-primary">
                Prefer to contact Ben directly?
              </h3>
              <p className="mb-7 text-text-secondary">
                A short note is enough. You do not need a finished brief.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:ben@sproutflow-studio.com"
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-primary-300"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-100 text-primary-700">
                    <Mail className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-text-primary">Email</span>
                    <span className="break-all text-sm text-text-secondary group-hover:text-primary-700">ben@sproutflow-studio.com</span>
                  </span>
                </a>

                <a
                  href="tel:+15043261676"
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 hover:border-primary-300"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-100 text-accent-700">
                    <Phone className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-text-primary">Phone</span>
                    <span className="text-sm text-text-secondary group-hover:text-primary-700">(504) 326-1676</span>
                  </span>
                </a>
              </div>
            </aside>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
