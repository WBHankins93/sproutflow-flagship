// app/case-studies/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';
import { caseStudies } from '@/data/caseStudies';

export const metadata = {
  title: 'Case Studies',
  description:
    'Real, attributed results from small businesses we work with: 50% more qualified inquiries for a New Orleans psychiatry practice, 30% customer acquisition growth for a metro pool company, and more.',
  alternates: {
    canonical: '/case-studies',
  },
};

const featuredSlug = 'second-line-psychiatry';
const listedCaseStudies = caseStudies.filter((cs) => cs.slug !== 'big-butt-association');
const featured = listedCaseStudies.find((cs) => cs.slug === featuredSlug)!;
const rest = listedCaseStudies.filter((cs) => cs.slug !== featuredSlug);

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(95,117,94,0.18),_transparent_55%)] opacity-40" />
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
              Every project below is a live site for a real client. The headline of each case study is the business result, not the design. Where we build systems behind the website, we measure those too.
            </p>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/40 via-white to-white" />

        <div className="mx-auto max-w-6xl px-4 md:px-8">

          {/* Featured Case Study */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">Featured Result</h2>

            <Link href={`/case-studies/${featured.slug}`} className="block group">
              <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl border-2 border-primary-200 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">

                {/* Image */}
                <div className="relative aspect-[4/3] md:aspect-auto bg-gray-900">
                  <Image
                    src={getImageUrl(featured.cardImage)}
                    alt={`${featured.clientName} website showcase`}
                    fill
                    className={`${featured.cardImageFit === 'contain' ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-primary-600 font-semibold mb-4">
                    <span className="text-sm uppercase tracking-wider">Featured</span>
                  </div>

                  <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                    {featured.clientName}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featured.cardBlurb}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {featured.cardStats.map((stat, i) => (
                      <div key={i}>
                        <div className="text-3xl font-bold text-primary-600">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    ))}
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
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">More Results</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {rest.map((cs) => (
                <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="block group">
                  <div className="bg-white rounded-3xl border-2 border-primary-200/60 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative aspect-[16/9] bg-gray-900">
                      <Image
                        src={getImageUrl(cs.cardImage)}
                        alt={`${cs.clientName} website`}
                        fill
                        className={`${cs.cardImageFit === 'contain' ? 'object-contain' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-1 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          ● Live
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{cs.clientName}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                        {cs.cardBlurb}
                      </p>
                      <div className="flex gap-6 mb-4">
                        {cs.cardStats.map((stat, i) => (
                          <div key={i}>
                            <div className="text-2xl font-bold text-primary-700">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Read Case Study <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Ready to be our next case study?
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
        </div>
      </section>

      <Footer />
    </>
  );
}
