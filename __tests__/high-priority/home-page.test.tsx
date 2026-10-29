/**
 * HIGH PRIORITY: the v3 homepage (app/page.tsx + components/home/*).
 *
 * Ten sections in the decided order, the exact headline, offers rendered from
 * data/catalog.ts, booking CTAs that follow the booking fallback, a check
 * form that GETs /check?url=, real proof labelled client-reported, and
 * serve-anyone copy with no neighborhood names.
 */

import fs from 'fs'
import path from 'path'
import { render, screen } from '@testing-library/react'
import Home, { metadata } from '@/app/page'
import StructuredData from '@/components/StructuredData'
import BenSection, { getBenTestimonial } from '@/components/home/BenSection'
import BookSection from '@/components/home/BookSection'
import CareSection from '@/components/home/CareSection'
import CheckTeaser from '@/components/home/CheckTeaser'
import HomeHero from '@/components/home/HomeHero'
import OfferMenu from '@/components/home/OfferMenu'
import OwnSiteSection from '@/components/home/OwnSiteSection'
import ProofStrip from '@/components/home/ProofStrip'
import TrustStrip from '@/components/home/TrustStrip'
import WorkSection from '@/components/home/WorkSection'
import { homeBookingHref } from '@/components/home/booking'
import { catalog, catalogCategories, formatAmount, getIncludedItems } from '@/data/catalog'
import { HOME_SECTION_IDS, getHomeProof, homeBen, homeHero, homeOwn, homeTrust } from '@/data/home'
import { projectProof } from '@/data/projectProof'
import { testimonials } from '@/data/testimonials'
import { CHECK_LABELS, CHECK_ORDER } from '@/lib/website-check/messages'

// The Lead Machine is owned by the `hero` worker; the homepage only depends on its export.
jest.mock('@/components/home/hero-machine', () => {
  const Stub = () => <div data-testid="hero-machine" />
  return { __esModule: true, HeroMachine: Stub, default: Stub }
})

const ORIGINAL = process.env.NEXT_PUBLIC_CAL_LINK

function setCalLink(value: string | undefined) {
  if (value === undefined) delete process.env.NEXT_PUBLIC_CAL_LINK
  else process.env.NEXT_PUBLIC_CAL_LINK = value
}

afterEach(() => setCalLink(ORIGINAL))

const squash = (text: string | null | undefined) => (text ?? '').replace(/\s+/g, ' ').trim()

const NEIGHBORHOODS = /Metairie|Kenner|Northshore|Westbank/i

describe('Homepage - structure', () => {
  it('renders the ten sections in the decided order', () => {
    const { container } = render(<Home />)
    const ids = Array.from(container.querySelectorAll('section[id]'))
      .map((section) => section.id)
      .filter((id) => (HOME_SECTION_IDS as readonly string[]).includes(id))
    expect(ids).toEqual([
      'top',
      'promises',
      'results',
      'check',
      'offers',
      'care',
      'work',
      'my-own',
      'about',
      'book',
    ])
  })

  it('has one h1 with the exact headline, and the hero machine slot', () => {
    render(<Home />)
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings.length).toBe(1)
    expect(squash(headings[0].textContent)).toBe('Find the leaks. Fix the site. Book the work.')
    expect(homeHero.headline).toBe('Find the leaks. Fix the site. Book the work.')
    expect(headings[0]).toHaveAttribute('data-size', 'hero')
    expect(screen.getByTestId('hero-machine')).toBeInTheDocument()
  })

  it('underlines "Find the leaks." with its period, so the period never wraps alone', () => {
    const { container } = render(<HomeHero />)
    const h1 = container.querySelector('h1')!
    expect(squash(h1.textContent)).toBe('Find the leaks. Fix the site. Book the work.')
    const underline = container.querySelector('h1 .redline-underline')
    expect(squash(underline?.textContent)).toBe('Find the leaks.')
    const words = Array.from(container.querySelectorAll('h1 .redline-underline-word')).map((el) => squash(el.textContent))
    expect(words).toContain('leaks.')
  })

  it('orders the phone hero as headline, CTAs, machine, then Ben and the subcopy', () => {
    const { container } = render(<HomeHero />)
    const orderOf = (el: Element | null) => {
      const match = (el?.getAttribute('class') ?? '').match(/(?:^|\s)order-(\d)/)
      return match ? Number(match[1]) : NaN
    }
    const headline = container.querySelector('h1')!.parentElement
    const ctas = container.querySelector('a[data-cta="hero"]')!.parentElement
    const machine = screen.getByTestId('hero-machine').parentElement
    const ben = screen.getByAltText('Ben Hankins, founder of Sproutflow Studio').closest('.order-4')
    const sub = screen.getByText(homeHero.sub)
    expect([orderOf(headline), orderOf(ctas), orderOf(machine), orderOf(ben), orderOf(sub)]).toEqual([1, 2, 3, 4, 5])
  })

  it('names no neighborhoods anywhere on the homepage, including its structured data', () => {
    const { container } = render(
      <>
        <StructuredData />
        <Home />
      </>,
    )
    expect(NEIGHBORHOODS.test(container.innerHTML)).toBe(false)
    expect(NEIGHBORHOODS.test(JSON.stringify(metadata))).toBe(false)
  })

  it('mentions New Orleans in visible copy only in the trust strip line and client locations', () => {
    const { container } = render(<Home />)
    // Footer copy belongs to the chrome worker; only the ten homepage sections are checked.
    let text = Array.from(container.querySelectorAll('section[id]'))
      .filter((section) => (HOME_SECTION_IDS as readonly string[]).includes(section.id))
      .map((section) => section.textContent ?? '')
      .join(' ')
    // Where a client is located is a fact about the client, not positioning.
    projectProof.forEach((project) => {
      text = text.split(project.location).join('')
    })
    expect(text.match(/New Orleans/g)).toEqual(['New Orleans'])
    expect(text).toContain(homeTrust.location)
  })

  it('has new positioning in the metadata', () => {
    const title = (metadata.title as { absolute: string }).absolute
    expect(title).toContain('Sproutflow Studio')
    expect(/New Orleans/.test(title)).toBe(false)
    expect(metadata.description).toContain('Find the leaks. Fix the site. Book the work.')
    expect(metadata.alternates?.canonical).toBe('/')
  })
})

describe('Homepage - booking CTAs', () => {
  const CASES: Array<[string, string | undefined, string]> = [
    ['booking turned off', 'off', '/inquiry'],
    ['booking configured', 'sproutflow/15min', '/book'],
  ]

  CASES.forEach(([label, calLink, base]) => {
    it(`points the hero, offer, care and book CTAs at the booking href (${label})`, () => {
      setCalLink(calLink)
      const { container } = render(<Home />)

      expect(container.querySelector('a[data-cta="hero"]')).toHaveAttribute('href', base)
      expect(container.querySelector('a[data-cta="hero"]')).toHaveTextContent('Book a 15-minute call')
      expect(container.querySelector('a[data-cta="book"]')).toHaveAttribute('href', base)

      catalog.forEach((offer) => {
        const category = catalogCategories.find((entry) => entry.id === offer.category)!
        const expected = base === '/inquiry' ? `/inquiry?path=${category.servicePath}` : '/book'
        const cta = container.querySelector(`a[data-cta="offer-${offer.id}"]`)
        expect(cta).not.toBeNull()
        expect(cta).toHaveAttribute('href', expected)
        expect(squash(cta!.textContent)).toBe(`Book a call about ${offer.name}`)
      })

      const care = container.querySelector('a[data-cta="care"]')
      expect(care).toHaveAttribute('href', base === '/inquiry' ? '/inquiry?path=growth-support' : '/book')

      if (base === '/book') {
        expect(container.querySelectorAll('a[href^="/book?"]').length).toBe(0)
      }
    })
  })

  it('sends the hero secondary CTA to the website check', () => {
    render(<HomeHero />)
    expect(screen.getByRole('link', { name: 'Check your website free' })).toHaveAttribute('href', '/check')
  })

  it('builds inquiry fallbacks with the path prefill', () => {
    setCalLink('off')
    expect(homeBookingHref('websites')).toBe('/inquiry?path=websites')
    expect(homeBookingHref()).toBe('/inquiry')
    setCalLink('sproutflow/15min')
    expect(homeBookingHref('websites')).toBe('/book')
  })
})

describe('Homepage - hero and trust', () => {
  it('shows Ben with his note beside the headline', () => {
    render(<HomeHero />)
    expect(screen.getByAltText('Ben Hankins, founder of Sproutflow Studio')).toBeInTheDocument()
    expect(screen.getByText(homeHero.note)).toBeInTheDocument()
    expect(screen.getByText('Sproutflow Studio · Websites, lead systems and care')).toBeInTheDocument()
  })

  it('lists the three promises and the location line', () => {
    render(<TrustStrip />)
    const region = screen.getByRole('region', { name: homeTrust.label })
    expect(region.querySelectorAll('li').length).toBe(3)
    expect(region).toHaveTextContent(/written, fixed price/i)
    expect(region).toHaveTextContent(/You own everything/)
    expect(region).toHaveTextContent(/domain, code and accounts/)
    expect(region).toHaveTextContent(/30 days of fixes/)
    expect(region).toHaveTextContent('Based in New Orleans. Working with businesses anywhere.')
  })
})

describe('Homepage - proof', () => {
  it('shows the four client sites in order, each labelled client-reported', () => {
    const { container } = render(<ProofStrip />)
    const items = Array.from(container.querySelectorAll('li'))
    expect(items.length).toBe(4)
    const names = ['Second Line Psychiatry', 'NOLA Pool Solutions', 'Nealy Event Decor', 'DJN Services']
    items.forEach((item, index) => {
      expect(item).toHaveTextContent(names[index])
      expect(item).toHaveTextContent('client-reported')
    })
  })

  it('reads every result from published data', () => {
    const results = getHomeProof().map((item) => item.result)
    expect(results).toEqual([
      '50% more qualified inquiries',
      '30% customer acquisition growth',
      '2x consultation requests',
      '35% increase in total bookings',
    ])
    const djn = testimonials.find((entry) => entry.id === 'djn-services')
    expect(results[3]).toBe(djn?.metric)
    const { container } = render(<ProofStrip />)
    expect(squash(container.textContent)).toContain('35% increase in total bookings')
  })
})

describe('Homepage - website check teaser', () => {
  it('is a GET form to /check with one url field', () => {
    const { container } = render(<CheckTeaser />)
    const form = container.querySelector('form')!
    expect(form).toHaveAttribute('action', '/check')
    expect(form).toHaveAttribute('method', 'get')
    const inputs = form.querySelectorAll('input')
    expect(inputs.length).toBe(1)
    expect(inputs[0]).toHaveAttribute('name', 'url')
    expect(screen.getByLabelText('Your website address')).toBe(inputs[0])
    expect(screen.getByRole('button', { name: 'Check my site' })).toHaveAttribute('type', 'submit')
  })

  it('lists what the checker checks, from its own labels', () => {
    render(<CheckTeaser />)
    CHECK_ORDER.forEach((id) => expect(screen.getByText(CHECK_LABELS[id])).toBeInTheDocument())
  })
})

describe('Homepage - offer menu', () => {
  it('renders every catalog offer under its category with its price from data', () => {
    const { container } = render(<OfferMenu />)
    catalogCategories.forEach((category) => {
      const group: HTMLElement = screen.getByRole('region', { name: category.name })
      catalog
        .filter((offer) => offer.category === category.id)
        .forEach((offer) => {
          const article = group.querySelector(`article#${offer.id}`) as HTMLElement
          expect(article).not.toBeNull()
          const labelledBy = article.getAttribute('aria-labelledby')!
          expect(squash(container.querySelector(`#${labelledBy}`)?.textContent)).toBe(offer.name)
          if (offer.prices.length === 0) {
            expect(article).toHaveTextContent(offer.priceLabel!)
          }
          offer.prices.forEach((price) => expect(article).toHaveTextContent(formatAmount(price)))
          if (offer.priceNote) expect(article).toHaveTextContent(offer.priceNote)
        })
    })
    expect(container.querySelectorAll('article').length).toBe(catalog.length)
  })

  it('lists what is included, behind a toggle on phones', () => {
    const { container } = render(<OfferMenu />)
    catalog.forEach((offer) => {
      const article = container.querySelector(`article#${offer.id}`)!
      expect(article).toHaveTextContent(offer.line)
      const details = article.querySelector('details')
      expect(details).not.toBeNull()
      expect(details!.querySelector('summary')).toHaveTextContent('What’s included')
      getIncludedItems(offer).forEach((item) => expect(details).toHaveTextContent(item))
    })
    const siteCare = container.querySelector('article#site-care')!
    expect(siteCare).toHaveTextContent('$99/mo for Rescue and Business sites')
    expect(siteCare).toHaveTextContent('$150/mo for larger sites')
  })

  it('marks pending prices for QA', () => {
    const { container } = render(<OfferMenu />)
    const pending = Array.from(container.querySelectorAll('article[data-pending]')).map((el) => el.id)
    expect(pending).toEqual(catalog.filter((offer) => offer.pending).map((offer) => offer.id))
  })

  it('never hard-codes a price in a homepage component', () => {
    const dir = path.join(process.cwd(), 'components', 'home')
    const files = fs
      .readdirSync(dir)
      .filter((file) => /\.(ts|tsx)$/.test(file))
      .map((file) => path.join(dir, file))
    expect(files.length).toBeGreaterThan(5)
    files.forEach((file) => {
      expect(/\$\s?\d/.test(fs.readFileSync(file, 'utf8'))).toBe(false)
    })
  })

  it('shows the Site Care price from the catalog in the care section', () => {
    const { container } = render(<CareSection />)
    expect(container).toHaveTextContent('$99/mo')
    expect(container).toHaveTextContent('A contact form that silently stops sending.')
    expect(container).toHaveTextContent('A domain or email that lapses over billing.')
    expect(/Sproutflow/.test(container.textContent ?? '')).toBe(false)
  })
})

describe('Homepage - work, own site, Ben and book', () => {
  it('shows DJN before and after with a working slider and three case study cards', () => {
    const { container } = render(<WorkSection />)
    expect(screen.getByAltText('DJN Services old homepage')).toBeInTheDocument()
    expect(screen.getByAltText('DJN Services new homepage')).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: 'Compare DJN Services’ old and new homepage' })).toBeInTheDocument()
    const cards = Array.from(container.querySelectorAll('ul > li'))
    expect(cards.length).toBe(3)
    expect(container.querySelector('a[href="/case-studies/second-line-psychiatry"]')).not.toBeNull()
    expect(container.querySelector('a[href="/case-studies/nola-pool-solutions"]')).not.toBeNull()
    expect(container.querySelector('a[href="/case-studies/nealy-events"]')).not.toBeNull()
    expect(container.querySelector('a[href="/case-studies/djn-services"]')).not.toBeNull()
  })

  it('marks up Ben’s own homepage with the three honest marks', () => {
    const { container } = render(<OwnSiteSection />)
    expect(container.querySelector('img[src="/redesign/sproutflow-v1-home.jpg"]')).not.toBeNull()
    const list = screen.getByRole('list', { name: homeOwn.listLabel })
    expect(list.querySelectorAll('li').length).toBe(3)
    expect(list).toHaveTextContent('no phone number up top')
    expect(list).toHaveTextContent(/project brief/)
    expect(list).toHaveTextContent(/no price/)
    homeOwn.marks.forEach((mark) => expect(mark.note!.split(/\s+/).length).toBeLessThanOrEqual(8))
  })

  it('quotes a client verbatim with the exact attribution and shows the credentials line', () => {
    render(<BenSection />)
    const quote = getBenTestimonial()
    expect(quote).not.toBeNull()
    const source = testimonials.find((entry) => entry.id === homeBen.testimonialId)!
    expect(source.quote).toContain(homeBen.excerpt)
    expect(quote!.byline).toBe('Owner, Nealy Event Decor')
    expect(screen.getByText('Owner, Nealy Event Decor')).toBeInTheDocument()
    expect(screen.getByText('7 years keeping software running at large companies, including IBM')).toBeInTheDocument()
  })

  it('ends with the call, a phone number and three short answers', () => {
    const { container } = render(<BookSection />)
    expect(container.querySelector('a[href="tel:+15043261676"]')).toHaveTextContent('(504) 326-1676')
    expect(container.querySelectorAll('dt').length).toBe(3)
    expect(container).toHaveTextContent(/fixed/i)
    expect(container).toHaveTextContent(/owns/i)
    expect(container).toHaveTextContent(/How fast/i)
  })
})

describe('Homepage - copy rules', () => {
  it('has no em dashes and no team voice in the rendered page', () => {
    const { container } = render(<Home />)
    const main = Array.from(container.querySelectorAll('section'))
      .map((section) => section.textContent ?? '')
      .join(' ')
    expect(main).not.toContain('—')
    expect(/\bour team\b|\bwe're\b/i.test(main)).toBe(false)
  })

  it('keeps every result labelled client-reported where it appears', () => {
    const { container } = render(<Home />)
    const figures = Array.from(container.querySelectorAll('.text-numeral'))
    expect(figures.length).toBeGreaterThan(0)
    figures.forEach((figure) => {
      const holder = figure.closest('li, div')
      expect(/client-reported/.test(holder?.textContent ?? '')).toBe(true)
    })
  })
})
