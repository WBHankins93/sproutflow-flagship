/**
 * MEDIUM PRIORITY TESTS: Offers, booking CTAs, and hero proof
 *
 * Website Rescue is a published fixed-price offer, so its price must stay
 * consistent across the tiers band and structured data. Hero stats must be
 * project facts read from published data, never unverified growth claims in the
 * component. Every pricing and hero CTA must follow the booking fallback:
 * /inquiry when NEXT_PUBLIC_CAL_LINK is "off", /book otherwise.
 */

import { render, screen } from '@testing-library/react'
import HeroSection from '@/components/sections/HeroSection'
import TiersSection from '@/components/sections/TiersSection'
import StructuredData from '@/components/StructuredData'
import { websiteRescue } from '@/data/offers'
import { heroStats } from '@/data/heroStats'
import { listedProjectProof, projectProof } from '@/data/projectProof'
import { caseStudies } from '@/data/caseStudies'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
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
  ['booking turned off', 'off', '/inquiry'],
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
    setCalLink('off')
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

      // Keep the selected offer through either booking or the form fallback.
      const expected = (id: string) => `${href}?tier=${id}`

      const bandCta = container.querySelector('a[data-cta="website-rescue"]')
      expect(bandCta).toHaveAttribute('href', expected('website-rescue'))

      tiers.forEach((tier) => {
        const cta = container.querySelector(`a[data-cta="tier-${tier.id}"]`)
        expect(cta).not.toBeNull()
        expect(cta).toHaveAttribute('href', expected(tier.id))
        const label = tier.id === 'lead-flow-audit' ? 'Discuss an audit' : `Ask about ${tier.name}`
        expect(cta).toHaveTextContent(label)
      })

      if (href === '/book') {
        expect(container.querySelectorAll('a[href*="?tier="]').length).toBe(tiers.length + 1)
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

  it('renders project facts without standalone growth claims', () => {
    const { container } = render(<HeroSection />)
    const values = Array.from(container.querySelectorAll('dl dd > span:first-child')).map((el) => el.textContent)
    expect(values).toEqual(heroStats.map((stat) => stat.value))
    expect(screen.getAllByText('featured live projects').length).toBeGreaterThan(0)
    expect(/35%|50%|2x/.test(container.textContent || '')).toBe(false)
  })
})

describe('Offers - Proof provenance', () => {
  it('counts only listed live work and links capability facts to project records', () => {
    const live = listedProjectProof.filter((project) => project.status === 'Live')
    expect(heroStats[0].value).toBe(String(live.length))
    expect(heroStats[0].source).toBe(live.map((project) => project.name).join(', '))
    for (const stat of heroStats.slice(1)) {
      expect(projectProof.find((project) => project.name === stat.note)?.result).toBe(stat.source)
    }
  })

  it('does not republish unsubstantiated growth figures in project copy or metadata', () => {
    expect(/50%|30%|2x|doubled|#1/.test(JSON.stringify(caseStudies))).toBe(false)
    expect(/50%|30%|2x/.test(JSON.stringify(projectProof))).toBe(false)
    expect(/35%|50%|30%|2x/.test(JSON.stringify(heroStats))).toBe(false)
  })

  it('keeps the original client-reported DJN quote with measurement context', () => {
    const djn = testimonials.find((entry) => entry.id === 'djn-services')!
    expect(djn.quote).toContain('35% increase in total bookings')
    expect(djn.metric).toBe('Client-reported: 35% increase in total bookings')
    render(<TestimonialsSection />)
    expect(screen.getByText(djn.context!)).toBeInTheDocument()
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
