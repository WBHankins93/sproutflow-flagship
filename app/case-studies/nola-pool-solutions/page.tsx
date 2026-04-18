// app/case-studies/nola-pool-solutions/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';

export const metadata = {
  title: 'NOLA Pool Solutions Case Study | Lead Generation & Credibility | Sproutflow Studio',
  description:
    'How NOLA Pool Solutions went from no website to New Orleans metro area leader with a custom lead capture system, professional presence, and more booked work than ever.',
  keywords: [
    'NOLA Pool Solutions case study',
    'pool company website design',
    'small business lead generation',
    'web design New Orleans',
    'Sproutflow Studio case study',
  ],
  alternates: {
    canonical: '/case-studies/nola-pool-solutions',
  },
};

export default function NOLAPoolCaseStudy() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl('work/client-logos/nps-project.png')}
            alt="NOLA Pool Solutions website showcase"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-white/90 mb-6">
            <span className="h-px w-12 bg-white/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">Case Study</span>
            <span className="h-px w-12 bg-white/60" />
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
            NOLA Pool Solutions
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 drop-shadow-md">
            From invisible to area leader in 3 weeks
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">Zero</div>
              <div className="text-sm text-white/80">Starting point — no website</div>
            </div>
            <div className="w-px bg-white/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">#1</div>
              <div className="text-sm text-white/80">Local Google ranking</div>
            </div>
            <div className="w-px bg-white/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">3 weeks</div>
              <div className="text-sm text-white/80">Delivery timeline</div>
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
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">The Challenge</h2>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            NOLA Pool Solutions had no website at all. Business came entirely through word of mouth and a
            bare-bones Google Business profile. The owner was fielding a high volume of discovery calls that didn&apos;t
            always convert — spending real time on the phone with people who weren&apos;t serious, while serious prospects
            had no way to pre-qualify themselves before reaching out.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The goal wasn&apos;t just to &quot;get online.&quot; It was to build a lead funnel that did the heavy lifting
            before any phone call happened — establishing credibility, communicating services clearly, and capturing
            inquiries through a structured form system so the owner could prioritize the right conversations.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">What Wasn&apos;t Working</h3>
              <ul className="space-y-3">
                {[
                  'No website — invisible to anyone searching online',
                  'Only Google presence and word of mouth',
                  'Unfiltered discovery calls burning time',
                  'No way to showcase services or credentials',
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
                  'Lost business to competitors with online presence',
                  'Time wasted on low-quality phone inquiries',
                  'No way to book further out in advance',
                  'Limited ability to compete in the New Orleans metro market',
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
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            Our Strategic Approach
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            The strategy was simple: build a site that filters, educates, and captures — so the owner spends
            less time on the phone and more time in the field.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl border border-primary-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Decisions</h3>
              <ul className="space-y-3">
                {[
                  'Lead capture form system as the primary CTA — not just a phone number',
                  'Service packaging that pre-qualifies prospects before contact',
                  'Trust signals: licensing, New Orleans metro expertise, response time',
                  'Clean, premium aesthetic that outpaces local competitors visually',
                  'SEO foundation targeting New Orleans metro pool service keywords',
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
                  'Next.js frontend and backend for performance and SEO',
                  'Formspree for structured inquiry capture',
                  'Resend for automated email notifications on form submissions',
                  'Mobile-first responsive design — most local searches are mobile',
                  'Vercel hosting for fast load times and reliable uptime',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="https://nolapoolsolutions.com/"
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

      {/* Section 3: Results */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">
            Results &amp; Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#0B2447]/5 rounded-2xl border border-[#0B2447]/20 p-8 text-center">
              <div className="text-5xl font-bold text-[#0B2447] mb-2">#1</div>
              <div className="text-gray-700 font-medium">Google ranking for local pool services in the area</div>
            </div>
            <div className="bg-[#0B2447]/5 rounded-2xl border border-[#0B2447]/20 p-8 text-center">
              <div className="text-5xl font-bold text-[#0B2447] mb-2">Booked</div>
              <div className="text-gray-700 font-medium">Calendar filling further in advance than ever before</div>
            </div>
            <div className="bg-[#0B2447]/5 rounded-2xl border border-[#0B2447]/20 p-8 text-center">
              <div className="text-5xl font-bold text-[#0B2447] mb-2">3 wks</div>
              <div className="text-gray-700 font-medium">From zero web presence to live, converting site</div>
            </div>
          </div>

          {/* Client Testimonial */}
          <div className="bg-gradient-to-br from-[#0B2447]/5 to-white rounded-3xl border-2 border-[#0B2447]/20 p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl text-[#0B2447]/30 font-display leading-none">&quot;</div>
              <div className="flex-1">
                <p className="text-xl text-gray-700 leading-relaxed mb-6 italic font-display">
                  Incredible professionalism. Handled the project quickly and kept constant communication
                  throughout. Really pleased with the maintenance and upkeep service after the project was
                  completed. It&apos;s nice to know that I can focus on my business without worrying about
                  this anymore.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#0B2447]/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏊</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Owner</div>
                    <div className="text-gray-600">NOLA Pool Solutions · New Orleans metro</div>
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
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Project Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Timeline &amp; Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Timeline:</strong> 3 weeks</li>
                <li><strong>Services:</strong> Web Design, Lead Capture System, Service Packaging, SEO Foundation</li>
                <li><strong>Industry:</strong> Pool Maintenance &amp; Renovation</li>
                <li><strong>Location:</strong> New Orleans metro</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Tailwind CSS', 'Formspree', 'Resend', 'Vercel'].map((tech) => (
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

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border-2 border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Ready for similar results?
          </h3>
          <p className="text-base text-gray-600 md:text-lg">
            Let&apos;s talk about your business goals and how a strategic website can help you compete in your market.
          </p>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            Book a Discovery Call
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/case-studies" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
            Back to all case studies
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
