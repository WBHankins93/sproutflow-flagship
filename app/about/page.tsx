// app/about/page.tsx - Ben's story on v3, in his own voice.
//
// Tones: clearing header (photo and the one margin note), white story, leaf
// principles, sunlight "why", then the Fern FooterCta and the Pine footer.

import type { Metadata } from 'next';
import Image from 'next/image';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { ButtonLink, Eyebrow, Heading, MarginNote, Section } from '@/components/v3';
import PageIntro from '@/components/services/PageIntro';
import { NUMERAL_CLASS, SOFT_TEXT, bookingHref } from '@/components/services/styles';
import { BOOKING_CTA_LABEL } from '@/lib/constants';
import { homeBen, homeHero, homeTrust } from '@/data/home';
import { getImageUrl } from '@/lib/blob-images';

export const metadata: Metadata = {
  title: 'About Ben Hankins',
  description:
    'Ben Hankins spent 7 years keeping software running at large companies, including IBM. Now he builds websites, lead systems and care for small businesses. Based in New Orleans, working with businesses anywhere.',
  alternates: { canonical: '/about' },
};

const PRINCIPLES: [title: string, body: string][] = [
  ['One person, start to finish', 'The person who takes your call is the person who designs, builds, tests and looks after the work.'],
  ['A fixed price in writing', 'You see the scope, the timing and the price before I start.'],
  ['You own everything', 'Your domain, code, data and accounts stay in your name.'],
  ['The smallest useful fix first', 'I start with the part that makes a real difference, not the biggest possible project.'],
  ['Plain English', 'I explain the tradeoffs in plain terms, so you can decide without learning my vocabulary.'],
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        id="about-h"
        eyebrow="About"
        title="I’m Ben. I build it, and I keep it working."
        italic="keep"
        intro={<p>{homeBen.paragraphs[0]}</p>}
        aside={
          <figure className="flex items-end gap-4 lg:flex-col lg:items-start">
            <div className="relative aspect-[4/5] w-36 flex-none overflow-hidden rounded-2xl border border-primary-900/10 bg-forest-leaf sm:w-48 lg:w-full lg:max-w-[360px]">
              <Image
                src={getImageUrl('ben-photo.png')}
                alt={homeBen.photoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 360px, 192px"
                className="object-cover object-top"
              />
            </div>
            <MarginNote arrow="left" className="pb-2 lg:pb-0" decorative>
              {homeHero.note}
            </MarginNote>
          </figure>
        }
      >
        <p className="border-l-2 border-ink-700 pl-4 font-body text-body font-semibold text-primary-900">
          {homeBen.credentials}
        </p>
        <p className={`mt-3 font-body text-body ${SOFT_TEXT}`}>{homeTrust.location}</p>
        <ButtonLink href={bookingHref()} data-cta="about" className="mt-6">
          {BOOKING_CTA_LABEL}
        </ButtonLink>
      </PageIntro>

      <Section tone="white" labelledBy="about-before-h">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <Eyebrow index="01">Before Sproutflow</Eyebrow>
            <Heading as="h2" id="about-before-h" className="mt-4">
              The habits that make the work hold up.
            </Heading>
          </div>
          <div className="min-w-0 space-y-5 font-body text-body-lg text-primary-900 lg:col-span-7">
            <p>
              I spent seven years keeping software running at large companies, including IBM. That work taught me to scope
              honestly, ship on a date, and leave behind something the next person can maintain.
            </p>
            <p>
              Big companies are strict about the parts nobody brags about. You write the scope down. You agree what done
              means before anyone builds. You test it, and you document the handover so the thing survives the person who
              made it.
            </p>
            <p>
              Small businesses almost never get any of that. I bring the same habits to every project: a fixed price in
              writing before I start, testing on real phones, and a handoff where you own what you paid for.
            </p>
            <p className={SOFT_TEXT}>I am self-taught, so I had to learn all of this in plain language. You get the same version.</p>
          </div>
        </div>
      </Section>

      <Section tone="leaf" labelledBy="about-principles-h">
        <Eyebrow index="02">How I work</Eyebrow>
        <Heading as="h2" size="md" id="about-principles-h" className="mt-4">
          Five rules I keep on every project.
        </Heading>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map(([title, body], i) => (
            <li key={title} className="rounded-xl bg-forest-white p-5">
              <span aria-hidden="true" className={`font-mono text-label text-redline ${NUMERAL_CLASS}`}>
                0{i + 1}
              </span>
              <h3 className="mt-3 font-body text-body-lg font-semibold leading-snug text-primary-900">{title}</h3>
              <p className={`mt-2 font-body text-body-sm ${SOFT_TEXT}`}>{body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sunlight" labelledBy="about-why-h">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <Eyebrow index="03">Why Sproutflow</Eyebrow>
            <Heading as="h2" size="md" id="about-why-h" className="mt-4">
              Built for businesses that grew on reputation first.
            </Heading>
          </div>
          <div className="min-w-0 space-y-5 font-body text-body-lg text-primary-900 lg:col-span-7">
            <p>
              Plenty of good businesses run on word of mouth: trades, practices, creative studios, small shops. Some of the
              best I have met had more work than they could clear and no website at all, or one that quietly stopped
              working years ago.
            </p>
            <p>
              That is the part that got me. Not that these businesses were failing, but that they were succeeding on
              reputation alone, with nothing built to catch what comes next. Sproutflow is me working on that, one business
              at a time.
            </p>
            <p className={SOFT_TEXT}>
              Outside of work I garden, keep too many tropical plants, and make hot sauce that never comes out the same
              twice.
            </p>
          </div>
        </div>
      </Section>

      <FooterCta />
      <Footer />
    </>
  );
}
