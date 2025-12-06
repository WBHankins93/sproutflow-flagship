// app/case-studies/nealy-events/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';

export const metadata = {
  title: 'Nealy Events Case Study | 300% Increase in Inquiries | Sproutflow Studio',
  description: 'See how Nealy Event Decor achieved a 300% increase in qualified inquiries and 45% higher project value through strategic web design and luxury brand positioning in Dallas, TX.',
  keywords: [
    'Nealy Events case study',
    'web design success story',
    'luxury event decor website',
    'web design results',
    'website conversion optimization'
  ],
  alternates: {
    canonical: '/case-studies/nealy-events',
  },
};

export default function NealyEventsCaseStudy() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={getImageUrl('nealy-case-study.png')}
            alt="Nealy Events luxury fabrications"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-white/90 mb-6">
            <span className="h-px w-12 bg-white/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              Case Study
            </span>
            <span className="h-px w-12 bg-white/60" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
            Nealy Event Decor
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            Luxury fabrication showcase with editorial gallery layouts
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">300%</div>
              <div className="text-sm text-white/80">Inquiry increase</div>
            </div>
            <div className="w-px bg-white/30" />
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">45%</div>
              <div className="text-sm text-white/80">Higher project value</div>
            </div>
            <div className="w-px bg-white/30" />
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">6 weeks</div>
              <div className="text-sm text-white/80">Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <Link 
            href="/case-studies"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </div>
      </div>

      {/* Section 1: The Challenge */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            The Challenge
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Nealy Event Decor creates luxury custom fabrications for high-end events in the Dallas market—from bespoke arches to premium bars and elegant rentals. Despite delivering exceptional work, their old website wasn&apos;t converting browsers into consultations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">What Wasn&apos;t Working</h3>
              <ul className="space-y-3">
                {[
                  'Old site didn\'t reflect luxury positioning',
                  'No clear inventory organization system',
                  'Poor mobile experience',
                  'Difficult for customers to visualize services'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-red-500 mt-1">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Business Impact</h3>
              <ul className="space-y-3">
                {[
                  'Lost qualified leads to competitors',
                  'Time wasted explaining basic services',
                  'Brand perception didn\'t match quality',
                  'Difficult to showcase full capabilities'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="text-amber-500 mt-1">⚠</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Approach */}
      <section className="py-20 bg-gradient-to-b from-primary-50/40 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">
            Our Strategic Approach
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl border border-primary-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Decisions</h3>
              <ul className="space-y-3">
                {[
                  'Editorial-style gallery layouts (like high-end design magazines)',
                  'Custom inventory categorization system',
                  'Luxury aesthetic with gold accents and elegant typography',
                  'Story-based brand experience throughout'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-primary-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Execution</h3>
              <ul className="space-y-3">
                {[
                  'Next.js for performance and SEO',
                  'Custom image optimization for fast loading',
                  'Mobile-first responsive design',
                  'Sanity CMS for easy inventory management'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visit Site CTA */}
          <div className="text-center">
            <Link
              href="https://nealyevents.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View Live Site
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Results & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">
            Results & Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-primary-50 rounded-2xl border border-primary-200 p-8 text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">300%</div>
              <div className="text-gray-700 font-medium">Increase in qualified consultation requests</div>
            </div>
            <div className="bg-primary-50 rounded-2xl border border-primary-200 p-8 text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">45%</div>
              <div className="text-gray-700 font-medium">Higher average project value</div>
            </div>
            <div className="bg-primary-50 rounded-2xl border border-primary-200 p-8 text-center">
              <div className="text-5xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-700 font-medium">Independent inventory management</div>
            </div>
          </div>

          {/* Client Testimonial */}
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl border-2 border-primary-200 p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl text-primary-400">&quot;</div>
              <div className="flex-1">
                <p className="text-xl text-gray-700 leading-relaxed mb-6 italic">
                  Working with Sproutflow transformed how potential clients perceive our business. We went from looking like a side hustle to a legitimate luxury brand. The site pays for itself every month.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Client Name</div>
                    <div className="text-gray-600">Owner, Nealy Event Decor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Project Details */}
      <section className="py-20 bg-gradient-to-b from-primary-50/40 to-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
            Project Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Timeline & Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Timeline:</strong> 6 weeks</li>
                <li><strong>Services:</strong> Web Design, CMS Setup, Conversion Strategy</li>
                <li><strong>Industry:</strong> Event Planning & Luxury Rentals</li>
                <li><strong>Location:</strong> Dallas, TX</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Vercel'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 bg-gray-900 text-white text-sm rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border-2 border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Ready for similar results?
          </h3>
          <p className="text-base text-gray-600 md:text-lg">
            Let&apos;s talk about your business goals and how a strategic website can help you compete in your market.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            Book a Discovery Call
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/case-studies"
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            ← Back to all case studies
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}

