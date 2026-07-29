// app/faq/page.tsx - Frequently Asked Questions
//
// FAQPage JSON-LD is generated from the same `faqs` array that renders on the
// page, so the schema always matches the visible content.

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'FAQ: Website Costs, Timelines & Custom Systems',
  description:
    'Sproutflow website pricing starts at $500 for Launch, $2,000 for Core, and $4,500 for Custom. Straight answers on timelines, systems, and support.',
  alternates: {
    canonical: '/faq',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

const faqs: { question: string; answer: string }[] = [
  {
    question: 'How much does a small business website cost in New Orleans?',
    answer:
      'Launch is $500 fixed plus a required $200 monthly Care plan for 12 months. Core websites start at $2,000. Custom websites start at $4,500 and have no preset ceiling. Every Core and Custom project gets a written scope and fixed quote before work starts.',
  },
  {
    question: 'How long does a custom website take to build?',
    answer:
      'Launch sites take 5 to 7 business days after client content is received. Most Core and Custom websites take 2 to 8 weeks, depending on content, approvals, and integrations. Business systems use a separate pilot-first plan.',
  },
  {
    question: "What's the difference between a custom site and a Squarespace or Wix template?",
    answer:
      'A template is usually the fastest, lowest-cost way to publish a standard site. A custom build is a better fit when your positioning, customer journey, integrations, or growth plans do not fit a standard layout. We recommend the simpler option when it can do the job well.',
  },
  {
    question: 'I already have a website. What else can you build for my business?',
    answer:
      'We build internal admin tools, operating dashboards, workflow automation, and multi-location platforms. The work is scoped around a specific operating problem, such as intake, follow-up, scheduling, or cross-location visibility.',
  },
  {
    question: 'Can you automate parts of my business, like missed calls or customer follow-up?',
    answer:
      'Yes. We build automation for missed-call response, customer follow-up, intake, scheduling, and document processing. If your team handles something by hand on a repeating schedule, there is a good chance we can automate it. We scope automation work the same way as websites: clear plan, fixed quote.',
  },
  {
    question: 'Do you work with businesses outside New Orleans?',
    answer:
      'Yes. We are based in New Orleans and serve the metro area and South Louisiana first, but we work remotely with businesses nationwide. Most projects run fully remote with scheduled video check-ins, so location is never a blocker.',
  },
  {
    question: 'What do I need to have ready before we start?',
    answer:
      'Just your goals. A clear idea of who your customers are helps, and a logo, photos, or existing copy are useful but not required. We guide content and structure as part of every project, so you are never stuck staring at a blank page.',
  },
  {
    question: 'Do you handle hosting and maintenance after launch?',
    answer:
      'Yes. Care is $200 per month for managed hosting, security updates, performance monitoring, and small content changes. Growth is $400 per month and adds Google Business Profile management, review support, and ongoing SEO/GEO work. You retain ownership of your domain, site, and accounts.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:px-8 md:py-28">
          <div className="inline-flex items-center gap-2 text-primary-700">
            <span className="h-px w-12 bg-primary-500/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              FAQ
            </span>
            <span className="h-px w-12 bg-primary-500/60" />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-display font-bold text-gray-900 md:text-6xl">
              Frequently asked questions
            </h1>
            <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
              Straight answers on pricing, timelines, ownership, and how we work. If your question is not here, send us a note.
            </p>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/40 via-white to-white" />

        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-gray-200 bg-white p-7 md:p-8 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-3">
                  {faq.question}
                </h2>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
          <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
            Still have questions?
          </h3>
          <p className="text-base text-gray-600 md:text-lg">
            Send the question with a little context. We&apos;ll point you in the right direction.
          </p>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            Ask your question
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
