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
    const menuButton = screen.getByLabelText('Toggle menu')
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

    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)

    // Click again to close
    await user.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('should have all navigation links in mobile menu', () => {
    render(<Header />)

    // Open mobile menu first
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)

    // Check for navigation links (use getAllByText since they appear in both desktop and mobile nav)
    expect(screen.getAllByText('How We Work').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Case Studies').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  })
})

describe('Component Interactions - ServicesSection Tier Cards', () => {
  it('should render service tier cards', () => {
    render(<ServicesSection />)

    // Check for service tier names (use getAllByText since names appear multiple times)
    expect(screen.getAllByText('Starter').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Foundation').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Growth').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Market Leader').length).toBeGreaterThan(0)
  })

  it('should have a CTA on each service card routing to the inquiry application', () => {
    render(<ServicesSection />)

    const tierButtons = screen.getAllByText('Start this tier')
    expect(tierButtons.length).toBe(4)
    tierButtons.forEach((button) => {
      expect(button.closest('a')).toHaveAttribute('href', '/inquiry')
    })
  })

  it('should display price ranges on service cards', () => {
    render(<ServicesSection />)

    // Check for price ranges (use getAllByText since prices appear multiple times)
    expect(screen.getAllByText(/\$2,000 - \$2,800/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/\$7,500\+/).length).toBeGreaterThan(0)
  })

  it('should show "Most Popular" badge on Foundation tier', () => {
    render(<ServicesSection />)

    expect(screen.getByText('Most Popular')).toBeInTheDocument()
  })
})

describe('Component Interactions - ContactSection', () => {
  it('should render contact options', () => {
    render(<ContactSection />)

    expect(screen.getByText('Discovery Call')).toBeInTheDocument()
  })

  it('should route the discovery CTA to the inquiry application, not the calendar', () => {
    render(<ContactSection />)

    // Qualification funnel: calendar time comes after the application is
    // submitted, so the contact section must never link to the calendar.
    const cta = screen.getByText('Book a Discovery Call').closest('a')
    expect(cta).toHaveAttribute('href', '/inquiry')
    expect(cta).not.toHaveAttribute('target')

    const calendarLinks = document.querySelectorAll('a[href*="calendar.app.google"]')
    expect(calendarLinks.length).toBe(0)
  })

  it('should display alternative contact methods', () => {
    render(<ContactSection />)

    expect(screen.getByText('Send an Email')).toBeInTheDocument()
    expect(screen.getByText('Give Us a Call')).toBeInTheDocument()
  })
})

describe('Component Interactions - Navigation Links', () => {
  it('should have correct anchor links in header', () => {
    render(<Header />)

    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '#about')
  })

  it('should have correct route links in header', () => {
    render(<Header />)

    const workLink = screen.getByText('Portfolio').closest('a')
    expect(workLink).toHaveAttribute('href', '/work')

    const caseStudiesLink = screen.getByText('Case Studies').closest('a')
    expect(caseStudiesLink).toHaveAttribute('href', '/case-studies')
  })
})

describe('Component Interactions - Footer Navigation', () => {
  it('should link Services & Pricing to the homepage services section', () => {
    render(<Footer />)

    const servicesLink = screen.getByText('Services & Pricing').closest('a')
    expect(servicesLink).toHaveAttribute('href', '/#services')
  })
})
