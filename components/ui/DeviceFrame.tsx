import type { ReactNode } from 'react';

export type DeviceKind = 'laptop' | 'phone' | 'browser';

interface DeviceFrameProps {
  kind?: DeviceKind;
  /** Frame width in px. Laptop must never be full bleed. */
  width?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Chrome around a screenshot or site recording.
 *
 * Screen areas clip their contents and expect children to use
 * `object-cover object-top`. Any scroll transform applied to a child should be
 * capped at 15 percent of image height, or the frame shows dead space at the
 * end of each loop.
 */
export default function DeviceFrame({
  kind = 'laptop',
  width,
  className = '',
  children,
}: DeviceFrameProps) {
  if (kind === 'phone') {
    return (
      <div
        style={{ width: width ?? 148 }}
        className={`rounded-[1.75rem] border-[6px] border-ink-700 bg-ink-700 shadow-[0_18px_50px_rgba(0,0,0,0.55)] ring-1 ring-white/15 ${className}`}
      >
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.25rem] bg-white">
          {children}
        </div>
      </div>
    );
  }

  if (kind === 'browser') {
    return (
      <div
        style={{ width }}
        className={`overflow-hidden rounded-xl border border-ink-700 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/15 ${className}`}
      >
        <div className="flex items-center gap-1.5 border-b border-ink-800/10 bg-cream-300 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-900/15" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-white">{children}</div>
      </div>
    );
  }

  return (
    <div style={{ width }} className={className}>
      <div className="rounded-t-xl border-[10px] border-b-0 border-ink-700 bg-ink-700 shadow-[0_24px_70px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
        <div className="relative h-[330px] overflow-hidden bg-white">{children}</div>
      </div>
      {/* Base. Lighter than the bezel so the laptop reads as an object with a
          lid and a body, not a flat rectangle. */}
      <div className="h-3 rounded-b-xl bg-gradient-to-b from-[#2E362E] to-ink-700 ring-1 ring-white/10" />
      <div className="mx-auto h-1 w-1/4 rounded-b-md bg-ink-900/70" />
    </div>
  );
}
