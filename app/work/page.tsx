// app/work/page.tsx - Sproutflow Work Showcase

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Code2, 
  FileCode, 
  Layers, 
  Zap, 
  Globe, 
  Database, 
  Palette,
  ExternalLink,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle2
} from 'lucide-react';

import { workProjects } from '@/data/workProjects';
import type { ProjectStatus } from '@/data/workProjects';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';

// Tech stack icon mapping
const techIcons: Record<string, React.ReactNode> = {
  'Next.js': <Code2 className="h-3 w-3" />,
  'TypeScript': <FileCode className="h-3 w-3" />,
  'Tailwind CSS': <Palette className="h-3 w-3" />,
  'Vercel': <Globe className="h-3 w-3" />,
  'Framer Motion': <Zap className="h-3 w-3" />,
  'React': <Layers className="h-3 w-3" />,
  'Node.js': <Code2 className="h-3 w-3" />,
  'PostgreSQL': <Database className="h-3 w-3" />,
};

const statusStyles: Record<ProjectStatus, string> = {
  Live: 'bg-emerald-100 text-emerald-900 ring-1 ring-inset ring-emerald-200',
  'In Progress':
    'bg-amber-100 text-amber-900 ring-1 ring-inset ring-amber-200',
};

// Icon mapping for project categories
const categoryIcons: Record<string, React.ReactNode> = {
  'Personal Project': <Code2 className="w-8 h-8 text-white" />,
  'Psychiatry': <Users className="w-8 h-8 text-white" />,
  'Event Decor': <CheckCircle2 className="w-8 h-8 text-white" />,
  'Pool Solutions': <TrendingUp className="w-8 h-8 text-white" />,
  'Community Platform': <Zap className="w-8 h-8 text-white" />,
};

// Get category from client name
const getCategory = (client: string): string => {
  if (client.includes('Personal')) return 'Personal Project';
  if (client.includes('Psychiatry')) return 'Psychiatry';
  if (client.includes('Event Decor')) return 'Event Decor';
  if (client.includes('Pool')) return 'Pool Solutions';
  if (client.includes('Bekky')) return 'Community Platform';
  return 'Web Design';
};

export default function WorkPage() {

  return (
    <>
      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="absolute inset-0 -z-10">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getImageUrl('work/sprouting.jpg')})`,
            }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)] opacity-40" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:px-8 md:py-28">
          <div className="inline-flex items-center gap-2 text-primary-700">
            <span className="h-px w-12 bg-primary-500/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              Selected Work
            </span>
            <span className="h-px w-12 bg-primary-500/60" />
          </div>
          <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
            <div className="space-y-6">
              <h1 className="text-4xl font-display font-bold text-gray-900 md:text-6xl">
                Real websites for real businesses
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Every project starts with listening—to you, your customers, and what actually moves the needle for your business. What you&apos;ll see below are live sites built to work hard from day one, with room to grow as you do.
              </p>
            </div>
            <div className="rounded-3xl border border-primary-200/60 bg-white/70 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
                How I show up
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>• Listen first, build second—your goals drive every decision</li>
                <li>• Focus on what moves the needle, not just what looks good</li>
                <li>• Build sites that work hard from launch and grow with you</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-24">
        {/* Organic Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/40 via-white to-white">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle, #5F755E 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Portfolio Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            
            {workProjects.map((project, index) => {
              const category = getCategory(project.client);
              const categoryIcon = categoryIcons[category] || <Code2 className="w-8 h-8 text-white" />;
              const primaryColor = project.gradient[0] || '#163323';
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  {/* Unified Card Container */}
                  <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                    
                    {/* Image Section */}
                    <motion.div 
                      className="relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Gradient Background (using project gradient) */}
                      <div 
                        className="aspect-[4/3] relative"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${project.gradient.filter(Boolean).join(', ')})`,
                        }}
                      >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Status Badge - Top Left */}
                        <motion.div 
                          className="absolute top-4 left-4 z-10"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${statusStyles[project.status]}`}
                          >
                            {project.status}
                          </span>
                        </motion.div>

                        {/* Icon Badge - Bottom Left */}
                        <motion.div 
                          className="absolute bottom-4 left-4 z-10"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        >
                          <div 
                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {categoryIcon}
                          </div>
                        </motion.div>

                        {/* Logo - Bottom Right (if available) */}
                        {project.logo && (
                          <motion.div 
                            className="absolute bottom-4 right-4 z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.4, type: "spring" }}
                          >
                            <div className="relative h-12 w-12 md:h-14 md:w-14 bg-white/20 backdrop-blur-sm rounded-lg p-2 flex items-center justify-center border border-white/30">
                              <Image
                                src={getImageUrl(project.logo)}
                                alt={`${project.title} logo`}
                                width={48}
                                height={48}
                                className="object-contain max-h-full max-w-full"
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Hover Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="text-white">
                            <p className="text-sm font-medium mb-1 opacity-90">{category}</p>
                            <h3 className="text-2xl font-display font-bold mb-2">{project.title}</h3>
                            {project.highlight && (
                              <p className="text-sm opacity-80 line-clamp-2">{project.highlight}</p>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="p-6 flex-1 flex flex-col">
                      
                      {/* Header with Title and Description */}
                      <div className="mb-4">
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">{project.client}</p>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {project.description}
                        </p>
                      </div>

                      {/* Tags - Services */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.services.slice(0, 3).map((service, idx) => (
                          <motion.span 
                            key={service}
                            className="text-xs px-3 py-1 bg-primary-50 text-primary-700 rounded-full font-medium"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 + 0.5 }}
                          >
                            {service}
                          </motion.span>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-5 pb-5 border-b border-gray-100 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                          Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 4).map((tech, idx) => (
                            <motion.span
                              key={tech}
                              className="inline-flex items-center gap-1 rounded-full bg-gray-900 px-2.5 py-1 text-[0.65rem] font-medium text-white"
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 + idx * 0.05 + 0.6 }}
                            >
                              {techIcons[tech] || <Code2 className="h-2.5 w-2.5" />}
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* View Project Link */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group"
                      >
                        <Link 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2.5 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                          View Live Site
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Have a project you want to launch with confidence?
          </h3>
          <p className="text-base text-gray-600 md:text-lg">
            Let’s talk about your goals, timelines, and how we can ship something
            that actually moves the business forward.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            Book a discovery call
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}


