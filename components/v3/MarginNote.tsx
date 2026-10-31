export type MarginNoteArrow = 'up' | 'down' | 'left' | 'right' | 'none';
export type MarginNoteTone = 'fern' | 'redline' | 'onDark' | 'onFern';

/**
 * Text colour per tone. fern: 5.40:1 on Clearing, 5.38:1 on Birch, 5.07:1 on
 * Sunlight (not on Leaf: 4.50:1). redline: 4.79:1 or more on every light
 * canvas. onDark: gold light on Pine (7.98:1). onFern: Birch on Fern (5.38:1).
 */
export const MARGIN_NOTE_TONES: Record<MarginNoteTone, string> = {
  fern: 'text-ink-700',
  redline: 'text-redline',
  onDark: 'text-accent-300',
  onFern: 'text-cream-300',
};

// The mockup arrow points up and to the right. Degrees to turn it so it points each way.
const ROTATION: Record<Exclude<MarginNoteArrow, 'none'>, number> = { up: -45, right: 45, down: 135, left: -135 };

export interface MarginNoteProps {
  /** The note. 8 words or fewer. */
  children: string;
  /** Which way the hand-drawn arrow points. Default 'down'. */
  arrow?: MarginNoteArrow;
  /** Fern for Ben's notes (default), redline for a red-pen aside, onDark on Pine, onFern on Fern. */
  tone?: MarginNoteTone;
  /** Hide from assistive tech when the note only repeats nearby text (e.g. "that's me"). */
  decorative?: boolean;
  as?: 'p' | 'span';
  className?: string;
}

function Arrow({ direction }: { direction: Exclude<MarginNoteArrow, 'none'> }) {
  return (
    <svg className="v3-margin-note-arrow" viewBox="0 0 100 100" aria-hidden="true" focusable="false" data-arrow={direction}>
      <g transform={`rotate(${ROTATION[direction]} 50 50)`}>
        <path className="redline-stroke" d="M4 96C22 78 46 40 92 8" />
        <path className="redline-stroke" d="M68 6L93 7L86 30" />
      </g>
    </svg>
  );
}

/**
 * Ben's handwritten margin note in Caveat, with a small hand-drawn arrow.
 * Annotation type is only for these notes and Redline marks.
 */
export default function MarginNote({
  children,
  arrow = 'down',
  tone = 'fern',
  decorative = false,
  as: Tag = 'p',
  className = '',
}: MarginNoteProps) {
  if (process.env.NODE_ENV !== 'production' && children.trim().split(/\s+/).length > 8) {
    // eslint-disable-next-line no-console
    console.warn(`[MarginNote] Note is over 8 words: "${children}"`);
  }
  const before = arrow === 'left' || arrow === 'up';
  return (
    <Tag
      className={[
        'inline-flex items-end gap-1 font-annotation text-annotation',
        MARGIN_NOTE_TONES[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden={decorative || undefined}
      data-tone={tone}
    >
      {arrow !== 'none' && before && <Arrow direction={arrow} />}
      <span>{children}</span>
      {arrow !== 'none' && !before && <Arrow direction={arrow} />}
    </Tag>
  );
}
