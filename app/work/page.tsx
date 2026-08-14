import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import FooterCta from '@/components/ui/FooterCta';
import WorkIndex from '@/components/work/WorkIndex';
import { Footer } from '@/components/layout/Footer';
import { listedProjectProof } from '@/data/projectProof';

export const metadata: Metadata = {
  title: 'Client Work',
  description:
    'Websites and business systems built for service businesses, professional practices, and independent brands in New Orleans and nationwide.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client work"
        title="The work, and what changed after."
        titleAccent="what changed after"
        intro="Each project page puts the business situation, the decisions, and the finished work in one place. Results appear only where they can be attributed."
        count={`${String(listedProjectProof.length).padStart(2, '0')} projects`}
      />
      <SectionShell variant="cream" ariaLabel="Sproutflow client work">
        <WorkIndex />
        <div className="mt-12 grid gap-8 border-y border-primary-900/20 py-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="text-eyebrow uppercase text-accent-700">Not sure which project is closest?</p>
            <h2 className="mt-4 font-display text-display-md text-primary-900">Show me what customers see now.</h2>
          </div>
          <div className="lg:col-span-4">
            <Link
              href="/inquiry"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-primary-800 px-6 py-3 font-semibold text-white hover:bg-primary-700"
            >
              Tell me about your project{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </SectionShell>
      <FooterCta />
      <Footer />
    </>
  );
}
