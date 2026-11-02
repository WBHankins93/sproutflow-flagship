/**
 * @jest-environment node
 * @jest-environment-options {"window": {}}
 */
// The empty `window` only satisfies jest.setup.js, which assigns
// window.matchMedia unguarded. Nothing under test reads it.
/**
 * HIGH PRIORITY TESTS: website check v1, domain renewal over RDAP
 *
 * The eTLD+1 approximation, IANA bootstrap with its cache and static
 * fallback, the host allowlist, the capped request, and pass / warn / fail /
 * unknown. fetch is mocked; nothing here touches the network.
 */

import fs from 'fs'
import path from 'path'
import { checkableDomain, registrableDomain, sharedPlatform } from '@/lib/website-check/domain-name'
import {
  allowedRdapHosts,
  BOOTSTRAP_URL,
  checkDomain,
  DOMAIN_LINES,
  expirationDate,
  fetchRdapJson,
  isAllowedRdapUrl,
  parseBootstrap,
  rdapBaseFor,
  RDAP_MAX_BYTES,
  resetRdapCache,
} from '@/lib/website-check/rdap'

const FIXTURES = path.join(process.cwd(), '__tests__/fixtures/website-check')
const BOOTSTRAP = fs.readFileSync(path.join(FIXTURES, 'rdap-bootstrap.json'), 'utf8')
const DOMAIN = fs.readFileSync(path.join(FIXTURES, 'rdap-domain.json'), 'utf8')

/** 26 Oct 2026, noon UTC. */
const NOW = Date.parse('2026-10-26T12:00:00Z')
const now = () => NOW

type Route = (init?: RequestInit) => Response | Promise<Response>

function fakeRdap(routes: Record<string, Route>) {
  const requested: string[] = []
  const inits: RequestInit[] = []
  const fetchImpl = jest.fn(async (url: string, init?: RequestInit) => {
    requested.push(url)
    inits.push(init ?? {})
    const route = routes[url]
    if (!route) throw Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNREFUSED' } })
    return route(init)
  })
  return { fetchImpl: fetchImpl as unknown as typeof fetch, requested, inits }
}

const json = (body: string, status = 200, headers: Record<string, string> = {}) => () =>
  new Response(body, { status, headers: { 'content-type': 'application/rdap+json', ...headers } })

/** An RDAP domain object expiring at the given time. */
function domainExpiring(iso: string): string {
  const body = JSON.parse(DOMAIN)
  body.events = body.events.map((event: { eventAction: string; eventDate: string }) =>
    event.eventAction === 'expiration' ? { ...event, eventDate: iso } : event,
  )
  return JSON.stringify(body)
}

/** A fetch that never answers but rejects when aborted, like undici. */
const hang: Route = (init) =>
  new Promise<Response>((_, reject) => {
    init?.signal?.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' })))
  })

const COM = 'https://rdap.verisign.com/com/v1/domain/example.com'

beforeEach(() => resetRdapCache())

describe('which domain gets checked (eTLD+1)', () => {
  it('takes the last two labels, or three under a two-part suffix', () => {
    expect(registrableDomain('www.example.com')).toBe('example.com')
    expect(registrableDomain('shop.blog.example.com.')).toBe('example.com')
    expect(registrableDomain('example.com')).toBe('example.com')
    expect(registrableDomain('www.bakery.co.uk')).toBe('bakery.co.uk')
    expect(registrableDomain('a.b.example.com.au')).toBe('example.com.au')
    // Not in the list, but a generic word under a country code.
    expect(registrableDomain('www.example.com.vn')).toBe('example.com.vn')
    expect(registrableDomain('www.example.de')).toBe('example.de')
  })

  it('treats shared platform addresses as having no domain of their own', () => {
    expect(sharedPlatform('mybakery.wixsite.com')).toBe('wixsite.com')
    expect(sharedPlatform('someone.github.io')).toBe('github.io')
    expect(sharedPlatform('wixsite.com')).toBe(null)
    expect(sharedPlatform('notwixsite.com')).toBe(null)
    expect(checkableDomain('mybakery.wixsite.com')).toEqual({ kind: 'shared', suffix: 'wixsite.com' })
  })

  it('does not guess at US state and city domains', () => {
    expect(checkableDomain('www.ci.example.la.us')).toEqual({ kind: 'unsupported', suffix: 'la.us' })
    expect(checkableDomain('www.example.us')).toEqual({ kind: 'domain', domain: 'example.us', tld: 'us' })
  })
})

describe('the IANA bootstrap and the allowlist', () => {
  it('parses the bootstrap file and keeps only safe https base URLs', () => {
    const services = parseBootstrap({
      services: [
        [['com'], ['https://rdap.verisign.com/com/v1/']],
        [['shop'], ['http://rdap.shop.example/']],
        [['bad'], ['https://10.0.0.5/rdap/', 'https://user:pw@rdap.bad.example/', 'https://rdap.bad.example:8443/']],
        [['dev'], ['https://pubapi.registry.google/rdap']],
        'junk',
      ],
    })
    expect(services?.get('com')).toEqual(['https://rdap.verisign.com/com/v1/'])
    expect(services?.has('shop')).toBe(false)
    expect(services?.has('bad')).toBe(false)
    // A trailing slash is added so "domain/x" resolves under the base path.
    expect(services?.get('dev')).toEqual(['https://pubapi.registry.google/rdap/'])
    expect(parseBootstrap({ nope: true })).toBe(null)
    expect(parseBootstrap(null)).toBe(null)
  })

  it('prefers the bootstrap, then falls back to the static map', () => {
    const services = parseBootstrap(JSON.parse(BOOTSTRAP))
    expect(rdapBaseFor('org', services)).toEqual({ base: 'https://rdap.publicinterestregistry.org/rdap/', source: 'iana' })
    expect(rdapBaseFor('io', services)).toEqual({ base: 'https://rdap.identitydigital.services/rdap/', source: 'static' })
    expect(rdapBaseFor('com', null)).toEqual({ base: 'https://rdap.verisign.com/com/v1/', source: 'static' })
    expect(rdapBaseFor('edu', services)).toBe(null)
    expect(rdapBaseFor('constructor', null)).toBe(null)
  })

  it('refuses any URL that is not https to an allowlisted host', () => {
    const hosts = allowedRdapHosts(null)
    expect(isAllowedRdapUrl(new URL('https://rdap.verisign.com/com/v1/domain/a.com'), hosts)).toBe(true)
    expect(isAllowedRdapUrl(new URL('http://rdap.verisign.com/com/v1/domain/a.com'), hosts)).toBe(false)
    expect(isAllowedRdapUrl(new URL('https://rdap.verisign.com:8443/com/v1/'), hosts)).toBe(false)
    expect(isAllowedRdapUrl(new URL('https://evil.example/rdap/'), hosts)).toBe(false)
    expect(isAllowedRdapUrl(new URL('https://169.254.169.254/latest/'), hosts)).toBe(false)
  })

  it('makes no request at all to a host outside the allowlist', async () => {
    const web = fakeRdap({ 'https://evil.example/domain/a.com': json(DOMAIN) })
    const result = await fetchRdapJson('https://evil.example/domain/a.com', {
      fetchImpl: web.fetchImpl,
      now,
      timeoutMs: 1000,
      allowedHosts: allowedRdapHosts(null),
    })
    expect(result).toEqual({ ok: false, reason: 'refused' })
    expect(web.requested.length).toBe(0)
  })

  it('refuses a redirect to another host, even an allowlisted one', async () => {
    const web = fakeRdap({
      [BOOTSTRAP_URL]: json(BOOTSTRAP),
      [COM]: () => new Response(null, { status: 302, headers: { location: 'https://rdap.publicinterestregistry.org/rdap/domain/example.com' } }),
    })
    const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('unknown')
    expect(result.data?.reason).toBe('refused')
    expect(web.requested).toEqual([BOOTSTRAP_URL, COM])
    expect(web.inits[1].redirect).toBe('manual')
  })

  it('follows a same-host redirect', async () => {
    const web = fakeRdap({
      [BOOTSTRAP_URL]: json(BOOTSTRAP),
      [COM]: () => new Response(null, { status: 301, headers: { location: '/com/v1/domain/EXAMPLE.COM' } }),
      'https://rdap.verisign.com/com/v1/domain/EXAMPLE.COM': json(DOMAIN),
    })
    const result = await checkDomain('www.example.com', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('pass')
  })

  it('caches the bootstrap for later checks', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json(DOMAIN) })
    await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    expect(web.requested.filter((url) => url === BOOTSTRAP_URL).length).toBe(1)
    expect(web.requested.filter((url) => url === COM).length).toBe(2)
  })

  it('uses the static map when the bootstrap is down, and does not retry it on every check', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: json('oops', 503), [COM]: json(DOMAIN) })
    const first = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    const second = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    expect(first.status).toBe('pass')
    expect(second.status).toBe('pass')
    expect(web.requested.filter((url) => url === BOOTSTRAP_URL).length).toBe(1)
  })

  it('uses the static map when the bootstrap is slow', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: hang, [COM]: json(DOMAIN) })
    const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, bootstrapWaitMs: 20 })
    expect(result.status).toBe('pass')
  })

  it('uses the static map for TLDs the bootstrap does not list (io)', async () => {
    const web = fakeRdap({
      [BOOTSTRAP_URL]: json(BOOTSTRAP),
      'https://rdap.identitydigital.services/rdap/domain/example.io': json(DOMAIN),
    })
    const result = await checkDomain('example.io', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('pass')
  })
})

describe('domain renewal result', () => {
  it('passes when expiry is more than 60 days away, and keeps only dates', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json(DOMAIN) })
    const result = await checkDomain('www.example.com', { fetchImpl: web.fetchImpl, now })
    expect(result).toEqual({
      id: 'domain',
      label: 'Domain renewal',
      status: 'pass',
      line: 'Your domain, example.com, is registered until Aug 13, 2028. No renewal is due in the next 60 days.',
      data: { domain: 'example.com', expires: '2028-08-13', days_left: 656 },
    })
    expect(JSON.stringify(result)).not.toContain('Pat Example')
    expect(web.inits[1].method).toBe('GET')
    expect((web.inits[1].headers as Record<string, string>).Accept).toContain('application/rdap+json')
  })

  it('warns at 60 days or fewer, in plain English', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json(domainExpiring('2026-11-04T23:59:59Z')) })
    const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('warn')
    expect(result.line).toBe('Your domain renews by Nov 4, 2026, in 9 days. If auto-renew is off, your site and email stop.')

    resetRdapCache()
    const edge = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json(domainExpiring('2026-12-25T12:00:00Z')) })
    const sixty = await checkDomain('example.com', { fetchImpl: edge.fetchImpl, now })
    expect(sixty.status).toBe('warn')
    expect(sixty.data?.days_left).toBe(60)

    resetRdapCache()
    const soon = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json(domainExpiring('2026-10-27T13:00:00Z')) })
    expect((await checkDomain('example.com', { fetchImpl: soon.fetchImpl, now })).line).toBe(
      'Your domain renews by Oct 27, 2026, in 1 day. If auto-renew is off, your site and email stop.',
    )
  })

  it('fails when the registration has already expired', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json(domainExpiring('2026-10-20T04:00:00Z')) })
    const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('fail')
    expect(result.line).toBe(
      'The public registry shows your domain expired on Oct 20, 2026. Until it is renewed, your site and email can stop working at any time.',
    )
  })

  it('is unknown, never a fail, when the TLD has no public RDAP', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP) })
    const result = await checkDomain('www.example.edu', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('unknown')
    expect(result.line).toBe(DOMAIN_LINES.noRegistry('edu'))
    expect(web.requested).toEqual([BOOTSTRAP_URL])
  })

  it('is unknown when the registry rate limits, errors, or has no record', async () => {
    for (const [status, reason] of [
      [429, 'rate-limited'],
      [500, 'http'],
      [404, 'not-found'],
    ] as const) {
      resetRdapCache()
      const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json('{}', status) })
      const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
      expect(result.status).toBe('unknown')
      expect(result.line).toBe(DOMAIN_LINES.unavailable)
      expect(result.data?.reason).toBe(reason)
    }
  })

  it('is unknown when the registry does not list an expiration event', async () => {
    const body = JSON.parse(DOMAIN)
    body.events = body.events.filter((event: { eventAction: string }) => event.eventAction !== 'expiration')
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: json(JSON.stringify(body)) })
    const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('unknown')
    expect(result.line).toBe(DOMAIN_LINES.noDate('example.com'))
  })

  it('is unknown when the registry is slow, inside the shared deadline', async () => {
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: hang })
    const started = Date.now()
    const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, deadline: Date.now() + 80 })
    expect(result.status).toBe('unknown')
    expect(result.data?.reason).toBe('timeout')
    expect(Date.now() - started).toBeLessThan(1000)
  })

  it('stops reading a body over 256 KB and reports unknown', async () => {
    const huge = JSON.stringify({ events: [], padding: 'x'.repeat(RDAP_MAX_BYTES + 10) })
    const web = fakeRdap({ [BOOTSTRAP_URL]: json(BOOTSTRAP), [COM]: () => new Response(huge, { status: 200 }) })
    const result = await checkDomain('example.com', { fetchImpl: web.fetchImpl, now })
    expect(result.status).toBe('unknown')
    expect(result.data?.reason).toBe('too-large')
  })

  it('is unknown with no request for shared platform and US locality addresses', async () => {
    const web = fakeRdap({})
    const wix = await checkDomain('mybakery.wixsite.com', { fetchImpl: web.fetchImpl, now })
    expect(wix.status).toBe('unknown')
    expect(wix.line).toBe('Your site is on a shared wixsite.com address, so there is no domain of your own for me to check.')
    const city = await checkDomain('www.ci.example.la.us', { fetchImpl: web.fetchImpl, now })
    expect(city.status).toBe('unknown')
    expect(web.requested.length).toBe(0)
  })

  it('reads the expiration event and ignores bad dates', () => {
    expect(expirationDate({ events: [{ eventAction: 'Expiration', eventDate: '2027-01-02T00:00:00Z' }] })?.toISOString()).toBe(
      '2027-01-02T00:00:00.000Z',
    )
    expect(expirationDate({ events: [{ eventAction: 'expiration', eventDate: 'soon' }] })).toBe(null)
    expect(expirationDate({ events: 'nope' })).toBe(null)
    expect(expirationDate(null)).toBe(null)
  })
})
