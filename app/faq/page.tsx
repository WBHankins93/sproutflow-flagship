// app/faq/page.tsx - Common questions on v3, answered for the current offers.
// Every price and time comes from data/catalog.ts. The FAQPage structured data
// is built from the same `FAQ_GROUPS` the page renders, so the two cannot
// drift. (The homepage has no FAQPage; components/StructuredData.tsx leaves it here.)
//
// Tones: clearing header, then white and leaf in turn for each group, a
// sunlight "still have a question", then the Fern FooterCta and the footer.

import type { Metadata } from 'next';
import Link from 'next/link';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { Eyebrow, Heading, Section } from '@/components/v3';
import PageIntro from '@/components/services/PageIntro';
import QuestionList from '@/components/services/QuestionList';
import { buildFaqGroups, faqSchema } from '@/components/services/faq';
import { SOFT_TEXT, TEXT_LINK_CLASS, bookingHref } from '@/components/services/styles';
import { BOOKING_CTA_LABEL, INQUIRY_PATH } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Common Questions',
  description:
    'Straight answers on prices, timing, ownership and what happens after launch: the starter landing page, the Lead Flow Audit, Site Care and custom quotes.',
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  const groups = buildFaqGroups();
  const count = groups.reduce((total, group) => total + group.items.length, 0);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(groups)) }} />
      <PageIntro
        id="faq-h"
        eyebrow={`Common questions · ${count}`}
        title="Straight answers, before you book."
        italic="Straight"
        intro="Open the group that matches what you are deciding. If your situation is different, tell me in plain language."
      />

      {groups.map((group, i) => (
        <Section
          key={group.id}
          id={group.id}
          tone={i % 2 === 0 ? 'white' : 'leaf'}
          rhythm="tight"
          labelledBy={`${group.id}-h`}
        >
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-4">
              <Eyebrow index={String(i + 1).padStart(2, '0')}>{group.eyebrow}</Eyebrow>
              <Heading as="h2" size="md" id={`${group.id}-h`} className="mt-4">
                {group.label}
              </Heading>
            </div>
            <div className="min-w-0 lg:col-span-8">
              <QuestionList items={group.items} />
            </div>
          </div>
        </Section>
      ))}

      <Section tone="sunlight" rhythm="tight" labelledBy="faq-more-h">
        <Heading as="h2" size="md" id="faq-more-h">
          Still have a question?
        </Heading>
        <p className={`mt-3 max-w-[60ch] font-body text-body-lg ${SOFT_TEXT}`}>
          Ask me directly. I read every message myself and reply within one business day.
        </p>
        <div className="mt-4 flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <Link href={bookingHref()} data-cta="faq" className={TEXT_LINK_CLASS}>
            {BOOKING_CTA_LABEL}
          </Link>
          <a href="mailto:ben@sproutflow-studio.com" className={`${TEXT_LINK_CLASS} [overflow-wrap:anywhere]`}>
            Email ben@sproutflow-studio.com
          </a>
          <Link href={INQUIRY_PATH} data-cta="faq-inquiry" className={TEXT_LINK_CLASS}>
            Send the details in writing
          </Link>
        </div>
      </Section>

      <FooterCta />
      <Footer />
    </>
  );
}
