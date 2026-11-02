// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import StructuredData from '@/components/StructuredData';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/lib/site';
// Fonts: the five v3 type roles live in lib/fonts.ts (see docs/design-system-v3.md).
import { fontVariables } from '@/lib/fonts';

// Serve anyone, anywhere: New Orleans is where Ben is based, not the audience.
// Pages that already target local search keep their own local metadata.
const SITE_DESCRIPTION =
  'Websites, lead systems and care for small businesses. Based in New Orleans, working with businesses anywhere.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sproutflow Studio | Websites, Lead Systems and Care for Small Businesses',
    template: '%s | Sproutflow Studio',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'small business websites',
    'small business web design',
    'landing page design',
    'lead capture systems',
    'website care plans',
    'website audit',
    'web designer based in New Orleans',
  ],
  authors: [{ name: 'Sproutflow Studio' }],
  creator: 'Sproutflow Studio',
  publisher: 'Sproutflow Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Sproutflow Studio',
    title: 'Sproutflow Studio | Websites, Lead Systems and Care for Small Businesses',
    description: SITE_DESCRIPTION,
    // No images here on purpose: app/opengraph-image.tsx and
    // app/twitter-image.tsx generate the 1200x630 social card, and Next only
    // attaches them when this object leaves `images` unset.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sproutflow Studio | Websites, Lead Systems and Care for Small Businesses',
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next.js disable smooth scrolling while it resets
    // scroll position on route changes - fixes pages loading scrolled to the bottom
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${fontVariables} antialiased font-body`}
      >
        <StructuredData />
        <Header />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
