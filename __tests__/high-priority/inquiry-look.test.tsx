/**
 * HIGH PRIORITY TESTS: the chosen Starter look on /inquiry
 *
 * The Starter page (/starter, served from a separate deployment) links to
 * /inquiry?offer=starter&look=<slug>. The look is user-controlled input, so it
 * reaches the page and the submitted inquiry only when toLookName recognises
 * it, and only for the Starter offer.
 */

import { render } from '@testing-library/react'
import InquiryPage from '@/app/inquiry/page'
import { toLookName } from '@/data/catalog'

// The form is covered by inquiry-form-id and booking-cta; here only the
// `offer` it is handed (what gets submitted) matters.
jest.mock('@/components/inquiry/InquiryForm', () => ({
  InquiryForm: ({ offer }: { offer?: string }) => <div data-testid="inquiry-form" data-offer={offer ?? ''} />,
}))

async function renderInquiry(params: { offer?: string | string[]; look?: string | string[]; tier?: string }) {
  const page = await InquiryPage({ searchParams: Promise.resolve(params) })
  const { container } = render(page)
  return {
    context: container.querySelector('[data-testid="inquiry-offer"]'),
    submitted: container.querySelector('[data-testid="inquiry-form"]')?.getAttribute('data-offer'),
    html: container.innerHTML,
  }
}

describe('toLookName', () => {
  it('accepts the four slugs and rejects everything else', () => {
    expect(toLookName('workbench')).toBe('Workbench')
    expect(toLookName('front-door')).toBe('Front Door')
    expect(toLookName('practice')).toBe('Practice')
    expect(toLookName('studio')).toBe('Studio')

    expect(toLookName('<script>')).toBeUndefined()
    expect(toLookName('x')).toBeUndefined()
    expect(toLookName('')).toBeUndefined()
    expect(toLookName('Workbench')).toBeUndefined()
    expect(toLookName('__proto__')).toBeUndefined()
    expect(toLookName('constructor')).toBeUndefined()
    expect(toLookName(['workbench'])).toBeUndefined()
    expect(toLookName(['workbench', 'studio'])).toBeUndefined()
    expect(toLookName(undefined)).toBeUndefined()
  })
})

describe('Inquiry page - chosen look', () => {
  it('offer=starter&look=workbench shows the look under You asked about', async () => {
    const { context } = await renderInquiry({ offer: 'starter', look: 'workbench' })
    expect(context).toHaveAttribute('data-offer', 'starter')
    expect(context).toHaveTextContent('You asked about')
    expect(context).toHaveTextContent('Starter landing page, Workbench look, $500.')
  })

  it('shows the display name for a multi-word look', async () => {
    const { context } = await renderInquiry({ offer: 'starter', look: 'front-door' })
    expect(context).toHaveTextContent('Starter landing page, Front Door look, $500.')
  })

  it('the look is sent with the inquiry', async () => {
    const { submitted } = await renderInquiry({ offer: 'starter', look: 'workbench' })
    expect(submitted).toBe('Starter landing page ($500), Workbench look')
  })

  it('an unknown look shows the plain Starter line', async () => {
    for (const look of ['x', '<script>alert(1)</script>', 'Workbench', ['workbench', 'studio']]) {
      const { context, submitted, html } = await renderInquiry({ offer: 'starter', look })
      expect(context).toHaveTextContent('Starter landing page, $500.')
      expect(context?.textContent).not.toContain('look')
      expect(submitted).toBe('Starter landing page ($500)')
      expect(html).not.toContain('<script>alert')
    }
  })

  it('offer=starter without a look is unchanged', async () => {
    const { context, submitted } = await renderInquiry({ offer: 'starter' })
    expect(context).toHaveTextContent('Starter landing page, $500.')
    expect(submitted).toBe('Starter landing page ($500)')
  })

  it('works through the old tier=website-rescue link too', async () => {
    const { context, submitted } = await renderInquiry({ tier: 'website-rescue', look: 'studio' })
    expect(context).toHaveAttribute('data-offer', 'starter')
    expect(submitted).toBe('Starter landing page ($500), Studio look')
  })

  it('offer=audit&look=workbench ignores the look', async () => {
    const { context, submitted } = await renderInquiry({ offer: 'audit', look: 'workbench' })
    expect(context).toHaveTextContent('Lead Flow Audit, $500.')
    expect(context?.textContent).not.toContain('Workbench')
    expect(submitted).toBe('Lead Flow Audit ($500)')
  })

  it('a look without any offer shows nothing and sends nothing', async () => {
    const { context, submitted } = await renderInquiry({ look: 'workbench' })
    expect(context).toBeNull()
    expect(submitted).toBe('')
  })
})
