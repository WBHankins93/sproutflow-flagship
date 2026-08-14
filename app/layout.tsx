// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import StructuredData from '@/components/StructuredData';
import { Archivo, DM_Sans, Newsreader, Fira_Code } from 'next/font/google';

// Display: Archivo. An American grotesque in the GT America family, chosen
// because it is sturdy and unfashionable. Replaced Bricolage Grotesque, whose
// deliberate irregularities date the design.
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Accent: Newsreader italic, for the one emphasized word in a headline and for
// pull quotes. Replaced Cormorant Garamond, whose hairline contrast read
// boutique against the rest of the system.
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-accent',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: 'Sproutflow Studio',
    title: 'Sproutflow Studio | Web Design & Business Systems in New Orleans',
    description:
      'Custom websites and the business systems behind them. Web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.',
    images: [
      {
        url: `${siteUrl}/images/logo/main-logo-Photoroom.png`,
        width: 1200,
        height: 630,
        alt: 'Sproutflow Studio - Professional Web Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sproutflow Studio | Web Design & Business Systems in New Orleans',
    description:
      'Custom websites and the business systems behind them. Web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.',
    images: [`${siteUrl}/images/logo/main-logo-Photoroom.png`],
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
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next.js disable smooth scrolling while it resets
    // scroll position on route changes - fixes pages loading scrolled to the bottom
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${archivo.variable} ${dmSans.variable} ${newsreader.variable} ${firaCode.variable} antialiased font-body`}
      >
        <StructuredData />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
