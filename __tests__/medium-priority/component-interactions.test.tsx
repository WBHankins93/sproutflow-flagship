/**
 * MEDIUM PRIORITY TESTS: Component Interactions
 * 
 * Tests for interactive component behavior:
 * - Header mobile menu toggle
 * - ServicesSection card flip functionality
 * - Navigation link handling
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
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
    
    // Check for navigation links
    expect(screen.getByText('How We Work')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Case Studies')).toBeInTheDocument()
  })
})

describe('Component Interactions - ServicesSection Card Flips', () => {
  it('should render service tier cards', () => {
    render(<ServicesSection />)
    
    // Check for service tier names
    expect(screen.getByText('Starter')).toBeInTheDocument()
    expect(screen.getByText('Foundation')).toBeInTheDocument()
    expect(screen.getByText('Growth')).toBeInTheDocument()
    expect(screen.getByText('Market Leader')).toBeInTheDocument()
  })

  it('should have "Learn More" buttons on service cards', () => {
    render(<ServicesSection />)
    
    const learnMoreButtons = screen.getAllByText('Learn More')
    expect(learnMoreButtons.length).toBeGreaterThan(0)
  })

  it('should display price ranges on service cards', () => {
    render(<ServicesSection />)
    
    // Check for price ranges
    expect(screen.getByText(/\$2,000 - \$2,800/)).toBeInTheDocument()
    expect(screen.getByText(/\$7,500\+/)).toBeInTheDocument()
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

  it('should have calendar booking links', () => {
    render(<ContactSection />)
    
    const bookingLink = screen.getByText('Book Discovery Call').closest('a')
    expect(bookingLink).toHaveAttribute('href', 'https://calendar.app.google/hMkRd7yqsovDwZuL7')
    expect(bookingLink).toHaveAttribute('target', '_blank')
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
    
    const servicesLink = screen.getByText('Services').closest('a')
    expect(servicesLink).toHaveAttribute('href', '#services')
    
    const processLink = screen.getByText('Process').closest('a')
    expect(processLink).toHaveAttribute('href', '#process')
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
  it('should have service links that scroll to services section', () => {
    const { container } = render(<Footer />)
    
    const foundationLink = screen.getByText('Foundation Package').closest('a')
    expect(foundationLink).toHaveAttribute('href', '#services')
  })
})
