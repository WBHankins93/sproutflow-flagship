'use client';

import type { HTMLAttributes, ReactNode, RefObject } from 'react';
import { useRedlineDraw } from './useRedlineDraw';

interface DrawOnProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'span';
  enabled?: boolean;
  threshold?: number;
  children: ReactNode;
}

/**
 * The only client piece of the Redline kit. Wraps server-rendered marks and
 * sets `data-redline-draw` on itself; app/globals.css does the drawing.
 */
export default function DrawOn({ as = 'div', enabled = true, threshold, children, ...rest }: DrawOnProps) {
  const { ref, state } = useRedlineDraw<HTMLElement>({ enabled, threshold });
  const drawAttr = state === 'static' ? undefined : state;

  if (as === 'span') {
    return (
      <span ref={ref as RefObject<HTMLSpanElement>} data-redline-draw={drawAttr} {...rest}>
        {children}
      </span>
    );
  }

  return (
    <div ref={ref as RefObject<HTMLDivElement>} data-redline-draw={drawAttr} {...rest}>
      {children}
    </div>
  );
}
