/**
 * HIGH PRIORITY TESTS: Inquiry form delivery
 *
 * The inquiry form is the written path to Ben. It shipped for months with
 * NEXT_PUBLIC_FORMSPREE_FORM_ID missing in Vercel, so every submission showed
 * "The form is unavailable". The form ID now has a default in code; these
 * tests make sure a submission always reaches Formspree, with or without the
 * env variable.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { InquiryForm } from '@/components/inquiry/InquiryForm'
import { DEFAULT_FORMSPREE_FORM_ID, getFormspreeFormId } from '@/lib/constants'

const ORIGINAL_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
const originalFetch = global.fetch

function setFormId(value: string | undefined) {
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
  } else {
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID = value
  }
}

afterEach(() => {
  setFormId(ORIGINAL_FORM_ID)
  global.fetch = originalFetch
  try {
    sessionStorage.clear()
  } catch {
    /* storage unavailable */
  }
})

async function submit(offer?: string) {
  const user = userEvent.setup()
  const fetchMock = jest.fn().mockResolvedValue({ ok: true })
  global.fetch = fetchMock as unknown as typeof fetch

  render(<InquiryForm offer={offer} />)
  await user.click(screen.getByRole('button', { name: /continue/i }))
  await user.click(screen.getByRole('button', { name: /continue/i }))
  await user.type(screen.getByLabelText(/^name/i), 'Test Owner')
  await user.type(screen.getByLabelText(/^email/i), 'owner@example.com')
  await user.click(screen.getByRole('button', { name: /send project details/i }))
  expect(await screen.findByText('Thanks. Your project is in.')).toBeInTheDocument()
  expect(screen.queryByText(/form is unavailable/i)).not.toBeInTheDocument()
  return fetchMock
}

describe('getFormspreeFormId', () => {
  it('has a real-looking default form ID', () => {
    expect(/^[A-Za-z0-9]{8}$/.test(DEFAULT_FORMSPREE_FORM_ID)).toBe(true)
  })

  it('uses the default when the env variable is unset', () => {
    setFormId(undefined)
    expect(getFormspreeFormId()).toBe(DEFAULT_FORMSPREE_FORM_ID)
  })

  it('uses the default when the env variable is blank', () => {
    setFormId('   ')
    expect(getFormspreeFormId()).toBe(DEFAULT_FORMSPREE_FORM_ID)
  })

  it('lets the env variable override the default', () => {
    setFormId(' override1 ')
    expect(getFormspreeFormId()).toBe('override1')
  })
})

describe('InquiryForm submission', () => {
  it('posts to the default Formspree form when no env variable is set', async () => {
    setFormId(undefined)
    const fetchMock = await submit()
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe(`https://formspree.io/f/${DEFAULT_FORMSPREE_FORM_ID}`)
    const body = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(body.name).toBe('Test Owner')
    expect(body.email).toBe('owner@example.com')
  })

  it('posts to the override form when the env variable is set', async () => {
    setFormId('override1')
    const fetchMock = await submit()
    expect(fetchMock.mock.calls[0][0]).toBe('https://formspree.io/f/override1')
  })
})

describe('InquiryForm offer context', () => {
  it('sends the offer the visitor came from', async () => {
    const fetchMock = await submit('Starter landing page ($500)')
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).offer).toBe('Starter landing page ($500)')
  })

  it('sends no offer field without one', async () => {
    const fetchMock = await submit()
    expect('offer' in JSON.parse(fetchMock.mock.calls[0][1].body)).toBe(false)
  })
})
