/**
 * HIGH PRIORITY: structured data and llms.txt follow data/catalog.ts.
 *
 * The OfferCatalog has one Offer per catalog entry. Prices appear only where
 * the catalog has a fixed or "from" value, and the top website tier carries
 * no price at all.
 */

import fs from 'fs'
import path from 'path'
import { render } from '@testing-library/react'
import StructuredData from '@/components/StructuredData'
import { catalog, catalogCategories, getCategory } from '@/data/catalog'

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

  it('lists exactly the catalog offers, in order', () => {
    expect(organization.hasOfferCatalog['@type']).toBe('OfferCatalog')
    expect(offers.map((offer) => offer.itemOffered.name)).toEqual(catalog.map((offer) => offer.name))
    offers.forEach((offer, index) => {
      const source = catalog[index]
      expect(offer['@type']).toBe('Offer')
      expect(offer.itemOffered['@type']).toBe('Service')
      expect(offer.itemOffered.description).toBe(source.summary)
      expect(offer.itemOffered.category).toBe(getCategory(source.category).name)
      expect(offer.itemOffered.url).toBe(`${WWW}/#${source.id}`)
    })
  })

  it('carries each catalog price exactly, and nothing more', () => {
    offers.forEach((offer, index) => {
      const source = catalog[index]
      if (source.prices.length === 0) return
      const single = source.prices.length === 1 && source.prices[0].basis === 'fixed' && !source.prices[0].per
      if (single) {
        expect(offer.price).toBe(String(source.prices[0].amount))
        expect(offer.priceCurrency).toBe('USD')
        expect(offer.priceSpecification).toBeUndefined()
        return
      }
      expect(offer.price).toBeUndefined()
      const specs = specsOf(offer)
      expect(specs.length).toBe(source.prices.length)
      specs.forEach((spec, i) => {
        const price = source.prices[i]
        expect(spec.priceCurrency).toBe('USD')
        if (price.basis === 'from') {
          expect(spec.minPrice).toBe(price.amount)
          expect(spec.price).toBeUndefined()
        } else {
          expect(spec.price).toBe(price.amount)
        }
        if (price.per === 'month') {
          expect(spec['@type']).toBe('UnitPriceSpecification')
          expect(spec.unitCode).toBe('MON')
        }
      })
    })
  })

  it('gives the top website tier no price at all', () => {
    const top = offers.find((offer) => offer.itemOffered.name === 'Catalog & Custom Build')!
    expect(top).toBeDefined()
    expect(top.price).toBeUndefined()
    expect(top.priceSpecification).toBeUndefined()
    expect(top.priceCurrency).toBeUndefined()
    expect(/6,?000|12,?000/.test(JSON.stringify(top))).toBe(false)
  })

  it('keeps Website Rescue at a fixed 1500 USD', () => {
    const rescue = offers.find((offer) => offer.itemOffered.name === 'Website Rescue')!
    expect(rescue.price).toBe('1500')
  })

  it('serves anyone: no neighborhood list in areaServed', () => {
    expect(/Metairie|Kenner|Northshore|Westbank/i.test(JSON.stringify(organization))).toBe(false)
    expect(organization.slogan).toBe('Find the leaks. Fix the site. Book the work.')
  })
})

describe('llms.txt - follows the catalog', () => {
  const llms = fs.readFileSync(path.join(process.cwd(), 'public', 'llms.txt'), 'utf8')

  it('has a section per category', () => {
    catalogCategories.forEach((category) => expect(llms).toContain(`## ${category.name}`))
  })

  it('lists every offer with its homepage anchor', () => {
    catalog.forEach((offer) => {
      expect(llms).toContain(`[${offer.name}](${WWW}/#${offer.id})`)
    })
  })

  it('prices the top website tier only as quoted after a call', () => {
    const line = llms.split('\n').find((entry) => entry.includes('[Catalog & Custom Build]'))!
    expect(line).toContain('quoted after a call')
    expect(/\$/.test(line)).toBe(false)
  })

  it('has no em dashes', () => {
    expect(llms).not.toContain('—')
  })
})
