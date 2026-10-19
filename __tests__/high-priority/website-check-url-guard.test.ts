/**
 * @jest-environment node
 * @jest-environment-options {"window": {}}
 */
// The empty `window` only satisfies jest.setup.js, which assigns
// window.matchMedia unguarded. Nothing under test reads it.
/**
 * HIGH PRIORITY TESTS: website check SSRF boundary
 *
 * The checker fetches URLs a stranger types in. These tests pin the rules
 * that keep it from ever touching private, loopback, link-local, CGNAT,
 * metadata or local IPv6 addresses, odd ports or non-web schemes.
 */

import {
  isBlockedIp,
  normalizeInput,
  parseIPv6,
  resolvePublicAddresses,
  validateTargetUrl,
  type LookupFn,
} from '@/lib/website-check/url-guard'

function lookupReturning(...addresses: string[]): LookupFn {
  return async () => addresses.map((address) => ({ address, family: address.includes(':') ? 6 : 4 }))
}

function reasonOf(raw: unknown): string {
  const result = normalizeInput(raw)
  return result.ok ? 'ok' : result.reason
}

describe('normalizeInput', () => {
  it('adds https:// when the scheme is missing and keeps the path', () => {
    const result = normalizeInput('  bayouroofing.com/services#top ')
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.url.href).toBe('https://bayouroofing.com/services')
    expect(result.hostname).toBe('bayouroofing.com')
    expect(result.input).toBe('bayouroofing.com/services#top')
  })

  it('keeps an explicit http:// scheme and strips www for display', () => {
    const result = normalizeInput('http://www.Example.com')
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.url.protocol).toBe('http:')
    expect(result.hostname).toBe('www.example.com')
    expect(result.displayHost).toBe('example.com')
  })

  it('accepts ports 80 and 443 only', () => {
    expect(reasonOf('https://example.com:443/')).toBe('ok')
    expect(reasonOf('http://example.com:80/')).toBe('ok')
    expect(reasonOf('http://example.com:8080/')).toBe('blocked')
    expect(reasonOf('example.com:22')).toBe('blocked')
  })

  it('rejects non-web schemes', () => {
    expect(reasonOf('ftp://example.com/file')).toBe('blocked')
    expect(reasonOf('file:///etc/passwd')).toBe('blocked')
    expect(reasonOf('javascript:alert(1)')).toBe('blocked')
    expect(reasonOf('mailto:owner@example.com')).toBe('blocked')
    expect(reasonOf('gopher://example.com')).toBe('blocked')
  })

  it('rejects credentials in the URL', () => {
    expect(reasonOf('http://user:pass@example.com')).toBe('blocked')
    expect(reasonOf('https://admin@example.com')).toBe('blocked')
  })

  it('rejects IP literals in every spelling', () => {
    expect(reasonOf('127.0.0.1')).toBe('blocked')
    expect(reasonOf('http://10.0.0.5')).toBe('blocked')
    expect(reasonOf('http://8.8.8.8')).toBe('blocked')
    expect(reasonOf('http://2130706433/')).toBe('blocked') // decimal 127.0.0.1
    expect(reasonOf('http://0x7f.0.0.1/')).toBe('blocked')
    expect(reasonOf('http://[::1]/')).toBe('blocked')
    expect(reasonOf('http://[::ffff:127.0.0.1]/')).toBe('blocked')
  })

  it('rejects local host names', () => {
    expect(reasonOf('localhost')).toBe('blocked')
    expect(reasonOf('http://localhost:3000')).toBe('blocked')
    expect(reasonOf('printer.local')).toBe('blocked')
    expect(reasonOf('db.internal')).toBe('blocked')
    expect(reasonOf('router.lan')).toBe('blocked')
    expect(reasonOf('app.localhost')).toBe('blocked')
  })

  it('reports empty and malformed input separately', () => {
    expect(reasonOf('')).toBe('empty')
    expect(reasonOf('   ')).toBe('empty')
    expect(reasonOf(undefined)).toBe('empty')
    expect(reasonOf(42)).toBe('empty')
    expect(reasonOf('bayou roofing')).toBe('invalid')
    expect(reasonOf('bayouroofing')).toBe('invalid')
    expect(reasonOf('example.c0m')).toBe('invalid')
    expect(reasonOf(`https://example.com/${'a'.repeat(2100)}`)).toBe('invalid')
  })

  it('accepts punycode domains', () => {
    expect(reasonOf('xn--bcher-kva.example')).toBe('ok')
    expect(reasonOf('münchen.de')).toBe('ok')
  })
})

describe('isBlockedIp: IPv4', () => {
  const blocked = [
    '127.0.0.1',
    '127.255.255.254',
    '10.0.0.5',
    '10.255.255.255',
    '172.16.0.1',
    '172.31.255.255',
    '192.168.0.1',
    '192.168.255.255',
    '169.254.169.254',
    '169.254.0.1',
    '100.64.0.1',
    '100.127.255.255',
    '0.0.0.0',
    '192.0.0.8',
    '198.18.0.1',
    '224.0.0.1',
    '239.255.255.250',
    '255.255.255.255',
  ]
  const allowed = ['8.8.8.8', '1.1.1.1', '172.15.255.255', '172.32.0.1', '100.63.255.255', '100.128.0.1', '76.76.21.21']

  for (const address of blocked) {
    it(`blocks ${address}`, () => {
      expect(isBlockedIp(address)).toBe(true)
    })
  }
  for (const address of allowed) {
    it(`allows ${address}`, () => {
      expect(isBlockedIp(address)).toBe(false)
    })
  }
})

describe('isBlockedIp: IPv6', () => {
  it('blocks loopback and unspecified', () => {
    expect(isBlockedIp('::1')).toBe(true)
    expect(isBlockedIp('0:0:0:0:0:0:0:1')).toBe(true)
    expect(isBlockedIp('::')).toBe(true)
  })

  it('blocks unique local fc00::/7', () => {
    expect(isBlockedIp('fc00::1')).toBe(true)
    expect(isBlockedIp('fd12:3456:789a::1')).toBe(true)
  })

  it('blocks link-local fe80::/10, with or without a zone', () => {
    expect(isBlockedIp('fe80::1')).toBe(true)
    expect(isBlockedIp('febf::1')).toBe(true)
    expect(isBlockedIp('fe80::1%lo0')).toBe(true)
  })

  it('blocks multicast and documentation ranges', () => {
    expect(isBlockedIp('ff02::1')).toBe(true)
    expect(isBlockedIp('2001:db8::1')).toBe(true)
  })

  it('judges IPv4-mapped addresses by their IPv4 part', () => {
    expect(isBlockedIp('::ffff:127.0.0.1')).toBe(true)
    expect(isBlockedIp('::ffff:7f00:1')).toBe(true)
    expect(isBlockedIp('::ffff:192.168.0.1')).toBe(true)
    expect(isBlockedIp('::ffff:169.254.169.254')).toBe(true)
    expect(isBlockedIp('::ffff:8.8.8.8')).toBe(false)
  })

  it('blocks 6to4 addresses that wrap a private IPv4', () => {
    expect(isBlockedIp('2002:0a00:0005::1')).toBe(true)
    expect(isBlockedIp('2002:0808:0808::1')).toBe(false)
  })

  it('allows ordinary global unicast', () => {
    expect(isBlockedIp('2606:4700:4700::1111')).toBe(false)
    expect(isBlockedIp('2a00:1450:4001:80b::200e')).toBe(false)
  })

  it('fails closed on anything unparseable', () => {
    expect(isBlockedIp('not-an-ip')).toBe(true)
    expect(isBlockedIp('1:2:3')).toBe(true)
    expect(isBlockedIp('')).toBe(true)
    expect(parseIPv6('1::2::3')).toBe(null)
  })
})

describe('validateTargetUrl (used on every redirect hop)', () => {
  it('blocks a redirect target on a private IP literal', () => {
    expect(validateTargetUrl(new URL('http://169.254.169.254/latest/meta-data/'))).toBe('blocked')
    expect(validateTargetUrl(new URL('http://[fd00::1]/'))).toBe('blocked')
  })

  it('blocks a redirect target on another port or scheme', () => {
    expect(validateTargetUrl(new URL('https://example.com:8443/'))).toBe('blocked')
    expect(validateTargetUrl(new URL('ftp://example.com/'))).toBe('blocked')
  })

  it('allows an ordinary public URL', () => {
    expect(validateTargetUrl(new URL('https://www.example.com/contact'))).toBe(null)
  })
})

describe('resolvePublicAddresses', () => {
  it('passes when every address is public', async () => {
    const result = await resolvePublicAddresses('example.com', lookupReturning('93.184.216.34', '2606:2800:220:1::1'))
    expect(result.ok).toBe(true)
  })

  it('rejects a host that resolves to 127.0.0.1', async () => {
    const result = await resolvePublicAddresses('evil.example', lookupReturning('127.0.0.1'))
    expect(result).toEqual({ ok: false, reason: 'blocked' })
  })

  it('rejects a host that resolves to the cloud metadata address', async () => {
    const result = await resolvePublicAddresses('evil.example', lookupReturning('169.254.169.254'))
    expect(result).toEqual({ ok: false, reason: 'blocked' })
  })

  it('rejects a mixed answer with one private address', async () => {
    const result = await resolvePublicAddresses('evil.example', lookupReturning('93.184.216.34', '10.0.0.5'))
    expect(result).toEqual({ ok: false, reason: 'blocked' })
  })

  it('rejects ::1 and ::ffff:192.168.0.1 answers', async () => {
    expect((await resolvePublicAddresses('a.example', lookupReturning('::1'))).ok).toBe(false)
    expect((await resolvePublicAddresses('b.example', lookupReturning('::ffff:192.168.0.1'))).ok).toBe(false)
  })

  it('reports a missing domain as dns', async () => {
    const lookup: LookupFn = async () => {
      throw Object.assign(new Error('getaddrinfo ENOTFOUND'), { code: 'ENOTFOUND' })
    }
    const result = await resolvePublicAddresses('nothing-here.example', lookup)
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.reason).toBe('dns')
  })

  it('reports an empty answer as dns', async () => {
    const result = await resolvePublicAddresses('empty.example', lookupReturning())
    expect(result).toEqual({ ok: false, reason: 'dns' })
  })

  it('asks DNS for all addresses', async () => {
    const lookup = jest.fn(async () => [{ address: '93.184.216.34', family: 4 }])
    await resolvePublicAddresses('example.com', lookup as unknown as LookupFn)
    expect(lookup).toHaveBeenCalledWith('example.com', { all: true })
  })
})
