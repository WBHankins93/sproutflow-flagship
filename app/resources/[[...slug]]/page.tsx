import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import FooterCta from '@/components/ui/FooterCta';
import ResourceIndex from '@/components/resources/ResourceIndex';
import { Footer } from '@/components/layout/Footer';
import { getPublishedResource, getPublishedResources, type ResourceEntry } from '@/data/resources';

/**
 * /resources and /resources/<slug> in one optional catch-all.
 *
 * Drafts in data/resources.ts are not public. Only published entries (and the
 * index, once at least one exists) are returned from generateStaticParams, and
 * dynamicParams is false, so every other path is a router-level 404 with a real
 * 404 status. A page-level notFound() on a prerendered route would ship the
 * not-found UI with a 200.
 */

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string[] }> {
  const published = getPublishedResources();
  if (published.length === 0) return [];
  return [{ slug: [] }, ...published.map((resource) => ({ slug: [resource.slug] }))];
}

type ResolvedRoute = { kind: 'index'; published: ResourceEntry[] } | { kind: 'resource'; resource: ResourceEntry };

/** Resolves params to the index or one published resource; anything else 404s. */
async function resolveRoute(params: Props['params']): Promise<ResolvedRoute> {
  const { slug = [] } = await params;
  if (slug.length === 0) {
    const published = getPublishedResources();
    if (published.length === 0) notFound();
    return { kind: 'index', published };
  }
  const resource = slug.length === 1 ? getPublishedResource(slug[0]) : undefined;
  if (!resource) notFound();
  return { kind: 'resource', resource };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const route = await resolveRoute(params);
  if (route.kind === 'index') {
    return {
      title: 'Guides & Notes',
      description:
        'Practical guides on websites, business systems, SEO, and owning your own site. Written for small business owners, not other agencies.',
      alternates: { canonical: '/resources' },
    };
  }
  return {
    title: route.resource.title,
    description: route.resource.summary,
    alternates: { canonical: `/resources/${route.resource.slug}` },
  };
}

export default async function ResourcesRoute({ params }: Props) {
  const route = await resolveRoute(params);
  return (
    <>
      {route.kind === 'index' ? <ResourceIndexView published={route.published} /> : <ResourceView resource={route.resource} />}
      <FooterCta />
      <Footer />
    </>
  );
}

function ResourceIndexView({ published }: { published: ResourceEntry[] }) {
  const featured = published.find((resource) => resource.featured);
  return (
    <>
      <PageHeader
        eyebrow="Guides and notes"
        title="Useful answers, written down."
        titleAccent="written down"
        intro="Longer guides for decisions that deserve context. Short notes for patterns I keep seeing in the work."
        count={`${String(published.length).padStart(2, '0')} ${published.length === 1 ? 'entry' : 'entries'}`}
      />
      {featured && (
        <SectionShell index="01" label="featured guide" variant="ink">
          <div className="max-w-3xl">
            <p className="text-eyebrow uppercase text-accent-300">Featured {featured.type}</p>
            <h2 className="mt-5 font-display text-display-lg text-cream-300">{featured.title}</h2>
            <p className="mt-5 text-body-lg text-white/[0.68]">{featured.summary}</p>
          </div>
        </SectionShell>
      )}
      <SectionShell index="02" label="the library" variant="cream">
        <ResourceIndex resources={published} />
      </SectionShell>
    </>
  );
}

function ResourceView({ resource }: { resource: ResourceEntry }) {
  return (
    <>
      <PageHeader
        eyebrow={`${resource.type} · ${resource.track}`}
        title={resource.title}
        intro={resource.summary}
        count={resource.readTime}
      />
      <SectionShell index="01" label={resource.type} variant="cream">
        <div className="mx-auto max-w-[680px] space-y-14">
          {resource.sections.map((section, index) => (
            <section key={section}>
              <p className="font-mono text-mono-meta text-accent-700">{String(index + 1).padStart(2, '0')}</p>
              <h2 className="mt-4 font-display text-display-md text-primary-900">{section}</h2>
            </section>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
