// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import StructuredData from "@/components/StructuredData";
import { Bricolage_Grotesque, Source_Sans_3 } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
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
  description: "Custom websites and the business systems behind them: web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.",
  keywords: [
    "web design New Orleans",
    "website design New Orleans",
    "custom website development New Orleans",
    "small business web design",
    "custom software development New Orleans",
    "CRM systems small business",
    "workflow automation New Orleans",
    "New Orleans web designer",
    "local web design",
    "business website New Orleans"
  ],
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
    description: "Custom websites and the business systems behind them. Web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.",
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
    description: "Custom websites and the business systems behind them. Web design, admin tools, CRMs, and automation for small businesses in New Orleans, LA.",
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
        className={`${bricolage.variable} ${sourceSans.variable} antialiased font-body`}
      >
        <StructuredData />
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
