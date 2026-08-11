import Link from 'next/link';
import { ArrowRight, Clock3, FolderOpen, HelpCircle, LayoutTemplate, LifeBuoy, MapPin, Plus, Workflow, Zap } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/StudioLayout';

export const metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers about Sproutflow Studio project scope, timelines, custom websites, business systems, ownership, maintenance, and working remotely.',
  alternates: { canonical: '/faq' },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

const faqs = [
  {
    icon: HelpCircle,
    question: 'How do you decide what a project should include?',
    answer:
      'I start with the result you need and the way the work happens today. After reviewing both, I recommend a right-sized scope and send a fixed quote. You can share a comfortable budget in the inquiry form so I do not suggest work that is out of reach.',
  },
  {
    icon: Clock3,
    question: 'How long does a custom website take to build?',
    answer:
      'A focused site can launch in a few weeks. Larger websites and projects with connected business systems take longer. Content decisions and feedback usually affect the schedule most, so the written scope names what I need from you and when.',
  },
  {
    icon: LayoutTemplate,
    question: 'When is a custom site better than a Squarespace or Wix template?',
    answer:
      'A template works well when the message and customer path fit a standard layout. A custom build makes more sense when positioning, integrations, or the way customers buy from you needs a different structure. I will recommend the simpler option when it can do the job well.',
  },
  {
    icon: Workflow,
    question: 'I already have a website. What else can you build?',
    answer:
      'Sproutflow builds the work behind the site: intake and booking flows, customer records, internal dashboards, content tools, reporting, and follow-up systems. The useful starting point is often the task your team repeats or the handoff where details keep going missing.',
  },
  {
    icon: Zap,
    question: 'Can you automate missed calls or customer follow-up?',
    answer:
      'Yes. I can connect forms, missed-call responses, scheduling, documents, and follow-up messages. First we map the current steps and decide where automation helps. Some decisions should stay with a person.',
  },
  {
    icon: MapPin,
    question: 'Do you work with businesses outside New Orleans?',
    answer:
      'Yes. Sproutflow is based in New Orleans and works with businesses nationwide. Calls, reviews, and approvals can all happen remotely.',
  },
  {
    icon: FolderOpen,
    question: 'What do I need to have ready before we start?',
    answer:
      'Bring the business goal and anything customers see now. A website link, form, notes, logo, photographs, or old copy can help, but none of them are required for the first conversation. I help shape the content and structure during the project.',
  },
  {
    icon: LifeBuoy,
    question: 'Do you handle hosting and maintenance after launch?',
    answer:
      'Yes. Ongoing support can include hosting, updates, monitoring, content changes, and measured improvements. It stays optional, and you keep ownership of the domain, site, and connected accounts either way.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="bg-background-primary py-16 md:py-24">
        <Container>
          <div className="grid gap-8 border-t border-primary-900 pt-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Questions before a project</p>
              <h1 className="font-display text-5xl font-semibold leading-[0.95] text-primary-950 sm:text-6xl lg:text-7xl">The practical details.</h1>
            </div>
            <p className="text-lg leading-relaxed text-text-secondary lg:col-span-4 lg:col-start-9">
              Open the question that matches what you are deciding. If your situation is different, send it to me in plain language.
            </p>
          </div>
        </Container>
      </header>

      <section className="bg-white pb-20 md:pb-28">
        <Container size="narrow">
          <div className="border-b border-primary-900/20">
            {faqs.map((faq) => {
              const Icon = faq.icon;
              return (
                <details key={faq.question} className="group border-t border-primary-900/20">
                  <summary className="grid min-h-20 cursor-pointer list-none grid-cols-[2.75rem_1fr_2.75rem] items-center gap-3 py-5 marker:content-none">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-100 text-primary-800">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h2 className="font-display text-xl font-semibold text-primary-900 sm:text-2xl">{faq.question}</h2>
                    <span className="flex h-11 w-11 items-center justify-center rounded-md border border-primary-900/15 text-primary-800">
                      <Plus className="h-5 w-5 transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="pb-7 pl-[3.5rem] pr-4 leading-relaxed text-text-secondary sm:text-lg">{faq.answer}</p>
                </details>
              );
            })}
          </div>

          <div className="mt-14 grid gap-7 border-y border-primary-900/20 py-9 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-primary-900">Still deciding?</h2>
              <p className="mt-3 text-text-secondary">Send the question with a little context. I will point you toward a useful next step.</p>
            </div>
            <Link href="/inquiry" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary-800 px-7 py-3.5 font-semibold text-white hover:bg-primary-700">
              Ask your question
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
