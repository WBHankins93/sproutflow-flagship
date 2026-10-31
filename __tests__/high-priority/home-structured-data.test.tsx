/**
 * HIGH PRIORITY: structured data and llms.txt follow data/catalog.ts.
 *
 * The OfferCatalog has one Offer per fixed-price offer, with its exact price,
 * then the custom quote with no price at all.
 */

import fs from 'fs'
import path from 'path'
import { render } from '@testing-library/react'
import StructuredData from '@/components/StructuredData'
import { catalogCategories, customQuote, fixedOffers, getCategory } from '@/data/catalog'

const WWW = 'https://www.sproutflow-studio.com'

function readOrganization() {
  const { container } = render(<StructuredData />)
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => JSON.parse(script.textContent || '{}'))
    .find((schema) => schema.hasOfferCatalog)
}

type PriceSpec = { '@type': string; price?: number; minPrice?: number; priceCurrency: string; unitCode?: string }

function specsOf(offer: Record<string, unknown>): PriceSpec[] {
  const spec = offer.priceSpecification as PriceSpec | PriceSpec[] | undefined
  if (!spec) return []
  return Array.isArray(spec) ? spec : [spec]
}

describe('Structured data - offer catalog matches data/catalog.ts', () => {
  const organization = readOrganization()
  const offers: Array<Record<string, any>> = organization.hasOfferCatalog.itemListElement

  it('lists the three fixed offers, then the custom quote, in order', () => {
    expect(organization.hasOfferCatalog['@type']).toBe('OfferCatalog')
    expect(offers.map((offer) => offer.itemOffered.name)).toEqual([
      'Starter landing page',
      'Lead Flow Audit',
      'Site Care',
      'Custom quote',
    ])
    fixedOffers.forEach((source, index) => {
      const offer = offers[index]
      expect(offer['@type']).toBe('Offer')
      expect(offer.itemOffered['@type']).toBe('Service')
      expect(offer.itemOffered.description).toBe(source.summary)
      expect(offer.itemOffered.category).toBe(getCategory(source.category).name)
      expect(offer.itemOffered.url).toBe(`${WWW}/#${source.id}`)
    })
  })

  it('prices the Starter landing page and the Lead Flow Audit at a fixed 500 USD', () => {
    ;[offers[0], offers[1]].forEach((offer) => {
      expect(offer.price).toBe('500')
      expect(offer.priceCurrency).toBe('USD')
      expect(offer.priceSpecification).toBeUndefined()
    })
  })

  it('prices Site Care as two monthly prices, 99 and 150 USD', () => {
    const care = offers[2]
    expect(care.price).toBeUndefined()
    const specs = specsOf(care)
    expect(specs.map((spec) => spec.price)).toEqual([99, 150])
    specs.forEach((spec) => {
      expect(spec['@type']).toBe('UnitPriceSpecification')
      expect(spec.unitCode).toBe('MON')
      expect(spec.priceCurrency).toBe('USD')
      expect(spec.minPrice).toBeUndefined()
    })
  })

  it('gives the custom quote no price at all', () => {
    const custom = offers[3]
    expect(custom['@type']).toBe('Offer')
    expect(custom.itemOffered.url).toBe(`${WWW}/#${customQuote.id}`)
    expect(custom.itemOffered.description).toBe(customQuote.summary)
    expect(custom.price).toBeUndefined()
    expect(custom.priceSpecification).toBeUndefined()
    expect(custom.priceCurrency).toBeUndefined()
    expect(/\$|1,?500|6,?000/.test(JSON.stringify(custom))).toBe(false)
  })

  it('has no removed offers', () => {
    const json = JSON.stringify(organization)
    ;['Website Rescue', 'Business Website', 'Growth Website', 'Catalog & Custom Build', 'Lead Capture', 'Custom Business Software'].forEach(
      (name) => expect(json.includes(name)).toBe(false),
    )
  })

  it('serves anyone: no neighborhood list in areaServed', () => {
    expect(/Metairie|Kenner|Northshore|Westbank/i.test(JSON.stringify(organization))).toBe(false)
    expect(organization.slogan).toBe('Find the leaks. Fix the site. Book the work.')
  })
})

describe('llms.txt - follows the catalog', () => {
  const llms = fs.readFileSync(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8')

  it('has a fixed-price section and a custom-quote section', () => {
    expect(llms).toContain('## Fixed-price offers')
    expect(llms).toContain('## Custom quote: "Bring me the problem."')
  })

  it('lists every offer with its homepage anchor and exact price', () => {
    ;[...fixedOffers, customQuote].forEach((offer) => {
      expect(llms).toContain(`[${offer.name}](${WWW}/#${offer.id})`)
    })
    const line = (name: string) => llms.split('\n').find((entry) => entry.includes(`[${name}]`))!
    expect(line('Starter landing page')).toContain('$500 fixed')
    expect(line('Lead Flow Audit')).toContain('$500 fixed, credited toward any build')
    expect(line('Site Care')).toContain('$99 a month for starter and small sites, $150 a month for larger sites')
    expect(/\$/.test(line('Custom quote'))).toBe(false)
  })

  it('carries the range line verbatim, once', () => {
    expect(llms.split(customQuote.range).length).toBe(2)
  })

  it('still links the three service pages', () => {
    catalogCategories.forEach((category) => expect(llms).toContain(`/services/${category.servicePath}`))
  })

  it('has no em dashes and no removed offers', () => {
    expect(llms).not.toContain('—')
    ;['Website Rescue', 'Lead Capture', 'from $'].forEach((term) => expect(llms.includes(term)).toBe(false))
  })
})
