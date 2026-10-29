import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, Heading, Section } from '@/components/v3';
import {
  formatAmount,
  getCategory,
  getOffersByCategory,
  type CatalogCategoryId,
  type CatalogOffer,
} from '@/data/catalog';
import { homeOffers } from '@/data/home';
import { homeBookingHref } from './booking';
import { NUMERAL_CLASS, TEXT_LINK_CLASS } from './styles';

const NUMERAL = NUMERAL_CLASS;

function OfferPrice({ offer }: { offer: CatalogOffer }) {
  if (offer.prices.length === 0) {
    return <p className="font-body text-body-lg font-semibold text-primary-900">{offer.priceLabel}</p>;
  }
  if (offer.prices.length === 1) {
    const [price] = offer.prices;
    return (
      <p className="flex items-baseline gap-2 text-primary-900">
        {price.basis === 'from' && <span className="font-body text-body-sm text-[#4A574D]">from</span>}
        <span className={`font-mono text-price ${NUMERAL}`}>{formatAmount(price)}</span>
      </p>
    );
  }
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-primary-900 lg:grid-cols-1">
      {offer.prices.map((price) => (
        <div key={`${price.amount}-${price.appliesTo ?? ''}`} className="min-w-0">
          <dt className="sr-only">{price.appliesTo}</dt>
          <dd>
            <span className={`block font-mono text-price ${NUMERAL}`}>
              {price.basis === 'from' && <span className="font-body text-body-sm text-[#4A574D]">from </span>}
              {formatAmount(price)}
            </span>
            <span aria-hidden="true" className="mt-1 block font-body text-body-sm text-[#4A574D]">
              {price.appliesTo}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function OfferItem({ offer }: { offer: CatalogOffer }) {
  const category = getCategory(offer.category);
  return (
    <article
      id={offer.id}
      aria-labelledby={`${offer.id}-h`}
      data-pending={offer.pending || undefined}
      className="flex min-w-0 scroll-mt-24 flex-col border-t-2 border-primary-900 pt-4"
    >
      <Heading as="h4" size="sm" id={`${offer.id}-h`}>
        {offer.name}
      </Heading>
      <div className="mt-3">
        <OfferPrice offer={offer} />
        {offer.priceNote && <p className="mt-1 font-body text-body-sm text-[#4A574D]">{offer.priceNote}</p>}
      </div>
      <p className="mt-3 font-body text-body-sm text-primary-900">{offer.summary}</p>
      <div className="mt-auto pt-3">
        <Link href={homeBookingHref(category.servicePath)} data-cta={`offer-${offer.id}`} className={TEXT_LINK_CLASS}>
          {homeOffers.cta}
          <span className="sr-only"> about {offer.name}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
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
        <p className="font-body text-body-sm text-[#4A574D]">{category.blurb}</p>
      </div>
      <div className={`mt-5 grid gap-x-8 gap-y-8 ${listClassName}`}>
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
    <Section tone="birch" rhythm="tight" id="offers" labelledBy="home-offers-h">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <Eyebrow index="02">{homeOffers.eyebrow}</Eyebrow>
          <Heading as="h2" id="home-offers-h" className="mt-4">
            {homeOffers.heading}
          </Heading>
        </div>
        <p className="max-w-[52ch] font-body text-body-lg text-[#4A574D] lg:col-span-5">{homeOffers.sub}</p>
      </div>

      <CategoryGroup id="websites" className="mt-10" listClassName="sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6" />

      {/* From 1280px, systems and care share one five-column row. */}
      <div className="mt-12 grid gap-12 xl:grid-cols-5 xl:gap-x-6">
        <CategoryGroup id="systems" className="xl:col-span-3" listClassName="sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-6" />
        <CategoryGroup id="care" className="xl:col-span-2" listClassName="sm:grid-cols-2 xl:gap-x-6" />
      </div>
    </Section>
  );
}
