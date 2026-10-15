/**
 * HIGH PRIORITY TESTS: Inquiry form accessibility
 *
 * A live QA sweep found that a failed submit left visitors stranded: the
 * error text was muted green, the inputs did not change, focus stayed on the
 * Send button, and on mobile the Name field sat above the viewport. Step
 * changes also left the new heading scrolled out of view. These tests pin the
 * fixes so the only conversion path on the site stays usable.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InquiryForm } from '@/components/inquiry/InquiryForm'

const originalFetch = global.fetch
const originalScrollIntoView = Element.prototype.scrollIntoView
let scrollIntoView: jest.Mock
let scrolledElements: Element[]

beforeEach(() => {
  scrolledElements = []
  scrollIntoView = jest.fn(function (this: Element) {
    scrolledElements.push(this)
  })
  Element.prototype.scrollIntoView = scrollIntoView as unknown as Element['scrollIntoView']
})

afterEach(() => {
  Element.prototype.scrollIntoView = originalScrollIntoView
  global.fetch = originalFetch
  try {
    sessionStorage.clear()
  } catch {
    /* storage unavailable */
  }
})

async function goToContactStep() {
  const user = userEvent.setup()
  const utils = render(<InquiryForm />)
  await user.click(screen.getByRole('button', { name: /continue/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))
  return { user, ...utils }
}

describe('InquiryForm contact step errors', () => {
  it('marks empty name and email invalid, links the visible messages, and focuses name', async () => {
    const { user } = await goToContactStep()
    await user.click(screen.getByRole('button', { name: /send project details/i }))

    const name = screen.getByLabelText(/^name/i)
    const email = screen.getByLabelText(/^email/i)
    const nameMessage = screen.getByText('Enter your name.')
    const emailMessage = screen.getByText('Enter your email.')

    expect(name).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAttribute('aria-invalid', 'true')

    const nameErrorEl = nameMessage.closest('p') as HTMLElement
    const emailErrorEl = emailMessage.closest('p') as HTMLElement
    expect(nameErrorEl.id.length).toBeGreaterThan(0)
    expect(name.getAttribute('aria-describedby')).toBe(nameErrorEl.id)
    expect(email.getAttribute('aria-describedby')).toBe(emailErrorEl.id)

    // Not color-only: screen readers hear an "Error:" prefix.
    expect(nameErrorEl).toHaveTextContent('Error: Enter your name.')
    expect(nameErrorEl).toHaveClass('text-red-700')
    expect(name).toHaveClass('border-red-700')

    expect(document.activeElement).toBe(name)
    expect(scrolledElements.includes(name)).toBe(true)
  })

  it('clears each message as the visitor fixes the field', async () => {
    const { user } = await goToContactStep()
    await user.click(screen.getByRole('button', { name: /send project details/i }))

    const name = screen.getByLabelText(/^name/i)
    const email = screen.getByLabelText(/^email/i)

    await user.type(name, 'Test Owner')
    expect(screen.queryByText('Enter your name.')).toBeNull()
    expect(name.hasAttribute('aria-invalid')).toBe(false)
    expect(name.hasAttribute('aria-describedby')).toBe(false)
    // Email is still empty, so its message stays.
    expect(screen.getByText('Enter your email.')).toBeInTheDocument()

    await user.type(email, 'owner@example.com')
    expect(screen.queryByText('Enter your email.')).toBeNull()
    expect(screen.queryByText('Enter a valid email address.')).toBeNull()
    expect(email.hasAttribute('aria-invalid')).toBe(false)
  })

  it('focuses email when only the email is missing', async () => {
    const { user } = await goToContactStep()
    await user.type(screen.getByLabelText(/^name/i), 'Test Owner')
    await user.click(screen.getByRole('button', { name: /send project details/i }))

    expect(screen.queryByText('Enter your name.')).toBeNull()
    expect(document.activeElement).toBe(screen.getByLabelText(/^email/i))
  })

  it('announces a failed submission with role="alert"', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('network down'))) as unknown as typeof fetch
    const { user } = await goToContactStep()
    await user.type(screen.getByLabelText(/^name/i), 'Test Owner')
    await user.type(screen.getByLabelText(/^email/i), 'owner@example.com')
    await user.click(screen.getByRole('button', { name: /send project details/i }))

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Something went wrong. Try again or email me directly.')
  })
})

describe('InquiryForm step changes', () => {
  it('does not scroll or move focus on first render', () => {
    render(<InquiryForm />)
    expect(scrollIntoView).toHaveBeenCalledTimes(0)
    expect(document.activeElement).toBe(document.body)
  })

  it('does not scroll when a saved draft restores a later step', async () => {
    sessionStorage.setItem('sproutflow-inquiry-draft', JSON.stringify({ step: 2, data: {} }))
    render(<InquiryForm />)
    expect(await screen.findByText('What would useful progress look like?')).toBeInTheDocument()
    expect(scrollIntoView).toHaveBeenCalledTimes(0)
    expect(document.activeElement).toBe(document.body)
  })

  it('moves focus to the new step heading and scrolls it into view on Continue', async () => {
    const user = userEvent.setup()
    render(<InquiryForm />)
    await user.click(screen.getByRole('button', { name: /continue/i }))

    const legend = screen.getByText('What would useful progress look like?')
    expect(legend.tagName).toBe('LEGEND')
    expect(legend).toHaveAttribute('tabindex', '-1')
    expect(document.activeElement).toBe(legend)
    expect(scrollIntoView).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: /continue/i }))
    expect(document.activeElement).toBe(screen.getByText('How can I reach you?'))
    expect(scrollIntoView).toHaveBeenCalledTimes(2)
  })

  it('moves focus to the previous step heading on Back', async () => {
    const user = userEvent.setup()
    render(<InquiryForm />)
    await user.click(screen.getByRole('button', { name: /continue/i }))
    await user.click(screen.getByRole('button', { name: /back/i }))

    expect(document.activeElement).toBe(screen.getByText('What is happening now?'))
    expect(scrollIntoView).toHaveBeenCalledTimes(2)
  })

  it('skips smooth scrolling when the visitor prefers reduced motion', async () => {
    const originalMatchMedia = window.matchMedia
    window.matchMedia = ((query: string) => ({
      ...originalMatchMedia(query),
      matches: query.includes('prefers-reduced-motion'),
    })) as typeof window.matchMedia
    try {
      const user = userEvent.setup()
      render(<InquiryForm />)
      await user.click(screen.getByRole('button', { name: /continue/i }))
      expect(scrollIntoView.mock.calls[0][0].behavior).toBe('auto')
    } finally {
      window.matchMedia = originalMatchMedia
    }
  })
})

describe('InquiryForm success state', () => {
  it('links to recent work instead of the draft resource page', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true }) as unknown as typeof fetch
    const { user, container } = await goToContactStep()
    await user.type(screen.getByLabelText(/^name/i), 'Test Owner')
    await user.type(screen.getByLabelText(/^email/i), 'owner@example.com')
    await user.click(screen.getByRole('button', { name: /send project details/i }))
    expect(await screen.findByText('Thanks. Your project is in.')).toBeInTheDocument()

    const workLink = screen.getByRole('link', { name: 'See recent client work while you wait' })
    expect(workLink).toHaveAttribute('href', '/work')

    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href') ?? '')
    expect(hrefs.some((href) => href.startsWith('/resources'))).toBe(false)
  })
})
