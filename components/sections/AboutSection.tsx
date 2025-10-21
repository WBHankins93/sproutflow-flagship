// components/sections/AboutSection.tsx - Content Updates Only

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Users, Target, ArrowRight } from 'lucide-react';
import { Container, Section, Heading, BodyText, Button, Grid, Card } from '../layout/StudioLayout';

const AboutSection: React.FC = () => {
  return (
    <Section id="about" background="white" padding="lg">
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
              Meet the Team Behind Your Success
            </Heading>
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
              {/* Photo Placeholder */}
              <div className="bg-gradient-to-br from-primary-100 to-nature-100 rounded-2xl aspect-square mb-6 flex items-center justify-center border-2 border-primary-200">
                <div className="text-center p-8">
                  {/* Temporary placeholder - replace with actual photo */}
                  <div className="w-32 h-32 bg-primary-200 rounded-full mx-auto mb-4"></div>
                  <p className="text-primary-600 font-medium">Your Photo Here</p>
                </div>
              </div>

              <Heading level={3} className="mb-3 text-2xl">
                Hi, I&apos;m Ben 👋
              </Heading>
              
              <BodyText className="mb-4 leading-relaxed">
                I&apos;ve spent most of my career building systems for companies with massive budgets. Along the way, I learned what makes customers instantly trust a brand online.
              </BodyText>

              <BodyText className="mb-4 leading-relaxed">
                Then I noticed something that bothered me: the businesses I actually loved—the ones making communities better—looked amateur online. Not because they lacked professionalism. Just because professional design felt financially out of reach.
              </BodyText>

              <BodyText className="mb-4 leading-relaxed">
                So I started Sproutflow to fix that gap. I take what works for Fortune 500 companies and make it work for real businesses at real prices.
              </BodyText>

              <BodyText color="muted" className="italic">
                Collecting stories from small businesses that make communities special.
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
                  Level the Playing Field
                </Heading>
                <BodyText className="mb-4 leading-relaxed">
                  Big companies have design teams that study human psychology.
                </BodyText>
                <BodyText className="mb-4 leading-relaxed">
                  Small businesses? You get DIY tools and hope for the best. 
                </BodyText>

                <BodyText className="mb-4 leading-relaxed">
                  We fix that. Enterprise strategy. Small business pricing. No compromise on quality.
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
                      <p className="font-semibold text-text-primary mb-1">Small Business First</p>
                      <BodyText className="text-sm">Every decision prioritizes what&apos;s best for small businesses, not what&apos;s easiest for us.</BodyText>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Target className="w-5 h-5 text-nature-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">No BS Pricing</p>
                      <BodyText className="text-sm">Transparent pricing, clear timelines, honest conversations. No hidden fees.</BodyText>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Users className="w-5 h-5 text-nature-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-text-primary mb-1">True Partnership</p>
                      <BodyText className="text-sm">You&apos;re not just a client. We succeed when you succeed.</BodyText>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Simple CTA */}
          {/* Simple CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-12 pb-16 border-t border-nature-200"
          >
            <Heading level={3} className="mb-3">
              Ready to Level the Playing Field?
            </Heading>
            <BodyText color="muted" className="mb-8 max-w-xl mx-auto">
              Let&apos;s give your business the professional presence it deserves
            </BodyText>
            
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Start Your Transformation
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default AboutSection;