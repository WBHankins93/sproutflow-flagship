import Image from 'next/image';
import { HeroMachine } from '@/components/home/hero-machine';
import { RedlineUnderline } from '@/components/redline';
import { ButtonLink, Eyebrow, Heading, MarginNote, Section } from '@/components/v3';
import { homeHero } from '@/data/home';
import { getImageUrl } from '@/lib/blob-images';
import { homeBookingHref } from './booking';

/**
 * Ben's photo and note. Self-contained so it can be removed with one line
 * (the `<HeroBen />` in HomeHero) while Ben decides whether the hero keeps it.
 */
function HeroBen() {
  return (
    <div className="order-4 flex min-w-0 items-center gap-4 lg:mt-7">
      <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full border border-primary-900/10 bg-cream-500">
        <Image
          src={getImageUrl('ben-photo.png')}
          alt={homeHero.photoAlt}
          fill
          priority
          sizes="72px"
          className="object-cover object-top"
        />
      </div>
      <MarginNote arrow="left" className="min-w-0">
        {homeHero.note}
      </MarginNote>
    </div>
  );
}

/**
 * 1. Hero. The one Archivo headline on the page, the two CTAs, the Lead
 * Machine (owned by the `hero` worker) and Ben's photo with his note.
 *
 * From 1024px: two columns. Left: eyebrow, headline, Ben, subcopy, CTAs.
 * Right: the machine, vertically centred.
 *
 * Phones: eyebrow, headline, CTAs, machine, then Ben and the subcopy, so the
 * machine's calendar ends inside the first 812px. The left column is
 * `display: contents` below 1024px so its children can be reordered around
 * the machine. Only the CTAs and the machine's pause button take focus, and
 * they stay in visual order.
 */
export default function HomeHero() {
  const [first, second, third] = homeHero.sentences;
  // "Find the leaks." is underlined whole, period included, so the period can
  // never wrap onto the next line by itself.
  const firstRest = first.slice(homeHero.underline.length);

  return (
    <Section
      tone="birch"
      rhythm="none"
      id="top"
      labelledBy="home-hero-h"
      className="pb-10 pt-6 sm:pt-10 lg:pb-14 lg:pt-10"
    >
      <div className="grid gap-y-5 lg:grid-cols-12 lg:items-center lg:gap-x-12">
        <div className="contents lg:col-span-7 lg:block lg:min-w-0">
          <div className="order-1 min-w-0">
            <Eyebrow>{homeHero.eyebrow}</Eyebrow>
            <Heading as="h1" size="hero" id="home-hero-h" className="mt-4 text-primary-900">
              <span className="lg:block">
                <RedlineUnderline>{homeHero.underline}</RedlineUnderline>
                {firstRest}
              </span>{' '}
              <span className="lg:block">{second}</span> <span className="lg:block">{third}</span>
            </Heading>
          </div>

          <HeroBen />

          <p className="order-5 max-w-[44ch] font-body text-body-lg text-[#4A574D] lg:mt-5">{homeHero.sub}</p>

          <div className="order-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-7">
            <ButtonLink href={homeBookingHref()} data-cta="hero">
              {homeHero.primaryCta}
            </ButtonLink>
            <ButtonLink href={homeHero.secondaryCta.href} variant="secondary" data-cta="hero-check">
              {homeHero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="order-3 w-full min-w-0 lg:col-span-5">
          <HeroMachine />
        </div>
      </div>
    </Section>
  );
}
