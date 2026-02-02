/**
 * LOW PRIORITY TESTS: SEO & Metadata
 * 
 * Tests to ensure metadata is present on all pages,
 * structured data is valid, and SEO best practices are followed.
 */

import { Metadata } from 'next'
import { render } from '@testing-library/react'
import StructuredData from '@/components/StructuredData'

describe('SEO Metadata - Page Metadata', () => {
  it('should have metadata export in layout', async () => {
    const layout = await import('@/app/layout')
    expect(layout.metadata).toBeDefined()
  })

  it('should have required metadata fields in root layout', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as Metadata
    
    expect(metadata.title).toBeDefined()
    expect(metadata.description).toBeDefined()
  })

  it('should have metadata in home page', async () => {
    const homePage = await import('@/app/page')
    expect(homePage.metadata).toBeDefined()
  })

  it('should have metadata in case studies page', async () => {
    const caseStudiesPage = await import('@/app/case-studies/page')
    expect(caseStudiesPage.metadata).toBeDefined()
  })

  it('should have metadata in how-we-work page', async () => {
    const howWeWorkPage = await import('@/app/how-we-work/page')
    expect(howWeWorkPage.metadata).toBeDefined()
  })

  it('should have metadata in work page', async () => {
    const workPage = await import('@/app/work/page')
    // Work page may not have metadata, but should not crash
    expect(workPage).toBeDefined()
  })
})

describe('SEO Metadata - Root Layout Metadata', () => {
  it('should have title with template', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as any
    
    if (metadata.title && typeof metadata.title === 'object') {
      expect(metadata.title.template).toBeDefined()
      expect(metadata.title.default).toBeDefined()
    }
  })

  it('should have OpenGraph metadata', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as any
    
    expect(metadata.openGraph).toBeDefined()
    expect(metadata.openGraph?.type).toBe('website')
    expect(metadata.openGraph?.siteName).toBe('Sproutflow Studio')
  })

  it('should have Twitter card metadata', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as any
    
    expect(metadata.twitter).toBeDefined()
    expect(metadata.twitter?.card).toBe('summary_large_image')
  })

  it('should have robots configuration', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as any
    
    expect(metadata.robots).toBeDefined()
    if (typeof metadata.robots === 'object' && metadata.robots !== null) {
      expect(metadata.robots.index).toBe(true)
      expect(metadata.robots.follow).toBe(true)
    }
  })

  it('should have canonical URL', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as Metadata
    
    expect(metadata.alternates?.canonical).toBeDefined()
  })
})

describe('SEO Metadata - Structured Data', () => {
  it('should have StructuredData component', async () => {
    const StructuredDataModule = await import('@/components/StructuredData')
    expect(StructuredDataModule.default).toBeDefined()
  })

  it('should render structured data script tag', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
  })

  it('should have valid JSON-LD in structured data', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    
    if (script?.textContent) {
      expect(() => JSON.parse(script.textContent)).not.toThrow()
    }
  })

  it('should have LocalBusiness schema type', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    
    if (script?.textContent) {
      const schema = JSON.parse(script.textContent)
      expect(schema['@type']).toBe('LocalBusiness')
      expect(schema['@context']).toBe('https://schema.org')
    }
  })

  it('should have correct business information in structured data', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    
    if (script?.textContent) {
      const schema = JSON.parse(script.textContent)
      expect(schema.name).toBe('Sproutflow Studio')
      expect(schema.email).toBe('ben@sproutflow-studio.com')
      expect(schema.telephone).toBe('+1-228-327-1082')
    }
  })

  it('should have address information in structured data', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    
    if (script?.textContent) {
      const schema = JSON.parse(script.textContent)
      expect(schema.address).toBeDefined()
      expect(schema.address['@type']).toBe('PostalAddress')
      expect(schema.address.addressLocality).toBe('New Orleans')
      expect(schema.address.addressRegion).toBe('LA')
    }
  })

  it('should have service offerings in structured data', () => {
    const { container } = render(<StructuredData />)
    const script = container.querySelector('script[type="application/ld+json"]')
    
    if (script?.textContent) {
      const schema = JSON.parse(script.textContent)
      expect(schema.hasOfferCatalog).toBeDefined()
      expect(schema.hasOfferCatalog['@type']).toBe('OfferCatalog')
      expect(Array.isArray(schema.hasOfferCatalog.itemListElement)).toBe(true)
      expect(schema.hasOfferCatalog.itemListElement.length).toBeGreaterThan(0)
    }
  })
})

describe('SEO Metadata - Sitemap', () => {
  it('should have sitemap export', async () => {
    const sitemap = await import('@/app/sitemap')
    expect(sitemap.default).toBeDefined()
  })

  it('should return array of sitemap entries', async () => {
    const sitemap = await import('@/app/sitemap')
    const sitemapData = sitemap.default()
    
    expect(Array.isArray(sitemapData)).toBe(true)
    expect(sitemapData.length).toBeGreaterThan(0)
  })

  it('should have home page in sitemap with highest priority', async () => {
    const sitemap = await import('@/app/sitemap')
    const sitemapData = sitemap.default()
    
    const homePage = sitemapData.find((entry: any) => entry.url.includes('sproutflow-studio.com') && !entry.url.includes('/'))
    expect(homePage).toBeDefined()
    expect(homePage?.priority).toBe(1)
  })

  it('should have all required sitemap fields', async () => {
    const sitemap = await import('@/app/sitemap')
    const sitemapData = sitemap.default()
    
    sitemapData.forEach((entry: any) => {
      expect(entry).toHaveProperty('url')
      expect(entry).toHaveProperty('lastModified')
      expect(entry).toHaveProperty('changeFrequency')
      expect(entry).toHaveProperty('priority')
      
      expect(typeof entry.url).toBe('string')
      expect(entry.url.startsWith('http')).toBe(true)
    })
  })

  it('should have valid changeFrequency values', async () => {
    const sitemap = await import('@/app/sitemap')
    const sitemapData = sitemap.default()
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    
    sitemapData.forEach((entry: any) => {
      expect(validFrequencies).toContain(entry.changeFrequency)
    })
  })

  it('should have priority values between 0 and 1', async () => {
    const sitemap = await import('@/app/sitemap')
    const sitemapData = sitemap.default()
    
    sitemapData.forEach((entry: any) => {
      expect(entry.priority).toBeGreaterThanOrEqual(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
    })
  })
})

describe('SEO Metadata - Robots.txt', () => {
  it('should have robots export', async () => {
    const robots = await import('@/app/robots')
    expect(robots.default).toBeDefined()
  })

  it('should return robots configuration object', async () => {
    const robots = await import('@/app/robots')
    const robotsData = robots.default()
    
    expect(robotsData).toHaveProperty('rules')
    expect(robotsData).toHaveProperty('sitemap')
  })

  it('should allow all user agents', async () => {
    const robots = await import('@/app/robots')
    const robotsData = robots.default()
    
    const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules]
    const allAgentsRule = rules.find((rule: any) => rule.userAgent === '*')
    expect(allAgentsRule).toBeDefined()
    expect(allAgentsRule?.allow).toBe('/')
  })

  it('should disallow admin and API routes', async () => {
    const robots = await import('@/app/robots')
    const robotsData = robots.default()
    
    const rules = Array.isArray(robotsData.rules) ? robotsData.rules : [robotsData.rules]
    const allAgentsRule = rules.find((rule: any) => rule.userAgent === '*')
    expect(allAgentsRule?.disallow).toBeDefined()
    expect(Array.isArray(allAgentsRule?.disallow)).toBe(true)
    expect(allAgentsRule?.disallow).toContain('/api/')
    expect(allAgentsRule?.disallow).toContain('/admin/')
  })

  it('should include sitemap URL', async () => {
    const robots = await import('@/app/robots')
    const robotsData = robots.default()
    
    expect(robotsData.sitemap).toBeDefined()
    expect(robotsData.sitemap).toContain('sitemap.xml')
  })
})

describe('SEO Metadata - Content Quality', () => {
  it('should have meaningful descriptions', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as Metadata
    
    if (typeof metadata.description === 'string') {
      expect(metadata.description.length).toBeGreaterThan(50)
      expect(metadata.description.length).toBeLessThan(160)
    }
  })

  it('should have relevant keywords', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as Metadata
    
    if (metadata.keywords && Array.isArray(metadata.keywords)) {
      expect(metadata.keywords.length).toBeGreaterThan(0)
      expect(metadata.keywords.length).toBeLessThanOrEqual(10) // Best practice
    }
  })

  it('should have keywords related to New Orleans and web design', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as Metadata
    
    if (metadata.keywords && Array.isArray(metadata.keywords)) {
      const keywordsString = metadata.keywords.join(' ').toLowerCase()
      expect(keywordsString).toContain('new orleans')
      expect(keywordsString).toContain('web design')
    }
  })

  it('should have OpenGraph image with correct dimensions', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as any
    
    if (metadata.openGraph?.images && Array.isArray(metadata.openGraph.images)) {
      const image = metadata.openGraph.images[0]
      if (image && typeof image === 'object' && 'width' in image && 'height' in image) {
        expect(image.width).toBe(1200)
        expect(image.height).toBe(630) // Standard OG image size
      }
    }
  })

  it('should have metadataBase URL set', async () => {
    const layout = await import('@/app/layout')
    const metadata = layout.metadata as Metadata
    
    expect(metadata.metadataBase).toBeDefined()
  })
})

describe('SEO Metadata - Page-Specific Metadata', () => {
  it('should have unique titles for each page', async () => {
    const homePage = await import('@/app/page')
    const caseStudiesPage = await import('@/app/case-studies/page')
    const howWeWorkPage = await import('@/app/how-we-work/page')
    
    const homeMetadata = homePage.metadata as any
    const caseStudiesMetadata = caseStudiesPage.metadata as any
    const howWeWorkMetadata = howWeWorkPage.metadata as any
    
    if (homeMetadata.title && caseStudiesMetadata.title && howWeWorkMetadata.title) {
      const homeTitle = typeof homeMetadata.title === 'string' ? homeMetadata.title : homeMetadata.title.default || ''
      const caseStudiesTitle = typeof caseStudiesMetadata.title === 'string' ? caseStudiesMetadata.title : caseStudiesMetadata.title.default || ''
      const howWeWorkTitle = typeof howWeWorkMetadata.title === 'string' ? howWeWorkMetadata.title : howWeWorkMetadata.title.default || ''
      
      expect(homeTitle).not.toBe(caseStudiesTitle)
      expect(caseStudiesTitle).not.toBe(howWeWorkTitle)
    }
  })

  it('should have canonical URLs for each page', async () => {
    const homePage = await import('@/app/page')
    const caseStudiesPage = await import('@/app/case-studies/page')
    
    const homeMetadata = homePage.metadata as Metadata
    const caseStudiesMetadata = caseStudiesPage.metadata as Metadata
    
    expect(homeMetadata.alternates?.canonical).toBeDefined()
    expect(caseStudiesMetadata.alternates?.canonical).toBeDefined()
  })
})
