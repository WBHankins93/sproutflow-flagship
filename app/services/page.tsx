// app/services/page.tsx - The services index on v3: a short intro, the three
// categories (Websites, Lead & Business Systems, Care), then every fixed
// offer and the custom quote from data/catalog.ts.
//
// Tones: clearing header, white categories, pine offers, leaf promises, then
// the Fern FooterCta and the Pine footer.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import OfferBlock from '@/components/services/OfferBlock';
import PageIntro from '@/components/services/PageIntro';
import { NUMERAL_CLASS, SOFT_TEXT, TEXT_LINK_CLASS, bookingHref } from '@/components/services/styles';
import { BOOKING_CTA_LABEL } from '@/lib/constants';
import { catalogCategories, fixedOffers } from '@/data/catalog';
import { homeOffers, homeTrust } from '@/data/home';
import { servicePaths } from '@/data/servicePaths';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Websites, lead and business systems, and care for small businesses. Three fixed prices you can book, and a custom quote for everything else. Based in New Orleans, working with businesses anywhere.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        id="services-h"
        eyebrow="Services"
        title="Websites, lead systems and care, sized to the job."
        italic="care"
        intro="I build sites that get you called, systems that catch every inquiry, and I keep both working after launch. Three things have a fixed price. Everything else starts with a 15-minute call."
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <ButtonLink href={bookingHref()} data-cta="services">
            {BOOKING_CTA_LABEL}
          </ButtonLink>
          <ButtonLink href="/check" variant="secondary" data-cta="services-check">
            Check your website free
          </ButtonLink>
        </div>
      </PageIntro>

      <Section tone="white" labelledBy="services-categories-h">
        <Eyebrow index="01">What I build</Eyebrow>
        <Heading as="h2" id="services-categories-h" className="mt-4">
          Three kinds of work.
        </Heading>
        <ul className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
          {catalogCategories.map((category, i) => {
            const path = servicePaths.find((entry) => entry.id === category.servicePath);
            return (
              <li key={category.id} className="min-w-0">
                <article
                  aria-labelledby={`category-${category.id}-h`}
                  className="flex h-full flex-col rounded-xl border border-primary-900/15 bg-forest-clearing p-5 lg:p-6"
                >
                  <span aria-hidden="true" className={`font-mono text-label text-redline ${NUMERAL_CLASS}`}>
                    0{i + 1}
                  </span>
                  <Heading as="h3" size="sm" id={`category-${category.id}-h`} className="mt-3">
                    {category.name}
                  </Heading>
                  <p className="mt-2 font-body text-body font-semibold text-primary-900">{category.blurb}</p>
                  {path && <p className={`mt-2 font-body text-body ${SOFT_TEXT}`}>{path.outcome}</p>}
                  <Link
                    href={`/services/${category.servicePath}`}
                    className={`${TEXT_LINK_CLASS} mt-auto pt-4`}
                    data-cta={`services-${category.servicePath}`}
                  >
                    What I build
                    <span className="sr-only"> for {category.name}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>

      <OfferBlock
        id="services-offers"
        index="02"
        eyebrow={homeOffers.eyebrow}
        heading="Three fixed prices. Everything else, quoted."
        sub={homeOffers.sub}
        offers={fixedOffers}
        showCustomQuote
        ctaPrefix="services"
      />

      <Section tone="leaf" labelledBy="services-promises-h">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <Eyebrow index="03">Whatever you pick</Eyebrow>
            <Heading as="h2" size="md" id="services-promises-h" className="mt-4">
              The same three promises.
            </Heading>
            <div className="mt-4 flex flex-col items-start gap-1">
              <Link href="/how-we-work" className={TEXT_LINK_CLASS} data-cta="services-how">
                How I work, step by step
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/data-and-ownership" className={TEXT_LINK_CLASS} data-cta="services-data">
                How I handle your data
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <ul className="grid min-w-0 gap-4 sm:grid-cols-3 lg:col-span-7">
            {homeTrust.promises.map((promise) => (
              <li key={promise.title} className="rounded-xl bg-forest-white p-5">
                <p className="font-body text-body font-semibold text-primary-900">{promise.title}</p>
                <p className={`mt-1 font-body text-body ${SOFT_TEXT}`}>{promise.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FooterCta />
      <Footer />
    </>
  );
}
