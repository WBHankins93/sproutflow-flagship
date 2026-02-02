/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

/**
 * HIGH PRIORITY TESTS: Contact Links Functionality
 * 
 * Tests to ensure contact links (email, phone) are correctly formatted
 * and point to the right destinations.
 */

import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'
import ContactSection from '@/components/sections/ContactSection'

describe('Contact Links - Footer', () => {
  it('should have correct email mailto link', () => {
    render(<Footer />)
    const emailLink = screen.getByText('ben@sproutflow-studio.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:ben@sproutflow-studio.com')
  })

  it('should have correct phone tel link', () => {
    render(<Footer />)
    const phoneLink = screen.getByText('(228) 327-1082').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+12283271082')
  })

  it('should display correct email address', () => {
    render(<Footer />)
    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
  })

  it('should display correct phone number', () => {
    render(<Footer />)
    expect(screen.getByText('(228) 327-1082')).toBeInTheDocument()
  })
})

describe('Contact Links - ContactSection', () => {
  it('should have correct email mailto link', () => {
    render(<ContactSection />)
    const emailLink = screen.getByText('ben@sproutflow-studio.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:ben@sproutflow-studio.com')
  })

  it('should have correct phone tel link', () => {
    render(<ContactSection />)
    const phoneLink = screen.getByText('(228) 327-1082').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+12283271082')
  })

  it('should display correct email address', () => {
    render(<ContactSection />)
    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
  })

  it('should display correct phone number', () => {
    render(<ContactSection />)
    expect(screen.getByText('(228) 327-1082')).toBeInTheDocument()
  })
})

describe('Contact Links - Format Validation', () => {
  const CORRECT_EMAIL = 'ben@sproutflow-studio.com'
  const CORRECT_PHONE_DISPLAY = '(228) 327-1082'
  const CORRECT_PHONE_TEL = '+12283271082'

  it('should validate email format matches expected', () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    expect(emailRegex.test(CORRECT_EMAIL)).toBe(true)
  })

  it('should validate phone display format', () => {
    const phoneDisplayRegex = /^\(\d{3}\) \d{3}-\d{4}$/
    expect(phoneDisplayRegex.test(CORRECT_PHONE_DISPLAY)).toBe(true)
  })

  it('should validate tel: link format', () => {
    const telRegex = /^\+?\d{10,}$/
    expect(telRegex.test(CORRECT_PHONE_TEL)).toBe(true)
  })

  it('should convert display phone to tel format correctly', () => {
    // Remove all non-digit characters except leading +
    const telFormat = CORRECT_PHONE_DISPLAY.replace(/\D/g, '')
    expect(telFormat).toBe('2283271082')
    expect(`+1${telFormat}`).toBe(CORRECT_PHONE_TEL)
  })
})
