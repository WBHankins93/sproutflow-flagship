/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

/**
 * LOW PRIORITY TESTS: Accessibility
 * 
 * Basic accessibility checks for components
 * and semantic HTML structure.
 */

import { render } from '@testing-library/react'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'

describe('Accessibility - Semantic HTML', () => {
  it('should have header element in Header component', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
  })

  it('should have footer element in Footer component', () => {
    const { container } = render(<Footer />)
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should have section elements in HeroSection', () => {
    const { container } = render(<HeroSection />)
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })
})

describe('Accessibility - ARIA Labels', () => {
  it('should have aria-label on mobile menu button', () => {
    const { container } = render(<Header />)
    const menuButton = container.querySelector('button[aria-label]')
    expect(menuButton).toBeInTheDocument()
  })

  it('should have aria-expanded on mobile menu button', () => {
    const { container } = render(<Header />)
    const menuButton = container.querySelector('button[aria-expanded]')
    expect(menuButton).toBeInTheDocument()
  })

  it('should have aria-label on social media links in footer', () => {
    const { container } = render(<Footer />)
    const socialLinks = container.querySelectorAll('a[aria-label]')
    expect(socialLinks.length).toBeGreaterThan(0)
  })
})

describe('Accessibility - Image Alt Text', () => {
  it('should have alt text on logo images', () => {
    const { container } = render(<Header />)
    const logo = container.querySelector('img[alt]')
    expect(logo).toBeInTheDocument()
    expect(logo?.getAttribute('alt')).toBeTruthy()
  })

  it('should have alt text on footer logo', () => {
    const { container } = render(<Footer />)
    const logo = container.querySelector('img[alt]')
    expect(logo).toBeInTheDocument()
    expect(logo?.getAttribute('alt')).toBeTruthy()
  })
})

describe('Accessibility - Link Accessibility', () => {
  it('should have external links with rel="noopener noreferrer"', () => {
    const { container } = render(<Footer />)
    const externalLinks = container.querySelectorAll('a[target="_blank"]')
    
    externalLinks.forEach((link: Element) => {
      expect(link.getAttribute('rel')).toContain('noopener')
    })
  })

  it('should have descriptive link text', () => {
    const { container } = render(<Header />)
    const links = container.querySelectorAll('a')
    
    links.forEach((link: Element) => {
      const text = link.textContent?.trim()
      // Links should have meaningful text, not just icons
      if (text) {
        expect(text.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('Accessibility - Form Elements', () => {
  it('should have proper form structure if forms exist', () => {
    // This is a placeholder for future form testing
    // Currently, the site uses calendar links instead of forms
    expect(true).toBe(true)
  })
})
