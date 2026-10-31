import type { ReactNode } from 'react';

export interface EyebrowProps {
  children: ReactNode;
  /** Optional section number, e.g. "01". Red on light canvases, gold on Pine, Birch on Fern. */
  index?: string;
  /** Set on Pine sections. */
  onDark?: boolean;
  /** Set on Fern sections. Label and index both Birch (5.38:1): the soft tones fail on Fern. */
  onFern?: boolean;
  as?: 'p' | 'span' | 'div';
  className?: string;
}

/**
 * Fira Code label above a heading: capitals, tracked, tabular figures.
 * Ink-soft on light canvases (5.54:1 on Leaf, 6.63:1 on Birch), #C9CFC4 on
 * Pine (8.21:1), Birch on Fern (5.38:1).
 */
export default function Eyebrow({ children, index, onDark = false, onFern = false, as: Tag = 'p', className = '' }: EyebrowProps) {
  const label = onFern ? 'text-cream-300' : onDark ? 'text-[#C9CFC4]' : 'text-[#4A574D]';
  const number = onFern ? 'text-cream-300' : onDark ? 'text-accent-300' : 'text-redline';
  return (
    <Tag
      className={[
        'flex items-center gap-[0.6em] font-mono text-label uppercase tabular-nums [font-variant-ligatures:none]',
        label,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {index && <span className={number}>{index}</span>}
      <span>{children}</span>
    </Tag>
  );
}
