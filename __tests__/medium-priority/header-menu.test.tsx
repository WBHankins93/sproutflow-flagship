/**
 * MEDIUM PRIORITY TESTS: Header mobile menu
 *
 * Keyboard and touch users need to be able to dismiss the full-screen mobile
 * menu, and the phone number in it should be tappable like the one in the
 * footer.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'

function getMobileNav() {
  return document.getElementById('mobile-navigation')
}

async function openMenu() {
  const user = userEvent.setup()
  render(<Header />)
  const toggle = screen.getByLabelText('Toggle menu')
  await user.click(toggle)
  expect(toggle).toHaveAttribute('aria-expanded', 'true')
  return { user, toggle }
}

describe('Header mobile menu', () => {
  it('closes on Escape and returns focus to the toggle', async () => {
    const { user, toggle } = await openMenu()
    const nav = getMobileNav() as HTMLElement
    const firstLink = nav.querySelector('a') as HTMLAnchorElement
    firstLink.focus()
    expect(document.activeElement).toBe(firstLink)

    await user.keyboard('{Escape}')

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(getMobileNav()).toBeNull()
    expect(document.activeElement).toBe(toggle)
  })

  it('ignores Escape while the menu is closed', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const toggle = screen.getByLabelText('Toggle menu')
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.activeElement).toBe(document.body)
  })

  it('shows the phone number as a tel link', async () => {
    await openMenu()
    const nav = getMobileNav() as HTMLElement
    const phone = Array.from(nav.querySelectorAll('a')).find((a) => a.textContent?.trim() === '(504) 326-1676')
    expect(phone).toBeDefined()
    expect(phone).toHaveAttribute('href', 'tel:+15043261676')
  })

  it('closes when a menu link is clicked', async () => {
    const { user, toggle } = await openMenu()
    const nav = getMobileNav() as HTMLElement
    const workLink = Array.from(nav.querySelectorAll('a')).find((a) => a.getAttribute('href') === '/work')
    expect(workLink).toBeDefined()

    // jsdom cannot navigate; stop the browser default so only the menu's own
    // click handler is under test.
    const blockNavigation = (event: Event) => event.preventDefault()
    document.addEventListener('click', blockNavigation, true)
    try {
      await user.click(workLink as HTMLAnchorElement)
    } finally {
      document.removeEventListener('click', blockNavigation, true)
    }

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(getMobileNav()).toBeNull()
  })
})
