// components/sections/ContactSection.tsx - FIXED VERSION
'use client';

import { motion } from 'framer-motion';
import { Container, Section, Heading, BodyText, Card } from '../layout/StudioLayout';
import { Calendar, Mail, MessageCircle, Clock, ArrowRight, Lightbulb, Rocket, Phone } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const conversationOptions = [
    // Temporarily commented out - only offering Discovery Call until Google Workspace budget is available
    // {
    //   id: 'quick-chat',
    //   title: 'Quick Chat',
    //   subtitle: 'Coffee-style conversation',
    //   description: 'Not ready to commit? Let\'s have a casual conversation about your business, vision, and see if we\'re a good fit.',
    //   duration: '15-20 minutes',
    //   bestFor: [
    //     'Getting to know each other',
    //     'Understanding your vision',
    //     'Exploring fit and compatibility',
    //     'No pressure, no pitch'
    //   ],
    //   icon: <MessageCircle className="w-6 h-6" />,
    //   color: 'primary',
    //   ctaText: 'Schedule Quick Chat',
    //   action: 'https://calendar.app.google/hMkRd7yqsovDwZuL7' // All options currently link to Discovery Call
    // },
    {
      id: 'discovery',
      title: 'Discovery Call',
      subtitle: 'Deep dive into your needs',
      description: 'Ready to explore working together? Let\'s discuss your goals, challenges, and how we can help you grow.',
      duration: '30-45 minutes',
      bestFor: [
        'Discussing project scope',
        'Exploring package options',
        'Understanding timelines',
        'Getting preliminary pricing'
      ],
      icon: <Calendar className="w-6 h-6" />,
      color: 'accent',
      ctaText: 'Book Discovery Call',
      action: 'https://calendar.app.google/hMkRd7yqsovDwZuL7' // Discovery Call scheduling page
    },
    // Temporarily commented out - only offering Discovery Call until Google Workspace budget is available
    // {
    //   id: 'strategy',
    //   title: 'Strategy Session',
    //   subtitle: 'Detailed project planning',
    //   description: 'Let\'s create a detailed roadmap for your business transformation.',
    //   duration: '60 minutes',
    //   bestFor: [
    //     'Detailed project scoping',
    //     'Timeline and milestone planning',
    //     'Investment discussion',
    //     'Next steps planning'
    //   ],
    //   icon: <Rocket className="w-6 h-6" />,
    //   color: 'nature',
    //   ctaText: 'Plan Your Project',
    //   action: 'https://calendar.app.google/hMkRd7yqsovDwZuL7' // All options currently link to Discovery Call
    // }
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
          {/* Currently showing only Discovery Call - Quick Chat and Strategy Session commented out until Google Workspace budget available */}
          <div className="grid lg:grid-cols-1 gap-8 mb-16 max-w-md mx-auto">
            {conversationOptions.map((option, index) => {
              const colors = colorMap[option.color as keyof typeof colorMap];
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
                    
                    {/* CTA Button - NOW WITH WORKING LINK */}
                    <a 
                      href={option.action}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full ${colors.button} px-6 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md`}
                    >
                      <span>{option.ctaText}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
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
              <a 
                href="mailto:hello@sproutflowstudio.com"
                className="text-center group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Send an Email</h4>
                <BodyText size="sm" color="muted" className="mb-3">
                  Traditional but effective. Tell us about your project.
                </BodyText>
                <span className="text-primary-600 font-medium hover:underline">
                  ben@sproutflow-studio.com
                </span>
              </a>

              <a 
                href="tel:+15045550000"
                className="text-center group"
              >
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Give Us a Call</h4>
                <BodyText size="sm" color="muted" className="mb-3">
                  Prefer voice? Let&apos;s have a quick conversation.
                </BodyText>
                <span className="text-accent-600 font-medium hover:underline">
                  (228) 327-1082
                </span>
              </a>

              <div className="text-center group">
                <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-nature-700" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">Send a Message</h4>
                <BodyText size="sm" color="muted" className="mb-3">
                  Quick questions? Drop us a line anytime.
                </BodyText>
                <a 
                  href="https://m.me/sproutflowstudio" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nature-700 font-medium hover:underline"
                >
                  Message on Facebook
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
};

export default ContactSection;