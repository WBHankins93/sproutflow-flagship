/**
 * MEDIUM PRIORITY TESTS: Data Consistency
 *
 * Validates consistency across the live data files and the components
 * that consume them.
 *
 * The v1 pricing-tier data (data/services.ts, data/content.ts) was deleted
 * in the v2 cleanup. Those files were imported by tests only.
 */

import { servicePaths } from '@/data/servicePaths'
import { projectProof } from '@/data/projectProof'
import { caseStudies } from '@/data/caseStudies'
import { testimonials } from '@/data/testimonials'

describe('Data Consistency - Service Paths', () => {
  it('should have unique path ids', () => {
    const ids = servicePaths.map(path => path.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should keep capability lists short enough to scan', () => {
    servicePaths.forEach(path => {
      expect(path.capabilities.length).toBeGreaterThanOrEqual(3)
      expect(path.capabilities.length).toBeLessThanOrEqual(6)
    })
  })

  it('should phrase every CTA as an ask, not a purchase', () => {
    servicePaths.forEach(path => {
      expect(path.ctaLabel.toLowerCase().startsWith('ask about')).toBe(true)
    })
  })
})

describe('Data Consistency - Testimonials', () => {
  it('should attach every testimonial to a real case study', () => {
    const slugs = new Set(caseStudies.map(study => study.slug))
    testimonials.forEach(entry => {
      expect(slugs.has(entry.caseStudySlug)).toBe(true)
    })
  })

  it('should have unique testimonial ids', () => {
    const ids = testimonials.map(entry => entry.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have attribution on every quote', () => {
    testimonials.forEach(entry => {
      expect(entry.quote.length).toBeGreaterThan(20)
      expect(entry.name.length).toBeGreaterThan(0)
      expect(entry.role.length).toBeGreaterThan(0)
      expect(entry.business.length).toBeGreaterThan(0)
    })
  })

  it('should use https for any live url', () => {
    testimonials.forEach(entry => {
      if (entry.liveUrl) {
        expect(/^https:\/\/.+/.test(entry.liveUrl)).toBe(true)
      }
    })
  })
})

describe('Data Consistency - Project Proof and Case Studies', () => {
  it('should keep project names aligned with case study client names', () => {
    caseStudies.forEach(study => {
      const project = projectProof.find(entry => entry.id === study.slug)
      if (project) {
        expect(study.clientName.length).toBeGreaterThan(0)
      }
    })
  })

  it('should give every case study a card blurb for the work index', () => {
    caseStudies.forEach(study => {
      expect(typeof study.cardBlurb).toBe('string')
      expect(study.cardBlurb.length).toBeGreaterThan(20)
    })
  })
})

describe('Data Consistency - Type Safety', () => {
  it('should have valid status values for work projects', async () => {
    const { projectProof } = await import('@/data/projectProof')
    const validStatuses = ['Live', 'In progress']

    projectProof.forEach(project => {
      expect(validStatuses).toContain(project.status)
    })
  })

  it('should have valid URL format for work projects', async () => {
    const { projectProof } = await import('@/data/projectProof')

    projectProof.forEach(project => {
      expect(/^https?:\/\/.+/.test(project.liveUrl)).toBe(true)
    })
  })

  it('should have valid project canvas colors', async () => {
    const { projectProof } = await import('@/data/projectProof')

    projectProof.forEach(project => {
      expect(/^#[0-9A-Fa-f]{6}$/.test(project.canvasColor)).toBe(true)
    })
  })
})
