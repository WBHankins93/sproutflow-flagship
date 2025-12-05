// components/StructuredData.tsx - JSON-LD Structured Data for SEO

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}#organization`,
  "name": "Sproutflow Studio",
  "alternateName": "Sproutflow",
  "url": siteUrl,
  "logo": `${siteUrl}/images/sproutflow-main-logo.png`,
  "image": `${siteUrl}/images/sproutflow-main-logo.png`,
  "description": "Professional web design and development for small businesses in New Orleans, LA. Custom websites from $850-$7,500+.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "New Orleans",
    "addressRegion": "LA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "29.9511",
    "longitude": "-90.0715"
  },
  "telephone": "+1-228-327-1082",
  "email": "ben@sproutflow-studio.com",
  "priceRange": "$$",
  "areaServed": {
    "@type": "City",
    "name": "New Orleans"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "29.9511",
      "longitude": "-90.0715"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Starter Website Package",
          "description": "Quick professional presence for new businesses",
          "priceRange": "$850 - $1,500"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Foundation Website Package",
          "description": "Strategic foundation for validated online presence",
          "priceRange": "$2,000 - $2,800"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Growth Website Package",
          "description": "Competitive differentiation for market share",
          "priceRange": "$3,500 - $5,500"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Market Leader Website Package",
          "description": "Revenue-driving digital presence",
          "priceRange": "$7,500+"
        }
      }
    ]
  }
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}

