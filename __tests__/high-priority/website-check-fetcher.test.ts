/**
 * @jest-environment node
 * @jest-environment-options {"window": {}}
 */
// The empty `window` only satisfies jest.setup.js, which assigns
// window.matchMedia unguarded. Nothing under test reads it.
/**
 * HIGH PRIORITY TESTS: website check fetcher
 *
 * Manual redirects re-validated on every hop, one shared deadline, a streamed
 * 2 MB cap, and error classification. fetch and DNS are mocked; nothing here
 * touches the network.
 */

import { classifyFetchError, MAX_BODY_BYTES, safeFetch } from '@/lib/website-check/fetcher'
import { USER_AGENT } from '@/lib/website-check/messages'
import type { LookupFn } from '@/lib/website-check/url-guard'

const PUBLIC_IP = '93.184.216.34'

/** DNS stub: hosts listed resolve to the given address, others to PUBLIC_IP. */
function lookupMap(map: Record<string, string> = {}): LookupFn {
  return async (hostname) => [{ address: map[hostname] ?? PUBLIC_IP, family: 4 }]
}

function redirect(location: string, status = 301): Response {
  return new Response(null, { status, headers: { location } })
}

function html(body: string, status = 200): Response {
  return new Response(body, { status, headers: { 'content-type': 'text/html; charset=utf-8' } })
}

type FetchArgs = [string, RequestInit]

function fetchSequence(...responses: Array<Response | Error>) {
  const queue = [...responses]
  const mock = jest.fn(async (..._args: FetchArgs) => {
    const next = queue.shift()
    if (!next) throw new Error('unexpected extra fetch')
    if (next instanceof Error) throw next
    return next
  })
  return mock
}

const soon = () => Date.now() + 5000

describe('safeFetch: request shape', () => {
  it('sends one honest GET with manual redirects and no credentials', async () => {
    const fetchImpl = fetchSequence(html('<p>hi</p>'))
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(true)
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    const [url, init] = fetchImpl.mock.calls[0] as FetchArgs
    expect(url).toBe('https://example.com/')
    expect(init.method).toBe('GET')
    expect(init.redirect).toBe('manual')
    expect(init.credentials).toBe('omit')
    const headers = init.headers as Record<string, string>
    expect(headers['User-Agent']).toBe(USER_AGENT)
    expect(USER_AGENT).toBe('SproutflowSiteCheck/1.0 (+https://www.sproutflow-studio.com/check)')
    expect('Cookie' in headers).toBe(false)
    expect('Authorization' in headers).toBe(false)
  })

  it('returns the body, status and content type', async () => {
    const fetchImpl = fetchSequence(html('<title>Hi</title>'))
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.status).toBe(200)
    expect(result.contentType).toBe('text/html')
    expect(result.body).toBe('<title>Hi</title>')
    expect(result.truncated).toBe(false)
  })
})

describe('safeFetch: redirects', () => {
  it('follows a relative Location against the current URL', async () => {
    const fetchImpl = fetchSequence(redirect('/home', 302), html('ok'))
    const result = await safeFetch('https://example.com/start/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect((fetchImpl.mock.calls[1] as FetchArgs)[0]).toBe('https://example.com/home')
    expect(result.url).toBe('https://example.com/home')
    expect(result.redirects).toBe(1)
  })

  it('refuses a redirect to a private IP literal without requesting it', async () => {
    const fetchImpl = fetchSequence(redirect('http://169.254.169.254/latest/meta-data/'))
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('blocked')
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('refuses a redirect to a host that resolves to a private IP', async () => {
    const fetchImpl = fetchSequence(redirect('https://internal.example.net/'))
    const lookup = lookupMap({ 'internal.example.net': '10.0.0.5' })
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('blocked')
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('refuses a redirect to a host that resolves to ::ffff:127.0.0.1', async () => {
    const fetchImpl = fetchSequence(redirect('https://sneaky.example.net/'))
    const lookup: LookupFn = async (hostname) =>
      hostname === 'sneaky.example.net' ? [{ address: '::ffff:127.0.0.1', family: 6 }] : [{ address: PUBLIC_IP, family: 4 }]
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('blocked')
  })

  it('refuses a redirect to a non-80/443 port', async () => {
    const fetchImpl = fetchSequence(redirect('http://example.com:8080/admin'))
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('blocked')
  })

  it('refuses a redirect to an ftp: URL', async () => {
    const fetchImpl = fetchSequence(redirect('ftp://example.com/file'))
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('blocked')
  })

  it('stops after 3 redirect hops', async () => {
    const fetchImpl = fetchSequence(redirect('/1'), redirect('/2'), redirect('/3'), redirect('/4'))
    const result = await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('too-many-redirects')
    expect(fetchImpl).toHaveBeenCalledTimes(4)
  })

  it('looks up DNS again for every hop', async () => {
    const fetchImpl = fetchSequence(redirect('https://www.example.com/'), html('ok'))
    const lookup = jest.fn(async () => [{ address: PUBLIC_IP, family: 4 }])
    await safeFetch('https://example.com/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookup as unknown as LookupFn })
    expect(lookup).toHaveBeenCalledTimes(2)
    expect(lookup).toHaveBeenCalledWith('www.example.com', { all: true })
  })

  it('can stop at a redirect and report where it pointed', async () => {
    const fetchImpl = fetchSequence(redirect('https://example.com/', 308))
    const result = await safeFetch('http://example.com/', {
      deadline: soon(),
      readBody: false,
      followRedirect: (next) => next.protocol === 'http:',
      fetchImpl: fetchImpl as unknown as typeof fetch,
      lookup: lookupMap(),
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.status).toBe(308)
    expect(result.location).toBe('https://example.com/')
  })
})

describe('safeFetch: limits', () => {
  it('never requests a host whose first lookup is private', async () => {
    const fetchImpl = fetchSequence(html('secret'))
    const result = await safeFetch('https://evil.example/', {
      deadline: soon(),
      fetchImpl: fetchImpl as unknown as typeof fetch,
      lookup: lookupMap({ 'evil.example': '127.0.0.1' }),
    })
    expect(result.ok).toBe(false)
    expect(fetchImpl).toHaveBeenCalledTimes(0)
  })

  it('times out when the server never answers', async () => {
    const fetchImpl = jest.fn(() => new Promise<Response>(() => undefined))
    const started = Date.now()
    const result = await safeFetch('https://slow.example/', {
      deadline: Date.now() + 60,
      fetchImpl: fetchImpl as unknown as typeof fetch,
      lookup: lookupMap(),
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('timeout')
    expect(Date.now() - started).toBeLessThan(1000)
  })

  it('times out when the body stalls', async () => {
    const stalled = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode('<html>'))
      },
    })
    const fetchImpl = fetchSequence(new Response(stalled, { headers: { 'content-type': 'text/html' } }))
    const result = await safeFetch('https://slow.example/', {
      deadline: Date.now() + 80,
      fetchImpl: fetchImpl as unknown as typeof fetch,
      lookup: lookupMap(),
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('timeout')
  })

  it('times out when DNS hangs', async () => {
    const lookup: LookupFn = () => new Promise(() => undefined)
    const fetchImpl = fetchSequence()
    const result = await safeFetch('https://slow-dns.example/', {
      deadline: Date.now() + 60,
      fetchImpl: fetchImpl as unknown as typeof fetch,
      lookup,
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('timeout')
  })

  it('stops reading at 2 MB and marks the body truncated', async () => {
    const chunk = new Uint8Array(256 * 1024).fill(97)
    let pulled = 0
    const endless = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1
        controller.enqueue(chunk)
      },
    })
    const fetchImpl = fetchSequence(new Response(endless, { headers: { 'content-type': 'text/html' } }))
    const result = await safeFetch('https://huge.example/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup: lookupMap() })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.truncated).toBe(true)
    expect(result.bytes).toBe(MAX_BODY_BYTES)
    expect(result.body.length).toBe(MAX_BODY_BYTES)
    // 8 chunks fill the cap, one more confirms there is more; then it stops.
    expect(pulled).toBeLessThan(14)
  })

  it('does not mark a body that ends exactly at the cap as truncated', async () => {
    const result = await safeFetch('https://exact.example/', {
      deadline: soon(),
      maxBytes: 10,
      fetchImpl: fetchSequence(html('0123456789')) as unknown as typeof fetch,
      lookup: lookupMap(),
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.truncated).toBe(false)
    expect(result.bytes).toBe(10)
  })
})

describe('safeFetch and classifyFetchError: failures', () => {
  function undiciError(code: string) {
    return Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error(code), { code }) })
  }

  it('reports an expired certificate as tls with its code', async () => {
    const result = await safeFetch('https://expired.example/', {
      deadline: soon(),
      fetchImpl: fetchSequence(undiciError('CERT_HAS_EXPIRED')) as unknown as typeof fetch,
      lookup: lookupMap(),
    })
    expect(result).toEqual({
      ok: false,
      reason: 'tls',
      code: 'CERT_HAS_EXPIRED',
      url: 'https://expired.example/',
      totalMs: (result as { totalMs: number }).totalMs,
      redirects: 0,
    })
  })

  it('classifies common network errors', () => {
    expect(classifyFetchError(undiciError('ERR_TLS_CERT_ALTNAME_INVALID')).reason).toBe('tls')
    expect(classifyFetchError(undiciError('DEPTH_ZERO_SELF_SIGNED_CERT')).reason).toBe('tls')
    expect(classifyFetchError(undiciError('ECONNREFUSED')).reason).toBe('connect')
    expect(classifyFetchError(undiciError('UND_ERR_CONNECT_TIMEOUT')).reason).toBe('timeout')
    expect(classifyFetchError(undiciError('ENOTFOUND')).reason).toBe('dns')
    expect(classifyFetchError(Object.assign(new Error('aborted'), { name: 'AbortError' })).reason).toBe('timeout')
    expect(classifyFetchError(new Error('something else')).reason).toBe('error')
  })

  it('reports a domain with no DNS record as dns without fetching', async () => {
    const fetchImpl = fetchSequence()
    const lookup: LookupFn = async () => {
      throw Object.assign(new Error('ENOTFOUND'), { code: 'ENOTFOUND' })
    }
    const result = await safeFetch('https://lapsed.example/', { deadline: soon(), fetchImpl: fetchImpl as unknown as typeof fetch, lookup })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('dns')
    expect(fetchImpl).toHaveBeenCalledTimes(0)
  })
})
