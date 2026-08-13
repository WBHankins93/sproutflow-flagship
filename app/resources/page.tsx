import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import MediaPanel from '@/components/ui/MediaPanel';
import FooterCta from '@/components/ui/FooterCta';
import ResourceIndex from '@/components/resources/ResourceIndex';
import { Footer } from '@/components/layout/Footer';
import { resources } from '@/data/resources';

export const metadata: Metadata = {
  title: 'Guides & Notes',
  description:
    'Practical guides on websites, business systems, SEO, and owning your own site. Written for small business owners, not other agencies.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  const featured = resources.find((resource) => resource.featured);
  return (
    <>
      <PageHeader
        eyebrow="Guides and notes"
        title="Useful answers, written down."
        titleAccent="written down"
        intro="Longer guides for decisions that deserve context. Short notes for patterns I keep seeing in the work."
        count={`${String(resources.length).padStart(2, '0')} drafts`}
      />
      {featured && (
        <SectionShell index="01" label="featured guide" variant="ink">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-eyebrow uppercase text-accent-300">Draft skeleton</p>
              <h2 className="mt-5 font-display text-display-lg text-cream-300">{featured.title}</h2>
              <p className="mt-5 text-body-lg text-white/[0.68]">{featured.summary}</p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <MediaPanel placeholder="Featured guide media" variant="ink" />
            </div>
          </div>
        </SectionShell>
      )}
      <SectionShell index="02" label="the library" variant="cream">
        <ResourceIndex resources={resources} />
      </SectionShell>
      <FooterCta />
      <Footer />
    </>
  );
}
