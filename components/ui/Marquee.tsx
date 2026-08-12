import type { ReactNode } from 'react';

export type MarqueeVariant = 'names' | 'promises' | 'ghost';

interface MarqueeProps {
  /** Loop duration in seconds. Longer is slower. */
  speed?: number;
  items: ReactNode[];
  variant?: MarqueeVariant;
  className?: string;
  /** Accessible description of the strip. */
  ariaLabel?: string;
}

const VARIANTS: Record<MarqueeVariant, { wrap: string; item: string; separator: string }> = {
  names: {
    wrap: 'bg-cream-300 py-[26px]',
    item: 'px-7',
    separator: 'text-accent-500',
  },
  promises: {
    // Hairline borders on ink, never a gold fill. The gold band was rejected.
    wrap: 'grain border-y border-white/15 bg-ink-900 py-4 text-white/70',
    item: 'px-6 text-eyebrow uppercase',
    separator: 'text-accent-400',
  },
  ghost: {
    wrap: 'py-2 text-white/[0.14]',
    item: 'px-8 font-display text-[clamp(2.5rem,7vw,78px)] leading-none',
    separator: 'hidden',
  },
};

/**
 * Horizontal marquee.
 *
 * Children are duplicated once and the track translates -50%, which loops
 * seamlessly. The duplicate is aria-hidden so screen readers read the list
 * once. Motion is disabled under prefers-reduced-motion by .marquee-track,
 * where the strip simply renders static.
 */
export default function Marquee({
  speed = 40,
  items,
  variant = 'names',
  className = '',
  ariaLabel,
}: MarqueeProps) {
  const styles = VARIANTS[variant];

  const renderRun = (hidden: boolean) => (
    <div className="flex items-center" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <div key={index} className="flex flex-none items-center">
          <div className={styles.item}>{item}</div>
          {styles.separator !== 'hidden' && (
            <span className={`${styles.separator} text-[5px]`} aria-hidden="true">
              &#9679;
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`relative overflow-hidden ${styles.wrap} ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      <div className="mask-fade-x">
        <div
          className="marquee-track"
          style={{ ['--marquee-duration' as string]: `${speed}s` }}
        >
          {renderRun(false)}
          {renderRun(true)}
        </div>
      </div>
    </div>
  );
}
