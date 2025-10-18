// components/sections/ContactSection.tsx - Let's Start Something Beautiful

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Coffee, 
  Rocket, 
  MessageCircle, 
  ArrowRight, 
  Clock, 
  Users, 
  Lightbulb,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { Container, Section, Heading, BodyText, Card } from '../layout/StudioLayout';

type ConversationOption = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  bestFor: string[];
  icon: React.ReactNode;
  color: 'primary' | 'accent' | 'nature';
  ctaText: string;
};

const ContactSection: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const conversationOptions: ConversationOption[] = [
    {
      id: 'quick-chat',
      title: 'Quick Chat',
      subtitle: 'Perfect for exploring ideas',
      description: 'A friendly conversation to understand your vision and see if we\'re a good fit. No pressure, just genuine discussion about your business dreams.',
      duration: '15 minutes',
      bestFor: [
        'Initial idea exploration',
        'Understanding if we\'re aligned',
        'Getting quick answers to questions',
        'Learning about our process'
      ],
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'accent',
      ctaText: 'Schedule Quick Chat'
    },
    {
      id: 'coffee-conversation',
      title: 'Coffee & Conversation',
      subtitle: 'Let\'s dive deep into your vision',
      description: 'Grab your favorite beverage and let\'s have a real conversation about your business, challenges, and goals. This is where the magic begins.',
      duration: '30 minutes',
      bestFor: [
        'Detailed vision discussion',
        'Understanding your market',
        'Exploring transformation possibilities',
        'Building genuine connection'
      ],
      icon: <Coffee className="w-6 h-6" />,
      color: 'primary',
      ctaText: 'Book Coffee Chat'
    },
    {
      id: 'project-planning',
      title: 'Project Planning Session',
      subtitle: 'Ready to map out your transformation',
      description: 'You know what you want, and we\'re ready to make it happen. Let\'s create a detailed roadmap for your business transformation.',
      duration: '60 minutes',
      bestFor: [
        'Detailed project scoping',
        'Timeline and milestone planning',
        'Investment discussion',
        'Next steps planning'
      ],
      icon: <Rocket className="w-6 h-6" />,
      color: 'nature',
      ctaText: 'Plan Your Project'
    }
  ];

  const colorMap = {
    primary: {
      bg: 'bg-primary-50',
      border: 'border-primary-200',
      icon: 'text-primary-600',
      accent: 'text-primary-600',
      button: 'bg-primary-600 hover:bg-primary-700 text-white'
    },
    accent: {
      bg: 'bg-accent-50',
      border: 'border-accent-200', 
      icon: 'text-accent-600',
      accent: 'text-accent-600',
      button: 'bg-accent-600 hover:bg-accent-700 text-white'
    },
    nature: {
      bg: 'bg-nature-50',
      border: 'border-nature-200',
      icon: 'text-nature-700',
      accent: 'text-nature-700',
      button: 'bg-nature-600 hover:bg-nature-700 text-white'
    }
  } as const;

  return (
    <Section id="contact" background="white" padding="lg">
      <Container>
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <Heading level={2} className="mb-8">
              <span className="text-text-primary">Let&apos;s start </span>
              <span className="text-primary-600 relative">
                something beautiful
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 left-0 h-1 bg-accent-500/40 rounded-full"
                />
              </span>
            </Heading>
            
            <BodyText size="lg" className="max-w-3xl mx-auto leading-relaxed mb-8">
              Every great partnership begins with a conversation. Choose the option that feels 
              right for where you are in your journey.
            </BodyText>

            <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-5 h-5 text-accent-600" />
                <span className="font-semibold text-accent-700">No Forms Required</span>
              </div>
              <BodyText size="sm" color="muted">
                We believe in real conversations, not corporate questionnaires. 
                Pick your preferred way to connect, and let&apos;s talk like humans.
              </BodyText>
            </div>
          </motion.div>

          {/* Conversation Options */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {conversationOptions.map((option, index) => {
              const colors = colorMap[option.color];
              const isSelected = selectedOption === option.id;
              
              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  onMouseEnter={() => setSelectedOption(option.id)}
                  onMouseLeave={() => setSelectedOption(null)}
                  className="group"
                >
                  <Card className={`${colors.bg} ${colors.border} border-2 h-full transition-all duration-300 ${
                    isSelected ? 'shadow-nature scale-105' : 'hover:shadow-soft'
                  }`}>
                    
                    {/* Option Header */}
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-4 border-2 ${colors.border} shadow-soft`}>
                        <div className={colors.icon}>
                          {option.icon}
                        </div>
                      </div>
                      
                      <h3 className={`text-2xl font-display font-bold ${colors.accent} mb-2`}>
                        {option.title}
                      </h3>
                      
                      <h4 className="text-lg font-semibold text-text-primary mb-3">
                        {option.subtitle}
                      </h4>
                      
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-text-muted" />
                        <span className="text-sm text-text-muted font-medium">{option.duration}</span>
                      </div>
                    </div>
                    
                    {/* Option Description */}
                    <BodyText className="mb-6 text-center leading-relaxed">
                      {option.description}
                    </BodyText>
                    
                    {/* Best For List */}
                    <div className="mb-8">
                      <h5 className="font-semibold text-text-primary mb-3 text-center">Perfect for:</h5>
                      <ul className="space-y-2">
                        {option.bestFor.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 ${colors.bg.replace('50', '400')} rounded-full mt-2 flex-shrink-0`} />
                            <BodyText size="sm" color="muted">{item}</BodyText>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* CTA Button */}
                    <button className={`w-full ${colors.button} px-6 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md`}>
                      <span>{option.ctaText}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gray-50 rounded-2xl p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <Heading level={3} className="mb-4">
                Prefer a different approach?
              </Heading>
              <BodyText size="lg" color="muted">
                We&apos;re flexible. Reach out however feels most comfortable for you.
              </BodyText>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center group">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Send an Email</h4>
                <BodyText size="sm" color="muted" className="mb-3">
                  Traditional but effective. Tell us about your project.
                </BodyText>
                <a 
                  href="mailto:hello@sproutflow.com"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors inline-flex items-center gap-1"
                >
                  hello@sproutflow.com
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Give Us a Call</h4>
                <BodyText size="sm" color="muted" className="mb-3">
                  Sometimes voice is better. Leave a message if we miss you.
                </BodyText>
                <a 
                  href="tel:+15551234567"
                  className="text-accent-600 hover:text-accent-700 font-medium transition-colors inline-flex items-center gap-1"
                >
                  (555) 123-4567
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              
              <div className="text-center group">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-nature-700" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">New Orleans Based</h4>
                <BodyText size="sm" color="muted" className="mb-3">
                  Local to the Gulf Coast? We love meeting in person.
                </BodyText>
                <span className="text-nature-700 font-medium">
                  Greater New Orleans Area
                </span>
              </div>
            </div>
          </motion.div>

          {/* Final Encouragement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 lg:p-12 text-white">
              <Heading level={3} className="text-white mb-4">
                Your story deserves to be told beautifully
              </Heading>
              <BodyText size="lg" className="text-white/90 max-w-2xl mx-auto mb-8">
                Every small business has something special to offer the world. 
                Let&apos;s make sure your audience can see it, feel it, and connect with it.
              </BodyText>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2 group">
                  <Calendar className="w-5 h-5" />
                  <span>Start the Conversation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default ContactSection;