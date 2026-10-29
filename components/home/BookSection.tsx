import { RedlineUnderline } from '@/components/redline';
import { ButtonLink, Eyebrow, Heading, Section } from '@/components/v3';
import { homeBook } from '@/data/home';
import { homeBookingHref } from './booking';

/** 10. Book: the call, a phone number, and three short answers. The one Pine section. */
export default function BookSection() {
  return (
    <Section tone="pine" rhythm="tight" id="book" labelledBy="home-book-h">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow index="07" onDark>
            {homeBook.eyebrow}
          </Eyebrow>
          <Heading as="h2" id="home-book-h" className="mt-4">
            {homeBook.heading} <RedlineUnderline tone="goldenrod">{homeBook.underline}</RedlineUnderline>
          </Heading>
          <p className="mt-4 max-w-[48ch] font-body text-body-lg text-[#C9CFC4]">{homeBook.body}</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <ButtonLink href={homeBookingHref()} variant="onDark" data-cta="book">
              {homeBook.cta}
            </ButtonLink>
            <p className="font-body text-body text-[#C9CFC4]">
              {homeBook.phoneLead}{' '}
              <a
                href={homeBook.phoneHref}
                className="inline-flex min-h-[44px] items-center font-mono font-medium tabular-nums text-cream-300 underline decoration-accent-300 decoration-2 underline-offset-[6px] [font-variant-ligatures:none] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-accent-300"
              >
                {homeBook.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-6">
          <h3 className="font-mono text-label uppercase text-[#C9CFC4] [font-variant-ligatures:none]">
            {homeBook.faqHeading}
          </h3>
          <dl className="mt-4">
            {homeBook.faqs.map((faq) => (
              <div key={faq.id} className="border-t border-cream-300/20 py-4">
                <dt className="font-body text-body-lg font-semibold text-cream-300">{faq.question}</dt>
                <dd className="mt-1 font-body text-body text-[#C9CFC4]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
