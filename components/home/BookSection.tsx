import { RedlineUnderline } from '@/components/redline';
import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import { homeBook } from '@/data/home';
import { homeBookingHref } from './booking';

/**
 * 10. Book: the call, a phone number, and three short answers. On Fern, so
 * every text colour is Birch (5.38:1); the soft greys and gold light fail
 * there. Sun gold marks and the onFern button; never red.
 */
export default function BookSection() {
  return (
    <Section tone="fern" rhythm="none" className="py-8 md:py-[var(--v3-rhythm-tight)]" id="book" labelledBy="home-book-h">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow index="07" onFern>
            {homeBook.eyebrow}
          </Eyebrow>
          <Heading as="h2" id="home-book-h" className="mt-4">
            {homeBook.heading} <RedlineUnderline tone="sungold">{homeBook.underline}</RedlineUnderline>
          </Heading>
          <p className="mt-3 max-w-[48ch] font-body text-body text-cream-300 md:mt-4 md:text-body-lg">{homeBook.body}</p>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <ButtonLink href={homeBookingHref()} variant="onFern" data-cta="book">
              {homeBook.cta}
            </ButtonLink>
            <p className="font-body text-body text-cream-300">
              {homeBook.phoneLead}{' '}
              <a
                href={homeBook.phoneHref}
                className="inline-flex min-h-[44px] items-center font-mono font-medium tabular-nums text-cream-300 underline decoration-forest-sungold decoration-2 underline-offset-[6px] [font-variant-ligatures:none] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-cream-300"
              >
                {homeBook.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6">
          <h3 className="font-mono text-label uppercase text-cream-300 [font-variant-ligatures:none]">
            {homeBook.faqHeading}
          </h3>
          <dl className="mt-4">
            {homeBook.faqs.map((faq) => (
              <div key={faq.id} className="border-t border-cream-300/20 py-3 md:py-4">
                <dt className="font-body text-body font-semibold text-cream-300 md:text-body-lg">{faq.question}</dt>
                <dd className="mt-1 font-body text-body text-cream-300">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
