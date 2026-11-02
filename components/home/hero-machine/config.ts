/**
 * The Lead Machine: content and geometry. Pure data and math, no DOM, so the
 * server render, the client timeline and the tests all agree.
 *
 * Scene units are SVG user units in one shared coordinate space. The phone
 * layout reuses the same machine, cards and arm, crops tighter (so card text
 * stays at 12px or larger at 375 wide) and moves the calendar beside the
 * machine so it ends higher on the page.
 *
 * Ported from redesign-proposals/motion/machine/index.html (approved 19 Oct
 * 2026), cut from four cards to three per Ben's build notes.
 */

export type Point = readonly [number, number];

export type CardIcon = 'phone' | 'text' | 'form';

export interface MachineCard {
  id: 'call' | 'text' | 'form';
  icon: CardIcon;
  /** Mono kicker, capitals. */
  kick: string;
  /** The message itself, the bit the red pen circles. */
  main: string;
  /** Red-pen note, Caveat. */
  note: string;
  /** Fallback width of `main` in scene units (DM Sans 700, 19). Measured at runtime when fonts load. */
  mainWidth: number;
  booked: {
    job: string;
    /** On the booked card. */
    when: string;
    /** On the calendar row. */
    day: string;
    /** For the accessible label. */
    spoken: string;
  };
}

/** Three inquiries, processed in this order. The missed call is the signature moment. */
export const CARDS: readonly MachineCard[] = [
  {
    id: 'call',
    icon: 'phone',
    kick: 'MISSED CALL',
    main: '6:42 PM',
    note: 'no callback',
    mainWidth: 73,
    booked: { job: 'Call back', when: 'TUE 8:00 AM', day: 'TUE 8:00', spoken: 'Tuesday 8:00 AM, call back' },
  },
  {
    id: 'text',
    icon: 'text',
    kick: 'TEXT',
    main: 'you do fences?',
    note: 'nobody answered',
    mainWidth: 140,
    booked: { job: 'Fence quote', when: 'WED 10:30 AM', day: 'WED 10:30', spoken: 'Wednesday 10:30 AM, fence quote' },
  },
  {
    id: 'form',
    icon: 'form',
    kick: 'QUOTE FORM',
    main: 'Gate repair',
    note: '3 days, no reply',
    mainWidth: 110,
    booked: { job: 'Gate repair', when: 'THU 1:00 PM', day: 'THU 1:00', spoken: 'Thursday 1:00 PM, gate repair' },
  },
];

/** The whole story, so motion carries nothing that is not also said here. */
export const MACHINE_LABEL =
  'Animated diagram. Three inquiries ride a conveyor toward a small Sproutflow machine and pile up: ' +
  'a missed call at 6:42 PM with no callback, a text asking "you do fences?" that nobody answered, ' +
  'and a quote form for a gate repair with no reply in 3 days. ' +
  'A red marker arm circles the problem on each one and writes a note. ' +
  'Each inquiry goes through the machine and comes out as a booked job on an example weekly calendar: ' +
  `${CARDS.map((card) => card.booked.spoken).join('; ')}. ` +
  'At the end the dial points to gold and a note reads: nothing piling up.';

/** The visible steps under the diagram. They light in sync with the motion. */
export const STEPS = [
  { n: 1, text: 'Calls, texts and forms pile up', tone: 'problem' },
  { n: 2, text: 'I mark where each one gets lost', tone: 'problem' },
  { n: 3, text: 'I fix it, so each one gets booked', tone: 'fix' },
] as const;

export const REST_NOTE = 'nothing piling up';

// ---------------------------------------------------------------------------
// Geometry (scene units)
// ---------------------------------------------------------------------------

export const CARD_W = 168;
export const CARD_H = 92;

/** Centre of the front card in the pile, beside the machine's closed side. */
export const FRONT: Point = [135.5, 143];
/** Pile offsets [x, y, rotate°] from FRONT; slot 0 is the front of the pile. */
export const SLOTS: readonly (readonly [number, number, number])[] = [
  [0, 0, -2],
  [8, -21, 3],
  [-6, -42, -4],
];
/** Centre of a booked card when it pops out of the front slot. */
export const OUT_CENTRE: Point = [390.1, 290];

/** The marker arm: shoulder, segment lengths, pen length and parked tip. */
export const ARM = {
  base: [293.1, 200] as Point,
  l1: 130,
  l2: 120,
  pen: 36,
  park: [254, 236] as Point,
};

export type LayoutName = 'desktop' | 'phone';

export interface AgendaLayout {
  /** Top-left of the calendar card. */
  origin: Point;
  width: number;
  height: number;
  /** Binder rings, x positions. */
  rings: readonly number[];
  /** Header: one line on desktop, two on phones. */
  header: readonly { text: string; soft?: boolean; x: number; y: number }[];
  seamY: number;
  rowX: number;
  rowW: number;
  rowH: number;
  /** Row tops, relative to origin. */
  rowTops: readonly number[];
  /** Two-line rows on phones (day above job). */
  stacked: boolean;
}

export interface MachineLayout {
  /** The crop of the scene: [minX, minY, width, height]. */
  viewBox: readonly [number, number, number, number];
  agenda: AgendaLayout;
}

export const LAYOUTS: Record<LayoutName, MachineLayout> = {
  desktop: {
    viewBox: [-30, 40, 620, 508],
    agenda: {
      origin: [148, 378],
      width: 264,
      height: 164,
      rings: [40, 224],
      header: [{ text: 'THIS WEEK', x: 14, y: 30 }, { text: '(EXAMPLE)', soft: true, x: 110, y: 30 }],
      seamY: 41,
      rowX: 10,
      rowW: 244,
      rowH: 30,
      rowTops: [50, 86, 122],
      stacked: false,
    },
  },
  phone: {
    viewBox: [22, 48, 452, 406],
    agenda: {
      origin: [28, 264],
      width: 164,
      height: 186,
      rings: [30, 134],
      header: [{ text: 'THIS WEEK', x: 14, y: 24 }, { text: '(EXAMPLE)', soft: true, x: 14, y: 42 }],
      seamY: 50,
      rowX: 8,
      rowW: 148,
      rowH: 38,
      rowTops: [56, 98, 140],
      stacked: true,
    },
  },
};

/** Container width (px) below which the phone layout applies. Matches the CSS container query. */
export const PHONE_BREAKPOINT = 600;

/** Where a booked card's centre lands on calendar row `row` (scene units). */
export function rowTarget(layout: LayoutName, row: number): Point {
  const a = LAYOUTS[layout].agenda;
  return [a.origin[0] + a.rowX + a.rowW / 2, a.origin[1] + a.rowTops[row] + a.rowH / 2];
}

// ---------------------------------------------------------------------------
// Marker arm inverse kinematics (two segments + a pen that hangs straight down)
// ---------------------------------------------------------------------------

/** Joint angles in degrees [shoulder, elbow, wrist] that put the pen tip at (tx, ty). */
export function solveArm(tx: number, ty: number): [number, number, number] {
  const [bx, by] = ARM.base;
  const ax = tx - bx;
  const ay = ty - ARM.pen - by;
  const d = Math.min(Math.hypot(ax, ay), ARM.l1 + ARM.l2 - 0.5);
  const a = Math.atan2(ay, ax);
  const cos = (ARM.l1 * ARM.l1 + d * d - ARM.l2 * ARM.l2) / (2 * ARM.l1 * d);
  const t1 = a + Math.acos(Math.max(-1, Math.min(1, cos)));
  const ex = ARM.l1 * Math.cos(t1);
  const ey = ARM.l1 * Math.sin(t1);
  const t2 = Math.atan2(ay - ey, ax - ex);
  const deg = 180 / Math.PI;
  return [t1 * deg, (t2 - t1) * deg, -t2 * deg];
}

/** The arm at rest. Rendered on the server so the fixed frame matches the client. */
export const PARK_ANGLES = solveArm(ARM.park[0], ARM.park[1]).map((v) => Math.round(v * 100) / 100) as [
  number,
  number,
  number,
];

// ---------------------------------------------------------------------------
// The red-pen ring around a card's message
// ---------------------------------------------------------------------------

/** A hand-drawn loop in a 100 × 100 box: M + five cubics, overshooting its start. */
const RING_RAW: readonly (readonly number[])[] = [
  [60, 5],
  [83, 6, 98, 24, 96, 52],
  [94, 80, 70, 97, 45, 95],
  [19, 93, 3, 73, 5, 47],
  [7, 21, 28, 4, 55, 7],
  [64, 8, 70, 11, 74, 14],
];

/** The ring's box in card coordinates for a message `width` wide. */
export function ringBox(width: number): [number, number, number, number] {
  return [5, 35, width + 18, 30];
}

function ringPoints(width: number): Point[] {
  const [x0, y0, w, h] = ringBox(width);
  return RING_RAW.map((seg) => {
    const pts: Point[] = [];
    for (let i = 0; i < seg.length; i += 2) pts.push([x0 + (seg[i] / 100) * w, y0 + (seg[i + 1] / 100) * h]);
    return pts;
  }).flat();
}

/** SVG path data for the ring. */
export function ringPath(width: number): string {
  const p = ringPoints(width).map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`);
  let d = `M${p[0]}`;
  for (let i = 1; i < p.length; i += 3) d += `C${p[i]} ${p[i + 1]} ${p[i + 2]}`;
  return d;
}

/**
 * `count + 1` points spaced evenly along the ring (card coordinates), so the
 * pen traces the stroke exactly as it draws. No DOM needed (jsdom has no
 * getPointAtLength).
 */
export function ringSamples(width: number, count: number): Point[] {
  const p = ringPoints(width);
  const poly: Point[] = [p[0]];
  for (let i = 1; i < p.length; i += 3) {
    const [a, b, c, d] = [p[i - 1], p[i], p[i + 1], p[i + 2]];
    for (let k = 1; k <= 24; k++) {
      const t = k / 24;
      const u = 1 - t;
      poly.push([
        u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
        u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
      ]);
    }
  }
  const lengths = [0];
  for (let i = 1; i < poly.length; i++) {
    lengths.push(lengths[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]));
  }
  const total = lengths[lengths.length - 1];
  const out: Point[] = [];
  let j = 1;
  for (let k = 0; k <= count; k++) {
    const target = (total * k) / count;
    while (j < poly.length - 1 && lengths[j] < target) j++;
    const span = lengths[j] - lengths[j - 1] || 1;
    const f = Math.max(0, Math.min(1, (target - lengths[j - 1]) / span));
    out.push([
      poly[j - 1][0] + (poly[j][0] - poly[j - 1][0]) * f,
      poly[j - 1][1] + (poly[j][1] - poly[j - 1][1]) * f,
    ]);
  }
  return out;
}

/** A point in the front card's coordinates, in scene coordinates. */
export function cardToScene([px, py]: Point): Point {
  const r = (SLOTS[0][2] * Math.PI) / 180;
  const x = px - CARD_W / 2;
  const y = py - CARD_H / 2;
  return [FRONT[0] + x * Math.cos(r) - y * Math.sin(r), FRONT[1] + x * Math.sin(r) + y * Math.cos(r)];
}
