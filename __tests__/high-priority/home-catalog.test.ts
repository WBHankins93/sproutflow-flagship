/**
 * HIGH PRIORITY: the v3 offer catalog (data/catalog.ts).
 *
 * The catalog is the only place prices live. These tests pin the values Ben
 * decided on 29 Oct 2026 (DIRECTION.md §8): three fixed-price offers and one
 * custom quote with a single range line. A price change is a deliberate edit
 * to this file and the catalog together. A site-wide guard keeps the removed
 * offers and prices from coming back.
 */

import fs from 'fs'
import path from 'path'
import {
  LEGACY_OFFER_KEYS,
  OFFER_KEYS,
  catalog,
  catalogCategories,
  customQuote,
  fixedOffers,
  formatAmount,
  formatOfferPrice,
  formatPrice,
  formatShortPrice,
  getCategory,
  getIncludedItems,
  getOffer,
  toOfferKey,
} from '@/data/catalog'

const RANGE_LINE = 'Most projects land between $1,500 and $6,000, paid in parts.'

describe('Catalog - structure', () => {
  it('has three fixed offers in order, then the custom quote', () => {
    expect(fixedOffers.map((offer) => offer.key)).toEqual(['starter', 'audit', 'care'])
    expect(fixedOffers.map((offer) => offer.name)).toEqual(['Starter landing page', 'Lead Flow Audit', 'Site Care'])
    expect(customQuote.key).toBe('custom')
    expect(OFFER_KEYS).toEqual(['starter', 'audit', 'care', 'custom'])
    expect(catalog).toBe(fixedOffers)
  })

  it('has unique anchor ids that never collide with a homepage section id', () => {
    const ids = [...fixedOffers.map((offer) => offer.id), customQuote.id]
    expect(ids).toEqual(['starter-landing-page', 'lead-flow-audit', 'site-care', 'custom-quote'])
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => {
      expect(/^[a-z0-9-]+$/.test(id)).toBe(true)
      expect(['top', 'promises', 'results', 'check', 'offers', 'care', 'work', 'my-own', 'about', 'book'].includes(id)).toBe(false)
    })
  })

  it('keeps the three service categories for the services pages and care section', () => {
    expect(catalogCategories.map((category) => category.servicePath)).toEqual([
      'websites',
      'business-systems',
      'growth-support',
    ])
    expect(getCategory('care').servicePath).toBe('growth-support')
    fixedOffers.forEach((offer) => expect(catalogCategories.map((c) => c.id)).toContain(offer.category))
  })
})

describe('Catalog - decided prices', () => {
  it('prices the Starter landing page at a fixed $500', () => {
    const starter = getOffer('starter')!
    expect(starter.prices).toEqual([{ amount: 500 }])
    expect(formatOfferPrice(starter)).toBe('$500')
    expect(starter.priceNote).toBe('Live within 5 business days after content arrives.')
    expect(starter.includes).toContain('One round of changes')
    expect(starter.summary).toContain('up to 6 sections (what you do, services, photos, reviews, about, contact)')
    expect(starter.summary).toContain('starter templates')
  })

  it('prices the Lead Flow Audit at a fixed $500, credited toward any build', () => {
    const audit = getOffer('audit')!
    expect(audit.prices).toEqual([{ amount: 500 }])
    expect(formatOfferPrice(audit)).toBe('$500')
    expect(audit.priceNote).toBe('Credited toward any build.')
  })

  it('prices Site Care at $99 a month (starter and small sites) and $150 a month (larger sites)', () => {
    const care = getOffer('care')!
    expect(care.prices).toEqual([
      { amount: 99, per: 'month', appliesTo: 'starter and small sites' },
      { amount: 150, per: 'month', appliesTo: 'larger sites' },
    ])
    expect(formatOfferPrice(care)).toBe('$99/mo (starter and small sites) or $150/mo (larger sites)')
    expect(formatShortPrice(care)).toBe('$99/mo or $150/mo')
  })

  it('finds offers by key or by anchor id, and nothing else', () => {
    expect(getOffer('site-care')).toBe(getOffer('care'))
    expect(getOffer('starter-landing-page')).toBe(getOffer('starter'))
    expect(getOffer('custom')).toBe(undefined)
    expect(getOffer('website-rescue')).toBe(undefined)
  })

  it('formats prices in USD with no cents', () => {
    expect(formatPrice({ amount: 500 })).toBe('$500')
    expect(formatAmount({ amount: 99, per: 'month' })).toBe('$99/mo')
  })
})

describe('Catalog - custom quote', () => {
  it('leads with "Bring me the problem." and the one range line, verbatim', () => {
    expect(customQuote.heading).toBe('Bring me the problem.')
    expect(customQuote.range).toBe(RANGE_LINE)
  })

  it('names what it covers, including System Care, with no price of its own', () => {
    expect(customQuote.examples).toEqual([
      'Multi-page sites',
      'Booking',
      'Catalogs and online stores',
      'Galleries',
      'Lead capture and follow-up systems',
      'Custom business software',
      'System Care',
    ])
    expect('prices' in customQuote).toBe(false)
    const copy = [customQuote.intro, customQuote.summary, ...customQuote.examples, ...customQuote.steps.flatMap((s) => [s.title, s.body])]
    copy.forEach((text) => expect(/\$\s?\d/.test(text)).toBe(false))
  })

  it('explains how it works in three steps and steers to a call', () => {
    expect(customQuote.steps.map((step) => step.title)).toEqual(['15-minute call', 'Written options', 'Pick one'])
    expect(customQuote.steps[1].body).toContain('within 2 business days')
    expect(customQuote.steps[2].body).toContain('in parts')
    expect(customQuote.primaryCta).toBe('Book a 15-minute call')
    expect(customQuote.secondaryCta).toEqual({ label: 'Describe your problem', href: '/inquiry?offer=custom' })
  })
})

describe('Catalog - removed offers stay removed', () => {
  const allCopy = JSON.stringify({ fixedOffers, customQuote, catalogCategories })

  it('has no Website Rescue, website tiers, Lead Capture offer, software price or System Care price', () => {
    ;[
      'Website Rescue',
      'Business Website',
      'Growth Website',
      'Catalog & Custom Build',
      'Lead Capture',
      'Custom Business Software',
      'Rescue sites',
    ].forEach((name) => expect(allCopy.includes(name)).toBe(false))
    const amounts = fixedOffers.flatMap((offer) => offer.prices.map((price) => price.amount))
    expect(amounts).toEqual([500, 500, 99, 150])
  })

  it('has no pending price flags', () => {
    expect(allCopy.includes('pending')).toBe(false)
  })
})

describe('Catalog - offer keys for links', () => {
  it('reads new keys and anchor ids', () => {
    OFFER_KEYS.forEach((key) => expect(toOfferKey(key)).toBe(key))
    expect(toOfferKey('starter-landing-page')).toBe('starter')
    expect(toOfferKey('custom-quote')).toBe('custom')
    expect(toOfferKey(['audit', 'care'])).toBe('audit')
    expect(toOfferKey(' Care ')).toBe('care')
  })

  it('maps every old offer id to the new set', () => {
    expect(LEGACY_OFFER_KEYS).toEqual({
      'website-rescue': 'starter',
      'business-website': 'custom',
      'growth-website': 'custom',
      'catalog-custom-build': 'custom',
      'lead-flow-audit': 'audit',
      'lead-capture-system': 'custom',
      'lead-capture-follow-up': 'custom',
      'custom-business-software': 'custom',
      'site-care': 'care',
      'system-care': 'custom',
    })
    Object.entries(LEGACY_OFFER_KEYS).forEach(([old, key]) => expect(toOfferKey(old)).toBe(key))
  })

  it('treats anything unknown as a custom quote, and nothing as nothing', () => {
    expect(toOfferKey('growth-plan-9000')).toBe('custom')
    expect(toOfferKey('')).toBe(undefined)
    expect(toOfferKey(undefined)).toBe(undefined)
  })
})

describe('Catalog - phone line and included list', () => {
  it('gives every fixed offer one short line and something to list', () => {
    fixedOffers.forEach((offer) => {
      expect(offer.line.length).toBeGreaterThan(0)
      expect(offer.line.length).toBeLessThanOrEqual(48)
      expect(getIncludedItems(offer).length).toBeGreaterThan(0)
    })
  })

  it('builds per-plan prices and price notes into the list from catalog data', () => {
    expect(getIncludedItems(getOffer('care')!).slice(-2)).toEqual([
      '$99/mo for starter and small sites',
      '$150/mo for larger sites',
    ])
    const starter = getIncludedItems(getOffer('starter')!)
    expect(starter[starter.length - 1]).toBe('Live within 5 business days after content arrives.')
  })
})

describe('Catalog - copy rules', () => {
  it('has no em dashes and no team voice', () => {
    const copy = [
      ...catalogCategories.flatMap((category) => [category.name, category.blurb]),
      ...fixedOffers.flatMap((offer) => [offer.name, offer.summary, offer.line, ...offer.includes, offer.priceNote ?? '']),
      customQuote.heading,
      customQuote.intro,
      customQuote.summary,
      customQuote.range,
      ...customQuote.examples,
      ...customQuote.steps.flatMap((step) => [step.title, step.body]),
    ]
    copy.forEach((text) => {
      expect(text).not.toContain('—')
      expect(/\bour team\b|\bwe\b/i.test(text)).toBe(false)
    })
  })
})

/**
 * Site-wide guard (29 Oct restructure): no removed offer or old price in the
 * code that ships. The verbatim range line is the only place "$1,500" and
 * "$6,000" may appear, so it is removed from each file before the scan.
 * components/sections is scanned only for files a live route still imports.
 */
describe('Site-wide - removed offers and old prices are gone', () => {
  const ROOT = process.cwd()
  const FORBIDDEN = ['1,500', '3,000', '3,500', '5,000', '10,000', 'Website Rescue', 'Lead Capture']
  const EXTENSIONS = /\.(ts|tsx|js|jsx|mjs|md|mdx|txt|json)$/

  function walk(dir: string): string[] {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) return entry.name === 'node_modules' || entry.name === 'images' ? [] : walk(full)
      return EXTENSIONS.test(entry.name) ? [full] : []
    })
  }

  const liveFiles = ['app', 'components', 'data', 'lib', 'public'].flatMap((dir) => walk(path.join(ROOT, dir)))
  const sources = new Map(liveFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]))
  const importedSections = new Set(
    Array.from(sources.values()).flatMap((source) =>
      Array.from(source.matchAll(/components\/sections\/(\w+)/g)).map((match) => match[1]),
    ),
  )
  const scanned = liveFiles.filter((file) => {
    const rel = path.relative(ROOT, file).split(path.sep).join('/')
    if (!rel.startsWith('components/sections/')) return true
    return importedSections.has(path.basename(rel).replace(/\.\w+$/, ''))
  })

  it('scans the live code, including rendered components/sections files', () => {
    expect(scanned.length).toBeGreaterThan(50)
    // No live route imports components/sections since Wave 3 (pages-a); the
    // rebuilt service pages are scanned instead.
    expect(scanned.some((file) => file.endsWith(path.join('app', 'services', 'page.tsx')))).toBe(true)
    expect(scanned.some((file) => file.endsWith(path.join('components', 'services', 'OfferBlock.tsx')))).toBe(true)
  })

  it('finds the range line only where it belongs', () => {
    const withRange = scanned.filter((file) => sources.get(file)!.includes(RANGE_LINE))
    expect(withRange.map((file) => path.relative(ROOT, file).split(path.sep).join('/')).sort()).toEqual([
      'data/catalog.ts',
      'public/llms.txt',
    ])
  })

  // Files outside the offers worker's ownership that still show an old offer.
  // Each is listed as a Request in the Wave 2.5 handback; remove the entry once
  // the file is fixed. Nothing else may be added here.
  const PENDING_REQUESTS: string[] = []

  it('has no removed offer name or old price outside the range line', () => {
    const hits: string[] = []
    scanned.forEach((file) => {
      if (PENDING_REQUESTS.includes(path.relative(ROOT, file).split(path.sep).join('/'))) return
      const source = sources.get(file)!.split(RANGE_LINE).join('')
      FORBIDDEN.forEach((term) => {
        if (source.includes(term)) hits.push(`${path.relative(ROOT, file)}: ${term}`)
      })
    })
    expect(hits).toEqual([])
  })
})
