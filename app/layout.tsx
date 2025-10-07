// app/layout.tsx - Professional Root Layout

import type { Metadata } from 'next'
import './globals.css'
import { seoContent } from '../data/content'

export const metadata: Metadata = {
  title: seoContent.home.title,
  description: seoContent.home.description,
  keywords: seoContent.home.keywords.join(', '),
  authors: [{ name: 'Sproutflow Studio' }],
  creator: 'Sproutflow Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sproutflow.com',
    title: seoContent.home.title,
    description: seoContent.home.description,
    siteName: 'Sproutflow Studio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sproutflow - Professional Web Design Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoContent.home.title,
    description: seoContent.home.description,
    images: ['/images/og-image.png'],
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
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#5F755E" />
        
        {/* Theme and Viewport */}
        <meta name="theme-color" content="#5F755E" />
        <meta name="color-scheme" content="light" />
      </head>
      
      <body className="font-body antialiased">
        {/* Professional Layout Structure */}
        <div className="min-h-screen flex flex-col">
          {/* Skip Navigation for Accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                       bg-primary-600 text-white px-4 py-2 rounded-md z-50 
                       focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Skip to main content
          </a>

          
          {/* Main Content Area */}
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          
          {/* Footer will be added later */}
        </div>
        
        {/* Professional Analytics (Add your tracking code) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google Analytics 4 */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}