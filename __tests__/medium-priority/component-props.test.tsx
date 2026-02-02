/**
 * MEDIUM PRIORITY TESTS: Component Props Validation
 * 
 * Tests to ensure components handle props correctly and
 * validate prop types and default values.
 */

import { render, fireEvent } from '@testing-library/react'
import { Container, Section, Heading, BodyText, Button, Grid, Card } from '@/components/layout/StudioLayout'

describe('Component Props - StudioLayout Components', () => {
  describe('Container', () => {
    it('should render with default size', () => {
      const { container } = render(
        <Container>
          <div>Test content</div>
        </Container>
      )
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render with wide size', () => {
      const { container } = render(
        <Container size="wide">
          <div>Test content</div>
        </Container>
      )
      expect(container.firstChild).toHaveClass('max-w-container-wide')
    })

    it('should render with narrow size', () => {
      const { container } = render(
        <Container size="narrow">
          <div>Test content</div>
        </Container>
      )
      expect(container.firstChild).toHaveClass('max-w-container-narrow')
    })

    it('should apply custom className', () => {
      const { container } = render(
        <Container className="custom-class">
          <div>Test content</div>
        </Container>
      )
      expect(container.firstChild).toHaveClass('custom-class')
    })
  })

  describe('Section', () => {
    it('should render with default padding', () => {
      const { container } = render(
        <Section>
          <div>Test content</div>
        </Section>
      )
      expect(container.firstChild).toHaveClass('section-padding')
    })

    it('should render with small padding', () => {
      const { container } = render(
        <Section padding="sm">
          <div>Test content</div>
        </Section>
      )
      expect(container.firstChild).toHaveClass('section-padding-sm')
    })

    it('should render with id attribute', () => {
      const { container } = render(
        <Section id="test-section">
          <div>Test content</div>
        </Section>
      )
      expect(container.firstChild).toHaveAttribute('id', 'test-section')
    })
  })

  describe('Heading', () => {
    it('should render h1 with level 1', () => {
      const { container } = render(
        <Heading level={1}>Test Heading</Heading>
      )
      const heading = container.querySelector('h1')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Heading')
    })

    it('should render h2 with level 2', () => {
      const { container } = render(
        <Heading level={2}>Test Heading</Heading>
      )
      const heading = container.querySelector('h2')
      expect(heading).toBeInTheDocument()
    })

    it('should render h3 with level 3', () => {
      const { container } = render(
        <Heading level={3}>Test Heading</Heading>
      )
      const heading = container.querySelector('h3')
      expect(heading).toBeInTheDocument()
    })

    it('should allow custom element with as prop', () => {
      const { container } = render(
        <Heading level={2} as="h4">Test Heading</Heading>
      )
      const heading = container.querySelector('h4')
      expect(heading).toBeInTheDocument()
    })
  })

  describe('BodyText', () => {
    it('should render with default size', () => {
      const { container } = render(
        <BodyText>Test text</BodyText>
      )
      expect(container.firstChild).toHaveClass('text-body')
    })

    it('should render with small size', () => {
      const { container } = render(
        <BodyText size="sm">Test text</BodyText>
      )
      expect(container.firstChild).toHaveClass('text-body-sm')
    })

    it('should render with large size', () => {
      const { container } = render(
        <BodyText size="lg">Test text</BodyText>
      )
      expect(container.firstChild).toHaveClass('text-body-lg')
    })

    it('should render with muted color', () => {
      const { container } = render(
        <BodyText color="muted">Test text</BodyText>
      )
      expect(container.firstChild).toHaveClass('text-text-muted')
    })
  })

  describe('Button', () => {
    it('should render as button element', () => {
      const { container } = render(
        <Button>Click me</Button>
      )
      const button = container.querySelector('button')
      expect(button).toBeInTheDocument()
    })

    it('should render as anchor when href provided', () => {
      const { container } = render(
        <Button href="/test">Click me</Button>
      )
      const link = container.querySelector('a')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })

    it('should handle onClick when provided', () => {
      const handleClick = jest.fn()
      const { container } = render(
        <Button onClick={handleClick}>Click me</Button>
      )
      const button = container.querySelector('button')
      fireEvent.click(button!)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Grid', () => {
    it('should render with default 2 columns', () => {
      const { container } = render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>
      )
      expect(container.firstChild).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
    })

    it('should render with 3 columns', () => {
      const { container } = render(
        <Grid cols={3}>
          <div>Item 1</div>
        </Grid>
      )
      expect(container.firstChild).toHaveClass('lg:grid-cols-3')
    })
  })

  describe('Card', () => {
    it('should render with default padding', () => {
      const { container } = render(
        <Card>
          <div>Card content</div>
        </Card>
      )
      expect(container.firstChild).toHaveClass('p-8')
    })

    it('should render with small padding', () => {
      const { container } = render(
        <Card padding="sm">
          <div>Card content</div>
        </Card>
      )
      expect(container.firstChild).toHaveClass('p-4')
    })
  })
})
