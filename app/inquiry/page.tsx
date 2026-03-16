// app/inquiry/page.tsx - Project intake and contact page

import { Container, Section, Heading, BodyText } from '@/components/layout/StudioLayout';
import { Footer } from '@/components/layout/Footer';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { getImageUrl } from '@/lib/blob-images';

export const metadata = {
  title: 'Start Your Project | Inquiry & Contact | Sproutflow Studio',
  description:
    'Tell us about your project. Submit your inquiry in about 3–5 minutes. We’ll review and get back to you within 24 hours.',
  alternates: {
    canonical: '/inquiry',
  },
};

export default function InquiryPage() {
  return (
    <>
      <header className="relative border-b border-nature-200 bg-gradient-to-br from-white via-primary-50/40 to-primary-100/20">
        <div className="absolute inset-0 -z-10">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${getImageUrl('project-tree.jpg')})`,
            }}
          />
          <div className="absolute inset-0 bg-white/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_55%)] opacity-40" />
        </div>

        <div className="mx-auto flex max-w-container flex-col gap-8 px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-2xl text-center md:text-left">
            <Heading level={1} className="mb-4 text-primary-800">
              Start Your Project
            </Heading>
            <BodyText size="lg" color="secondary" className="mb-4">
              Tell us a little about your project. Most inquiries take about 3–5 minutes to complete.
            </BodyText>
            <BodyText size="base" color="muted">
              Not ready for a call yet? No problem. Share a few details here and we’ll follow up with the best next steps.
            </BodyText>
          </div>
        </div>
      </header>

      <Section padding="lg" background="white" className="pb-8 md:pb-12">
        <Container size="narrow" className="px-4 sm:px-6 md:px-8">
          <InquiryForm />
        </Container>
      </Section>

      <Footer />
    </>
  );
}
