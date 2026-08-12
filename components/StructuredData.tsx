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
  slogan: 'Websites that win clients. Systems that make growth easier.',
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
  // Schema.org expects a relative indicator here, never a dollar figure.
  priceRange: '$$',
  founder: { '@id': `${siteUrl}#ben` },
  employee: { '@id': `${siteUrl}#ben` },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: 1,
  },
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
          name: 'Ongoing Website Growth and Support',
          description:
            'Optional website maintenance, hosting, SEO growth, performance reviews, content support, photography coordination, and marketing integrations.',
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

// Person node for Ben.
//
// Search and LLM retrieval systems resolve "who should I hire" queries to
// people at least as often as to companies, and most solo studios omit this
// entirely. The sameAs links tie the studio and the personal site into one
// entity, which strengthens both.
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}#ben`,
  name: 'Ben Hankins',
  givenName: 'Ben',
  familyName: 'Hankins',
  jobTitle: 'Founder and Software Engineer',
  description:
    'Ben Hankins runs Sproutflow Studio in New Orleans, Louisiana. He spent seven years building and running software inside large companies, including IBM, and now builds custom websites and business systems for owner-run businesses.',
  url: `${siteUrl}/about`,
  image: `${siteUrl}/images/ben-photo.png`,
  worksFor: { '@id': `${siteUrl}#organization` },
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Orleans',
      addressRegion: 'LA',
      addressCountry: 'US',
    },
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Mississippi State University',
  },
  knowsAbout: [
    'web design',
    'web development',
    'custom software development',
    'CRM systems',
    'business process automation',
    'internal tools and dashboards',
    'site reliability engineering',
    'cloud architecture',
  ],
  sameAs: [
    'https://www.benhankins.dev/',
    'https://linkedin.com/company/sproutflow-studio',
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  url: siteUrl,
  name: 'Sproutflow Studio',
  description:
    'Custom websites, CRMs, booking flows, and automation for small businesses in New Orleans, Louisiana.',
  publisher: { '@id': `${siteUrl}#organization` },
  inLanguage: 'en-US',
};

const schemas = [professionalServiceSchema, personSchema, webSiteSchema];

export default function StructuredData() {
  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema['@id']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
