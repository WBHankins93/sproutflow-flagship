import type { Metadata } from 'next';
import { Eyebrow, Heading, Section } from '@/components/v3';
import WorkIndex from '@/components/work/WorkIndex';
import ProjectCta from '@/components/case-studies/ProjectCta';
import { PROOF_LEGEND } from '@/components/case-studies/proof';
import { Footer } from '@/components/layout/Footer';
import { listedProjectProof } from '@/data/projectProof';

export const metadata: Metadata = {
  title: 'Client Work',
  description:
    'Websites and business systems built for service businesses, professional practices, and independent brands in New Orleans and nationwide.',
  alternates: { canonical: '/work' },
};

/** /work. Tones: clearing (header) · white (the grid) · fern (call to action) · Pine footer. */
export default function WorkPage() {
  const count = `${String(listedProjectProof.length).padStart(2, '0')} projects`;

  return (
    <>
      <Section tone="clearing" labelledBy="work-h">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <Eyebrow>Client work</Eyebrow>
            <Heading as="h1" id="work-h" italic="after" className="mt-5">
              The work, and what changed after.
            </Heading>
            <p className="mt-6 max-w-[60ch] font-body text-body-lg text-[#4A574D]">
              Each project page shows the business, what I built, and what changed. Every result carries a label.{' '}
              {PROOF_LEGEND}
            </p>
          </div>
          <p className="font-mono text-label uppercase tabular-nums text-[#4A574D] [font-variant-ligatures:none] lg:col-span-4 lg:text-right">
            {count}
          </p>
        </div>
      </Section>
      <Section tone="white" ariaLabel="Sproutflow client work">
        <WorkIndex />
      </Section>
      <ProjectCta
        id="work-cta-h"
        cta="work"
        heading="Not sure which project is closest to yours?"
        body="Book a 15-minute call and show me what your customers see now. I will tell you what I would fix first."
      />
      <Footer />
    </>
  );
}
