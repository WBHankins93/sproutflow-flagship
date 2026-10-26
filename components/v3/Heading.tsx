import type { ReactNode } from 'react';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type HeadingSize = 'hero' | 'xl' | 'lg' | 'md' | 'sm';

/** Tailwind classes per size. hero is Archivo; every other size is Instrument Serif at 400. */
export const HEADING_SIZES: Record<HeadingSize, string> = {
  hero: 'font-hero text-hero [hyphens:manual]',
  xl: 'font-display text-display-xl font-normal',
  lg: 'font-display text-display-lg font-normal',
  md: 'font-display text-display-md font-normal',
  sm: 'font-display text-display-sm font-normal',
};

const DEFAULT_SIZE: Record<HeadingLevel, HeadingSize> = { h1: 'xl', h2: 'lg', h3: 'md', h4: 'sm' };

export interface HeadingProps {
  /** Semantic level. Default h2. */
  as?: HeadingLevel;
  /** Visual size, independent of level. Default: h1 xl, h2 lg, h3 md, h4 sm. */
  size?: HeadingSize;
  id?: string;
  /**
   * One word of `children` (exact, case sensitive) to set in Instrument Serif
   * italic. One italic word per heading at most, and not in every section.
   * Needs `children` to be a plain string.
   */
  italic?: string;
  className?: string;
  children: ReactNode;
}

function withItalic(children: ReactNode, italic?: string): ReactNode {
  if (!italic) return children;
  if (process.env.NODE_ENV !== 'production' && italic.trim().split(/\s+/).length > 1) {
    // eslint-disable-next-line no-console
    console.warn(`[Heading] italic should be one word, got "${italic}"`);
  }
  if (typeof children !== 'string') return children;
  const at = children.indexOf(italic);
  if (at === -1) return children;
  return (
    <>
      {children.slice(0, at)}
      <em className="font-display font-normal italic">{italic}</em>
      {children.slice(at + italic.length)}
    </>
  );
}

/**
 * v3 heading. `size="hero"` is the one Archivo headline per page; every
 * other size renders the display serif at weight 400 (never bold).
 * Colour is inherited from the Section tone.
 */
export default function Heading({ as: Tag = 'h2', size, id, italic, className = '', children }: HeadingProps) {
  const resolved = size ?? DEFAULT_SIZE[Tag];
  return (
    <Tag
      id={id}
      data-size={resolved}
      className={[HEADING_SIZES[resolved], '[text-wrap:balance]', className].filter(Boolean).join(' ')}
    >
      {withItalic(children, italic)}
    </Tag>
  );
}
