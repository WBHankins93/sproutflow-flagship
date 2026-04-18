// app/case-studies/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';

export const metadata = {
  title: 'Case Studies | Web Design Success Stories | Sproutflow Studio New Orleans',
  description: 'Real results for real businesses in New Orleans. See how we help small businesses compete with enterprise-level web presence. 300% increase in inquiries, 45% higher project value.',
  keywords: [
    'web design case studies New Orleans',
    'website design success stories',
    'small business web design results',
    'New Orleans web design portfolio',
    'web design testimonials'
  ],
  alternates: {
    canonical: '/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <>
      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="absolute inset-0 -z-10">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getImageUrl('case-studies/bonsai.jpg')})`,
            }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)] opacity-40" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:px-8 md:py-28">
          <div className="inline-flex items-center gap-2 text-primary-700">
            <span className="h-px w-12 bg-primary-500/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              Case Studies
            </span>
            <span className="h-px w-12 bg-primary-500/60" />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-display font-bold text-gray-900 md:text-6xl">
              Real Results for Real Businesses
            </h1>
            <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
              See how we help small businesses compete at the enterprise level, without the enterprise budget. Every project starts with understanding your goals, not just building a website.
            </p>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/40 via-white to-white" />

        <div className="mx-auto max-w-6xl px-4 md:px-8">
          
          {/* Featured Case Study - Nealy Events */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">Featured Success Story</h2>
            
            <Link 
              href="/case-studies/nealy-events"
              className="block group"
            >
              <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl border-2 border-primary-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                
                {/* Image */}
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image 
                    src={getImageUrl('work/client-logos/nealy-project.png')}
                    alt="Nealy Events website showcase"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-4">
                    <span className="text-sm uppercase tracking-wider">Featured</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                    Nealy Event Decor
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Luxury fabrication showcase with editorial gallery layouts that converts browsers into booked consultations.
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                      <div className="text-3xl font-bold text-primary-600">300%</div>
                      <div className="text-sm text-gray-600">Increase in inquiries</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary-600">45%</div>
                      <div className="text-sm text-gray-600">Higher project value</div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 text-primary-600 font-semibold group-hover:gap-4 transition-all">
                    View Full Case Study
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* More Case Studies Grid */}
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">More Success Stories</h2>

            <div className="grid md:grid-cols-2 gap-8">

              {/* NOLA Pool Solutions */}
              <Link href="/case-studies/nola-pool-solutions" className="block group">
                <div className="bg-white rounded-3xl border-2 border-[#0B2447]/20 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={getImageUrl('work/client-logos/nps-project.png')}
                      alt="NOLA Pool Solutions website"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        ● Live
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-2">NOLA Pool Solutions</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      From zero web presence to New Orleans metro area leader. Built a lead capture system that
                      fills calendars further in advance and ranks #1 locally.
                    </p>
                    <div className="flex gap-6 mb-4">
                      <div>
                        <div className="text-2xl font-bold text-[#0B2447]">#1</div>
                        <div className="text-xs text-gray-500">Local Google ranking</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0B2447]">3 wks</div>
                        <div className="text-xs text-gray-500">Delivery</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Read Case Study <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* DJN Services */}
              <Link href="/case-studies/djn-services" className="block group">
                <div className="bg-white rounded-3xl border-2 border-gray-900/15 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={getImageUrl('work/client-logos/djn-project.png')}
                      alt="DJN Services LLC website"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        ● Live
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-2">DJN Services LLC</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      20 years of veteran-owned welding and hauling work, finally represented online.
                      Complete before/after — from basic template to authoritative brand.
                    </p>
                    <div className="flex gap-6 mb-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">20 yrs</div>
                        <div className="text-xs text-gray-500">In business</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">2 wks</div>
                        <div className="text-xs text-gray-500">Delivery</div>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Read Case Study <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Ready to be our next success story?
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
        </div>
      </section>

      <Footer />
    </>
  );
}
