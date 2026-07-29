// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import StructuredData from "@/components/StructuredData";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sproutflow Studio | Web Design & Custom Business Software in New Orleans, LA",
    template: "%s | Sproutflow Studio - New Orleans Web Design"
  },
  description: "When the website works, make the business behind it work better. Founder-led websites, internal tools, and workflow automation from New Orleans.",
  authors: [{ name: "Sproutflow Studio" }],
  creator: "Sproutflow Studio",
  publisher: "Sproutflow Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Sproutflow Studio",
    title: "Sproutflow Studio | Web Design & Custom Business Software in New Orleans, LA",
    description: "When the website works, make the business behind it work better. Founder-led websites and business systems from New Orleans.",
    images: [
      {
        url: `${siteUrl}/images/logo/main-logo-Photoroom.png`,
        width: 1200,
        height: 630,
        alt: "Sproutflow Studio - Professional Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sproutflow Studio | Web Design & Custom Business Software in New Orleans, LA",
    description: "Founder-led websites and business systems from New Orleans.",
    images: [`${siteUrl}/images/logo/main-logo-Photoroom.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next.js disable smooth scrolling while it resets
    // scroll position on route changes - fixes pages loading scrolled to the bottom
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${newsreader.variable} ${schibsted.variable} antialiased font-body`}
      >
        <a className="skip-link" href="#main-content">Skip to content</a>
        <StructuredData />
        <Header />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
