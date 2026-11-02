import type { ReactNode } from 'react';
import DrawOn from './DrawOn';
import RedlineMark, { type RedlineMarkProps } from './RedlineMark';

export type RedlineMarkSpec = Omit<RedlineMarkProps, 'pin'>;

export interface RedlineFrameProps {
  /** The image or illustration being marked up. It fills the frame width. */
  children: ReactNode;
  /** Marks in reading order. Every mark with a note gets a pin number and a list entry. */
  marks?: readonly RedlineMarkSpec[];
  /** Accessible name for the list of notes. Default "What I marked". */
  listLabel?: string;
  /**
   * 'auto' (default): notes on the image, numbered pins + list below 560px
   * of frame width. 'always': pins + list at every width.
   */
  pins?: 'auto' | 'always';
  /** Draw marks on when they scroll into view. Default true. */
  drawOn?: boolean;
  /** Optional caption under the image (and under the list on phones). */
  caption?: ReactNode;
  className?: string;
}

/** Seconds between marks when a mark sets no delay. Matches the mockup. */
export const REDLINE_STAGGER = 0.4;

/**
 * A position:relative frame for an image with Redline marks over it. The
 * frame is a CSS size container (`.redline-frame` in app/globals.css), so
 * the phone pin fallback follows the frame's own width, not the viewport.
 *
 * Server component. Only the draw-on wrapper (DrawOn) runs on the client.
 */
export default function RedlineFrame({
  children,
  marks = [],
  listLabel = 'What I marked',
  pins = 'auto',
  drawOn = true,
  caption,
  className = '',
}: RedlineFrameProps) {
  let count = 0;
  const numbered = marks.map((mark, index) => ({
    mark,
    delay: mark.delay ?? 0.1 + index * REDLINE_STAGGER,
    pin: mark.note ? ++count : undefined,
  }));
  const listed = numbered.filter((item) => item.pin !== undefined);

  return (
    <DrawOn
      enabled={drawOn}
      className={['redline-frame', pins === 'always' ? 'redline-frame--pins' : '', className].filter(Boolean).join(' ')}
      data-redline-pins={pins}
    >
      <figure className="redline-figure">
        <div className="redline-canvas">
          {children}
          {numbered.map(({ mark, delay, pin }, index) => (
            <RedlineMark key={index} {...mark} delay={delay} pin={pin} />
          ))}
        </div>
        {listed.length > 0 && (
          <ol className="redline-list" aria-label={listLabel}>
            {listed.map(({ mark, pin }) => (
              <li key={pin} className={`redline-list-item redline-tone-${mark.tone ?? 'redline'}`}>
                <span className="redline-list-num" aria-hidden="true">
                  {pin}
                </span>
                <span>
                  <span className="redline-list-note">{mark.note}</span>
                  {mark.detail && <span className="redline-list-detail">{mark.detail}</span>}
                </span>
              </li>
            ))}
          </ol>
        )}
        {caption && (
          <figcaption className="mt-3 font-body text-body-sm text-[#4A574D]">{caption}</figcaption>
        )}
      </figure>
    </DrawOn>
  );
}
