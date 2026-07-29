// components/sections/AboutSection.tsx - Content Updates Only

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Users, Target } from 'lucide-react';
import { Container, Section, Heading, BodyText } from '../layout/StudioLayout';
import { getImageUrl } from '@/lib/blob-images';

const AboutSection: React.FC = () => {
  return (
    <Section id="about" background="nature" padding="lg" className="overflow-hidden">
      <Container>
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Heading level={2} className="mb-4">
              Meet Ben
            </Heading>
            <BodyText size="lg" className="mx-auto max-w-2xl">
              You work directly with the founder—no sales handoff and no mystery team after kickoff.
            </BodyText>
          </motion.div>

          {/* Two-Column Layout: Ben + Mission */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
            
            {/* LEFT: About Ben (Personal Touch) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Photo */}
              <div className="relative w-full rounded-2xl overflow-hidden mb-6 aspect-square border-2 border-primary-200 shadow-lg bg-gray-100">
                <Image 
                  src={getImageUrl('ben-photo.png')} 
                  alt="Ben Hankins, Founder of Sproutflow Studio"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <Heading level={3} className="mb-3 text-2xl">
                Founder-direct from the first conversation
              </Heading>

              <BodyText className="mb-4 leading-relaxed">
                Ben Hankins spent years building and operating software for large companies. He brings the same care for reliability, security, and clear communication to small-business projects.
              </BodyText>

              <BodyText className="mb-4 leading-relaxed">
                Sproutflow started after he saw too many excellent local businesses held back by unclear websites and disconnected tools.
              </BodyText>

              <BodyText className="mb-4 leading-relaxed">
                The goal is practical: make your business easier to trust, easier to buy from, and easier to run.
              </BodyText>

              <BodyText color="muted" className="italic">
                Based in New Orleans and working with businesses nationwide.
              </BodyText>
            </motion.div>

            {/* RIGHT: Mission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Mission */}
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 border border-primary-100 mb-6 shadow-sm">
                <div className="text-primary-600 font-bold text-sm uppercase tracking-wider mb-3">
                  Our Mission
                </div>
                <Heading level={3} className="mb-4 text-2xl">
                  Give good businesses better tools
                </Heading>
                <BodyText className="mb-4 leading-relaxed">
                  Clear strategy, careful design, and dependable engineering should not be reserved for companies with huge budgets.
                </BodyText>
              </div>

              {/* What We Stand For (Company Values) */}
              <div className="bg-nature-50 rounded-2xl p-8 border border-nature-200 shadow-sm">
                <div className="text-nature-700 font-bold text-sm uppercase tracking-wider mb-3">
                  What We Stand For
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Heart className="w-5 h-5 text-nature-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Small business first</p>
                      <BodyText className="text-sm">Recommendations should fit your goals, team, and budget—not ours.</BodyText>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Target className="w-5 h-5 text-nature-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Clear scope and pricing</p>
                      <BodyText className="text-sm">You approve the deliverables, timeline, and fixed quote before work starts.</BodyText>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Users className="w-5 h-5 text-nature-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">Direct partnership</p>
                      <BodyText className="text-sm">You work with the person responsible for the strategy and the build.</BodyText>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>

    </Section>
  );
};

export default AboutSection;
