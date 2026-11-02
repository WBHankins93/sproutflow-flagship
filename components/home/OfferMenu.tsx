import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import {
  customQuote,
  fixedOffers,
  formatAmount,
  getIncludedItems,
  type CatalogOffer,
  type CatalogPrice,
  type OfferKey,
} from '@/data/catalog';
import { homeOffers } from '@/data/home';
import { INQUIRY_PATH, getBookingHref } from '@/lib/constants';
import { NUMERAL_CLASS } from './styles';

// Pine section (Sunlit forest, 29 Oct): cream text, prices in Fira Code Sun
// gold, cards on a lighter pine (#315037: cream 7.8:1, Sun gold 6.3:1, soft
// 5.7:1). Red pen never appears here; links underline in Goldenrod and focus
// rings are Gold light.
const CARD_CLASS = 'rounded-xl bg-ink-800 text-cream-300';
const SOFT = 'text-[#C9CFC4]';
const FOCUS =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-accent-300';
const LINK_CLASS = `inline-flex min-h-[44px] items-center gap-2 font-body text-body font-semibold text-cream-300 underline decoration-accent-500 decoration-2 underline-offset-[6px] transition-colors hover:decoration-cream-300 ${FOCUS}`;
const PRICE_CLASS = `font-mono text-price text-forest-sungold ${NUMERAL_CLASS}`;

/**
 * Booking href for an offer CTA: /book when Cal.com is configured, else
 * /inquiry with the offer prefilled. /book never carries a query.
 */
export function offerBookingHref(key: OfferKey): string {
  const base = getBookingHref();
  return base === INQUIRY_PATH ? `${base}?offer=${key}` : base;
}

/** A catalog price: the amount in Sun gold mono, any "/mo" in body type. */
function Amount({ price }: { price: CatalogPrice }) {
  const amount = formatAmount(price);
  const [figure, unit] = price.per === 'month' ? [amount.replace(/\/mo$/, ''), '/mo'] : [amount, ''];
  return (
    <span className="whitespace-nowrap">
      <span className={PRICE_CLASS}>{figure}</span>
      {unit && <span className={`font-body text-body-sm ${SOFT}`}>{unit}</span>}
    </span>
  );
}

function OfferPrice({ offer }: { offer: CatalogOffer }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      {offer.prices.map((price, index) => (
        <span key={`${price.amount}-${price.appliesTo ?? ''}`} className="whitespace-nowrap">
          {index > 0 && <span className={`font-body text-body-sm ${SOFT}`}>or </span>}
          <Amount price={price} />
        </span>
      ))}
    </p>
  );
}

/**
 * Phones: name and price, one line, then the CTA with a "What's included"
 * toggle beside it. From 768px the list is always shown and the toggle is gone.
 */
function OfferCard({ offer }: { offer: CatalogOffer }) {
  const included = getIncludedItems(offer);
  const list = (
    <ul className={`space-y-1 font-body text-body-sm ${SOFT}`}>
      {included.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="text-forest-sungold">
            +
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <article
      id={offer.id}
      aria-labelledby={`${offer.id}-h`}
      className={`${CARD_CLASS} flex min-w-0 scroll-mt-24 flex-col p-4 md:p-5 lg:p-6`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 md:block">
        <Heading as="h3" size="sm" id={`${offer.id}-h`}>
          {offer.name}
        </Heading>
        <div className="md:mt-2">
          <OfferPrice offer={offer} />
        </div>
      </div>
      <p className="mt-1 font-body text-body-sm text-cream-300 md:mt-2">{offer.line}</p>
      <div className="mt-3 hidden md:block">{list}</div>
      <div className="mt-auto grid pt-1 md:pt-3">
        <Link
          href={offerBookingHref(offer.key)}
          data-cta={`offer-${offer.id}`}
          className={`${LINK_CLASS} relative z-10 col-start-1 row-start-1 justify-self-start`}
        >
          {homeOffers.cta}
          <span className="sr-only"> about {offer.name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <details className="group col-start-1 row-start-1 md:hidden">
          <summary
            className={`ml-auto flex min-h-[44px] w-max cursor-pointer list-none items-center gap-1 font-body text-body-sm font-semibold text-cream-300 ${FOCUS} [&::-webkit-details-marker]:hidden`}
          >
            {homeOffers.included}
            <span aria-hidden="true" className="text-forest-sungold transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="pb-2">{list}</div>
        </details>
      </div>
    </article>
  );
}

/** The range line with each dollar figure set in Sun gold mono. The text stays verbatim. */
function RangeLine({ text }: { text: string }) {
  const parts = text.split(/(\$[\d,]+)/);
  return (
    <p className="font-body text-body text-cream-300 md:text-body-lg" data-range-line>
      {parts.map((part, index) =>
        /^\$[\d,]+$/.test(part) ? (
          <span key={index} className={`font-mono font-medium text-forest-sungold ${NUMERAL_CLASS}`}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
}

/** "Bring me the problem.": everything without a fixed price, one range line, three steps, a call. */
function CustomQuoteBlock() {
  const quote = customQuote;
  return (
    <article
      id={quote.id}
      aria-labelledby={`${quote.id}-h`}
      className="scroll-mt-24 rounded-xl border border-cream-300/25 p-5 md:p-7 lg:grid lg:grid-cols-12 lg:gap-x-10"
    >
      <div className="min-w-0 lg:col-span-5">
        <p className={`font-mono text-label uppercase ${SOFT} [font-variant-ligatures:none]`}>{quote.name}</p>
        <Heading as="h3" size="md" id={`${quote.id}-h`} className="mt-2">
          {quote.heading}
        </Heading>
        <p className="mt-2 font-body text-body text-cream-300 md:mt-3">{quote.intro}</p>
        <div className="mt-3">
          <p className="sr-only">{homeOffers.examplesLabel}</p>
          <ul className={`flex flex-wrap gap-x-3 gap-y-0.5 font-body text-body-sm ${SOFT}`}>
            {quote.examples.map((example, index) => (
              <li key={example} className="whitespace-nowrap">
                {example}
                {index < quote.examples.length - 1 && (
                  <span aria-hidden="true" className="ml-3 text-forest-sungold">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 min-w-0 lg:col-span-7 lg:mt-0">
        <RangeLine text={quote.range} />
        <p className={`mt-4 font-mono text-label uppercase ${SOFT} [font-variant-ligatures:none]`} id={`${quote.id}-steps`}>
          {homeOffers.howItWorks}
        </p>
        <ol aria-labelledby={`${quote.id}-steps`} className="mt-2 grid gap-2 sm:grid-cols-3 sm:gap-5">
          {quote.steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[2rem_minmax(0,1fr)] sm:block">
              <span aria-hidden="true" className={`font-mono text-label text-forest-sungold ${NUMERAL_CLASS}`}>
                0{index + 1}
              </span>
              <p className="font-body text-body-sm">
                <span className="font-semibold text-cream-300">{step.title}.</span>{' '}
                <span className={SOFT}>{step.body}</span>
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
          <ButtonLink href={offerBookingHref('custom')} variant="onDark" data-cta="offer-custom-quote">
            {quote.primaryCta}
          </ButtonLink>
          <Link href={quote.secondaryCta.href} data-cta="offer-custom-describe" className={LINK_CLASS}>
            {quote.secondaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * 5. Offer menu on Pine: three fixed-price cards (Starter landing page, Lead
 * Flow Audit, Site Care), then the custom quote. Every price comes from
 * data/catalog.ts.
 */
export default function OfferMenu() {
  return (
    <Section tone="pine" rhythm="none" id="offers" labelledBy="home-offers-h" className="py-8 md:py-12 lg:py-10">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <Eyebrow index="02" onDark>
            {homeOffers.eyebrow}
          </Eyebrow>
          <Heading as="h2" id="home-offers-h" className="mt-4">
            {homeOffers.heading}
          </Heading>
        </div>
        <p className={`hidden max-w-[52ch] font-body text-body md:block lg:col-span-5 ${SOFT}`}>{homeOffers.sub}</p>
      </div>

      <section aria-label={homeOffers.fixedLabel} className="mt-6 grid gap-3 md:mt-8 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
        {fixedOffers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </section>

      <div className="mt-6 md:mt-8">
        <CustomQuoteBlock />
      </div>
    </Section>
  );
}
