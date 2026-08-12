import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, Database, KeyRound, LogOut, RotateCcw, ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/StudioLayout';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

export const metadata: Metadata = {
  title: 'How I Handle Your Data',
  description:
    'Plain-language answers about where Sproutflow Studio client data lives, who owns it, who can access it, backups, exports, and founder security experience.',
  alternates: { canonical: '/data-and-ownership' },
};

const sections = [
  {
    title: 'Where your data lives',
    icon: Database,
    body:
      'Client site and app data lives in US-region managed services such as Vercel and managed Postgres providers like Neon or Supabase. The exact setup depends on the project. I document it before launch so you know what is running your business.',
  },
  {
    title: 'You own it',
    icon: ShieldCheck,
    body:
      'Your business data belongs to you. If you need to export content, leads, customer records, or project data, I make that possible and explain the format you will receive.',
  },
  {
    title: 'Who can access it',
    icon: KeyRound,
    body:
      'I have access when needed to build, support, and troubleshoot your project. Access uses per-client credentials. Your client data is never handed to offshore contractors.',
  },
  {
    title: 'Backups',
    icon: RotateCcw,
    body:
      'Managed hosting and database providers handle backups when their service includes them. If backups matter to daily operations, the project can include a written plan for snapshots, exports, and recovery before launch.',
  },
  {
    title: 'If we part ways',
    icon: LogOut,
    body:
      'You can leave with your data. I help export the information you need, transfer ownership where the provider supports it, and remove Sproutflow access after the handoff is complete.',
  },
  {
    title: 'Why I take this seriously',
    icon: Award,
    body:
      'Before Sproutflow, I led SOC 2 Type II readiness from 34% to 100% as an SRE. That is my professional experience, not a Sproutflow certification. Sproutflow Studio is not claiming to be SOC 2 certified.',
  },
];

function DataHandlingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/data-and-ownership#webpage`,
    name: 'How I Handle Your Data',
    url: `${siteUrl}/data-and-ownership`,
    description: metadata.description,
    isPartOf: { '@id': `${siteUrl}#organization` },
    about: ['client data ownership', 'managed hosting', 'access controls', 'backups', 'data export'],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function DataAndOwnershipPage() {
  return (
    <>
      <DataHandlingSchema />

      <header className="bg-background-primary py-16 md:py-24">
        <Container>
          <div className="grid gap-8 border-t border-primary-900 pt-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Data and ownership</p>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-primary-950 sm:text-6xl lg:text-7xl">Know where it lives. Keep control of it.</h1>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary lg:col-span-4 lg:col-start-9">
              Websites and business systems can hold real customer information. These are the plain-language rules I use when choosing tools and handing over a project.
            </p>
          </div>
        </Container>
      </header>

      <section className="bg-white pb-20 md:pb-28">
        <Container>
          <div className="grid gap-px overflow-hidden border border-primary-900/20 bg-primary-900/20 md:grid-cols-2">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <article key={section.title} className="bg-white p-6 md:min-h-72 md:p-8">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-100 text-primary-800">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="font-display text-lg font-semibold text-accent-700" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h2 className="mt-8 font-display text-2xl font-semibold text-primary-900">{section.title}</h2>
                  <p className="mt-4 leading-relaxed text-text-secondary">{section.body}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-12 grid gap-7 border-y border-primary-900/20 py-9 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-semibold text-primary-900">Ask before you sign anything.</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-text-secondary">
                If a project touches sensitive customer information, we will cover access, exports, backups, and responsibilities during scope.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Link href="/inquiry" className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-primary-800 px-7 py-3.5 font-semibold text-white hover:bg-primary-700">
                Ask about your project
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
