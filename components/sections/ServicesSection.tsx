import Link from 'next/link';
import SectionShell from '@/components/ui/SectionShell';
import ServicesAccordion from '@/components/services/ServicesAccordion';

export default function ServicesSection() {
  return (
    <SectionShell id="services" index="02" label="ways to work together" variant="ink" labelledBy="services-heading">
      <div className="mb-12 grid gap-7 lg:grid-cols-12 lg:items-end">
        <h2 id="services-heading" className="font-display text-display-lg text-cream-300 lg:col-span-8">
          Start with the part that is{' '}
          <span className="font-accent font-normal italic text-accent-300">slowing you down.</span>
        </h2>
        <div className="lg:col-span-4">
          <p className="text-body-lg text-white/[0.68]">
            You do not need to diagnose the whole system. Pick the closest path and tell me what is happening now.
          </p>
          <Link href="/services" className="mt-5 inline-flex border-b border-accent-400 pb-1 font-semibold text-white">
            See all services
          </Link>
        </div>
      </div>
      <ServicesAccordion />
    </SectionShell>
  );
}
