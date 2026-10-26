// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import StructuredData from '@/components/StructuredData';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/lib/site';
// Fonts: the five v3 type roles live in lib/fonts.ts (see docs/design-system-v3.md).
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sproutflow Studio | Web Design & Business Systems in New Orleans',
    template: '%s | Sproutflow Studio',
  },
  description:
    'Custom websites and the business systems behind them: web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.',
  keywords: [
    'web design New Orleans',
    'website design New Orleans',
    'custom website development New Orleans',
    'small business web design',
    'custom software development New Orleans',
    'CRM systems small business',
    'workflow automation New Orleans',
    'New Orleans web designer',
    'local web design',
    'business website New Orleans',
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
    title: 'Sproutflow Studio | Web Design & Business Systems in New Orleans',
    description:
      'Custom websites and the business systems behind them. Web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.',
    // No images here on purpose: app/opengraph-image.tsx and
    // app/twitter-image.tsx generate the 1200x630 social card, and Next only
    // attaches them when this object leaves `images` unset.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sproutflow Studio | Web Design & Business Systems in New Orleans',
    description:
      'Custom websites and the business systems behind them. Web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.',
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
