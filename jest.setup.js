// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // Filter out Next.js Image-specific props that React doesn't recognize
    const { priority, fill, ...imgProps } = props
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imgProps} />
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, transition, viewport, whileInView, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, initial, animate, transition, viewport, whileInView, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, initial, animate, transition, viewport, whileInView, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, initial, animate, transition, viewport, whileInView, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, initial, animate, transition, viewport, whileInView, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, initial, animate, transition, viewport, whileInView, ...props }) => <span {...props}>{children}</span>,
    section: ({ children, initial, animate, transition, viewport, whileInView, ...props }) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Suppress React warnings about non-boolean attributes in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Received `true` for a non-boolean attribute') ||
       args[0].includes('React does not recognize the') ||
       args[0].includes('If you want to write it to the DOM'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
