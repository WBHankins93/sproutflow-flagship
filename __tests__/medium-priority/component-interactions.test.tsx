/**
 * MEDIUM PRIORITY TESTS: Component Interactions
 *
 * Tests for interactive component behavior:
 * - Header mobile menu toggle
 * - ServicesSection tier cards
 * - Navigation link handling
 * - ContactSection qualification flow (application before calendar time)
 */

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import ServicesSection from '@/components/sections/ServicesSection'
import ContactSection from '@/components/sections/ContactSection'

describe('Component Interactions - Header Mobile Menu', () => {
  it('should toggle mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    // Find mobile menu button
    const menuButton = screen.getByLabelText('Open menu')
    expect(menuButton).toBeInTheDocument()

    // Menu should not be visible initially (on desktop, but we can test the button)
    // Click to open
    await user.click(menuButton)

    // After click, menu should be accessible
    // Note: Actual visibility depends on CSS, but we can test aria-expanded
    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  })

  it('should close mobile menu when X button is clicked', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const menuButton = screen.getByLabelText('Open menu')
    await user.click(menuButton)

    // Click again to close
    await user.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('should have all navigation links in mobile menu', () => {
    render(<Header />)

    // Open mobile menu first
    const menuButton = screen.getByLabelText('Open menu')
    fireEvent.click(menuButton)

    // Check for navigation links (use getAllByText since they appear in both desktop and mobile nav)
    expect(screen.getAllByText('Websites').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Business systems').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Work').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Process').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  })
})

describe('Component Interactions - ServicesSection Tier Cards', () => {
  it('should render service tier cards', () => {
    render(<ServicesSection />)

    // Check for service tier names (use getAllByText since names appear multiple times)
    expect(screen.getAllByText('Launch').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Core').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Custom').length).toBeGreaterThan(0)
  })

  it('should have a CTA on each service card routing to the inquiry application', () => {
    render(<ServicesSection />)

    expect(screen.getByText('Discuss core').closest('a')).toHaveAttribute('href', '/inquiry?package=core')
    expect(screen.getByText('Discuss custom').closest('a')).toHaveAttribute('href', '/inquiry?package=custom')
    expect(screen.getByText('Start here').closest('a')).toHaveAttribute('href', '/launch')
  })

  it('should display price ranges on service cards', () => {
    render(<ServicesSection />)

    // Check for price ranges (use getAllByText since prices appear multiple times)
    expect(screen.getAllByText(/Starting at \$2,000/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Starting at \$4,500/).length).toBeGreaterThan(0)
  })

  it('should publish recurring plan prices', () => {
    render(<ServicesSection />)

    expect(screen.getByText('$200/month')).toBeInTheDocument()
    expect(screen.getByText('$400/month')).toBeInTheDocument()
  })
})

describe('Component Interactions - ContactSection', () => {
  it('should render contact options', () => {
    render(<ContactSection />)

    expect(screen.getByText('Tell me what you want to improve.')).toBeInTheDocument()
  })

  it('should route the discovery CTA to the inquiry application, not the calendar', () => {
    render(<ContactSection />)

    // Qualification funnel: calendar time comes after the application is
    // submitted, so the contact section must never link to the calendar.
    const cta = screen.getByText('Tell us about your project').closest('a')
    expect(cta).toHaveAttribute('href', '/inquiry')
    expect(cta).not.toHaveAttribute('target')

    const calendarLinks = document.querySelectorAll('a[href*="calendar.app.google"]')
    expect(calendarLinks.length).toBe(0)
  })

  it('should display alternative contact methods', () => {
    render(<ContactSection />)

    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
    expect(screen.getByText('(504) 326-1676')).toBeInTheDocument()
  })
})

describe('Component Interactions - Navigation Links', () => {
  it('should have correct anchor links in header', () => {
    render(<Header />)

    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/#about')
  })

  it('should have correct route links in header', () => {
    render(<Header />)

    const workLink = screen.getByText('Work').closest('a')
    expect(workLink).toHaveAttribute('href', '/work')

    const systemsLink = screen.getByText('Business systems').closest('a')
    expect(systemsLink).toHaveAttribute('href', '/business-systems')
  })
})

describe('Component Interactions - Footer Navigation', () => {
  it('should link Website pricing to the homepage pricing section', () => {
    render(<Footer />)

    const pricingLink = screen.getByText('Website pricing').closest('a')
    expect(pricingLink).toHaveAttribute('href', '/#pricing')
  })
})
