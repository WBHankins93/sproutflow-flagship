// app/inquiry/page.tsx - Project intake and contact page

import { Container, Section } from '@/components/layout/StudioLayout';
import { Footer } from '@/components/layout/Footer';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { getImageUrl } from '@/lib/blob-images';

export const metadata = {
  title: 'Web Design Consultation | Start Your Project | Sproutflow Studio',
  description:
    'Request a web design consultation for your business. Share your goals in 3–5 minutes, and we’ll follow up within 24 hours with clear next steps.',
  alternates: {
    canonical: '/inquiry',
  },
};

export default function InquiryPage() {
  return (
    <>
      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="absolute inset-0 -z-10">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getImageUrl('project-tree.jpg')})`,
            }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)] opacity-40" />
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-24 md:px-8 md:py-28">
          <div className="inline-flex items-center gap-2 text-primary-700">
            <span className="h-px w-12 bg-primary-500/60" />
            <span className="text-sm font-semibold uppercase tracking-[0.24em]">
              Get Started
            </span>
            <span className="h-px w-12 bg-primary-500/60" />
          </div>
          <div className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
            <div className="space-y-6">
              <h1 className="text-4xl font-display font-bold text-gray-900 md:text-6xl">
                Start Your Project
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                Tell us a little about your project. Most inquiries take about 3–5 minutes to complete.
              </p>
              <p className="text-base text-gray-600">
                Not ready for a call yet? No problem. Share a few details here and we’ll follow up with the best next steps.
              </p>
            </div>
            <div className="rounded-3xl border border-primary-200/60 bg-white/70 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary-700">
                What to Expect
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>• Takes about 3–5 minutes to complete</li>
                <li>• We respond within 24 hours</li>
                <li>• No commitment—just the next steps</li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <Section padding="lg" background="white" className="pb-8 md:pb-12">
        <Container size="narrow" className="px-4 sm:px-6 md:px-8">
          <InquiryForm />
        </Container>
      </Section>

      <Footer />
    </>
  );
}
