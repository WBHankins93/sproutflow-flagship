/**
 * HIGH PRIORITY TESTS: site chrome and conversion pages on design system v3
 *
 * - The header nav is the three offer categories, Work, About and the free check.
 * - The footer says where Ben is based and that he works with businesses anywhere.
 * - /check?url= fills the field and never runs the check on its own.
 * - The header and footer carry no neighborhood names (serve anyone, anywhere).
 * - Prices in the check results use the mono price token, and no owned file
 *   sets the display serif below 24px.
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'
import { Footer, FOOTER_BASE_LINE } from '@/components/layout/Footer'
import FooterCta from '@/components/ui/FooterCta'
import CheckPage from '@/app/check/page'
import NotFound from '@/app/not-found'
import { CheckResults } from '@/components/website-check/CheckResults'
import { prefillFromQuery, MAX_PREFILL_LENGTH } from '@/components/website-check/prefill'
import type { WebsiteCheckResult } from '@/lib/website-check/types'

const EXPECTED_NAV = [
  ['Websites', '/services/websites'],
  ['Systems', '/services/business-systems'],
  ['Care', '/services/growth-support'],
  ['Work', '/work'],
  ['About', '/about'],
  ['Free check', '/check'],
]

const NEIGHBORHOODS =
  /Metairie|Kenner|Northshore|North Shore|Westbank|West Bank|Uptown|Mid-City|French Quarter|Marigny|Bywater|Gentilly|Lakeview|Garden District|Treme|Algiers|Slidell|Mandeville|Covington|Jefferson Parish|St\. Tammany/i

// eslint-disable-next-line @typescript-eslint/no-require-imports
const navigation = require('next/navigation') as { usePathname: () => string }
const originalFetch = global.fetch

afterEach(() => {
  jest.restoreAllMocks()
  global.fetch = originalFetch
})

describe('Header navigation', () => {
  it('lists the six nav items in order with their targets', () => {
    render(<Header />)
    const nav = screen.getByRole('navigation', { name: 'Primary navigation' }) as HTMLElement
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a')).filter((a) => a.getAttribute('data-cta') !== 'header')
    expect(links.map((a) => [a.textContent, a.getAttribute('href')])).toEqual(EXPECTED_NAV)
  })

  it('keeps "Book a call" on desktop and the labelled "Book" pill on mobile', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('[data-cta="header"]')).toHaveTextContent('Book a call')
    const mobile = container.querySelector('[data-cta="header-mobile"]')
    expect(mobile).toHaveTextContent('Book')
    expect(mobile).toHaveAttribute('aria-label', 'Book a 15-minute call')
  })

  it('shows the same six items in the mobile menu', async () => {
    const user = userEvent.setup()
    render(<Header />)
    await user.click(screen.getByLabelText('Toggle menu'))
    const menu = screen.getByRole('navigation', { name: 'Mobile navigation' }) as HTMLElement
    const navLinks = Array.from(menu.querySelectorAll<HTMLAnchorElement>('a')).filter((a) => a.getAttribute('href')?.startsWith('/'))
    expect(navLinks.map((a) => [a.textContent?.replace(/\d+$/, '').trim(), a.getAttribute('href')])).toEqual(EXPECTED_NAV)
    const phone = Array.from(menu.querySelectorAll<HTMLAnchorElement>('a')).find((a) => a.textContent === '(504) 326-1676')
    expect(phone).toHaveAttribute('href', 'tel:+15043261676')
  })

  it('marks the current section with aria-current', () => {
    jest.spyOn(navigation, 'usePathname').mockReturnValue('/services/business-systems')
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Systems' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Websites' })).not.toHaveAttribute('aria-current')
  })

  it('counts case studies as Work', () => {
    jest.spyOn(navigation, 'usePathname').mockReturnValue('/case-studies/some-client')
    render(<Header />)
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'page')
  })
})

describe('Footer', () => {
  it('says where Ben is based and that he works anywhere', () => {
    expect(FOOTER_BASE_LINE).toBe('Based in New Orleans. Working with businesses anywhere.')
    render(<Footer />)
    expect(screen.getByText(FOOTER_BASE_LINE)).toBeInTheDocument()
  })

  it('keeps the contact details exactly', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'ben@sproutflow-studio.com' })).toHaveAttribute(
      'href',
      'mailto:ben@sproutflow-studio.com',
    )
    expect(screen.getByRole('link', { name: '(504) 326-1676' })).toHaveAttribute('href', 'tel:+15043261676')
  })

  it('links the three offer categories and the free check', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: 'Websites' })).toHaveAttribute('href', '/services/websites')
    expect(screen.getByRole('link', { name: 'Lead & Business Systems' })).toHaveAttribute(
      'href',
      '/services/business-systems',
    )
    expect(screen.getByRole('link', { name: 'Care' })).toHaveAttribute('href', '/services/growth-support')
    expect(screen.getByRole('link', { name: 'Free website check' })).toHaveAttribute('href', '/check')
  })

  it('renders on the 404 page too', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('That page does not exist anymore.')
    expect(screen.getByText(FOOTER_BASE_LINE)).toBeInTheDocument()
  })
})

describe('No neighborhood names in the chrome', () => {
  it('header (menu open), footer and footer CTA', async () => {
    const user = userEvent.setup()
    const header = render(<Header />)
    await user.click(screen.getByLabelText('Toggle menu'))
    expect(NEIGHBORHOODS.test(header.container.textContent ?? '')).toBe(false)
    header.unmount()

    expect(NEIGHBORHOODS.test(render(<Footer />).container.textContent ?? '')).toBe(false)
    expect(NEIGHBORHOODS.test(render(<FooterCta />).container.textContent ?? '')).toBe(false)
  })
})

describe('/check ?url= prefill', () => {
  async function renderCheck(searchParams?: Record<string, string | string[]>) {
    const fetchMock = jest.fn()
    global.fetch = fetchMock as unknown as typeof fetch
    const page = await CheckPage(searchParams ? { searchParams: Promise.resolve(searchParams) } : {})
    render(page)
    return { fetchMock, field: screen.getByLabelText('Your website address') as HTMLInputElement }
  }

  it('fills the field from ?url= and does not run the check', async () => {
    const { fetchMock, field } = await renderCheck({ url: 'example.com' })
    expect(field.value).toBe('example.com')
    expect(fetchMock).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: /check my site/i })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /here is what i found/i })).not.toBeInTheDocument()
  })

  it('leaves the field empty without ?url=', async () => {
    const { field } = await renderCheck()
    expect(field.value).toBe('')
  })

  it('runs only when the visitor presses the button', async () => {
    const user = userEvent.setup()
    const { fetchMock } = await renderCheck({ url: 'example.com' })
    fetchMock.mockResolvedValue({ ok: false, status: 500, json: async () => ({ error: 'server' }) })
    await user.click(screen.getByRole('button', { name: /check my site/i }))
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(JSON.parse((fetchMock.mock.calls[0] as [string, RequestInit])[1].body as string)).toEqual({
      url: 'example.com',
    })
  })

  it('cleans the query value', () => {
    expect(prefillFromQuery('  example.com  ')).toBe('example.com')
    expect(prefillFromQuery(['first.com', 'second.com'])).toBe('first.com')
    expect(prefillFromQuery('exa\nmple.com\u0000')).toBe('example.com')
    expect(prefillFromQuery(undefined)).toBe('')
    expect(prefillFromQuery('a'.repeat(MAX_PREFILL_LENGTH + 1))).toBe('')
  })
})

describe('Check results typography', () => {
  const RESULT: WebsiteCheckResult = {
    checkedAt: '2026-10-18T15:04:05.000Z',
    inputUrl: 'example.com',
    host: 'example.com',
    finalUrl: 'https://example.com/',
    outcome: 'checked',
    offer: 'starter',
    checks: [{ id: 'loads', label: 'It loads', status: 'fail', line: 'It did not load.' }],
  }

  it('sets the offer price in mono at the price size', () => {
    const { container } = render(<CheckResults result={RESULT} onRestart={() => {}} />)
    const price = container.querySelector('.text-price')
    expect(price).not.toBeNull()
    expect(price).toHaveClass('font-mono')
    expect(price?.textContent).toContain('$')
    expect(container.querySelector('.font-display.font-bold')).toBeNull()
  })
})

describe('Display type floor in chrome files', () => {
  const FILES = [
    'components/layout/Header.tsx',
    'components/layout/Footer.tsx',
    'components/ui/FooterCta.tsx',
    'app/book/page.tsx',
    'app/inquiry/page.tsx',
    'components/inquiry/InquiryForm.tsx',
    'app/check/page.tsx',
    'components/website-check/WebsiteCheck.tsx',
    'components/website-check/CheckResults.tsx',
    'components/website-check/ReportRequest.tsx',
    'app/not-found.tsx',
  ]

  for (const file of FILES) {
    it(`${file} has no sub-24px or bold display type`, () => {
      const source = readFileSync(join(process.cwd(), file), 'utf8')
      const offending = source
        .split('\n')
        .filter((line) => line.includes('font-display'))
        .filter(
          (line) =>
            /text-(h4|xs|sm|base|lg|xl|2xl|eyebrow|mono-meta)\b/.test(line) || /font-(bold|semibold|medium)\b/.test(line),
        )
      expect(offending).toEqual([])
      expect(/text-h4\b/.test(source)).toBe(false)
    })
  }
})
