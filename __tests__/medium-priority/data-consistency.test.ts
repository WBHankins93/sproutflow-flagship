/**
 * MEDIUM PRIORITY TESTS: Data Consistency
 * 
 * Tests to validate data consistency across different data files
 * and ensure type safety.
 */

import { serviceTiers } from '@/data/services'
import { servicesContent } from '@/data/content'

describe('Data Consistency - Service Tiers', () => {
  it('should have matching tier IDs between services.ts and content.ts', () => {
    const servicesIds = new Set(serviceTiers.map(tier => tier.id))
    const contentIds = new Set(servicesContent.tiers.map(tier => tier.id))
    
    expect(servicesIds.size).toBe(contentIds.size)
    servicesIds.forEach(id => {
      expect(contentIds.has(id)).toBe(true)
    })
  })

  it('should have consistent tier names', () => {
    const servicesMap = new Map(
      serviceTiers.map(tier => [tier.id, tier.name])
    )
    
    servicesContent.tiers.forEach(contentTier => {
      const servicesName = servicesMap.get(contentTier.id)
      expect(servicesName).toBeDefined()
      expect(contentTier.name).toBe(servicesName)
    })
  })

  it('should have consistent timelines', () => {
    const servicesMap = new Map(
      serviceTiers.map(tier => [tier.id, tier.timeline])
    )
    
    servicesContent.tiers.forEach(contentTier => {
      const servicesTimeline = servicesMap.get(contentTier.id)
      expect(servicesTimeline).toBeDefined()
      expect(contentTier.timeline).toBe(servicesTimeline)
    })
  })
})

describe('Data Consistency - Service Tier Structure', () => {
  it('should have all tiers with required fields', () => {
    const requiredFields = ['id', 'name', 'priceRange', 'timeline', 'description']
    
    serviceTiers.forEach(tier => {
      requiredFields.forEach(field => {
        expect(tier).toHaveProperty(field)
        expect(tier[field as keyof typeof tier]).toBeTruthy()
      })
    })
  })

  it('should have valid price range format', () => {
    const priceRangeRegex = /^\$[\d,]+(?: - \$[\d,]+)?\+?$/
    
    serviceTiers.forEach(tier => {
      expect(priceRangeRegex.test(tier.priceRange)).toBe(true)
    })
  })

  it('should have non-empty arrays for business outcomes', () => {
    serviceTiers.forEach(tier => {
      expect(Array.isArray(tier.businessOutcomes)).toBe(true)
      expect(tier.businessOutcomes.length).toBeGreaterThan(0)
    })
  })

  it('should have non-empty arrays for technical features', () => {
    serviceTiers.forEach(tier => {
      expect(Array.isArray(tier.technicalFeatures)).toBe(true)
      expect(tier.technicalFeatures.length).toBeGreaterThan(0)
    })
  })

  it('should have non-empty arrays for deliverables', () => {
    serviceTiers.forEach(tier => {
      expect(Array.isArray(tier.deliverables)).toBe(true)
      expect(tier.deliverables.length).toBeGreaterThan(0)
    })
  })
})

describe('Data Consistency - Type Safety', () => {
  it('should have valid status values for work projects', async () => {
    const { workProjects } = await import('@/data/workProjects')
    const validStatuses = ['Live', 'In Progress']
    
    workProjects.forEach(project => {
      expect(validStatuses).toContain(project.status)
    })
  })

  it('should have valid URL format for work projects', async () => {
    const { workProjects } = await import('@/data/workProjects')
    const urlRegex = /^https?:\/\/.+/
    
    workProjects.forEach(project => {
      expect(urlRegex.test(project.url)).toBe(true)
    })
  })

  it('should have gradient arrays with at least 2 colors', async () => {
    const { workProjects } = await import('@/data/workProjects')
    
    workProjects.forEach(project => {
      expect(Array.isArray(project.gradient)).toBe(true)
      expect(project.gradient.length).toBeGreaterThanOrEqual(2)
      project.gradient.forEach(color => {
        expect(typeof color).toBe('string')
        // Basic hex color validation
        expect(/^#[0-9A-Fa-f]{6}$/.test(color) || /^[a-zA-Z]+$/.test(color)).toBe(true)
      })
    })
  })
})
