/**
 * HIGH PRIORITY TESTS: the /check page flow
 *
 * Enter a URL, see the results with focus on the heading, request the full
 * report, and make sure Formspree gets exactly the allowed fields once.
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { metadata } from '@/app/check/page'
import { WebsiteCheck } from '@/components/website-check/WebsiteCheck'
import { DEFAULT_FORMSPREE_FORM_ID } from '@/lib/constants'
import type { WebsiteCheckResult } from '@/lib/website-check/types'

const RESULT: WebsiteCheckResult = {
  checkedAt: '2026-10-18T15:04:05.000Z',
  inputUrl: 'bayouroofing.example',
  host: 'bayouroofing.example',
  finalUrl: 'https://www.bayouroofing.example/',
  outcome: 'checked',
  offer: 'website-rescue',
  checks: [
    { id: 'loads', label: 'It loads', status: 'pass', line: 'Your homepage loaded in 1.4 seconds from my server.' },
    {
      id: 'https',
      label: 'It is secure',
      status: 'fail',
      line: "Your site's security certificate is expired, so browsers show a warning before the page.",
      fix: 'Website Rescue fixes this.',
    },
    { id: 'mobile', label: 'It fits a phone', status: 'pass', line: 'Your site tells phones to fit the page to the screen.' },
    {
      id: 'call',
      label: 'Tap to call',
      status: 'warn',
      line: 'I found your number, (504) 555-0142, on the page, but it is not a tap-to-call link.',
      fix: 'The Lead Flow Audit looks at this.',
    },
    { id: 'form', label: 'Quote form', status: 'pass', line: 'I found a contact or quote form on your homepage.' },
    { id: 'speed', label: 'It is light', status: 'pass', line: 'Your homepage looks light: 180 KB of page code and 9 scripts.' },
  ],
}

const ALLOWED_FIELDS = ['email', 'name', 'url', 'results', 'source']
const ORIGINAL_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
const originalFetch = global.fetch

function jsonResponse(status: number, body: unknown) {
  return { ok: status >= 200 && status < 300, status, json: async () => body }
}

type FetchArgs = [string, RequestInit]

/** A fetch mock that answers with each response in turn. */
function fetchQueue(...responses: Array<ReturnType<typeof jsonResponse>>) {
  const queue = [...responses]
  const mock = jest.fn(async (..._args: FetchArgs) => {
    const next = queue.shift()
    if (!next) throw new Error('unexpected extra fetch')
    return next
  })
  global.fetch = mock as unknown as typeof fetch
  return mock
}

function bodyOf(mock: ReturnType<typeof fetchQueue>, call: number) {
  return JSON.parse((mock.mock.calls[call] as FetchArgs)[1].body as string)
}

afterEach(() => {
  global.fetch = originalFetch
  if (ORIGINAL_FORM_ID === undefined) delete process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
  else process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID = ORIGINAL_FORM_ID
})

describe('/check page metadata', () => {
  it('is titled "Free website check" with a /check canonical', () => {
    expect(metadata.title).toBe('Free website check')
    expect(metadata.alternates?.canonical).toBe('/check')
  })
})

describe('WebsiteCheck flow', () => {
  it('runs a check, focuses the results heading, and sends one report request with only the allowed fields', async () => {
    delete process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
    const user = userEvent.setup()
    const fetchMock = fetchQueue(jsonResponse(200, { result: RESULT }), jsonResponse(200, { ok: true }))

    render(<WebsiteCheck />)
    await user.type(screen.getByLabelText('Your website address'), 'bayouroofing.example')
    await user.click(screen.getByRole('button', { name: /check my site/i }))

    const heading = await screen.findByRole('heading', { name: 'Here is what I found on bayouroofing.example' })
    await waitFor(() => {
      expect(document.activeElement).toBe(heading)
    })

    // The check request.
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect((fetchMock.mock.calls[0] as FetchArgs)[0]).toBe('/api/website-check')
    expect(bodyOf(fetchMock, 0)).toEqual({ url: 'bayouroofing.example' })

    // Results, worst first, and the one offer.
    expect(screen.getByText("Your site's security certificate is expired, so browsers show a warning before the page.")).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Website Rescue' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent('Done. 1 need a fix, 1 worth a look, 4 look good.')

    // The report request.
    await user.type(screen.getByLabelText('Your email'), 'owner@bayouroofing.example')
    await user.type(screen.getByLabelText(/your name/i), 'Pat')
    await user.click(screen.getByRole('button', { name: 'Email me the report' }))

    const sent = await screen.findByRole('heading', { name: 'Your report is on its way.' })
    await waitFor(() => {
      expect(document.activeElement).toBe(sent)
    })
    expect(screen.getByText(/within one business day/)).toBeInTheDocument()

    expect(fetchMock).toHaveBeenCalledTimes(2)
    const [formspreeUrl, init] = fetchMock.mock.calls[1] as FetchArgs
    expect(formspreeUrl).toBe(`https://formspree.io/f/${DEFAULT_FORMSPREE_FORM_ID}`)
    expect(init.method).toBe('POST')
    const body = bodyOf(fetchMock, 1)
    expect(Object.keys(body).every((key) => ALLOWED_FIELDS.includes(key))).toBe(true)
    expect(Object.keys(body).sort()).toEqual(['email', 'name', 'results', 'source', 'url'])
    expect(body.email).toBe('owner@bayouroofing.example')
    expect(body.name).toBe('Pat')
    expect(body.url).toBe('https://www.bayouroofing.example/')
    expect(body.source).toBe('website-check')
    expect(body.results.split('\n')[0]).toBe('Website check: bayouroofing.example')
    expect(body.results).toContain('FAIL | It is secure:')
  })

  it('leaves name out of the report request when it is blank, and does not send twice', async () => {
    const user = userEvent.setup()
    const fetchMock = fetchQueue(jsonResponse(200, { result: RESULT }), jsonResponse(200, { ok: true }))

    render(<WebsiteCheck />)
    await user.type(screen.getByLabelText('Your website address'), 'bayouroofing.example')
    await user.click(screen.getByRole('button', { name: /check my site/i }))
    await screen.findByRole('heading', { name: 'Here is what I found on bayouroofing.example' })
    await user.type(screen.getByLabelText('Your email'), 'owner@bayouroofing.example')
    await user.click(screen.getByRole('button', { name: 'Email me the report' }))
    await screen.findByRole('heading', { name: 'Your report is on its way.' })

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(Object.keys(bodyOf(fetchMock, 1)).sort()).toEqual(['email', 'results', 'source', 'url'])
  })

  it('validates the email before sending anything', async () => {
    const user = userEvent.setup()
    const fetchMock = fetchQueue(jsonResponse(200, { result: RESULT }))

    render(<WebsiteCheck />)
    await user.type(screen.getByLabelText('Your website address'), 'bayouroofing.example')
    await user.click(screen.getByRole('button', { name: /check my site/i }))
    await screen.findByRole('heading', { name: 'Here is what I found on bayouroofing.example' })

    await user.click(screen.getByRole('button', { name: 'Email me the report' }))
    expect(screen.getByText('Enter your email so I can send the report.')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Your email'), 'ben@sproutflow')
    await user.click(screen.getByRole('button', { name: 'Email me the report' }))
    expect(screen.getByText('That email does not look right. Check for a typo.')).toBeInTheDocument()
    expect(document.activeElement).toBe(screen.getByLabelText('Your email'))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('shows field errors without calling the server', async () => {
    const user = userEvent.setup()
    const fetchMock = fetchQueue()

    render(<WebsiteCheck />)
    await user.click(screen.getByRole('button', { name: /check my site/i }))
    expect(screen.getByText('Enter your website address first, like yourbusiness.com.')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Your website address'), 'localhost:3000')
    await user.click(screen.getByRole('button', { name: /check my site/i }))
    expect(screen.getByText('I can only check public websites. Try the address your customers type.')).toBeInTheDocument()
    expect(screen.getByLabelText('Your website address')).toHaveAttribute('aria-invalid', 'true')
    expect(fetchMock).toHaveBeenCalledTimes(0)
  })

  it('shows the friendly 429 line and returns to the form', async () => {
    const user = userEvent.setup()
    fetchQueue(
      jsonResponse(429, {
        error: 'rate_limited',
        message: 'You have run a lot of checks in a short time. Try again in a few minutes.',
      }),
    )

    render(<WebsiteCheck />)
    await user.type(screen.getByLabelText('Your website address'), 'bayouroofing.example')
    await user.click(screen.getByRole('button', { name: /check my site/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'You have run a lot of checks in a short time. Try again in a few minutes.',
    )
    await waitFor(() => {
      expect(document.activeElement).toBe(screen.getByLabelText('Your website address'))
    })
  })

  it('shows the send-failed line when Formspree refuses', async () => {
    const user = userEvent.setup()
    fetchQueue(jsonResponse(200, { result: RESULT }), jsonResponse(500, {}))

    render(<WebsiteCheck />)
    await user.type(screen.getByLabelText('Your website address'), 'bayouroofing.example')
    await user.click(screen.getByRole('button', { name: /check my site/i }))
    await screen.findByRole('heading', { name: 'Here is what I found on bayouroofing.example' })
    await user.type(screen.getByLabelText('Your email'), 'owner@bayouroofing.example')
    await user.click(screen.getByRole('button', { name: 'Email me the report' }))
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Your report did not send. Try again, or email me at ben@sproutflow-studio.com.',
    )
  })
})
