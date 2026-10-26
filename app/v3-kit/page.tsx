import type { Metadata } from 'next';
import Image from 'next/image';
import { RedlineFrame, RedlineUnderline, type RedlineMarkSpec } from '@/components/redline';
import { ButtonLink, Container, Eyebrow, Heading, MarginNote, Section } from '@/components/v3';

// Temporary QA page for design system v3 (Wave 1). Renders every primitive
// and the Redline kit so the lead can check 375 x 812 and 1440 x 900.
// Not in the sitemap, and noindex. Remove once Wave 2 pages ship.
export const metadata: Metadata = {
  title: 'Design system v3 kit',
  robots: { index: false, follow: false },
};

// DJN's old homepage, marked up as in redesign-proposals/redline/index.html.
const DJN_MARKS: RedlineMarkSpec[] = [
  {
    variant: 'circle',
    x: 56.5,
    y: 2.5,
    w: 28,
    h: 10.5,
    note: 'no phone number up top',
    detail: 'The header has links and a button, but no number to tap.',
    noteWidth: 30,
    pinAt: { x: 85, y: 7 },
  },
  { variant: 'arrow', x: 63, y: 12.5, w: 5, h: 8.5, delay: 0.25 },
  {
    variant: 'circle',
    x: 5,
    y: 16,
    w: 25.5,
    h: 31,
    note: 'opens with a quote, not what you do',
    detail: 'Say what you do and where you work first.',
    noteWidth: 27,
    noteRotate: 1.5,
    pinAt: { x: 29, y: 18 },
  },
  {
    variant: 'underline',
    x: 34.5,
    y: 72,
    w: 31.5,
    h: 5,
    note: 'what you do is the smallest line here',
    detail: 'Welding and hauling should be the headline.',
    notePlacement: 'left',
    noteWidth: 25,
    noteRotate: -1.5,
    pinAt: { x: 33, y: 74.5 },
  },
  { variant: 'arrow', x: 28.5, y: 74, w: 5.5, h: 6, delay: 1 },
  {
    variant: 'box',
    x: 70,
    y: 33,
    w: 25,
    h: 35,
    note: 'room for a call button + quote form',
    detail: 'The empty right side can hold the next step.',
    notePlacement: 'below',
    noteWidth: 22,
    noteRotate: 2,
    pinAt: { x: 94, y: 36 },
  },
];

// Ben's own August 2026 homepage ("I start with my own"), pins at every width.
const OWN_MARKS: RedlineMarkSpec[] = [
  {
    variant: 'circle',
    x: 49,
    y: 0.5,
    w: 49,
    h: 6.5,
    note: 'no phone number up top',
    detail: 'The header asks for a project brief before it offers a call.',
  },
  {
    variant: 'underline',
    x: 2.5,
    y: 46.5,
    w: 32,
    h: 3.5,
    note: 'big promise, no price or place',
    detail: 'The headline never says New Orleans or a starting price.',
  },
  {
    variant: 'box',
    x: 2,
    y: 72,
    w: 38,
    h: 10,
    note: 'the main button asks for homework',
    detail: 'Booking a 15-minute call is easier than writing a project brief.',
  },
  {
    variant: 'circle',
    x: 43.5,
    y: 77,
    w: 54,
    h: 6.5,
    note: 'proof hides in small tabs',
    detail: 'Client results sit in a carousel most visitors never click.',
    tone: 'fern',
  },
];

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div>
      <div className={`h-14 rounded-md border border-primary-900/10 ${className}`} />
      <p className="mt-2 font-mono text-label uppercase text-[#4A574D]">
        {name} {hex}
      </p>
    </div>
  );
}

export default function V3KitPage() {
  return (
    <>
      {/* Type roles */}
      <Section tone="birch" labelledBy="kit-h" rhythm="loose">
        <Eyebrow index="00">Design system v3 kit</Eyebrow>
        <Heading as="h1" size="hero" id="kit-h" className="mt-4 max-w-[14ch]">
          I find what&apos;s <RedlineUnderline>costing you calls.</RedlineUnderline> Then I fix it.
        </Heading>
        <div className="mt-6 flex flex-wrap items-end gap-6">
          <p className="max-w-[56ch] font-body text-body-lg text-[#4A574D]">
            Five roles. Archivo for the hero headline only, Instrument Serif for every other heading, DM Sans for
            text, Caveat for red-pen marks and my notes, Fira Code for prices, labels and numerals.
          </p>
          <MarginNote arrow="left">that&apos;s the one heavy headline</MarginNote>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/book">Book a 15-minute call</ButtonLink>
          <ButtonLink href="/check" variant="secondary">
            Check your website free
          </ButtonLink>
        </div>
      </Section>

      {/* Headings and utility type */}
      <Section tone="paper" labelledBy="headings-h">
        <Eyebrow index="01">Headings</Eyebrow>
        <div className="mt-6 grid gap-6">
          <Heading as="h2" size="xl" id="headings-h">
            One menu. Fixed prices.
          </Heading>
          <Heading as="h3" size="lg" italic="Fixed">
            Fixed scope, written down.
          </Heading>
          <Heading as="h3" size="md">
            Websites break quietly
          </Heading>
          <Heading as="h4" size="sm">
            Lead Flow Audit
          </Heading>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-mono text-label uppercase text-[#4A574D]">Website Rescue</p>
            <p className="mt-2 font-mono text-price tabular-nums text-primary-900">$1,500</p>
          </div>
          <div>
            <p className="font-mono text-label uppercase text-[#4A574D]">DJN Services</p>
            <p className="mt-2 font-mono text-numeral tabular-nums text-primary-900">35%</p>
            <p className="mt-1 font-body text-body-sm text-[#4A574D]">increase in total bookings (client-reported)</p>
          </div>
          <div>
            <p className="font-mono text-label uppercase text-[#4A574D]">Call</p>
            <a href="tel:+15043261676" className="mt-2 block font-mono text-price tabular-nums text-primary-900">
              (504) 326-1676
            </a>
          </div>
        </div>
      </Section>

      {/* Redline frame, automatic pins */}
      <Section tone="birch" labelledBy="redline-h">
        <Eyebrow index="02">Redline frame</Eyebrow>
        <Heading as="h2" size="lg" id="redline-h" className="mt-4">
          Notes on the image, pins on a phone
        </Heading>
        <p className="mt-3 max-w-[60ch] font-body text-body text-[#4A574D]">
          Below 560px of frame width the notes become numbered pins with a list under the image. The narrow column on
          the right shows the phone layout at any screen size.
        </p>
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <RedlineFrame
            marks={DJN_MARKS}
            listLabel="What I marked on the old homepage"
            caption="DJN Services, North Alabama. Old homepage, marked up. The new site: 35% increase in total bookings (client-reported)."
          >
            <Image
              src="/redesign/djn-before-home.jpg"
              width={1600}
              height={933}
              sizes="(min-width: 1024px) 760px, 100vw"
              alt="DJN Services' old homepage: a dark panel with a Henry Ford quote at top left and the company logo in the center. The navigation has no phone number."
            />
          </RedlineFrame>
          <RedlineFrame marks={DJN_MARKS} listLabel="What I marked, narrow frame">
            <Image
              src="/redesign/djn-before-home.jpg"
              width={1600}
              height={933}
              sizes="420px"
              alt="The same DJN Services homepage in a narrow frame."
            />
          </RedlineFrame>
        </div>
      </Section>

      {/* Spacer so the next frame draws on as it scrolls in */}
      <Section tone="lichen" labelledBy="own-h">
        <Eyebrow index="03">Pins at every width</Eyebrow>
        <Heading as="h2" size="lg" id="own-h" className="mt-4" italic="own">
          I start with my own
        </Heading>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <MarginNote arrow="down" tone="redline">
            my August homepage, marked up
          </MarginNote>
        </div>
        <div className="mt-6 max-w-[880px]">
          <RedlineFrame
            marks={OWN_MARKS}
            pins="always"
            listLabel="What I marked on my own homepage"
            caption="Sproutflow Studio, August 2026."
          >
            <Image
              src="/redesign/sproutflow-v1-home.jpg"
              width={1600}
              height={1424}
              sizes="(min-width: 960px) 880px, 100vw"
              alt="Sproutflow Studio's August 2026 homepage: a large headline, Make it easier for customers to choose you, with a project carousel on the right."
            />
          </RedlineFrame>
        </div>
      </Section>

      {/* Pine: on-dark variants */}
      <Section tone="pine" labelledBy="pine-h">
        <Eyebrow index="04" onDark>
          Book
        </Eyebrow>
        <Heading as="h2" size="lg" id="pine-h" className="mt-4">
          Fifteen minutes. <RedlineUnderline tone="goldenrod">One clear next step.</RedlineUnderline>
        </Heading>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <ButtonLink href="/book" variant="onDark">
            Book a 15-minute call
          </ButtonLink>
          <MarginNote tone="onDark" arrow="left">
            I answer the phone myself
          </MarginNote>
        </div>
      </Section>

      {/* Tokens */}
      <Section tone="birch" labelledBy="tokens-h" rhythm="tight">
        <Container size="narrow" className="!px-0">
          <Eyebrow index="05">Tokens</Eyebrow>
          <Heading as="h2" size="md" id="tokens-h" className="mt-4">
            Canvases and the red pen
          </Heading>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Swatch name="Birch" hex="#F4EFE3" className="bg-cream-300" />
            <Swatch name="Paper" hex="#FBF8F1" className="bg-[#FBF8F1]" />
            <Swatch name="Lichen" hex="#E4E3D2" className="bg-cream-500" />
            <Swatch name="Pine" hex="#223528" className="bg-primary-900" />
            <Swatch name="Redline" hex="#B42318" className="bg-redline" />
            <Swatch name="Redline soft" hex="#FBE9E7" className="bg-redline-soft" />
          </div>
          <p className="mt-6 rounded-md bg-redline-soft px-4 py-3 font-body text-body-sm text-redline-ink">
            Redline ink on its soft tint, for an inline problem callout.
          </p>
        </Container>
      </Section>
    </>
  );
}
