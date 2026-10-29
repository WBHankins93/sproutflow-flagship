import type { Metadata } from 'next';
import { FileSearch, MessageSquareText, ReceiptText } from 'lucide-react';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { Footer } from '@/components/layout/Footer';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_LABEL, isBookingConfigured } from '@/lib/constants';
import { Eyebrow, Heading, MarginNote, Section } from '@/components/v3';

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Tell me what needs to work better. Name and email are the only required fields. Reply within one business day.',
  alternates: { canonical: '/inquiry' },
};

const pathMap: Record<string, string> = {
  websites: 'Websites that earn trust',
  'business-systems': 'Lead capture and follow-up',
  'growth-support': 'Ongoing growth and support',
};
const tierMap: Record<string, string> = {
  'website-rescue': 'Websites that earn trust',
  'lead-flow-audit': 'Lead capture and follow-up',
  'lead-capture-system': 'Lead capture and follow-up',
  'system-care': 'Ongoing growth and support',
};
const steps = [
  { icon: FileSearch, title: 'I read the details', body: 'Every inquiry comes to me directly.' },
  { icon: MessageSquareText, title: 'We talk if useful', body: 'A short call helps clarify the right starting point.' },
  {
    icon: ReceiptText,
    title: 'You get a fixed quote',
    body: 'Scope, timing, and cost are written down before work starts.',
  },
];

type Props = { searchParams: Promise<{ path?: string; tier?: string }> };

export default async function InquiryPage({ searchParams }: Props) {
  const { path, tier } = await searchParams;
  const initialProjectType = (path && pathMap[path]) || (tier && tierMap[tier]) || '';
  return (
    <>
      <Section tone="birch" labelledBy="inquiry-h">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4">
            <Eyebrow>Start with what you know</Eyebrow>
            <Heading as="h1" size="lg" id="inquiry-h" italic="better" className="mt-5">
              Tell me what needs to work better.
            </Heading>
            <p className="mt-5 max-w-[60ch] text-body-lg text-[#4A574D]">
              You can stop after the first checkpoint. A polished brief is not required.
            </p>
            <ol className="mt-10 border-t border-primary-900/20">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-primary-900/20 py-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-900/20 text-primary-900">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary-900">
                      <span
                        className="mr-2 font-mono text-label tabular-nums text-redline [font-variant-ligatures:none]"
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-[#4A574D]">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <MarginNote arrow="none" className="mt-6">
              I read every one myself
            </MarginNote>
            <p className="mt-4 text-sm text-[#4A574D]">I reply within one business day.</p>
            {isBookingConfigured() && (
              <p className="mt-4 text-sm text-[#4A574D]" data-testid="inquiry-booking-line">
                Rather talk it through?{' '}
                <BookCallLink
                  data-cta="inquiry-aside"
                  className="rounded-sm font-semibold text-primary-900 underline underline-offset-2 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-redline"
                >
                  {BOOKING_CTA_LABEL}
                </BookCallLink>
              </p>
            )}
          </aside>
          <div className="min-w-0 border-t border-primary-900/20 pt-8 lg:col-span-7 lg:col-start-6">
            <InquiryForm initialProjectType={initialProjectType} />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
