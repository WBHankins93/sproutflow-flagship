// components/StructuredData.tsx - Sitewide JSON-LD structured data
//
// Organization + ProfessionalService schema rendered in the root layout.
// FAQPage schema lives on /faq (where the content is visible).
// BreadcrumbList schema lives in components/case-studies/CaseStudyLayout.tsx.
//
// The OfferCatalog is built from data/catalog.ts, one Offer per catalog entry.
// Prices appear only where the catalog has them: a fixed one-time price as
// `price`, "from" prices as `minPrice`, monthly prices as a
// UnitPriceSpecification. An offer quoted after a call has no price at all.

import { catalog, getCategory, type CatalogOffer, type CatalogPrice } from '@/data/catalog';
import { FOUNDER_PHOTO_URL, ORGANIZATION_LOGO_URL, SITE_URL } from '@/lib/site';

const siteUrl = SITE_URL;

function priceSpecification(price: CatalogPrice) {
  const amount = price.basis === 'from' ? { minPrice: price.amount } : { price: price.amount };
  return {
    '@type': price.per === 'month' ? 'UnitPriceSpecification' : 'PriceSpecification',
    ...amount,
    priceCurrency: 'USD',
    ...(price.per === 'month' ? { unitCode: 'MON', unitText: 'month' } : {}),
    ...(price.appliesTo ? { description: `For ${price.appliesTo}` } : {}),
  };
}

/** One schema.org Offer for a catalog entry. Exported for tests. */
export function catalogOfferSchema(offer: CatalogOffer) {
  const [only] = offer.prices;
  const isSingleFixed = offer.prices.length === 1 && only.basis === 'fixed' && !only.per;
  const pricing =
    offer.prices.length === 0
      ? {}
      : isSingleFixed
        ? { price: String(only.amount), priceCurrency: 'USD' }
        : {
            priceCurrency: 'USD',
            priceSpecification:
              offer.prices.length === 1 ? priceSpecification(only) : offer.prices.map(priceSpecification),
          };

  return {
    '@type': 'Offer',
    ...pricing,
    itemOffered: {
      '@type': 'Service',
      name: offer.name,
      description: offer.summary,
      category: getCategory(offer.category).name,
      url: `${siteUrl}/#${offer.id}`,
      provider: { '@id': `${siteUrl}#organization` },
    },
  };
}

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Organization'],
  '@id': `${siteUrl}#organization`,
  name: 'Sproutflow Studio',
  alternateName: 'Sproutflow',
  url: siteUrl,
  // Images live on Vercel Blob; public/images is gitignored, so the site host
  // 404s for them.
  logo: ORGANIZATION_LOGO_URL,
  image: ORGANIZATION_LOGO_URL,
  description:
    'Sproutflow Studio is a one-person studio that builds websites, lead and business systems, and ongoing care for small businesses anywhere. Based in New Orleans, Louisiana.',
  slogan: 'Find the leaks. Fix the site. Book the work.',
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
  sameAs: ['https://linkedin.com/company/sproutflow-studio'],
  // Serve anyone, anywhere (DIRECTION.md §8): the home city stays for local
  // search, without a neighborhood list.
  areaServed: [
    {
      '@type': 'City',
      name: 'New Orleans',
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
    name: 'Websites, Lead & Business Systems, and Care',
    itemListElement: catalog.map(catalogOfferSchema),
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
    'Ben Hankins runs Sproutflow Studio in New Orleans, Louisiana. He spent seven years building and running software inside large companies, including IBM, and now builds websites, lead systems and ongoing care for small businesses anywhere.',
  url: `${siteUrl}/about`,
  image: FOUNDER_PHOTO_URL,
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
  sameAs: ['https://www.benhankins.dev/', 'https://linkedin.com/company/sproutflow-studio'],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}#website`,
  url: siteUrl,
  name: 'Sproutflow Studio',
  description: 'Websites, lead and business systems, and ongoing care for small businesses anywhere, from a one-person studio in New Orleans.',
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
