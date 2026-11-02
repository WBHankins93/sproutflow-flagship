import { useId, type CSSProperties } from 'react';
import { REDLINE_SHAPES, type RedlineShapeName } from './shapes';

interface RedlineShapeProps {
  shape: RedlineShapeName;
  className?: string;
  /** Seconds between the paths of a multi-stroke shape (arrow shaft, then head). */
  stepGap?: number;
}

/**
 * One hand-drawn shape: visible non-scaling strokes, masked by a fat stroke
 * that follows the same path. Animating the mask's stroke-dashoffset (see
 * app/globals.css) draws the line on. Always decorative.
 */
export default function RedlineShape({ shape, className = '', stepGap = 0.35 }: RedlineShapeProps) {
  const maskId = `rl-${useId().replace(/[^A-Za-z0-9_-]/g, '')}`;
  const def = REDLINE_SHAPES[shape];

  return (
    <svg
      className={`redline-shape ${className}`.trim()}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-50" y="-50" width="200" height="200">
          {def.paths.map((path, i) => (
            <path
              key={path.d}
              className="redline-reveal"
              d={path.d}
              strokeWidth={def.reveal}
              strokeDasharray={`${path.len} ${path.len}`}
              style={{ '--redline-len': path.len, '--redline-step': `${i * stepGap}s` } as CSSProperties}
            />
          ))}
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        {def.paths.map((path) => (
          <path key={path.d} className="redline-stroke" d={path.d} />
        ))}
      </g>
    </svg>
  );
}
