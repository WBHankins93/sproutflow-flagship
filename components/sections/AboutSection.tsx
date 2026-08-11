import Image from 'next/image';
import { Check } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { Container } from '../layout/StudioLayout';

const principles = [
  'Recommendations shaped around your goals, team, and budget',
  'A fixed scope and quote before work starts',
  'Direct access to the person responsible for the outcome',
];

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-primary-900 py-20 text-white md:py-28">
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
            <p className="absolute bottom-4 left-4 rounded-md bg-primary-900/95 px-3 py-2 text-xs font-semibold text-white">
              Based in New Orleans · Working nationwide
            </p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-300">Meet Ben</p>
            <h2 id="about-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-white sm:text-5xl lg:text-6xl">
              The person you meet is the person doing the work.
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-white/75">
              <p>
                Ben Hankins spent years building and operating software for large companies. He brings the same care for reliability, security, and clear communication to small-business projects.
              </p>
              <p>
                Sproutflow started after he saw too many excellent local businesses held back by unclear websites and disconnected tools. The goal is practical: make your business easier to trust, easier to buy from, and easier to run.
              </p>
            </div>

            <div className="mt-9 border-t border-white/20 pt-7">
              <h3 className="font-display text-2xl font-semibold text-white">What direct partnership means</h3>
              <ul className="mt-5 space-y-4">
                {principles.map((principle) => (
                  <li key={principle} className="flex items-start gap-3 text-white/80">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-accent-300" aria-hidden="true" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
