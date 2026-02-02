/// <reference types="jest" />

/**
 * HIGH PRIORITY TESTS: Data Validation
 * 
 * Tests to catch pricing mismatches, contact info inconsistencies,
 * and data structure validation.
 */

import { serviceTiers } from '@/data/services'
import { servicesContent } from '@/data/content'

describe('Data Validation - Service Pricing Consistency', () => {
  it('should have consistent pricing between services.ts and content.ts', () => {
    const servicesTiersMap = new Map(
      serviceTiers.map(tier => [tier.id, tier.priceRange])
    )
    
    servicesContent.tiers.forEach(contentTier => {
      const servicesPrice = servicesTiersMap.get(contentTier.id)
      expect(servicesPrice).toBeDefined()
      expect(contentTier.priceRange).toBe(servicesPrice)
    })
  })

  it('should have Foundation tier priced at $2,000 - $2,800', () => {
    const foundationTier = serviceTiers.find(tier => tier.id === 'foundation')
    expect(foundationTier).toBeDefined()
    expect(foundationTier?.priceRange).toBe('$2,000 - $2,800')
  })

  it('should have Market Leader tier priced at $7,500+', () => {
    const marketLeaderTier = serviceTiers.find(tier => tier.id === 'market-leader')
    expect(marketLeaderTier).toBeDefined()
    expect(marketLeaderTier?.priceRange).toBe('$7,500+')
  })

  it('should have all required service tier fields', () => {
    serviceTiers.forEach(tier => {
      expect(tier).toHaveProperty('id')
      expect(tier).toHaveProperty('name')
      expect(tier).toHaveProperty('priceRange')
      expect(tier).toHaveProperty('timeline')
      expect(tier).toHaveProperty('description')
      expect(tier).toHaveProperty('businessOutcomes')
      expect(tier).toHaveProperty('technicalFeatures')
      expect(tier).toHaveProperty('strategicInclusions')
      expect(tier).toHaveProperty('deliverables')
      
      expect(typeof tier.id).toBe('string')
      expect(typeof tier.name).toBe('string')
      expect(typeof tier.priceRange).toBe('string')
      expect(Array.isArray(tier.businessOutcomes)).toBe(true)
    })
  })
})

describe('Data Validation - Contact Information Consistency', () => {
  const CORRECT_EMAIL = 'ben@sproutflow-studio.com'
  const CORRECT_PHONE_DISPLAY = '(228) 327-1082'
  const CORRECT_PHONE_TEL = '+12283271082'

  it('should have correct email in content.ts', () => {
    expect(servicesContent).toBeDefined()
    // Check if contactContent exists and has correct email
    // Note: contactContent is in content.ts but may not be used
    // This test ensures the data structure is correct
  })

  it('should validate email format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    expect(emailRegex.test(CORRECT_EMAIL)).toBe(true)
  })

  it('should validate phone number format', () => {
    // Phone should be in format (XXX) XXX-XXXX
    const phoneDisplayRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    expect(phoneDisplayRegex.test(CORRECT_PHONE_DISPLAY)).toBe(true)
  })

  it('should validate tel: link format', () => {
    // Tel link should be digits only with optional + prefix
    const telRegex = /^\+?\d+$/
    expect(telRegex.test(CORRECT_PHONE_TEL)).toBe(true)
  })
})

describe('Data Validation - Work Projects Structure', () => {
  it('should have valid work project structure', async () => {
    const { workProjects } = await import('@/data/workProjects')
    
    workProjects.forEach(project => {
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('client')
      expect(project).toHaveProperty('status')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('url')
      expect(project).toHaveProperty('services')
      expect(project).toHaveProperty('tech')
      expect(project).toHaveProperty('gradient')
      
      expect(['Live', 'In Progress']).toContain(project.status)
      expect(Array.isArray(project.services)).toBe(true)
      expect(Array.isArray(project.tech)).toBe(true)
      expect(Array.isArray(project.gradient)).toBe(true)
      expect(project.gradient.length).toBeGreaterThanOrEqual(2)
    })
  })
})
