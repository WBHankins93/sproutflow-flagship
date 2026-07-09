// components/StructuredData.tsx - Sitewide JSON-LD structured data
//
// Organization + ProfessionalService schema rendered in the root layout.
// FAQPage schema lives on /faq (where the content is visible).
// BreadcrumbList schema lives in components/case-studies/CaseStudyLayout.tsx.

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Organization'],
  '@id': `${siteUrl}#organization`,
  name: 'Sproutflow Studio',
  alternateName: 'Sproutflow',
  url: siteUrl,
  logo: `${siteUrl}/images/logo/main-logo-Photoroom.png`,
  image: `${siteUrl}/images/logo/main-logo-Photoroom.png`,
  description:
    'Sproutflow Studio builds custom websites and custom business software for small businesses. Web design and development, internal admin tools, CRM systems, CMS builds, and workflow automation. Based in New Orleans, LA.',
  slogan: 'Enterprise strategy. Small business pricing.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'New Orleans',
    addressRegion: 'LA',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '29.9511',
    longitude: '-90.0715',
  },
  telephone: '+1-504-326-1676',
  email: 'ben@sproutflow-studio.com',
  priceRange: '$850 - $7,500+',
  sameAs: [
    'https://linkedin.com/company/sproutflow-studio',
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'New Orleans',
    },
    {
      '@type': 'City',
      name: 'Metairie',
    },
    {
      '@type': 'Place',
      name: 'New Orleans metro area',
    },
    {
      '@type': 'Place',
      name: 'South Louisiana',
    },
    {
      '@type': 'Country',
      name: 'United States',
    },
  ],
  knowsAbout: [
    'web design',
    'web development',
    'custom software development',
    'CRM systems',
    'internal business tools',
    'admin dashboards',
    'workflow automation',
    'content management systems',
    'local SEO',
    'e-commerce design',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web Design and Business Software Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Website Design and Development',
          description:
            'Custom Next.js websites for small businesses: design, development, copywriting, local SEO, and conversion-focused lead capture. Projects range from starter sites to fully custom platforms.',
          provider: { '@id': `${siteUrl}#organization` },
          areaServed: 'New Orleans metro area, South Louisiana, and remote nationwide',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Business Software and Automation',
          description:
            'Custom business systems behind the website: internal admin tools and dashboards, custom CRM and customer management systems, lightweight CMS builds, and workflow automation for intake, follow-up, scheduling, and document processing.',
          provider: { '@id': `${siteUrl}#organization` },
          areaServed: 'New Orleans metro area, South Louisiana, and remote nationwide',
        },
      },
    ],
  },
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
    />
  );
}
