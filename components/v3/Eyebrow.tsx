import type { ReactNode } from 'react';

export interface EyebrowProps {
  children: ReactNode;
  /** Optional section number, e.g. "01". Red on light canvases, gold on Pine. */
  index?: string;
  /** Set on Pine sections. */
  onDark?: boolean;
  as?: 'p' | 'span' | 'div';
  className?: string;
}

/**
 * Fira Code label above a heading: capitals, tracked, tabular figures.
 * Ink-soft on light canvases (6.63:1 on Birch), #C9CFC4 on Pine (8.21:1).
 */
export default function Eyebrow({ children, index, onDark = false, as: Tag = 'p', className = '' }: EyebrowProps) {
  return (
    <Tag
      className={[
        'flex items-center gap-[0.6em] font-mono text-label uppercase tabular-nums [font-variant-ligatures:none]',
        onDark ? 'text-[#C9CFC4]' : 'text-[#4A574D]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {index && <span className={onDark ? 'text-accent-300' : 'text-redline'}>{index}</span>}
      <span>{children}</span>
    </Tag>
  );
}
