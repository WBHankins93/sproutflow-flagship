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
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('should render contact CTA button', () => {
    render(<Header />)
    expect(screen.getByText('Get a quote')).toBeInTheDocument()
  })
})

describe('Component Rendering - Footer', () => {
  it('should render footer with logo', () => {
    render(<Footer />)
    const logo = screen.getByAltText('Sproutflow Studio')
    expect(logo).toBeInTheDocument()
  })

  it('should render explore links', () => {
    render(<Footer />)
    expect(screen.getByText('Services & Pricing')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
    expect(screen.getByText('How We Work')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
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
    expect(
      screen.getByText(/Custom websites and the business systems behind them/i)
    ).toBeInTheDocument()
  })

  it('should render CTA button linking to the inquiry application', () => {
    render(<HeroSection />)
    const cta = screen.getByText('Book a Discovery Call').closest('a')
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/inquiry')
  })

  it('should render trust badges', () => {
    render(<HeroSection />)
    expect(screen.getByText('Enterprise-Level Thinking')).toBeInTheDocument()
    expect(screen.getByText('Built for Small Businesses')).toBeInTheDocument()
  })
})

describe('Component Rendering - Conditional Logic', () => {
  it('should handle empty data gracefully', () => {
    // Test that components don't crash with empty props
    const { container } = render(<Header />)
    expect(container).toBeTruthy()
  })
})
