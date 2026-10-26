import { Fragment, type CSSProperties } from 'react';
import DrawOn from './DrawOn';
import RedlineShape from './RedlineShape';

export interface RedlineUnderlineProps {
  /** The headline words to underline. Plain text; keep it to a short phrase. */
  children: string;
  /** 'redline' on light canvases; 'goldenrod' on Pine, where red fails contrast. */
  tone?: 'redline' | 'goldenrod';
  /** Draw on when scrolled into view. Default true. */
  drawOn?: boolean;
  className?: string;
}

/** Seconds between words, so the pen moves left to right. */
const WORD_STEP = 0.22;

/**
 * Hand-drawn red underline under headline words. Each word is an
 * inline-block with its own wave sized to it, and the spaces between words
 * stay plain text, so the phrase wraps between words at any width and every
 * word keeps a complete wave. Decorative: the words stay plain text.
 */
export default function RedlineUnderline({
  children,
  tone = 'redline',
  drawOn = true,
  className = '',
}: RedlineUnderlineProps) {
  const words = children.trim().split(/\s+/).filter(Boolean);

  return (
    <DrawOn
      as="span"
      enabled={drawOn}
      className={['redline-underline', `redline-underline--${tone}`, className].filter(Boolean).join(' ')}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* The space stays plain text between words, so the phrase wraps there. */}
          {i > 0 && ' '}
          <span
            className="redline-underline-word"
            style={{ '--redline-delay': `${0.15 + i * WORD_STEP}s` } as CSSProperties}
          >
            {word}
            <RedlineShape shape="squiggle" />
          </span>
        </Fragment>
      ))}
    </DrawOn>
  );
}
