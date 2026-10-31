// components/StructuredData.tsx - Sitewide JSON-LD structured data
//
// Organization + ProfessionalService schema rendered in the root layout.
// FAQPage schema lives on /faq (where the content is visible).
// BreadcrumbList schema lives in components/case-studies/CaseStudyLayout.tsx.
//
// The OfferCatalog is built from data/catalog.ts: one Offer per fixed-price
// offer, then the custom quote. A one-time price is `price`; Site Care's two
// monthly prices are UnitPriceSpecifications. The custom quote has no price at
// all, and its range line stays out of the schema.

import { customQuote, fixedOffers, getCategory, type CatalogOffer, type CatalogPrice } from '@/data/catalog';
import { FOUNDER_PHOTO_URL, ORGANIZATION_LOGO_URL, SITE_URL } from '@/lib/site';

const siteUrl = SITE_URL;

function priceSpecification(price: CatalogPrice) {
  return {
    '@type': price.per === 'month' ? 'UnitPriceSpecification' : 'PriceSpecification',
    price: price.amount,
    priceCurrency: 'USD',
    ...(price.per === 'month' ? { unitCode: 'MON', unitText: 'month' } : {}),
    ...(price.appliesTo ? { description: `For ${price.appliesTo}` } : {}),
  };
}

/** One schema.org Offer for a fixed-price catalog entry. Exported for tests. */
export function catalogOfferSchema(offer: CatalogOffer) {
  const [only] = offer.prices;
  const isSingleOneTime = offer.prices.length === 1 && !only.per;
  const pricing = isSingleOneTime
    ? { price: String(only.amount), priceCurrency: 'USD' }
    : {
        priceCurrency: 'USD',
        priceSpecification: offer.prices.length === 1 ? priceSpecification(only) : offer.prices.map(priceSpecification),
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

/** The custom quote: an Offer with no price. Exported for tests. */
export function customQuoteSchema() {
  return {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: customQuote.name,
      description: customQuote.summary,
      url: `${siteUrl}/#${customQuote.id}`,
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
    name: 'Fixed-price offers and custom quotes',
    itemListElement: [...fixedOffers.map(catalogOfferSchema), customQuoteSchema()],
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
