import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink, Quote } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';
import { caseStudies } from '@/data/caseStudies';
import { listedProjectProof, projectProof } from '@/data/projectProof';
import { getTestimonialForCaseStudy } from '@/data/testimonials';
import { getImageUrl } from '@/lib/blob-images';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import MediaPanel from '@/components/ui/MediaPanel';
import Pill from '@/components/ui/Pill';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

function BreadcrumbSchema({ caseStudy }: { caseStudy: CaseStudy }) {
  const schema = {
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
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function CaseStudyLayout({ caseStudy }: { caseStudy: CaseStudy }) {
  const testimonial = getTestimonialForCaseStudy(caseStudy.slug);
  const project = projectProof.find((item) => item.id === caseStudy.slug);
  const listedCaseStudies = caseStudies.filter((study) => listedProjectProof.some((item) => item.id === study.slug));
  const currentIndex = listedCaseStudies.findIndex((item) => item.slug === caseStudy.slug);
  const nextStudy =
    currentIndex === -1 ? listedCaseStudies[0] : listedCaseStudies[(currentIndex + 1) % listedCaseStudies.length];
  const nextProject = projectProof.find((item) => item.id === nextStudy.slug);

  return (
    <>
      <BreadcrumbSchema caseStudy={caseStudy} />
      <PageHeader
        eyebrow={`${caseStudy.details.industry} · ${caseStudy.details.location}`}
        title={caseStudy.clientName}
        intro={caseStudy.headline}
      >
        <div className="flex flex-wrap gap-4">
          <Link href="/work" className="inline-flex min-h-11 items-center gap-2 text-white/65 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All work
          </Link>
          <a
            href={caseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border-b border-accent-400 font-semibold text-white"
          >
            Visit live site <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </PageHeader>

      <SectionShell index="01" label="project media" variant="ink" className="bg-ink-800">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/15"
          style={{ backgroundColor: project?.canvasColor }}
        >
          <Image
            src={getImageUrl(caseStudy.heroImage)}
            alt={`${caseStudy.clientName} website`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
        <p className="mt-4 font-mono text-mono-meta text-white/45">Scroll recording replaces this still when ready</p>
      </SectionShell>

      <SectionShell index="02" label="the situation" variant="cream" labelledBy="case-problem-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="case-problem-heading" className="font-display text-display-lg text-primary-900 lg:col-span-4">
            What needed to change.
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="text-body-lg text-text-secondary">{caseStudy.problem}</p>
            <p className="mt-8 border-l-[3px] border-accent-500 pl-6 font-accent text-2xl italic leading-relaxed text-primary-900">
              {caseStudy.summary}
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell index="03" label="what I built" variant="ink" labelledBy="case-built-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="case-built-heading" className="font-display text-display-lg text-cream-300">
              The working parts of the project.
            </h2>
            <ol className="mt-10 border-t border-white/20">
              {caseStudy.built.map((item, index) => (
                <li key={item} className="grid grid-cols-[44px_1fr] gap-4 border-b border-white/20 py-5">
                  <span className="font-mono text-mono-meta text-accent-300">0{index + 1}</span>
                  <p className="text-white/[0.68]">{item}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="sticky top-32">
              <MediaPanel placeholder="Project detail capture goes here" variant="ink" />
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell index="04" label="how it works now" variant="cream" labelledBy="case-results-heading">
        <h2 id="case-results-heading" className="max-w-4xl font-display text-display-lg text-primary-900">
          What changed after launch.
        </h2>
        <div className="mt-12 grid gap-px border border-primary-900/20 bg-primary-900/20 md:grid-cols-3">
          {caseStudy.results.map((result) => (
            <article key={`${result.value}-${result.label}`} className="bg-white p-7">
              <p className="font-display text-display-md text-accent-700">{result.value}</p>
              <p className="mt-4 text-text-secondary">{result.label}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell index="05" label="timeline" variant="ink" className="bg-ink-800" labelledBy="case-timeline-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="case-timeline-heading" className="font-display text-display-lg text-cream-300">
              From scope to launch.
            </h2>
            <p className="mt-5 font-mono text-mono-meta text-accent-300">{caseStudy.details.timeline}</p>
          </div>
          <div className="grid gap-px bg-white/20 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {['Direction agreed', 'Working build', 'Review and refine', 'Launch and handoff'].map((step, index) => (
              <div key={step} className="bg-ink-800 p-6">
                <span className="font-mono text-mono-meta text-accent-300">0{index + 1}</span>
                <p className="mt-5 font-display text-xl text-cream-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell index="06" label="mobile screens" variant="cream">
        <div className="grid gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <MediaPanel key={item} placeholder={`Mobile screen ${item}`} height={460} />
          ))}
        </div>
      </SectionShell>

      <SectionShell index="07" label="project notes" variant="ink">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-display-md text-cream-300">The practical details.</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="grid gap-5 text-white/[0.68] sm:grid-cols-2">
              <div>
                <dt className="text-eyebrow uppercase text-white/40">Timeline</dt>
                <dd className="mt-2">{caseStudy.details.timeline}</dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase text-white/40">Services</dt>
                <dd className="mt-2">{caseStudy.details.services}</dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase text-white/40">Location</dt>
                <dd className="mt-2">{caseStudy.details.location}</dd>
              </div>
              <div>
                <dt className="text-eyebrow uppercase text-white/40">Industry</dt>
                <dd className="mt-2">{caseStudy.details.industry}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-2">
              {caseStudy.stack.map((item) => (
                <Pill key={item} variant="ink">
                  {item}
                </Pill>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      {testimonial && (
        <SectionShell index="08" label="testimonial" variant="cream">
          <figure className="mx-auto max-w-4xl">
            <Quote className="h-8 w-8 text-accent-700" aria-hidden="true" />
            <blockquote className="mt-7 font-accent text-3xl italic leading-relaxed text-primary-900">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-7 text-text-secondary">
              {testimonial.name} · {testimonial.role}, {testimonial.business}
            </figcaption>
          </figure>
        </SectionShell>
      )}

      <Link
        href={`/case-studies/${nextStudy.slug}`}
        className="group relative block overflow-hidden bg-ink-900 py-20 text-white md:py-28"
      >
        {nextProject && (
          <Image
            src={getImageUrl(nextProject.screenshot)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-top opacity-20 transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        )}
        <div className="relative mx-auto max-w-[1186px] px-5 md:px-11">
          <p className="text-eyebrow uppercase text-accent-300">Next project</p>
          <h2 className="mt-5 flex items-center justify-between gap-8 font-display text-display-lg text-cream-300">
            {nextStudy.clientName}
            <ArrowRight className="h-9 w-9" aria-hidden="true" />
          </h2>
        </div>
      </Link>
      <FooterCta />
      <Footer />
    </>
  );
}
