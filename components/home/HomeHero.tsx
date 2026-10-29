import Image from 'next/image';
import { HeroMachine } from '@/components/home/hero-machine';
import { RedlineUnderline } from '@/components/redline';
import { ButtonLink, Eyebrow, Heading, MarginNote, Section } from '@/components/v3';
import { homeHero } from '@/data/home';
import { getImageUrl } from '@/lib/blob-images';
import { homeBookingHref } from './booking';

/**
 * 1. Hero. The one Archivo headline on the page, Ben's photo and note beside
 * it, the two CTAs and the Lead Machine slot (owned by the `hero` worker).
 *
 * Desktop: headline and Ben across the top, copy and the machine below.
 * Phone: headline, Ben, copy, CTAs, then the machine.
 */
export default function HomeHero() {
  const [first, second, third] = homeHero.sentences;
  // "Find the leaks." -> underline "Find the leaks", keep the period plain.
  const firstRest = first.slice(homeHero.underline.length);

  return (
    <Section
      tone="birch"
      rhythm="none"
      id="top"
      labelledBy="home-hero-h"
      className="pb-[var(--v3-rhythm-tight)] pt-8 sm:pt-12 lg:pt-10"
    >
      <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8">
        <div className="min-w-0 lg:col-span-8 lg:row-start-1">
          <Eyebrow>{homeHero.eyebrow}</Eyebrow>
          <Heading as="h1" size="hero" id="home-hero-h" className="mt-4 text-primary-900">
            <span className="lg:block">
              <RedlineUnderline>{homeHero.underline}</RedlineUnderline>
              {firstRest}
            </span>{' '}
            <span className="lg:block">{second}</span> <span className="lg:block">{third}</span>
          </Heading>
        </div>

        <div className="flex min-w-0 items-center gap-4 lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:items-end lg:self-end">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-primary-900/10 bg-cream-500 lg:h-44 lg:w-36 lg:rounded-2xl">
            <Image
              src={getImageUrl('ben-photo.png')}
              alt={homeHero.photoAlt}
              fill
              priority
              sizes="(min-width: 1024px) 144px, 80px"
              className="object-cover object-top"
            />
          </div>
          <MarginNote arrow="left" className="min-w-0 lg:pb-4">
            {homeHero.note}
          </MarginNote>
        </div>

        <div className="min-w-0 lg:col-span-5 lg:row-start-2 lg:self-center">
          <p className="max-w-[44ch] font-body text-body-lg text-[#4A574D]">{homeHero.sub}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={homeBookingHref()} data-cta="hero">
              {homeHero.primaryCta}
            </ButtonLink>
            <ButtonLink href={homeHero.secondaryCta.href} variant="secondary" data-cta="hero-check">
              {homeHero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="w-full min-w-0 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:max-w-[620px] lg:justify-self-end">
          <HeroMachine />
        </div>
      </div>
    </Section>
  );
}
