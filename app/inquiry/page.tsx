import type { Metadata } from 'next';
import { FileSearch, MessageSquareText, ReceiptText } from 'lucide-react';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { Footer } from '@/components/layout/Footer';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { customQuote, formatShortPrice, getOffer, toOfferKey, type OfferKey } from '@/data/catalog';
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
/** Project type prefilled for each offer. A custom quote leaves the choice to the visitor. */
const offerProjectType: Record<OfferKey, string> = {
  starter: 'Websites that earn trust',
  audit: 'Lead capture and follow-up',
  care: 'Ongoing growth and support',
  custom: '',
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

/** What the visitor asked about, from data/catalog.ts: the name and price, or the custom quote. */
function offerContext(key: OfferKey): { line: string; submitted: string } {
  if (key === 'custom') {
    return {
      line: `${customQuote.heading} Describe it below in your own words, and I’ll come back with options.`,
      submitted: customQuote.name,
    };
  }
  const offer = getOffer(key)!;
  const price = formatShortPrice(offer);
  return { line: `${offer.name}, ${price}. ${offer.priceNote ?? offer.line}`, submitted: `${offer.name} (${price})` };
}

type Props = { searchParams: Promise<{ path?: string; offer?: string | string[]; tier?: string | string[] }> };

/**
 * `offer=starter|audit|care|custom` names the offer. Old `tier=` links still
 * work: website-rescue is the starter page, lead-capture-system and anything
 * unknown are a custom quote (data/catalog.ts LEGACY_OFFER_KEYS).
 */
export default async function InquiryPage({ searchParams }: Props) {
  const { path, offer, tier } = await searchParams;
  const offerKey = toOfferKey(offer) ?? toOfferKey(tier);
  const context = offerKey ? offerContext(offerKey) : null;
  const initialProjectType = (path && pathMap[path]) || (offerKey && offerProjectType[offerKey]) || '';
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
            {context && (
              <p
                className="mb-8 border-l-4 border-forest-fern pl-4 font-body text-body text-primary-900"
                data-testid="inquiry-offer"
                data-offer={offerKey}
              >
                <span className="block font-mono text-label uppercase text-[#4A574D] [font-variant-ligatures:none]">
                  You asked about
                </span>
                <span className="mt-1 block">{context.line}</span>
              </p>
            )}
            <InquiryForm initialProjectType={initialProjectType} offer={context?.submitted} />
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
}
