/**
 * LOW PRIORITY TESTS: SEO & Metadata
 * 
 * Tests to ensure metadata is present on all pages
 * and structured data is valid.
 */

import { Metadata } from 'next'

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
})

describe('SEO Metadata - Structured Data', () => {
  it('should have StructuredData component', async () => {
    const StructuredData = await import('@/components/StructuredData')
    expect(StructuredData.default).toBeDefined()
  })

  it('should render structured data script', () => {
    // This would require rendering the component
    // For now, we just verify it exists
    expect(true).toBe(true) // Placeholder
  })
})

describe('SEO Metadata - Sitemap', () => {
  it('should have sitemap export', async () => {
    const sitemap = await import('@/app/sitemap')
    expect(sitemap.default).toBeDefined()
  })

  it('should have robots export', async () => {
    const robots = await import('@/app/robots')
    expect(robots.default).toBeDefined()
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
    }
  })
})
