/**
 * HIGH PRIORITY TESTS: Wave 3 infrastructure
 *
 * Optimized-image coverage, sitemap/robots/redirects, the tone-aware focus
 * ring, serve-anyone root metadata and the booking embed colour.
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import optimizedImages from '@/lib/optimized-images.json'
import { getBlobImageUrl, getImageUrl } from '@/lib/blob-images'
import { projectProof } from '@/data/projectProof'
import { caseStudies } from '@/data/caseStudies'
import { testimonials } from '@/data/testimonials'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'
import { metadata as rootMetadata } from '@/app/layout'
import tailwindConfig from '../../tailwind.config.js'

const ROOT = process.cwd()
const WWW = 'https://www.sproutflow-studio.com'
const read = (file: string) => readFileSync(join(ROOT, file), 'utf8')
const manifest = optimizedImages as Record<string, string>

const originalEnv = { ...process.env }
afterEach(() => {
  process.env = { ...originalEnv }
})

/** The budget inventory, mirrored from scripts/asset-inventory.mjs. */
function inventory(): string[] {
  const paths = new Set<string>()
  const add = (p?: string) => {
    if (p && /^(images\/)?(work|logo)\//.test(p)) paths.add(p.replace(/^images\//, ''))
  }
  projectProof.forEach((p) => {
    add(p.screenshot)
    add(p.logo)
  })
  caseStudies.forEach((c) => {
    add(c.heroImage)
    add(c.cardImage)
    add(c.builtImage)
  })
  testimonials.forEach((t) => add(t.logoSrc))
  for (const file of ['components/layout/Header.tsx', 'components/layout/Footer.tsx']) {
    for (const m of read(file).matchAll(/getImageUrl\('([^']+)'\)/g)) add(m[1])
  }
  return [...paths].sort()
}

describe('optimized image pipeline', () => {
  it('maps every budgeted asset the site requests, and nothing else', () => {
    const mapped = Object.keys(manifest).map((key) => key.replace(/^images\//, '')).sort()
    expect(mapped).toEqual(inventory())
  })

  it('ships every derivative as a tracked WebP under public/optimized-images', () => {
    for (const [source, optimized] of Object.entries(manifest)) {
      expect(source.startsWith('images/')).toBe(true)
      expect(/^\/optimized-images\/.+\.webp$/.test(optimized)).toBe(true)
      const file = join(ROOT, 'public', optimized)
      expect(existsSync(file)).toBe(true)
      const buf = readFileSync(file)
      expect(buf.subarray(0, 4).toString()).toBe('RIFF')
      expect(buf.subarray(8, 12).toString()).toBe('WEBP')
    }
  })

  it('prefers the optimized path over the blob origin in production', () => {
    ;(process.env as any).NODE_ENV = 'production'
    process.env.NEXT_PUBLIC_BLOB_STORE_URL = 'https://store.public.blob.vercel-storage.com'
    expect(getImageUrl('logo/main-logo-Photoroom.png')).toBe('/optimized-images/logo/main-logo-Photoroom.webp')
    expect(getImageUrl('/work/client-logos/nps-project.png')).toBe('/optimized-images/work/client-logos/nps-project.webp')
    expect(getBlobImageUrl('/images/work/client-logos/djn-logo.webp')).toBe(
      '/optimized-images/work/client-logos/djn-logo.webp',
    )
  })

  it('leaves unmapped images on the blob origin, or local without one', () => {
    ;(process.env as any).NODE_ENV = 'production'
    process.env.NEXT_PUBLIC_BLOB_STORE_URL = 'https://store.public.blob.vercel-storage.com/'
    expect(getImageUrl('ben-photo.png')).toBe('https://store.public.blob.vercel-storage.com/images/ben-photo.png')
    expect(getImageUrl('case-studies/djn-before-home.png')).toBe(
      'https://store.public.blob.vercel-storage.com/images/case-studies/djn-before-home.png',
    )
    delete process.env.NEXT_PUBLIC_BLOB_STORE_URL
    expect(getImageUrl('ben-photo.png')).toBe('/images/ben-photo.png')
  })

  it('needs no remote pattern for local derivatives', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nextConfig = require('../../next.config.js')
    const hosts = nextConfig.images.remotePatterns.map((p: any) => p.hostname)
    expect(hosts).toEqual(['*.vercel-storage.com'])
  })
})

describe('sitemap', () => {
  const urls = () => sitemap().map((entry) => entry.url)

  it('lists every public route', () => {
    process.env.NEXT_PUBLIC_CAL_LINK = 'sproutflow/15min'
    const list = urls()
    const expected = [
      '',
      '/services',
      '/services/websites',
      '/services/business-systems',
      '/services/growth-support',
      '/work',
      '/case-studies/second-line-psychiatry',
      '/case-studies/nola-pool-solutions',
      '/case-studies/nealy-events',
      '/case-studies/djn-services',
      '/about',
      '/faq',
      '/how-we-work',
      '/data-and-ownership',
      '/check',
      '/book',
      '/inquiry',
    ]
    expected.forEach((path) => expect(list).toContain(`${WWW}${path}`))
  })

  it('excludes scaffolding, retired indexes and noindex pages', () => {
    process.env.NEXT_PUBLIC_CAL_LINK = 'sproutflow/15min'
    const list = urls()
    ;['/v3-kit', '/kitchen-sink', '/case-studies', '/case-studies/big-butt-association', '/how-we-handle-your-data'].forEach(
      (path) => expect(list).not.toContain(`${WWW}${path}`),
    )
    expect(new Set(list).size).toBe(list.length)
  })
})

describe('robots.txt', () => {
  it('allows every page to every crawler and points to the sitemap', () => {
    const config = robots()
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules]
    expect(rules.length).toBe(1)
    expect(rules[0].userAgent).toBe('*')
    expect(rules[0].allow).toBe('/')
    // Only non-page paths are disallowed.
    expect(rules[0].disallow).toEqual(['/api/', '/admin/'])
    expect(config.sitemap).toBe(`${WWW}/sitemap.xml`)
  })
})

describe('redirects', () => {
  // redirects() reads NEXT_PUBLIC_CAL_LINK when called, not at import.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const load = async (): Promise<any[]> => require('../../next.config.js').redirects()
  /** The redirect equal to `want`, or `want` itself (which then fails toContain). */
  const has = (list: any[], want: object) =>
    list.find((r) => JSON.stringify(r) === JSON.stringify(want)) ?? want

  it('does not redirect /how-we-work, which is a real page in v3', async () => {
    const redirects = await load()
    expect(redirects.find((r) => r.source === '/how-we-work')).toBeUndefined()
    expect(redirects.some((r) => String(r.destination).includes('#process'))).toBe(false)
  })

  it('keeps the retired /case-studies index and old data URL redirects', async () => {
    const redirects = await load()
    expect(redirects).toContain(has(redirects, { source: '/case-studies', destination: '/work', permanent: true }))
    expect(redirects).toContain(
      has(redirects, { source: '/how-we-handle-your-data', destination: '/data-and-ownership', permanent: true }),
    )
  })

  it('sends /book to /inquiry only when booking is off', async () => {
    process.env.NEXT_PUBLIC_CAL_LINK = 'off'
    const off = await load()
    expect(off).toContain(has(off, { source: '/book', destination: '/inquiry', permanent: false }))
    process.env.NEXT_PUBLIC_CAL_LINK = 'sproutflow/15min'
    expect((await load()).some((r) => r.source === '/book')).toBe(false)
  })
})

/** WCAG relative-luminance contrast ratio. */
function contrast(a: string, b: string) {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

describe('focus ring', () => {
  const css = read('app/globals.css')
  const colors = (tailwindConfig as any).theme.extend.colors
  const ringFor = (selector: string) => {
    const re = new RegExp(`${selector.replace(/[[\]()]/g, '\\$&')}[^{]*\\{\\s*--focus-ring:\\s*(#[0-9A-Fa-f]{6})`)
    const match = css.match(re)
    expect(match).not.toBeNull()
    return match![1].toUpperCase()
  }

  it('draws a 2px ring with a 2px offset from the tone variable', () => {
    expect(/:focus-visible\s*\{\s*outline:\s*2px solid var\(--focus-ring\);\s*outline-offset:\s*2px;/.test(css)).toBe(true)
    expect(/:focus-visible\s*\{\s*outline:\s*3px solid #D9A441/.test(css)).toBe(false)
  })

  it('uses Pine on light canvases, Goldenrod on Pine and Birch on Fern', () => {
    expect(ringFor(':root')).toBe('#223528')
    expect(ringFor("section[data-tone='pine']")).toBe('#D9A441')
    expect(ringFor("section[data-tone='fern']")).toBe('#F4EFE3')
    // Header and footer: the Pine footer and mobile menu are keyed off their fill.
    expect(/:is\(section, footer, nav, div, aside, header\)\.bg-primary-900/.test(css)).toBe(true)
  })

  it('meets 3:1 against every Section tone', () => {
    const light = {
      birch: colors.cream[300],
      paper: '#FBF8F1',
      lichen: colors.cream[500],
      clearing: colors.forest.clearing,
      leaf: colors.forest.leaf,
      sunlight: colors.forest.sunlight,
      white: colors.forest.white,
    }
    Object.values(light).forEach((canvas) => expect(contrast('#223528', canvas)).toBeGreaterThanOrEqual(3))
    expect(contrast('#D9A441', colors.primary[900])).toBeGreaterThanOrEqual(3)
    expect(contrast('#F4EFE3', colors.forest.fern)).toBeGreaterThanOrEqual(3)
  })
})

describe('root metadata', () => {
  const description =
    'Websites, lead systems and care for small businesses. Based in New Orleans, working with businesses anywhere.'

  it('uses the serve-anyone positioning', () => {
    expect(rootMetadata.description).toBe(description)
    expect((rootMetadata.openGraph as any).description).toBe(description)
    expect((rootMetadata.twitter as any).description).toBe(description)
    expect((rootMetadata.title as any).template).toBe('%s | Sproutflow Studio')
  })

  it('never frames New Orleans as the audience', () => {
    const text = JSON.stringify(rootMetadata)
    // "Based in New Orleans" is where Ben works from, which is allowed.
    expect(/(?<!based )in New Orleans/i.test(text)).toBe(false)
    expect(/New Orleans, LA/i.test(text)).toBe(false)
  })
})

describe('booking embed', () => {
  it('uses Pine for the Cal.com brand colour', () => {
    const src = read('components/booking/CalEmbed.tsx')
    expect(src).toContain("const BRAND_COLOR = '#223528'")
    expect(/5F755E/i.test(src)).toBe(false)
  })
})
