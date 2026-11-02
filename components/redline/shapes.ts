/**
 * Hand-drawn shapes for the Redline kit, ported from the `.mk-*` symbols in
 * redesign-proposals/redline/index.html.
 *
 * Every shape is drawn in a 100 x 100 viewBox that the mark stretches to its
 * % box (preserveAspectRatio="none"). The visible stroke is non-scaling, so
 * line weight stays constant. `len` is each path's length in viewBox units,
 * measured once, and drives the stroke-dashoffset draw-on. `reveal` is the
 * width of the masking stroke that follows the path during the draw.
 */
export interface RedlinePath {
  d: string;
  len: number;
}

export interface RedlineShapeDef {
  reveal: number;
  paths: readonly RedlinePath[];
}

export const REDLINE_SHAPES = {
  circle: {
    reveal: 24,
    paths: [{ d: 'M60 5C83 6 98 24 96 52C94 80 70 97 45 95C19 93 3 73 5 47C7 21 28 4 55 7C64 8 70 11 74 14', len: 306 }],
  },
  underline: {
    reveal: 40,
    paths: [
      { d: 'M1 55C22 38 46 68 70 48C82 39 91 44 99 40', len: 104 },
      { d: 'M8 88C30 74 58 92 92 76', len: 87 },
    ],
  },
  box: {
    reveal: 24,
    paths: [{ d: 'M3 4L97 2L98 97L2 96Z', len: 378 }],
  },
  arrow: {
    reveal: 24,
    paths: [
      { d: 'M4 96C22 78 46 40 92 8', len: 126 },
      { d: 'M68 6L93 7L86 30', len: 50 },
    ],
  },
  // One wave per word for RedlineUnderline. Starts and ends at y=60 so the
  // waves of neighbouring words join into one line.
  squiggle: {
    reveal: 60,
    paths: [{ d: 'M0 60C18 40 34 78 52 58C68 42 84 70 100 60', len: 110 }],
  },
} as const satisfies Record<string, RedlineShapeDef>;

export type RedlineShapeName = keyof typeof REDLINE_SHAPES;
