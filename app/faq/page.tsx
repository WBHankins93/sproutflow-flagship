import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import FaqAccordion, { type FaqItem } from '@/components/ui/FaqAccordion';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Common Questions',
  description:
    'Answers on scope, timelines, pricing, ownership, and what happens after launch. Written for owners deciding whether to hire.',
  alternates: { canonical: '/faq' },
};

const groups: { label: string; items: FaqItem[] }[] = [
  {
    label: 'Pricing and budget',
    items: [
      {
        question: 'How do you decide what a project should include?',
        answer:
          'I start with the result you need and the way the work happens today. After reviewing both, I recommend a right-sized scope and send a fixed quote.',
      },
    ],
  },
  {
    label: 'Process and timeline',
    items: [
      {
        question: 'How long does a custom website take to build?',
        answer:
          'A focused site can launch in a few weeks. Larger websites and connected business systems take longer. The written scope names what I need from you and when.',
      },
      {
        question: 'What do I need to have ready before we start?',
        answer:
          'Bring the business goal and anything customers see now. A website link, form, notes, logo, photographs, or old copy can help, but none are required for the first conversation.',
      },
    ],
  },
  {
    label: 'Ownership and handover',
    items: [
      {
        question: 'Who owns the finished work?',
        answer:
          'You own the domain, accounts, data, and finished work. I document the handoff and remove access when support ends.',
      },
    ],
  },
  {
    label: 'Working together',
    items: [
      {
        question: 'Do you work with businesses outside New Orleans?',
        answer:
          'Yes. Sproutflow is based in New Orleans and works with businesses nationwide. Calls, reviews, and approvals can all happen remotely.',
      },
      {
        question: 'I already have a website. What else can you build?',
        answer:
          'Sproutflow builds the work behind the site: intake and booking flows, customer records, dashboards, content tools, reporting, and follow-up systems.',
      },
    ],
  },
  {
    label: 'After launch',
    items: [
      {
        question: 'Do you handle hosting and maintenance after launch?',
        answer:
          'Yes. Ongoing support can include hosting, updates, monitoring, content changes, and measured improvements. It stays optional, and you keep ownership either way.',
      },
    ],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groups
    .flatMap((group) => group.items)
    .map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageHeader
        eyebrow="Common questions"
        title="The practical details."
        titleAccent="practical details"
        intro="Open the group that matches what you are deciding. If your situation is different, send it to me in plain language."
        count={`${String(groups.flatMap((group) => group.items).length).padStart(2, '0')} questions`}
      />
      {groups.map((group, index) => (
        <SectionShell
          key={group.label}
          index={`0${index + 1}`}
          label={group.label}
          variant={index % 2 === 0 ? 'cream' : 'ink'}
        >
          <div className="grid gap-10 lg:grid-cols-12">
            <h2
              className={`font-display text-display-md lg:col-span-4 ${index % 2 === 0 ? 'text-primary-900' : 'text-cream-300'}`}
            >
              {group.label}
            </h2>
            <div className="lg:col-span-7 lg:col-start-6">
              <FaqAccordion items={group.items} variant={index % 2 === 0 ? 'cream' : 'ink'} />
            </div>
          </div>
        </SectionShell>
      ))}
      <div className="bg-cream-300 px-5 py-14 text-center md:px-11">
        <h2 className="font-display text-display-md text-primary-900">Still have a question?</h2>
        <a
          href="mailto:ben@sproutflow-studio.com"
          className="mt-5 inline-flex border-b border-primary-700 pb-1 font-semibold text-primary-800"
        >
          Email Ben directly
        </a>
        <span className="mx-3 text-text-muted">or</span>
        <Link href="/inquiry" className="font-semibold text-primary-800">
          start an inquiry
        </Link>
      </div>
      <FooterCta />
      <Footer />
    </>
  );
}
