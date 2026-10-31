import type { CSSProperties } from 'react';
import RedlineShape from './RedlineShape';

export type RedlineVariant = 'circle' | 'underline' | 'box' | 'arrow';
export type RedlineNotePlacement = 'above' | 'below' | 'left' | 'right';
export type RedlineTone = 'redline' | 'fern';

/** Annotation notes are short by rule: 8 words at most. */
export const REDLINE_NOTE_MAX_WORDS = 8;

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export interface RedlineMarkProps {
  /** circle: ring a problem. underline: a weak line of text. box: dashed, an empty area. arrow: point at something. */
  variant: RedlineVariant;
  /** Left edge, % of the frame width (0 to 100). */
  x: number;
  /** Top edge, % of the frame height (0 to 100). */
  y: number;
  /** Width, % of the frame width. */
  w: number;
  /** Height, % of the frame height. */
  h: number;
  /** The handwritten note. 8 words or fewer. Also becomes the list entry, so it is never only visual. */
  note?: string;
  /** Plain-language explanation shown under the note in the list (phone and screen readers). */
  detail?: string;
  /** Where the note sits relative to the mark. Default 'below'. */
  notePlacement?: RedlineNotePlacement;
  /** Note max width, % of the frame width. Default 30. */
  noteWidth?: number;
  /** Note rotation in degrees. Default -2. */
  noteRotate?: number;
  /** 'redline' marks a problem; 'fern' marks the fix. Default 'redline'. */
  tone?: RedlineTone;
  /** Mirror an arrow (or any shape) horizontally, vertically or both. */
  flip?: 'x' | 'y' | 'xy';
  /** Where the phone pin sits, in % of the frame. Default: the mark's top-right corner. */
  pinAt?: { x: number; y: number };
  /** Draw-on delay in seconds. RedlineFrame staggers marks by default. */
  delay?: number;
  /** Hide this mark below 560px of frame width. */
  hideNarrow?: boolean;
  /** Pin number. RedlineFrame sets it for every mark with a note. */
  pin?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const pct = (value: number) => `${Math.round(value * 100) / 100}%`;

function notePosition(
  placement: RedlineNotePlacement,
  { x, y, w, h }: { x: number; y: number; w: number; h: number }
): CSSProperties {
  const gap = 1.5;
  switch (placement) {
    case 'above':
      return { left: pct(x), bottom: pct(100 - y + gap) };
    case 'right':
      return { left: pct(x + w + gap), top: pct(y) };
    case 'left':
      return { right: pct(100 - x + gap), top: pct(y) };
    case 'below':
    default:
      return { left: pct(x), top: pct(y + h + gap) };
  }
}

/**
 * One red-pen mark, positioned in % over a RedlineFrame's image.
 *
 * Renders the shape, the note chip (wide frames) and the numbered pin
 * (phone frames). All three are aria-hidden: the meaning lives in the
 * frame's ordered list. Use it through RedlineFrame's `marks` prop; place it
 * by hand only if you also provide the text equivalent.
 */
export default function RedlineMark({
  variant,
  x,
  y,
  w,
  h,
  note,
  notePlacement = 'below',
  noteWidth = 30,
  noteRotate = -2,
  tone = 'redline',
  flip,
  pinAt,
  delay = 0,
  hideNarrow = false,
  pin,
}: RedlineMarkProps) {
  if (process.env.NODE_ENV !== 'production' && note && countWords(note) > REDLINE_NOTE_MAX_WORDS) {
    // eslint-disable-next-line no-console
    console.warn(`[RedlineMark] Note is over ${REDLINE_NOTE_MAX_WORDS} words: "${note}"`);
  }

  const toneClass = `redline-tone-${tone}`;
  const narrowClass = hideNarrow ? 'redline-hide-narrow' : '';
  const delayStyle = { '--redline-delay': `${delay}s` } as CSSProperties;
  const pinPoint = pinAt ?? { x: clamp(x + w, 3, 97), y: clamp(y, 3, 97) };

  return (
    <>
      <span
        className={[
          'redline-mark',
          `redline-mark--${variant}`,
          flip ? `redline-mark--flip-${flip}` : '',
          toneClass,
          narrowClass,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ left: pct(x), top: pct(y), width: pct(w), height: pct(h), ...delayStyle }}
        aria-hidden="true"
        data-variant={variant}
      >
        <RedlineShape shape={variant} />
      </span>
      {note && (
        <span
          className={['redline-note', toneClass, narrowClass].filter(Boolean).join(' ')}
          style={{
            ...notePosition(notePlacement, { x, y, w, h }),
            maxWidth: pct(noteWidth),
            ...delayStyle,
            ...({ '--redline-rotate': `${noteRotate}deg` } as CSSProperties),
          }}
          aria-hidden="true"
          data-placement={notePlacement}
        >
          {note}
        </span>
      )}
      {note && pin !== undefined && (
        <span
          className={['redline-pin', toneClass].join(' ')}
          style={{ left: pct(pinPoint.x), top: pct(pinPoint.y), ...delayStyle }}
          aria-hidden="true"
        >
          {pin}
        </span>
      )}
    </>
  );
}
