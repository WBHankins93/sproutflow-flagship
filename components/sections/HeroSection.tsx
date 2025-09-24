// components/sections/HeroSection.tsx - Professional Hero Section

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Container, Heading, BodyText, Button } from '../layout/StudioLayout';
import { heroContent } from '../../data/content';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Sophisticated Background - Subtle Organic Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-nature-50 to-neutral-50" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-nature-100 rounded-full blur-3xl" />
      </div>
      
      {/* Professional Content */}
      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Strategic Headline */}
          <Heading 
            level={1} 
            className="mb-6 max-w-3xl mx-auto"
          >
            {heroContent.headline}
          </Heading>
          
          {/* Business-Focused Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8"
          >
            <BodyText 
              size="lg" 
              className="max-w-2xl mx-auto leading-relaxed"
            >
              {heroContent.subheading}
            </BodyText>
          </motion.div>
          
          {/* Professional Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="mb-12"
          >
            <BodyText 
              color="muted" 
              className="max-w-xl mx-auto"
            >
              {heroContent.description}
            </BodyText>
          </motion.div>
          
          {/* Strategic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              variant="primary"
              size="lg"
              href="#contact"
              icon={<ArrowRight className="w-5 h-5" />}
              className="min-w-48"
            >
              {heroContent.primaryCTA}
            </Button>
            
            <Button 
              variant="secondary"
              size="lg"
              href="#portfolio"
              icon={<Play className="w-4 h-4" />}
              className="min-w-48"
            >
              {heroContent.secondaryCTA}
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Professional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mt-20 pt-12 border-t border-nature-200"
        >
          <BodyText size="sm" color="muted" className="mb-6">
            Trusted by businesses ready for professional results
          </BodyText>
          
          {/* Business Metrics - Professional Credibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-display font-semibold text-text-primary mb-2">
                $750 - $5K
              </div>
              <BodyText size="sm" color="muted">
                Professional investment range
              </BodyText>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-display font-semibold text-text-primary mb-2">
                1-8 weeks
              </div>
              <BodyText size="sm" color="muted">
                Strategic timeline delivery
              </BodyText>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-display font-semibold text-text-primary mb-2">
                Enterprise-grade
              </div>
              <BodyText size="sm" color="muted">
                Technical excellence standard
              </BodyText>
            </div>
          </div>
        </motion.div>
      </Container>
      
      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-nature-300 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-nature-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;