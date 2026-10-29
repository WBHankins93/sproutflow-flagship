'use client';

/**
 * The Lead Machine: the homepage hero diagram.
 *
 * The server renders the fixed (rest) frame. After hydration, and only when
 * motion is allowed, the Web Animations API plays the loop from timeline.ts.
 * It pauses with the button (WCAG 2.2.2), when the diagram is off screen and
 * when the tab is hidden. `data-state` on the root names the current state;
 * `data-motion` is static, running or paused.
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { CARDS, LAYOUTS, MACHINE_LABEL, PHONE_BREAKPOINT, STEPS, type LayoutName } from './config';
import { CYCLE, buildTracks, stateAt } from './timeline';
import Scene from './Scene';
import s from './HeroMachine.module.css';

export interface HeroMachineProps {
  className?: string;
}

type Motion = 'static' | 'running' | 'paused';

const FALLBACK_WIDTHS = CARDS.map((card) => card.mainWidth);

const pct = (n: number) => `${Math.round(n * 100000) / 1000}%`;

/** The phone crop as CSS, derived from the two viewBoxes so config.ts stays the one source. */
function cropVars(): CSSProperties {
  const [dx, dy, dw, dh] = LAYOUTS.desktop.viewBox;
  const [px, py, pw, ph] = LAYOUTS.phone.viewBox;
  return {
    '--hm-desktop-ar': `${dw} / ${dh}`,
    '--hm-phone-ar': `${pw} / ${ph}`,
    '--hm-phone-w': pct(dw / pw),
    '--hm-phone-h': pct(dh / ph),
    '--hm-phone-x': pct((dx - px) / pw),
    '--hm-phone-y': pct((dy - py) / ph),
  } as CSSProperties;
}
const CROP_VARS = cropVars();

function reducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function canAnimate(): boolean {
  return typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';
}

/** Fonts change text widths; wait for them, but never longer than 1.5 s. */
function fontsReady(): Promise<unknown> {
  const fonts = typeof document !== 'undefined' ? document.fonts : undefined;
  if (!fonts?.ready) return Promise.resolve();
  return Promise.race([fonts.ready, new Promise((resolve) => setTimeout(resolve, 1500))]);
}

export function HeroMachine({ className }: HeroMachineProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const anims = useRef<Animation[]>([]);
  const flags = useRef({ user: false, onScreen: true, allowed: false });
  const frame = useRef(0);

  const [allowed, setAllowed] = useState(false);
  const [layout, setLayout] = useState<LayoutName>('desktop');
  const [widths, setWidths] = useState<readonly number[]>(FALLBACK_WIDTHS);
  const [userPaused, setUserPaused] = useState(false);
  const [motion, setMotion] = useState<Motion>('static');

  /** Write the named state for the current time. Direct DOM write: it changes many times a second. */
  const writeState = useCallback(() => {
    const root = rootRef.current;
    const first = anims.current[0];
    if (!root) return;
    const ms = first ? Number(first.currentTime ?? 0) : null;
    root.dataset.state = ms === null ? 'fixed' : stateAt(ms / 1000);
  }, []);

  const sync = useCallback(() => {
    const f = flags.current;
    if (!f.allowed || anims.current.length === 0) {
      cancelAnimationFrame(frame.current);
      setMotion('static');
      return;
    }
    const run = !f.user && f.onScreen && !document.hidden;
    anims.current.forEach((a) => (run ? a.play() : a.pause()));
    setMotion(run ? 'running' : 'paused');
    cancelAnimationFrame(frame.current);
    writeState();
    if (run && typeof requestAnimationFrame === 'function') {
      const tick = () => {
        writeState();
        frame.current = requestAnimationFrame(tick);
      };
      frame.current = requestAnimationFrame(tick);
    }
  }, [writeState]);

  // Decide whether to animate at all: reduced motion, WAAPI support, fonts, layout.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !canAnimate()) return undefined;
    let alive = true;

    const decide = () => {
      const ok = !reducedMotion();
      flags.current.allowed = ok;
      setAllowed(ok);
    };

    const measureLayout = () => {
      const width = root.getBoundingClientRect().width;
      setLayout(width > 0 && width < PHONE_BREAKPOINT ? 'phone' : 'desktop');
    };

    fontsReady().then(() => {
      if (!alive) return;
      const measured = CARDS.map((card, i) => {
        const el = root.querySelector(`[data-hm="main-${i}"]`) as SVGTextContentElement | null;
        try {
          const w = el?.getComputedTextLength?.();
          return w && Number.isFinite(w) && w > 0 ? Math.round(w * 10) / 10 : card.mainWidth;
        } catch {
          return card.mainWidth;
        }
      });
      if (measured.some((w, i) => Math.abs(w - FALLBACK_WIDTHS[i]) > 0.5)) setWidths(measured);
      measureLayout();
      decide();
    });

    const mq = typeof window.matchMedia === 'function' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    mq?.addEventListener?.('change', decide);
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(measureLayout) : null;
    ro?.observe(root);

    return () => {
      alive = false;
      mq?.removeEventListener?.('change', decide);
      ro?.disconnect();
    };
  }, []);

  // Build the loop for the current layout and keep it in step with the page.
  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!allowed || !root || !stage) return undefined;

    const resumeAt = anims.current[0]?.currentTime ?? 0;
    anims.current.forEach((a) => a.cancel());
    const built: Animation[] = [];
    for (const { target, keyframes } of buildTracks(layout, widths)) {
      root.querySelectorAll(`[data-hm="${target}"]`).forEach((el) => {
        const a = el.animate(keyframes, { duration: CYCLE * 1000, iterations: Infinity });
        a.pause();
        a.currentTime = resumeAt;
        built.push(a);
      });
    }
    anims.current = built;

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver === 'function') {
      io = new IntersectionObserver(
        (entries) => {
          flags.current.onScreen = entries.some((entry) => entry.isIntersecting);
          sync();
        },
        { threshold: 0.15 }
      );
      io.observe(stage);
    } else {
      flags.current.onScreen = true;
    }
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', sync);
      cancelAnimationFrame(frame.current);
      built.forEach((a) => a.cancel());
      anims.current = [];
      root.dataset.state = 'fixed';
      setMotion('static');
    };
  }, [allowed, layout, widths, sync]);

  const togglePause = () => {
    const next = !flags.current.user;
    flags.current.user = next;
    setUserPaused(next);
    sync();
  };

  return (
    <div
      ref={rootRef}
      className={[s.root, className].filter(Boolean).join(' ')}
      style={CROP_VARS}
      data-state="fixed"
      data-motion={motion}
    >
      <div ref={stageRef} className={s.stage} role="img" aria-label={MACHINE_LABEL}>
        <Scene widths={widths} />
      </div>
      <div className={s.controls}>
        <ol className={s.steps} aria-label="What the diagram shows">
          {STEPS.map((step) => (
            <li key={step.n} className={s.step}>
              <span
                className={step.tone === 'fix' ? `${s.stepNum} ${s.stepFix}` : s.stepNum}
                data-hm={`step-${step.n}`}
                aria-hidden="true"
              >
                {step.n}
              </span>
              {step.text}
            </li>
          ))}
        </ol>
        <button
          type="button"
          className={s.pause}
          aria-pressed={userPaused}
          disabled={motion === 'static'}
          onClick={togglePause}
        >
          <svg className={s.iconPause} viewBox="0 0 14 14" aria-hidden="true" focusable="false">
            <rect x="2" y="1" width="3.5" height="12" rx="1" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
          </svg>
          <svg className={s.iconPlay} viewBox="0 0 14 14" aria-hidden="true" focusable="false">
            <path d="M3 1.2v11.6L12.5 7z" />
          </svg>
          <span>{userPaused ? 'Play animation' : 'Pause animation'}</span>
        </button>
      </div>
    </div>
  );
}

export default HeroMachine;
