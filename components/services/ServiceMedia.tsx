import DeviceFrame from '@/components/ui/DeviceFrame';
import ImageCarousel from '@/components/ui/ImageCarousel';
import type { ServicePathId } from '@/data/servicePaths';
import { listedProjectProof } from '@/data/projectProof';
import { demos } from '@/data/demos';

interface ServiceMediaProps {
  path: ServicePathId;
  /** Panel height in px on desktop. */
  height?: number;
  className?: string;
}

/**
 * Visual for each service path.
 *
 * Websites and business systems both rotate through real screenshots -
 * client sites for the former, Sproutflow's own ClipBoard and Growth Desk
 * products for the latter (neither is a client engagement, see data/demos.ts).
 * Growth and support stays a schematic diagram since the work there isn't
 * tied to one product's screen.
 */
export default function ServiceMedia({ path, height = 470, className = '' }: ServiceMediaProps) {
  if (path === 'websites') return <WebsitesMedia height={height} className={className} />;
  if (path === 'business-systems') return <SystemsMedia height={height} className={className} />;
  return <GrowthMedia height={height} className={className} />;
}

/* ---------------------------------------------------------------- websites */

function WebsitesMedia({ height, className }: { height: number; className: string }) {
  const [lead, second] = listedProjectProof;

  // Nothing listed means nothing honest to show, so fall back to the systems
  // panel rather than rendering an empty frame or failing the build.
  if (!lead) return <SystemsMedia height={height} className={className} />;

  const slides = listedProjectProof.map((project) => ({ src: project.screenshot, alt: project.screenshotAlt }));

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-ink-800 px-6 py-10 ${className}`}
      style={{ minHeight: height }}
    >
      <div className="grain rings absolute inset-0" aria-hidden="true" />
      <div className="relative w-full max-w-[520px]">
        <DeviceFrame kind="browser" className="w-full">
          <ImageCarousel slides={slides} sizes="(max-width: 1024px) 90vw, 520px" />
        </DeviceFrame>
        {second && (
          <DeviceFrame kind="phone" width={104} className="absolute -bottom-6 -right-4 hidden sm:block">
            <ImageCarousel slides={[{ src: second.screenshot, alt: '' }]} sizes="104px" />
          </DeviceFrame>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------- business systems */

function SystemsMedia({ height, className }: { height: number; className: string }) {
  const slides = demos.flatMap((demo) => demo.screenshots.map((shot) => ({ src: shot.src, alt: shot.alt })));
  const names = demos.map((demo) => demo.name).join(' · ');

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl bg-ink-800 ${className}`}
      style={{ minHeight: height }}
    >
      <div className="grain rings rings-left absolute inset-0" aria-hidden="true" />
      <div className="relative flex-1 overflow-hidden">
        <ImageCarousel slides={slides} sizes="(max-width: 1024px) 90vw, 520px" />
      </div>
      <p className="relative border-t border-white/12 bg-ink-900/80 px-5 py-3 text-eyebrow uppercase text-white/55">
        {names} — Sproutflow&apos;s own systems
      </p>
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
        <p className="text-eyebrow uppercase text-white/55">Growth you can see</p>

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
                stroke={i < 3 ? '#D9A441' : '#223528'}
                strokeOpacity={i < 3 ? 0.85 - i * 0.18 : 0.55}
                strokeWidth={i === 0 ? 1.6 : 1}
                strokeDasharray={i === 0 ? '4 6' : undefined}
              />
            ))}
            <circle cx="150" cy="150" r="9" fill="#D9A441" fillOpacity="0.9" />
          </svg>

          <p className="absolute inset-x-0 bottom-1 text-center font-mono text-mono-meta text-white/55">
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
