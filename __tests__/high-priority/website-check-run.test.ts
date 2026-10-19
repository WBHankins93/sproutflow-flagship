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
 * makes, the http fallback, the contact-page follow-up, and refusing a
 * redirect into a private network.
 */

import fs from 'fs'
import path from 'path'
import { runWebsiteCheck } from '@/lib/website-check/run'
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

const htmlResponse = (body: string) => () => new Response(body, { headers: { 'content-type': 'text/html' } })
const redirectTo = (location: string, status = 301) => () => new Response(null, { status, headers: { location } })

describe('runWebsiteCheck', () => {
  it('checks a healthy site with two requests', async () => {
    const web = fakeWeb({
      'https://example.com/': htmlResponse(fixture('good-site.html')),
      'http://example.com/': redirectTo('https://example.com/'),
    })
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns })
    expect(outcome.kind).toBe('result')
    if (outcome.kind !== 'result') return
    expect(outcome.result.checks.map((check) => check.status)).toEqual(['pass', 'pass', 'pass', 'pass', 'pass', 'pass'])
    expect(outcome.result.offer).toBe('lead-flow-audit')
    expect(outcome.result.host).toBe('example.com')
    expect(web.requested.sort()).toEqual(['http://example.com/', 'https://example.com/'])
  })

  it('falls back to http when https refuses, and fails the https check', async () => {
    const web = fakeWeb({
      'http://example.com/': htmlResponse(fixture('good-site.html')),
    })
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns })
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
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup: publicDns })
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
    const outcome = await runWebsiteCheck(input('example.com'), { fetchImpl: web.fetchImpl, lookup })
    expect(outcome).toEqual({ kind: 'blocked' })
    expect(web.requested.includes('https://admin.example.com/')).toBe(false)
  })

  it('refuses a host that resolves to a private address without any request', async () => {
    const web = fakeWeb({})
    const lookup: LookupFn = async () => [{ address: '10.0.0.5', family: 4 }]
    const outcome = await runWebsiteCheck(input('intranet-site.example.com'), { fetchImpl: web.fetchImpl, lookup })
    expect(outcome).toEqual({ kind: 'blocked' })
    expect(web.requested.length).toBe(0)
  })
})
