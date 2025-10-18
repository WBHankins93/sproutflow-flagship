// components/sections/AboutSection.tsx - Streamlined & Scannable

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Users, ArrowRight } from 'lucide-react';
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

          {/* Two-Column Layout: Ben + Sproutflow Story */}
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
                Former Fortune 500 infrastructure engineer turned small business advocate. 
                I spent years building enterprise systems for companies with unlimited budgets—
                and watched small businesses struggle with the same challenges but none of the resources.
              </BodyText>

              <BodyText className="mb-4 leading-relaxed">
                <strong className="text-text-primary">Here&apos;s the thing:</strong> That local café 
                deserves the same trust signals as Starbucks. Your family business should command 
                the same respect as corporate giants. So I started Sproutflow to level the playing field.
              </BodyText>

              <BodyText color="muted" className="italic">
                When I&apos;m not designing websites, you&apos;ll find me exploring New Orleans coffee shops 
                or hiking Oregon trails—always looking for the next great small business story to tell.
              </BodyText>
            </motion.div>

            {/* RIGHT: About Sproutflow (Mission-Focused) */}
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
                  Fortune 500 Design. Small Business Heart.
                </Heading>
                <BodyText className="leading-relaxed">
                  We bring enterprise-level design psychology—the kind that builds instant trust 
                  and credibility—to small businesses at prices that actually make sense. 
                  Because when customers judge you in 50 milliseconds, you deserve every advantage.
                </BodyText>
              </div>

              {/* Story (Brief) */}
              <div className="bg-nature-50 rounded-2xl p-8 border border-nature-200 shadow-sm">
                <div className="text-nature-700 font-bold text-sm uppercase tracking-wider mb-3">
                  Our Story
                </div>
                <BodyText className="mb-4 leading-relaxed">
                  <strong className="text-text-primary">The problem was obvious:</strong> Small 
                  businesses face the same harsh customer judgment as Fortune 500 companies, 
                  but don&apos;t have access to the same design resources that create instant credibility.
                </BodyText>
                <BodyText className="leading-relaxed">
                  So we built Sproutflow—a studio that democratizes professional design. 
                  No corporate bureaucracy. No impossible budgets. Just results that help you compete.
                </BodyText>
              </div>
            </motion.div>

          </div>

          {/* Values - Compact, Scannable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-10">
              <Heading level={3} className="mb-3">
                What We Stand For
              </Heading>
              <BodyText color="muted" className="max-w-2xl mx-auto">
                Three principles that guide everything we do
              </BodyText>
            </div>
            
            <Grid cols={3} gap="md">
              
              {/* Value 1: Empathy */}
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-7 h-7 text-primary-600" />
                </div>
                <Heading level={3} className="text-lg mb-2">
                  We Get It
                </Heading>
                <BodyText size="sm" color="muted">
                  Real budgets. Real timelines. Real small business challenges.
                </BodyText>
              </Card>

              {/* Value 2: Excellence */}
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-accent-600" />
                </div>
                <Heading level={3} className="text-lg mb-2">
                  No Compromises
                </Heading>
                <BodyText size="sm" color="muted">
                  Enterprise-quality design at small business prices.
                </BodyText>
              </Card>

              {/* Value 3: Partnership */}
              <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-nature-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-nature-700" />
                </div>
                <Heading level={3} className="text-lg mb-2">
                  True Partners
                </Heading>
                <BodyText size="sm" color="muted">
                  Your success is our success. We&apos;re invested in your growth.
                </BodyText>
              </Card>
            </Grid>
          </motion.div>

          {/* Simple CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center pt-12 border-t border-nature-200"
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
