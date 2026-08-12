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
        className={`rounded-[1.75rem] border-[6px] border-ink-800 bg-ink-800 shadow-2xl ${className}`}
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
        className={`overflow-hidden rounded-xl border border-ink-800/25 bg-white shadow-xl ${className}`}
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
      <div className="rounded-t-xl border-[10px] border-b-0 border-ink-800 bg-ink-800 shadow-2xl">
        <div className="relative h-[330px] overflow-hidden bg-white">{children}</div>
      </div>
      {/* Base */}
      <div className="h-3 rounded-b-xl bg-ink-700" />
      <div className="mx-auto h-1 w-1/4 rounded-b-md bg-ink-800/60" />
    </div>
  );
}
