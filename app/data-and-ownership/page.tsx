import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';
export const metadata: Metadata = {
  title: 'How I Handle Your Data',
  description:
    'Where your data lives, who can access it, backups, and what happens if we part ways. You own the domain, hosting, analytics, and code.',
  alternates: { canonical: '/data-and-ownership' },
};

const sections = [
  [
    'Where your data lives',
    'Client site and app data lives in US-region managed services such as Vercel and managed Postgres providers like Neon or Supabase. The exact setup depends on the project. I document it before launch so you know what is running your business.',
  ],
  [
    'You own it',
    'Your business data belongs to you. If you need to export content, leads, customer records, or project data, I make that possible and explain the format you will receive.',
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
    'If we part ways',
    'You can leave with your data. I help export the information you need, transfer ownership where the provider supports it, and remove Sproutflow access after the handoff is complete.',
  ],
  [
    'Why I take this seriously',
    'Before Sproutflow, I led SOC 2 Type II readiness from 34% to 100% as an SRE. That is my professional experience, not a Sproutflow certification. Sproutflow Studio is not claiming to be SOC 2 certified.',
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
      <PageHeader
        eyebrow="Data and ownership"
        title="Know where it lives. Keep control of it."
        titleAccent="Keep control of it"
        intro="Plain-language rules for the data, accounts, access, backups, and handoff behind a project."
      />
      <SectionShell index="01" label="the practical answers" variant="cream">
        <div className="mx-auto max-w-[760px] border-t border-primary-900/20">
          {sections.map(([title, body], index) => (
            <section key={title} className="grid gap-4 border-b border-primary-900/20 py-9 md:grid-cols-[70px_1fr]">
              <span className="font-mono text-mono-meta text-accent-700">0{index + 1}</span>
              <div>
                <h2 className="font-display text-display-md text-primary-900">{title}</h2>
                <p className="mt-5 text-body-lg text-text-secondary">{body}</p>
              </div>
            </section>
          ))}
        </div>
      </SectionShell>
      <FooterCta />
      <Footer />
    </>
  );
}
