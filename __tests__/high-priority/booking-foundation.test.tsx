/**
 * HIGH PRIORITY TESTS: Booking foundation
 *
 * Booking must degrade safely. When NEXT_PUBLIC_CAL_LINK is "off", booking
 * CTAs point at /inquiry, /book redirects to /inquiry, and the sitemap
 * leaves /book out.
 */

import { render, screen } from '@testing-library/react'
import {
  BOOKING_CTA_LABEL,
  DEFAULT_CAL_LINK,
  getBookingHref,
  getCalLink,
  getCalPublicUrl,
  isBookingConfigured,
} from '@/lib/constants'
import { BookCallLink } from '@/components/ui/BookCallLink'
import BookPage from '@/app/book/page'
import sitemap from '@/app/sitemap'

const REDIRECT_ERROR = 'NEXT_REDIRECT'
const mockRedirect = jest.fn((url: string) => {
  // next/navigation redirect() throws to halt rendering; mirror that.
  throw new Error(`${REDIRECT_ERROR}:${url}`)
})

jest.mock('next/navigation', () => ({
  redirect: (url: string) => mockRedirect(url),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back: jest.fn() }),
  usePathname: () => '/',
}))

// Keep Cal.com's embed script out of jsdom.
jest.mock('@/components/booking/CalEmbed', () => ({
  __esModule: true,
  CalEmbed: ({ calLink }: { calLink: string }) => <div data-testid="cal-embed" data-cal-link={calLink} />,
  default: ({ calLink }: { calLink: string }) => <div data-testid="cal-embed" data-cal-link={calLink} />,
}))

const ORIGINAL = process.env.NEXT_PUBLIC_CAL_LINK

function setCalLink(value: string | undefined) {
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_CAL_LINK
  } else {
    process.env.NEXT_PUBLIC_CAL_LINK = value
  }
}

beforeEach(() => {
  setCalLink('off')
  mockRedirect.mockClear()
})

afterEach(() => {
  setCalLink(ORIGINAL)
})

describe('getCalLink', () => {
  it('uses the default Sproutflow link when unset', () => {
    setCalLink(undefined)
    expect(getCalLink()).toBe(DEFAULT_CAL_LINK)
    expect(DEFAULT_CAL_LINK).toBe('ben-hankins-sproutflow-studio/15min')
    expect(isBookingConfigured()).toBe(true)
    expect(getBookingHref()).toBe('/book')
    expect(getCalPublicUrl()).toBe('https://cal.com/ben-hankins-sproutflow-studio/15min')
  })

  it('returns null when turned off', () => {
    expect(getCalLink()).toBeNull()
    expect(isBookingConfigured()).toBe(false)
    expect(getCalPublicUrl()).toBeNull()
  })

  it('treats OFF in any case as turned off', () => {
    setCalLink(' OFF ')
    expect(getCalLink()).toBeNull()
  })

  it('returns a plain link path as is', () => {
    setCalLink('sproutflow/15min')
    expect(getCalLink()).toBe('sproutflow/15min')
    expect(getCalPublicUrl()).toBe('https://cal.com/sproutflow/15min')
  })

  it('normalizes a pasted full Cal.com URL', () => {
    setCalLink('  https://cal.com/sproutflow/15min ')
    expect(getCalLink()).toBe('sproutflow/15min')
  })

  it('strips a leading slash', () => {
    setCalLink('/sproutflow/15min')
    expect(getCalLink()).toBe('sproutflow/15min')
  })

  it('treats whitespace as unset', () => {
    setCalLink('   ')
    expect(getCalLink()).toBeNull()
    expect(isBookingConfigured()).toBe(false)
  })
})

describe('getBookingHref', () => {
  it('points at /inquiry when turned off', () => {
    expect(getBookingHref()).toBe('/inquiry')
  })

  it('points at /book when set', () => {
    setCalLink('sproutflow/15min')
    expect(getBookingHref()).toBe('/book')
  })
})

describe('BookCallLink', () => {
  it('renders the default label', () => {
    render(<BookCallLink />)
    expect(screen.getByRole('link', { name: BOOKING_CTA_LABEL })).toBeInTheDocument()
    expect(BOOKING_CTA_LABEL).toBe('Book a 15-minute call')
  })

  it('links to /inquiry when booking is turned off', () => {
    render(<BookCallLink />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/inquiry')
  })

  it('links to /book when booking is configured', () => {
    setCalLink('sproutflow/15min')
    render(<BookCallLink />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/book')
  })

  it('passes className, data-cta, and custom children through', () => {
    render(
      <BookCallLink className="btn-primary" data-cta="hero">
        Talk it through
      </BookCallLink>
    )
    const link = screen.getByRole('link', { name: 'Talk it through' })
    expect(link).toHaveClass('btn-primary')
    expect(link).toHaveAttribute('data-cta', 'hero')
  })
})

describe('/book page', () => {
  it('redirects to /inquiry when booking is not configured', () => {
    expect(() => BookPage()).toThrow(REDIRECT_ERROR)
    expect(mockRedirect).toHaveBeenCalledWith('/inquiry')
  })

  it('renders the scheduler and fallbacks when configured', () => {
    setCalLink('https://cal.com/sproutflow/15min')
    render(BookPage())

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(screen.getByRole('heading', { level: 1, name: 'Pick a time that works.' })).toBeInTheDocument()

    const embed = screen.getByTestId('cal-embed')
    expect(embed).toHaveAttribute('data-cal-link', 'sproutflow/15min')

    const links = screen.getAllByRole('link')
    expect(links.some((a) => a.getAttribute('href') === '/inquiry')).toBe(true)
    expect(links.some((a) => a.getAttribute('href') === 'tel:+15043261676')).toBe(true)
    expect(links.some((a) => a.getAttribute('href') === 'mailto:ben@sproutflow-studio.com')).toBe(true)
  })
})

describe('sitemap', () => {
  const hasBook = () => sitemap().some((entry) => entry.url.endsWith('/book'))

  it('omits /book when booking is not configured', () => {
    expect(hasBook()).toBe(false)
    expect(sitemap().some((entry) => entry.url.endsWith('/inquiry'))).toBe(true)
  })

  it('includes /book when booking is configured', () => {
    setCalLink('sproutflow/15min')
    expect(hasBook()).toBe(true)
  })
})
