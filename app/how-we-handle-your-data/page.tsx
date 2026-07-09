import type { Metadata } from 'next';
import { ShieldCheck, Database, KeyRound, RotateCcw, LogOut, Award } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

export const metadata: Metadata = {
  title: 'How We Handle Your Data',
  description:
    'Plain-language answers about where Sproutflow Studio client data lives, who owns it, who can access it, backups, exports, and founder security experience.',
  alternates: {
    canonical: '/how-we-handle-your-data',
  },
};

const sections = [
  {
    title: 'Where your data lives',
    icon: Database,
    body:
      'Client site and app data lives in US-region managed services such as Vercel and managed Postgres providers like Neon or Supabase. The exact setup depends on the project, and we document it before launch so you know what is running your business.',
  },
  {
    title: 'You own it',
    icon: ShieldCheck,
    body:
      'Your business data belongs to you. If you need to export content, leads, customer records, or project data, we make that easy and explain the format you will receive.',
  },
  {
    title: 'Who can access it',
    icon: KeyRound,
    body:
      'Ben has full access when needed to build, support, and troubleshoot your project. Access is handled with per-client credentials. Sproutflow does not hand your client data to offshore contractors.',
  },
  {
    title: 'Backups',
    icon: RotateCcw,
    body:
      'For managed hosting and databases, backups are handled by the platform provider when that service includes them. For projects where backups matter to operations, we can add a written backup plan with provider snapshots, export cadence, and restore expectations before launch.',
  },
  {
    title: 'If we part ways',
    icon: LogOut,
    body:
      'You can leave with your data. We will help export the information you need, transfer ownership where the provider supports it, and remove Sproutflow access after the handoff is complete.',
  },
  {
    title: 'Founder security background',
    icon: Award,
    body:
      'Our founder led SOC 2 Type II readiness from 34% to 100% as an SRE before starting Sproutflow. That is professional experience, not a Sproutflow certification. Sproutflow Studio is not claiming to be SOC 2 certified.',
  },
];

function DataHandlingSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/how-we-handle-your-data#webpage`,
    name: 'How We Handle Your Data',
    url: `${siteUrl}/how-we-handle-your-data`,
    description: metadata.description,
    isPartOf: {
      '@id': `${siteUrl}#organization`,
    },
    about: [
      'client data ownership',
      'managed hosting',
      'access controls',
      'backups',
      'data export',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HowWeHandleYourDataPage() {
  return (
    <>
      <DataHandlingSchema />

      <header className="border-b border-primary-100 bg-gradient-to-br from-white via-primary-50/60 to-accent-50/40">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-28">
          <div className="mb-5 inline-flex items-center gap-2 text-primary-700">
            <span className="h-px w-10 bg-primary-500/70" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">Trust</span>
          </div>
          <h1 className="max-w-3xl break-words text-3xl font-display font-bold leading-tight text-gray-900 sm:text-4xl md:text-6xl">
            How We Handle Your Data
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg md:mt-6 md:text-xl">
            Your website and business systems can hold real customer information. Here is the
            plain-language version of how Sproutflow treats that responsibility.
          </p>
        </div>
      </header>

      <main className="bg-white">
        <section className="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:grid-cols-2 md:gap-6 md:px-8 md:py-20">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <article
                key={section.title}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mb-3 text-xl font-display font-bold leading-tight text-gray-900 md:text-2xl">
                  {section.title}
                </h2>
                <p className="text-base leading-relaxed text-gray-600">{section.body}</p>
              </article>
            );
          })}
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-20 md:px-8">
          <div className="rounded-2xl border border-primary-200 bg-primary-50 p-5 md:p-8">
            <h2 className="mb-3 text-xl font-display font-bold leading-tight text-gray-900 md:text-2xl">
              Questions are welcome before you sign anything.
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              If your project touches sensitive customer information, we will talk through access,
              exports, backups, and responsibilities during scope. The goal is simple: you should
              understand what is being built and feel comfortable trusting it.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
