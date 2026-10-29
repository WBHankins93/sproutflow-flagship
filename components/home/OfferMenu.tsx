import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, Heading, Section } from '@/components/v3';
import {
  formatAmount,
  getCategory,
  getIncludedItems,
  getOffersByCategory,
  type CatalogCategoryId,
  type CatalogOffer,
  type CatalogPrice,
} from '@/data/catalog';
import { homeOffers } from '@/data/home';
import { homeBookingHref } from './booking';
import { NUMERAL_CLASS, TEXT_LINK_CLASS } from './styles';

const NUMERAL = NUMERAL_CLASS;

/** A catalog price: the amount in mono, any "from" and "/mo" in body type. */
function Amount({ price }: { price: CatalogPrice }) {
  const amount = formatAmount(price);
  const [figure, unit] = price.per === 'month' ? [amount.replace(/\/mo$/, ''), '/mo'] : [amount, ''];
  return (
    <span className="whitespace-nowrap">
      {price.basis === 'from' && <span className="font-body text-body-sm text-[#4A574D]">from </span>}
      <span className={`font-mono text-price ${NUMERAL}`}>{figure}</span>
      {unit && <span className="font-body text-body-sm text-[#4A574D]">{unit}</span>}
    </span>
  );
}

function OfferPrice({ offer }: { offer: CatalogOffer }) {
  if (offer.prices.length === 0) {
    return <p className="font-body text-body font-semibold text-primary-900">{offer.priceLabel}</p>;
  }
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 text-primary-900">
      {offer.prices.map((price, index) => (
        <span key={`${price.amount}-${price.appliesTo ?? ''}`} className="whitespace-nowrap">
          {index > 0 && <span className="font-body text-body-sm text-[#4A574D]">or </span>}
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
function OfferItem({ offer }: { offer: CatalogOffer }) {
  const category = getCategory(offer.category);
  const included = getIncludedItems(offer);
  const list = (
    <ul className="space-y-1 font-body text-body-sm text-[#4A574D]">
      {included.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true" className="text-ink-700">
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
      data-pending={offer.pending || undefined}
      className="flex min-w-0 scroll-mt-24 flex-col border-t-2 border-primary-900 pt-3"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 md:block">
        <Heading as="h4" size="sm" id={`${offer.id}-h`}>
          {offer.name}
        </Heading>
        <div className="md:mt-2">
          <OfferPrice offer={offer} />
        </div>
      </div>
      <p className="mt-1 font-body text-body-sm text-primary-900 md:mt-2">{offer.line}</p>
      <div className="mt-2 hidden md:block">{list}</div>
      <div className="mt-auto grid pt-1 md:pt-2">
        <Link
          href={homeBookingHref(category.servicePath)}
          data-cta={`offer-${offer.id}`}
          className={`${TEXT_LINK_CLASS} relative z-10 col-start-1 row-start-1 justify-self-start`}
        >
          {homeOffers.cta}
          <span className="sr-only"> about {offer.name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <details className="group col-start-1 row-start-1 md:hidden">
          <summary className="ml-auto flex min-h-[44px] w-max cursor-pointer list-none items-center gap-1 font-body text-body-sm font-semibold text-primary-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline [&::-webkit-details-marker]:hidden">
            {homeOffers.included}
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="pb-2">{list}</div>
        </details>
      </div>
    </article>
  );
}

function CategoryGroup({ id, className = '', listClassName }: { id: CatalogCategoryId; className?: string; listClassName: string }) {
  const category = getCategory(id);
  const offers = getOffersByCategory(id);
  return (
    <section aria-labelledby={`menu-${id}-h`} className={`min-w-0 ${className}`}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <Heading as="h3" size="md" id={`menu-${id}-h`}>
          {category.name}
        </Heading>
        <p className="hidden font-body text-body-sm text-[#4A574D] md:block">{category.blurb}</p>
      </div>
      <div className={`mt-3 grid gap-x-8 gap-y-4 md:mt-4 md:gap-y-8 ${listClassName}`}>
        {offers.map((offer) => (
          <OfferItem key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

/**
 * 5. Offer menu: Websites, Lead & Business Systems and Care, every price from
 * data/catalog.ts. Desktop: websites in four columns, then systems (three)
 * and care (two) side by side in one row from 1280px.
 */
export default function OfferMenu() {
  return (
    <Section tone="birch" rhythm="none" id="offers" labelledBy="home-offers-h" className="py-8 md:py-12">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <Eyebrow index="02">{homeOffers.eyebrow}</Eyebrow>
          <Heading as="h2" id="home-offers-h" className="mt-4">
            {homeOffers.heading}
          </Heading>
        </div>
        <p className="hidden max-w-[52ch] font-body text-body text-[#4A574D] md:block lg:col-span-4">{homeOffers.sub}</p>
      </div>

      <CategoryGroup id="websites" className="mt-6 md:mt-8" listClassName="sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6" />

      {/* From 1280px, systems and care share one five-column row. */}
      <div className="mt-6 grid gap-6 md:mt-10 md:gap-10 xl:grid-cols-5 xl:gap-x-6">
        <CategoryGroup id="systems" className="xl:col-span-3" listClassName="sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6" />
        <CategoryGroup id="care" className="xl:col-span-2" listClassName="sm:grid-cols-2 xl:gap-x-6" />
      </div>
    </Section>
  );
}
