// app/data-and-ownership/page.tsx - Where client data lives, who can reach it,
// and what the client keeps. Restyled on v3; the substance is unchanged, plus
// the support and continuity line agreed for Site Care.
//
// Tones: clearing header, white answers, leaf "why I take this seriously",
// then the Fern FooterCta and the Pine footer.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow, Heading, Section } from '@/components/v3';
import PageIntro from '@/components/services/PageIntro';
import { NUMERAL_CLASS, SOFT_TEXT, TEXT_LINK_CLASS } from '@/components/services/styles';
import { homeTrust } from '@/data/home';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';
export const metadata: Metadata = {
  title: 'How I Handle Your Data',
  description:
    'Where your data lives, who can access it, backups, and what happens if we part ways. You own the domain, hosting, analytics, and code.',
  alternates: { canonical: '/data-and-ownership' },
};

const ANSWERS: [title: string, body: string][] = [
  [
    'Where your data lives',
    'Client site and app data lives in US-region managed services such as Vercel and managed Postgres providers like Neon or Supabase. The exact setup depends on the project. I document it before launch so you know what is running your business.',
  ],
  [
    'You own it',
    'Your domain, code, accounts and business data belong to you. If you need to export content, leads, customer records, or project data, I make that possible and explain the format you will receive.',
  ],
  [
    'Who can access it',
    'I have access when needed to build, support, and troubleshoot your project. Access uses per-client credentials. Your client data is never handed to offshore contractors.',
  ],
  [
    'Backups',
    'Managed hosting and database providers handle backups when their service includes them. If backups matter to daily operations, the project can include a written plan for snapshots, exports, and recovery before launch.',
  ],
  [
    'Support and continuity',
    'Before Site Care begins, I agree with you in writing on what I watch, who receives failure alerts, and how quickly I respond. You keep an owner-controlled account for each critical service, and the handoff notes list the services and access another developer would need to understand the setup if I am ever unavailable.',
  ],
  [
    'If we part ways',
    'You can leave with your data. I help export the information you need, transfer ownership where the provider supports it, and remove my access after the handoff is complete.',
  ],
];

export default function DataAndOwnershipPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/data-and-ownership#webpage`,
    name: 'How I Handle Your Data',
    url: `${siteUrl}/data-and-ownership`,
    description: metadata.description,
    isPartOf: { '@id': `${siteUrl}#website` },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageIntro
        id="data-h"
        eyebrow="Data and ownership"
        title="Know where it lives. Keep control of it."
        italic="control"
        intro="Plain-language rules for the data, accounts, access, backups and handoff behind a project."
      >
        <p className="border-l-2 border-ink-700 pl-4 font-body text-body font-semibold text-primary-900">
          {homeTrust.promises[1].body}
        </p>
      </PageIntro>

      <Section tone="white" labelledBy="data-answers-h">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-4">
            <Eyebrow index="01">The practical answers</Eyebrow>
            <Heading as="h2" size="md" id="data-answers-h" className="mt-4">
              Six things to know before you hire me.
            </Heading>
          </div>
          <ol className="min-w-0 border-t border-primary-900/15 lg:col-span-8">
            {ANSWERS.map(([title, body], i) => (
              <li key={title} className="grid gap-2 border-b border-primary-900/15 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-4">
                <span aria-hidden="true" className={`font-mono text-label text-redline ${NUMERAL_CLASS} sm:pt-2`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <Heading as="h3" size="sm">
                    {title}
                  </Heading>
                  <p className={`mt-2 max-w-[62ch] font-body text-body-lg ${SOFT_TEXT}`}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="leaf" labelledBy="data-why-h">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-4">
            <Eyebrow index="02">Background</Eyebrow>
            <Heading as="h2" size="md" id="data-why-h" className="mt-4">
              Why I take this seriously.
            </Heading>
          </div>
          <div className="min-w-0 lg:col-span-8">
            <p className="max-w-[62ch] font-body text-body-lg text-primary-900">
              Before Sproutflow, I led SOC 2 Type II readiness from a 34% Vanta baseline to a passed audit as an SRE. That
              is my professional experience, not a Sproutflow certification. Sproutflow Studio is not claiming to be SOC 2
              certified.
            </p>
            <Link href="/faq#ownership" className={`${TEXT_LINK_CLASS} mt-4`} data-cta="data-faq">
              More questions about ownership
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      <FooterCta />
      <Footer />
    </>
  );
}
