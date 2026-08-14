import Image from 'next/image';
import DeviceFrame from '@/components/ui/DeviceFrame';
import type { ServicePathId } from '@/data/servicePaths';
import { listedProjectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';

interface ServiceMediaProps {
  path: ServicePathId;
  /** Panel height in px on desktop. */
  height?: number;
  className?: string;
}

/**
 * Visual for each service path.
 *
 * Websites shows a real client site, because real proof exists for that path.
 * The other two are deliberately schematic: a diagram of how the work is
 * shaped, not a mock product screenshot. Inventing a plausible-looking CRM
 * with invented records would read as a real product Sproutflow ships, and
 * the studio does not have one. A diagram makes the same point honestly.
 */
export default function ServiceMedia({ path, height = 470, className = '' }: ServiceMediaProps) {
  if (path === 'websites') return <WebsitesMedia height={height} className={className} />;
  if (path === 'business-systems') return <SystemsMedia height={height} className={className} />;
  return <GrowthMedia height={height} className={className} />;
}

/* ---------------------------------------------------------------- websites */

function WebsitesMedia({ height, className }: { height: number; className: string }) {
  const lead = listedProjectProof[0];
  const second = listedProjectProof[1];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-ink-800 px-6 py-10 ${className}`}
      style={{ minHeight: height }}
    >
      <div className="grain rings absolute inset-0" aria-hidden="true" />
      <div className="relative w-full max-w-[520px]">
        <DeviceFrame kind="browser" className="w-full">
          <Image
            src={getImageUrl(lead.screenshot)}
            alt={lead.screenshotAlt}
            fill
            sizes="(max-width: 1024px) 90vw, 520px"
            className="object-cover object-top"
          />
        </DeviceFrame>
        <DeviceFrame
          kind="phone"
          width={104}
          className="absolute -bottom-6 -right-4 hidden sm:block"
        >
          <Image
            src={getImageUrl(second.screenshot)}
            alt=""
            fill
            sizes="104px"
            className="object-cover object-top"
          />
        </DeviceFrame>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- business systems */

const FLOW = [
  { label: 'Inquiry', note: 'form, call, or referral' },
  { label: 'Record', note: 'one customer, one place' },
  { label: 'Schedule', note: 'booked without back and forth' },
  { label: 'Follow up', note: 'automatic, not remembered' },
];

function SystemsMedia({ height, className }: { height: number; className: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-ink-800 p-7 md:p-10 ${className}`}
      style={{ minHeight: height }}
    >
      <div className="grain rings rings-left absolute inset-0" aria-hidden="true" />
      <div className="relative flex h-full flex-col justify-center">
        <p className="text-eyebrow uppercase text-white/45">One connected line</p>

        <ol className="mt-8 space-y-3">
          {FLOW.map((step, index) => (
            <li key={step.label} className="relative">
              {index < FLOW.length - 1 && (
                <span
                  className="absolute left-[19px] top-11 h-[calc(100%-0.75rem)] w-px bg-gradient-to-b from-accent-500/70 to-accent-500/10"
                  aria-hidden="true"
                />
              )}
              <div className="flex items-start gap-4 rounded-lg border border-white/12 bg-white/[0.04] p-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-accent-500/50 bg-ink-900 font-mono text-mono-meta text-accent-300">
                  {index + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-h4 text-cream-300">{step.label}</span>
                  <span className="mt-1 block text-body-sm text-white/50">{step.note}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-7 border-t border-white/15 pt-5 text-body-sm text-white/45">
          No step waits on someone remembering it.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- growth support */

const LOOP = ['Measure', 'Decide', 'Improve'];

function GrowthMedia({ height, className }: { height: number; className: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-ink-800 p-7 md:p-10 ${className}`}
      style={{ minHeight: height }}
    >
      <div className="grain absolute inset-0" aria-hidden="true" />
      <div className="relative flex h-full flex-col justify-center">
        <p className="text-eyebrow uppercase text-white/45">Growth you can see</p>

        {/* Growth rings, drawn as the record of successive improvements. The
            same motif as the site texture, used here to carry meaning. */}
        <div className="relative mx-auto mt-8 aspect-square w-full max-w-[300px]">
          <svg viewBox="0 0 300 300" className="h-full w-full" role="img" aria-label="Concentric growth rings, each one a completed round of improvement">
            {[138, 116, 94, 72, 50, 28].map((r, i) => (
              <circle
                key={r}
                cx="150"
                cy="150"
                r={r}
                fill="none"
                stroke={i < 3 ? '#C49A45' : '#5F755E'}
                strokeOpacity={i < 3 ? 0.85 - i * 0.18 : 0.55}
                strokeWidth={i === 0 ? 1.6 : 1}
                strokeDasharray={i === 0 ? '4 6' : undefined}
              />
            ))}
            <circle cx="150" cy="150" r="9" fill="#C49A45" fillOpacity="0.9" />
          </svg>

          <p className="absolute inset-x-0 bottom-1 text-center font-mono text-mono-meta text-white/40">
            each ring, one round of work
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/12 bg-white/12">
          {LOOP.map((stage, index) => (
            <li key={stage} className="bg-ink-900 px-4 py-5 text-center">
              <span className="block font-mono text-mono-meta text-accent-300">0{index + 1}</span>
              <span className="mt-2 block font-display text-h4 text-cream-300">{stage}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
