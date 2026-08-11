import { FileCheck2, MessageSquareText, Rocket, Wrench } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const processSteps = [
  {
    icon: MessageSquareText,
    stage: 'Figure out the right job',
    description: 'We talk through the customer, the bottleneck, and what a useful result would change.',
  },
  {
    icon: FileCheck2,
    stage: 'Agree before building',
    description: 'You see the message, direction, scope, and fixed quote before the project moves forward.',
  },
  {
    icon: Wrench,
    stage: 'Review working pieces',
    description: 'I build in clear rounds. You review the actual experience instead of guessing from a long document.',
  },
  {
    icon: Rocket,
    stage: 'Launch with ownership',
    description: 'I test the work, document what matters, and make sure the accounts and finished product belong to you.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-heading" className="bg-background-secondary py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">From first call to launch</p>
            <h2 id="process-heading" className="font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl">
              Four checkpoints. You see the work as it takes shape.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
              The process is small on purpose. Each checkpoint answers a decision before the next one begins.
            </p>
            <div className="mt-8 border-l-2 border-accent-500 pl-4">
              <p className="font-semibold text-primary-900">Before you commit</p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                You receive a written scope, a fixed quote, and direct access to Ben. If the recommended project does not fit, you can stop there.
              </p>
            </div>
          </div>

          <ol className="grid gap-px overflow-hidden border border-primary-900/20 bg-primary-900/20 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.stage} className="bg-white p-6 sm:min-h-64 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-100 text-primary-800">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-lg font-semibold text-accent-700" aria-hidden="true">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold text-primary-900">{step.stage}</h3>
                  <p className="mt-3 leading-relaxed text-text-secondary">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
