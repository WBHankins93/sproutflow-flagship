import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourceArticle, ResourceIndexView } from '@/components/resources/ResourceViews';
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
  return route.kind === 'index' ? (
    <ResourceIndexView published={route.published} />
  ) : (
    <ResourceArticle resource={route.resource} />
  );
}
