// app/services/[path]/page.tsx - The three "what I build" category pages on v3
// (Websites, Lead & Business Systems, Care). Each ends with its matching offers
// from data/catalog.ts; no price is typed here.
//
// Tones: clearing header, white fit, leaf process, white related work, pine
// offers, sunlight questions, then the Fern FooterCta and the Pine footer.

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import OfferBlock from '@/components/services/OfferBlock';
import PageIntro from '@/components/services/PageIntro';
import QuestionList from '@/components/services/QuestionList';
import RelatedWork from '@/components/services/RelatedWork';
import { NUMERAL_CLASS, SOFT_TEXT, TEXT_LINK_CLASS, bookingHref } from '@/components/services/styles';
import { BOOKING_CTA_LABEL, INQUIRY_PATH } from '@/lib/constants';
import { getCategory, getOffersByCategory } from '@/data/catalog';
import { listedProjectProof } from '@/data/projectProof';
import { getServicePath, servicePaths, type ServicePath } from '@/data/servicePaths';

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

function ServiceSchema({ service }: { service: ServicePath }) {
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
  const category = getCategory(service.category);
  const offers = getOffersByCategory(service.category);
  const otherPaths = servicePaths.filter((path) => path.id !== service.id);
  const hasRelated = listedProjectProof.some((project) => project.id === service.relatedCaseStudy);
  const index = (n: number) => String(n).padStart(2, '0');
  const offersIndex = hasRelated ? 4 : 3;

  return (
    <>
      <ServiceSchema service={service} />
      <PageIntro
        id="service-h"
        eyebrow={category.name}
        title={service.title}
        italic={service.titleAccent}
        intro={
          <>
            <p>{service.outcome}</p>
            <p className="mt-3">{service.description}</p>
          </>
        }
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <ButtonLink href={bookingHref(`path=${service.id}`)} data-cta={`service-${service.id}`}>
            {BOOKING_CTA_LABEL}
          </ButtonLink>
          <Link
            href={`${INQUIRY_PATH}?path=${service.id}`}
            data-cta={`service-${service.id}-inquiry`}
            className={TEXT_LINK_CLASS}
          >
            {service.ctaLabel}
          </Link>
        </div>
      </PageIntro>

      <Section tone="white" labelledBy="service-fit-h">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <Eyebrow index={index(1)}>Who this is for</Eyebrow>
            <Heading as="h2" size="md" id="service-fit-h" className="mt-4">
              A good fit when this is the part holding things back.
            </Heading>
            <ul className="mt-6 border-t border-primary-900/15">
              {service.fitStatements.map((statement, i) => (
                <li key={statement} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-b border-primary-900/15 py-4">
                  <span aria-hidden="true" className={`font-mono text-label text-redline ${NUMERAL_CLASS}`}>
                    {index(i + 1)}
                  </span>
                  <span className="font-body text-body-lg text-primary-900">{statement}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 lg:col-span-6 lg:col-start-7">
            <h3 className={`font-mono text-label uppercase ${SOFT_TEXT} [font-variant-ligatures:none]`}>What I build</h3>
            <ul className="mt-4 border-t border-primary-900/15">
              {service.capabilities.map((capability) => (
                <li key={capability} className="border-b border-primary-900/15 py-4 font-body text-body-lg text-primary-900">
                  {capability}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="leaf" labelledBy="service-process-h">
        <Eyebrow index={index(2)}>How it runs</Eyebrow>
        <Heading as="h2" size="md" id="service-process-h" className="mt-4">
          Four checkpoints, start to finish.
        </Heading>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.checkpoints.map((checkpoint, i) => (
            <li key={checkpoint} className="rounded-xl bg-forest-white p-5">
              <span aria-hidden="true" className={`font-mono text-label text-redline ${NUMERAL_CLASS}`}>
                {index(i + 1)}
              </span>
              <p className="mt-3 font-body text-body-lg font-semibold leading-snug text-primary-900">{checkpoint}</p>
            </li>
          ))}
        </ol>
      </Section>

      <RelatedWork projectId={service.relatedCaseStudy} index={index(3)} />

      <OfferBlock
        id="service-offers"
        index={index(offersIndex)}
        eyebrow="Ways to start"
        heading={service.offersHeading}
        sub={service.offersSub}
        offers={offers}
        showCustomQuote={service.customQuote}
        ctaPrefix={`service-${service.id}`}
      />

      <Section tone="sunlight" labelledBy="service-faq-h">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-4">
            <Eyebrow index={index(offersIndex + 1)}>Questions</Eyebrow>
            <Heading as="h2" size="md" id="service-faq-h" className="mt-4">
              What owners ask about {category.name.toLowerCase()}.
            </Heading>
            <Link href="/faq" className={`${TEXT_LINK_CLASS} mt-4`} data-cta={`service-${service.id}-faq`}>
              All common questions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <QuestionList items={service.faq} />
          </div>
        </div>

        <nav aria-labelledby="service-other-h" className="mt-12 border-t border-primary-900/15 pt-6">
          <p id="service-other-h" className={`font-mono text-label uppercase ${SOFT_TEXT} [font-variant-ligatures:none]`}>
            Might be a closer fit
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {otherPaths.map((path) => (
              <li key={path.id}>
                <Link
                  href={`/services/${path.id}`}
                  className="group flex min-h-[64px] items-center justify-between gap-4 rounded-xl border border-primary-900/15 bg-forest-white p-4 transition-colors hover:border-primary-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline"
                >
                  <span className="min-w-0">
                    <span className={`block font-mono text-label uppercase ${SOFT_TEXT} [font-variant-ligatures:none]`}>
                      {getCategory(path.category).name}
                    </span>
                    <span className="mt-1 block font-body text-body-lg font-semibold text-primary-900">{path.title}</span>
                  </span>
                  <ArrowRight
                    className="h-5 w-5 flex-none text-primary-900 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Section>

      <FooterCta />
      <Footer />
    </>
  );
}
