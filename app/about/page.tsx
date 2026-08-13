import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/ui/PageHeader';
import SectionShell from '@/components/ui/SectionShell';
import StatRail from '@/components/ui/StatRail';
import MediaPanel from '@/components/ui/MediaPanel';
import FooterCta from '@/components/ui/FooterCta';
import { Footer } from '@/components/layout/Footer';
import { listedProjectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';

export const metadata: Metadata = {
  title: 'About Ben Hankins',
  description:
    'Seven years building software inside large companies, including IBM. Now bringing that delivery discipline to owner-run businesses in New Orleans.',
  alternates: { canonical: '/about' },
};

const principles = [
  [
    'One person start to finish',
    'The person who scopes the work is the person who designs, builds, tests, and explains it.',
  ],
  [
    'Written scope before building',
    'The important decisions, limits, timing, and fixed quote are visible before production begins.',
  ],
  ['You own the accounts', 'Domains, data, analytics, and connected tools stay under your control.'],
  [
    'Smallest useful fix first',
    'The work begins with the part that can make a real difference, not the largest possible project.',
  ],
  [
    'No agency language',
    'I explain the tradeoffs in plain terms so you can make the decision without learning my vocabulary.',
  ],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Ben"
        title="I stay close to the problem and the people living with it."
        titleAccent="the people living with it"
        intro="One person from the first conversation through launch, documentation, and support."
      />
      <SectionShell index="01" label="the opening" variant="cream">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 text-body-lg text-text-secondary lg:col-span-6">
            <p>
              I spent seven years building and running software inside large companies, including IBM. That work taught
              me how to scope honestly, ship on a date, and leave behind something the next person can maintain.
            </p>
            <p>
              Sproutflow is where that goes to work for owner run businesses. You will not meet me on the call and then
              get handed to someone else.
            </p>
            <p>I am self taught, which means I had to learn this in plain language. You get the same version.</p>
            <p>
              Outside of it I garden, keep too many tropical plants, and make hot sauce that never comes out the same
              twice.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl lg:col-span-5 lg:col-start-8">
            <Image
              src={getImageUrl('ben-photo.png')}
              alt="Ben Hankins, founder of Sproutflow Studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell index="02" label="before Sproutflow" variant="ink" labelledBy="before-sproutflow-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="before-sproutflow-heading" className="font-display text-display-lg text-cream-300 lg:col-span-5">
            The habits that make the work hold up.
          </h2>
          <div className="space-y-6 text-body-lg text-white/[0.68] lg:col-span-6 lg:col-start-7">
            <p>
              Enterprise work is strict about the parts nobody brags about. You write the scope down. You agree what
              done means before anyone builds. You test it, and you document the handover so the thing survives the
              person who made it. That is not talent, it is habit, and it is the reason enterprise software keeps
              running long after the original team has moved on.
            </p>
            <p>
              Small businesses almost never get any of that, and it is not a money problem. It is that most studios skip
              it. I did not want to run an agency and I did not want to hire my way into one. I wanted to take those
              habits and shrink them down to something a person running their own shop can actually afford, which is why
              it is one person start to finish and why you own everything when we are done.
            </p>
            <StatRail
              variant="ink"
              className="pt-5"
              stats={[
                { value: '7 years', label: 'enterprise software' },
                { value: String(listedProjectProof.length), label: 'live client builds' },
                { value: '1 person', label: 'start to finish' },
              ]}
            />
          </div>
        </div>
      </SectionShell>

      <SectionShell index="03" label="why Sproutflow" variant="cream" labelledBy="origin-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="origin-heading" className="font-display text-display-md text-primary-900 lg:col-span-5">
            Built for businesses that grew on reputation first.
          </h2>
          <div className="space-y-6 text-body-lg text-text-secondary lg:col-span-6 lg:col-start-7">
            <p>
              New Orleans runs on people who work for themselves. Contractors, practices, firms, offices, trades, shops.
              It is a city built on doing your own thing, and word of mouth here is strong enough that plenty of them
              never needed a website to stay busy. Some of the best ones I found had a backlog they could not clear and
              no website at all.
            </p>
            <p>
              That is the part that got me. Not that these businesses were failing, but that they were succeeding on
              reputation alone, with nothing built to catch what comes next. Sproutflow is me working on that, one
              business at a time.
            </p>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        index="04"
        label="how I actually work"
        variant="ink"
        className="bg-ink-700"
        labelledBy="principles-heading"
      >
        <h2 id="principles-heading" className="max-w-4xl font-display text-display-md text-cream-300">
          Five principles that stay visible in the work.
        </h2>
        <div className="mt-12 grid border-t border-white/20 md:grid-cols-2">
          {principles.map(([title, body], index) => (
            <article
              key={title}
              className={`border-b border-white/20 py-7 md:px-7 ${index % 2 === 0 ? 'md:border-r md:pl-0' : 'md:pr-0'}`}
            >
              <span className="font-mono text-mono-meta text-accent-300">0{index + 1}</span>
              <h3 className="mt-5 font-display text-h4 text-cream-300">{title}</h3>
              <p className="mt-3 text-white/60">{body}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell index="05" label="the studio" variant="cream">
        <div className="grid gap-5 md:grid-cols-12">
          <MediaPanel placeholder="Studio photograph 01" height={360} className="md:col-span-7" />
          <MediaPanel placeholder="Studio photograph 02" height={360} className="md:col-span-5" />
          <MediaPanel placeholder="Garden or New Orleans photograph" height={300} className="md:col-span-5" />
          <MediaPanel placeholder="Working detail photograph" height={300} className="md:col-span-7" />
        </div>
      </SectionShell>
      <FooterCta />
      <Footer />
    </>
  );
}
