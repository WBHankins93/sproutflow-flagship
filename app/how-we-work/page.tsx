// app/how-we-work/page.tsx - How We Work With Clients

import Link from 'next/link';
import { Sprout, Leaf, Flower, Sun, Infinity, CheckCircle2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { getImageUrl } from '@/lib/blob-images';

export const metadata = {
  title: 'How We Work | Sproutflow Studio',
  description:
    'Our transparent, enterprise-grade process designed for small businesses. From discovery to launch and beyond.',
};

const processSteps = [
  {
    number: 1,
    title: 'Discovery Call',
    duration: '30-45 minutes',
    icon: <Sprout className="w-6 h-6" />,
    description: 'We start by understanding your business, not your website. What problems are you trying to solve? Who are your customers? What does success look like?',
    highlight: "This isn't a sales call—it's a consulting session where we figure out if we're the right fit.",
    deliverables: [
      'Deep understanding of your business goals',
      'Clear identification of target audience',
      'Alignment on project scope and expectations',
    ],
    color: {
      bg: 'bg-green-50',
      icon: 'text-green-500',
      border: 'border-green-200',
      accent: 'bg-green-500',
      text: 'text-green-700',
    },
  },
  {
    number: 2,
    title: 'Proposal & Planning',
    duration: '2-3 days',
    icon: <Leaf className="w-6 h-6" />,
    description: 'After our discovery call, we provide a detailed proposal that includes everything you need to make an informed decision.',
    highlight: "You'll know exactly what you're getting before we start.",
    deliverables: [
      'Project scope & deliverables',
      'Timeline & milestones',
      'Transparent pricing (no hidden fees)',
      'Technical approach & platform recommendations',
    ],
    color: {
      bg: 'bg-green-100',
      icon: 'text-green-600',
      border: 'border-green-300',
      accent: 'bg-green-600',
      text: 'text-green-700',
    },
  },
  {
    number: 3,
    title: 'Build & Collaboration',
    duration: '2-4 weeks, depending on scope',
    icon: <Flower className="w-6 h-6" />,
    description: "We don't disappear after you sign. You'll get regular updates and opportunities to provide feedback throughout the project.",
    highlight: 'No surprises. No missed expectations.',
    deliverables: [
      '2-3 progress check-ins during the project',
      'A staging environment where you can preview the work',
      'Opportunities to provide feedback before final delivery',
    ],
    color: {
      bg: 'bg-green-100',
      icon: 'text-green-700',
      border: 'border-green-400',
      accent: 'bg-green-700',
      text: 'text-green-800',
    },
  },
  {
    number: 4,
    title: 'White-Glove Handoff & Training',
    duration: '1-2 days',
    icon: <Sun className="w-6 h-6" />,
    description: "We don't just hand you a website and wish you luck. We provide comprehensive training and documentation.",
    highlight: 'You leave confident and ready to manage your site.',
    deliverables: [
      'Training on how to update content yourself',
      'Documentation for common tasks',
      'Post-launch support to ensure everything runs smoothly',
    ],
    color: {
      bg: 'bg-amber-50',
      icon: 'text-amber-500',
      border: 'border-amber-300',
      accent: 'bg-amber-500',
      text: 'text-amber-700',
    },
  },
  {
    number: 5,
    title: 'Ongoing Support',
    duration: 'Optional',
    icon: <Infinity className="w-6 h-6" />,
    description: 'Many clients opt for monthly maintenance packages where we handle updates, monitoring, and enhancements.',
    highlight: 'Your business grows, and your website grows with it.',
    deliverables: [
      'Content updates',
      'Performance monitoring',
      'Security updates',
      'Feature enhancements as your business grows',
    ],
    color: {
      bg: 'bg-amber-100',
      icon: 'text-amber-600',
      border: 'border-amber-400',
      accent: 'bg-amber-600',
      text: 'text-amber-800',
    },
  },
];

const results = [
  {
    metric: '5 clients',
    description: 'delivered 100% on-time, on-budget',
  },
  {
    metric: '50%',
    description: 'lead generation increase (psychiatry practice)',
  },
  {
    metric: 'Zero-to-traction',
    description: 'launch (event decor startup)',
  },
  {
    metric: '30%',
    description: 'customer acquisition growth (pool maintenance service)',
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="absolute inset-0 -z-10">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getImageUrl('tree-sprouts.jpg')})`,
            }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)] opacity-40" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:px-8 md:py-28">
          <div className="inline-flex items-center gap-2 text-primary-700">
            <span className="h-px w-12 bg-primary-500/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              Our Process
            </span>
            <span className="h-px w-12 bg-primary-500/60" />
          </div>
          <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
            <div className="space-y-6">
              <h1 className="text-4xl font-display font-bold text-gray-900 md:text-6xl">
                How We Work With Clients
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                At Sproutflow Studio, we don&apos;t just build websites—we build solutions. Our process mirrors enterprise consulting methodologies, scaled for small businesses who deserve the same level of professionalism and care.
              </p>
            </div>
            <div className="rounded-3xl border border-primary-200/60 bg-white/70 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
                Our Promise
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>• Enterprise strategy, small business pricing</li>
                <li>• Total transparency at every stage</li>
                <li>• You&apos;re involved every step of the way</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 md:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50/40 via-white to-white" />

        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative"
              >
                <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${step.color.accent} text-white text-xl font-bold shadow-md`}>
                      {step.number}
                    </div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${step.color.bg} ${step.color.icon}`}>
                      {step.icon}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className={`hidden h-full w-0.5 ${step.color.border} md:block`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-12 md:pb-16">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <h2 className={`text-3xl font-display font-bold ${step.color.text} md:text-4xl`}>
                        {step.title}
                      </h2>
                      <span className={`rounded-full ${step.color.bg} ${step.color.border} border px-4 py-1 text-sm font-semibold ${step.color.text}`}>
                        {step.duration}
                      </span>
                    </div>
                    <p className="mb-4 text-lg leading-relaxed text-gray-700">
                      {step.description}
                    </p>
                    <p className={`mb-6 text-base font-medium italic ${step.color.text}`}>
                      {step.highlight}
                    </p>
                    <div className={`rounded-2xl border ${step.color.border} ${step.color.bg} p-6`}>
                      <p className={`mb-4 text-sm font-semibold uppercase tracking-wider ${step.color.text}`}>
                        What You&apos;ll Get
                      </p>
                      <ul className="space-y-3">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 ${step.color.icon}`} />
                            <span className="text-gray-700">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative border-y border-nature-200 bg-gradient-to-br from-primary-50/60 to-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 md:text-4xl mb-4">
              Results So Far
            </h2>
            <p className="text-lg text-gray-600">
              Real outcomes from real businesses we&apos;ve worked with
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="rounded-2xl border border-primary-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="text-3xl font-display font-bold text-primary-600 mb-2">
                  {result.metric}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-primary-200 bg-primary-50/60 px-6 py-12 text-center md:px-12">
            <h3 className="text-3xl font-display font-semibold text-gray-900 md:text-4xl">
              Ready to Work Together?
            </h3>
            <p className="text-base text-gray-600 md:text-lg">
              Schedule a discovery call and let&apos;s see if we&apos;re the right fit for your project.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary-700"
            >
              Schedule a Discovery Call
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Or learn more about{' '}
              <Link href="/#process" className="text-primary-600 hover:text-primary-700 underline">
                How We Grow Together
              </Link>
              {' '}— our visual process overview
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

