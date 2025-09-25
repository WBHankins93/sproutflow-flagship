// components/sections/PortfolioSection.tsx - Where Small Businesses Come Alive Online
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  TrendingUp, 
  Users, 
  Star, 
  MapPin, 
  Coffee, 
  Scale,
  ArrowRight,
  Eye,
  Calendar,
  DollarSign
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
    icon: React.ReactNode;
  }[];
  image: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  icon: React.ReactNode;
  tags: string[];
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 'bayou-heritage',
    title: 'Bayou Heritage Tours',
    category: 'Tourism & Experiences',
    description: 'Family-owned swamp tour business connecting visitors with authentic Louisiana culture',
    challenge: 'Seasonal bookings were unpredictable, and their DIY website looked outdated compared to larger tour companies',
    solution: 'Created an immersive booking experience that showcases the unique family heritage and authentic swamp expertise',
    results: [
      {
        metric: 'Online Bookings',
        value: '+180%',
        description: 'Direct bookings increased',
        icon: <Calendar className="w-5 h-5" />
      },
      {
        metric: 'Season Extension',
        value: '4 months',
        description: 'Extended profitable season',
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        metric: 'Average Booking',
        value: '$85',
        description: 'Increased from $45',
        icon: <DollarSign className="w-5 h-5" />
      }
    ],
    image: '/portfolio/bayou-heritage-mockup.jpg',
    colors: {
      primary: '#2D5016',
      secondary: '#8FBC8F',
      accent: '#DAA520'
    },
    icon: <MapPin className="w-6 h-6" />,
    tags: ['Booking System', 'Local Tourism', 'Heritage Storytelling']
  },
  {
    id: 'creole-corner',
    title: 'Créole Corner Café',
    category: 'Restaurant & Local Business',
    description: 'Neighborhood café serving traditional Créole comfort food with modern twists',
    challenge: 'Customers couldn\'t find menu information online, and takeout orders were handled through confusing phone calls',
    solution: 'Built a warm, inviting digital presence that captures the café\'s homey atmosphere and simplifies ordering',
    results: [
      {
        metric: 'Online Orders',
        value: '+240%',
        description: 'Digital ordering growth',
        icon: <Coffee className="w-5 h-5" />
      },
      {
        metric: 'New Customers',
        value: '+65%',
        description: 'Through website discovery',
        icon: <Users className="w-5 h-5" />
      },
      {
        metric: 'Review Rating',
        value: '4.8★',
        description: 'Improved from 4.2★',
        icon: <Star className="w-5 h-5" />
      }
    ],
    image: '/portfolio/creole-corner-mockup.jpg',
    colors: {
      primary: '#8B2635',
      secondary: '#D4A574',
      accent: '#F4E4BC'
    },
    icon: <Coffee className="w-6 h-6" />,
    tags: ['Online Ordering', 'Menu Showcase', 'Local Community']
  },
  {
    id: 'gulf-coast-legal',
    title: 'Gulf Coast Legal',
    category: 'Professional Services',
    description: 'Boutique law firm specializing in small business and maritime law',
    challenge: 'Potential clients questioned their expertise due to an unprofessional web presence that looked like a template',
    solution: 'Designed a sophisticated, trustworthy digital presence that communicates legal expertise while remaining approachable',
    results: [
      {
        metric: 'Consultation Requests',
        value: '+320%',
        description: 'Quality leads increased',
        icon: <Scale className="w-5 h-5" />
      },
      {
        metric: 'Case Value',
        value: '+150%',
        description: 'Average case size',
        icon: <TrendingUp className="w-5 h-5" />
      },
      {
        metric: 'Referral Rate',
        value: '85%',
        description: 'Client satisfaction',
        icon: <Users className="w-5 h-5" />
      }
    ],
    image: '/portfolio/gulf-coast-legal-mockup.jpg',
    colors: {
      primary: '#1B365D',
      secondary: '#4A90A4',
      accent: '#B8860B'
    },
    icon: <Scale className="w-6 h-6" />,
    tags: ['Professional Credibility', 'Legal Services', 'Trust Building']
  }
];

export default function PortfolioSection() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-[#5F755E] font-medium mb-4"
          >
            <div className="w-8 h-px bg-[#5F755E]"></div>
            <span className="text-sm tracking-wider uppercase">Transformations</span>
            <div className="w-8 h-px bg-[#5F755E]"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-playfair"
          >
            Where Small Businesses
            <span className="block text-[#5F755E]">Come Alive Online</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Real transformations from small businesses who chose growth over settling. 
            These are <span className="font-semibold text-gray-800">demonstration portfolios</span> showcasing 
            the kind of impact we create for our clients.
          </motion.p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                
                {/* Portfolio Image */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundColor: item.colors.primary }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl"
                      style={{ backgroundColor: item.colors.primary }}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                      Demo Portfolio
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{item.title}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#5F755E] transition-colors" />
                      </div>
                      <p className="text-xs text-gray-600">{item.category}</p>
                    </div>
                  </div>
                </div>

                {/* Portfolio Content */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Results Preview */}
                  <div className="grid grid-cols-3 gap-3">
                    {item.results.slice(0, 3).map((result, idx) => (
                      <div key={idx} className="text-center">
                        <div className="flex items-center justify-center text-[#5F755E] mb-1">
                          {result.icon}
                        </div>
                        <div className="text-sm font-bold text-gray-900">{result.value}</div>
                        <div className="text-xs text-gray-500">{result.metric}</div>
                      </div>
                    ))}
                  </div>

                  {/* Expand Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="w-full flex items-center justify-center gap-2 text-[#5F755E] hover:text-[#4A5D49] text-sm font-medium transition-colors group">
                      <span>{selectedItem === item.id ? 'View Less' : 'View Full Story'}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform ${selectedItem === item.id ? 'rotate-180' : 'group-hover:translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed View */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              {portfolioItems
                .filter(item => item.id === selectedItem)
                .map(item => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* Story Column */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: item.colors.primary }}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 font-playfair">{item.title}</h3>
                            <p className="text-gray-600">{item.category}</p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              The Challenge
                            </h4>
                            <p className="text-gray-600 leading-relaxed">{item.challenge}</p>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-[#5F755E] rounded-full"></div>
                              Our Solution
                            </h4>
                            <p className="text-gray-600 leading-relaxed">{item.solution}</p>
                          </div>
                        </div>
                      </div>

                      {/* Results Column */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#C49A45] rounded-full"></div>
                          Business Impact
                        </h4>

                        <div className="grid grid-cols-1 gap-4">
                          {item.results.map((result, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-gray-50 rounded-lg p-4 flex items-center gap-4"
                            >
                              <div className="text-[#5F755E]">
                                {result.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-2xl font-bold text-gray-900">{result.value}</span>
                                  <span className="text-sm font-medium text-gray-700">{result.metric}</span>
                                </div>
                                <p className="text-sm text-gray-600">{result.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-gradient-to-r from-[#5F755E]/10 to-[#C49A45]/10 rounded-lg border border-[#5F755E]/20">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Portfolio Note:</span> This is a demonstration project 
                            showcasing our design and development capabilities. Results shown represent 
                            realistic outcomes based on similar client transformations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-[#5F755E] to-[#4A5D49] rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-playfair">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-[#B8C7B7] text-lg mb-8 max-w-2xl mx-auto">
            Every small business deserves to thrive online. Let's create something beautiful together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#5F755E] px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2 group">
              <span>Start Our Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:border-white/50 transition-colors inline-flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>View Our Process</span>
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}