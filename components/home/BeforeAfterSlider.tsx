'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

export interface BeforeAfterSliderProps {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  /** Accessible name of the range input. */
  label: string;
  /** Visible hint under the frame. */
  hint: string;
  sizes?: string;
  className?: string;
}

/**
 * Compact before/after comparison. A native range input over the frame does
 * the work, so mouse, touch and arrow keys all move the divider and screen
 * readers get a real slider. Both images stay in the DOM with their own alt
 * text. Renders at 50% on the server and without JavaScript.
 */
export default function BeforeAfterSlider({
  before,
  after,
  label,
  hint,
  sizes = '(min-width: 1024px) 600px, 100vw',
  className = '',
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const hintId = useId();

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-primary-900/15 bg-primary-900">
        <Image src={after.src} alt={after.alt} fill sizes={sizes} className="object-cover object-top" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={before.src} alt={before.alt} fill sizes={sizes} className="object-cover object-top" />
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={label}
          aria-describedby={hintId}
          aria-valuetext={`${position}% old site, ${100 - position}% new site`}
          className="peer absolute inset-0 z-10 h-full w-full cursor-ew-resize appearance-none opacity-0 [touch-action:pan-y]"
        />

        {/* Divider and handle. Decorative; the range input carries the meaning. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-cream-300"
          style={{ left: `${position}%` }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream-300 bg-primary-900 text-cream-300 shadow-md peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-accent-300"
          style={{ left: `${position}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#FBF8F1] px-3 py-1 font-mono text-label uppercase text-primary-900 [font-variant-ligatures:none]"
        >
          Before
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 rounded-full bg-[#FBF8F1] px-3 py-1 font-mono text-label uppercase text-primary-900 [font-variant-ligatures:none]"
        >
          After
        </span>
      </div>
      <p id={hintId} className="mt-2 font-body text-body-sm text-[#4A574D]">
        {hint}
      </p>
    </div>
  );
}
