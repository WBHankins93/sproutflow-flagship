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
    'Most small business websites in New Orleans cost $850 to $7,500+. Answers on pricing, timelines, custom vs. template sites, business automation, CRMs, and what to have ready before you start.',
  alternates: {
    canonical: '/faq',
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

const faqs: { question: string; answer: string }[] = [
  {
    question: 'How much does a small business website cost in New Orleans?',
    answer:
      'Most of our projects run between $850 and $7,500+. A template-based starter site sits at the low end, and a fully custom site with professional copywriting lands in the middle. What moves a project into the upper range is custom systems work: CRMs, internal admin tools, and automation built around your operations. Every project gets a fixed quote before work starts.',
  },
  {
    question: 'How long does a custom website take to build?',
    answer:
      'Most custom websites take 2 to 6 weeks from kickoff to launch. A starter site can be live in 1 to 2 weeks, while larger platform builds with custom systems run 8 to 12 weeks. The biggest variable is usually content decisions, and we guide those so the timeline holds.',
  },
  {
    question: "What's the difference between a custom site and a Squarespace or Wix template?",
    answer:
      'A template gives you a layout. A custom site gives you strategy, speed, and room to grow. We build with modern frameworks, which means faster load times, stronger SEO, and no platform lock-in. When you need more than a website later, like booking flows, dashboards, or automation, a custom build can grow into it.',
  },
  {
    question: 'I already have a website. What else can you build for my business?',
    answer:
      'We build the systems behind your website: internal admin tools and dashboards, custom CRM and customer management systems, lightweight CMS setups so you can update your own content, and workflow automation for intake, follow-up, and scheduling. Your website gets clients in the door. These systems keep them and save you hours every week.',
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
      'Yes. Website care plans start at $200 per month and cover managed hosting, security updates, performance monitoring, and content changes. You own everything either way: your domain, your site, and your accounts.',
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
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 md:text-xl max-w-3xl">
              Straight answers on pricing, timelines, custom systems, and how we work. If your question is not here, ask us directly on a discovery call.
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
            Bring your goals. Leave with a clear plan and a fixed quote.
          </p>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-3 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            Book a Discovery Call
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
