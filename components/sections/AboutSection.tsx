import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { Container } from '../layout/StudioLayout';

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-primary-950 py-20 text-white md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/15 bg-primary-800">
              <Image
                src={getImageUrl('ben-photo.png')}
                alt="Ben Hankins, founder of Sproutflow Studio"
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <p className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md bg-primary-950 px-3 py-2 text-xs font-semibold text-white">
              <MapPin className="h-4 w-4 text-accent-300" aria-hidden="true" />
              New Orleans · Working nationwide
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">Hi, I’m Ben</p>
            <h2 id="about-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-white sm:text-5xl lg:text-6xl">
              I stay close to the problem and the people living with it.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-white/75">
              <p>
                I spent years building and operating software for large companies. Sproutflow is where I use that experience with small-business owners who need the work to make sense, hold up, and earn its keep.
              </p>
              <p>
                You will not meet me on the sales call and get handed to someone else. I write, design, build, and test the project, and I explain the decisions without making you learn agency language first.
              </p>
              <p>
                Some clients need a new website. Others need a booking flow that stops losing details. We start with what is actually happening and choose the smallest useful fix.
              </p>
            </div>
            <Link href="/inquiry" className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-accent-300 pb-1 font-semibold text-white hover:text-accent-200">
              Tell me what is getting in the way
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
