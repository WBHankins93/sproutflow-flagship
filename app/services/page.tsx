import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import Pill from '@/components/ui/Pill';
import Marquee from '@/components/ui/Marquee';
import FooterCta from '@/components/ui/FooterCta';
import ServicePathVisual from '@/components/services/ServicePathVisual';
import CustomerPathSection from '@/components/sections/CustomerPathSection';
import { Footer } from '@/components/layout/Footer';
import { servicePaths } from '@/data/servicePaths';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Three ways to work together: websites, business systems, ongoing growth and support. No packages or tiers. Scope written after we talk.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Three ways to make the business easier to choose and easier to run."
        intro="No packages or tiers. We start with the closest problem, then I write the scope after we talk."
        count="03 paths"
      />
      {servicePaths.map((path, index) => (
        <div key={path.id}>
          <SectionShell index={`0${index + 1}`} label={path.eyebrow} variant={index % 2 === 0 ? 'cream' : 'ink'}>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:col-start-7' : ''}`}>
                <p className={`text-eyebrow uppercase ${index % 2 === 0 ? 'text-accent-700' : 'text-accent-300'}`}>
                  {path.outcome}
                </p>
                <h2
                  className={`mt-5 font-display text-display-lg ${index % 2 === 0 ? 'text-primary-900' : 'text-cream-300'}`}
                >
                  {path.title}
                </h2>
                <p className={`mt-6 text-body-lg ${index % 2 === 0 ? 'text-text-secondary' : 'text-white/[0.68]'}`}>
                  {path.goodFit}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {path.capabilities.map((capability) => (
                    <Pill key={capability} variant={index % 2 === 0 ? 'cream' : 'ink'}>
                      {capability}
                    </Pill>
                  ))}
                </div>
                <Link
                  href={`/services/${path.id}`}
                  className={`group mt-8 inline-flex items-center gap-2 border-b pb-1 font-semibold ${index % 2 === 0 ? 'border-primary-700 text-primary-800' : 'border-accent-400 text-white'}`}
                >
                  Explore this path{' '}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'} lg:col-span-5`}>
                <ServicePathVisual path={path.id} />
              </div>
            </div>
          </SectionShell>
          {index < servicePaths.length - 1 && (
            <Marquee
              variant="promises"
              speed={48}
              items={['Written scope before work', 'Direct founder access', 'Your accounts stay yours']}
            />
          )}
        </div>
      ))}
      <CustomerPathSection />
      <FooterCta />
      <Footer />
    </>
  );
}
