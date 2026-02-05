// components/sections/PortfolioSection.tsx - Visual & Story-Driven

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  MapPin, 
  Coffee, 
  Scale, 
  Calendar,
  Users,
  Star,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { Container } from '../layout/StudioLayout';

// Portfolio data structure
const portfolioItems = [
  {
    id: 'bayou-heritage',
    title: 'Bayou Heritage Tours',
    category: 'Tourism & Experiences',
    description: 'Family swamp tour business connecting visitors with authentic Louisiana culture',
    challenge: 'Competing with corporate tour operators who had slick booking systems',
    solution: 'Built a warm, story-driven website with seamless booking that captures the authentic bayou experience',
    heroImage: getImageUrl('portfolio/bayou-heritage-hero.jpg'), // You'll add this
    tags: ['Booking System', 'Local Tourism', 'Heritage Storytelling'],
    colors: {
      primary: '#2D5016',
      secondary: '#8FBC8F',
      accent: '#DAA520'
    },
    icon: <MapPin className="w-8 h-8 text-white" />,
    results: [
      { metric: 'Online Bookings', value: '+180%', icon: <Calendar className="w-5 h-5" /> },
      { metric: 'Season Extension', value: '4 months', icon: <TrendingUp className="w-5 h-5" /> },
      { metric: 'Average Booking', value: '$85', icon: <DollarSign className="w-5 h-5" /> }
    ]
  },
  {
    id: 'creole-corner',
    title: 'Créole Corner Café',
    category: 'Restaurant & Local Business',
    description: 'Neighborhood café serving traditional Créole comfort food with modern twists',
    challenge: 'Customers couldn\'t find menu information online, takeout orders were confusing',
    solution: 'Created a warm digital presence that captures the café\'s homey atmosphere and simplifies ordering',
    heroImage: getImageUrl('portfolio/creole-corner-hero.jpg'),
    tags: ['Online Ordering', 'Menu Design', 'Local Restaurant'],
    colors: {
      primary: '#8B4513',
      secondary: '#D2691E',
      accent: '#FFD700'
    },
    icon: <Coffee className="w-8 h-8 text-white" />,
    results: [
      { metric: 'Online Orders', value: '+240%', icon: <Calendar className="w-5 h-5" /> },
      { metric: 'New Customers', value: '+65%', icon: <Users className="w-5 h-5" /> },
      { metric: 'Review Rating', value: '4.8★', icon: <Star className="w-5 h-5" /> }
    ]
  },
  {
    id: 'gulf-coast-legal',
    title: 'Gulf Coast Legal',
    category: 'Professional Services',
    description: 'Boutique law firm specializing in small business and maritime law',
    challenge: 'Generic law firm site that didn\'t communicate their small business focus',
    solution: 'Professional yet approachable design that builds trust and clarifies their niche expertise',
    heroImage: getImageUrl('portfolio/gulf-coast-legal-hero.jpg'),
    tags: ['Professional Services', 'Trust Building', 'Legal'],
    colors: {
      primary: '#1B3A52',
      secondary: '#4A7BA7',
      accent: '#C49A45'
    },
    icon: <Scale className="w-8 h-8 text-white" />,
    results: [
      { metric: 'Consultation Requests', value: '+320%', icon: <Calendar className="w-5 h-5" /> },
      { metric: 'Case Value', value: '+150%', icon: <DollarSign className="w-5 h-5" /> },
      { metric: 'Referral Rate', value: '85%', icon: <Users className="w-5 h-5" /> }
    ]
  }
];

export default function PortfolioSection() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <section id="portfolio" className="relative py-20 overflow-hidden">
      
      {/* Organic Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/20 to-white">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #5F755E 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Floating Decoration */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-20 right-10 w-32 h-32 opacity-10"
      >
        <div className="text-primary-300 text-8xl">🌿</div>
      </motion.div>

      <Container className="relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary-600 font-medium mb-6">
            <div className="w-12 h-px bg-primary-400"></div>
            <span className="text-sm uppercase tracking-wider">Our Work</span>
            <div className="w-12 h-px bg-primary-400"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Small Businesses,{' '}
            <span className="text-primary-600">Big Results</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            These are <strong className="text-text-primary">demonstration portfolios</strong> showcasing 
            the kind of transformation we create for our clients.
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Image Card with Hover Effect */}
              <div className="relative rounded-3xl overflow-hidden mb-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer">
                
                {/* Hero Image - PLACEHOLDER until you add real images */}
                <div className="aspect-[4/3] relative bg-gradient-to-br from-gray-100 to-gray-200">
                  {/* Temporary placeholder - replace with actual Image component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">{item.icon}</div>
                      <p className="text-text-muted font-medium">
                        Add image: {item.heroImage}
                      </p>
                    </div>
                  </div>
                  
                  {/* When you have images, use this: */}
                  {/* <Image 
                    src={item.heroImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  /> */}
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Icon Badge - Bottom Left */}
                  <div className="absolute bottom-4 left-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm"
                      style={{ backgroundColor: item.colors.primary }}
                    >
                      {item.icon}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium mb-1 opacity-90">{item.category}</p>
                      <h3 className="text-2xl font-display font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-80 line-clamp-2">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-display font-bold text-text-primary mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-muted">{item.category}</p>
                </div>

                {/* Description */}
                <p className="text-text-secondary mb-4 leading-relaxed text-sm">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs px-3 py-1 bg-primary-50 text-primary-700 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
                  {item.results.map((result) => (
                    <div key={result.metric} className="text-center">
                      <div className="flex justify-center mb-1">
                        <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary-600">
                          {result.icon}
                        </div>
                      </div>
                      <div className="text-xl md:text-2xl font-bold text-primary-600 mb-0.5">
                        {result.value}
                      </div>
                      <div className="text-xs text-text-muted leading-tight">
                        {result.metric}
                      </div>
                    </div>
                  ))}
                </div>

                {/* View Case Study Link */}
                <button 
                  className="w-full mt-5 py-2.5 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all flex items-center justify-center gap-2 group"
                  onClick={() => setSelectedItem(item.id)}
                >
                  View Full Case Study
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-text-secondary mb-6 text-lg">
            Ready to see your business here?
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Start Your Transformation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

      </Container>
    </section>
  );
}