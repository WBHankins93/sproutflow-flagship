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
 * Screen area for the laptop and browser frames.
 *
 * Site captures in data/projectProof.ts run about 1.83:1 to 1.93:1. The old
 * 16:10 screen covered them by trimming roughly 7 percent off each side, which
 * cut logos and nav ("ond Line Psychiatry"). At 15:8 (1.875:1) the client
 * captures fill the width with at most about 1.5 percent per side lost on the
 * widest one, and narrower captures (16:10 product screens, the 1.45:1
 * storefront) lose only below-the-fold content at the bottom. Any image inside
 * is forced to cover, anchored top center, so callers need no fit classes of
 * their own. Close to the 620px frame / 330px screen in design-system-v2.
 */
export const SCREEN_ASPECT_CLASS = 'aspect-[15/8]';
export const SCREEN_MEDIA_CLASSES = '[&_img]:object-cover [&_img]:object-top';

/**
 * Chrome around a screenshot or site recording.
 *
 * Screen areas clip their contents. Any scroll transform applied to a child
 * should be capped at 15 percent of image height, or the frame shows dead
 * space at the end of each loop.
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
        <div
          data-device-screen="browser"
          className={`relative ${SCREEN_ASPECT_CLASS} overflow-hidden bg-white ${SCREEN_MEDIA_CLASSES}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width }} className={className}>
      <div className="rounded-t-xl border-[10px] border-b-0 border-ink-700 bg-ink-700 shadow-[0_24px_70px_rgba(0,0,0,0.6)] ring-1 ring-white/15">
        <div
          data-device-screen="laptop"
          className={`relative ${SCREEN_ASPECT_CLASS} overflow-hidden bg-white ${SCREEN_MEDIA_CLASSES}`}
        >
          {children}
        </div>
      </div>
      {/* Base. Lighter than the bezel so the laptop reads as an object with a
          lid and a body, not a flat rectangle. */}
      <div className="h-3 rounded-b-xl bg-gradient-to-b from-[#2E362E] to-ink-700 ring-1 ring-white/10" />
      <div className="mx-auto h-1 w-1/4 rounded-b-md bg-ink-900/70" />
    </div>
  );
}
