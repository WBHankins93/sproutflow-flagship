import { MetadataRoute } from 'next';
import { caseStudies } from '@/data/caseStudies';
import { listedProjectProof } from '@/data/projectProof';
import { servicePaths } from '@/data/servicePaths';
import { resources } from '@/data/resources';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

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
  const resourceEntries: MetadataRoute.Sitemap = resources
    .filter((resource) => !resource.draft)
    .map((resource) => ({
      url: `${siteUrl}/resources/${resource.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

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
    {
      url: `${siteUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/inquiry`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
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
