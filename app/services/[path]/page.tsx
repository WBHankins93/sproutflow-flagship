import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import ServiceMedia from '@/components/services/ServiceMedia';
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
  const otherPaths = servicePaths.filter((path) => path.id !== service.id);

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
          <div className="lg:col-span-5">
            <h2 id="service-fit-heading" className="font-display text-display-lg text-primary-900">
              A useful fit when this is the part holding things back.
            </h2>
            <ul className="mt-8 grid gap-px border-y border-primary-900/15 bg-primary-900/15">
              {service.fitStatements.map((statement, index) => (
                <li key={statement} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 bg-cream-300 py-5">
                  <span className="font-mono text-mono-meta text-accent-700">0{index + 1}</span>
                  <span className="text-body-lg text-text-secondary">{statement}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-eyebrow uppercase text-text-muted">What is included</p>
            <div className="mt-5 grid border-t border-primary-900/15">
              {service.capabilities.map((capability) => (
                <p key={capability} className="border-b border-primary-900/15 py-4 text-body-lg text-primary-900">
                  {capability}
                </p>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell index="02" label="what it looks like" variant="ink">
        <ServiceMedia path={service.id} height={480} />
      </SectionShell>

      <SectionShell index="03" label="how it runs" variant="cream" labelledBy="service-process-heading">
        <h2 id="service-process-heading" className="font-display text-display-md text-primary-900">
          Four checkpoints, phrased for this work.
        </h2>
        <ol className="mt-10 grid gap-px border border-primary-900/15 bg-primary-900/15 sm:grid-cols-2 lg:grid-cols-4">
          {service.checkpoints.map((checkpoint, index) => (
            <li key={checkpoint} className="bg-cream-300 p-5">
              <span className="font-mono text-mono-meta text-accent-700">0{index + 1}</span>
              <h3 className="mt-3 font-display text-body-lg font-semibold text-primary-900">{checkpoint}</h3>
            </li>
          ))}
        </ol>
      </SectionShell>

      {relatedProject && (
        <SectionShell index="04" label="related work" variant="ink" className="bg-ink-800">
          <ProjectRow project={relatedProject} />
        </SectionShell>
      )}

      <SectionShell index="05" label="questions for this path" variant="cream" labelledBy="service-faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="service-faq-heading" className="font-display text-display-md text-primary-900 lg:col-span-4">
            Questions owners ask about this path.
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqAccordion items={service.faq} />
          </div>
        </div>
      </SectionShell>

      <div className="border-t border-primary-900/10 bg-cream-300 py-10">
        <div className="mx-auto max-w-[1440px] px-5 md:px-11">
          <p className="text-eyebrow uppercase text-text-muted">Might be a closer fit</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {otherPaths.map((path) => (
              <Link
                key={path.id}
                href={`/services/${path.id}`}
                className="group flex items-center justify-between gap-4 border border-primary-900/15 bg-white p-5 hover:border-primary-700"
              >
                <span>
                  <span className="block text-body-sm text-text-muted">{path.eyebrow}</span>
                  <span className="mt-1 block font-display text-h4 text-primary-900">{path.title}</span>
                </span>
                <ArrowRight
                  className="h-5 w-5 flex-none text-primary-700 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FooterCta />
      <Footer />
    </>
  );
}
