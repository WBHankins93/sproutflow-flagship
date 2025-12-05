// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import StructuredData from "@/components/StructuredData";
import { DM_Serif_Display, DM_Sans } from "next/font/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sproutflow-studio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sproutflow Studio | Professional Web Design in New Orleans, LA",
    template: "%s | Sproutflow Studio"
  },
  description: "Professional web design and development for small businesses in New Orleans, LA. Custom websites from $850-$7,500+. Enterprise-level strategy with small business heart.",
  keywords: [
    "web design New Orleans",
    "website design New Orleans",
    "custom website development New Orleans",
    "small business web design",
    "professional website design",
    "New Orleans web designer",
    "local web design",
    "business website New Orleans",
    "responsive web design",
    "SEO web design New Orleans"
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
    title: "Sproutflow Studio | Professional Web Design in New Orleans, LA",
    description: "Professional web design and development for small businesses in New Orleans, LA. Custom websites from $850-$7,500+.",
    images: [
      {
        url: `${siteUrl}/images/sproutflow-main-logo.png`,
        width: 1200,
        height: 630,
        alt: "Sproutflow Studio - Professional Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sproutflow Studio | Professional Web Design in New Orleans, LA",
    description: "Professional web design and development for small businesses in New Orleans, LA.",
    images: [`${siteUrl}/images/sproutflow-main-logo.png`],
    creator: "@sproutflowstudio",
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
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSerif.variable} ${dmSans.variable} antialiased font-body`}
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