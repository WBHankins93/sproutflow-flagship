import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import LaunchIntakeForm from '@/components/inquiry/LaunchIntakeForm';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Launch Website Intake',
  description: 'A focused three-page website for $500 fixed, paired with Sproutflow Care.',
  alternates: { canonical: '/launch' },
};

const scope = [
  'Up to three pages on a proven template foundation',
  'Google Business Profile setup',
  'Mobile, performance, contact form, and basic SEO setup',
  'Five to seven business day turnaround after content is received',
  'One revision round',
];

export default function LaunchPage() {
  return (
    <>
      <section className="paper-grain bg-[#f7f4ec] py-16 md:py-24">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-primary-700">Launch intake</p>
            <h1 className="mt-6 max-w-[10ch] text-6xl leading-[0.93] text-primary-900 md:text-8xl">A credible site. No long sales process.</h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-text-secondary">
              Launch is a fixed-scope product for a business that needs to be found and trusted online now.
            </p>
            <div className="mt-9 border-y border-primary-900/20 py-6">
              <p className="font-body text-3xl font-bold tabular-nums text-primary-900">$500 setup</p>
              <p className="mt-1 text-sm font-semibold text-primary-700">+ $200/month Care · 12-month minimum</p>
            </div>
            <ul className="mt-7 space-y-3">
              {scope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm leading-relaxed text-text-muted">
              Need custom copy, more pages, a catalog, or integrations? Start with Core or Custom instead.
            </p>
          </div>
          <LaunchIntakeForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
