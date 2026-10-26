export type MarginNoteArrow = 'up' | 'down' | 'left' | 'right' | 'none';
export type MarginNoteTone = 'fern' | 'redline' | 'onDark';

/** Text colour per tone. Fern 5.38:1 on Birch, redline 5.73:1, gold 7.98:1 on Pine. */
export const MARGIN_NOTE_TONES: Record<MarginNoteTone, string> = {
  fern: 'text-ink-700',
  redline: 'text-redline',
  onDark: 'text-accent-300',
};

// The mockup arrow points up and to the right. Degrees to turn it so it points each way.
const ROTATION: Record<Exclude<MarginNoteArrow, 'none'>, number> = { up: -45, right: 45, down: 135, left: -135 };

export interface MarginNoteProps {
  /** The note. 8 words or fewer. */
  children: string;
  /** Which way the hand-drawn arrow points. Default 'down'. */
  arrow?: MarginNoteArrow;
  /** Fern for Ben's notes (default), redline for a red-pen aside, onDark on Pine. */
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
