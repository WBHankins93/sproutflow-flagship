import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import {
  customQuote,
  formatAmount,
  getIncludedItems,
  type CatalogOffer,
  type CatalogPrice,
} from '@/data/catalog';
import { NUMERAL_CLASS, ON_PINE_SOFT, bookingHref } from './styles';

// Pine section, like the homepage offer menu: Birch text, prices in Fira Code
// Sun gold (9.12:1), cards on a lighter pine (#315037). Red pen never appears
// here; links underline in Goldenrod and focus rings are Gold light.
const FOCUS =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-accent-300';
const LINK_CLASS = `inline-flex min-h-[44px] items-center gap-2 font-body text-body font-semibold text-cream-300 underline decoration-accent-500 decoration-2 underline-offset-[6px] transition-colors hover:decoration-cream-300 ${FOCUS}`;
const PRICE_CLASS = `font-mono text-price text-forest-sungold ${NUMERAL_CLASS}`;
const LABEL = `font-mono text-label uppercase ${ON_PINE_SOFT} [font-variant-ligatures:none]`;

/** A catalog price: the amount in Sun gold mono, any "/mo" in body type. */
function Amount({ price }: { price: CatalogPrice }) {
  const amount = formatAmount(price);
  const [figure, unit] = price.per === 'month' ? [amount.replace(/\/mo$/, ''), '/mo'] : [amount, ''];
  return (
    <span className="whitespace-nowrap" data-price={amount}>
      <span className={PRICE_CLASS}>{figure}</span>
      {unit && <span className={`font-body text-body-sm ${ON_PINE_SOFT}`}>{unit}</span>}
    </span>
  );
}

function OfferCard({ offer, ctaPrefix }: { offer: CatalogOffer; ctaPrefix: string }) {
  return (
    <article
      aria-labelledby={`${ctaPrefix}-${offer.id}-h`}
      className="flex min-w-0 flex-col rounded-xl bg-ink-800 p-5 text-cream-300 lg:p-6"
      data-offer={offer.key}
    >
      <Heading as="h3" size="sm" id={`${ctaPrefix}-${offer.id}-h`}>
        {offer.name}
      </Heading>
      <p className="mt-2 flex flex-wrap items-baseline gap-x-2">
        {offer.prices.map((price, index) => (
          <span key={`${price.amount}-${price.appliesTo ?? ''}`} className="whitespace-nowrap">
            {index > 0 && <span className={`font-body text-body-sm ${ON_PINE_SOFT}`}>or </span>}
            <Amount price={price} />
          </span>
        ))}
      </p>
      <p className="mt-2 font-body text-body text-cream-300">{offer.line}</p>
      <ul className={`mt-4 space-y-1 font-body text-body-sm ${ON_PINE_SOFT}`}>
        {getIncludedItems(offer).map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="text-forest-sungold">
              +
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-4">
        <Link href={bookingHref(`offer=${offer.key}`)} data-cta={`${ctaPrefix}-offer-${offer.key}`} className={LINK_CLASS}>
          Book a call
          <span className="sr-only"> about the {offer.name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/** The range line with each dollar figure in Sun gold mono. The text is read from the catalog, verbatim. */
function RangeLine({ text }: { text: string }) {
  return (
    <p className="font-body text-body text-cream-300 md:text-body-lg" data-range-line>
      {text.split(/(\$[\d,]+)/).map((part, index) =>
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

/** "Bring me the problem.": everything without a fixed price, from data/catalog.ts customQuote. */
function CustomQuoteBlock({ ctaPrefix }: { ctaPrefix: string }) {
  const quote = customQuote;
  const headingId = `${ctaPrefix}-${quote.id}-h`;
  return (
    <article
      aria-labelledby={headingId}
      className="rounded-xl border border-cream-300/25 p-5 md:p-7 lg:grid lg:grid-cols-12 lg:gap-x-10"
      data-offer="custom"
    >
      <div className="min-w-0 lg:col-span-5">
        <p className={LABEL}>{quote.name}</p>
        <Heading as="h3" size="md" id={headingId} className="mt-2">
          {quote.heading}
        </Heading>
        <p className="mt-3 font-body text-body text-cream-300">{quote.intro}</p>
        <p className="sr-only">For example:</p>
        <ul className={`mt-3 flex flex-wrap gap-x-3 gap-y-0.5 font-body text-body-sm ${ON_PINE_SOFT}`}>
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
      <div className="mt-5 min-w-0 lg:col-span-7 lg:mt-0">
        <RangeLine text={quote.range} />
        <ol className="mt-4 grid gap-2 sm:grid-cols-3 sm:gap-5" aria-label="How a custom quote works">
          {quote.steps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[2rem_minmax(0,1fr)] sm:block">
              <span aria-hidden="true" className={`font-mono text-label text-forest-sungold ${NUMERAL_CLASS}`}>
                0{index + 1}
              </span>
              <p className="font-body text-body-sm">
                <span className="font-semibold text-cream-300">{step.title}.</span>{' '}
                <span className={ON_PINE_SOFT}>{step.body}</span>
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
          <ButtonLink href={bookingHref('offer=custom')} variant="onDark" data-cta={`${ctaPrefix}-offer-custom`}>
            {quote.primaryCta}
          </ButtonLink>
          <Link href={quote.secondaryCta.href} data-cta={`${ctaPrefix}-offer-custom-describe`} className={LINK_CLASS}>
            {quote.secondaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export interface OfferBlockProps {
  /** Section and heading ids are built from this. */
  id: string;
  eyebrow: string;
  index?: string;
  heading: string;
  sub?: string;
  /** Fixed offers from data/catalog.ts, in menu order. */
  offers: CatalogOffer[];
  /** Add the "Bring me the problem." custom quote after the fixed offers. */
  showCustomQuote?: boolean;
  /** Prefix for data-cta values and ids, so two blocks never collide. */
  ctaPrefix: string;
}

/**
 * Pine offer block for the inner pages: the given fixed-price offers, then
 * (optionally) the custom quote. Every price and the range line come from
 * data/catalog.ts.
 */
export default function OfferBlock({ id, eyebrow, index, heading, sub, offers, showCustomQuote = false, ctaPrefix }: OfferBlockProps) {
  const cols = offers.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2';
  return (
    <Section tone="pine" id={id} labelledBy={`${id}-h`}>
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          <Eyebrow index={index} onDark>
            {eyebrow}
          </Eyebrow>
          <Heading as="h2" id={`${id}-h`} className="mt-4">
            {heading}
          </Heading>
        </div>
        {sub && <p className={`max-w-[52ch] font-body text-body lg:col-span-5 ${ON_PINE_SOFT}`}>{sub}</p>}
      </div>
      {offers.length > 0 && (
        <div className={`mt-8 grid gap-4 md:gap-5 lg:gap-6 ${cols}`}>
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} ctaPrefix={ctaPrefix} />
          ))}
        </div>
      )}
      {showCustomQuote && (
        <div className="mt-6 md:mt-8">
          <CustomQuoteBlock ctaPrefix={ctaPrefix} />
        </div>
      )}
    </Section>
  );
}
