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
    'Sproutflow Studio builds founder-led websites, internal tools, workflow automation, and multi-location platforms. Based in New Orleans, LA.',
  slogan: 'When the website works, make the business behind it work better.',
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
  priceRange: '$500 - $4,500+',
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
            'Websites for small businesses, from a productized three-page Launch site to fully custom design, copy, catalogs, and integrations.',
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
            'Internal tools, workflow automation, and multi-location platforms for intake, follow-up, scheduling, document processing, and operational visibility.',
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
