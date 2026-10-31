/**
 * HIGH PRIORITY TESTS: Wave 3 pages-a on design system v3 and Sunlit forest
 *
 * /services, /services/[path], /about, /faq, /how-we-work, /data-and-ownership:
 * - each renders its h1 and imports no v2 section components;
 * - Sunlit forest tone rules: light header, no two neighbouring tones the
 *   same, birch at most once, no red pen on Fern or Pine, at most one
 *   Caveat note, and the section before the Pine footer is never Pine;
 * - no removed offer names, and every price on the page comes from
 *   data/catalog.ts (the range line's two figures included);
 * - the FAQPage structured data matches the visible questions;
 * - /how-we-work is a real, indexable page (no redirect, no noindex);
 * - the inquiry project types follow the catalog offers.
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import ServicesPage, { metadata as servicesMetadata } from '@/app/services/page'
import ServicePathPage from '@/app/services/[path]/page'
import AboutPage from '@/app/about/page'
import FAQPage from '@/app/faq/page'
import HowWeWorkPage, { metadata as howMetadata } from '@/app/how-we-work/page'
import DataAndOwnershipPage from '@/app/data-and-ownership/page'
import {
  catalogCategories,
  customQuote,
  fixedOffers,
  formatAmount,
  getOffersByCategory,
} from '@/data/catalog'
import { servicePaths } from '@/data/servicePaths'
import {
  LEGACY_PROJECT_TYPES,
  PROJECT_TYPES,
  PROJECT_TYPE_BY_OFFER,
  PROJECT_TYPE_BY_PATH,
  toProjectType,
} from '@/types/inquiry'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back: jest.fn() }),
  usePathname: () => '/',
  notFound: jest.fn(() => {
    throw new Error('notFound')
  }),
  redirect: jest.fn(),
  permanentRedirect: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const navigation = require('next/navigation') as { permanentRedirect: jest.Mock; redirect: jest.Mock }


type PageCase = { name: string; file: string; render: () => Promise<ReactElement> | ReactElement }

const PAGES: PageCase[] = [
  { name: '/services', file: 'app/services/page.tsx', render: () => <ServicesPage /> },
  ...servicePaths.map((path) => ({
    name: `/services/${path.id}`,
    file: 'app/services/[path]/page.tsx',
    render: () => ServicePathPage({ params: Promise.resolve({ path: path.id }) }),
  })),
  { name: '/about', file: 'app/about/page.tsx', render: () => <AboutPage /> },
  { name: '/faq', file: 'app/faq/page.tsx', render: () => <FAQPage /> },
  { name: '/how-we-work', file: 'app/how-we-work/page.tsx', render: () => <HowWeWorkPage /> },
  { name: '/data-and-ownership', file: 'app/data-and-ownership/page.tsx', render: () => <DataAndOwnershipPage /> },
]

const EXPECTED_H1: Record<string, string> = {
  '/services': 'Websites, lead systems and care, sized to the job.',
  ...Object.fromEntries(servicePaths.map((path) => [`/services/${path.id}`, path.title])),
  '/about': 'I’m Ben. I build it, and I keep it working.',
  '/faq': 'Straight answers, before you book.',
  '/how-we-work': 'From a 15-minute call to a site that keeps working.',
  '/data-and-ownership': 'Know where it lives. Keep control of it.',
}

const V2_IMPORTS = /components\/(ui\/(SectionShell|PageHeader|AccentPhrase|FaqAccordion|StatRail|Pill|Marquee|ProjectRow)|sections\/)/

const REMOVED_OFFERS = [
  'Website Rescue',
  'Rescue',
  'Business Website',
  'Growth Website',
  'Catalog & Custom Build',
  'Lead Capture',
  'Custom Business Software',
  'System Care from',
  '$3,500',
  '$10,000',
  '$450',
  '$850',
]

const NEIGHBORHOODS =
  /Metairie|Kenner|Northshore|North Shore|Westbank|West Bank|Uptown|Mid-City|French Quarter|Marigny|Bywater|Gentilly|Lakeview|Garden District|Treme|Algiers|Slidell|Mandeville|Covington|Jefferson Parish|St\. Tammany/i

const PRICE = /\$\d{1,3}(?:,\d{3})*/g
const ALLOWED_PRICES = new Set([
  ...fixedOffers.flatMap((offer) => offer.prices.map((price) => formatAmount(price).replace(/\/mo$/, ''))),
  ...(customQuote.range.match(PRICE) ?? []),
])

async function renderPage(page: PageCase) {
  return render(await page.render())
}

function tones(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll<HTMLElement>('section[data-tone]')).map((section) => section.dataset.tone!)
}

beforeEach(() => {
  jest.clearAllMocks()
})

PAGES.forEach((page) => describe(`${page.name} on v3`, () => {
  it('renders its h1', async () => {
    const { container } = await renderPage(page)
    const h1s = Array.from(container.querySelectorAll('h1'))
    expect(h1s.length).toBe(1)
    expect(h1s[0].textContent).toBe(EXPECTED_H1[page.name])
  })

  it('starts on a light header, never repeats a neighbouring tone, and uses birch at most once', async () => {
    const { container } = await renderPage(page)
    const sequence = tones(container)
    expect(sequence.length).toBeGreaterThan(2)
    expect(['clearing', 'white']).toContain(sequence[0])
    const repeats = sequence.slice(1).filter((tone, i) => tone === sequence[i])
    expect(repeats).toEqual([])
    expect(sequence.filter((tone) => tone === 'birch').length).toBeLessThanOrEqual(1)
    // The Pine footer follows the last section.
    expect(sequence[sequence.length - 1]).not.toBe('pine')
  })

  it('keeps red pen off Fern and Pine', async () => {
    const { container } = await renderPage(page)
    container.querySelectorAll<HTMLElement>('section[data-tone="fern"], section[data-tone="pine"]').forEach((section) => {
      expect(section.innerHTML.includes('redline')).toBe(false)
      expect(section.querySelectorAll('[data-tone="fern"] .font-annotation, [data-tone="redline"]').length).toBe(0)
    })
  })

  it('has at most one Caveat note', async () => {
    const { container } = await renderPage(page)
    expect(container.querySelectorAll('.font-annotation').length).toBeLessThanOrEqual(1)
  })

  it('shows no removed offer, no neighborhood and no em dash', async () => {
    const { container } = await renderPage(page)
    const text = container.textContent ?? ''
    const html = container.innerHTML
    REMOVED_OFFERS.forEach((term) => expect(`${page.name}: ${html.includes(term)} ${term}`).toBe(`${page.name}: false ${term}`))
    expect(NEIGHBORHOODS.test(text)).toBe(false)
    expect(text.includes('—')).toBe(false)
  })

  it('reads every price from data/catalog.ts', async () => {
    const { container } = await renderPage(page)
    const figures = container.innerHTML.match(PRICE) ?? []
    expect(figures.filter((figure) => !ALLOWED_PRICES.has(figure))).toEqual([])
  })

  it('imports no v2 section components', () => {
    const source = readFileSync(join(process.cwd(), page.file), 'utf8')
    const imports = source.split('\n').filter((line) => line.startsWith('import'))
    expect(imports.filter((line) => V2_IMPORTS.test(line))).toEqual([])
  })
}))

describe('Category pages end with their catalog offers', () => {
  const EXPECTED_OFFERS: Record<string, string[]> = {
    websites: ['starter', 'custom'],
    'business-systems': ['audit', 'custom'],
    'growth-support': ['care'],
  }

  servicePaths.forEach((path) => it(path.id, async () => {
    const id = path.id
    const { container } = render(await ServicePathPage({ params: Promise.resolve({ path: id }) }))
    const block = container.querySelector('#service-offers')!
    expect(block.getAttribute('data-tone')).toBe('pine')
    const offers = Array.from(block.querySelectorAll('[data-offer]')).map((el) => el.getAttribute('data-offer'))
    expect(offers).toEqual(EXPECTED_OFFERS[id])

    // The prices shown are the category's catalog prices, in order.
    const shown = Array.from(block.querySelectorAll('[data-price]')).map((el) => el.getAttribute('data-price'))
    expect(shown).toEqual(getOffersByCategory(path.category).flatMap((offer) => offer.prices.map(formatAmount)))

    // The custom quote block carries the verbatim range line from the catalog.
    const range = block.querySelector('[data-range-line]')
    if (path.customQuote) {
      expect(range?.textContent).toBe(customQuote.range)
      expect(block.textContent).toContain(customQuote.heading)
    } else {
      expect(range).toBeNull()
    }
  }))

  it('maps each service path to its catalog category', () => {
    servicePaths.forEach((path) => {
      const category = catalogCategories.find((entry) => entry.id === path.category)!
      expect(category.servicePath).toBe(path.id)
      expect(path.eyebrow).toBe(category.name)
    })
  })

  it('/services lists the three categories, every fixed offer and the custom quote', () => {
    const { container } = render(<ServicesPage />)
    const categoryLinks = Array.from(container.querySelectorAll('[data-cta^="services-"][href^="/services/"]')).map((a) =>
      a.getAttribute('href'),
    )
    expect(categoryLinks).toEqual(catalogCategories.map((category) => `/services/${category.servicePath}`))
    const offers = Array.from(container.querySelectorAll('#services-offers [data-offer]')).map((el) =>
      el.getAttribute('data-offer'),
    )
    expect(offers).toEqual([...fixedOffers.map((offer) => offer.key), 'custom'])
    expect(servicesMetadata.alternates?.canonical).toBe('/services')
  })
})

describe('FAQ structured data', () => {
  it('matches the visible questions and answers, in order', () => {
    const { container } = render(<FAQPage />)
    const script = container.querySelector('script[type="application/ld+json"]')!
    const schema = JSON.parse(script.innerHTML) as {
      '@type': string
      mainEntity: { name: string; acceptedAnswer: { text: string } }[]
    }
    expect(schema['@type']).toBe('FAQPage')

    const visible = Array.from(container.querySelectorAll('details[data-question]')).map((details) => ({
      question: details.querySelector('summary span')?.textContent,
      answer: details.querySelector('p')?.textContent,
    }))
    expect(visible.length).toBeGreaterThan(10)
    expect(schema.mainEntity.map((entry) => ({ question: entry.name, answer: entry.acceptedAnswer.text }))).toEqual(visible)
  })

  it('answers with the catalog offers: Site Care optional, starter scope and the range line', () => {
    const { container } = render(<FAQPage />)
    const text = container.textContent ?? ''
    const starter = fixedOffers.find((offer) => offer.key === 'starter')!
    expect(text).toContain(starter.summary)
    expect(text).toContain(customQuote.range)
    expect(text).toContain('It is optional')
    expect(text.includes('tier')).toBe(false)
  })

  it('is the only FAQPage among these pages', async () => {
    for (const page of PAGES.filter((entry) => entry.name !== '/faq')) {
      const { container, unmount } = await renderPage(page)
      expect(container.innerHTML.includes('FAQPage')).toBe(false)
      unmount()
    }
  })
})

describe('/how-we-work is a real page', () => {
  it('renders the five steps without redirecting', () => {
    const { container } = render(<HowWeWorkPage />)
    expect(navigation.permanentRedirect).not.toHaveBeenCalled()
    expect(navigation.redirect).not.toHaveBeenCalled()
    expect(container.querySelector('h1')?.textContent).toBe(EXPECTED_H1['/how-we-work'])
    expect(container.querySelectorAll('#how-steps-h ~ ol > li').length).toBe(5)
  })

  it('is indexable with its own canonical', () => {
    expect(howMetadata.robots).toBeUndefined()
    expect(howMetadata.alternates?.canonical).toBe('/how-we-work')
    const source = readFileSync(join(process.cwd(), 'app/how-we-work/page.tsx'), 'utf8')
    expect(/permanentRedirect|redirect\(|index:\s*false/.test(source)).toBe(false)
  })
})

describe('Inquiry project types follow the catalog offers', () => {
  it('names each fixed offer as in the catalog, then custom and not sure', () => {
    fixedOffers.forEach((offer) => expect(PROJECT_TYPE_BY_OFFER[offer.key]).toBe(offer.name))
    expect(PROJECT_TYPES).toEqual([
      ...fixedOffers.map((offer) => offer.name),
      PROJECT_TYPE_BY_OFFER.custom,
      'Not sure yet',
    ])
  })

  it('reads offers, old tiers, service paths and old labels', () => {
    expect(toProjectType('starter')).toBe('Starter landing page')
    expect(toProjectType('lead-flow-audit')).toBe('Lead Flow Audit')
    expect(toProjectType('website-rescue')).toBe('Starter landing page')
    expect(toProjectType('custom-quote')).toBe('A custom project')
    expect(toProjectType('business-systems')).toBe(PROJECT_TYPE_BY_PATH['business-systems'])
    expect(toProjectType('growth-support')).toBe('Site Care')
    expect(toProjectType('websites')).toBe('')
    expect(toProjectType('Ongoing growth and support')).toBe('Site Care')
    expect(toProjectType(['audit', 'care'])).toBe('Lead Flow Audit')
    expect(toProjectType('Site Care')).toBe('Site Care')
  })

  it('never turns free text or empty values into an option', () => {
    expect(toProjectType('something-unknown')).toBe('')
    expect(toProjectType('toString')).toBe('')
    expect(toProjectType('')).toBe('')
    expect(toProjectType(undefined)).toBe('')
    Object.values(LEGACY_PROJECT_TYPES).forEach((value) => {
      if (value) expect(PROJECT_TYPES).toContain(value)
    })
  })
})

describe('Owned files keep the display serif at 24px and up, never bold', () => {
  const FILES = [
    'app/services/page.tsx',
    'app/services/[path]/page.tsx',
    'app/about/page.tsx',
    'app/faq/page.tsx',
    'app/how-we-work/page.tsx',
    'app/data-and-ownership/page.tsx',
    'components/services/OfferBlock.tsx',
    'components/services/PageIntro.tsx',
    'components/services/QuestionList.tsx',
    'components/services/RelatedWork.tsx',
  ]
  FILES.forEach((file) => it(file, () => {
    const offending = readFileSync(join(process.cwd(), file), 'utf8')
      .split('\n')
      .filter((line) => line.includes('font-display'))
      .filter(
        (line) =>
          /text-(h4|xs|sm|base|lg|xl|2xl|eyebrow|mono-meta)\b/.test(line) || /font-(bold|semibold|medium)\b/.test(line),
      )
    expect(offending).toEqual([])
  }))
})
