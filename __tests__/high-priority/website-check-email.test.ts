/**
 * @jest-environment node
 * @jest-environment-options {"window": {}}
 */
// The empty `window` only satisfies jest.setup.js, which assigns
// window.matchMedia unguarded. Nothing under test reads it.
/**
 * HIGH PRIORITY TESTS: website check v1, email records over DNS
 *
 * SPF, DMARC and MX cases, timeouts, and the DKIM note. DNS is mocked;
 * nothing here touches the network.
 */

import type { MxRecord } from 'node:dns'
import { checkEmail, dmarcPolicy, EMAIL_LINES, EMAIL_NOTE, type EmailDns } from '@/lib/website-check/email-dns'

type Answer<T> = T | Error | 'hang'

function dnsError(code: string): Error {
  return Object.assign(new Error(`query ${code}`), { code })
}

const NO_DATA = dnsError('ENODATA')
const MX: MxRecord[] = [{ exchange: 'aspmx.l.google.com', priority: 1 }]
const SPF = [['v=spf1 include:_spf.google.com ~all']]

function fakeDns(answers: { txt?: Answer<string[][]>; dmarc?: Answer<string[][]>; mx?: Answer<MxRecord[]> }) {
  const asked: string[] = []
  const answer = <T>(value: Answer<T> | undefined, fallback: Answer<T>): Promise<T> => {
    const chosen = value === undefined ? fallback : value
    if (chosen === 'hang') return new Promise<T>(() => undefined)
    if (chosen instanceof Error) return Promise.reject(chosen)
    return Promise.resolve(chosen)
  }
  const dns: EmailDns = {
    resolveTxt: (name) => {
      asked.push(`TXT ${name}`)
      return name.startsWith('_dmarc.') ? answer(answers.dmarc, NO_DATA) : answer(answers.txt, NO_DATA)
    },
    resolveMx: (name) => {
      asked.push(`MX ${name}`)
      return answer(answers.mx, NO_DATA)
    },
  }
  return { dns, asked }
}

describe('email records check', () => {
  it('passes with SPF and DMARC p=reject, and notes that DKIM was not checked', async () => {
    const { dns, asked } = fakeDns({ txt: SPF, dmarc: [['v=DMARC1; p=reject; rua=mailto:d@example.com']], mx: MX })
    const result = await checkEmail('www.example.com', { dns })
    expect(result).toEqual({
      id: 'email',
      label: 'Email records',
      status: 'pass',
      line: EMAIL_LINES.pass('reject'),
      data: { domain: 'example.com', spf: true, dmarc: 'reject', mx: true },
      note: EMAIL_NOTE,
    })
    expect(asked.sort()).toEqual(['MX example.com', 'TXT _dmarc.example.com', 'TXT example.com'])
  })

  it('passes with p=quarantine', async () => {
    const { dns } = fakeDns({ txt: SPF, dmarc: [['v=DMARC1;p=quarantine;pct=100']], mx: MX })
    expect((await checkEmail('example.com', { dns })).status).toBe('pass')
  })

  it('warns with SPF only (no DMARC)', async () => {
    const { dns } = fakeDns({ txt: [['google-site-verification=abc'], ...SPF], mx: MX })
    const result = await checkEmail('example.com', { dns })
    expect(result.status).toBe('warn')
    expect(result.line).toBe('Your domain has SPF but no DMARC record, so nothing tells inboxes what to do with mail that fakes your address.')
    expect(result.data?.dmarc).toBe('missing')
  })

  it('warns when DMARC is p=none', async () => {
    const { dns } = fakeDns({ txt: SPF, dmarc: [['v=DMARC1; p=none; rua=mailto:d@example.com']], mx: MX })
    const result = await checkEmail('example.com', { dns })
    expect(result.status).toBe('warn')
    expect(result.line).toBe(
      'Your domain has SPF and DMARC, but DMARC is set to watch only (p=none), so inboxes still deliver mail that fakes your address.',
    )
  })

  it('warns when mail servers exist but SPF does not', async () => {
    const strong = fakeDns({ dmarc: [['v=DMARC1; p=reject']], mx: MX })
    expect((await checkEmail('example.com', { dns: strong.dns })).line).toBe(EMAIL_LINES.noSpf)
    const neither = fakeDns({ mx: MX })
    const result = await checkEmail('example.com', { dns: neither.dns })
    expect(result.status).toBe('warn')
    expect(result.line).toBe(EMAIL_LINES.neither)
  })

  it('fails with no MX records and no SPF', async () => {
    const { dns } = fakeDns({ mx: NO_DATA, dmarc: [['v=DMARC1; p=reject']] })
    const result = await checkEmail('example.com', { dns })
    expect(result.status).toBe('fail')
    expect(result.line).toBe('Your domain has no mail server (MX) record and no SPF record, so it cannot reliably send or receive email.')
    expect(result.data?.mx).toBe(false)
  })

  it('treats a null MX (".") as no mail server', async () => {
    const { dns } = fakeDns({ mx: [{ exchange: '.', priority: 0 }] })
    expect((await checkEmail('example.com', { dns })).status).toBe('fail')
  })

  it('does not fail when only the MX lookup times out', async () => {
    const { dns } = fakeDns({ mx: 'hang' })
    const result = await checkEmail('example.com', { dns, deadline: Date.now() + 50 })
    expect(result.status).toBe('warn')
    expect(result.data?.mx).toBe('unknown')
  })

  it('is unknown when a TXT lookup times out, within the deadline', async () => {
    const { dns } = fakeDns({ txt: 'hang', mx: MX })
    const started = Date.now()
    const result = await checkEmail('example.com', { dns, deadline: Date.now() + 50 })
    expect(result.status).toBe('unknown')
    expect(result.line).toBe('I could not read the email records for example.com in time, so I could not check them.')
    expect(Date.now() - started).toBeLessThan(1000)
  })

  it('is unknown when the resolver fails (SERVFAIL, refused)', async () => {
    const { dns } = fakeDns({ txt: SPF, dmarc: dnsError('ESERVFAIL'), mx: MX })
    expect((await checkEmail('example.com', { dns })).status).toBe('unknown')
  })

  it('joins TXT records split into chunks', async () => {
    const { dns } = fakeDns({
      txt: [['v=spf1 include:_spf.google.com ', 'include:servers.mcsv.net ~all']],
      dmarc: [['v=DMARC1; ', 'p=reject']],
      mx: MX,
    })
    expect((await checkEmail('example.com', { dns })).status).toBe('pass')
  })

  it('checks the registrable domain and skips shared platform addresses', async () => {
    const shop = fakeDns({ txt: SPF, mx: MX })
    await checkEmail('shop.bakery.co.uk', { dns: shop.dns })
    expect(shop.asked.sort()).toEqual(['MX bakery.co.uk', 'TXT _dmarc.bakery.co.uk', 'TXT bakery.co.uk'])

    const wix = fakeDns({})
    const result = await checkEmail('mybakery.wixsite.com', { dns: wix.dns })
    expect(result.status).toBe('unknown')
    expect(wix.asked.length).toBe(0)
  })

  it('reads the DMARC policy tag', () => {
    expect(dmarcPolicy('v=DMARC1; p=Reject; sp=none')).toBe('reject')
    expect(dmarcPolicy('v=DMARC1; sp=reject')).toBe(null)
    expect(dmarcPolicy('v=DMARC1;p=none')).toBe('none')
  })
})
