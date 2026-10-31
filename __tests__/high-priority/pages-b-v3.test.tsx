/**
 * HIGH PRIORITY: Wave 3 pages-b. /work, the five case studies and /resources
 * on v3 and Sunlit forest, and proof that is accurate about its source.
 *
 * - Proof data: no "2x" or "doubled" (Nealy's 2x was Ben's estimate), no "#1"
 *   ranking, and every stat, headline figure and project result names its
 *   source (client-reported or delivered).
 * - Each route renders its h1 and imports no v2 section components.
 * - Every rendered figure sits next to its source label; percentages are
 *   client-reported.
 * - Tones: no two neighbouring sections share one, birch at most once, no
 *   red on Fern or Pine.
 * - The DJN before/after gallery still renders from the same image paths.
 * - The homepage proof strip shows Nealy's new client-reported result.
 */

import fs from 'fs'
import path from 'path'
import type { ReactElement } from 'react'
import { render, screen } from '@testing-library/react'
import WorkPage from '@/app/work/page'
import SecondLinePage from '@/app/case-studies/second-line-psychiatry/page'
import NolaPoolPage from '@/app/case-studies/nola-pool-solutions/page'
import NealyPage, { metadata as nealyMetadata } from '@/app/case-studies/nealy-events/page'
import DjnPage from '@/app/case-studies/djn-services/page'
import BbaPage from '@/app/case-studies/big-butt-association/page'
import { metadata as nolaMetadata } from '@/app/case-studies/nola-pool-solutions/page'
import ResourcesRoute from '@/app/resources/[[...slug]]/page'
import { ResourceArticle, ResourceIndexView } from '@/components/resources/ResourceViews'
import ProofStrip from '@/components/home/ProofStrip'
import Testimonial from '@/components/Testimonial'
import { caseStudies, hasFigure, type CaseStudyStat } from '@/data/caseStudies'
import { projectProof, listedProjectProof } from '@/data/projectProof'
import { testimonials, getTestimonialByline } from '@/data/testimonials'
import { getHomeProof, homeProof } from '@/data/home'
import { resources } from '@/data/resources'
import { getImageUrl } from '@/lib/blob-images'

jest.mock('next/navigation', () => ({
  notFound: jest.fn(() => {
    throw new Error('NEXT_NOT_FOUND')
  }),
  permanentRedirect: jest.fn(),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back: jest.fn() }),
  usePathname: () => '/work',
}))

const ROOT = process.cwd()
const squash = (text: string | null | undefined) => (text ?? '').replace(/\s+/g, ' ').trim()
const SOURCES = ['client-reported', 'delivered']

/** "2x", "2X", "3.5x" as a multiplier claim, "doubled", or a "#1" ranking. */
const BANNED_CLAIM = /\b\d+(?:\.\d+)?x\b|\bdoubled\b|#\s?1\b/i

function collectStrings(value: unknown, sink: string[] = []): string[] {
  if (typeof value === 'string') sink.push(value)
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, sink))
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectStrings(item, sink))
  return sink
}

const STUDY_PAGES: Array<[slug: string, Page: () => ReactElement]> = [
  ['second-line-psychiatry', SecondLinePage],
  ['nola-pool-solutions', NolaPoolPage],
  ['nealy-events', NealyPage],
  ['djn-services', DjnPage],
  ['big-butt-association', BbaPage],
]

describe('pages-b - proof data', () => {
  it('has no 2x, doubled or #1 claim in case study, project, testimonial or homepage proof data', () => {
    const strings = collectStrings([caseStudies, projectProof, testimonials, homeProof, getHomeProof()])
    expect(strings.length).toBeGreaterThan(100)
    expect(strings.filter((text) => BANNED_CLAIM.test(text))).toEqual([])
  })

  it('removes the #1 local Google ranking from NOLA Pool metadata', () => {
    const nola = caseStudies.find((study) => study.slug === 'nola-pool-solutions')!
    expect(nola.metaDescription).not.toContain('#1')
    expect(String(nolaMetadata.description)).not.toContain('#1')
    expect(/ranking/i.test(nola.metaDescription)).toBe(false)
  })

  it('gives every stat a source, and every percentage is client-reported', () => {
    caseStudies.forEach((study) => {
      const stats: CaseStudyStat[] = [...study.heroStats, ...study.results, ...study.cardStats]
      stats.forEach((stat) => {
        expect(SOURCES).toContain(stat.source)
        if (stat.value.includes('%')) expect(stat.source).toBe('client-reported')
      })
    })
  })

  it('labels every headline that states a figure', () => {
    caseStudies.forEach((study) => {
      if (hasFigure(study.headline)) expect(SOURCES).toContain(study.headlineSource)
      if (study.headline.includes('%')) expect(study.headlineSource).toBe('client-reported')
    })
  })

  it('gives every project result a source, and every percentage is client-reported', () => {
    projectProof.forEach((project) => {
      expect(SOURCES).toContain(project.resultSource)
      if (project.result.includes('%')) expect(project.resultSource).toBe('client-reported')
    })
  })

  it('replaces Nealy’s estimate with the owner’s own words', () => {
    const nealy = caseStudies.find((study) => study.slug === 'nealy-events')!
    const quote = testimonials.find((entry) => entry.id === 'nealy-events')!.quote
    expect(quote).toContain('fully booked for next month')
    expect(nealy.headline).toContain('Fully booked for next month')
    expect(nealy.headlineSource).toBe('client-reported')
    expect(nealy.results.find((stat) => stat.value === 'Fully booked')?.source).toBe('client-reported')
    expect(nealy.results.find((stat) => stat.value === '6 weeks')?.source).toBe('delivered')
    expect(nealy.results.find((stat) => stat.value === 'In-house')?.source).toBe('delivered')
    expect(projectProof.find((project) => project.id === 'nealy-events')?.result).toBe('Fully booked for next month')
    expect(String(nealyMetadata.title && (nealyMetadata.title as { absolute: string }).absolute)).toContain(
      'Fully Booked',
    )
  })

  it('keeps DJN’s 35% verbatim from its testimonial, labelled client-reported', () => {
    const djnQuote = testimonials.find((entry) => entry.id === 'djn-services')!
    expect(djnQuote.quote).toContain('35% increase in total bookings')
    expect(djnQuote.metric).toBe('35% increase in total bookings')
    const djn = caseStudies.find((study) => study.slug === 'djn-services')!
    expect(djn.results.find((stat) => stat.value === '35%')?.source).toBe('client-reported')
  })

  it('flags Second Line’s 50% and NOLA Pool’s 30% for Ben to confirm before launch', () => {
    const marker = '// Ben to confirm source (client-reported) before final launch'
    const caseStudiesSource = fs.readFileSync(path.join(ROOT, 'data/caseStudies.ts'), 'utf8')
    const proofSource = fs.readFileSync(path.join(ROOT, 'data/projectProof.ts'), 'utf8')
    const testimonialSource = fs.readFileSync(path.join(ROOT, 'data/testimonials.ts'), 'utf8')
    for (const source of [caseStudiesSource, proofSource, testimonialSource]) {
      source.split('\n').forEach((line, index, lines) => {
        if (/['"](50|30)% /.test(line) || /value: '(50|30)%'/.test(line)) {
          expect(lines[index - 1].trim()).toBe(marker)
        }
      })
    }
  })

  it('keeps testimonial attributions exactly as published', () => {
    expect(testimonials.map(getTestimonialByline)).toEqual([
      'Dr. Lauryn Richard, PMHNP · Founder, Second Line Psychiatry',
      'Owner, NOLA Pool Solutions',
      'Owner, Nealy Event Decor',
      'Owner, DJN Services LLC',
    ])
  })
})

/** Section tones in page order, with the Pine footer at the end. */
function tones(container: HTMLElement): string[] {
  const list = Array.from(container.querySelectorAll('section[data-tone]')).map((el) => el.getAttribute('data-tone')!)
  return container.querySelector('footer') ? [...list, 'pine'] : list
}

const RED_CLASS = /(^|:)(text|decoration|border|outline|bg|fill|stroke|ring)-redline(\/|$|-)/

function expectToneRules(container: HTMLElement) {
  const sequence = tones(container)
  expect(sequence.length).toBeGreaterThan(2)
  sequence.slice(1).forEach((tone, index) => expect(`${sequence[index]} > ${tone}`).not.toBe(`${tone} > ${tone}`))
  expect(sequence.filter((tone) => tone === 'birch').length).toBeLessThanOrEqual(1)
  container.querySelectorAll('section[data-tone="fern"], section[data-tone="pine"]').forEach((section) => {
    const red = Array.from(section.querySelectorAll('[class]')).filter((el) =>
      (el.getAttribute('class') ?? '').split(/\s+/).some((cls) => RED_CLASS.test(cls)),
    )
    expect(red.map((el) => el.outerHTML.slice(0, 80))).toEqual([])
  })
}

/** Every rendered result block has a source label, and percentages say client-reported. */
function expectLabelledResults(container: HTMLElement) {
  const blocks = Array.from(container.querySelectorAll('[data-result]'))
  expect(blocks.length).toBeGreaterThan(0)
  blocks.forEach((block) => {
    const label = block.querySelector('[data-proof-source]')
    expect(label).not.toBeNull()
    if ((block.textContent ?? '').includes('%')) expect(label!.textContent).toBe('client-reported')
  })
}

function expectNoBannedCopy(container: HTMLElement) {
  const text = squash(container.textContent)
  expect(BANNED_CLAIM.test(text)).toBe(false)
  expect(text).not.toContain('—')
}

describe('pages-b - /work', () => {
  it('renders its h1, one card per listed project linking to its case study, and hides BBA', () => {
    const { container } = render(<WorkPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The work, and what changed after.')
    const cards = container.querySelectorAll('section[aria-label="Sproutflow client work"] article')
    expect(cards.length).toBe(listedProjectProof.length)
    listedProjectProof.forEach((project) => {
      expect(screen.getByRole('link', { name: project.name })).toHaveAttribute('href', `/case-studies/${project.id}`)
    })
    expect(container.textContent).not.toContain('Big Butt Association')
  })

  it('labels every result, follows the tone rules and ends with book and custom quote links', () => {
    const { container } = render(<WorkPage />)
    expectLabelledResults(container)
    expectToneRules(container)
    expectNoBannedCopy(container)
    expect(tones(container)).toEqual(['clearing', 'white', 'fern', 'pine'])
    expect(screen.getByRole('link', { name: 'Bring me the problem.' })).toHaveAttribute('href', '/#offers')
    expect(screen.getByRole('link', { name: /Book a 15-minute call/ })).toBeInTheDocument()
  })
})

describe('pages-b - case studies', () => {
  STUDY_PAGES.forEach(([slug, Page]) => {
    const study = caseStudies.find((entry) => entry.slug === slug)!

    it(`${slug}: renders its headline as the h1, labelled when it states a result`, () => {
      const { container } = render(<Page />)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toHaveTextContent(study.headline)
      expect(container.textContent).toContain(study.clientName)
      const label = h1.parentElement!.querySelector('[data-proof-source]')
      if (study.headlineSource) expect(label?.textContent).toBe(study.headlineSource)
      if (hasFigure(study.headline)) expect(label).not.toBeNull()
    })

    it(`${slug}: labels every result, follows the tone rules and ends with the CTA`, () => {
      const { container } = render(<Page />)
      expectLabelledResults(container)
      expect(container.querySelectorAll('[data-result]').length).toBe(study.results.length)
      expectToneRules(container)
      expectNoBannedCopy(container)
      const sequence = tones(container)
      expect(sequence[0]).toBe('clearing')
      expect(sequence.slice(-2)).toEqual(['fern', 'pine'])
      expect(screen.getByRole('link', { name: 'Bring me the problem.' })).toHaveAttribute('href', '/#offers')
      expect(screen.getByRole('link', { name: /Book a 15-minute call/ })).toBeInTheDocument()
    })
  })

  it('shows each testimonial verbatim with its exact byline, and none on BBA', () => {
    testimonials.forEach((entry) => {
      const [, Page] = STUDY_PAGES.find(([slug]) => slug === entry.caseStudySlug)!
      const { container, unmount } = render(<Page />)
      const quote = container.querySelector('blockquote')!
      expect(squash(quote.textContent)).toBe(squash(`“${entry.quote}”`))
      expect(quote.closest('figure')!.querySelector('figcaption')).toHaveTextContent(getTestimonialByline(entry))
      unmount()
    })
    const { container } = render(<BbaPage />)
    expect(container.querySelector('blockquote')).toBeNull()
  })

  it('renders the DJN before and after gallery from the unchanged image paths', () => {
    const djn = caseStudies.find((study) => study.slug === 'djn-services')!
    const { container } = render(<DjnPage />)
    expect(screen.getByRole('heading', { level: 2, name: 'Before and after.' })).toBeInTheDocument()
    const before = container.querySelectorAll('figure[data-side="before"] img')
    const after = container.querySelectorAll('figure[data-side="after"] img')
    expect(before.length).toBe(3)
    expect(after.length).toBe(3)
    djn.beforeAfter!.forEach((pair, index) => {
      expect(before[index].getAttribute('src')).toBe(getImageUrl(pair.beforeSrc))
      expect(after[index].getAttribute('src')).toBe(getImageUrl(pair.afterSrc))
    })
    expect(tones(container)).toEqual(['clearing', 'white', 'leaf', 'pine', 'white', 'sunlight', 'fern', 'pine'])
  })
})

describe('pages-b - /resources', () => {
  const originalDrafts = resources.map((resource) => resource.draft)
  afterEach(() => resources.forEach((resource, index) => (resource.draft = originalDrafts[index])))

  it('keeps every resource a draft, so nothing is public', () => {
    expect(resources.every((resource) => resource.draft)).toBe(true)
  })

  it('renders the index with its h1, the library and the tone rules', () => {
    const { container } = render(<ResourceIndexView published={resources} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Useful answers, written down.')
    resources.forEach((resource) =>
      expect(screen.getByRole('link', { name: resource.title })).toHaveAttribute('href', `/resources/${resource.slug}`),
    )
    expectToneRules(container)
    expectNoBannedCopy(container)
    expect(tones(container)).toEqual(['clearing', 'leaf', 'white', 'fern', 'pine'])
  })

  it('renders one resource with its title as the h1', () => {
    const { container } = render(<ResourceArticle resource={resources[1]} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(resources[1].title)
    resources[1].sections.forEach((section) => expect(screen.getByRole('heading', { name: section })).toBeInTheDocument())
    expectToneRules(container)
  })

  it('renders through the route once a resource is published', async () => {
    resources[0].draft = false
    render(await ResourcesRoute({ params: Promise.resolve({ slug: [resources[0].slug] }) }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(resources[0].title)
  })
})

describe('pages-b - no v2 components', () => {
  const V2 =
    /components\/(sections\/|layout\/StudioLayout|ui\/(SectionShell|PageHeader|Pill|ProjectRow|FooterCta|StatRail|Card|Button|Typography|AccentPhrase|MediaPanel|DeviceFrame|ImageCarousel|ArrowDisc|Marquee|ClientLogo)\b)/

  function files(dir: string): string[] {
    return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
      const rel = path.join(dir, entry.name)
      return entry.isDirectory() ? files(rel) : /\.tsx?$/.test(entry.name) ? [rel] : []
    })
  }

  const OWNED = [
    ...files('app/work'),
    ...files('app/case-studies'),
    ...files('app/resources'),
    ...files('components/case-studies'),
    ...files('components/work'),
    ...files('components/resources'),
    'components/Testimonial.tsx',
  ]

  it('imports no v2 section or ui component in any pages-b route or component', () => {
    expect(OWNED.length).toBeGreaterThan(10)
    const offenders = OWNED.filter((file) => V2.test(fs.readFileSync(path.join(ROOT, file), 'utf8')))
    expect(offenders).toEqual([])
  })

  it('uses no legacy type tokens or the retired accent face', () => {
    const LEGACY = /\b(text-(h4|section|subsection|eyebrow|mono-meta)|font-accent|font-bold)\b/
    const offenders = OWNED.filter((file) => LEGACY.test(fs.readFileSync(path.join(ROOT, file), 'utf8')))
    expect(offenders).toEqual([])
  })

  it('renders the shared Testimonial in v3 type with no metric badge', () => {
    // NOLA Pool's metric is not in its quote, so it must not appear beside it.
    const nola = testimonials.find((entry) => entry.id === 'nola-pool-solutions')!
    const { container } = render(<Testimonial testimonial={nola} />)
    expect(container.querySelector('blockquote')).toHaveClass('font-display', 'font-normal')
    expect(container.textContent).not.toContain(nola.metric!)
  })
})

describe('pages-b - homepage proof strip', () => {
  it('shows Nealy as fully booked for next month, client-reported, and no 2x', () => {
    const { container } = render(<ProofStrip />)
    expect(BANNED_CLAIM.test(squash(container.textContent))).toBe(false)
    const nealy = Array.from(container.querySelectorAll('li')).find((li) =>
      (li.textContent ?? '').includes('Nealy Event Decor'),
    )!
    expect(nealy).toHaveTextContent('Fully booked for next month')
    expect(nealy).toHaveTextContent('client-reported')
  })
})
