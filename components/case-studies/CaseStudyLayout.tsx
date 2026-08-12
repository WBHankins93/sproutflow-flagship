import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, ExternalLink, Quote } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/StudioLayout';
import type { CaseStudy } from '@/data/caseStudies';
import { projectProof } from '@/data/projectProof';
import { getTestimonialForCaseStudy } from '@/data/testimonials';
import { getImageUrl } from '@/lib/blob-images';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

function BreadcrumbSchema({ caseStudy }: { caseStudy: CaseStudy }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${siteUrl}/work` },
      {
        '@type': 'ListItem',
        position: 3,
        name: caseStudy.clientName,
        item: `${siteUrl}/case-studies/${caseStudy.slug}`,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />;
}

export default function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  const testimonial = getTestimonialForCaseStudy(caseStudy.slug);
  const visual = projectProof.find((project) => project.id === caseStudy.slug);
  const canvasColor = visual?.canvasColor ?? '#E6E8E1';

  return (
    <>
      <BreadcrumbSchema caseStudy={caseStudy} />

      <header className="bg-white py-10 md:py-16">
        <Container>
          <Link href="/work" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary-700">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All client work
          </Link>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Project story · {caseStudy.details.location}</p>
              <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] text-primary-950 sm:text-6xl">{caseStudy.clientName}</h1>
              <p className="mt-6 font-display text-2xl font-semibold leading-snug text-primary-700 sm:text-3xl">{caseStudy.headline}</p>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-primary-900/20 bg-primary-900/20">
                {caseStudy.heroStats.slice(0, 2).map((stat) => (
                  <div key={`${stat.value}-${stat.label}`} className="bg-background-primary p-4">
                    <dt className="font-display text-2xl font-semibold text-primary-900">{stat.value}</dt>
                    <dd className="mt-1 text-sm leading-snug text-text-secondary">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-[16/10] rounded-xl border border-primary-900/15 p-4 sm:p-7" style={{ backgroundColor: canvasColor }}>
                <div className="h-full overflow-hidden rounded-md border border-black/15 bg-white shadow-[0_20px_45px_rgba(31,42,34,0.18)]">
                  <div className="flex h-6 items-center gap-1.5 border-b border-black/10 px-3" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                    <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
                  </div>
                  <div className="relative h-[calc(100%-1.5rem)]">
                    <Image
                      src={getImageUrl(caseStudy.heroImage)}
                      alt={`${caseStudy.clientName} website homepage`}
                      fill
                      priority
                      className="object-contain object-top"
                      sizes="(max-width: 1024px) 94vw, 58vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby="situation-heading" className="bg-background-primary py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">The situation</p>
              <h2 id="situation-heading" className="mt-3 font-display text-4xl font-semibold text-primary-900">What needed to change</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="font-display text-2xl font-semibold leading-snug text-primary-900">{caseStudy.summary}</p>
              <p className="mt-7 border-l-2 border-accent-500 pl-5 text-lg leading-relaxed text-text-secondary">{caseStudy.problem}</p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="decisions-heading" className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">The decisions</p>
              <h2 id="decisions-heading" className="mt-3 font-display text-4xl font-semibold text-primary-900">What we changed</h2>
              <a href={caseStudy.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-primary-700 pb-1 font-semibold text-primary-800 hover:text-primary-600">
                Visit the live site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <ol className="grid gap-px overflow-hidden border border-primary-900/20 bg-primary-900/20 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              {caseStudy.built.map((item, index) => (
                <li key={item} className="bg-background-primary p-6">
                  <div className="flex items-center justify-between">
                    <Check className="h-5 w-5 text-primary-700" aria-hidden="true" />
                    <span className="font-display text-sm font-semibold text-accent-700" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <p className="mt-6 font-semibold leading-relaxed text-primary-900">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {caseStudy.beforeAfter && caseStudy.beforeAfter.length > 0 && (
        <section aria-labelledby="proof-heading" className="bg-cream-300 py-16 md:py-24">
          <Container>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Visual proof</p>
            <h2 id="proof-heading" className="mt-3 font-display text-4xl font-semibold text-primary-900 sm:text-5xl">Before and after</h2>
            <div className="mt-10 space-y-12">
              {caseStudy.beforeAfter.map((pair) => (
                <div key={pair.beforeSrc} className="grid gap-6 md:grid-cols-2">
                  <figure>
                    <p className="mb-3 text-sm font-semibold text-text-muted">Before</p>
                    <div className="overflow-hidden rounded-lg border border-primary-900/15 bg-white">
                      <Image src={getImageUrl(pair.beforeSrc)} alt={pair.beforeAlt} width={700} height={440} className="w-full" />
                    </div>
                    <figcaption className="mt-3 text-sm leading-relaxed text-text-secondary">{pair.beforeCaption}</figcaption>
                  </figure>
                  <figure>
                    <p className="mb-3 text-sm font-semibold text-primary-700">After</p>
                    <div className="overflow-hidden rounded-lg border border-primary-900/15 bg-white">
                      <Image src={getImageUrl(pair.afterSrc)} alt={pair.afterAlt} width={700} height={440} className="w-full" />
                    </div>
                    <figcaption className="mt-3 text-sm leading-relaxed text-text-secondary">{pair.afterCaption}</figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="result-heading" className="bg-primary-950 py-16 text-white md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">The result</p>
              <h2 id="result-heading" className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">What happened next</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <dl className="grid gap-px overflow-hidden bg-white/20 sm:grid-cols-3">
                {caseStudy.results.map((result) => (
                  <div key={`${result.value}-${result.label}`} className="bg-primary-950 p-5 sm:min-h-44">
                    <dt className="font-display text-3xl font-semibold text-accent-300">{result.value}</dt>
                    <dd className="mt-3 text-sm leading-relaxed text-white/70">{result.label}</dd>
                  </div>
                ))}
              </dl>

              {testimonial && (
                <figure className="mt-10 border-t border-white/20 pt-8">
                  <Quote className="h-8 w-8 text-accent-300" aria-hidden="true" />
                  <blockquote className="mt-5 font-display text-2xl font-semibold leading-snug text-white">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm text-white/65">{testimonial.name} · {testimonial.role}, {testimonial.business}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid gap-8 border-b border-primary-900/20 pb-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl font-semibold text-primary-900">Project notes</h2>
            </div>
            <div className="grid gap-5 text-sm text-text-secondary sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
              <p><strong className="text-primary-900">Timeline:</strong> {caseStudy.details.timeline}</p>
              <p><strong className="text-primary-900">Services:</strong> {caseStudy.details.services}</p>
              <p><strong className="text-primary-900">Industry:</strong> {caseStudy.details.industry}</p>
              <p><strong className="text-primary-900">Location:</strong> {caseStudy.details.location}</p>
              {caseStudy.details.notable && <p><strong className="text-primary-900">Notable:</strong> {caseStudy.details.notable}</p>}
              <details className="sm:col-span-2">
                <summary className="min-h-11 cursor-pointer py-2 font-semibold text-primary-800">Technology used</summary>
                <p className="mt-2">{caseStudy.stack.join(', ')}</p>
              </details>
            </div>
          </div>

          <div className="grid gap-8 py-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl font-semibold text-primary-900">Have a similar problem?</h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">Send what you have now and tell me what needs to improve. I will recommend the clearest next step.</p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Link href="/inquiry" className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-primary-800 px-7 py-3.5 font-semibold text-white hover:bg-primary-700">
                Tell me about your project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
