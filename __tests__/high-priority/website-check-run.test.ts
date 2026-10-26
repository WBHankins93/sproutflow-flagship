/**
 * @jest-environment node
 * @jest-environment-options {"window": {}}
 */
// The empty `window` only satisfies jest.setup.js, which assigns
// window.matchMedia unguarded. Nothing under test reads it.
/**
 * HIGH PRIORITY TESTS: one website check end to end
 *
 * runWebsiteCheck with a fake web (fetch and DNS mocked): which requests it
 * makes, the http fallback, the contact-page follow-up, refusing a redirect
 * into a private network, and the v1 domain and email checks alongside.
 */

import fs from 'fs'
import path from 'path'
import type { EmailDns } from '@/lib/website-check/email-dns'
import { BOOTSTRAP_URL, resetRdapCache } from '@/lib/website-check/rdap'
import { runWebsiteCheck, type RunDeps } from '@/lib/website-check/run'
import { normalizeInput, type LookupFn, type NormalizedInput } from '@/lib/website-check/url-guard'

const FIXTURES = path.join(process.cwd(), '__tests__/fixtures/website-check')
const fixture = (name: string) => fs.readFileSync(path.join(FIXTURES, name), 'utf8')

type Route = () => Response | Promise<Response>

function fakeWeb(routes: Record<string, Route>) {
  const requested: string[] = []
  const fetchImpl = jest.fn(async (url: string) => {
    requested.push(url)
    const route = routes[url]
    if (!route) {
      throw Object.assign(new TypeError('fetch failed'), { cause: Object.assign(new Error('refused'), { code: 'ECONNREFUSED' }) })
    }
    return route()
  })
  return { fetchImpl: fetchImpl as unknown as typeof fetch, requested }
}

const publicDns: LookupFn = async () => [{ address: '93.184.216.34', family: 4 }]

function input(raw: string): NormalizedInput {
  const result = normalizeInput(raw)
  if (!result.ok) throw new Error(`bad test input ${raw}`)
  return result
}

const RDAP_COM = 'https://rdap.verisign.com/com/v1/domain/example.com'
const rdapJson = (name: string) => () =>
  new Response(fixture(name), { headers: { 'content-type': 'application/rdap+json' } })

const CLOCK_START = Date.parse('2026-10-26T12:00:00Z')
const realStart = Date.now()

/** Registry and DNS for the domain and email checks: a healthy domain unless overridden. */
function opsDeps(overrides: { rdap?: Record<string, Route>; dns?: Partial<EmailDns> } = {}) {
  const rdap = fakeWeb({
    [BOOTSTRAP_URL]: rdapJson('rdap-bootstrap.json'),
    [RDAP_COM]: rdapJson('rdap-domain.json'),
    ...overrides.rdap,
  })
  const emailDns: EmailDns = {
    resolveTxt: async (name) => (name.startsWith('_dmarc.') ? [['v=DMARC1; p=reject']] : [['v=spf1 -all']]),
    resolveMx: async () => [{ exchange: 'mx.example.com', priority: 10 }],
    ...overrides.dns,
  }
  const deps: Pick<RunDeps, 'rdapFetch' | 'emailDns' | 'now'> = {
    rdapFetch: rdap.fetchImpl,
    emailDns,
    // A clock that reads 26 Oct 2026, noon UTC, and then ticks in real time.
    now: () => CLOCK_START + (Date.now() - realStart),
  }
  return { deps, rdap }
}

beforeEach(() => resetRdapCache())

const htmlResponse = (body: string) => () => new Response(body, { headers: { 'content-type': 'text/html' } })
const redirectTo = (location: string, status = 301) => () => new Response(null, { status, headers: { location } })

describe('runWebsiteCheck', () => {
  it('checks a healthy site with two requests', async () => {
    const web = fakeWeb({
      'https://example.com/': htmlResponse(fixture('good-site.html')),
      'http://example.com/': redirectTo('https://example.com/'),
    })
    const ops = opsDeps()
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns, ...ops.deps })
    expect(outcome.kind).toBe('result')
    if (outcome.kind !== 'result') return
    expect(outcome.result.checks.map((check) => check.id)).toEqual(['loads', 'https', 'mobile', 'call', 'form', 'speed', 'domain', 'email'])
    expect(outcome.result.checks.map((check) => check.status)).toEqual(['pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass', 'pass'])
    expect(outcome.result.offer).toBe('lead-flow-audit')
    expect(outcome.result.host).toBe('example.com')
    // Two requests to the site; the registry lookups go through their own fetch.
    expect(web.requested.sort()).toEqual(['http://example.com/', 'https://example.com/'])
    expect(ops.rdap.requested).toEqual([BOOTSTRAP_URL, RDAP_COM])
  })

  it('adds the domain and email results, pointing to Site Care, without changing the offer', async () => {
    const web = fakeWeb({
      'https://www.example.com/': htmlResponse(fixture('good-site.html')),
      'http://www.example.com/': redirectTo('https://www.example.com/'),
    })
    const soon = JSON.parse(fixture('rdap-domain.json'))
    soon.events = [{ eventAction: 'expiration', eventDate: '2026-11-04T23:59:59Z' }]
    const ops = opsDeps({
      rdap: { [RDAP_COM]: () => new Response(JSON.stringify(soon)) },
      dns: { resolveTxt: async (name: string) => (name.startsWith('_dmarc.') ? [['v=DMARC1; p=none']] : [['v=spf1 ~all']]) },
    })
    const outcome = await runWebsiteCheck(input('www.example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns, ...ops.deps })
    if (outcome.kind !== 'result') throw new Error('expected a result')
    const domain = outcome.result.checks.find((check) => check.id === 'domain')
    const email = outcome.result.checks.find((check) => check.id === 'email')
    expect(domain?.status).toBe('warn')
    expect(domain?.line).toBe('Your domain renews by Nov 4, 2026, in 9 days. If auto-renew is off, your site and email stop.')
    expect(domain?.fix).toBe('Site Care covers this.')
    expect(email?.status).toBe('warn')
    expect(email?.fix).toBe('Site Care covers this.')
    expect(outcome.result.offer).toBe('lead-flow-audit')
  })

  it('still reports the domain when the site does not load (a lapsed domain)', async () => {
    const web = fakeWeb({})
    const lapsed = JSON.parse(fixture('rdap-domain.json'))
    lapsed.events = [{ eventAction: 'expiration', eventDate: '2026-10-20T04:00:00Z' }]
    const ops = opsDeps({
      rdap: { [RDAP_COM]: () => new Response(JSON.stringify(lapsed)) },
      dns: {
        resolveTxt: async () => {
          throw Object.assign(new Error('nx'), { code: 'ENOTFOUND' })
        },
        resolveMx: async () => {
          throw Object.assign(new Error('nx'), { code: 'ENOTFOUND' })
        },
      },
    })
    const lookup: LookupFn = async () => {
      throw Object.assign(new Error('nx'), { code: 'ENOTFOUND' })
    }
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup, ...ops.deps })
    if (outcome.kind !== 'result') throw new Error('expected a result')
    expect(outcome.result.outcome).toBe('not-loaded')
    expect(outcome.result.checks.length).toBe(8)
    const byId = Object.fromEntries(outcome.result.checks.map((check) => [check.id, check.status]))
    expect(byId.loads).toBe('fail')
    expect(byId.domain).toBe('fail')
    expect(byId.email).toBe('fail')
    expect(outcome.result.offer).toBe('website-rescue')
  })

  it('reports "could not check" for the domain when the registry is down', async () => {
    const web = fakeWeb({
      'https://example.com/': htmlResponse(fixture('good-site.html')),
      'http://example.com/': redirectTo('https://example.com/'),
    })
    const ops = opsDeps({ rdap: { [BOOTSTRAP_URL]: () => new Response('', { status: 503 }), [RDAP_COM]: () => new Response('', { status: 503 }) } })
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns, ...ops.deps })
    if (outcome.kind !== 'result') throw new Error('expected a result')
    const domain = outcome.result.checks.find((check) => check.id === 'domain')
    expect(domain?.status).toBe('unknown')
    expect(domain?.fix).toBe(undefined)
  })

  it('falls back to http when https refuses, and fails the https check', async () => {
    const web = fakeWeb({
      'http://example.com/': htmlResponse(fixture('good-site.html')),
    })
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns, ...opsDeps().deps })
    if (outcome.kind !== 'result') throw new Error('expected a result')
    const byId = Object.fromEntries(outcome.result.checks.map((check) => [check.id, check.status]))
    expect(byId.loads).toBe('pass')
    expect(byId.https).toBe('fail')
    expect(outcome.result.offer).toBe('website-rescue')
  })

  it('makes one extra request for a contact page and finds its form', async () => {
    const home = fixture('mailto-only.html').replace('</main>', '<a href="/contact">Contact us</a></main>')
    const web = fakeWeb({
      'https://example.com/': htmlResponse(home),
      'http://example.com/': redirectTo('https://example.com/'),
      'https://example.com/contact': htmlResponse(fixture('good-site.html')),
    })
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns, ...opsDeps().deps })
    if (outcome.kind !== 'result') throw new Error('expected a result')
    const form = outcome.result.checks.find((check) => check.id === 'form')
    expect(form?.status).toBe('pass')
    expect(form?.line).toBe('I found a contact or quote form on your contact us page, one click from the homepage.')
    expect(web.requested.length).toBe(3)
  })

  it('refuses the whole check when the site redirects into a private network', async () => {
    const web = fakeWeb({
      'https://example.com/': redirectTo('https://admin.example.com/'),
      'http://example.com/': redirectTo('https://example.com/'),
    })
    const lookup: LookupFn = async (hostname) =>
      hostname === 'admin.example.com' ? [{ address: '192.168.1.10', family: 4 }] : [{ address: '93.184.216.34', family: 4 }]
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup, ...opsDeps().deps })
    expect(outcome).toEqual({ kind: 'blocked' })
    expect(web.requested.includes('https://admin.example.com/')).toBe(false)
  })

  it('refuses a host that resolves to a private address without any request', async () => {
    const web = fakeWeb({})
    const lookup: LookupFn = async () => [{ address: '10.0.0.5', family: 4 }]
    const outcome = await runWebsiteCheck(input('intranet-site.example.com'), { fetchImpl: web.fetchImpl, lookup, ...opsDeps().deps })
    expect(outcome).toEqual({ kind: 'blocked' })
    expect(web.requested.length).toBe(0)
  })
})
