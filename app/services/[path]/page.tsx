import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import MediaPanel from '@/components/ui/MediaPanel';
import ProjectRow from '@/components/ui/ProjectRow';
import FaqAccordion from '@/components/ui/FaqAccordion';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { getServicePath, servicePaths } from '@/data/servicePaths';
import { projectProof } from '@/data/projectProof';

type Props = { params: Promise<{ path: string }> };

export function generateStaticParams() {
  return servicePaths.map((path) => ({ path: path.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path: pathId } = await params;
  const service = getServicePath(pathId);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.id}` },
  };
}

function ServiceSchema({ service }: { service: NonNullable<ReturnType<typeof getServicePath>> }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.metaTitle,
    serviceType: service.eyebrow,
    description: service.metaDescription,
    url: `${siteUrl}/services/${service.id}`,
    provider: { '@id': `${siteUrl}#organization` },
    areaServed: [
      { '@type': 'City', name: 'New Orleans' },
      { '@type': 'Country', name: 'United States' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.eyebrow} capabilities`,
      itemListElement: service.capabilities.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function ServicePathPage({ params }: Props) {
  const { path: pathId } = await params;
  const service = getServicePath(pathId);
  if (!service) notFound();
  const relatedProject = projectProof.find((project) => project.id === service.relatedCaseStudy);

  return (
    <>
      <ServiceSchema service={service} />
      <PageHeader eyebrow={service.eyebrow} title={service.title} titleAccent={service.titleAccent} intro={service.outcome}>
        <Link
          href={`/inquiry?path=${service.id}`}
          className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent-500 px-6 py-3 font-semibold text-ink-900"
        >
          Ask about this path{' '}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </PageHeader>

      <SectionShell index="01" label="who this is for" variant="cream" labelledBy="service-fit-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="service-fit-heading" className="font-display text-display-lg text-primary-900 lg:col-span-5">
            A useful fit when this is the part holding things back.
          </h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="border-l-2 border-accent-500 pl-5 text-body-lg text-text-secondary">{service.goodFit}</p>
            <div className="mt-8 border border-dashed border-primary-900/25 bg-white p-6 text-text-muted">
              <p className="text-eyebrow uppercase text-accent-700">Content review</p>
              <p className="mt-3">Two additional fit statements will be added after you review this page skeleton.</p>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell index="02" label="what is included" variant="ink" labelledBy="service-included-heading">
        <h2 id="service-included-heading" className="max-w-4xl font-display text-display-md text-cream-300">
          The working parts of this service path.
        </h2>
        <div className="mt-12 grid border-t border-white/20 md:grid-cols-2">
          {service.capabilities.map((capability, index) => (
            <article
              key={capability}
              className={`border-b border-white/20 py-7 md:px-6 ${index % 2 === 0 ? 'md:border-r md:pl-0' : 'md:pr-0'}`}
            >
              <p className="font-mono text-mono-meta text-accent-300">0{index + 1}</p>
              <h3 className="mt-4 font-display text-h4 text-cream-300">{capability}</h3>
              <p className="mt-3 text-white/55">Clarifying scope copy is ready for your review.</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell index="03" label="working media" variant="cream">
        <MediaPanel placeholder={service.mediaPlaceholder} height={560} />
      </SectionShell>

      <SectionShell index="04" label="how it runs" variant="ink" labelledBy="service-process-heading">
        <h2 id="service-process-heading" className="font-display text-display-md text-cream-300">
          Four checkpoints, phrased for this work.
        </h2>
        <ol className="mt-12 grid gap-px bg-white/20 md:grid-cols-4">
          {service.checkpoints.map((checkpoint, index) => (
            <li key={checkpoint} className="bg-ink-900 p-6">
              <span className="font-mono text-mono-meta text-accent-300">0{index + 1}</span>
              <h3 className="mt-6 font-display text-h4 text-cream-300">{checkpoint}</h3>
            </li>
          ))}
        </ol>
      </SectionShell>

      {relatedProject && (
        <SectionShell index="05" label="related work" variant="ink" className="bg-ink-800">
          <ProjectRow project={relatedProject} />
        </SectionShell>
      )}

      <SectionShell index="06" label="questions for this path" variant="cream" labelledBy="service-faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="service-faq-heading" className="font-display text-display-md text-primary-900 lg:col-span-4">
            Questions to answer before this page is final.
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={service.faq} />
          </div>
        </div>
      </SectionShell>
      <FooterCta />
      <Footer />
    </>
  );
}
