/**
 * MEDIUM PRIORITY TESTS: Case study media
 *
 * The DJN before/after pairs existed in data but never rendered, and the
 * laptop and browser frames cropped the sides of wide site captures (the
 * Second Line Psychiatry logo read "ond Line Psychiatry"). These tests pin
 * both fixes. The v2 DeviceFrame/ImageCarousel are gone; the case study
 * screenshot now renders in CaseStudyLayout's hero box.
 */

import { render, screen } from '@testing-library/react'
import BeforeAfterGallery from '@/components/case-studies/BeforeAfterGallery'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import { caseStudies, type BeforeAfterPair } from '@/data/caseStudies'
import { getImageUrl } from '@/lib/blob-images'

const djn = caseStudies.find((study) => study.slug === 'djn-services')!
const withoutPairs = caseStudies.find((study) => !study.beforeAfter?.length)!

const figuresFor = (container: HTMLElement, side: 'before' | 'after') =>
  Array.from(container.querySelectorAll(`figure[data-side="${side}"]`))

describe('BeforeAfterGallery', () => {
  const pairs = djn.beforeAfter as BeforeAfterPair[]

  it('has DJN pairs to render', () => {
    expect(pairs.length).toBeGreaterThan(0)
  })

  it('renders one Before and one After figure per pair', () => {
    const { container } = render(<BeforeAfterGallery pairs={pairs} clientName={djn.clientName} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Before and after.' })).toBeInTheDocument()
    expect(figuresFor(container, 'before').length).toBe(pairs.length)
    expect(figuresFor(container, 'after').length).toBe(pairs.length)
    expect(container.querySelectorAll('ol > li').length).toBe(pairs.length)
  })

  it('uses the data alt text and helper-built src for every image', () => {
    const { container } = render(<BeforeAfterGallery pairs={pairs} clientName={djn.clientName} />)
    const before = figuresFor(container, 'before')
    const after = figuresFor(container, 'after')

    pairs.forEach((pair, index) => {
      const beforeImg = before[index].querySelector('img')!
      const afterImg = after[index].querySelector('img')!
      expect(beforeImg.getAttribute('alt')).toBe(pair.beforeAlt)
      expect(beforeImg.getAttribute('src')).toBe(getImageUrl(pair.beforeSrc))
      expect(afterImg.getAttribute('alt')).toBe(pair.afterAlt)
      expect(afterImg.getAttribute('src')).toBe(getImageUrl(pair.afterSrc))
      expect(beforeImg.getAttribute('sizes')).toBe('(max-width: 768px) 100vw, 50vw')
    })
  })

  it('labels each figure and shows its caption', () => {
    const { container } = render(<BeforeAfterGallery pairs={pairs} clientName={djn.clientName} />)
    const before = figuresFor(container, 'before')
    const after = figuresFor(container, 'after')

    pairs.forEach((pair, index) => {
      expect(before[index]).toHaveTextContent('Before')
      expect(before[index].querySelector('figcaption')).toHaveTextContent(`Before: ${pair.beforeCaption}`)
      expect(after[index]).toHaveTextContent('After')
      expect(after[index].querySelector('figcaption')).toHaveTextContent(`After: ${pair.afterCaption}`)
    })
  })

  it('reserves a fixed aspect box and never crops the capture', () => {
    const { container } = render(<BeforeAfterGallery pairs={pairs} clientName={djn.clientName} />)
    container.querySelectorAll('figure').forEach((figure) => {
      const img = figure.querySelector('img')!
      expect(img).toHaveClass('object-contain')
      expect(img.parentElement).toHaveClass('aspect-[16/10]')
    })
  })

  it('stacks on mobile and sits side by side from md up', () => {
    const { container } = render(<BeforeAfterGallery pairs={pairs} clientName={djn.clientName} />)
    container.querySelectorAll('ol > li').forEach((row) => {
      expect(row).toHaveClass('grid')
      expect(row).toHaveClass('md:grid-cols-2')
    })
  })

  it('derives alt text when the data has none', () => {
    const pair: BeforeAfterPair = {
      beforeSrc: 'case-studies/a.png',
      beforeAlt: '',
      beforeCaption: '',
      afterSrc: 'case-studies/b.png',
      afterAlt: '',
      afterCaption: '',
    }
    render(<BeforeAfterGallery pairs={[pair]} clientName="Acme" />)
    expect(screen.getByAltText('Before: Acme page 1')).toBeInTheDocument()
    expect(screen.getByAltText('After: Acme page 1')).toBeInTheDocument()
  })

  it('skips a pair that is missing an image', () => {
    const broken: BeforeAfterPair = { ...pairs[0], afterSrc: '' }
    const { container } = render(<BeforeAfterGallery pairs={[broken, pairs[1]]} clientName={djn.clientName} />)
    expect(figuresFor(container, 'before').length).toBe(1)
    expect(figuresFor(container, 'after').length).toBe(1)
  })

  it('renders nothing when no pair is complete', () => {
    const { container } = render(<BeforeAfterGallery pairs={[]} clientName={djn.clientName} />)
    expect(container.innerHTML).toBe('')
  })
})

describe('CaseStudyLayout before/after section', () => {
  it('renders the gallery on the DJN case study', () => {
    const { container } = render(<CaseStudyLayout caseStudy={djn} />)
    expect(screen.getByRole('heading', { level: 2, name: 'Before and after.' })).toBeInTheDocument()
    expect(figuresFor(container, 'before').length).toBe(djn.beforeAfter!.length)
    expect(figuresFor(container, 'after').length).toBe(djn.beforeAfter!.length)
  })

  it('does not render the gallery on a case study without pairs', () => {
    expect(withoutPairs).toBeDefined()
    const { container } = render(<CaseStudyLayout caseStudy={withoutPairs} />)
    expect(screen.queryByRole('heading', { level: 2, name: 'Before and after.' })).toBeNull()
    expect(figuresFor(container, 'before').length).toBe(0)
  })
})

describe('CaseStudyLayout hero screenshot fit', () => {
  const heroImg = (container: HTMLElement, clientName: string) =>
    container.querySelector(`img[alt="${clientName} website"]`) as HTMLImageElement

  it('never crops any case study hero capture', () => {
    caseStudies.forEach((study) => {
      const { container, unmount } = render(<CaseStudyLayout caseStudy={study} />)
      const img = heroImg(container, study.clientName)
      expect(img.getAttribute('src')).toBe(getImageUrl(study.heroImage))
      expect(img).toHaveClass('object-contain', 'object-top')
      expect(img).not.toHaveClass('object-cover')
      expect(img.parentElement).toHaveClass('aspect-[16/9]', 'overflow-hidden')
      unmount()
    })
  })
})
