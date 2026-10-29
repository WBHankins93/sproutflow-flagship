/**
 * HIGH PRIORITY TESTS: the six website checks and the recommendation
 *
 * Runs funnel/CHECKS.md section 3 and 4 over saved homepages in
 * __tests__/fixtures/website-check/. No network: fetch results are built by
 * hand around each fixture.
 */

import fs from 'fs'
import path from 'path'
import { analyzeHtml, evaluateChecks, findContactLink, needsContactPage, type CheckInputs } from '@/lib/website-check/checks'
import type { FetchError, FetchSuccess } from '@/lib/website-check/fetcher'
import { countStatuses, formatSummaryText, recommendOffer, withRecommendation } from '@/lib/website-check/summarize'
import type { CheckId, CheckStatus, WebsiteCheckResult } from '@/lib/website-check/types'

const FIXTURES = path.join(process.cwd(), '__tests__/fixtures/website-check')

function fixture(name: string): string {
  return fs.readFileSync(path.join(FIXTURES, name), 'utf8')
}

function page(body: string, overrides: Partial<FetchSuccess> = {}): FetchSuccess {
  return {
    ok: true,
    url: 'https://www.example.com/',
    status: 200,
    location: null,
    contentType: 'text/html',
    headers: { 'content-type': 'text/html; charset=utf-8' },
    body,
    bytes: Buffer.byteLength(body),
    truncated: false,
    ttfbMs: 300,
    totalMs: 600,
    redirects: 0,
    ...overrides,
  }
}

function failure(reason: FetchError['reason'], code?: string, url = 'https://www.example.com/'): FetchError {
  return { ok: false, reason, code, url, totalMs: 100, redirects: 0 }
}

/** The plain http address forwards to https. */
const PROBE_FORWARDS = page('', { url: 'http://example.com/', status: 301, location: 'https://example.com/', contentType: '' })
/** The plain http address serves the page itself. */
const PROBE_SERVES = page('', { url: 'http://example.com/', status: 200, contentType: 'text/html' })

function statuses(inputs: CheckInputs): Record<CheckId, CheckStatus> {
  const run = evaluateChecks(inputs)
  return Object.fromEntries(run.checks.map((check) => [check.id, check.status])) as Record<CheckId, CheckStatus>
}

function lineOf(inputs: CheckInputs, id: CheckId): string {
  return evaluateChecks(inputs).checks.find((check) => check.id === id)?.line ?? ''
}

describe('fixture: a good site', () => {
  const inputs: CheckInputs = { host: 'example.com', https: page(fixture('good-site.html')), httpProbe: PROBE_FORWARDS }

  it('passes all six checks', () => {
    expect(statuses(inputs)).toEqual({ loads: 'pass', https: 'pass', mobile: 'pass', call: 'pass', form: 'pass', speed: 'pass' })
  })

  it('writes the result lines from CHECKS.md', () => {
    expect(lineOf(inputs, 'loads')).toBe('Your homepage loaded in 0.6 seconds from my server.')
    expect(lineOf(inputs, 'https')).toBe('Your site uses a secure https connection, and the plain http address forwards to it.')
    expect(lineOf(inputs, 'mobile')).toBe('Your site tells phones to fit the page to the screen.')
    expect(lineOf(inputs, 'call')).toBe('Your phone number is a tap-to-call link.')
    expect(lineOf(inputs, 'form')).toBe('I found a contact or quote form on your homepage.')
    expect(lineOf(inputs, 'speed')).toBe('Your homepage looks light: 2 KB of page code and 2 scripts.')
  })

  it('recommends the Lead Flow Audit when everything passes', () => {
    expect(recommendOffer(evaluateChecks(inputs).checks)).toBe('lead-flow-audit')
  })
})

describe('fixture: no viewport, number not linked, heavy', () => {
  const inputs: CheckInputs = { host: 'example.com', https: page(fixture('no-viewport.html')), httpProbe: PROBE_SERVES }

  it('fails mobile and warns on https, call, form and speed', () => {
    expect(statuses(inputs)).toEqual({ loads: 'pass', https: 'warn', mobile: 'fail', call: 'warn', form: 'warn', speed: 'warn' })
  })

  it('names the unlinked number and the script counts', () => {
    expect(lineOf(inputs, 'call')).toBe('I found your number, (504) 555-0199, on the page, but it is not a tap-to-call link.')
    expect(lineOf(inputs, 'form')).toBe('I could not find a contact or quote form on your homepage or contact page.')
    expect(lineOf(inputs, 'speed')).toBe(
      'Your homepage looks heavy for a phone: 2 KB of page code and 16 scripts, 6 of them from other companies.',
    )
    expect(lineOf(inputs, 'https')).toBe('Your site works on https, but the plain http address does not forward to it.')
  })

  it('recommends Website Rescue', () => {
    expect(recommendOffer(evaluateChecks(inputs).checks)).toBe('website-rescue')
  })
})

describe('fixture: only a mailto link', () => {
  const inputs: CheckInputs = { host: 'example.com', https: page(fixture('mailto-only.html')), httpProbe: PROBE_FORWARDS }

  it('warns on call and form only', () => {
    expect(statuses(inputs)).toEqual({ loads: 'pass', https: 'pass', mobile: 'pass', call: 'warn', form: 'warn', speed: 'pass' })
  })

  it('says it found an email link but no form', () => {
    expect(lineOf(inputs, 'form')).toBe('I found an email link, but no form a customer can fill in for a quote.')
    expect(lineOf(inputs, 'call')).toBe('I could not find a tap-to-call phone number on your homepage.')
  })

  it('recommends the Lead Capture & Follow-Up System', () => {
    expect(recommendOffer(evaluateChecks(inputs).checks)).toBe('lead-capture-system')
  })
})

describe('fixture: a JavaScript shell', () => {
  const inputs: CheckInputs = { host: 'example.com', https: page(fixture('js-shell.html')), httpProbe: PROBE_FORWARDS }

  it('is detected as built by JavaScript', () => {
    expect(analyzeHtml(fixture('js-shell.html')).jsShell).toBe(true)
    expect(analyzeHtml(fixture('good-site.html')).jsShell).toBe(false)
  })

  it('warns, never fails, on mobile, call and form', () => {
    expect(statuses(inputs)).toEqual({ loads: 'pass', https: 'pass', mobile: 'warn', call: 'warn', form: 'warn', speed: 'pass' })
    expect(lineOf(inputs, 'mobile')).toBe('Your page is built by JavaScript, so I could not confirm how it sizes on phones.')
    expect(lineOf(inputs, 'call')).toBe('Your page is built by JavaScript, so I could not confirm a tap-to-call link.')
    expect(lineOf(inputs, 'form')).toBe('Your page is built by JavaScript, so I could not confirm a quote form.')
  })

  it('does not fetch a contact page for a shell', () => {
    expect(needsContactPage(page(fixture('js-shell.html')))).toBe(null)
  })
})

describe('fixture: a 403 bot challenge', () => {
  const challenge = page(fixture('challenge-403.html'), { status: 403, headers: { 'cf-mitigated': 'challenge' } })
  const inputs: CheckInputs = { host: 'example.com', https: challenge, httpProbe: PROBE_FORWARDS }

  it('reports every check as not checked, never fail', () => {
    expect(statuses(inputs)).toEqual({
      loads: 'unknown',
      https: 'unknown',
      mobile: 'unknown',
      call: 'unknown',
      form: 'unknown',
      speed: 'unknown',
    })
    expect(evaluateChecks(inputs).outcome).toBe('not-checked')
    expect(lineOf(inputs, 'loads')).toBe('Your site turned my checker away (status 403), so I could not check it from my server.')
  })

  it('makes no offer', () => {
    expect(recommendOffer(evaluateChecks(inputs).checks)).toBe(null)
  })

  it('treats a 200 challenge page the same way', () => {
    const run = evaluateChecks({ host: 'example.com', https: page(fixture('challenge-403.html')), httpProbe: PROBE_FORWARDS })
    expect(run.outcome).toBe('not-checked')
  })
})

describe('C1 page loads', () => {
  it('fails on DNS with the host in the line, and skips the rest', () => {
    const inputs: CheckInputs = { host: 'lapsed.example', https: failure('dns', 'ENOTFOUND'), httpProbe: failure('dns') }
    expect(statuses(inputs)).toEqual({
      loads: 'fail',
      https: 'unknown',
      mobile: 'unknown',
      call: 'unknown',
      form: 'unknown',
      speed: 'unknown',
    })
    expect(lineOf(inputs, 'loads')).toBe(
      'I could not find a website at lapsed.example. The domain may have lapsed or not be connected to a site.',
    )
    expect(evaluateChecks(inputs).outcome).toBe('not-loaded')
    expect(recommendOffer(evaluateChecks(inputs).checks)).toBe('website-rescue')
  })

  it('fails on a timeout', () => {
    const inputs: CheckInputs = { host: 'example.com', https: failure('timeout'), httpProbe: failure('timeout') }
    expect(lineOf(inputs, 'loads')).toBe('Your homepage did not finish loading within 8 seconds.')
  })

  it('fails when neither https nor http answers', () => {
    const inputs: CheckInputs = {
      host: 'example.com',
      https: failure('connect', 'ECONNREFUSED'),
      httpFallback: failure('connect', 'ECONNREFUSED', 'http://www.example.com/'),
      httpProbe: failure('connect'),
    }
    expect(lineOf(inputs, 'loads')).toBe('Your domain exists, but no website answered when I knocked.')
  })

  it('fails on an error status', () => {
    const inputs: CheckInputs = { host: 'example.com', https: page('<h1>Server error</h1>', { status: 500 }), httpProbe: PROBE_FORWARDS }
    expect(lineOf(inputs, 'loads')).toBe('Your homepage returned an error (status 500) instead of a page.')
    expect(statuses(inputs).loads).toBe('fail')
  })

  it('warns on a parked page', () => {
    const parked = '<html><head><title>example.com is for sale</title></head><body><p>This domain is for sale.</p></body></html>'
    const inputs: CheckInputs = { host: 'example.com', https: page(parked), httpProbe: PROBE_FORWARDS }
    expect(statuses(inputs).loads).toBe('warn')
    expect(recommendOffer(evaluateChecks(inputs).checks)).toBe('website-rescue')
  })

  it('does not call a long contractor homepage parked for saying "under construction"', () => {
    const long = fixture('good-site.html').replace('<h2>Get a free estimate</h2>', `<p>${'Homes under construction across the metro. '.repeat(40)}</p>`)
    const inputs: CheckInputs = { host: 'example.com', https: page(long), httpProbe: PROBE_FORWARDS }
    expect(statuses(inputs).loads).toBe('pass')
  })

  it('warns on a slow first byte', () => {
    const inputs: CheckInputs = {
      host: 'example.com',
      https: page(fixture('good-site.html'), { ttfbMs: 4000, totalMs: 4200 }),
      httpProbe: PROBE_FORWARDS,
    }
    expect(lineOf(inputs, 'loads')).toBe('Your homepage loaded, but it took 4.0 seconds to start answering.')
  })

  it('warns on a PDF at the root', () => {
    const inputs: CheckInputs = {
      host: 'example.com',
      https: page('%PDF-1.4', { contentType: 'application/pdf' }),
      httpProbe: PROBE_FORWARDS,
    }
    expect(lineOf(inputs, 'loads')).toBe('Your address returned a PDF file instead of a web page.')
    expect(statuses(inputs).mobile).toBe('unknown')
  })
})

describe('C2 https', () => {
  it('fails on an expired certificate, using the http fallback for the page', () => {
    const inputs: CheckInputs = {
      host: 'example.com',
      https: failure('tls', 'CERT_HAS_EXPIRED'),
      httpFallback: page(fixture('good-site.html'), { url: 'http://www.example.com/' }),
      httpProbe: PROBE_SERVES,
    }
    expect(statuses(inputs)).toEqual({ loads: 'pass', https: 'fail', mobile: 'pass', call: 'pass', form: 'pass', speed: 'pass' })
    expect(lineOf(inputs, 'https')).toBe("Your site's security certificate is expired, so browsers show a warning before the page.")
  })

  it('names a certificate issued for a different name', () => {
    const inputs: CheckInputs = { host: 'example.com', https: failure('tls', 'ERR_TLS_CERT_ALTNAME_INVALID'), httpFallback: failure('connect') }
    expect(lineOf(inputs, 'https')).toBe(
      "Your site's security certificate is issued for a different name, so browsers show a warning before the page.",
    )
  })

  it('fails when only http works', () => {
    const inputs: CheckInputs = {
      host: 'example.com',
      https: failure('connect', 'ECONNREFUSED'),
      httpFallback: page(fixture('good-site.html'), { url: 'http://www.example.com/' }),
      httpProbe: PROBE_SERVES,
    }
    expect(statuses(inputs).https).toBe('fail')
    expect(lineOf(inputs, 'https')).toBe(
      'Your site does not open over https. Browsers such as Chrome label pages like this "Not secure".',
    )
  })

  it('warns when the http probe timed out', () => {
    const inputs: CheckInputs = { host: 'example.com', https: page(fixture('good-site.html')), httpProbe: failure('timeout') }
    expect(statuses(inputs).https).toBe('warn')
  })
})

describe('C3 to C6 details', () => {
  it('warns when pinch zoom is blocked', () => {
    const html = fixture('good-site.html').replace('initial-scale=1', 'initial-scale=1, user-scalable=no')
    const inputs: CheckInputs = { host: 'example.com', https: page(html), httpProbe: PROBE_FORWARDS }
    expect(lineOf(inputs, 'mobile')).toBe('Your site stops visitors from pinching to zoom, which makes small text hard to read.')
  })

  it('passes the form check on a known embed', () => {
    const html = fixture('mailto-only.html').replace('</main>', '<iframe src="https://form.jotform.com/12345"></iframe></main>')
    const inputs: CheckInputs = { host: 'example.com', https: page(html), httpProbe: PROBE_FORWARDS }
    expect(statuses(inputs).form).toBe('pass')
  })

  it('finds a form one click away on the contact page', () => {
    const home = fixture('mailto-only.html').replace('</main>', '<a href="/contact-us">Contact</a></main>')
    const link = needsContactPage(page(home))
    expect(link).toEqual({ url: 'https://www.example.com/contact-us', pageName: 'contact' })
    const inputs: CheckInputs = {
      host: 'example.com',
      https: page(home),
      httpProbe: PROBE_FORWARDS,
      contactPage: { pageName: 'contact', fetch: page(fixture('good-site.html'), { url: 'https://www.example.com/contact-us' }) },
    }
    expect(statuses(inputs).form).toBe('pass')
    expect(lineOf(inputs, 'form')).toBe('I found a contact or quote form on your contact page, one click from the homepage.')
  })

  it('only follows same-site contact links', () => {
    const analysis = analyzeHtml('<a href="https://other.example/contact">Contact</a><a href="tel:5045550142">Call</a>')
    expect(findContactLink(analysis, 'https://www.example.com/')).toBe(null)
  })

  it('fails speed when the body hit the 2 MB cap', () => {
    const inputs: CheckInputs = {
      host: 'example.com',
      https: page(fixture('good-site.html'), { truncated: true, bytes: 2 * 1024 * 1024 }),
      httpProbe: PROBE_FORWARDS,
    }
    expect(statuses(inputs).speed).toBe('fail')
    expect(recommendOffer(evaluateChecks(inputs).checks)).toBe('website-rescue')
  })

  it('never fails the call or form checks', () => {
    for (const name of ['good-site.html', 'no-viewport.html', 'mailto-only.html', 'js-shell.html']) {
      const run = evaluateChecks({ host: 'example.com', https: page(fixture(name)), httpProbe: PROBE_FORWARDS })
      const nonFailing = run.checks.filter((check) => check.id === 'call' || check.id === 'form')
      expect(nonFailing.every((check) => check.status !== 'fail')).toBe(true)
    }
  })
})

describe('hostile markup', () => {
  // Lazy regexes go quadratic on thousands of unclosed tags, which would block
  // the event loop where no timeout can stop it. 2 MB is the fetch cap.
  const TWO_MB = 2 * 1024 * 1024
  const cases: Array<[string, string]> = [
    ['unclosed anchors', '<a href="/x">'],
    ['unclosed scripts', '<script>'],
    ['unclosed forms', '<form><input type=text>'],
    ['bare angle brackets', '< '],
    ['unclosed titles', '<title>'],
    ['unclosed comments', '<!-- '],
    ['long unterminated attributes', '<a href="'],
  ]
  for (const [label, unit] of cases) {
    it(`analyzes 2 MB of ${label} quickly`, () => {
      const html = unit.repeat(Math.floor(TWO_MB / unit.length))
      const started = Date.now()
      analyzeHtml(html)
      expect(Date.now() - started).toBeLessThan(1500)
    })
  }

  it('keeps a script body that mentions <script> out of the visible text', () => {
    const html = '<body><p>Hello there</p><script>document.write("<script src=x><\\/script>"); var t = "secret words";</script><p>Bye</p></body>'
    expect(analyzeHtml(html).visibleText).toBe('Hello there Bye')
  })
})

describe('summary for the report request', () => {
  it('lists every check, worst first, with the recommendation', () => {
    const run = evaluateChecks({ host: 'example.com', https: page(fixture('no-viewport.html')), httpProbe: PROBE_SERVES })
    const { offer, checks } = withRecommendation(run.checks)
    const result: WebsiteCheckResult = {
      checkedAt: '2026-10-18T15:04:05.000Z',
      inputUrl: 'example.com',
      host: 'example.com',
      finalUrl: run.finalUrl,
      outcome: run.outcome,
      offer,
      checks,
    }
    const text = formatSummaryText(result)
    const lines = text.split('\n')
    expect(lines[0]).toBe('Website check: example.com')
    expect(lines).toContain('Recommendation: Website Rescue ($1,500)')
    expect(lines).toContain('Totals: 1 fail, 4 warn, 1 pass, 0 not checked')
    expect(lines[7].startsWith('FAIL | It fits a phone: ')).toBe(true)
    expect(countStatuses(checks).warn).toBe(4)
    expect(checks.find((check) => check.id === 'mobile')?.fix).toBe('Website Rescue fixes this.')
    expect(checks.find((check) => check.id === 'form')?.fix).toBe('Website Rescue includes a quote form.')
  })
})

describe('v1: domain and email results in the summary and the offer', () => {
  const domain = {
    id: 'domain' as const,
    label: 'Domain renewal',
    status: 'warn' as const,
    line: 'Your domain renews by Nov 4, 2026, in 9 days. If auto-renew is off, your site and email stop.',
  }
  const email = {
    id: 'email' as const,
    label: 'Email records',
    status: 'fail' as const,
    line: 'Your domain has no mail server (MX) record and no SPF record, so it cannot reliably send or receive email.',
    note: 'I did not check DKIM, the third email record, because it can only be looked up with a name your email provider picks.',
  }

  it('points both to Site Care and leaves the page-based offer alone', () => {
    const run = evaluateChecks({ host: 'example.com', https: page(fixture('good-site.html')), httpProbe: PROBE_FORWARDS })
    const { offer, checks } = withRecommendation([...run.checks, domain, email])
    expect(offer).toBe('lead-flow-audit')
    expect(checks.find((check) => check.id === 'domain')?.fix).toBe('Site Care covers this.')
    expect(checks.find((check) => check.id === 'email')?.fix).toBe('Site Care covers this.')
  })

  it('offers nothing when no page check could run, even with domain and email results', () => {
    const run = evaluateChecks({ host: 'example.com', https: page(fixture('challenge-403.html'), { status: 403 }) })
    expect(recommendOffer([...run.checks, domain, email])).toBe(null)
  })

  it('includes the new results and the DKIM note in the report summary', () => {
    const run = evaluateChecks({ host: 'example.com', https: page(fixture('good-site.html')), httpProbe: PROBE_FORWARDS })
    const { offer, checks } = withRecommendation([...run.checks, domain, email])
    const result: WebsiteCheckResult = {
      checkedAt: '2026-10-26T12:00:00.000Z',
      inputUrl: 'example.com',
      host: 'example.com',
      finalUrl: 'https://www.example.com/',
      outcome: 'checked',
      offer,
      checks,
    }
    const lines = formatSummaryText(result).split('\n')
    expect(lines).toContain('Totals: 1 fail, 1 warn, 6 pass, 0 not checked')
    expect(lines).toContain(`FAIL | Email records: ${email.line}`)
    expect(lines).toContain(`WARN | Domain renewal: ${domain.line}`)
    expect(lines[lines.length - 1]).toBe(`Note | Email records: ${email.note}`)
  })
})
