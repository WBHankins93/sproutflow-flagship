/**
 * HIGH PRIORITY TESTS: Contact Links Functionality
 * 
 * Tests to ensure contact links (email, phone) are correctly formatted
 * and point to the right destinations.
 */

import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'
import BookSection from '@/components/home/BookSection'
import FooterCta from '@/components/ui/FooterCta'
import Home from '@/app/page'
import { homeBook } from '@/data/home'

// The Lead Machine is owned by the `hero` worker; these tests only need the page around it.
jest.mock('@/components/home/hero-machine', () => {
  const Stub = () => <div data-testid="hero-machine" />
  return { __esModule: true, HeroMachine: Stub, default: Stub }
})

describe('Contact Links - Footer', () => {
  it('should have correct email mailto link', () => {
    render(<Footer />)
    const emailLink = screen.getByText('ben@sproutflow-studio.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:ben@sproutflow-studio.com')
  })

  it('should have correct phone tel link', () => {
    render(<Footer />)
    const phoneLink = screen.getByText('(504) 326-1676').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+15043261676')
  })

  it('should display correct email address', () => {
    render(<Footer />)
    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
  })

  it('should display correct phone number', () => {
    render(<Footer />)
    expect(screen.getByText('(504) 326-1676')).toBeInTheDocument()
  })
})

// The v2 ContactSection was a wrapper around FooterCta, the closing contact
// block every inner page still renders, so its assertions run on FooterCta.
describe('Contact Links - FooterCta (inner pages)', () => {
  it('should have correct email mailto link', () => {
    render(<FooterCta />)
    const emailLink = screen.getByText('ben@sproutflow-studio.com').closest('a')
    expect(emailLink).toHaveAttribute('href', 'mailto:ben@sproutflow-studio.com')
  })

  it('should have correct phone tel link', () => {
    render(<FooterCta />)
    const phoneLink = screen.getByText('(504) 326-1676').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+15043261676')
  })

  it('should display correct email address', () => {
    render(<FooterCta />)
    expect(screen.getByText('ben@sproutflow-studio.com')).toBeInTheDocument()
  })

  it('should display correct phone number', () => {
    render(<FooterCta />)
    expect(screen.getByText('(504) 326-1676')).toBeInTheDocument()
  })
})

// On the homepage the closing contact block is BookSection (the phone) above
// the Footer (email and phone).
describe('Contact Links - homepage BookSection and Footer', () => {
  it('should have correct phone tel link in BookSection', () => {
    render(<BookSection />)
    expect(homeBook.phoneDisplay).toBe('(504) 326-1676')
    const phoneLink = screen.getByText('(504) 326-1676').closest('a')
    expect(phoneLink).toHaveAttribute('href', 'tel:+15043261676')
  })

  it('should give the homepage a working mailto and tel link in every contact block', () => {
    const { container } = render(<Home />)
    const book = container.querySelector('section#book')!
    expect(book.querySelector('a[href="tel:+15043261676"]')).toHaveTextContent('(504) 326-1676')

    const footer = container.querySelector('footer')!
    expect(footer.querySelector('a[href="mailto:ben@sproutflow-studio.com"]')).toHaveTextContent(
      'ben@sproutflow-studio.com',
    )
    expect(footer.querySelector('a[href="tel:+15043261676"]')).toHaveTextContent('(504) 326-1676')

    // Every contact link on the page uses the one correct address and number.
    container.querySelectorAll('a[href^="mailto:"]').forEach((link) =>
      expect(link).toHaveAttribute('href', 'mailto:ben@sproutflow-studio.com'),
    )
    container.querySelectorAll('a[href^="tel:"]').forEach((link) =>
      expect(link).toHaveAttribute('href', 'tel:+15043261676'),
    )
  })
})

describe('Contact Links - Format Validation', () => {
  const CORRECT_EMAIL = 'ben@sproutflow-studio.com'
  const CORRECT_PHONE_DISPLAY = '(504) 326-1676'
  const CORRECT_PHONE_TEL = '+15043261676'

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
    expect(telFormat).toBe('5043261676')
    expect(`+1${telFormat}`).toBe(CORRECT_PHONE_TEL)
  })
})
