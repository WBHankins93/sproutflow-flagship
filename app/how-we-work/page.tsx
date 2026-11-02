// app/how-we-work/page.tsx - How a project runs, from the first call to care.
// A real, indexable page (it used to redirect to /#process). Times and prices
// come from data/catalog.ts and the promises from data/home.ts.
//
// Tones: clearing header, fern promises, white steps, leaf "what I need from
// you", then the Fern FooterCta (not adjacent to the first Fern) and the footer.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import PageIntro from '@/components/services/PageIntro';
import { NUMERAL_CLASS, SOFT_TEXT, TEXT_LINK_CLASS, bookingHref } from '@/components/services/styles';
import { BOOKING_CTA_LABEL } from '@/lib/constants';
import { formatShortPrice, getOffer } from '@/data/catalog';
import { homeTrust } from '@/data/home';

export const metadata: Metadata = {
  title: 'How I Work',
  description:
    'Five steps from a 15-minute call to a site that keeps working: written options at fixed prices, a build with weekly check-ins, launch with 30 days of fixes, and optional Site Care.',
  alternates: { canonical: '/how-we-work' },
};

const starter = getOffer('starter')!;
const care = getOffer('care')!;

/** The five steps, first call to care. */
const HOW_STEPS: { title: string; body: string; detail?: string }[] = [
  {
    title: 'A 15-minute call',
    body: 'You tell me what is going on. I ask a few questions and tell you honestly what I would fix first, and whether I am the right person to do it.',
    detail: 'Just me on the call. No sales team.',
  },
  {
    title: 'Written options at fixed prices',
    body: 'Within 2 business days I send written options, each with the scope, a fixed price and a timeline. You pick one, and you pay in parts, not all up front.',
    detail: `The ${starter.name.toLowerCase()} and the ${getOffer('audit')!.name} skip this step: they cost what the menu says.`,
  },
  {
    title: 'The build, with weekly check-ins',
    body: 'I build it and check in with you every week, so you see working pages as they come together, not one big reveal at the end.',
    detail: `${starter.name}: ${(starter.priceNote ?? '').toLowerCase()}`,
  },
  {
    title: 'Launch, with 30 days of fixes',
    body: homeTrust.promises[2].body,
    detail: 'Your domain, code and accounts stay in your name.',
  },
  {
    title: 'Site Care, if you want it',
    body: `${care.line} I watch your forms, domain and email, so a quiet break gets fixed before a customer finds it.`,
    detail: `${formatShortPrice(care)}. Optional, and you keep ownership either way.`,
  },
];

const RESPONSIBILITIES = [
  {
    title: 'What I need from you',
    body: 'Your goals, your existing content and photos, and access to the accounts the site depends on. One person who can give feedback and approve the direction and the launch.',
  },
  {
    title: 'What I handle',
    body: 'The design, build, testing and handoff. You review working pieces at the check-ins; you never have to manage anything technical.',
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageIntro
        id="how-h"
        eyebrow="How I work"
        title="From a 15-minute call to a site that keeps working."
        italic="keeps"
        intro="Five steps, the same person at every one. You always know the price before I start."
      >
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <ButtonLink href={bookingHref()} data-cta="how">
            {BOOKING_CTA_LABEL}
          </ButtonLink>
          <Link href="/services" className={TEXT_LINK_CLASS} data-cta="how-services">
            See services and prices
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </PageIntro>

      <Section tone="fern" rhythm="none" ariaLabel={homeTrust.label} className="py-8 lg:py-10">
        <ul className="grid gap-5 sm:grid-cols-3 sm:gap-8">
          {homeTrust.promises.map((promise, i) => (
            <li key={promise.title} className="flex gap-3">
              <span aria-hidden="true" className={`mt-[0.2rem] font-mono text-label text-cream-300 ${NUMERAL_CLASS}`}>
                0{i + 1}
              </span>
              <p className="font-body text-body text-cream-300">
                <strong className="font-semibold">{promise.title}.</strong> <span>{promise.body}</span>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="how-steps-h">
        <Eyebrow index="01">Five steps</Eyebrow>
        <Heading as="h2" id="how-steps-h" className="mt-4">
          First call to care.
        </Heading>
        <ol className="mt-8 border-t border-primary-900/15">
          {HOW_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-3 border-b border-primary-900/15 py-6 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,0.8fr)] md:gap-8"
            >
              <span aria-hidden="true" className={`font-mono text-price text-redline ${NUMERAL_CLASS}`}>
                0{i + 1}
              </span>
              <div className="min-w-0">
                <Heading as="h3" size="sm">
                  {step.title}
                </Heading>
                <p className="mt-2 max-w-[60ch] font-body text-body-lg text-primary-900">{step.body}</p>
              </div>
              {step.detail && <p className={`min-w-0 font-body text-body ${SOFT_TEXT} md:pt-2`}>{step.detail}</p>}
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="leaf" labelledBy="how-you-h">
        <Eyebrow index="02">Your part</Eyebrow>
        <Heading as="h2" size="md" id="how-you-h" className="mt-4">
          Less than you might think.
        </Heading>
        <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
          {RESPONSIBILITIES.map((item) => (
            <div key={item.title} className="rounded-xl bg-forest-white p-5 lg:p-6">
              <h3 className="font-body text-body-lg font-semibold text-primary-900">{item.title}</h3>
              <p className={`mt-2 font-body text-body ${SOFT_TEXT}`}>{item.body}</p>
            </div>
          ))}
        </div>
        <Link href="/data-and-ownership" className={`${TEXT_LINK_CLASS} mt-6`} data-cta="how-data">
          How I handle your data and accounts
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Section>

      <FooterCta />
      <Footer />
    </>
  );
}
