/**
 * HIGH PRIORITY: the v3 offer catalog (data/catalog.ts).
 *
 * The catalog is the only place prices live. These tests pin the values Ben
 * decided (DIRECTION.md §8 and the Wave 2 brief), so a price change is a
 * deliberate edit to this file and the catalog together.
 */

import {
  catalog,
  catalogCategories,
  formatOfferPrice,
  formatPrice,
  getOffer,
  getOffersByCategory,
} from '@/data/catalog'

describe('Catalog - categories', () => {
  it('has exactly three categories in order: Websites, Lead & Business Systems, Care', () => {
    expect(catalogCategories.map((category) => category.name)).toEqual([
      'Websites',
      'Lead & Business Systems',
      'Care',
    ])
    expect(catalogCategories.map((category) => category.servicePath)).toEqual([
      'websites',
      'business-systems',
      'growth-support',
    ])
  })

  it('puts every offer in one of the three categories, with no add-ons', () => {
    const ids = catalogCategories.map((category) => category.id)
    catalog.forEach((offer) => expect(ids).toContain(offer.category))
    expect(catalog.map((offer) => offer.id)).toEqual([
      'website-rescue',
      'business-website',
      'growth-website',
      'catalog-custom-build',
      'lead-flow-audit',
      'lead-capture-follow-up',
      'custom-business-software',
      'site-care',
      'system-care',
    ])
    expect(catalog.some((offer) => /add-?on/i.test(`${offer.id} ${offer.name}`))).toBe(false)
  })

  it('has unique ids, usable as homepage anchors', () => {
    const ids = catalog.map((offer) => offer.id)
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => expect(/^[a-z0-9-]+$/.test(id)).toBe(true))
  })
})

describe('Catalog - decided prices', () => {
  const expected: Array<[string, string, string]> = [
    ['website-rescue', 'Website Rescue', '$1,500'],
    ['business-website', 'Business Website', 'from $3,000'],
    ['growth-website', 'Growth Website', 'from $5,000'],
    ['catalog-custom-build', 'Catalog & Custom Build', 'Quoted after a call'],
    ['lead-flow-audit', 'Lead Flow Audit', '$500'],
    ['lead-capture-follow-up', 'Lead Capture & Follow-Up', 'from $3,500'],
    ['custom-business-software', 'Custom Business Software', 'from $10,000'],
    ['site-care', 'Site Care', '$99/mo (Rescue and Business sites) or $150/mo (larger sites)'],
    ['system-care', 'System Care', 'from $450/mo'],
  ]

  expected.forEach(([id, name, price]) => {
    it(`${id} is "${name}" at ${price}`, () => {
      const offer = getOffer(id)
      expect(offer).toBeDefined()
      expect(offer!.name).toBe(name)
      expect(formatOfferPrice(offer!)).toBe(price)
    })
  })

  it('keeps Website Rescue fixed, up to 5 pages, live 10 business days after content', () => {
    const rescue = getOffer('website-rescue')!
    expect(rescue.prices).toEqual([{ amount: 1500, basis: 'fixed' }])
    expect(rescue.summary).toContain('Up to 5 pages')
    expect(/dead, missing or broken/.test(rescue.summary)).toBe(true)
    expect(rescue.priceNote).toBe('Live 10 business days after your content arrives.')
  })

  it('describes the website tiers by size', () => {
    expect(getOffer('business-website')!.summary).toContain('5 to 8 pages')
    expect(/Up to 15 pages.*booking.*galleries/.test(getOffer('growth-website')!.summary)).toBe(true)
    expect(/30-page catalogs.*online stores.*portals.*custom features/.test(getOffer('catalog-custom-build')!.summary)).toBe(true)
  })

  it('gives the top website tier no price, a quoted label and the typical range', () => {
    const top = getOffer('catalog-custom-build')!
    expect(top.prices).toEqual([])
    expect(top.priceLabel).toBe('Quoted after a call')
    expect(top.priceNote).toBe('Most land between $6,000 and $12,000, payable in three parts.')
  })

  it('credits the Lead Flow Audit toward a build', () => {
    expect(getOffer('lead-flow-audit')!.priceNote).toBe('Credited toward a build.')
  })

  it('prices Site Care at $99 and $150 a month, and System Care from $450 a month', () => {
    expect(getOffer('site-care')!.prices).toEqual([
      { amount: 99, basis: 'fixed', per: 'month', appliesTo: 'Rescue and Business sites' },
      { amount: 150, basis: 'fixed', per: 'month', appliesTo: 'larger sites' },
    ])
    expect(getOffer('system-care')!.prices).toEqual([{ amount: 450, basis: 'from', per: 'month' }])
  })

  it('flags every website price as pending and nothing else', () => {
    getOffersByCategory('websites').forEach((offer) => expect(offer.pending).toBe(true))
    catalog
      .filter((offer) => offer.category !== 'websites')
      .forEach((offer) => expect(offer.pending).toBe(false))
  })

  it('formats prices in USD with no cents', () => {
    expect(formatPrice({ amount: 10000, basis: 'from' })).toBe('from $10,000')
    expect(formatPrice({ amount: 99, basis: 'fixed', per: 'month' })).toBe('$99/mo')
  })
})

describe('Catalog - copy rules', () => {
  it('has no em dashes and no team voice', () => {
    const copy = [
      ...catalogCategories.flatMap((category) => [category.name, category.blurb]),
      ...catalog.flatMap((offer) => [offer.name, offer.summary, offer.priceLabel ?? '', offer.priceNote ?? '']),
    ]
    copy.forEach((text) => {
      expect(text).not.toContain('—')
      expect(/\bour team\b|\bwe\b/i.test(text)).toBe(false)
    })
  })
})
