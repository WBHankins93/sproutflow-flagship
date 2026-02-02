/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

/**
 * MEDIUM PRIORITY TESTS: Component Rendering
 * 
 * Tests to ensure components render correctly with proper props
 * and conditional rendering logic.
 */

import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'

describe('Component Rendering - Header', () => {
  it('should render header with logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('Sproutflow Studio')
    expect(logo).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<Header />)
    expect(screen.getByText('How We Work')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
  })

  it('should render contact CTA button', () => {
    render(<Header />)
    expect(screen.getByText("Let's Talk")).toBeInTheDocument()
  })
})

describe('Component Rendering - Footer', () => {
  it('should render footer with logo', () => {
    render(<Footer />)
    const logo = screen.getByAltText('Sproutflow Studio')
    expect(logo).toBeInTheDocument()
  })

  it('should render service links', () => {
    render(<Footer />)
    expect(screen.getByText('Foundation Package')).toBeInTheDocument()
    expect(screen.getByText('Growth Package')).toBeInTheDocument()
    expect(screen.getByText('Market Leader Package')).toBeInTheDocument()
  })

  it('should render contact information', () => {
    render(<Footer />)
    expect(screen.getByText('New Orleans, LA')).toBeInTheDocument()
    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
    expect(screen.getByText('(228) 327-1082')).toBeInTheDocument()
  })

  it('should render copyright notice', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument()
  })
})

describe('Component Rendering - HeroSection', () => {
  it('should render hero headline', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Your small business/i)).toBeInTheDocument()
  })

  it('should render CTA button', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Let's get started today!/i)).toBeInTheDocument()
  })

  it('should render trust badges', () => {
    render(<HeroSection />)
    expect(screen.getByText('Enterprise-Grade Design')).toBeInTheDocument()
    expect(screen.getByText('Small Business Focused')).toBeInTheDocument()
  })
})

describe('Component Rendering - Conditional Logic', () => {
  it('should handle empty data gracefully', () => {
    // Test that components don't crash with empty props
    const { container } = render(<Header />)
    expect(container).toBeTruthy()
  })
})
