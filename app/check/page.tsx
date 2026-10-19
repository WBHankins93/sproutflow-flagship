import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { WebsiteCheck } from '@/components/website-check/WebsiteCheck';

export const metadata: Metadata = {
  title: 'Free website check',
  description:
    'Enter your website address. I check six things a customer runs into first, and show you the results right here. No sign-up.',
  alternates: { canonical: '/check' },
};

export default function CheckPage() {
  return (
    <>
      <section className="bg-cream-300 py-14 md:py-20">
        <div className="mx-auto max-w-[1186px] px-5 md:px-11">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase text-accent-700">Free website check</p>
            <h1 className="mt-5 font-display text-display-lg text-primary-900">
              Is your website doing its job? Check it in 10 seconds.
            </h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              Enter your website address. I check six things a customer runs into first, and show you the results
              right here. No sign-up.
            </p>
          </div>
          <div className="mt-10 md:mt-12">
            <WebsiteCheck />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
