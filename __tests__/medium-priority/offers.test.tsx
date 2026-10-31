/**
 * MEDIUM PRIORITY TESTS: Offers, booking CTAs, and hero proof
 *
 * The Starter landing page is a published fixed-price offer, so its price
 * must match between data/catalog.ts and structured data. Hero stats must be
 * real client results read from published data, never typed into the
 * component. Every pricing and hero CTA must follow the booking fallback:
 * /inquiry when NEXT_PUBLIC_CAL_LINK is "off", /book otherwise.
 */

import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/sections/HeroSection'
import StructuredData from '@/components/StructuredData'
import { getOffer } from '@/data/catalog'
import { heroStats, leadingFigure } from '@/data/heroStats'
import { projectProof } from '@/data/projectProof'
import { testimonials } from '@/data/testimonials'
import { BOOKING_CTA_LABEL } from '@/lib/constants'

const ORIGINAL = process.env.NEXT_PUBLIC_CAL_LINK

function setCalLink(value: string | undefined) {
  if (value === undefined) {
    delete process.env.NEXT_PUBLIC_CAL_LINK
  } else {
    process.env.NEXT_PUBLIC_CAL_LINK = value
  }
}

afterEach(() => {
  setCalLink(ORIGINAL)
})

const BOOKING_CASES: Array<[string, string | undefined, string]> = [
  ['booking turned off', 'off', '/inquiry'],
  ['booking configured', 'sproutflow/15min', '/book'],
]

describe('Offers - HeroSection', () => {
  BOOKING_CASES.forEach(([caseLabel, calLink, href]) => {
    it(`primary CTA uses the booking href (${caseLabel})`, () => {
      setCalLink(calLink)
      render(<HeroSection />)

      const cta = screen.getByText(BOOKING_CTA_LABEL).closest('a')
      expect(cta).toHaveAttribute('href', href)
      expect(cta).toHaveAttribute('data-cta', 'hero')
    })
  })

  it('keeps client work as the secondary CTA', () => {
    render(<HeroSection />)
    expect(screen.getByText('See client work').closest('a')).toHaveAttribute('href', '/work')
  })

  it('renders the three client result stats and none of the old filler', () => {
    const { container } = render(<HeroSection />)
    const values = Array.from(container.querySelectorAll('dl dd > span:first-child')).map((el) => el.textContent)
    expect(values).toEqual(['35%', '50%', '2x'])

    expect(screen.getByText('DJN Services')).toBeInTheDocument()
    expect(screen.getAllByText('Second Line Psychiatry').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Nealy Event Decor').length).toBeGreaterThan(0)

    expect(container.textContent).not.toContain('projects shipped live')
    expect(container.textContent).not.toContain('with the founder')
    expect(container.textContent).not.toContain('quote before work')
    expect(container.textContent).not.toContain('100%')
  })
})

describe('Offers - Hero stats trace back to published data', () => {
  it('reads each figure from the matching source string', () => {
    expect(heroStats.map((stat) => stat.value)).toEqual(['35%', '50%', '2x'])
    heroStats.forEach((stat) => {
      expect(stat.source.startsWith(stat.value)).toBe(true)
    })
  })

  it('uses the DJN testimonial metric', () => {
    const djn = testimonials.find((entry) => entry.id === 'djn-services')
    expect(djn?.metric).toBe('35% increase in total bookings')
    expect(heroStats[0].value).toBe('35%')
    expect(heroStats[0].note).toBe('DJN Services')
    expect(heroStats[0].source).toBe(djn?.metric)
  })

  it('uses the Second Line Psychiatry and Nealy project results', () => {
    const slp = projectProof.find((entry) => entry.id === 'second-line-psychiatry')
    const nealy = projectProof.find((entry) => entry.id === 'nealy-events')
    expect(slp?.result).toBe('50% more qualified inquiries')
    expect(nealy?.result).toBe('2x consultation requests')
    expect(heroStats[1].value).toBe('50%')
    expect(heroStats[1].note).toBe('Second Line Psychiatry')
    expect(heroStats[1].source).toBe(slp?.result)
    expect(heroStats[2].value).toBe('2x')
    expect(heroStats[2].note).toBe('Nealy Event Decor')
    expect(heroStats[2].source).toBe(nealy?.result)
  })

  it('only reads a leading figure, never invents one', () => {
    expect(leadingFigure('35% increase in total bookings')).toBe('35%')
    expect(leadingFigure('2x consultation requests')).toBe('2x')
    expect(leadingFigure('Website launched in 2 weeks')).toBeNull()
    expect(leadingFigure('Custom Shopify storefront')).toBeNull()
  })
})

describe('Offers - Structured data', () => {
  it('lists the Starter landing page in the offer catalog with a USD price of 500', () => {
    const { container } = render(<StructuredData />)
    const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    const org = scripts.map((script) => JSON.parse(script.textContent || '{}')).find((schema) => schema.hasOfferCatalog)

    const starter = getOffer('starter')!
    const offer = org.hasOfferCatalog.itemListElement.find(
      (item: { itemOffered?: { name?: string } }) => item.itemOffered?.name === starter.name,
    )
    expect(offer).toBeDefined()
    expect(offer['@type']).toBe('Offer')
    expect(offer.price).toBe('500')
    expect(Number(offer.price)).toBe(starter.prices[0].amount)
    expect(offer.priceCurrency).toBe('USD')
    expect(offer.itemOffered['@type']).toBe('Service')
    expect(offer.itemOffered.description).not.toContain('—')
  })
})
