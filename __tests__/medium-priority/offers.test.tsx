/**
 * MEDIUM PRIORITY TESTS: Offers, booking CTAs, and hero proof
 *
 * Website Rescue is a published fixed-price offer, so its price must stay
 * consistent across the tiers band and structured data. Hero stats must be
 * real client results read from published data, never typed into the
 * component. Every pricing and hero CTA must follow the booking fallback:
 * /inquiry until NEXT_PUBLIC_CAL_LINK is set, /book after.
 */

import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/sections/HeroSection'
import TiersSection from '@/components/sections/TiersSection'
import StructuredData from '@/components/StructuredData'
import { websiteRescue } from '@/data/offers'
import { heroStats, leadingFigure } from '@/data/heroStats'
import { projectProof } from '@/data/projectProof'
import { testimonials } from '@/data/testimonials'
import { tiers } from '@/data/tiers'
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
  ['booking not configured', undefined, '/inquiry'],
  ['booking configured', 'sproutflow/15min', '/book'],
]

describe('Offers - Website Rescue data', () => {
  it('has the expected shape and fixed price', () => {
    expect(websiteRescue.id).toBe('website-rescue')
    expect(websiteRescue.name).toBe('Website Rescue')
    expect(websiteRescue.price).toBe('$1,500')
    expect(websiteRescue.priceNote).toBe('fixed, live 10 business days after your content arrives')
    expect(websiteRescue.audience).toContain('contractors and home-service businesses')
    expect(websiteRescue.includes).toEqual([
      'Five pages on the domain you already own',
      'A quote form that reaches your phone and email',
      'Google Business Profile cleanup',
      'Mobile-first build you own outright',
    ])
  })

  it('contains no em dashes', () => {
    const copy = [websiteRescue.audience, websiteRescue.name, websiteRescue.priceNote, ...websiteRescue.includes]
    copy.forEach((text) => expect(text).not.toContain('—'))
  })
})

describe('Offers - TiersSection', () => {
  it('renders the Website Rescue band with its price and includes', () => {
    setCalLink(undefined)
    render(<TiersSection />)

    const band = screen.getByRole('region', {
      name: 'Website Rescue',
    }) as HTMLElement
    expect(band.querySelector('h3')).toHaveTextContent('Website Rescue')
    expect(band).toHaveTextContent('$1,500')
    expect(band).toHaveTextContent(websiteRescue.priceNote)
    expect(band).toHaveTextContent(websiteRescue.audience)
    const items = Array.from(band.querySelectorAll('li')).map((li) => li.textContent)
    expect(items).toEqual(websiteRescue.includes)
  })

  it('places the band before the tier cards', () => {
    const { container } = render(<TiersSection />)
    const band = container.querySelector('#website-rescue')
    const firstCard = container.querySelector('article')
    expect(band).not.toBeNull()
    expect(firstCard).not.toBeNull()
    // DOCUMENT_POSITION_FOLLOWING: the card comes after the band.
    expect(band!.compareDocumentPosition(firstCard!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(container.querySelectorAll('article').length).toBe(tiers.length)
  })

  BOOKING_CASES.forEach(([caseLabel, calLink, href]) => {
    it(`points the band and every tier CTA at the booking href (${caseLabel})`, () => {
      setCalLink(calLink)
      const { container } = render(<TiersSection />)

      // The form fallback keeps the tier prefill; /book never carries a query.
      const expected = (id: string) => (href === '/inquiry' ? `/inquiry?tier=${id}` : href)

      const bandCta = container.querySelector('a[data-cta="website-rescue"]')
      expect(bandCta).toHaveAttribute('href', expected('website-rescue'))

      tiers.forEach((tier) => {
        const cta = container.querySelector(`a[data-cta="tier-${tier.id}"]`)
        expect(cta).not.toBeNull()
        expect(cta).toHaveAttribute('href', expected(tier.id))
        const label = tier.id === 'lead-flow-audit' ? 'Book the audit' : `Ask about ${tier.name}`
        expect(cta).toHaveTextContent(label)
      })

      if (href === '/book') {
        expect(container.querySelectorAll('a[href*="?tier="]').length).toBe(0)
      }
    })
  })
})

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
  it('lists Website Rescue in the offer catalog with a USD price of 1500', () => {
    const { container } = render(<StructuredData />)
    const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    const org = scripts.map((script) => JSON.parse(script.textContent || '{}')).find((schema) => schema.hasOfferCatalog)

    const offer = org.hasOfferCatalog.itemListElement.find(
      (item: { itemOffered?: { name?: string } }) => item.itemOffered?.name === 'Website Rescue',
    )
    expect(offer).toBeDefined()
    expect(offer['@type']).toBe('Offer')
    expect(offer.price).toBe('1500')
    expect(Number(offer.price)).toBe(1500)
    expect(offer.priceCurrency).toBe('USD')
    expect(offer.itemOffered['@type']).toBe('Service')
    expect(offer.itemOffered.description).not.toContain('—')
  })
})
