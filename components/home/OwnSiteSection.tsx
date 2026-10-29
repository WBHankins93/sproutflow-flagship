import Image from 'next/image';
import { RedlineFrame } from '@/components/redline';
import { Eyebrow, Heading, MarginNote, Section } from '@/components/v3';
import { homeOwn } from '@/data/home';

/** 8. "I start with my own": Ben's August 2026 homepage, marked up honestly. */
export default function OwnSiteSection() {
  const { image } = homeOwn;
  return (
    <Section tone="birch" rhythm="none" id="my-own" labelledBy="home-own-h" className="py-8 md:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow index="05">{homeOwn.eyebrow}</Eyebrow>
          <Heading as="h2" id="home-own-h" italic={homeOwn.italic} className="mt-4">
            {homeOwn.heading}
          </Heading>
          <p className="mt-3 max-w-[48ch] font-body text-body text-[#4A574D] md:mt-4 md:text-body-lg">{homeOwn.body}</p>
          <MarginNote arrow="right" tone="redline" decorative className="mt-6 hidden lg:inline-flex">
            {homeOwn.note}
          </MarginNote>
        </div>
        {/* RedlineFrame is a size container: it needs a definite width (w-full). */}
        <div className="w-full min-w-0 lg:col-span-6">
          <RedlineFrame marks={homeOwn.marks} listLabel={homeOwn.listLabel} caption={homeOwn.caption} className="w-full">
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 580px, 100vw"
              alt={image.alt}
            />
          </RedlineFrame>
        </div>
      </div>
    </Section>
  );
}
