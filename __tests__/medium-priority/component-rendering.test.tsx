/**
 * MEDIUM PRIORITY TESTS: Component Rendering
 *
 * Tests to ensure components render correctly with proper props
 * and conditional rendering logic.
 */

import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import HomeHero from '@/components/home/HomeHero'
import { homeHero } from '@/data/home'
import WorkPage from '@/app/work/page'
import { BOOKING_CTA_LABEL, BOOKING_CTA_SHORT, getBookingHref } from '@/lib/constants'

// The Lead Machine is owned by the `hero` worker and has its own tests.
jest.mock('@/components/home/hero-machine', () => {
  const Stub = () => <div data-testid="hero-machine" />
  return { __esModule: true, HeroMachine: Stub, default: Stub }
})

describe('Component Rendering - Header', () => {
  it('should render header with logo', () => {
    render(<Header />)
    const logo = screen.getByAltText('Sproutflow Studio')
    expect(logo).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Websites')).toBeInTheDocument()
    expect(screen.getByText('Systems')).toBeInTheDocument()
    expect(screen.getByText('Care')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Free check')).toBeInTheDocument()
  })

  it('should render contact CTA button', () => {
    render(<Header />)
    expect(BOOKING_CTA_SHORT).toBe('Book a call')
    const cta = screen.getByText('Book a call').closest('a')
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', getBookingHref())
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
    expect(screen.getByText('How I handle your data')).toBeInTheDocument()
    expect(screen.getByText('Common questions')).toBeInTheDocument()
  })

  it('should render contact information', () => {
    render(<Footer />)
    expect(screen.getByText('Based in New Orleans. Working with businesses anywhere.')).toBeInTheDocument()
    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
    expect(screen.getByText('(504) 326-1676')).toBeInTheDocument()
  })

  it('should render copyright notice', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument()
  })
})

describe('Component Rendering - HomeHero', () => {
  it('should render hero headline', () => {
    render(<HomeHero />)
    expect(screen.getByRole('heading', { level: 1, name: 'Find the leaks. Fix the site. Book the work.' })).toBeInTheDocument()
  })

  it('should render the booking CTA, using the booking href', () => {
    render(<HomeHero />)
    expect(BOOKING_CTA_LABEL).toBe('Book a 15-minute call')
    expect(homeHero.primaryCta).toBe(BOOKING_CTA_LABEL)
    const cta = screen.getByText('Book a 15-minute call').closest('a')
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', getBookingHref())
  })

  it('should render trust badges', () => {
    // v3 names the studio in the eyebrow and says you work directly with Ben in his note.
    render(<HomeHero />)
    expect(screen.getByText('Sproutflow Studio · Websites, lead systems and care')).toBeInTheDocument()
    expect(screen.getByText(homeHero.note)).toBeInTheDocument()
    expect(homeHero.note).toContain('You’ll talk to me')
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

    // Match the h1's full textContent rather than a single text node.
    expect(container.querySelector('h1')?.textContent).toBe('The work, and what changed after.')
    // The figure renders in mono and the rest in body, so match the squashed text.
    const text = (container.textContent ?? '').replace(/\s+/g, ' ')
    expect(text).toContain('50% more qualified inquiries')
    expect(text).toContain('30% customer acquisition growth')
    expect(container.querySelector('a[href="/case-studies/second-line-psychiatry"]')).toBeInTheDocument()
    expect(container.querySelector('section[aria-label="Sproutflow client work"]')).toBeInTheDocument()
    expect(container.textContent).not.toContain('Big Butt Association')
  })
})
