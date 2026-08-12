/**
 * MEDIUM PRIORITY TESTS: Data Structure Validation
 *
 * Structural integrity for the live data model, plus the copy guards
 * that protect the v2 voice rules.
 *
 * The v1 pricing-tier data (data/services.ts, data/content.ts) was deleted
 * in the v2 cleanup. Those files were imported by tests only.
 */

import { servicePaths } from '@/data/servicePaths'
import { projectProof } from '@/data/projectProof'
import { caseStudies } from '@/data/caseStudies'
import { testimonials } from '@/data/testimonials'
import { workProjects } from '@/data/workProjects'

/** Strings that mean a mockup placeholder leaked into shipped data. */
const SCAFFOLDING = [
  '{{',
  'Your words go here',
  'Drop real captures into the empty slots',
  'Four to six frames replace these slots',
  'Lorem ipsum',
  'TODO',
]

function collectStrings(value: unknown, sink: string[]): void {
  if (typeof value === 'string') {
    sink.push(value)
    return
  }
  if (Array.isArray(value)) {
    value.forEach(item => collectStrings(item, sink))
    return
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach(item => collectStrings(item, sink))
  }
}

const allCopy: string[] = []
collectStrings(servicePaths, allCopy)
collectStrings(projectProof, allCopy)
collectStrings(caseStudies, allCopy)
collectStrings(testimonials, allCopy)

describe('Data Structure Validation - Copy guards', () => {
  it('should contain no em dashes in any shipped data string', () => {
    const offenders = allCopy.filter(text => text.includes('—') || text.includes('&mdash;'))
    expect(offenders).toEqual([])
  })

  it('should contain no leftover build scaffolding', () => {
    const offenders = allCopy.filter(text =>
      SCAFFOLDING.some(marker => text.includes(marker))
    )
    expect(offenders).toEqual([])
  })

  it('should not use raw HTML arrow entities', () => {
    const offenders = allCopy.filter(text => text.includes('&#8594;') || text.includes('&rarr;'))
    expect(offenders).toEqual([])
  })
})

describe('Data Structure Validation - Service Paths', () => {
  it('should have unique path ids', () => {
    const ids = servicePaths.map(path => path.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have a meaningful good-fit statement on every path', () => {
    servicePaths.forEach(path => {
      expect(path.goodFit.length).toBeGreaterThan(40)
    })
  })

  it('should have a distinct outcome line per path', () => {
    const outcomes = servicePaths.map(path => path.outcome)
    expect(new Set(outcomes).size).toBe(outcomes.length)
  })

  it('should have unique, non-empty capability labels within each path', () => {
    servicePaths.forEach(path => {
      const capabilities = path.capabilities
      expect(new Set(capabilities).size).toBe(capabilities.length)
      capabilities.forEach(capability => {
        expect(capability.trim().length).toBeGreaterThan(0)
      })
    })
  })
})

describe('Data Structure Validation - Project Proof', () => {
  it('should have unique project ids', () => {
    const ids = projectProof.map(project => project.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should use relative asset paths, never absolute urls', () => {
    projectProof.forEach(project => {
      expect(project.screenshot.startsWith('http')).toBe(false)
      expect(project.logo.startsWith('http')).toBe(false)
    })
  })

  it('should have descriptive alt text on every screenshot', () => {
    projectProof.forEach(project => {
      expect(project.screenshotAlt.length).toBeGreaterThan(20)
      expect(project.screenshotAlt.toLowerCase()).not.toBe('screenshot')
    })
  })

  it('should carry at least one project so derived counts never render zero', () => {
    expect(projectProof.length).toBeGreaterThan(0)
  })
})

describe('Data Structure Validation - Case Studies', () => {
  it('should have unique slugs', () => {
    const slugs = caseStudies.map(study => study.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('should have a meta title and description for search', () => {
    caseStudies.forEach(study => {
      expect(typeof study.metaTitle).toBe('string')
      expect(study.metaTitle.length).toBeGreaterThan(0)
    })
  })
})

describe('Data Structure Validation - Work Projects', () => {
  it('should have unique project IDs', () => {
    const ids = workProjects.map(project => project.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('should have all projects with non-empty descriptions', () => {
    workProjects.forEach(project => {
      expect(typeof project.description).toBe('string')
      expect(project.description.length).toBeGreaterThan(20)
    })
  })

  it('should have all projects with at least one service and tech item', () => {
    workProjects.forEach(project => {
      expect(project.services.length).toBeGreaterThan(0)
      expect(project.tech.length).toBeGreaterThan(0)
    })
  })

  it('should have valid gradient color formats', () => {
    workProjects.forEach(project => {
      project.gradient.forEach(color => {
        const isHex = /^#[0-9A-Fa-f]{6}$/.test(color)
        const isRgb = /^rgb\(|^rgba\(/.test(color)
        const isNamed = /^[a-zA-Z]+$/.test(color)
        expect(isHex || isRgb || isNamed).toBe(true)
      })
    })
  })

  it('should use relative paths for logos and background images', () => {
    workProjects.forEach(project => {
      if (project.logo) {
        expect(project.logo.startsWith('http')).toBe(false)
      }
      if (project.backgroundImage) {
        expect(project.backgroundImage.startsWith('http')).toBe(false)
      }
    })
  })

  it('should have at least one live project', () => {
    const live = workProjects.filter(project => project.status === 'Live')
    expect(live.length).toBeGreaterThan(0)
  })
})
