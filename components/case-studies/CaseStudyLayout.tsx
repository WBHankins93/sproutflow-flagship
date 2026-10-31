import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';
import { caseStudies } from '@/data/caseStudies';
import { listedProjectProof, projectProof } from '@/data/projectProof';
import { getTestimonialForCaseStudy } from '@/data/testimonials';
import { getImageUrl } from '@/lib/blob-images';
import { SITE_URL } from '@/lib/site';
import { Eyebrow, Heading, Section } from '@/components/v3';
import { Footer } from '@/components/layout/Footer';
import Testimonial from '@/components/Testimonial';
import BeforeAfterGallery from './BeforeAfterGallery';
import ProjectCta from './ProjectCta';
import { PROOF_LEGEND, ProofLabel, StatValue, TEXT_LINK_CLASS } from './proof';

function BreadcrumbSchema({ caseStudy }: { caseStudy: CaseStudy }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE_URL}/work` },
      {
        '@type': 'ListItem',
        position: 3,
        name: caseStudy.clientName,
        item: `${SITE_URL}/case-studies/${caseStudy.slug}`,
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

/**
 * One case study on v3 and Sunlit forest. Tones, top to bottom:
 * clearing (header) · white (the challenge) · leaf (what I built) ·
 * pine (before and after, only when there are pairs) · white (results) ·
 * sunlight (testimonial, only when there is one) · fern (call to action) ·
 * Pine footer. No two neighbours share a tone, birch is not used, and red
 * appears only on the light tones.
 */
export default function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  const testimonial = getTestimonialForCaseStudy(caseStudy.slug);
  const project = projectProof.find((item) => item.id === caseStudy.slug);
  const listedCaseStudies = caseStudies.filter((study) => listedProjectProof.some((item) => item.id === study.slug));
  const currentIndex = listedCaseStudies.findIndex((item) => item.slug === caseStudy.slug);
  const nextStudy =
    currentIndex === -1 ? listedCaseStudies[0] : listedCaseStudies[(currentIndex + 1) % listedCaseStudies.length];
  const hasGallery = Boolean(caseStudy.beforeAfter?.some((pair) => pair.beforeSrc && pair.afterSrc));
  // Four results sit 2 by 2: a 60px mono "20 years" does not fit a quarter of the container.
  const resultColumns = caseStudy.results.length === 3 ? 'lg:grid-cols-3' : '';

  return (
    <>
      <BreadcrumbSchema caseStudy={caseStudy} />

      <Section tone="clearing" labelledBy="case-h">
        <Link
          href="/work"
          className="inline-flex min-h-[44px] items-center gap-2 font-body text-body-sm font-semibold text-primary-900 hover:underline hover:decoration-redline hover:underline-offset-4 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All work
        </Link>
        <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>{`Case study · ${caseStudy.details.industry}`}</Eyebrow>
            <p className="mt-4 font-body text-body-lg font-semibold">{caseStudy.clientName}</p>
            <Heading as="h1" size="lg" id="case-h" className="mt-2">
              {caseStudy.headline}
            </Heading>
            {caseStudy.headlineSource && <ProofLabel source={caseStudy.headlineSource} className="mt-4 block" />}
            <p className="mt-6 max-w-[60ch] font-body text-body-lg text-[#4A574D]">{caseStudy.summary}</p>
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${TEXT_LINK_CLASS} mt-6`}
            >
              Visit the live site
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <div
              className="relative aspect-[16/9] overflow-hidden rounded-xl border border-primary-900/15 bg-forest-white"
              style={{ backgroundColor: project?.canvasColor }}
            >
              <Image
                src={getImageUrl(caseStudy.heroImage)}
                alt={`${caseStudy.clientName} website`}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain object-top"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="case-challenge-h">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>The challenge</Eyebrow>
            <Heading id="case-challenge-h" size="md" className="mt-4">
              What needed to change.
            </Heading>
            <p className="mt-6 max-w-[60ch] font-body text-body-lg">{caseStudy.problem}</p>
          </div>
          <aside aria-label="Project facts" className="min-w-0 lg:col-span-4 lg:col-start-9">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-primary-900/15 pt-5">
              {[
                ['Timeline', caseStudy.details.timeline],
                ['Location', caseStudy.details.location],
                ['Industry', caseStudy.details.industry],
                ['Services', caseStudy.details.services],
                ...(caseStudy.details.notable ? [['Note', caseStudy.details.notable]] : []),
              ].map(([term, value]) => (
                <div key={term} className="min-w-0">
                  <dt className="font-mono text-label uppercase text-[#4A574D] [font-variant-ligatures:none]">{term}</dt>
                  <dd className="mt-1 font-body text-body-sm">{value}</dd>
                </div>
              ))}
            </dl>
            <ul aria-label="Built with" className="mt-6 flex flex-wrap gap-2">
              {caseStudy.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-primary-900/20 px-3 py-1 font-mono text-label text-[#4A574D] [font-variant-ligatures:none]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      <Section tone="leaf" labelledBy="case-built-h">
        <div className={caseStudy.builtImage ? 'grid gap-10 lg:grid-cols-12 lg:gap-12' : ''}>
          <div className={caseStudy.builtImage ? 'min-w-0 lg:col-span-6' : 'max-w-3xl'}>
            <Eyebrow>What I built</Eyebrow>
            <Heading id="case-built-h" size="md" className="mt-4">
              The working parts.
            </Heading>
            <ol className="mt-8 border-t border-primary-900/20">
              {caseStudy.built.map((item, index) => (
                <li key={item} className="grid grid-cols-[40px_1fr] gap-3 border-b border-primary-900/20 py-4">
                  <span
                    aria-hidden="true"
                    className="font-mono text-label leading-7 tabular-nums text-redline [font-variant-ligatures:none]"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-body">{item}</p>
                </li>
              ))}
            </ol>
          </div>
          {caseStudy.builtImage && (
            <div className="min-w-0 lg:col-span-5 lg:col-start-8">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-primary-900/15 bg-forest-white">
                <Image
                  src={getImageUrl(caseStudy.builtImage)}
                  alt={caseStudy.builtImageAlt || `${caseStudy.clientName} website detail`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}
        </div>
      </Section>

      {hasGallery && <BeforeAfterGallery pairs={caseStudy.beforeAfter!} clientName={caseStudy.clientName} />}

      <Section tone="white" labelledBy="case-results-h">
        <Eyebrow>Results</Eyebrow>
        <Heading id="case-results-h" size="md" className="mt-4">
          What changed after launch.
        </Heading>
        <ul aria-label="Results" className={`mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 ${resultColumns}`}>
          {caseStudy.results.map((result) => (
            <li
              key={`${result.value}-${result.label}`}
              data-result
              className="flex min-w-0 flex-col border-t-2 border-primary-900 pt-4"
            >
              <StatValue value={result.value} />
              <p className="mt-2 font-body text-body">{result.label}</p>
              <ProofLabel source={result.source} className="mt-3" />
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[60ch] font-body text-body-sm text-[#4A574D]">{PROOF_LEGEND}</p>
      </Section>

      {testimonial && (
        <Section tone="sunlight" labelledBy="case-quote-h" container="narrow">
          <Eyebrow>In their words</Eyebrow>
          <h2 id="case-quote-h" className="sr-only">
            What {caseStudy.clientName} said
          </h2>
          <Testimonial testimonial={testimonial} className="mt-6" />
        </Section>
      )}

      <ProjectCta
        id="case-cta-h"
        cta="case-study"
        heading="Have a problem like this one?"
        body="Book a 15-minute call with me. Tell me what is getting in the way, and I will tell you straight what I would do about it."
        next={
          nextStudy && nextStudy.slug !== caseStudy.slug
            ? { href: `/case-studies/${nextStudy.slug}`, name: nextStudy.clientName }
            : undefined
        }
      />
      <Footer />
    </>
  );
}
