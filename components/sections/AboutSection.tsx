// components/sections/AboutSection.tsx - Your Story Matters

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Zap, Award, ArrowRight, Building2, Coffee, Target } from 'lucide-react';
import { Container, Section, Heading, BodyText, Button, Grid, Card } from '../layout/StudioLayout';

const AboutSection: React.FC = () => {
  return (
    <Section id="about" background="white" padding="lg">
      <Container>
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header - Empathy First */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <Heading level={2} className="mb-8 max-w-3xl mx-auto">
              <span className="text-text-primary">We believe </span>
              <span className="text-primary-600 relative">
                small businesses
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 h-1 bg-accent-500/40 rounded-full"
                />
              </span>
              <br />
              <span className="text-text-primary">deserve the same respect as Fortune 500 companies</span>
            </Heading>
            
            <BodyText size="lg" className="max-w-2xl mx-auto leading-relaxed">
              That's why we bring enterprise-level design psychology to businesses 
              just like yours. Because when customers judge you in milliseconds, 
              <strong className="text-text-primary"> you deserve every advantage</strong>.
            </BodyText>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-center mb-20">
            
            {/* Story Content */}
            <div className="lg:col-span-7">
              
              {/* Personal Story - Building Trust */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-600" />
                  </div>
                  <Heading level={3} className="text-primary-600">
                    Your story matters
                  </Heading>
                </div>
                
                <BodyText className="mb-6">
                  After years of building enterprise infrastructure for Fortune 500 companies, 
                  we saw a frustrating pattern: small businesses were being left behind. 
                  They faced the same harsh judgment from customers but didn't have access 
                  to the same design resources that create instant trust and credibility.
                </BodyText>
                
                <BodyText className="mb-6">
                  That local bakery deserves the same psychological impact as Starbucks. 
                  That family law firm should command the same respect as corporate giants. 
                  Your business story matters, and it deserves to be told with the sophistication 
                  that builds trust in milliseconds.
                </BodyText>
              </motion.div>

              {/* Mission Statement */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gradient-to-r from-primary-50 to-nature-50 rounded-lg p-8 border border-primary-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-primary-600" />
                  <h4 className="text-xl font-display font-semibold text-text-primary">
                    Our Mission
                  </h4>
                </div>
                <BodyText>
                  <strong>Democratize enterprise-level design psychology</strong> for small businesses. 
                  We level the playing field by bringing the same psychological triggers that 
                  billion-dollar companies use—trust signals, sophisticated spacing, strategic color psychology—
                  to businesses that truly deserve to compete.
                </BodyText>
              </motion.div>
            </div>

            {/* Visual Elements */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                
                {/* David vs Goliath Visual */}
                <div className="bg-white rounded-lg shadow-soft border border-nature-200 p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-display font-semibold text-text-primary mb-2">
                      Leveling the Playing Field
                    </h4>
                    <BodyText size="sm" color="muted">
                      Why small businesses get unfairly judged
                    </BodyText>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Big Corporation */}
                    <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-8 h-8 text-neutral-600" />
                        <div>
                          <div className="font-semibold text-text-primary">Big Corporation</div>
                          <div className="text-sm text-text-muted">$100K design budget</div>
                        </div>
                      </div>
                      <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                    </div>
                    
                    {/* Vs */}
                    <div className="text-center">
                      <div className="text-accent-500 font-bold text-lg">VS</div>
                      <BodyText size="sm" color="muted">Same 50ms judgment time</BodyText>
                    </div>
                    
                    {/* Small Business Before */}
                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-center gap-3">
                        <Coffee className="w-8 h-8 text-red-600" />
                        <div>
                          <div className="font-semibold text-text-primary">Your Business</div>
                          <div className="text-sm text-text-muted">DIY website</div>
                        </div>
                      </div>
                      <div className="text-2xl">⭐⭐</div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="text-center">
                      <ArrowRight className="w-6 h-6 text-primary-600 mx-auto" />
                      <div className="text-primary-600 font-semibold text-sm mt-1">With Sproutflow</div>
                    </div>
                    
                    {/* Small Business After */}
                    <div className="flex items-center justify-between p-4 bg-primary-50 rounded-lg border border-primary-200">
                      <div className="flex items-center gap-3">
                        <Coffee className="w-8 h-8 text-primary-600" />
                        <div>
                          <div className="font-semibold text-text-primary">Your Business</div>
                          <div className="text-sm text-text-muted">Professional presence</div>
                        </div>
                      </div>
                      <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating animation elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 w-8 h-8 bg-accent-500/20 rounded-full blur-sm"
                />
              </motion.div>
            </div>
          </div>

          {/* Values/Differentiators Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-center mb-12">
              <Heading level={3} className="mb-4">
                Why small businesses choose us
              </Heading>
              <BodyText size="lg" color="muted" className="max-w-2xl mx-auto">
                We understand your challenges because we've seen both sides—
                enterprise budgets and small business realities.
              </BodyText>
            </div>
            
            <Grid cols={3} gap="lg">
              
              {/* Empathy */}
              <Card className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <Heart className="w-8 h-8 text-primary-600" />
                </div>
                
                <Heading level={3} className="text-xl mb-4">
                  We Get It
                </Heading>
                
                <BodyText color="muted" className="mb-4">
                  No corporate bureaucracy. No impossible budgets. 
                  We understand the real challenges of running a small business 
                  and price our services accordingly.
                </BodyText>
                
                <div className="text-sm text-primary-600 font-medium">
                  Accessible • Honest • Real
                </div>
              </Card>

              {/* Expertise */}
              <Card className="text-center group">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-200 transition-colors duration-300">
                  <Zap className="w-8 h-8 text-accent-600" />
                </div>
                
                <Heading level={3} className="text-xl mb-4">
                  Enterprise Expertise
                </Heading>
                
                <BodyText color="muted" className="mb-4">
                  Fortune 500-level design psychology and technical capabilities, 
                  refined through years of enterprise work and delivered 
                  with small business focus.
                </BodyText>
                
                <div className="text-sm text-accent-600 font-medium">
                  Proven • Advanced • Results-Driven
                </div>
              </Card>

              {/* Partnership */}
              <Card className="text-center group">
                <div className="w-16 h-16 bg-nature-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-nature-300 transition-colors duration-300">
                  <Users className="w-8 h-8 text-nature-700" />
                </div>
                
                <Heading level={3} className="text-xl mb-4">
                  True Partnership
                </Heading>
                
                <BodyText color="muted" className="mb-4">
                  You're not just another client number. We invest in your success 
                  because your growth validates our mission of democratizing 
                  professional design.
                </BodyText>
                
                <div className="text-sm text-nature-700 font-medium">
                  Invested • Collaborative • Long-term
                </div>
              </Card>
            </Grid>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-20 pt-12 border-t border-nature-200"
          >
            <Heading level={3} className="mb-4">
              Ready to compete with confidence?
            </Heading>
            <BodyText size="lg" color="muted" className="mb-8 max-w-2xl mx-auto">
              Let's give your small business the professional presence it deserves. 
              Because your story matters, and it's time the world sees that.
            </BodyText>
            
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              icon={<ArrowRight className="w-5 h-5" />}
              className="shadow-lg hover:shadow-xl"
            >
              Let's Level the Playing Field
            </Button>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default AboutSection;