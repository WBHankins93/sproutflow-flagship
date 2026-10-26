/**
 * @jest-environment node
 * @jest-environment-options {"window": {}}
 */
// The empty `window` only satisfies jest.setup.js, which assigns
// window.matchMedia unguarded. Nothing under test reads it.
/**
 * HIGH PRIORITY TESTS: POST /api/website-check
 *
 * Validation, the per-IP limit, error mapping to COPY.md lines and the
 * success shape. The check runner is mocked; nothing touches the network.
 */

import { POST, runtime } from '@/app/api/website-check/route'
import { ERROR_MESSAGES } from '@/lib/website-check/messages'
import { CHECKS_PER_WINDOW, resetRateLimits } from '@/lib/website-check/rate-limit'
import { runWebsiteCheck } from '@/lib/website-check/run'
import type { WebsiteCheckResult } from '@/lib/website-check/types'

jest.mock('@/lib/website-check/run', () => ({ runWebsiteCheck: jest.fn() }))

const runMock = runWebsiteCheck as unknown as jest.Mock

const RESULT: WebsiteCheckResult = {
  checkedAt: '2026-10-18T15:04:05.000Z',
  inputUrl: 'example.com',
  host: 'example.com',
  finalUrl: 'https://www.example.com/',
  outcome: 'checked',
  offer: 'lead-flow-audit',
  checks: [
    { id: 'loads', label: 'It loads', status: 'pass', line: 'Your homepage loaded in 0.6 seconds from my server.' },
    { id: 'https', label: 'It is secure', status: 'pass', line: 'Your site uses a secure https connection, and the plain http address forwards to it.' },
    { id: 'mobile', label: 'It fits a phone', status: 'pass', line: 'Your site tells phones to fit the page to the screen.' },
    { id: 'call', label: 'Tap to call', status: 'pass', line: 'Your phone number is a tap-to-call link.' },
    { id: 'form', label: 'Quote form', status: 'pass', line: 'I found a contact or quote form on your homepage.' },
    { id: 'speed', label: 'It is light', status: 'pass', line: 'Your homepage looks light: 2 KB of page code and 2 scripts.' },
    {
      id: 'domain',
      label: 'Domain renewal',
      status: 'pass',
      line: 'Your domain, example.com, is registered until Aug 13, 2028. No renewal is due in the next 60 days.',
      data: { domain: 'example.com', expires: '2028-08-13', days_left: 656 },
    },
    {
      id: 'email',
      label: 'Email records',
      status: 'pass',
      line: 'Your domain has SPF and a DMARC policy set to reject, the records inboxes look for before trusting your email.',
      note: 'I did not check DKIM, the third email record, because it can only be looked up with a name your email provider picks.',
      data: { domain: 'example.com', spf: true, dmarc: 'reject', mx: true },
    },
  ],
}

let ipCounter = 0
function post(body: unknown, ip?: string): Promise<Response> {
  ipCounter += 1
  return POST(
    new Request('http://localhost/api/website-check', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-real-ip': ip ?? `203.0.114.${ipCounter}` },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  )
}

beforeEach(() => {
  resetRateLimits()
  runMock.mockReset()
  runMock.mockResolvedValue({ kind: 'result', result: RESULT })
})

describe('POST /api/website-check', () => {
  it('runs on the Node runtime (DNS needs it)', () => {
    expect(runtime).toBe('nodejs')
  })

  it('returns the eight results (six page checks, domain and email) on success', async () => {
    const response = await post({ url: 'example.com' })
    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toBe('no-store')
    const body = await response.json()
    expect(body.result.host).toBe('example.com')
    expect(body.result.checks.length).toBe(8)
    expect(body.result.checks.map((check: { id: string }) => check.id)).toEqual([
      'loads',
      'https',
      'mobile',
      'call',
      'form',
      'speed',
      'domain',
      'email',
    ])
    expect(body.result.checks[7].note).toBe(RESULT.checks[7].note)
    expect(runMock).toHaveBeenCalledTimes(1)
    expect(runMock.mock.calls[0][0].url.href).toBe('https://example.com/')
  })

  it('returns 400 with the empty line when no address is sent', async () => {
    const response = await post({ url: '   ' })
    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({ error: 'empty', message: ERROR_MESSAGES.empty })
    expect(runMock).toHaveBeenCalledTimes(0)
  })

  it('returns 400 with the invalid line for a bad URL or bad JSON', async () => {
    const bad = await post({ url: 'not a website' })
    expect(bad.status).toBe(400)
    expect((await bad.json()).message).toBe('That does not look like a website address. Try something like yourbusiness.com.')

    const notJson = await post('{oops')
    expect(notJson.status).toBe(400)
    expect((await notJson.json()).error).toBe('invalid')
    expect(runMock).toHaveBeenCalledTimes(0)
  })

  it('returns the blocked-host message for private and local addresses without fetching', async () => {
    for (const url of ['http://127.0.0.1', 'localhost:3000', 'http://169.254.169.254/latest/meta-data/', 'example.com:8080', 'ftp://example.com']) {
      const response = await post({ url })
      expect(response.status).toBe(400)
      expect(await response.json()).toEqual({
        error: 'blocked',
        message: 'I can only check public websites. Try the address your customers type.',
      })
    }
    expect(runMock).toHaveBeenCalledTimes(0)
  })

  it('returns the blocked-host message when DNS or a redirect leads somewhere private', async () => {
    runMock.mockResolvedValue({ kind: 'blocked' })
    const response = await post({ url: 'rebind.example.com' })
    expect(response.status).toBe(400)
    expect((await response.json()).message).toBe(ERROR_MESSAGES.blocked)
  })

  it(`returns 429 with friendly copy after ${CHECKS_PER_WINDOW} checks from one IP in an hour`, async () => {
    for (let i = 0; i < CHECKS_PER_WINDOW; i += 1) {
      const ok = await post({ url: 'example.com' }, '198.51.99.7')
      expect(ok.status).toBe(200)
    }
    const limited = await post({ url: 'example.com' }, '198.51.99.7')
    expect(limited.status).toBe(429)
    expect(await limited.json()).toEqual({
      error: 'rate_limited',
      message: 'You have run a lot of checks in a short time. Try again in a few minutes.',
    })
    expect(Number(limited.headers.get('retry-after'))).toBeGreaterThan(0)
    expect(runMock).toHaveBeenCalledTimes(CHECKS_PER_WINDOW)

    // Another visitor is unaffected.
    const other = await post({ url: 'example.com' }, '198.51.99.8')
    expect(other.status).toBe(200)
  })

  it('returns 500 with the "my end" line when the checker crashes', async () => {
    runMock.mockImplementation(async () => {
      throw new Error('boom')
    })
    const response = await post({ url: 'example.com' })
    expect(response.status).toBe(500)
    expect(await response.json()).toEqual({ error: 'server', message: 'Something went wrong on my end, not yours. Try again in a minute.' })
  })
})
