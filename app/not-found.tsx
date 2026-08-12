import Link from 'next/link'
import { Container, Heading, BodyText, Button } from '../components/layout/StudioLayout'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <Container size="narrow">
        <div className="text-center">
          <div className="mb-8">
            <div className="text-8xl font-display font-bold text-primary-200 mb-4">
              404
            </div>
            <Heading level={2} className="mb-4">
              Page not found
            </Heading>
            <BodyText size="lg" color="secondary" className="mb-8 max-w-md mx-auto">
              That page doesn&apos;t exist anymore.
            </BodyText>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              href="/"
              icon={<Home className="w-4 h-4" />}
            >
              Return Home
            </Button>

            <Button
              variant="secondary"
              href="#"
              onClick={() => window.history.back()}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Go Back
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-primary-200">
            <BodyText size="sm" color="muted" className="mb-4">
              Looking for something specific?
            </BodyText>
            <Link
              href="/inquiry"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              Tell me what you were looking for
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
