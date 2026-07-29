import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { InquiryForm } from '@/components/inquiry/InquiryForm';

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Tell Sproutflow Studio what you want to improve. Ben reviews every inquiry and replies within one business day.',
  alternates: { canonical: '/inquiry' },
};

const nextSteps = [
  'Ben reviews the business, goal, and current setup.',
  'You get a recommendation for the clearest next step.',
  'Any Core or Custom project begins with a written scope and fixed quote.',
];

export default function InquiryPage() {
  return (
    <>
      <section className="paper-grain border-b border-primary-900/15 bg-[#f7f4ec]">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-primary-700">Start a project</p>
            <h1 className="mt-6 max-w-[11ch] text-6xl leading-[0.92] text-primary-900 md:text-8xl">
              Tell Ben what is not working.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-text-secondary">
              You do not need a finished brief or the right technical language. Start with the business and the result you want.
            </p>
          </div>
          <div className="border-t border-primary-900/20">
            {nextSteps.map((step) => (
              <div key={step} className="flex gap-3 border-b border-primary-900/20 py-5 text-sm leading-relaxed text-text-secondary">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e5ebe2] py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <InquiryForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
