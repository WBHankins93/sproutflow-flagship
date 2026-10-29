/**
 * MEDIUM PRIORITY TESTS: the Lead Machine hero diagram (components/home/hero-machine)
 *
 * The server renders the fixed (rest) frame; after hydration the Web
 * Animations API plays the loop only when motion is allowed. It pauses with a
 * real button (WCAG 2.2.2), off screen and in a hidden tab. jsdom has no
 * IntersectionObserver, matchMedia or Element.animate, so all three are
 * mocked here.
 */

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { act } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { fireEvent, render, screen } from '@testing-library/react'
import HeroMachineDefault, { HeroMachine } from '@/components/home/hero-machine'
import { CARDS, LAYOUTS, MACHINE_LABEL, STEPS } from '@/components/home/hero-machine/config'
import { ACTION, CYCLE, STATES, buildTracks, stateAt } from '@/components/home/hero-machine/timeline'

// react-dom/server's browser build needs TextEncoder, which jsdom lacks.
const { renderToString } = require('react-dom/server.node') as typeof import('react-dom/server')

type IOCallback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: IOCallback
  observed: Element[] = []
  disconnected = false
  constructor(callback: IOCallback) {
    this.callback = callback
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
    act(() => this.callback(this.observed.map((target) => ({ isIntersecting, target }))))
  }
}

interface FakeAnimation {
  play: jest.Mock
  pause: jest.Mock
  cancel: jest.Mock
  currentTime: number
  playing: boolean
}

let created: FakeAnimation[] = []
const animate = jest.fn(() => {
  const a: FakeAnimation = {
    currentTime: 0,
    playing: false,
    play: jest.fn(() => {
      a.playing = true
    }),
    pause: jest.fn(() => {
      a.playing = false
    }),
    cancel: jest.fn(),
  }
  created.push(a)
  return a
})

const win = window as unknown as Record<string, unknown>
const proto = Element.prototype as unknown as Record<string, unknown>
const originalIO = win.IntersectionObserver
const originalMatchMedia = win.matchMedia
const originalAnimate = proto.animate

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

function setHidden(hidden: boolean) {
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => hidden })
  act(() => {
    document.dispatchEvent(new Event('visibilitychange'))
  })
}

/** Render and let the mount effect (fonts, layout, reduced motion) settle. */
async function renderMachine() {
  const utils = render(<HeroMachine />)
  await act(async () => {})
  const root = utils.container.querySelector('[data-motion]') as HTMLElement
  return { ...utils, root }
}

function ssrContainer() {
  const host = document.createElement('div')
  host.innerHTML = renderToString(<HeroMachine />)
  return host
}

const NEIGHBORHOODS = [
  'New Orleans',
  'NOLA',
  'Metairie',
  'Kenner',
  'Northshore',
  'Westbank',
  'West Bank',
  'French Quarter',
  'Garden District',
  'Uptown',
  'Mid-City',
  'Marigny',
  'Bywater',
  'Lakeview',
  'Gentilly',
  'Algiers',
  'Treme',
  'Slidell',
  'Mandeville',
  'Covington',
  'Chalmette',
  'Harahan',
  'Jefferson Parish',
  'Louisiana',
]

beforeEach(() => {
  created = []
  animate.mockClear()
  MockIntersectionObserver.instances = []
  win.IntersectionObserver = MockIntersectionObserver
  proto.animate = animate
  setReducedMotion(false)
  Object.defineProperty(document, 'hidden', { configurable: true, get: () => false })
})

afterEach(() => {
  win.IntersectionObserver = originalIO
  win.matchMedia = originalMatchMedia
  proto.animate = originalAnimate
})

describe('HeroMachine API', () => {
  it('exports the same component as default and named export', () => {
    expect(HeroMachineDefault).toBe(HeroMachine)
  })

  it('passes className to the root', async () => {
    const { container } = render(<HeroMachine className="mt-8 extra" />)
    await act(async () => {})
    expect(container.firstElementChild).toHaveClass('mt-8', 'extra')
  })
})

describe('server render: the fixed frame', () => {
  it('renders the rest state with no motion', () => {
    const host = ssrContainer()
    const root = host.querySelector('[data-motion]') as HTMLElement
    expect(root).toHaveAttribute('data-state', 'fixed')
    expect(root).toHaveAttribute('data-motion', 'static')
  })

  it('is one image with a label that tells the whole story', () => {
    const host = ssrContainer()
    const img = host.querySelector('[role="img"]') as HTMLElement
    expect(img).toHaveAttribute('aria-label', MACHINE_LABEL)
    expect(img.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    for (const card of CARDS) {
      expect(MACHINE_LABEL.toLowerCase()).toContain(card.main.toLowerCase())
      expect(MACHINE_LABEL).toContain(card.booked.spoken)
    }
    expect(MACHINE_LABEL).toContain('no callback')
    expect(MACHINE_LABEL).toContain('nothing piling up')
  })

  it('shows every booked row, the rest note and the gold dial; inquiries are hidden', () => {
    const host = ssrContainer()
    CARDS.forEach((_, i) => {
      // One row per calendar (desktop and phone), both visible in the fixed frame.
      const rows = host.querySelectorAll(`[data-hm="row-${i}"]`)
      expect(rows.length).toBe(2)
      rows.forEach((row) => expect((row as HTMLElement).style.opacity).toBe(''))
      expect((host.querySelector(`[data-hm="inq-${i}"]`) as HTMLElement).style.opacity).toBe('0')
      expect((host.querySelector(`[data-hm="bk-${i}"]`) as HTMLElement).style.opacity).toBe('0')
    })
    expect((host.querySelector('[data-hm="restnote"]') as HTMLElement).style.opacity).toBe('1')
    expect((host.querySelector('[data-hm="needle"]') as HTMLElement).style.transform).toBe('rotate(60deg)')
    expect(host.textContent).toContain('nothing piling up')
    expect(host.textContent).toContain('(EXAMPLE)')
  })

  it('has three cards, with the 6:42 PM missed call first', () => {
    expect(CARDS.length).toBe(3)
    expect(CARDS[0].kick).toBe('MISSED CALL')
    expect(CARDS[0].main).toBe('6:42 PM')
    expect(CARDS[0].note).toBe('no callback')
    const host = ssrContainer()
    expect(host.querySelectorAll('[data-hm^="inq-"]').length).toBe(3)
    expect(host.querySelectorAll('[data-hm^="bk-"]').length).toBe(3)
  })

  it('renders the pause button and the steps, with the button inert until motion starts', () => {
    const host = ssrContainer()
    const button = host.querySelector('button') as HTMLButtonElement
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button).toHaveTextContent('Pause animation')
    expect(button.disabled).toBe(true)
    const items = host.querySelectorAll('ol li')
    expect(items.length).toBe(STEPS.length)
  })

  it('hydrates without a mismatch, and the first client render matches the server', async () => {
    const html = renderToString(<HeroMachine />)
    const host = document.createElement('div')
    host.innerHTML = html
    document.body.appendChild(host)
    const errors = jest.spyOn(console, 'error').mockImplementation(() => {})
    const root = await act(async () => hydrateRoot(host, <HeroMachine />))
    expect(errors).not.toHaveBeenCalled()
    errors.mockRestore()
    act(() => root.unmount())
    host.remove()
  })
})

describe('reduced motion', () => {
  it('does not start the animation and keeps the fixed frame', async () => {
    setReducedMotion(true)
    const { root } = await renderMachine()
    expect(animate).not.toHaveBeenCalled()
    expect(root).toHaveAttribute('data-motion', 'static')
    expect(root).toHaveAttribute('data-state', 'fixed')
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(true)
  })

  it('stays static when the browser has no Web Animations API', async () => {
    proto.animate = undefined
    const { root } = await renderMachine()
    expect(root).toHaveAttribute('data-motion', 'static')
  })
})

describe('motion allowed', () => {
  it('builds the loop on the client and plays once the diagram is on screen', async () => {
    const { root } = await renderMachine()
    expect(animate).toHaveBeenCalled()
    const io = MockIntersectionObserver.instances.at(-1)!
    expect(io.observed[0]).toHaveAttribute('role', 'img')
    io.fire(true)
    expect(root).toHaveAttribute('data-motion', 'running')
    expect(created.every((a) => a.playing)).toBe(true)
    expect((screen.getByRole('button') as HTMLButtonElement).disabled).toBe(false)
    // data-state names the state at the current time.
    expect(root.getAttribute('data-state')).toBe('clear')
  })

  it('the pause button toggles aria-pressed, its label and the animation', async () => {
    const { root } = await renderMachine()
    MockIntersectionObserver.instances.at(-1)!.fire(true)
    const button = screen.getByRole('button', { name: 'Pause animation' })
    expect(button).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveTextContent('Play animation')
    expect(root).toHaveAttribute('data-motion', 'paused')
    expect(created.some((a) => a.playing)).toBe(false)

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button).toHaveTextContent('Pause animation')
    expect(root).toHaveAttribute('data-motion', 'running')
    expect(created.every((a) => a.playing)).toBe(true)
  })

  it('pauses off screen and resumes when back in view', async () => {
    const { root } = await renderMachine()
    const io = MockIntersectionObserver.instances.at(-1)!
    io.fire(true)
    io.fire(false)
    expect(root).toHaveAttribute('data-motion', 'paused')
    expect(created.every((a) => a.pause.mock.calls.length > 0 && !a.playing)).toBe(true)
    // Off-screen is not a user pause: the button still offers "Pause".
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
    io.fire(true)
    expect(root).toHaveAttribute('data-motion', 'running')
  })

  it('stays paused when the user paused it, even back on screen', async () => {
    const { root } = await renderMachine()
    const io = MockIntersectionObserver.instances.at(-1)!
    io.fire(true)
    fireEvent.click(screen.getByRole('button'))
    io.fire(false)
    io.fire(true)
    expect(root).toHaveAttribute('data-motion', 'paused')
  })

  it('pauses while the tab is hidden', async () => {
    const { root } = await renderMachine()
    MockIntersectionObserver.instances.at(-1)!.fire(true)
    setHidden(true)
    expect(root).toHaveAttribute('data-motion', 'paused')
    setHidden(false)
    expect(root).toHaveAttribute('data-motion', 'running')
  })

  it('cancels every animation and observer on unmount', async () => {
    const { unmount } = await renderMachine()
    const io = MockIntersectionObserver.instances.at(-1)!
    unmount()
    expect(created.every((a) => a.cancel.mock.calls.length > 0)).toBe(true)
    expect(io.disconnected).toBe(true)
  })
})

describe('timeline', () => {
  it('runs about 6.5 s of action, then rests on the fixed frame', () => {
    expect(ACTION).toBeGreaterThanOrEqual(6)
    expect(ACTION).toBeLessThanOrEqual(7)
    expect(CYCLE - ACTION).toBeGreaterThanOrEqual(2)
    expect(stateAt(ACTION + 0.1)).toBe('fixed')
    expect(stateAt(CYCLE - 0.01)).toBe('fixed')
    expect(stateAt(0)).toBe('clear')
    expect(stateAt(CYCLE + 0.5)).toBe('pile-up')
  })

  it('names the states in order, with the missed call marked first', () => {
    const names = STATES.map((s) => s.name)
    expect(names[0]).toBe('clear')
    expect(names[1]).toBe('pile-up')
    expect(names[2]).toBe('mark-call')
    expect(names.at(-1)).toBe('fixed')
    for (const card of CARDS) {
      const order = ['mark', 'into-machine', 'booked', 'calendar'].map((p) => names.indexOf(`${p}-${card.id}` as never))
      expect(order.every((i) => i > 0)).toBe(true)
      expect([...order].sort((a, b) => a - b)).toEqual(order)
    }
    const times = STATES.map((s) => s.at)
    expect([...times].sort((a, b) => a - b)).toEqual(times)
  })

  for (const layout of ['desktop', 'phone'] as const) {
    it(`every ${layout} track is a valid loop over elements that exist`, () => {
      const host = ssrContainer()
      for (const t of buildTracks(layout)) {
        expect(host.querySelector(`[data-hm="${t.target}"]`)).not.toBeNull()
        const offsets = t.keyframes.map((k) => k.offset as number)
        expect(offsets[0]).toBe(0)
        expect(offsets.at(-1)).toBe(1)
        offsets.slice(1).forEach((o, i) => expect(o).toBeGreaterThanOrEqual(offsets[i]))
      }
    })
  }
})

describe('layout and copy', () => {
  it('keeps card text at 12px or larger on a 375px phone', () => {
    const stageWidth = 375 - 32
    const scale = stageWidth / LAYOUTS.phone.viewBox[2]
    expect(16 * scale).toBeGreaterThanOrEqual(12)
    // Caveat notes stay at the 18px annotation floor.
    expect(24 * scale).toBeGreaterThanOrEqual(18)
  })

  it('crops the phone view inside the drawn scene', () => {
    const [dx, dy, dw, dh] = LAYOUTS.desktop.viewBox
    const [px, py, pw, ph] = LAYOUTS.phone.viewBox
    expect(px).toBeGreaterThanOrEqual(dx)
    expect(py).toBeGreaterThanOrEqual(dy)
    expect(px + pw).toBeLessThanOrEqual(dx + dw)
    expect(py + ph).toBeLessThanOrEqual(dy + dh)
  })

  it('names no neighborhoods or local-only places', () => {
    const host = ssrContainer()
    const text = `${host.textContent} ${MACHINE_LABEL}`
    const dir = join(process.cwd(), 'components/home/hero-machine')
    const source = readdirSync(dir)
      .map((f) => readFileSync(join(dir, f), 'utf8'))
      .join('\n')
    for (const place of NEIGHBORHOODS) {
      expect(text).not.toContain(place)
      expect(source).not.toContain(place)
    }
  })

  it('has no em dashes in visible text or labels', () => {
    const host = ssrContainer()
    const EM_DASH = String.fromCharCode(0x2014)
    expect(host.textContent?.includes(EM_DASH)).toBe(false)
    expect(MACHINE_LABEL.includes(EM_DASH)).toBe(false)
    host.querySelectorAll('[aria-label]').forEach((el) => {
      expect(el.getAttribute('aria-label')?.includes(EM_DASH)).toBe(false)
    })
  })
})
