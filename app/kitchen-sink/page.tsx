import type { Metadata } from 'next';
import SectionShell from '@/components/ui/SectionShell';
import Marquee from '@/components/ui/Marquee';
import StatRail from '@/components/ui/StatRail';
import Pill from '@/components/ui/Pill';
import ArrowDisc from '@/components/ui/ArrowDisc';
import MediaPanel from '@/components/ui/MediaPanel';
import DeviceFrame from '@/components/ui/DeviceFrame';
import { projectProof } from '@/data/projectProof';

export const metadata: Metadata = {
  title: 'Kitchen Sink',
  robots: { index: false, follow: false },
};

const stats = [
  { value: '7', label: 'Years shipping enterprise software' },
  { value: String(projectProof.length), label: 'Live client builds running today' },
  { value: '1', label: 'Person on your project, start to finish' },
];

const capabilities = ['New build', 'Rebuild', 'Shopify', 'Copy and messaging', 'SEO foundations'];

const promises = [
  'Written scope',
  'Fixed quote',
  'You own the accounts',
  'One person, start to finish',
  'Stop after the first checkpoint',
];

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div>
      <div className={`h-16 rounded-md border border-primary-900/10 ${className}`} />
      <p className="mt-2 font-mono text-mono-meta text-text-muted">{name}</p>
    </div>
  );
}

function Specimens({ variant }: { variant: 'ink' | 'cream' }) {
  const muted = variant === 'ink' ? 'text-white/65' : 'text-text-secondary';

  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-display text-display-lg">
          Display large, with an{' '}
          <em className="font-accent italic text-accent-500">accent word</em>
        </h2>
        <h3 className="mt-4 font-display text-display-md">Display medium</h3>
        <h4 className="mt-4 text-h4">Heading four</h4>
        <p className={`mt-4 max-w-xl text-body-lg ${muted}`}>
          Body large. The quick brown fox jumps over the lazy dog, and the type keeps its
          rhythm at a comfortable measure.
        </p>
        <p className={`mt-3 max-w-xl text-body ${muted}`}>Body regular at one rem.</p>
        <p className={`mt-3 text-body-sm ${muted}`}>Body small.</p>
        <p className="mt-4 font-mono text-mono-meta text-accent-500">001 / MONO META</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {capabilities.map((capability) => (
          <Pill key={capability} variant={variant}>
            {capability}
          </Pill>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <ArrowDisc variant={variant} />
        <ArrowDisc variant={variant} open />
        <span className={`text-body-sm ${muted}`}>Closed and open</span>
      </div>

      <StatRail stats={stats} variant={variant} className="max-w-2xl" />

      <div className="grid gap-5 md:grid-cols-2">
        <MediaPanel variant={variant} height={220} placeholder="Client site loop, 16:9" />
        <MediaPanel variant={variant} height={220} placeholder="Dashboard capture" />
      </div>
    </div>
  );
}

export default function KitchenSinkPage() {
  return (
    <>
      <SectionShell index="01" label="Cream variant" variant="cream">
        <Specimens variant="cream" />
      </SectionShell>

      <Marquee
        variant="names"
        speed={45}
        ariaLabel="Client names"
        items={projectProof.map((project) => (
          <div key={project.id}>
            <p className="font-display text-[21px] leading-tight text-text-primary">
              {project.name}
            </p>
            <p className="font-accent text-[13px] italic text-text-muted">{project.location}</p>
          </div>
        ))}
      />

      <SectionShell index="02" label="Ink variant" variant="ink">
        <Specimens variant="ink" />
      </SectionShell>

      <Marquee
        variant="promises"
        speed={38}
        ariaLabel="What every project includes"
        items={promises.map((promise) => (
          <span key={promise}>{promise}</span>
        ))}
      />

      <SectionShell index="03" label="Device frames" variant="cream">
        <div className="flex flex-wrap items-end gap-10">
          <DeviceFrame kind="laptop" width={520}>
            <div className="flex h-full items-center justify-center bg-cream-300 text-eyebrow uppercase text-text-muted">
              Laptop screen
            </div>
          </DeviceFrame>
          <DeviceFrame kind="phone">
            <div className="flex h-full items-center justify-center bg-cream-300 text-eyebrow uppercase text-text-muted">
              Phone
            </div>
          </DeviceFrame>
          <DeviceFrame kind="browser" width={320}>
            <div className="flex h-full items-center justify-center bg-cream-300 text-eyebrow uppercase text-text-muted">
              Browser
            </div>
          </DeviceFrame>
        </div>
      </SectionShell>

      <SectionShell index="04" label="Color tokens" variant="cream">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-6">
          <Swatch name="ink-900" className="bg-ink-900" />
          <Swatch name="ink-800" className="bg-ink-800" />
          <Swatch name="ink-700" className="bg-ink-700" />
          <Swatch name="cream-500" className="bg-cream-500" />
          <Swatch name="cream-300" className="bg-cream-300" />
          <Swatch name="primary-500" className="bg-primary-500" />
          <Swatch name="primary-800" className="bg-primary-800" />
          <Swatch name="accent-500" className="bg-accent-500" />
          <Swatch name="accent-700" className="bg-accent-700" />
          <Swatch name="background-primary" className="bg-background-primary" />
          <Swatch name="background-card" className="bg-background-card" />
          <Swatch name="text-primary" className="bg-text-primary" />
        </div>
      </SectionShell>

      <SectionShell variant="ink">
        <div className="relative">
          <Marquee
            variant="ghost"
            speed={52}
            ariaLabel="Have a project in mind?"
            items={[<span key="a">Have a project in mind?</span>]}
          />
          <p className="mt-6 text-body-sm text-white/55">
            Ghost marquee, grain overlay, hairline rules. No gold background fills.
          </p>
        </div>
      </SectionShell>
    </>
  );
}
