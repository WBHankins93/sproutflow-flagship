import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/caseStudies';
import { listedProjectProof } from '@/data/projectProof';
import { servicePaths } from '@/data/servicePaths';
import { getPublishedResources } from '@/data/resources';
import { BOOKING_PATH, isBookingConfigured } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';

const siteUrl = SITE_URL;

/**
 * Every public, indexable route. Scaffolding (/v3-kit, /kitchen-sink), the
 * retired /case-studies index and noindex pages (the hidden case study) stay out.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyEntries: MetadataRoute.Sitemap = caseStudies
    .filter((caseStudy) => listedProjectProof.some((project) => project.id === caseStudy.slug))
    .map((cs) => ({
      url: `${siteUrl}/case-studies/${cs.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  const serviceEntries: MetadataRoute.Sitemap = servicePaths.map((service) => ({
    url: `${siteUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  // Drafts 404, so only published resources (and their index, once one
  // exists) belong here.
  const publishedResources = getPublishedResources();
  const resourceEntries: MetadataRoute.Sitemap = publishedResources.map((resource) => ({
    url: `${siteUrl}/resources/${resource.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  const resourceIndexEntries: MetadataRoute.Sitemap =
    publishedResources.length > 0
      ? [
          {
            url: `${siteUrl}/resources`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
          },
        ]
      : [];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...resourceIndexEntries,
    {
      url: `${siteUrl}/inquiry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Only list /book once Cal.com is configured; until then it redirects.
    ...(isBookingConfigured()
      ? [
          {
            url: `${siteUrl}${BOOKING_PATH}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          },
        ]
      : []),
    {
      url: `${siteUrl}/check`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/how-we-work`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/data-and-ownership`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    ...caseStudyEntries,
    ...serviceEntries,
    ...resourceEntries,
  ];
}
