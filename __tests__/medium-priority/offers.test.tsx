/**
 * MEDIUM PRIORITY TESTS: Offers, booking CTAs, and hero proof
 *
 * The Starter landing page is a published fixed-price offer, so its price
 * must match between data/catalog.ts and structured data. Homepage proof
 * (getHomeProof, which replaced the v2 hero stats) must be real client
 * results read from published data, never typed into a component. Every
 * pricing and hero CTA must follow the booking fallback: /inquiry when
 * NEXT_PUBLIC_CAL_LINK is "off", /book otherwise.
 */

import { render, screen } from '@testing-library/react'
import HomeHero from '@/components/home/HomeHero'
import ProofStrip from '@/components/home/ProofStrip'
import WorkSection from '@/components/home/WorkSection'
import StructuredData from '@/components/StructuredData'
import { getOffer } from '@/data/catalog'
import { getHomeProof, homeWork, leadingFigure } from '@/data/home'
import { projectProof } from '@/data/projectProof'
import { testimonials } from '@/data/testimonials'
import { BOOKING_CTA_LABEL } from '@/lib/constants'

// The Lead Machine is owned by the `hero` worker and has its own tests.
jest.mock('@/components/home/hero-machine', () => {
  const Stub = () => <div data-testid="hero-machine" />
  return { __esModule: true, HeroMachine: Stub, default: Stub }
})

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

describe('Offers - HomeHero', () => {
  BOOKING_CASES.forEach(([caseLabel, calLink, href]) => {
    it(`primary CTA uses the booking href (${caseLabel})`, () => {
      setCalLink(calLink)
      render(<HomeHero />)

      const cta = screen.getByText(BOOKING_CTA_LABEL).closest('a')
      expect(cta).toHaveAttribute('href', href)
      expect(cta).toHaveAttribute('data-cta', 'hero')
    })
  })

  it('keeps client work one click from the homepage', () => {
    // The v3 hero's secondary CTA is the website check; client work sits in
    // WorkSection, where each client links to its case study.
    const { container } = render(<WorkSection />)
    const ids = [homeWork.featuredProjectId, ...homeWork.cardIds]
    ids.forEach((id) => {
      const project = projectProof.find((entry) => entry.id === id)!
      expect(container.querySelector(`a[href="${project.href}"]`)).toBeInTheDocument()
    })
    expect(screen.getByText('Second Line Psychiatry').closest('a')).toHaveAttribute(
      'href',
      '/case-studies/second-line-psychiatry',
    )
  })

  it('renders the client result figures and none of the old filler', () => {
    const { container } = render(<ProofStrip />)
    const values = Array.from(container.querySelectorAll('li p span.font-mono')).map((el) => el.textContent)
    expect(values).toEqual(['50%', '30%', '35%'])

    expect(screen.getByText('DJN Services')).toBeInTheDocument()
    expect(screen.getAllByText('Second Line Psychiatry').length).toBeGreaterThan(0)
    // Nealy's 2x estimate is gone; its result is the owner's own words.
    expect(container.textContent).not.toContain('2x')

    expect(container.textContent).not.toContain('projects shipped live')
    expect(container.textContent).not.toContain('with the founder')
    expect(container.textContent).not.toContain('quote before work')
    expect(container.textContent).not.toContain('100%')
  })
})

describe('Offers - Homepage proof traces back to published data', () => {
  it('reads each figure from the matching source string', () => {
    const proof = getHomeProof()
    expect(proof.map((item) => item.figure)).toEqual(['50%', '30%', null, '35%'])
    proof.forEach((item) => {
      if (item.figure) {
        expect(item.result.startsWith(item.figure)).toBe(true)
        expect(`${item.figure} ${item.rest}`).toBe(item.result)
      } else {
        expect(item.rest).toBe(item.result)
      }
    })
  })

  it('uses the DJN testimonial metric', () => {
    const djn = testimonials.find((entry) => entry.id === 'djn-services')
    expect(djn?.metric).toBe('35% increase in total bookings')
    const item = getHomeProof().find((entry) => entry.project.id === 'djn-services')!
    expect(item.figure).toBe('35%')
    expect(item.project.name).toBe('DJN Services')
    expect(item.result).toBe(djn?.metric)
  })

  it('uses the Second Line Psychiatry and Nealy project results', () => {
    const slp = projectProof.find((entry) => entry.id === 'second-line-psychiatry')
    const nealy = projectProof.find((entry) => entry.id === 'nealy-events')
    expect(slp?.result).toBe('50% more qualified inquiries')
    expect(nealy?.result).toBe('Fully booked for next month')
    const proof = getHomeProof()
    const slpItem = proof.find((entry) => entry.project.id === 'second-line-psychiatry')!
    expect(slpItem.figure).toBe('50%')
    expect(slpItem.project.name).toBe('Second Line Psychiatry')
    expect(slpItem.result).toBe(slp?.result)
    // Nealy's result has no leading figure now (the 2x estimate is gone), so none is invented.
    const nealyItem = proof.find((entry) => entry.project.id === 'nealy-events')!
    expect(nealyItem.result).toBe(nealy?.result)
    expect(nealyItem.figure).toBeNull()
  })

  it('drops an item whose published source is missing', () => {
    expect(getHomeProof([{ projectId: 'no-such-project', from: 'projectResult' }])).toEqual([])
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
