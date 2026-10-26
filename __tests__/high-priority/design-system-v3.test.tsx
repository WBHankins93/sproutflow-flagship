/**
 * HIGH PRIORITY TESTS: Design system v3 foundation
 *
 * Wave 2 builds pages from these tokens and components, so they are a
 * contract. Covers the five font roles (lib/fonts.ts), the Tailwind tokens
 * (no faux bold: every display token is weight 400), the redline colour and
 * its contrast, and the v3 primitives in components/v3.
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen } from '@testing-library/react'
import tailwindConfig from '../../tailwind.config.js'
import { FONT_ROLES } from '@/lib/fonts'
import { ButtonLink, Container, Eyebrow, Heading, MarginNote, Section } from '@/components/v3'

const read = (path: string) => readFileSync(join(process.cwd(), path), 'utf8')

type FontSizeTuple = [string, { lineHeight?: string; letterSpacing?: string; fontWeight?: string }]
const theme = (tailwindConfig as any).theme.extend
const fontSize = theme.fontSize as Record<string, FontSizeTuple>

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

describe('Font roles (lib/fonts.ts)', () => {
  const source = read('lib/fonts.ts')

  it('exports the five roles as CSS variables', () => {
    expect(FONT_ROLES).toEqual({
      hero: '--font-hero',
      display: '--font-display',
      body: '--font-body',
      annotation: '--font-annotation',
      mono: '--font-mono',
    })
  })

  it('loads each family with the decided weights', () => {
    expect(source).toContain("Archivo({\n  subsets: ['latin'],\n  weight: ['800', '900'],\n  variable: '--font-hero'")
    expect(source).toContain("Instrument_Serif({\n  subsets: ['latin'],\n  weight: '400',\n  style: ['normal', 'italic'],\n  variable: '--font-display'")
    expect(source).toContain("DM_Sans({\n  subsets: ['latin'],\n  weight: ['400', '500', '600'],\n  variable: '--font-body'")
    expect(source).toContain("Caveat({\n  subsets: ['latin'],\n  weight: '700',\n  variable: '--font-annotation'")
    expect(source).toContain("Fira_Code({\n  subsets: ['latin'],\n  weight: ['400', '500'],\n  variable: '--font-mono'")
  })

  it('retires Newsreader and applies every variable on <body> with font-body', () => {
    const layout = read('app/layout.tsx')
    expect(source.includes('Newsreader(')).toBe(false)
    expect(layout.includes('Newsreader')).toBe(false)
    expect(layout).toContain("import { fontVariables } from '@/lib/fonts'")
    expect(layout).toContain('className={`${fontVariables} antialiased font-body`}')
  })

  it('aliases --font-accent to the display serif and guards against faux bold', () => {
    const css = read('app/globals.css')
    expect(css).toContain('--font-accent: var(--font-display);')
    expect(css).toContain('font-synthesis: style;')
  })
})

describe('Tailwind tokens', () => {
  it('maps every role to a fontFamily, keeping font-accent as an alias', () => {
    const ff = theme.fontFamily as Record<string, string[]>
    expect(ff.hero[0]).toBe('var(--font-hero)')
    expect(ff.display[0]).toBe('var(--font-display)')
    expect(ff.body[0]).toBe('var(--font-body)')
    expect(ff.annotation[0]).toBe('var(--font-annotation)')
    expect(ff.mono[0]).toBe('var(--font-mono)')
    expect(ff.accent[0]).toBe('var(--font-accent)')
  })

  it('sets every display and legacy display token to weight 400 (no faux bold)', () => {
    for (const key of ['display-xl', 'display-lg', 'display-md', 'display-sm', 'h4', 'section', 'subsection']) {
      expect([key, fontSize[key][1].fontWeight]).toEqual([key, '400'])
    }
  })

  it('loosens display tracking to about -0.01em', () => {
    for (const key of ['display-xl', 'display-lg', 'display-md', 'display-sm', 'section', 'subsection']) {
      const tracking = parseFloat(fontSize[key][1].letterSpacing ?? '0')
      expect(tracking).toBeGreaterThanOrEqual(-0.01)
      expect(tracking).toBeLessThan(0)
    }
  })

  it('defines text-hero for the Archivo headline', () => {
    expect(fontSize.hero).toEqual([
      'clamp(2.75rem, 6vw, 5.75rem)',
      { lineHeight: '0.95', letterSpacing: '-0.035em', fontWeight: '900' },
    ])
  })

  it('defines text-annotation with an 18px floor', () => {
    expect(fontSize.annotation[0].startsWith('clamp(1.125rem,')).toBe(true)
    expect(fontSize.annotation[1].fontWeight).toBe('700')
  })

  it('adds the redline colour without changing existing tokens', () => {
    const colors = theme.colors
    expect(colors.redline).toEqual({ DEFAULT: '#B42318', ink: '#9A1C13', soft: '#FBE9E7' })
    expect(colors.primary[900]).toBe('#223528')
    expect(colors.accent[500]).toBe('#D9A441')
    expect(colors.cream).toEqual({ 500: '#E4E3D2', 300: '#F4EFE3' })
  })

  it('keeps redline text at 4.5:1 or better on Birch, white and its soft tint', () => {
    expect(contrast('#B42318', '#F4EFE3')).toBeGreaterThanOrEqual(4.5) // 5.73
    expect(contrast('#B42318', '#FFFFFF')).toBeGreaterThanOrEqual(4.5) // 6.57
    expect(contrast('#B42318', '#FBF8F1')).toBeGreaterThanOrEqual(4.5) // 6.20 Paper
    expect(contrast('#9A1C13', '#FBE9E7')).toBeGreaterThanOrEqual(4.5) // 7.03
    expect(contrast('#FFFFFF', '#B42318')).toBeGreaterThanOrEqual(4.5) // pin numerals
  })

  it('keeps the other new text pairs at 4.5:1 or better', () => {
    expect(contrast('#3F6B45', '#F4EFE3')).toBeGreaterThanOrEqual(4.5) // fern note on Birch
    expect(contrast('#3F6B45', '#E4E3D2')).toBeGreaterThanOrEqual(4.5) // fern note on Lichen
    expect(contrast('#4A574D', '#E4E3D2')).toBeGreaterThanOrEqual(4.5) // eyebrow on Lichen
    expect(contrast('#C9CFC4', '#223528')).toBeGreaterThanOrEqual(4.5) // eyebrow on Pine
    expect(contrast('#223528', '#D9A441')).toBeGreaterThanOrEqual(4.5) // onDark button
    expect(contrast('#E7C688', '#223528')).toBeGreaterThanOrEqual(4.5) // gold note on Pine
  })
})

describe('Container', () => {
  it('centres content with the default max width and gutters', () => {
    const { container } = render(<Container>content</Container>)
    expect(container.firstChild).toHaveClass('mx-auto', 'w-full', 'px-4', 'max-w-container')
  })

  it('supports narrow and wide', () => {
    const { container, rerender } = render(<Container size="narrow">x</Container>)
    expect(container.firstChild).toHaveClass('max-w-container-narrow')
    rerender(<Container size="wide">x</Container>)
    expect(container.firstChild).toHaveClass('max-w-container-wide')
  })
})

describe('Section', () => {
  it('renders a labelled section on Birch with the default rhythm', () => {
    render(
      <Section id="proof" labelledBy="proof-h">
        <h2 id="proof-h">Proof</h2>
      </Section>
    )
    const section = screen.getByRole('region', { name: 'Proof' })
    expect(section).toHaveAttribute('id', 'proof')
    expect(section).toHaveAttribute('aria-labelledby', 'proof-h')
    expect(section).toHaveAttribute('data-tone', 'birch')
    expect(section).toHaveClass('bg-cream-300', 'text-primary-900', 'py-[var(--v3-rhythm)]')
    expect(section.firstElementChild).toHaveClass('max-w-container')
  })

  it('maps each tone to its canvas', () => {
    const cases: Array<[Parameters<typeof Section>[0]['tone'], string]> = [
      ['paper', 'bg-[#FBF8F1]'],
      ['lichen', 'bg-cream-500'],
      ['pine', 'bg-primary-900'],
    ]
    for (const [tone, cls] of cases) {
      const { container, unmount } = render(<Section tone={tone}>x</Section>)
      expect(container.querySelector('section')).toHaveClass(cls)
      unmount()
    }
  })

  it('supports rhythm and an uncontained layout', () => {
    const { container } = render(
      <Section rhythm="tight" container={false}>
        <p>bare</p>
      </Section>
    )
    const section = container.querySelector('section') as HTMLElement
    expect(section).toHaveClass('py-[var(--v3-rhythm-tight)]')
    expect(section.firstElementChild?.tagName).toBe('P')
  })
})

describe('Eyebrow', () => {
  it('renders a mono uppercase label with an optional red index', () => {
    render(<Eyebrow index="03">Free website check</Eyebrow>)
    const label = screen.getByText('Free website check').parentElement as HTMLElement
    expect(label).toHaveClass('font-mono', 'text-label', 'uppercase', 'tabular-nums')
    expect(screen.getByText('03')).toHaveClass('text-redline')
  })

  it('switches to on-dark colours', () => {
    render(<Eyebrow index="07" onDark>Book</Eyebrow>)
    expect(screen.getByText('07')).toHaveClass('text-accent-300')
    expect(screen.getByText('Book').parentElement).toHaveClass('text-[#C9CFC4]')
  })
})

describe('Heading', () => {
  it('renders the hero size in Archivo (font-hero)', () => {
    render(
      <Heading as="h1" size="hero">
        I find what is costing you calls.
      </Heading>
    )
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveClass('font-hero', 'text-hero')
    expect(h1).toHaveAttribute('data-size', 'hero')
  })

  it('renders every other size in the display serif at weight 400', () => {
    const sizes = ['xl', 'lg', 'md', 'sm'] as const
    for (const size of sizes) {
      const { unmount } = render(<Heading size={size}>Heading {size}</Heading>)
      const heading = screen.getByRole('heading', { name: `Heading ${size}` })
      expect(heading).toHaveClass('font-display', `text-display-${size}`, 'font-normal')
      expect(heading.className.includes('font-bold')).toBe(false)
      expect(heading.className.includes('font-semibold')).toBe(false)
      unmount()
    }
  })

  it('picks a default size from the level', () => {
    render(
      <>
        <Heading as="h1">One</Heading>
        <Heading>Two</Heading>
        <Heading as="h3">Three</Heading>
        <Heading as="h4">Four</Heading>
      </>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveAttribute('data-size', 'xl')
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('data-size', 'lg')
    expect(screen.getByRole('heading', { level: 3 })).toHaveAttribute('data-size', 'md')
    expect(screen.getByRole('heading', { level: 4 })).toHaveAttribute('data-size', 'sm')
  })

  it('sets exactly one italic word', () => {
    render(
      <Heading id="menu-h" italic="Fixed">
        One menu. Fixed prices.
      </Heading>
    )
    const heading = screen.getByRole('heading', { name: 'One menu. Fixed prices.' })
    expect(heading).toHaveAttribute('id', 'menu-h')
    const ems = heading.querySelectorAll('em')
    expect(ems.length).toBe(1)
    expect(ems[0].textContent).toBe('Fixed')
    expect(ems[0]).toHaveClass('font-display', 'italic', 'font-normal')
  })

  it('renders the full text when the italic word is not found', () => {
    render(<Heading italic="missing">Plain heading</Heading>)
    expect(screen.getByRole('heading')).toHaveTextContent('Plain heading')
    expect(screen.getByRole('heading').querySelector('em')).toBeNull()
  })
})

describe('ButtonLink', () => {
  it('wraps next/link and is at least 44px tall with a visible focus ring', () => {
    render(<ButtonLink href="/book">Book a 15-minute call</ButtonLink>)
    const link = screen.getByRole('link', { name: 'Book a 15-minute call' })
    expect(link).toHaveAttribute('href', '/book')
    expect(link).toHaveClass('min-h-[48px]', 'focus-visible:outline', 'focus-visible:outline-[3px]', 'focus-visible:outline-redline')
    expect(link).toHaveAttribute('data-variant', 'primary')
    expect(link).toHaveClass('bg-primary-900', 'text-cream-300')
  })

  it('renders the secondary outline and the goldenrod onDark variant', () => {
    render(
      <>
        <ButtonLink href="/check" variant="secondary">
          Check your website free
        </ButtonLink>
        <ButtonLink href="/book" variant="onDark">
          Book on dark
        </ButtonLink>
      </>
    )
    expect(screen.getByRole('link', { name: 'Check your website free' })).toHaveClass('bg-transparent', 'border-primary-900', 'text-primary-900')
    expect(screen.getByRole('link', { name: 'Book on dark' })).toHaveClass('bg-accent-500', 'text-primary-900', 'focus-visible:outline-accent-300')
  })

  it('passes anchor attributes through', () => {
    render(
      <ButtonLink href="tel:+15043261676" aria-label="Call Ben at (504) 326-1676">
        (504) 326-1676
      </ButtonLink>
    )
    expect(screen.getByRole('link', { name: 'Call Ben at (504) 326-1676' })).toHaveAttribute('href', 'tel:+15043261676')
  })
})

describe('MarginNote', () => {
  it('renders a Caveat note in Fern with an arrow after the text by default', () => {
    const { container } = render(<MarginNote>I reply within one business day</MarginNote>)
    const note = container.firstElementChild as HTMLElement
    expect(note.tagName).toBe('P')
    expect(note).toHaveClass('font-annotation', 'text-annotation', 'text-ink-700')
    expect(note.lastElementChild?.tagName.toLowerCase()).toBe('svg')
    expect(note.lastElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(note.lastElementChild).toHaveAttribute('data-arrow', 'down')
  })

  it('puts left and up arrows before the text, and none removes it', () => {
    const { container, rerender } = render(<MarginNote arrow="left">that is me</MarginNote>)
    expect(container.firstElementChild?.firstElementChild?.tagName.toLowerCase()).toBe('svg')
    rerender(<MarginNote arrow="none">that is me</MarginNote>)
    expect(container.querySelector('svg')).toBeNull()
  })

  it('supports the redline and onDark tones and decorative notes', () => {
    const { container, rerender } = render(<MarginNote tone="redline">red aside</MarginNote>)
    expect(container.firstElementChild).toHaveClass('text-redline')
    rerender(
      <MarginNote tone="onDark" decorative>
        that is me
      </MarginNote>
    )
    expect(container.firstElementChild).toHaveClass('text-accent-300')
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })
})
