/**
 * MEDIUM PRIORITY TESTS: Redline annotation kit (components/redline)
 *
 * Marks are decorative (aria-hidden) and their meaning is always in text: the
 * ordered list under the frame. Marks draw on when first in view (one client
 * hook, IntersectionObserver mocked here), render drawn under reduced motion,
 * and fall back to numbered pins + a visible list below 560px of frame width
 * (a CSS container query on .redline-frame, or pins="always").
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { act } from 'react'
import { render, screen } from '@testing-library/react'
import {
  RedlineFrame,
  RedlineMark,
  RedlineUnderline,
  REDLINE_NOTE_MAX_WORDS,
  countWords,
  type RedlineMarkSpec,
} from '@/components/redline'

type IOCallback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: IOCallback
  options: unknown
  observed: Element[] = []
  disconnected = false
  constructor(callback: IOCallback, options?: unknown) {
    this.callback = callback
    this.options = options
    MockIntersectionObserver.instances.push(this)
  }
  observe(el: Element) {
    this.observed.push(el)
  }
  unobserve() {}
  disconnect() {
    this.disconnected = true
  }
  takeRecords() {
    return []
  }
  fire(isIntersecting: boolean) {
    this.callback(this.observed.map((target) => ({ isIntersecting, target })))
  }
}

const win = window as unknown as Record<string, unknown>
const originalIO = win.IntersectionObserver
const originalMatchMedia = win.matchMedia

function setReducedMotion(reduce: boolean) {
  win.matchMedia = (query: string) => ({
    matches: reduce && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
}

const MARKS: RedlineMarkSpec[] = [
  { variant: 'circle', x: 56.5, y: 2.5, w: 28, h: 10.5, note: 'no phone number up top', detail: 'The header has links and a button, but no number to tap.' },
  { variant: 'arrow', x: 63, y: 12.5, w: 5, h: 8.5 },
  { variant: 'underline', x: 34.5, y: 72, w: 31.5, h: 5, note: 'what you do is the smallest line', notePlacement: 'above' },
  { variant: 'box', x: 70, y: 33, w: 25, h: 35, note: 'room for a call button', notePlacement: 'right', noteWidth: 20 },
  { variant: 'circle', x: 61, y: 51, w: 27, h: 13, note: 'now: phone number, one tap', tone: 'fern', hideNarrow: true },
]

function renderFrame(props: Partial<Parameters<typeof RedlineFrame>[0]> = {}) {
  return render(
    <RedlineFrame marks={MARKS} {...props}>
      <img src="/redesign/djn-before-home.jpg" width={1600} height={933} alt="DJN Services' old homepage" />
    </RedlineFrame>
  )
}

function frameRoot(container: HTMLElement) {
  return container.querySelector('.redline-frame') as HTMLElement
}

beforeEach(() => {
  MockIntersectionObserver.instances = []
  win.IntersectionObserver = MockIntersectionObserver
  setReducedMotion(false)
})

afterEach(() => {
  win.IntersectionObserver = originalIO
  win.matchMedia = originalMatchMedia
})

describe('RedlineFrame markup', () => {
  it('renders the image inside a figure with one mark per spec', () => {
    const { container } = renderFrame()
    expect(screen.getByAltText("DJN Services' old homepage")).toBeInTheDocument()
    expect(container.querySelectorAll('.redline-mark').length).toBe(MARKS.length)
    expect(container.querySelector('figure.redline-figure')).toBeInTheDocument()
  })

  it('positions marks in % from x, y, w, h', () => {
    const { container } = renderFrame()
    const first = container.querySelector('.redline-mark') as HTMLElement
    expect(first.style.left).toBe('56.5%')
    expect(first.style.top).toBe('2.5%')
    expect(first.style.width).toBe('28%')
    expect(first.style.height).toBe('10.5%')
  })

  it('renders each variant with its own class', () => {
    const { container } = renderFrame()
    const variants = Array.from(container.querySelectorAll('.redline-mark')).map((el) => el.getAttribute('data-variant'))
    expect(variants).toEqual(['circle', 'arrow', 'underline', 'box', 'circle'])
    expect(container.querySelector('.redline-mark--box')).toBeInTheDocument()
    expect(container.querySelector('.redline-mark--arrow')).toBeInTheDocument()
  })

  it('hides every mark, note and pin from assistive tech', () => {
    const { container } = renderFrame()
    container.querySelectorAll('.redline-mark, .redline-note, .redline-pin').forEach((el) => {
      expect(el).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('puts the meaning of every note in an ordered list, in reading order', () => {
    renderFrame({ listLabel: 'What I marked on the old homepage' })
    const list = screen.getByRole('list', { name: 'What I marked on the old homepage' })
    expect(list.tagName).toBe('OL')
    const items = Array.from(list.querySelectorAll('li')) as HTMLElement[]
    expect(items.length).toBe(4)
    expect(items[0]).toHaveTextContent('no phone number up top')
    expect(items[0]).toHaveTextContent('The header has links and a button, but no number to tap.')
    expect(items[3]).toHaveTextContent('now: phone number, one tap')
  })

  it('numbers pins only for marks with notes, matching the list order', () => {
    const { container } = renderFrame()
    const pins = Array.from(container.querySelectorAll('.redline-pin')).map((el) => el.textContent)
    expect(pins).toEqual(['1', '2', '3', '4'])
    const nums = Array.from(container.querySelectorAll('.redline-list-num')).map((el) => el.textContent)
    expect(nums).toEqual(['1', '2', '3', '4'])
  })

  it('places notes from notePlacement and noteWidth', () => {
    const { container } = renderFrame()
    const notes = container.querySelectorAll<HTMLElement>('.redline-note')
    // below: under the mark, left edges aligned
    expect(notes[0].getAttribute('data-placement')).toBe('below')
    expect(notes[0].style.left).toBe('56.5%')
    expect(notes[0].style.top).toBe('14.5%')
    // above: anchored by bottom
    expect(notes[1].style.bottom).toBe('29.5%')
    // right: beside the mark
    expect(notes[2].style.left).toBe('96.5%')
    expect(notes[2].style.maxWidth).toBe('20%')
  })

  it('staggers draw-on delays when marks set none', () => {
    const { container } = renderFrame()
    const marks = container.querySelectorAll<HTMLElement>('.redline-mark')
    expect(marks[0].style.getPropertyValue('--redline-delay')).toBe('0.1s')
    expect(marks[1].style.getPropertyValue('--redline-delay')).toBe('0.5s')
  })

  it('marks the fix in fern and can hide a mark on narrow frames', () => {
    const { container } = renderFrame()
    const marks = container.querySelectorAll('.redline-mark')
    expect(marks[4]).toHaveClass('redline-tone-fern', 'redline-hide-narrow')
    expect(marks[0]).toHaveClass('redline-tone-redline')
  })

  it('gives every shape its own mask id', () => {
    const { container } = renderFrame()
    const ids = Array.from(container.querySelectorAll('mask')).map((m) => m.id)
    expect(ids.length).toBe(MARKS.length)
    expect(new Set(ids).size).toBe(ids.length)
    ids.forEach((id) => {
      expect(container.querySelector(`g[mask="url(#${id})"]`)).toBeInTheDocument()
    })
  })

  it('renders a caption when given', () => {
    renderFrame({ caption: 'DJN Services, North Alabama. Old homepage, marked up.' })
    expect(screen.getByText('DJN Services, North Alabama. Old homepage, marked up.').tagName).toBe('FIGCAPTION')
  })

  it('renders no list when no mark has a note', () => {
    render(
      <RedlineFrame marks={[{ variant: 'circle', x: 1, y: 1, w: 10, h: 10 }]}>
        <img src="/x.jpg" alt="x" />
      </RedlineFrame>
    )
    expect(screen.queryByRole('list')).toBeNull()
  })
})

describe('Draw-on (useRedlineDraw)', () => {
  it('arms off-screen frames, then draws once they intersect', () => {
    const { container } = renderFrame()
    const root = frameRoot(container)
    expect(root).toHaveAttribute('data-redline-draw', 'armed')
    expect(MockIntersectionObserver.instances.length).toBe(1)
    const io = MockIntersectionObserver.instances[0]
    expect(io.observed[0]).toBe(root)

    act(() => io.fire(false))
    expect(root).toHaveAttribute('data-redline-draw', 'armed')

    act(() => io.fire(true))
    expect(root).toHaveAttribute('data-redline-draw', 'drawn')
    expect(io.disconnected).toBe(true)
  })

  it('renders drawn with no animation under prefers-reduced-motion', () => {
    setReducedMotion(true)
    const { container } = renderFrame()
    expect(frameRoot(container).hasAttribute('data-redline-draw')).toBe(false)
    expect(MockIntersectionObserver.instances.length).toBe(0)
  })

  it('renders drawn when IntersectionObserver is missing', () => {
    win.IntersectionObserver = undefined
    const { container } = renderFrame()
    expect(frameRoot(container).hasAttribute('data-redline-draw')).toBe(false)
  })

  it('renders drawn when drawOn is false', () => {
    const { container } = renderFrame({ drawOn: false })
    expect(frameRoot(container).hasAttribute('data-redline-draw')).toBe(false)
    expect(MockIntersectionObserver.instances.length).toBe(0)
  })

  it('stays drawn when the frame is already on screen at hydration', () => {
    const spy = jest.spyOn(Element.prototype, 'getBoundingClientRect')
    spy.mockReturnValue({ top: 10, bottom: 400, height: 390, left: 0, right: 500, width: 500, x: 0, y: 10, toJSON: () => ({}) })
    const { container } = renderFrame()
    expect(frameRoot(container).hasAttribute('data-redline-draw')).toBe(false)
    jest.restoreAllMocks()
  })

  it('ships CSS that hides armed marks, animates drawn ones and forces drawn under reduced motion', () => {
    const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')
    expect(css).toContain('[data-redline-draw="armed"] .redline-reveal')
    expect(css).toContain('stroke-dashoffset: calc(var(--redline-len, 400) * 1px)')
    expect(css).toContain('[data-redline-draw="drawn"] .redline-reveal')
    const reduced = css.slice(css.lastIndexOf('@media (prefers-reduced-motion: reduce)'))
    expect(reduced).toContain('stroke-dashoffset: 0 !important')
  })
})

describe('Phone pin fallback', () => {
  it('switches to pins + a visible list below 560px of frame width (container query)', () => {
    const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')
    expect(css).toContain('container: redline / inline-size')
    const rule = css.slice(css.indexOf('@container redline (max-width: 559px)'))
    expect(css.includes('@container redline (max-width: 559px)')).toBe(true)
    expect(rule).toContain('.redline-pin {\n    display: grid;')
    expect(rule).toContain('.redline-note,')
  })

  it('defaults to automatic pins, with notes on the image', () => {
    const { container } = renderFrame()
    const root = frameRoot(container)
    expect(root).toHaveAttribute('data-redline-pins', 'auto')
    expect(root).not.toHaveClass('redline-frame--pins')
  })

  it('forces pin mode at any width with pins="always"', () => {
    const { container } = renderFrame({ pins: 'always' })
    const root = frameRoot(container)
    expect(root).toHaveClass('redline-frame--pins')
    expect(root).toHaveAttribute('data-redline-pins', 'always')
    expect(container.querySelectorAll('.redline-pin').length).toBe(4)
  })

  it('places each pin at the mark top-right by default, or at pinAt', () => {
    const { container } = render(
      <RedlineFrame
        marks={[
          { variant: 'circle', x: 10, y: 20, w: 30, h: 10, note: 'one' },
          { variant: 'box', x: 50, y: 50, w: 10, h: 10, note: 'two', pinAt: { x: 5, y: 6 } },
        ]}
      >
        <img src="/x.jpg" alt="x" />
      </RedlineFrame>
    )
    const pins = container.querySelectorAll<HTMLElement>('.redline-pin')
    expect(pins[0].style.left).toBe('40%')
    expect(pins[0].style.top).toBe('20%')
    expect(pins[1].style.left).toBe('5%')
    expect(pins[1].style.top).toBe('6%')
  })
})

describe('Note length rule', () => {
  it('counts words', () => {
    expect(REDLINE_NOTE_MAX_WORDS).toBe(8)
    expect(countWords('no phone number up top')).toBe(5)
    expect(countWords('  room   for a call button ')).toBe(5)
  })

  it('warns in development when a note runs over 8 words', () => {
    const warn = jest.spyOn(console, 'warn')
    warn.mockImplementation(() => {})
    render(
      <div className="redline-canvas">
        <RedlineMark variant="circle" x={0} y={0} w={10} h={10} note="this note is much too long to read at a glance" />
      </div>
    )
    expect(warn).toHaveBeenCalled()
    jest.restoreAllMocks()
  })
})

describe('RedlineUnderline', () => {
  it('keeps the words as plain text and draws one decorative wave per word', () => {
    const { container } = render(
      <h2>
        I find what is <RedlineUnderline>costing you calls.</RedlineUnderline>
      </h2>
    )
    expect(screen.getByRole('heading')).toHaveTextContent('I find what is costing you calls.')
    const words = container.querySelectorAll('.redline-underline-word')
    expect(words.length).toBe(3)
    container.querySelectorAll('.redline-underline-word svg').forEach((svg) => {
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('gives each of 3 words its own complete wave, with plain spaces between words', () => {
    const { container } = render(<RedlineUnderline>costing you calls.</RedlineUnderline>)
    const root = container.querySelector('.redline-underline') as HTMLElement
    const words = Array.from(root.querySelectorAll('.redline-underline-word'))
    expect(words.map((w) => w.textContent)).toEqual(['costing', 'you', 'calls.'])
    words.forEach((word) => {
      const waves = word.querySelectorAll('svg.redline-shape')
      expect(waves.length).toBe(1)
      expect(waves[0].parentElement).toBe(word)
      expect(waves[0].querySelectorAll('path.redline-stroke').length).toBe(1)
    })
    expect(root.querySelectorAll('svg.redline-shape').length).toBe(3)
    // Spaces are text nodes between the word spans, so wrapping happens there.
    const spaces = Array.from(root.childNodes).filter((n) => n.nodeType === 3)
    expect(spaces.map((n) => n.textContent)).toEqual([' ', ' '])
    expect(root.textContent).toBe('costing you calls.')
    // Every wave is inside the one draw-on root, so all words draw together.
    expect(root).toHaveAttribute('data-redline-draw', 'armed')
    act(() => MockIntersectionObserver.instances[0].fire(true))
    expect(root).toHaveAttribute('data-redline-draw', 'drawn')
    expect(root.querySelectorAll('mask .redline-reveal').length).toBe(3)
  })

  it('arms and draws like the frame, and uses goldenrod on Pine', () => {
    const { container } = render(<RedlineUnderline tone="goldenrod">One clear next step.</RedlineUnderline>)
    const root = container.querySelector('.redline-underline') as HTMLElement
    expect(root).toHaveClass('redline-underline--goldenrod')
    expect(root).toHaveAttribute('data-redline-draw', 'armed')
    act(() => MockIntersectionObserver.instances[0].fire(true))
    expect(root).toHaveAttribute('data-redline-draw', 'drawn')
  })

  it('renders drawn under reduced motion', () => {
    setReducedMotion(true)
    const { container } = render(<RedlineUnderline>costing you calls.</RedlineUnderline>)
    expect((container.querySelector('.redline-underline') as HTMLElement).hasAttribute('data-redline-draw')).toBe(false)
  })
})
