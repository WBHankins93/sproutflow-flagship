/**
 * HIGH PRIORITY TESTS: Data Validation
 *
 * Validates the live content model: service paths, project proof,
 * case studies, and contact information consistency.
 *
 * The v1 pricing-tier data (data/services.ts, data/content.ts) was deleted
 * in the v2 cleanup. Those files were imported by tests only.
 */

import { servicePaths } from '@/data/servicePaths'
import { projectProof } from '@/data/projectProof'
import { caseStudies } from '@/data/caseStudies'
import { BUDGET_OPTIONS, PROJECT_TYPES } from '@/types/inquiry'

const CORRECT_EMAIL = 'ben@sproutflow-studio.com'
const CORRECT_PHONE_DISPLAY = '(504) 326-1676'
const CORRECT_PHONE_TEL = '+15043261676'

describe('Data Validation - Public Service Paths', () => {
  it('should expose exactly the three outcome-led service paths', () => {
    expect(servicePaths.map(path => path.id)).toEqual([
      'websites',
      'business-systems',
      'growth-support',
    ])
  })

  it('should keep pricing out of the public service path model', () => {
    servicePaths.forEach(path => {
      expect(path).not.toHaveProperty('price')
      expect(path).not.toHaveProperty('priceRange')
      expect(path).not.toHaveProperty('timeline')
    })
  })

  it('should have every required field populated on each path', () => {
    servicePaths.forEach(path => {
      expect(typeof path.eyebrow).toBe('string')
      expect(path.eyebrow.length).toBeGreaterThan(0)
      expect(path.title.length).toBeGreaterThan(0)
      expect(path.outcome.length).toBeGreaterThan(0)
      expect(path.description.length).toBeGreaterThan(0)
      expect(path.goodFit.length).toBeGreaterThan(0)
      expect(path.ctaLabel.length).toBeGreaterThan(0)
      expect(Array.isArray(path.capabilities)).toBe(true)
      expect(path.capabilities.length).toBeGreaterThan(0)
    })
  })

  it('should align the inquiry selector with the service paths', () => {
    expect(PROJECT_TYPES).toEqual([
      'Websites that earn trust',
      'Systems that remove friction',
      'Ongoing growth and support',
      'Not sure yet',
    ])
  })

  it('should collect budget privately without package labels', () => {
    expect(BUDGET_OPTIONS.length).toBe(6)
    expect(BUDGET_OPTIONS).not.toContain('Starter')
    expect(BUDGET_OPTIONS).not.toContain('Foundation')
    expect(BUDGET_OPTIONS).not.toContain('Growth')
    expect(BUDGET_OPTIONS).not.toContain('Market Leader')
  })
})

describe('Data Validation - Project Proof', () => {
  it('should have unique project ids', () => {
    const ids = projectProof.map(project => project.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have all required fields on every project', () => {
    projectProof.forEach(project => {
      expect(project.name.length).toBeGreaterThan(0)
      expect(project.location.length).toBeGreaterThan(0)
      expect(project.result.length).toBeGreaterThan(0)
      expect(project.screenshot.length).toBeGreaterThan(0)
      expect(project.screenshotAlt.length).toBeGreaterThan(0)
      expect(project.logo.length).toBeGreaterThan(0)
    })
  })

  it('should link every project to an internal case study route', () => {
    projectProof.forEach(project => {
      expect(project.href).toBe(`/case-studies/${project.id}`)
    })
  })

  it('should point every project at an external live site', () => {
    projectProof.forEach(project => {
      expect(/^https?:\/\/.+/.test(project.liveUrl)).toBe(true)
    })
  })

  it('should use valid hex colors for canvas and ink', () => {
    const hex = /^#[0-9A-Fa-f]{6}$/
    projectProof.forEach(project => {
      expect(hex.test(project.canvasColor)).toBe(true)
      expect(hex.test(project.inkColor)).toBe(true)
    })
  })
})

describe('Data Validation - Case Study Cross-Reference', () => {
  it('should have a case study for every project proof entry', () => {
    const slugs = new Set(caseStudies.map(study => study.slug))
    projectProof.forEach(project => {
      expect(slugs.has(project.id)).toBe(true)
    })
  })

  it('should have unique case study slugs', () => {
    const slugs = caseStudies.map(study => study.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('Data Validation - Contact Information Consistency', () => {
  it('should validate email format', () => {
    expect(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(CORRECT_EMAIL)).toBe(true)
  })

  it('should use the New Orleans local number in display format', () => {
    expect(/^\(\d{3}\) \d{3}-\d{4}$/.test(CORRECT_PHONE_DISPLAY)).toBe(true)
    expect(CORRECT_PHONE_DISPLAY.startsWith('(504)')).toBe(true)
  })

  it('should validate tel: link format', () => {
    expect(/^\+?\d+$/.test(CORRECT_PHONE_TEL)).toBe(true)
  })

  it('should keep the display number and tel: link in sync', () => {
    const digits = CORRECT_PHONE_DISPLAY.replace(/\D/g, '')
    expect(CORRECT_PHONE_TEL).toBe(`+1${digits}`)
  })
})

describe('Data Validation - Work Projects Structure', () => {
  it('should have valid work project structure', async () => {
    const { workProjects } = await import('@/data/workProjects')

    workProjects.forEach(project => {
      expect(project).toHaveProperty('id')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('client')
      expect(project).toHaveProperty('category')
      expect(project).toHaveProperty('sortPriority')
      expect(project).toHaveProperty('status')
      expect(project).toHaveProperty('description')
      expect(project).toHaveProperty('url')
      expect(project).toHaveProperty('services')
      expect(project).toHaveProperty('tech')
      expect(project).toHaveProperty('gradient')

      expect(['Live', 'In Progress']).toContain(project.status)
      expect(typeof project.category).toBe('string')
      expect(typeof project.sortPriority).toBe('number')
      expect(Array.isArray(project.services)).toBe(true)
      expect(Array.isArray(project.tech)).toBe(true)
      expect(Array.isArray(project.gradient)).toBe(true)
      expect(project.gradient.length).toBeGreaterThanOrEqual(2)
    })
  })
})
