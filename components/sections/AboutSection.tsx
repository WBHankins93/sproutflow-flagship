import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import StatRail from '@/components/ui/StatRail';
import { getImageUrl } from '@/lib/blob-images';

export default function AboutSection() {
  return (
    <SectionShell
      id="about"
      index="05"
      label="about Ben"
      variant="ink"
      labelledBy="about-heading"
      className="bg-ink-700"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/15">
            <Image
              src={getImageUrl('ben-photo.png')}
              alt="Ben Hankins, founder of Sproutflow Studio"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 font-mono text-mono-meta text-white/45">
            Founder and studio photography strip expands here
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-eyebrow uppercase text-accent-300">Hi, I’m Ben</p>
          <h2 id="about-heading" className="mt-5 font-display text-display-md text-cream-300">
            I stay close to the problem and the people{' '}
            <span className="font-accent font-normal italic text-accent-300">living with it.</span>
          </h2>
          <div className="mt-7 space-y-5 text-body-lg text-white/[0.68]">
            <p>
              I spent years building and operating software for large companies. Sproutflow is where I use that
              experience with small-business owners who need the work to make sense, hold up, and earn its keep.
            </p>
            <p>
              You will not meet me on the sales call and get handed to someone else. I write, design, build, and test
              the project, and I explain the decisions without making you learn agency language first.
            </p>
          </div>
          <StatRail
            variant="ink"
            className="mt-10"
            stats={[
              { value: '1:1', label: 'founder access' },
              { value: '4', label: 'checkpoints' },
              { value: '100%', label: 'client ownership' },
            ]}
          />
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 border-b border-accent-400 pb-1 font-semibold text-white"
          >
            More about how I work{' '}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}
