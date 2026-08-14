import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { getResource, resources } from '@/data/resources';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  return resource
    ? {
        title: resource.title,
        description: resource.summary,
        robots: resource.draft ? { index: false, follow: true } : undefined,
      }
    : {};
}

export default async function ResourcePage({ params }: Props) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();
  return (
    <>
      <PageHeader
        eyebrow={`${resource.type} · ${resource.track}`}
        title={resource.title}
        intro={resource.summary}
        count={resource.readTime}
      />
      <SectionShell index="01" label="article skeleton" variant="cream">
        <div className="mx-auto max-w-[680px]">
          <div className="border border-dashed border-primary-900/25 bg-white p-6">
            <p className="text-eyebrow uppercase text-accent-700">Draft skeleton</p>
            <p className="mt-3 text-text-secondary">
              This route is intentionally noindex until you replace the outline with approved article copy.
            </p>
          </div>
          <div className="mt-12 space-y-14">
            {resource.sections.map((section, index) => (
              <section key={section}>
                <p className="font-mono text-mono-meta text-accent-700">0{index + 1}</p>
                <h2 className="mt-4 font-display text-display-md text-primary-900">{section}</h2>
                <div className="mt-5 space-y-3" aria-hidden="true">
                  <span className="block h-3 w-full rounded-full bg-primary-900/10" />
                  <span className="block h-3 w-[92%] rounded-full bg-primary-900/10" />
                  <span className="block h-3 w-[75%] rounded-full bg-primary-900/10" />
                </div>
              </section>
            ))}
          </div>
        </div>
      </SectionShell>
      <FooterCta />
      <Footer />
    </>
  );
}
