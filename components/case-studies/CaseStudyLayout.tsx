// components/case-studies/CaseStudyLayout.tsx - Reusable case study page template
//
// Renders a CaseStudy entry from data/caseStudies.ts using the established
// case study visual patterns. Includes BreadcrumbList JSON-LD per page.

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';
import type { CaseStudy } from '@/data/caseStudies';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

function BreadcrumbSchema({ caseStudy }: { caseStudy: CaseStudy }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${siteUrl}/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: caseStudy.clientName,
        item: `${siteUrl}/case-studies/${caseStudy.slug}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

export default function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <>
      <BreadcrumbSchema caseStudy={caseStudy} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#1A1A1A]">
          <Image
            src={getImageUrl(caseStudy.heroImage)}
            alt={`${caseStudy.clientName} website showcase`}
            fill
            className={caseStudy.heroImageFit === 'contain' ? 'object-contain' : 'object-cover'}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
          <div className="backdrop-blur-md bg-black/35 border border-white/15 rounded-3xl px-8 md:px-14 py-10 md:py-12 shadow-2xl">
            <div className="inline-flex items-center gap-2 text-white/90 mb-6">
              <span className="h-px w-12 bg-white/60" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em]">Case Study</span>
              <span className="h-px w-12 bg-white/60" />
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
              {caseStudy.clientName}
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 drop-shadow-md">
              {caseStudy.headline}
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-white">
              {caseStudy.heroStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-8">
                  {i > 0 && <div className="w-px self-stretch bg-white/30 hidden sm:block" />}
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-white/80 max-w-[14rem]">{stat.label}</div>
                  </div>
                </div>
              ))}
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

      {/* Summary - answer-first. This paragraph tells the whole story on its own. */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            {caseStudy.summary}
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 bg-gradient-to-b from-primary-50/40 to-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">The Problem</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{caseStudy.problem}</p>
        </div>
      </section>

      {/* Before / After (optional) */}
      {caseStudy.beforeAfter && caseStudy.beforeAfter.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">
              Before &amp; After
            </h2>

            {caseStudy.beforeAfter.map((pair, i) => (
              <div key={i} className={`grid md:grid-cols-2 gap-8 ${i > 0 ? 'mt-8' : ''}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-600 text-sm font-bold">✕</span>
                    <h3 className="text-lg font-bold text-gray-900">Before</h3>
                  </div>
                  <div className="rounded-2xl overflow-hidden border-2 border-red-200 shadow-md">
                    <Image
                      src={getImageUrl(pair.beforeSrc)}
                      alt={pair.beforeAlt}
                      width={700}
                      height={440}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">{pair.beforeCaption}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 text-sm font-bold">✓</span>
                    <h3 className="text-lg font-bold text-gray-900">After</h3>
                  </div>
                  <div className="rounded-2xl overflow-hidden border-2 border-primary-200 shadow-md">
                    <Image
                      src={getImageUrl(pair.afterSrc)}
                      alt={pair.afterAlt}
                      width={700}
                      height={440}
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">{pair.afterCaption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What We Built */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">What We Built</h2>
          <div className="bg-white rounded-2xl border border-primary-200 p-8">
            <ul className="space-y-3">
              {caseStudy.built.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center mt-8">
            <Link
              href={caseStudy.liveUrl}
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

      {/* The Result */}
      <section className="py-16 bg-gradient-to-b from-primary-50/40 to-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-12 text-center">
            The Result
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {caseStudy.results.map((result, i) => (
              <div key={i} className="bg-primary-50 rounded-2xl border border-primary-200 p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">{result.value}</div>
                <div className="text-gray-700 font-medium">{result.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-3xl border-2 border-primary-200 p-8 md:p-12">
            <div className="flex items-start gap-6">
              <div className="text-6xl text-primary-400 font-display leading-none">&quot;</div>
              <div className="flex-1">
                <p className="text-xl text-gray-700 leading-relaxed mb-6 italic font-display">
                  {caseStudy.testimonial.quote}
                </p>
                <div>
                  <div className="font-bold text-gray-900">{caseStudy.testimonial.name}</div>
                  <div className="text-gray-600">{caseStudy.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Project Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Timeline &amp; Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Timeline:</strong> {caseStudy.details.timeline}</li>
                <li><strong>Services:</strong> {caseStudy.details.services}</li>
                <li><strong>Industry:</strong> {caseStudy.details.industry}</li>
                <li><strong>Location:</strong> {caseStudy.details.location}</li>
                {caseStudy.details.notable && (
                  <li><strong>Notable:</strong> {caseStudy.details.notable}</li>
                )}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.stack.map((tech) => (
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
      <section className="py-16 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border-2 border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Ready for results like these?
          </h3>
          <p className="text-base text-gray-600 md:text-lg">
            Bring your goals. Leave with a clear plan and a fixed quote.
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
