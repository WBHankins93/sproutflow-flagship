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
import WorkPage from '@/app/work/page'

describe('Component Rendering - Header', () => {
  it('should render header with logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('Sproutflow Studio')
    expect(logo).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('should render contact CTA button', () => {
    render(<Header />)
    expect(screen.getByText('Tell me about your project')).toBeInTheDocument()
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
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('How We Handle Your Data')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
  })

  it('should render contact information', () => {
    render(<Footer />)
    expect(screen.getByText('New Orleans, LA')).toBeInTheDocument()
    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
    expect(screen.getByText('(504) 326-1676')).toBeInTheDocument()
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
      screen.getByText(/Make it easier for customers to choose you/i)
    ).toBeInTheDocument()
  })

  it('should render CTA button linking to the inquiry application', () => {
    render(<HeroSection />)
    const cta = screen.getByText('Tell me about your project').closest('a')
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/inquiry')
  })

  it('should render trust badges', () => {
    render(<HeroSection />)
    expect(screen.getByText(/New Orleans studio/i)).toBeInTheDocument()
    expect(screen.getByText(/Working directly with Ben/i)).toBeInTheDocument()
  })
})

describe('Component Rendering - Conditional Logic', () => {
  it('should handle empty data gracefully', () => {
    // Test that components don't crash with empty props
    const { container } = render(<Header />)
    expect(container).toBeTruthy()
  })
})

describe('Component Rendering - Unified Work Page', () => {
  it('should present client work and results in one destination', () => {
    const { container } = render(<WorkPage />)

    expect(screen.getByText('What changed, shown with the work.')).toBeInTheDocument()
    expect(screen.getByText('50% more qualified inquiries')).toBeInTheDocument()
    expect(screen.getByText('30% customer acquisition growth')).toBeInTheDocument()
    expect(container.querySelector('a[href="/case-studies/second-line-psychiatry"]')).toBeInTheDocument()
    expect(container.querySelector('section[aria-label="Sproutflow client work"]')).toBeInTheDocument()
  })
})
