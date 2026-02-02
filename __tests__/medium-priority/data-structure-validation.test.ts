/**
 * MEDIUM PRIORITY TESTS: Data Structure Validation
 * 
 * Additional tests for data structure integrity,
 * array validation, and nested object structures.
 */

import { serviceTiers, addOnServices } from '@/data/services'
import { workProjects } from '@/data/workProjects'

describe('Data Structure Validation - Service Tiers', () => {
  it('should have unique tier IDs', () => {
    const ids = serviceTiers.map(tier => tier.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have all tiers with valid idealFor descriptions', () => {
    serviceTiers.forEach(tier => {
      expect(tier.idealFor).toBeDefined()
      expect(typeof tier.idealFor).toBe('string')
      expect(tier.idealFor.length).toBeGreaterThan(10) // Meaningful description
    })
  })

  it('should have consistent tagline format', () => {
    serviceTiers.forEach(tier => {
      expect(tier.tagline).toBeDefined()
      expect(typeof tier.tagline).toBe('string')
      expect(tier.tagline.length).toBeGreaterThan(5)
    })
  })

  it('should have limitations array for starter tier', () => {
    const starterTier = serviceTiers.find(tier => tier.id === 'starter')
    expect(starterTier).toBeDefined()
    expect(starterTier?.limitations).toBeDefined()
    expect(Array.isArray(starterTier?.limitations)).toBe(true)
  })

  it('should have popular flag only on foundation tier', () => {
    const foundationTier = serviceTiers.find(tier => tier.id === 'foundation')
    const otherTiers = serviceTiers.filter(tier => tier.id !== 'foundation')
    
    expect(foundationTier?.popular).toBe(true)
    otherTiers.forEach(tier => {
      expect(tier.popular).toBeFalsy()
    })
  })
})

describe('Data Structure Validation - Add-On Services', () => {
  it('should have all add-on services with required fields', () => {
    addOnServices.forEach(service => {
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('name')
      expect(service).toHaveProperty('price')
      expect(service).toHaveProperty('description')
      expect(service).toHaveProperty('businessValue')
      expect(service).toHaveProperty('deliverables')
      expect(service).toHaveProperty('timeline')
    })
  })

  it('should have unique add-on service IDs', () => {
    const ids = addOnServices.map(service => service.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have valid price format for add-ons', () => {
    const priceRegex = /^\$[\d,]+(?: - \$[\d,]+)?(?:\/month|\/hour|\/post)?$|^Starting at \$[\d,]+(?:\/month)?$|^From \$[\d,]+(?:\/mo)?$/
    
    addOnServices.forEach(service => {
      expect(priceRegex.test(service.price)).toBe(true)
    })
  })

  it('should have non-empty deliverables arrays', () => {
    addOnServices.forEach(service => {
      expect(Array.isArray(service.deliverables)).toBe(true)
      expect(service.deliverables.length).toBeGreaterThan(0)
    })
  })
})

describe('Data Structure Validation - Work Projects', () => {
  it('should have unique project IDs', () => {
    const ids = workProjects.map(project => project.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('should have all projects with non-empty descriptions', () => {
    workProjects.forEach(project => {
      expect(project.description).toBeDefined()
      expect(typeof project.description).toBe('string')
      expect(project.description.length).toBeGreaterThan(20)
    })
  })

  it('should have all projects with at least one service', () => {
    workProjects.forEach(project => {
      expect(Array.isArray(project.services)).toBe(true)
      expect(project.services.length).toBeGreaterThan(0)
    })
  })

  it('should have all projects with at least one tech stack item', () => {
    workProjects.forEach(project => {
      expect(Array.isArray(project.tech)).toBe(true)
      expect(project.tech.length).toBeGreaterThan(0)
    })
  })

  it('should have valid gradient color formats', () => {
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/
    const rgbColorRegex = /^rgb\(|^rgba\(/
    
    workProjects.forEach(project => {
      project.gradient.forEach(color => {
        const isHex = hexColorRegex.test(color)
        const isRgb = rgbColorRegex.test(color)
        const isNamed = /^[a-zA-Z]+$/.test(color)
        
        expect(isHex || isRgb || isNamed).toBe(true)
      })
    })
  })

  it('should have valid logo paths when provided', () => {
    workProjects.forEach(project => {
      if (project.logo) {
        expect(typeof project.logo).toBe('string')
        expect(project.logo.length).toBeGreaterThan(0)
        // Should be a relative path, not absolute URL
        expect(project.logo.startsWith('http')).toBe(false)
      }
    })
  })

  it('should have valid background image paths when provided', () => {
    workProjects.forEach(project => {
      if (project.backgroundImage) {
        expect(typeof project.backgroundImage).toBe('string')
        expect(project.backgroundImage.length).toBeGreaterThan(0)
        // Should be a relative path, not absolute URL
        expect(project.backgroundImage.startsWith('http')).toBe(false)
      }
    })
  })
})

describe('Data Structure Validation - Cross-Reference', () => {
  it('should have consistent service tier count', () => {
    // Should have 4 tiers: starter, foundation, growth, market-leader
    expect(serviceTiers.length).toBe(4)
    
    const expectedIds = ['starter', 'foundation', 'growth', 'market-leader']
    const actualIds = serviceTiers.map(tier => tier.id)
    
    expectedIds.forEach(id => {
      expect(actualIds).toContain(id)
    })
  })

  it('should have work projects with valid status distribution', () => {
    const statusCounts = workProjects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Should have at least some live projects
    expect(statusCounts['Live'] || 0).toBeGreaterThan(0)
  })
})
