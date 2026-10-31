/**
 * The Lead Machine: the timeline. Named states (STATES.md, cut to three
 * cards) and the keyframe tracks for the Web Animations API. Pure: no DOM,
 * so it runs in tests and the numbers stay in one place.
 *
 * One loop: 6.5 s of action, then 2.9 s at rest on the fixed frame.
 */

import {
  ARM,
  CARDS,
  LayoutName,
  OUT_CENTRE,
  Point,
  SLOTS,
  cardToScene,
  ringSamples,
  rowTarget,
  solveArm,
} from './config';

/** Seconds from one card's red-pen moment to the next. */
export const SPACING = 1.4;
/** When the pen reaches the first card. */
export const FIRST_MARK = 1.0;
/** When the fixed (rest) state begins: the leaf grows, the note appears. */
export const ACTION = 6.5;
/** One loop, in seconds: ACTION plus 2.9 s at rest. */
export const CYCLE = 9.4;

const markAt = (i: number) => FIRST_MARK + SPACING * i;
const intoAt = (i: number) => markAt(i) + 1.05;
const bookedAt = (i: number) => intoAt(i) + 0.45;
const dropAt = (i: number) => bookedAt(i) + 0.75;
const arriveAt = (i: number) => 0.35 + 0.15 * i;

// ---------------------------------------------------------------------------
// Named states (the data-state test hook)
// ---------------------------------------------------------------------------

type CardId = (typeof CARDS)[number]['id'];
export type MachineState =
  | 'clear'
  | 'pile-up'
  | `mark-${CardId}`
  | `into-machine-${CardId}`
  | `booked-${CardId}`
  | `calendar-${CardId}`
  | 'fixed';

export interface StateEntry {
  name: MachineState;
  /** Seconds from the start of a loop. */
  at: number;
}

/**
 * Every named state in start order. The current state is the last one that
 * has started; cards overlap (the pen marks the next card while the last one
 * comes out booked), so a state means "the most recent thing that began".
 */
export const STATES: readonly StateEntry[] = [
  { name: 'clear' as MachineState, at: 0 },
  { name: 'pile-up' as MachineState, at: 0.35 },
  ...CARDS.flatMap((card, i) => [
    { name: `mark-${card.id}` as MachineState, at: markAt(i) },
    { name: `into-machine-${card.id}` as MachineState, at: intoAt(i) },
    { name: `booked-${card.id}` as MachineState, at: bookedAt(i) },
    { name: `calendar-${card.id}` as MachineState, at: dropAt(i) },
  ]),
  { name: 'fixed' as MachineState, at: ACTION },
].sort((a, b) => a.at - b.at);

/** The named state at `t` seconds (any t; it wraps at CYCLE). */
export function stateAt(t: number): MachineState {
  const local = ((t % CYCLE) + CYCLE) % CYCLE;
  let current = STATES[0].name;
  for (const s of STATES) {
    if (s.at <= local + 1e-9) current = s.name;
    else break;
  }
  return current;
}

// ---------------------------------------------------------------------------
// Tracks
// ---------------------------------------------------------------------------

/** What an animated element is called in the scene: its `data-hm` attribute. */
export interface Track {
  target: string;
  keyframes: Keyframe[];
}

type Props = { x?: number; y?: number; r?: number; s?: number; o?: number; d?: number };
type Frame = [number, Props, string?];

const EASE = 'cubic-bezier(.45,0,.25,1)';
const OUT = 'cubic-bezier(.2,.7,.3,1)';
const IN = 'cubic-bezier(.55,0,.85,.35)';
const POP = 'cubic-bezier(.3,1.5,.5,1)';
const LINEAR = 'linear';

const TF = (s: Props): Keyframe => ({
  transform: `translate(${s.x ?? 0}px,${s.y ?? 0}px) rotate(${s.r ?? 0}deg) scale(${s.s ?? 1})`,
});
const ROT = (s: Props): Keyframe => ({ transform: `rotate(${s.r ?? 0}deg)` });
const SCALE = (s: Props): Keyframe => ({ transform: `scale(${s.s ?? 1})` });
const OPACITY = (s: Props): Keyframe => ({ opacity: s.o ?? 1 });
const DASH = (s: Props): Keyframe => ({ strokeDashoffset: String(s.d ?? 0) });

/**
 * One keyframe track spanning the whole loop. Each frame is
 * [seconds, state change, easing to the next frame]; state accumulates, so
 * `{}` means "hold what you had until now".
 */
function track(target: string, render: (s: Props) => Keyframe, frames: Frame[]): Track {
  const sorted = frames.slice().sort((a, b) => a[0] - b[0]);
  if (sorted[0][0] > 0) sorted.unshift([0, sorted[0][1]]);
  let state: Props = {};
  const keyframes: Keyframe[] = sorted.map(([t, change, easing]) => {
    state = { ...state, ...change };
    return { ...render(state), offset: Math.min(1, t / CYCLE), easing: easing ?? LINEAR };
  });
  if ((keyframes[keyframes.length - 1].offset as number) < 1) keyframes.push({ ...render(state), offset: 1 });
  return { target, keyframes };
}

const ease3 = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

/** The pen tip's path through one loop: [seconds, scene point]. */
export function armPath(widths: readonly number[]): [number, Point][] {
  const pts: [number, Point][] = [
    [0, ARM.park],
    [0.6, ARM.park],
  ];
  const glide = (t0: number, t1: number, a: Point, b: Point, n = 8) => {
    for (let k = 1; k <= n; k++) {
      const u = ease3(k / n);
      pts.push([t0 + ((t1 - t0) * k) / n, [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]]);
    }
  };
  let last: Point = ARM.park;
  const n = CARDS.length;
  CARDS.forEach((_, i) => {
    const m = markAt(i);
    const ring = ringSamples(widths[i], 24).map(cardToScene);
    glide(i === 0 ? 0.6 : m, m + 0.3, last, ring[0]);
    ring.slice(1).forEach((p, k) => pts.push([m + 0.3 + (0.5 * (k + 1)) / 24, p]));
    const end = ring[ring.length - 1];
    const lift: Point = [end[0] + 4, end[1] - 18];
    glide(m + 0.8, m + 1.0, end, lift, 4);
    pts.push([i < n - 1 ? markAt(i + 1) : m + 1.0, lift]);
    last = lift;
  });
  glide(markAt(n - 1) + 1.0, markAt(n - 1) + 1.6, last, ARM.park, 10);
  return pts;
}

/**
 * Every keyframe track for one loop.
 * @param layout which calendar the booked cards drop into
 * @param widths measured width of each card's message (scene units); sizes the red ring
 */
export function buildTracks(layout: LayoutName, widths: readonly number[] = CARDS.map((c) => c.mainWidth)): Track[] {
  const tracks: Track[] = [];
  const slot = (k: number): Props => ({ x: SLOTS[k][0], y: SLOTS[k][1], r: SLOTS[k][2], s: 1 });

  // Inquiries: ride in, pile up, step forward, get marked, go into the machine.
  CARDS.forEach((_, i) => {
    const arrive = arriveAt(i);
    const own = slot(i);
    const move: Frame[] = [
      [0, { ...own, x: (own.x ?? 0) - 225, y: (own.y ?? 0) - 130 }],
      [arrive, {}, OUT],
      [arrive + 0.65, own],
    ];
    for (let k = 0; k < i; k++) move.push([intoAt(k) + 0.05, slot(i - k), EASE], [intoAt(k) + 0.4, slot(i - k - 1)]);
    move.push([intoAt(i), slot(0), IN], [intoAt(i) + 0.4, { x: 100, y: 58, r: 0, s: 0.5 }]);
    tracks.push(track(`inq-${i}`, TF, move));
    tracks.push(
      track(`inq-${i}`, OPACITY, [
        [0, { o: 0 }],
        [arrive, {}],
        [arrive + 0.25, { o: 1 }],
        [intoAt(i) + 0.15, {}],
        [intoAt(i) + 0.4, { o: 0 }],
      ])
    );
    // The ring has pathLength=100, so the dash runs 100 to 0 whatever its size.
    tracks.push(track(`ring-${i}`, DASH, [[0, { d: 100 }], [markAt(i) + 0.3, {}], [markAt(i) + 0.8, { d: 0 }]]));
    tracks.push(track(`note-${i}`, OPACITY, [[0, { o: 0 }], [markAt(i) + 0.75, {}], [markAt(i) + 0.95, { o: 1 }]]));
  });

  // Marker arm: IK per sample, angles unwrapped so no joint spins the long way round.
  const angles: [number, Props][][] = [[], [], []];
  let prev: number[] | null = null;
  for (const [t, p] of armPath(widths)) {
    const a = solveArm(p[0], p[1]);
    if (prev) {
      for (let j = 0; j < 3; j++) {
        while (a[j] - prev[j] > 180) a[j] -= 360;
        while (a[j] - prev[j] < -180) a[j] += 360;
      }
    }
    prev = a;
    a.forEach((v, j) => angles[j].push([t, { r: v }]));
  }
  ['a1', 'a2', 'a3'].forEach((id, j) => tracks.push(track(id, ROT, angles[j] as Frame[])));

  // Booked cards pop out of the front slot and drop onto the calendar.
  CARDS.forEach((_, i) => {
    const e = bookedAt(i);
    const d = dropAt(i);
    const [tx, ty] = rowTarget(layout, i);
    const dx = tx - OUT_CENTRE[0];
    const dy = ty - OUT_CENTRE[1];
    tracks.push(
      track(`bk-${i}`, TF, [
        [0, { x: -40, y: -23, s: 0.5 }],
        [e, {}, OUT],
        [e + 0.45, { x: 0, y: 0, s: 1 }],
        [d, {}, OUT],
        [d + 0.16, { x: dx * 0.12, y: -12, s: 0.92 }, IN],
        [d + 0.5, { x: dx, y: dy, s: 0.4 }],
      ])
    );
    tracks.push(track(`bk-${i}`, OPACITY, [[0, { o: 0 }], [e, {}], [e + 0.12, { o: 1 }], [d + 0.36, {}], [d + 0.5, { o: 0 }]]));
    tracks.push(track(`row-${i}`, OPACITY, [[0, { o: 1 }], [0.1, {}], [0.5, { o: 0 }], [d + 0.34, {}], [d + 0.54, { o: 1 }]]));
  });

  // Dial: drops to red as the week clears, ticks toward gold with each booking.
  const needle: Frame[] = [[0, { r: 60 }], [0.2, {}, EASE], [0.9, { r: -60 }]];
  CARDS.forEach((_, k) => needle.push([dropAt(k) + 0.3, {}, POP], [dropAt(k) + 0.6, { r: -60 + (120 * (k + 1)) / CARDS.length }]));
  tracks.push(track('needle', ROT, needle));

  // Rest details: lamp, new leaf, "nothing piling up".
  tracks.push(track('lamp', OPACITY, [[0, { o: 1 }], [0.3, { o: 0 }], [ACTION - 0.2, {}], [ACTION + 0.1, { o: 1 }]]));
  tracks.push(track('newleaf', SCALE, [[0, { s: 1 }], [0.4, { s: 0 }], [ACTION - 0.2, {}, POP], [ACTION + 0.3, { s: 1 }]]));
  tracks.push(track('restnote', OPACITY, [[0, { o: 1 }], [0.3, { o: 0 }], [ACTION - 0.1, {}], [ACTION + 0.4, { o: 1 }]]));
  // Belt slats run while there is work; -306 is a whole number of dash periods (4 + 14).
  tracks.push(track('slats', DASH, [[0, { d: 0 }], [0.35, {}], [ACTION, { d: -306 }]]));

  // Steps under the diagram light in sync; all lit at rest.
  [0.35, FIRST_MARK, bookedAt(0)].forEach((t, i) =>
    tracks.push(track(`step-${i + 1}`, OPACITY, [[0, { o: 1 }], [0.25, { o: 0.38 }], [t, {}], [t + 0.25, { o: 1 }]]))
  );

  return tracks;
}
