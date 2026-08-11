/**
 * MEDIUM PRIORITY TESTS: Component Interactions
 *
 * Tests for interactive component behavior:
 * - Header mobile menu toggle
 * - ServicesSection service paths
 * - Navigation link handling
 * - ContactSection qualification flow (application before calendar time)
 */

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import ServicesSection from '@/components/sections/ServicesSection'
import ContactSection from '@/components/sections/ContactSection'
import HeroSection from '@/components/sections/HeroSection'
import FAQPage from '@/app/faq/page'

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
    expect(screen.getAllByText('Work').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
  })
})

describe('Component Interactions - ServicesSection Paths', () => {
  it('should render the three service paths', () => {
    render(<ServicesSection />)

    expect(screen.getByText('Websites that earn trust')).toBeInTheDocument()
    expect(screen.getByText('Systems that remove friction')).toBeInTheDocument()
    expect(screen.getByText('Ongoing growth and support')).toBeInTheDocument()
  })

  it('should have a CTA on each service path routing to the inquiry application', () => {
    const { container } = render(<ServicesSection />)

    const pathLinks = container.querySelectorAll('article a[href="/inquiry"]')
    expect(pathLinks.length).toBe(3)
    pathLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/inquiry')
    })
  })

  it('should not expose package names or prices', () => {
    const { container } = render(<ServicesSection />)

    expect(container.textContent).not.toContain('$')
    expect(screen.queryByText('Starter')).not.toBeInTheDocument()
    expect(screen.queryByText('Foundation')).not.toBeInTheDocument()
    expect(screen.queryByText('Market Leader')).not.toBeInTheDocument()
  })

  it('should preserve Shopify among the website capabilities', () => {
    render(<ServicesSection />)

    expect(screen.getByText('Rebuilds and Shopify')).toBeInTheDocument()
  })
})

describe('Component Interactions - Project Reel', () => {
  it('should expose every featured client as a direct control', () => {
    render(<HeroSection />)

    expect(screen.getByRole('button', { name: 'Show Second Line Psychiatry' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show NOLA Pool Solutions' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Nealy Event Decor' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show DJN Services' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show Big Butt Association' })).toBeInTheDocument()
  })

  it('should keep the founder portrait out of the hero', () => {
    render(<HeroSection />)

    expect(screen.queryByAltText(/Ben Hankins/i)).not.toBeInTheDocument()
  })
})

describe('Component Interactions - FAQ', () => {
  it('should not publish price markers in visible copy or schema', () => {
    const { container } = render(<FAQPage />)

    expect(container.textContent).not.toContain('$')
    expect(container.innerHTML).not.toContain('$850')
    expect(container.innerHTML).not.toContain('$200')
  })
})

describe('Component Interactions - ContactSection', () => {
  it('should render contact options', () => {
    render(<ContactSection />)

    expect(screen.getByText('Tell me what needs to work better.')).toBeInTheDocument()
  })

  it('should route the discovery CTA to the inquiry application, not the calendar', () => {
    render(<ContactSection />)

    // Qualification funnel: calendar time comes after the application is
    // submitted, so the contact section must never link to the calendar.
    const cta = screen.getByText('Tell me about your project').closest('a')
    expect(cta).toHaveAttribute('href', '/inquiry')
    expect(cta).not.toHaveAttribute('target')

    const calendarLinks = document.querySelectorAll('a[href*="calendar.app.google"]')
    expect(calendarLinks.length).toBe(0)
  })

  it('should display alternative contact methods', () => {
    render(<ContactSection />)

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
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

    const workLink = screen.getByText('Work').closest('a')
    expect(workLink).toHaveAttribute('href', '/work')

    expect(screen.queryByText('Results')).not.toBeInTheDocument()
  })
})

describe('Component Interactions - Footer Navigation', () => {
  it('should link Services to the homepage services section', () => {
    render(<Footer />)

    const servicesLink = screen.getByText('Services').closest('a')
    expect(servicesLink).toHaveAttribute('href', '/#services')
  })
})
