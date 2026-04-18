// app/case-studies/djn-services/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';

export const metadata = {
  title: 'DJN Services LLC Case Study | 20 Years of Work, Finally Online | Sproutflow Studio',
  description:
    'How DJN Services LLC, a 20-year veteran-owned welding and hauling company, went from an outdated template site to a clean, authoritative online presence that drives real bookings.',
  keywords: [
    'DJN Services case study',
    'welding company website design',
    'veteran-owned business web design',
    'trade business website',
    'Sproutflow Studio case study',
  ],
  alternates: {
    canonical: '/case-studies/djn-services',
  },
};

export default function DJNServicesCaseStudy() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#1A1A1A]">
          <Image
            src={getImageUrl('work/client-logos/djn-project.png')}
            alt="DJN Services LLC website"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-white/90 mb-6">
            <span className="h-px w-12 bg-white/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">Case Study</span>
            <span className="h-px w-12 bg-white/60" />
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
            DJN Services LLC
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-10 drop-shadow-md">
            20 years of reliable work. Finally represented online.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">20 yrs</div>
              <div className="text-sm text-white/80">In business before going digital</div>
            </div>
            <div className="w-px bg-white/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">2 weeks</div>
              <div className="text-sm text-white/80">Delivery timeline</div>
            </div>
            <div className="w-px bg-white/30 hidden sm:block" />
            <div className="text-center">
              <div className="text-4xl font-bold mb-1">More</div>
              <div className="text-sm text-white/80">Bookings through the new site</div>
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
            DJN Services LLC has been operating for over 20 years — a veteran-owned welding, hauling, and removal
            company with a track record that speaks for itself in their community. The problem wasn&apos;t the
            business. It was the website.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Their existing site was a basic template: a dark homepage with a centered logo, dense bullet-point service
            listings, and no clear call to action. The veteran-owned story was buried in the About page.
            There was no sense of positioning, no trust signals, and no urgency. A company with two decades of
            experience looked like it had been online for two months.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">What Wasn&apos;t Working</h3>
              <ul className="space-y-3">
                {[
                  'Template site that didn\'t reflect 20 years of credibility',
                  'Veteran-owned status buried — never used as a trust signal',
                  'Services listed as dense text blocks, no visual hierarchy',
                  'No structured way to capture inquiries or quotes',
                  'Dark, low-contrast homepage with just a logo',
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
                  'Online presence didn\'t match the size and reputation of the operation',
                  'Missed opportunity to grow beyond referral-only network',
                  'No way for new customers to assess credibility before calling',
                  'Couldn\'t capture leads when the owner was in the field',
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

      {/* Before/After Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            Before &amp; After
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            The old site had the information. It just wasn&apos;t working hard enough.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-600 text-sm font-bold">✕</span>
                <h3 className="text-lg font-bold text-gray-900">Before</h3>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-red-200 shadow-md">
                <Image
                  src="/images/case-studies/djn-before-home.png"
                  alt="DJN Services old homepage"
                  width={700}
                  height={440}
                  className="w-full"
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Template site — centered logo, no hierarchy, no clear direction
              </p>
            </div>

            {/* After */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 text-sm font-bold">✓</span>
                <h3 className="text-lg font-bold text-gray-900">After</h3>
              </div>
              <div className="rounded-2xl overflow-hidden border-2 border-primary-200 shadow-md">
                <Image
                  src={getImageUrl('work/client-logos/djn-project.png')}
                  alt="DJN Services new website"
                  width={700}
                  height={440}
                  className="w-full"
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Bold, rugged, and built for action — clear CTAs, real positioning
              </p>
            </div>
          </div>

          {/* Before services comparison */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <div className="rounded-2xl overflow-hidden border-2 border-red-200 shadow-md">
                <Image
                  src="/images/case-studies/djn-before-services.png"
                  alt="DJN Services old services page"
                  width={700}
                  height={440}
                  className="w-full"
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Old services page — wall of text, no visual packaging
              </p>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden border-2 border-red-200 shadow-md">
                <Image
                  src="/images/case-studies/djn-before-about.png"
                  alt="DJN Services old about page"
                  width={700}
                  height={440}
                  className="w-full"
                />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Veteran-owned story buried in dense paragraphs — never front and center
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">
            Our Strategic Approach
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            DJN didn&apos;t need flashy. They needed clean, honest, and approachable — a site that matched the
            integrity of the work they&apos;ve been delivering for two decades.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl border border-primary-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Strategic Decisions</h3>
              <ul className="space-y-3">
                {[
                  'Lead with the 20-year track record — make tenure the first thing you see',
                  'Veteran-owned positioned as a trust signal, not a footnote',
                  'Clean dark aesthetic: rugged, reliable, no-nonsense',
                  'Fast-response promise baked into the hero — sets expectations upfront',
                  'Quote form as the primary action — captures leads when owner is on a job',
                  'Services packaged visually, not listed as bullet points',
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
                  'Next.js frontend and backend for speed and reliability',
                  'Formspree for quote and inquiry capture',
                  'Resend for instant email notifications to owner',
                  'Mobile-first — trade clients search on their phones',
                  'Vercel hosting for fast load times and 99.9% uptime',
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
              href="https://djnservices.com/"
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
            <div className="bg-gray-900/5 rounded-2xl border border-gray-900/15 p-8 text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">Online</div>
              <div className="text-gray-700 font-medium">Professional presence that finally matches 20 years of reputation</div>
            </div>
            <div className="bg-gray-900/5 rounded-2xl border border-gray-900/15 p-8 text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">More</div>
              <div className="text-gray-700 font-medium">Bookings through the new quote form system</div>
            </div>
            <div className="bg-gray-900/5 rounded-2xl border border-gray-900/15 p-8 text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">2 wks</div>
              <div className="text-gray-700 font-medium">From outdated template to live, converting site</div>
            </div>
          </div>

          {/* What the client said */}
          <div className="bg-gradient-to-br from-gray-900/5 to-white rounded-3xl border-2 border-gray-900/15 p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl text-gray-400 font-display leading-none">&quot;</div>
              <div className="flex-1">
                <p className="text-xl text-gray-700 leading-relaxed mb-6 italic font-display">
                  The new site has helped tremendously. It&apos;s already driving more bookings through the
                  form, and it&apos;s great to finally have something that represents the business the way
                  it deserves.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Owner</div>
                    <div className="text-gray-600">DJN Services LLC · Alabama</div>
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
                <li><strong>Timeline:</strong> 2 weeks</li>
                <li><strong>Services:</strong> Web Design, Brand Positioning, Lead Capture System</li>
                <li><strong>Industry:</strong> Welding, Hauling &amp; Removal</li>
                <li><strong>Location:</strong> Alabama</li>
                <li><strong>Notable:</strong> 100% Veteran-Owned</li>
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
