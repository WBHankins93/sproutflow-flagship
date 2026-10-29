import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import { formatAmount, getCategory, getOffer } from '@/data/catalog';
import { homeCare } from '@/data/home';
import { homeBookingHref } from './booking';

/** 6. "Websites break quietly": why care exists, with two generic, true examples. */
export default function CareSection() {
  const care = getOffer(homeCare.careOfferId);
  const prices = care?.prices ?? [];
  const lowest = prices.length ? prices.reduce((min, price) => (price.amount < min.amount ? price : min)) : undefined;

  return (
    <Section tone="lichen" rhythm="tight" id="care" labelledBy="home-care-h">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-5">
          <Eyebrow index="03">{homeCare.eyebrow}</Eyebrow>
          <Heading as="h2" id="home-care-h" italic={homeCare.italic} className="mt-4">
            {homeCare.heading}
          </Heading>
          <p className="mt-4 max-w-[52ch] font-body text-body-lg text-primary-900">{homeCare.intro}</p>
          {lowest && (
            <p className="mt-4 max-w-[52ch] font-body text-body text-[#4A574D]">
              {homeCare.pitch}{' '}
              <span className="font-mono font-medium tabular-nums text-primary-900 [font-variant-ligatures:none]">
                {formatAmount(lowest)}
              </span>
              .
            </p>
          )}
          <ButtonLink
            href={homeBookingHref(getCategory('care').servicePath)}
            variant="secondary"
            data-cta="care"
            className="mt-6"
          >
            {homeCare.cta}
          </ButtonLink>
        </div>

        <ul className="grid min-w-0 content-start gap-5 sm:grid-cols-2 lg:col-span-7 lg:mt-12">
          {homeCare.examples.map((example) => (
            <li key={example.label} className="rounded-xl border-t-4 border-redline bg-[#FBF8F1] p-5 sm:p-6">
              <p className="font-mono text-label uppercase text-redline [font-variant-ligatures:none]">{example.label}</p>
              <h3 className="mt-3 font-body text-body-lg font-semibold leading-snug text-primary-900">{example.title}</h3>
              <p className="mt-2 font-body text-body-sm text-[#4A574D]">{example.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
