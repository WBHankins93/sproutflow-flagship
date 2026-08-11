import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const processSteps = [
  {
    stage: 'Plan',
    detail: 'Business goal and scope',
    description: 'We identify the customer, the useful outcome, and the right-sized project before quoting the work.',
  },
  {
    stage: 'Write and design',
    detail: 'Message and direction',
    description: 'We shape real content and the customer path, then agree on the visual direction before development.',
  },
  {
    stage: 'Build and test',
    detail: 'Working previews',
    description: 'You review the actual experience as it is built. We test the details across devices and workflows.',
  },
  {
    stage: 'Launch and support',
    detail: 'Ownership and next steps',
    description: 'We launch, document the work, transfer ownership, and stay available if ongoing help is useful.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-white py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">How the work moves</p>
            <h2 id="process-heading" className="font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl">
              Clear decisions. No mystery handoffs.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              You always know what is happening, what we need from you, and what comes next.
            </p>
            <Link href="/how-we-work" className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-primary-700 pb-1 font-semibold text-primary-800 hover:text-primary-600">
              See the full process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ol className="border-t border-primary-900/20 lg:col-span-7 lg:col-start-6">
            {processSteps.map((step, index) => (
              <li key={step.stage} className="grid gap-4 border-b border-primary-900/20 py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-display text-2xl font-semibold text-accent-700" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="grid gap-2 md:grid-cols-[0.8fr_1.2fr] md:gap-8">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-primary-900">{step.stage}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary-700">{step.detail}</p>
                  </div>
                  <p className="leading-relaxed text-text-secondary">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
