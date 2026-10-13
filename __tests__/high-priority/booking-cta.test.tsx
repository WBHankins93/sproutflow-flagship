/**
 * HIGH PRIORITY TESTS: Booking CTAs
 *
 * "Book a 15-minute call" is the primary call to action across the site and
 * the written inquiry form stays visible as the secondary option. Booking
 * CTAs point at /book only when NEXT_PUBLIC_CAL_LINK is set; otherwise they
 * fall back to /inquiry, and lines that would link the inquiry page to itself
 * stay hidden.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'
import FooterCta from '@/components/ui/FooterCta'
import InquiryPage from '@/app/inquiry/page'
import ServicePathPage from '@/app/services/[path]/page'
import { InquiryForm } from '@/components/inquiry/InquiryForm'
import { BOOKING_CTA_LABEL, BOOKING_CTA_SHORT } from '@/lib/constants'
import { getServicePath } from '@/data/servicePaths'

const ORIGINAL_CAL = process.env.NEXT_PUBLIC_CAL_LINK
const ORIGINAL_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
const originalFetch = global.fetch

function setEnv(key: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[key]
  } else {
    process.env[key] = value
  }
}

afterEach(() => {
  setEnv('NEXT_PUBLIC_CAL_LINK', ORIGINAL_CAL)
  setEnv('NEXT_PUBLIC_FORMSPREE_FORM_ID', ORIGINAL_FORM_ID)
  global.fetch = originalFetch
  try {
    sessionStorage.clear()
  } catch {
    /* storage unavailable */
  }
})

function cta(container: HTMLElement, name: string) {
  return container.querySelector(`[data-cta="${name}"]`)
}

async function submitInquiryForm() {
  const user = userEvent.setup()
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID = 'test-form'
  const fetchMock = jest.fn().mockResolvedValue({ ok: true })
  global.fetch = fetchMock as unknown as typeof fetch

  const view = render(<InquiryForm />)
  await user.click(screen.getByRole('button', { name: /continue/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))
  await user.type(screen.getByLabelText(/^name/i), 'Test Owner')
  await user.type(screen.getByLabelText(/^email/i), 'owner@example.com')
  await user.click(
    screen.getByRole('button', { name: /send project details/i }),
  )
  expect(
    await screen.findByText('Thanks. Your project is in.'),
  ).toBeInTheDocument()
  expect(fetchMock).toHaveBeenCalledTimes(1)
  return view
}

const states = [
  {
    label: 'booking not configured',
    calLink: undefined,
    bookingHref: '/inquiry',
    configured: false,
  },
  {
    label: 'booking configured',
    calLink: 'sproutflow/15min',
    bookingHref: '/book',
    configured: true,
  },
] as const

for (const { label, calLink, bookingHref, configured } of states) {
  describe(`Booking CTAs (${label})`, () => {
    beforeEach(() => {
      setEnv('NEXT_PUBLIC_CAL_LINK', calLink)
    })

    it('Header desktop and mobile CTAs point at the booking href', () => {
      const { container } = render(<Header />)

      const desktop = cta(container, 'header')
      expect(desktop).toHaveAttribute('href', bookingHref)
      expect(desktop).toHaveTextContent(BOOKING_CTA_SHORT)

      const mobile = cta(container, 'header-mobile')
      expect(mobile).toHaveAttribute('href', bookingHref)
      expect(mobile).toHaveTextContent('Book')
      // Visible text is abbreviated, so the accessible name carries the full label.
      expect(mobile).toHaveAttribute('aria-label', 'Book a 15-minute call')
      expect(
        screen.getByRole('link', { name: 'Book a 15-minute call' }),
      ).toBe(mobile)
      // The desktop pill keeps its visible text as its name.
      expect(desktop).not.toHaveAttribute('aria-label')
    })

    it('FooterCta primary goes to the booking href and the secondary goes to /inquiry', () => {
      const { container } = render(<FooterCta />)

      const primary = cta(container, 'footer')
      expect(primary).toHaveAttribute('href', bookingHref)
      expect(primary).toHaveTextContent(BOOKING_CTA_LABEL)

      const secondary = screen.getByRole('link', {
        name: 'Or send the details in writing',
      })
      expect(secondary).toHaveAttribute('href', '/inquiry')
    })

    it(`inquiry page aside ${configured ? 'shows' : 'hides'} the booking line`, async () => {
      const page = await InquiryPage({ searchParams: Promise.resolve({}) })
      const { container } = render(page)

      const asideLink = cta(container, 'inquiry-aside')
      if (configured) {
        expect(
          screen.getByText(/Rather talk it through\?/),
        ).toBeInTheDocument()
        expect(asideLink).toHaveAttribute('href', '/book')
      } else {
        expect(
          screen.queryByText(/Rather talk it through\?/),
        ).not.toBeInTheDocument()
        expect(asideLink).toBeNull()
      }
    })

    it(`InquiryForm success state ${configured ? 'shows' : 'hides'} the booking link`, async () => {
      const { container } = await submitInquiryForm()

      const successLink = cta(container, 'inquiry-success')
      if (configured) {
        expect(successLink).toHaveAttribute('href', '/book')
      } else {
        expect(successLink).toBeNull()
      }
      // The existing guide link stays either way.
      expect(
        screen.getByRole('link', {
          name: 'Read a useful guide while you wait',
        }),
      ).toBeInTheDocument()
    })

    it('services page renders the booking CTA and the written inquiry link', async () => {
      const service = getServicePath('websites')!
      const page = await ServicePathPage({
        params: Promise.resolve({ path: service.id }),
      })
      const { container } = render(page)

      const primary = cta(container, `service-${service.id}`)
      // The form fallback keeps the service prefill; /book never carries a query.
      const expectedPrimary = bookingHref === '/inquiry' ? `/inquiry?path=${service.id}` : bookingHref
      expect(primary).toHaveAttribute('href', expectedPrimary)
      expect(primary).toHaveTextContent(BOOKING_CTA_LABEL)

      const secondary = screen.getByRole('link', { name: service.ctaLabel })
      expect(secondary).toHaveAttribute('href', `/inquiry?path=${service.id}`)
    })
  })
}

describe('Inquiry page tier mapping', () => {
  it('preselects the website path for the website-rescue tier', async () => {
    const page = await InquiryPage({
      searchParams: Promise.resolve({ tier: 'website-rescue' }),
    })
    render(page)
    const select = screen.getByRole('combobox', {
      name: /which path feels closest/i,
    }) as HTMLSelectElement
    expect(select.value).toBe('Websites that earn trust')
  })
})
