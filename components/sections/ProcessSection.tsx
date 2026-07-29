import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const steps = [
  { number: '01', name: 'Plan', detail: 'We define the buyer, goal, scope, and fixed quote.' },
  { number: '02', name: 'Write & design', detail: 'Copy, page structure, and visual direction come before code.' },
  { number: '03', name: 'Build & test', detail: 'We build with real content and review it across devices.' },
  { number: '04', name: 'Launch & support', detail: 'We launch, train you, transfer ownership, and stay available.' },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-primary-700">What happens next</p>
            <h2 className="mt-4 max-w-[9ch] text-5xl text-primary-900 md:text-7xl">No mystery between call and launch.</h2>
          </div>

          <div className="relative border-t border-primary-900/20">
            <div className="absolute bottom-0 left-[1.2rem] top-0 w-px bg-primary-900/15 sm:left-[2rem]" aria-hidden="true" />
            {steps.map((step, index) => (
              <div key={step.number} className="relative grid grid-cols-[2.5rem_1fr] gap-4 border-b border-primary-900/20 py-6 sm:grid-cols-[4rem_0.7fr_1.3fr] sm:items-start sm:gap-6">
                <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-body text-xs font-bold text-white sm:h-16 sm:w-16 ${
                  index === steps.length - 1 ? 'bg-accent-600' : 'bg-primary-900'
                }`}>
                  {step.number}
                </span>
                <h3 className="font-body text-xl font-bold tracking-normal text-primary-900">{step.name}</h3>
                <p className="col-start-2 text-sm leading-relaxed text-text-secondary sm:col-start-auto">{step.detail}</p>
              </div>
            ))}
            <div className="pt-7">
              <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
                You will always know what is happening, what Ben needs from you, and what comes next.
              </p>
              <Link href="/how-we-work" className="mt-5 inline-flex items-center gap-2 font-bold text-primary-800 underline underline-offset-4">
                See the full process
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
