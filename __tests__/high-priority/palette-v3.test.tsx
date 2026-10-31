/**
 * HIGH PRIORITY: the Sunlit forest palette (DIRECTION.md section 8, 29 Oct 2026).
 *
 * - Homepage sections follow Ben's approved tone map, and Birch appears only
 *   behind "I start with my own".
 * - No two neighbouring sections share a tone unless a 1px Fern/10 rule
 *   separates them.
 * - The red pen never renders on Fern or Pine (homepage, FooterCta, footer).
 * - The header is forest white, not Birch; FooterCta is Fern above the Pine footer.
 * - Every text and UI pair the palette uses meets WCAG (4.5:1 text, 3:1 UI).
 */

import { render } from '@testing-library/react'
import tailwindConfig from '../../tailwind.config.js'
import Home from '@/app/page'
import Header from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import BookSection from '@/components/home/BookSection'
import OfferMenu from '@/components/home/OfferMenu'
import FooterCta from '@/components/ui/FooterCta'
import { BUTTON_LINK_VARIANTS } from '@/components/v3/ButtonLink'
import { SECTION_TONES } from '@/components/v3/Section'

// The Lead Machine has its own tests; the homepage only needs its slot here.
jest.mock('@/components/home/hero-machine', () => {
  const Stub = () => <div data-testid="hero-machine" />
  return { __esModule: true, HeroMachine: Stub, default: Stub }
})

/** Ben's approved homepage tone map, top to bottom (section id to tone). */
const TONE_MAP: Array<[id: string, tone: string]> = [
  ['top', 'clearing'],
  ['promises', 'fern'],
  ['results', 'white'],
  ['check', 'white'], // Paper read as tan; a Fern/10 rule separates it from the proof strip
  ['offers', 'pine'], // set in OfferMenu.tsx by the `offers` worker
  ['care', 'leaf'],
  ['work', 'white'],
  ['my-own', 'birch'],
  ['about', 'sunlight'],
  ['book', 'fern'],
]
const MAPPED = new Set(TONE_MAP.map(([id]) => id))

/** The homepage's own Sections (they carry data-tone), in page order. */
function homeSections(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>('section[data-tone][id]')).filter((section) =>
    MAPPED.has(section.id),
  )
}

/** Anything red: kit components, red margin notes and red utility classes. */
const RED_SELECTOR = [
  '.redline-frame',
  '.redline-mark',
  '.redline-pin',
  '.redline-underline--redline',
  'p[data-tone="redline"]',
  'span[data-tone="redline"]',
  // A Fern margin note is Fern text: invisible on Fern, and never a dark-canvas tone.
  'p[data-tone="fern"]',
  'span[data-tone="fern"]',
].join(', ')
const RED_CLASS = /(^|:)(text|decoration|border|outline|bg|fill|stroke|ring)-redline(\/|$|-)/

function redOffenders(root: Element) {
  const found = Array.from(root.querySelectorAll(RED_SELECTOR)).map((el) => el.outerHTML.slice(0, 80))
  for (const el of Array.from(root.querySelectorAll('[class]'))) {
    const classes = (el.getAttribute('class') ?? '').split(/\s+/)
    const bad = classes.filter((cls) => RED_CLASS.test(cls))
    if (bad.length) found.push(`${el.tagName.toLowerCase()}: ${bad.join(' ')}`)
  }
  return found
}

describe('Sunlit forest: homepage tone map', () => {
  it('every section except the offer menu follows the approved map, in order', () => {
    const { container } = render(<Home />)
    const actual = homeSections(container)
      .filter((section) => section.id !== 'offers')
      .map((section) => [section.id, section.dataset.tone])
    expect(actual).toEqual(TONE_MAP.filter(([id]) => id !== 'offers'))
  })

  // The `offers` worker owns OfferMenu.tsx and sets it to Pine in a parallel
  // branch. Until that lands this test fails, so it is marked `failing`. Once
  // both branches are merged it passes, Jest reports it, and it must be
  // switched to a plain `it`. (jest.d.ts does not declare `failing`.)
  ;(it as unknown as { failing: typeof it }).failing('the offer menu is Pine (set by the offers worker)', () => {
    const { container } = render(<OfferMenu />)
    expect(container.querySelector('section#offers')).toHaveAttribute('data-tone', 'pine')
  })

  it('uses Birch only behind "I start with my own" (outside the offer menu)', () => {
    const { container } = render(<Home />)
    const birch = homeSections(container)
      .filter((section) => section.id !== 'offers' && section.dataset.tone === 'birch')
      .map((section) => section.id)
    expect(birch).toEqual(['my-own'])
  })

  it('never puts two identical tones side by side without a Fern/10 rule', () => {
    const { container } = render(<Home />)
    const sections = homeSections(container)
    for (let i = 1; i < sections.length; i += 1) {
      const [above, below] = [sections[i - 1], sections[i]]
      if (above.dataset.tone !== below.dataset.tone) continue
      expect(below).toHaveClass('border-t', 'border-forest-fern/10')
    }
  })

  it('uses no Goldenrod or Sun gold section background', () => {
    for (const classes of Object.values(SECTION_TONES)) {
      expect(/bg-(accent|forest-sungold)/.test(classes)).toBe(false)
    }
  })
})

describe('Sunlit forest: the red pen stays on light canvases', () => {
  it('renders nothing red inside a Fern or Pine homepage section', () => {
    const { container } = render(<Home />)
    const dark = Array.from(container.querySelectorAll('section[data-tone="fern"], section[data-tone="pine"]'))
    expect(dark.length).toBeGreaterThanOrEqual(2)
    for (const section of dark) {
      expect({ id: section.id, red: redOffenders(section) }).toEqual({ id: section.id, red: [] })
    }
  })

  it('renders nothing red in the Fern book section, the Fern FooterCta or the Pine footer', () => {
    for (const ui of [<BookSection key="book" />, <FooterCta key="cta" />, <Footer key="footer" />]) {
      const { container, unmount } = render(ui)
      expect(redOffenders(container)).toEqual([])
      unmount()
    }
  })

  it('still marks up "I start with my own" in red on Birch', () => {
    const { container } = render(<Home />)
    const own = container.querySelector('section#my-own')
    expect(own).toHaveAttribute('data-tone', 'birch')
    expect(own?.querySelector('.redline-frame')).not.toBeNull()
  })

  it('uses the Fern variants on Fern: sun gold underline, onFern button, Birch eyebrow', () => {
    const { container } = render(<BookSection />)
    expect(container.querySelector('section')).toHaveAttribute('data-tone', 'fern')
    expect(container.querySelector('.redline-underline--sungold')).not.toBeNull()
    expect(container.querySelector('[data-cta="book"]')).toHaveAttribute('data-variant', 'onFern')
    expect(/C9CFC4|accent-300|accent-500/.test(container.innerHTML)).toBe(false)
  })
})

describe('Sunlit forest: chrome', () => {
  it('the header is forest white with a Fern hairline, not Birch', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('bg-forest-white/95', 'border-forest-fern/15')
    expect(/bg-cream-300/.test(header?.className ?? '')).toBe(false)
  })

  it('FooterCta is Fern so it reads as its own band above the Pine footer', () => {
    const { container } = render(<FooterCta />)
    expect(container.querySelector('section')).toHaveAttribute('data-tone', 'fern')
    expect(container.querySelector('[data-cta="footer"]')?.className).toContain('bg-forest-sungold')
    const footer = render(<Footer />).container.querySelector('footer')
    expect(footer).toHaveClass('bg-primary-900')
  })

  it('the onFern button is Sun gold with a Pine label and a Birch focus ring', () => {
    expect(BUTTON_LINK_VARIANTS.onFern).toContain('bg-forest-sungold')
    expect(BUTTON_LINK_VARIANTS.onFern).toContain('text-primary-900')
    expect(BUTTON_LINK_VARIANTS.onFern).toContain('focus-visible:outline-cream-300')
  })
})

// ---------------------------------------------------------------------------
// Contrast (WCAG 2.x relative luminance)

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const forest = (tailwindConfig as any).theme.extend.colors.forest as Record<string, string>
const PINE = '#223528'
const BIRCH = '#F4EFE3'
const INK_SOFT = '#4A574D'
const REDLINE = '#B42318'
const FERN_TEXT = '#3F6B45'
const GOLDENROD = '#D9A441'

describe('Sunlit forest: contrast', () => {
  it('keeps the approved token values', () => {
    expect(forest).toEqual({
      clearing: '#F2F1D8',
      leaf: '#CFE3B4',
      fern: '#3F6B45',
      sungold: '#F2D58A',
      sunlight: '#F6E8C3',
      white: '#FBFCF8',
    })
  })

  const light = ['clearing', 'leaf', 'sunlight', 'white'] as const

  it('Pine, ink soft and Redline text are 4.5:1 or better on Clearing, Leaf, Sunlight and white', () => {
    for (const tone of light) {
      expect(contrast(PINE, forest[tone])).toBeGreaterThanOrEqual(4.5)
      expect(contrast(INK_SOFT, forest[tone])).toBeGreaterThanOrEqual(4.5)
      expect(contrast(REDLINE, forest[tone])).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('Fern margin notes pass on Clearing, Sunlight and white, and are kept off Leaf', () => {
    expect(contrast(FERN_TEXT, forest.clearing)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(FERN_TEXT, forest.sunlight)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(FERN_TEXT, forest.white)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(FERN_TEXT, forest.leaf)).toBeLessThan(4.5)
  })

  it('Birch text passes on Fern; the soft greys and golds do not', () => {
    expect(contrast(BIRCH, forest.fern)).toBeGreaterThanOrEqual(4.5) // 5.38
    expect(contrast('#C9CFC4', forest.fern)).toBeLessThan(4.5) // 3.88: why Eyebrow has onFern
    expect(contrast('#E7C688', forest.fern)).toBeLessThan(4.5) // 3.77
    expect(contrast(forest.sungold, forest.fern)).toBeLessThan(4.5) // 4.31: UI and large marks only
  })

  it('Sun gold prices pass on Pine', () => {
    expect(contrast(forest.sungold, PINE)).toBeGreaterThanOrEqual(4.5) // 9.12
  })

  it('buttons: labels 4.5:1 and edges 3:1 on every canvas they sit on', () => {
    // primary (Pine fill, Birch label) and secondary (Pine outline and label) on light canvases
    expect(contrast(BIRCH, PINE)).toBeGreaterThanOrEqual(4.5)
    for (const tone of light) expect(contrast(PINE, forest[tone])).toBeGreaterThanOrEqual(4.5)
    expect(contrast(PINE, BIRCH)).toBeGreaterThanOrEqual(4.5)
    // onDark on Pine
    expect(contrast(PINE, GOLDENROD)).toBeGreaterThanOrEqual(4.5) // 5.81 label
    expect(contrast(GOLDENROD, PINE)).toBeGreaterThanOrEqual(3) // 5.81 edge
    // Goldenrod fails on Fern, which is why onFern exists
    expect(contrast(GOLDENROD, forest.fern)).toBeLessThan(3) // 2.75
    // onFern on Fern
    expect(contrast(PINE, forest.sungold)).toBeGreaterThanOrEqual(4.5) // 9.12 label
    expect(contrast(forest.sungold, forest.fern)).toBeGreaterThanOrEqual(3) // 4.31 edge
    expect(contrast(BIRCH, forest.fern)).toBeGreaterThanOrEqual(3) // focus ring
    expect(contrast(PINE, forest.sunlight)).toBeGreaterThanOrEqual(4.5) // hover label
  })
})
