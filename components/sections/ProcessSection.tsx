import SectionShell from '@/components/ui/SectionShell';

const steps = [
  ['Figure out the right job', 'We talk through the customer, the bottleneck, and what a useful result would change.'],
  ['Agree before building', 'You see the message, direction, scope, and fixed quote before the project moves forward.'],
  [
    'Review working pieces',
    'I build in clear rounds. You review the actual experience instead of guessing from a long document.',
  ],
  [
    'Launch with ownership',
    'I test the work, document what matters, and make sure the accounts and finished product belong to you.',
  ],
];

export default function ProcessSection() {
  return (
    <SectionShell
      id="process"
      index="04"
      label="from first call to launch"
      variant="cream"
      labelledBy="process-heading"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="process-heading" className="font-display text-display-lg text-primary-900">
            Four checkpoints. You see the work as it{' '}
            <span className="font-accent font-normal italic text-accent-700">takes shape.</span>
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-text-secondary">
            The process is small on purpose. Each checkpoint answers a decision before the next one begins.
          </p>
        </div>
        <ol className="relative lg:col-span-7">
          <span
            className="absolute bottom-8 left-8 top-8 w-px border-l border-dashed border-primary-900/30 md:bottom-auto md:left-8 md:right-8 md:top-8 md:h-px md:w-auto md:border-l-0 md:border-t"
            aria-hidden="true"
          />
          <div className="grid gap-7 md:grid-cols-4">
            {steps.map(([title, body], index) => (
              <li key={title} className="relative grid grid-cols-[64px_1fr] gap-4 md:block">
                <span
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border font-mono text-mono-meta ${index === 1 ? 'border-accent-500 bg-accent-500 text-ink-900' : 'border-primary-900/25 bg-cream-300 text-primary-900'}`}
                >
                  0{index + 1}
                </span>
                <div className="md:mt-6">
                  <h3 className="font-display text-xl text-primary-900">{title}</h3>
                  <p className="mt-3 text-body-sm text-text-secondary">{body}</p>
                </div>
              </li>
            ))}
          </div>
        </ol>
      </div>
    </SectionShell>
  );
}
