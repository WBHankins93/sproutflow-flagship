/**
 * MEDIUM PRIORITY TESTS: Component Interactions
 *
 * Tests for interactive component behavior:
 * - Header mobile menu toggle
 * - Services hub: the three service paths (v2 ServicesSection retired)
 * - Navigation link handling
 * - FooterCta CTAs (booking primary, written inquiry secondary)
 */

import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import ServicesPage from '@/app/services/page'
import ServicePathPage from '@/app/services/[path]/page'
import FooterCta from '@/components/ui/FooterCta'
import Home from '@/app/page'
import FAQPage from '@/app/faq/page'
import { InquiryForm } from '@/components/inquiry/InquiryForm'
import { BOOKING_CTA_LABEL, getBookingHref } from '@/lib/constants'
import { catalogCategories, customQuote, fixedOffers, formatAmount } from '@/data/catalog'
import { listedProjectProof, projectProof } from '@/data/projectProof'

// The Lead Machine is owned by the `hero` worker; the homepage only depends on its export.
jest.mock('@/components/home/hero-machine', () => {
  const Stub = () => <div data-testid="hero-machine" />
  return { __esModule: true, HeroMachine: Stub, default: Stub }
})

/** The "What I build" category list on /services, where the three service paths now live. */
function renderServiceCategories() {
  const utils = render(<ServicesPage />)
  const section = utils.container.querySelector('section[aria-labelledby="services-categories-h"]') as HTMLElement
  return { ...utils, section }
}

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

describe('Component Interactions - Service paths (services hub)', () => {
  it('should render the three service paths', () => {
    const { section } = renderServiceCategories()

    const headings = Array.from(section.querySelectorAll('h3')).map((el) => el.textContent)
    expect(headings).toEqual(catalogCategories.map((category) => category.name))
    expect(headings).toEqual(['Websites', 'Lead & Business Systems', 'Care'])
  })

  it('should have a CTA on each service path routing to its detail page', () => {
    const { section } = renderServiceCategories()

    const pathLinks = section.querySelectorAll('article a[href^="/services/"]')
    expect(pathLinks.length).toBe(3)
    expect(Array.from(pathLinks).map((link) => link.getAttribute('href'))).toEqual([
      '/services/websites',
      '/services/business-systems',
      '/services/growth-support',
    ])
  })

  it('should not expose package names or prices in the path overview', () => {
    // Prices are public since the 29 Oct offers, but they live in the offer
    // block below; the three paths themselves stay price-free.
    const { section } = renderServiceCategories()

    expect(section.textContent).not.toContain('$')
    expect(section.textContent).not.toContain('Starter')
    expect(section.textContent).not.toContain('Foundation')
    expect(section.textContent).not.toContain('Market Leader')
  })

  it('should preserve Shopify among the website capabilities', async () => {
    render(await ServicePathPage({ params: Promise.resolve({ path: 'websites' }) }))

    expect(screen.getByText('Rebuilds and Shopify')).toBeInTheDocument()
  })
})

describe('Component Interactions - Homepage proof', () => {
  it('should show client work without exposing hidden projects', () => {
    const { container } = render(<Home />)

    const hidden = projectProof.filter((project) => !listedProjectProof.includes(project))
    expect(hidden.map((project) => project.name)).toContain('Big Butt Association')
    expect(container.textContent).toContain('Second Line Psychiatry')
    expect(container.querySelector('a[href="/case-studies/second-line-psychiatry"]')).toBeInTheDocument()
    hidden.forEach((project) => {
      expect(container.textContent).not.toContain(project.name)
      expect(container.querySelector(`a[href="${project.href}"]`)).toBeNull()
    })
  })
})

describe('Component Interactions - FAQ', () => {
  it('should publish only catalog prices in visible copy and schema', () => {
    const { container } = render(<FAQPage />)

    // Prices are public since the 29 Oct offers; every figure must be a
    // catalog price or one of the two figures in the verbatim range line.
    const allowed = new Set([
      ...fixedOffers.flatMap((offer) => offer.prices.map((price) => formatAmount(price).replace(/\/mo$/, ''))),
      ...(customQuote.range.match(/\$\d{1,3}(?:,\d{3})*/g) ?? []),
    ])
    const figures = container.innerHTML.match(/\$\d{1,3}(?:,\d{3})*/g) ?? []
    expect(figures.length).toBeGreaterThan(0)
    expect(figures.filter((figure) => !allowed.has(figure))).toEqual([])
    expect(container.innerHTML).not.toContain('$850')
    expect(container.innerHTML).not.toContain('$200')
  })
})

// The v2 ContactSection rendered FooterCta, the closing block on every inner page.
describe('Component Interactions - FooterCta', () => {
  it('should render contact options', () => {
    render(<FooterCta />)

    expect(screen.getByRole('heading', { name: /Tell me what needs to work better/i })).toBeInTheDocument()
  })

  it('should route the primary CTA to booking and the secondary to the written inquiry', () => {
    render(<FooterCta />)

    // Owner-approved (13 Oct 2026): booking a 15-minute call is the primary
    // CTA (/book, or /inquiry until Cal.com is configured) and the written
    // inquiry stays available as the secondary option. The old Google
    // Calendar link must never come back.
    const cta = screen.getByText(BOOKING_CTA_LABEL).closest('a')
    expect(cta).toHaveAttribute('href', getBookingHref())
    expect(cta).not.toHaveAttribute('target')

    const secondary = screen.getByRole('link', { name: 'Or send the details in writing' })
    expect(secondary).toHaveAttribute('href', '/inquiry')

    const calendarLinks = document.querySelectorAll('a[href*="calendar.app.google"]')
    expect(calendarLinks.length).toBe(0)
  })

  it('should display alternative contact methods', () => {
    render(<FooterCta />)

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Phone')).toBeInTheDocument()
  })
})

describe('Component Interactions - InquiryForm', () => {
  it('should offer one explicit undecided path without duplicating it as the prompt', () => {
    render(<InquiryForm />)

    expect(screen.getByRole('option', { name: 'Choose a path' })).toBeInTheDocument()
    expect(screen.getAllByRole('option', { name: 'Not sure yet' }).length).toBe(1)
  })
})

describe('Component Interactions - Navigation Links', () => {
  it('should have correct anchor links in header', () => {
    render(<Header />)

    const aboutLink = screen.getByText('About').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('should have correct route links in header', () => {
    render(<Header />)

    const workLink = screen.getByText('Work').closest('a')
    expect(workLink).toHaveAttribute('href', '/work')

    expect(screen.queryByText('Results')).not.toBeInTheDocument()
  })
})

describe('Component Interactions - Footer Navigation', () => {
  it('should link Services to the services hub', () => {
    render(<Footer />)

    const servicesLink = screen.getByText('Services').closest('a')
    expect(servicesLink).toHaveAttribute('href', '/services')
  })
})
