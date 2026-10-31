'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Draw-on state for Redline marks.
 *
 * - `static`: render drawn. The server render, no JS, reduced motion, no
 *   IntersectionObserver, or the element was already on screen when the page
 *   hydrated (hiding it then would flash).
 * - `armed`: hidden, waiting to scroll into view.
 * - `drawn`: in view; CSS animates the stroke-dashoffset to 0.
 */
export type RedlineDrawState = 'static' | 'armed' | 'drawn';

export interface UseRedlineDrawOptions {
  /** Turn the animation off and always render drawn. Default true. */
  enabled?: boolean;
  /** IntersectionObserver threshold. Default 0.35, as in the mockup. */
  threshold?: number;
}

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useRedlineDraw<T extends HTMLElement>({ enabled = true, threshold = 0.35 }: UseRedlineDrawOptions = {}) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RedlineDrawState>('static');

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return undefined;
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return undefined;

    const rect = el.getBoundingClientRect();
    const onScreen = rect.bottom > 0 && rect.top < window.innerHeight && rect.height > 0;
    if (onScreen) return undefined;

    setState('armed');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('drawn');
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, threshold]);

  return { ref, state };
}
