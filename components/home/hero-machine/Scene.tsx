/**
 * The Lead Machine: the SVG scene, drawn in its fixed (rest) state. No hooks
 * and no timing: HeroMachine animates the `data-hm` elements with the tracks
 * from timeline.ts. With no JS or with reduced motion this is what shows.
 *
 * One SVG serves both layouts. Its viewBox is the desktop crop; below 600px
 * of container width the CSS module enlarges and offsets the SVG inside a
 * clipped stage (the phone crop) and swaps the calendar for the phone one.
 */

import { memo, type CSSProperties } from 'react';
import {
  CARDS,
  CARD_H,
  CARD_W,
  FRONT,
  LAYOUTS,
  OUT_CENTRE,
  PARK_ANGLES,
  REST_NOTE,
  SLOTS,
  ringPath,
  type AgendaLayout,
  type CardIcon,
} from './config';
import s from './HeroMachine.module.css';

const rot = (deg: number): CSSProperties => ({ transform: `rotate(${deg}deg)` });
const HALF = `translate(${-CARD_W / 2} ${-CARD_H / 2})`;

const GRID =
  'M300 120L-46.4 320M300 120L646.4 320M334.6 140L-11.8 340M265.4 140L611.8 340M369.3 160L22.9 360M230.7 160L577.1 360M403.9 180L57.5 380M196.1 180L542.5 380M438.6 200L92.2 400M161.4 200L507.8 400M473.2 220L126.8 420M126.8 220L473.2 420M507.8 240L161.4 440M92.2 240L438.6 440M542.5 260L196.1 460M57.5 260L403.9 460M577.1 280L230.7 480M22.9 280L369.3 480M611.8 300L265.4 500M-11.8 300L334.6 500M646.4 320L300 520M-46.4 320L300 520';

function Icon({ icon }: { icon: CardIcon }) {
  return (
    <g className={s.ico} transform="translate(13 11)">
      {icon === 'phone' && (
        <path d="M5 2h3.5l1.6 4.2-2.2 1.4a9.5 9.5 0 0 0 4.5 4.5l1.4-2.2 4.2 1.6V15a2 2 0 0 1-2 2A15 15 0 0 1 3 4a2 2 0 0 1 2-2z" />
      )}
      {icon === 'text' && (
        <>
          <rect x="3" y="1" width="12" height="17" rx="2.5" />
          <path d="M7.5 15h3" />
        </>
      )}
      {icon === 'form' && (
        <>
          <rect x="2" y="1" width="14" height="17" rx="2" />
          <path d="M5 6h8M5 10h8M5 14h5" />
        </>
      )}
    </g>
  );
}

function CardBase() {
  return (
    <>
      <rect className={s.cardShadow} x="3" y="5" width={CARD_W} height={CARD_H} rx="10" />
      <rect className={s.card} width={CARD_W} height={CARD_H} rx="10" />
    </>
  );
}

function Tick() {
  return <path className={s.tick} d="M-4.5 0.5l3 3 6-7" />;
}

function Agenda({ layout, className }: { layout: AgendaLayout; className: string }) {
  const { origin, width, height, rings, header, seamY, rowX, rowW, rowH, rowTops, stacked } = layout;
  return (
    <g className={className} transform={`translate(${origin[0]} ${origin[1]})`}>
      <rect className={s.agenda} width={width} height={height} rx="12" />
      <path className={s.agendaRings} d={rings.map((x) => `M${x} -6V8`).join('')} />
      {header.map((h) => (
        <text key={h.text} className={h.soft ? s.kick : `${s.kick} ${s.kickInk}`} x={h.x} y={h.y}>
          {h.text}
        </text>
      ))}
      <path className={s.seam} d={`M10 ${seamY}H${width - 10}`} />
      {CARDS.map((card, i) => {
        const top = rowTops[i];
        return (
          <g key={card.id}>
            <rect className={s.slotEmpty} x={rowX} y={top} width={rowW} height={rowH} rx="6" />
            <g data-hm={`row-${i}`}>
              <rect className={s.rowBg} x={rowX} y={top} width={rowW} height={rowH} rx="6" />
              <g transform={`translate(${rowX + (stacked ? 16 : 17)} ${top + rowH / 2})`}>
                <circle className={s.badge} r="9" />
                <Tick />
              </g>
              {stacked ? (
                <>
                  <text className={s.kick} x={rowX + 34} y={top + 15}>
                    {card.booked.day}
                  </text>
                  <text className={s.job} x={rowX + 34} y={top + 33}>
                    {card.booked.job}
                  </text>
                </>
              ) : (
                <>
                  <text className={s.kick} x={rowX + 34} y={top + 21}>
                    {card.booked.day}
                  </text>
                  <text className={s.job} x={rowX + 136} y={top + 21}>
                    {card.booked.job}
                  </text>
                </>
              )}
            </g>
          </g>
        );
      })}
    </g>
  );
}

export interface SceneProps {
  /** Width of each card's message in scene units; sizes the red ring. */
  widths: readonly number[];
}

function Scene({ widths }: SceneProps) {
  const [vx, vy, vw, vh] = LAYOUTS.desktop.viewBox;
  return (
    <svg
      className={s.svg}
      viewBox={`${vx} ${vy} ${vw} ${vh}`}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className={s.grid} d={GRID} />
      <polygon className={s.platform} points="300,256 410.9,320 300,384 189.1,320" />

      {/* Input belt */}
      <path className={s.leg} d="M19.4 162L19.4 182M106 212L106 232" />
      <path className={`${s.leg} ${s.legBack}`} d="M61 138L61 158M147.6 188L147.6 208" />
      <polygon className={s.beltSide} points="-136.5,62 242.8,281 242.8,291 -136.5,72" />
      <polygon className={s.beltTop} points="-94.9,38 284.4,257 242.8,281 -136.5,62" />
      <path className={s.slats} data-hm="slats" d="M-105.3 44L274 263" />
      <path className={s.slats} data-hm="slats" d="M-115.7 50L263.6 269" />
      <path className={s.slats} data-hm="slats" d="M-126.1 56L253.2 275" />

      {/* Inquiries, back of the pile first so the front card draws on top */}
      <g>
        {CARDS.map((card, i) => ({ card, i }))
          .reverse()
          .map(({ card, i }) => {
            const [sx, sy, sr] = SLOTS[i];
            return (
              <g key={card.id} transform={`translate(${FRONT[0]} ${FRONT[1]})`}>
                <g data-hm={`inq-${i}`} style={{ transform: `translate(${sx}px,${sy}px) rotate(${sr}deg)`, opacity: 0 }}>
                  <g transform={HALF}>
                    <CardBase />
                    <Icon icon={card.icon} />
                    <text className={s.kick} x="40" y="26">
                      {card.kick}
                    </text>
                    <text className={s.main} x="14" y="56" data-hm={`main-${i}`}>
                      {card.main}
                    </text>
                    <path
                      className={s.ring}
                      data-hm={`ring-${i}`}
                      d={ringPath(widths[i])}
                      pathLength={100}
                      strokeDasharray="100"
                      style={{ strokeDashoffset: 0 }}
                    />
                    <text className={s.note} x="14" y="83" data-hm={`note-${i}`}>
                      {card.note}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}
      </g>

      {/* Where the pile was: the rest note */}
      <g transform="translate(73.5 139) rotate(-6)">
        <g data-hm="restnote" style={{ opacity: 1 }}>
          <path className={`${s.gold} ${s.goldCheck}`} d="M-38 -12l8 9 15 -22" />
          <text className={s.calm} x="0" y="0">
            {REST_NOTE}
          </text>
          <path className={`${s.gold} ${s.goldUnder}`} d="M-2 9C40 4 90 12 136 6" />
        </g>
      </g>

      {/* The machine */}
      <polygon className={`${s.body} ${s.mRight}`} points="300,272 372.7,230 372.7,320 300,362" />
      <polygon className={`${s.body} ${s.mLeft}`} points="227.3,230 300,272 300,362 227.3,320" />
      <polygon className={`${s.body} ${s.mTop}`} points="300,188 372.7,230 300,272 227.3,230" />
      <polygon className={s.lid} points="300,196 358.9,230 300,264 241.1,230" />
      <g transform="matrix(0.8660254 0.5 0 1 227.3 230)">
        <path className={s.seam} d="M0 13H84" />
        <circle className={s.dial} cx="30" cy="44" r="19" />
        <path className={`${s.zone} ${s.zoneRed}`} d="M17.2 41.7A13 13 0 0 1 24.5 32.2" />
        <path className={`${s.zone} ${s.zoneGold}`} d="M35.5 32.2A13 13 0 0 1 42.8 41.7" />
        <g transform="translate(30 44)">
          <g data-hm="needle" style={rot(60)}>
            <path className={s.needle} d="M0 3V-15" />
          </g>
          <circle className={s.hub} r="3" />
        </g>
        <path className={s.vent} d="M58 32H74M58 39H74M58 46H74" />
        <path className={s.leafMark} d="M64 76c-1-9 5-14 12-14c0 8-5 13-12 14zM64 76l6-7" />
      </g>
      <g transform="matrix(0.8660254 -0.5 0 1 300 272)">
        <path className={s.seam} d="M0 13H84" />
        <rect className={s.slot} x="14" y="42" width="56" height="20" rx="3" />
        <path className={s.flap} d="M14 42H70" />
        <circle className={s.lampOff} cx="70" cy="27" r="5.5" />
        <circle className={s.lampOn} data-hm="lamp" cx="70" cy="27" r="5.5" style={{ opacity: 1 }} />
      </g>
      <g transform="translate(293.1 216)">
        <path className={`${s.body} ${s.mTop}`} d="M-13 0V-12A13 6.5 0 0 1 13 -12V0A13 6.5 0 0 1 -13 0z" />
        <ellipse className={s.lid} cx="0" cy="-12" rx="13" ry="6.5" />
      </g>
      <g transform="translate(339.8 229)">
        <path className={`${s.body} ${s.pot}`} d="M-10 0L-8 -13H8L10 0A10 4 0 0 1 -10 0z" />
        <ellipse className={s.potRim} cx="0" cy="-13" rx="8" ry="3.4" />
        <path className={s.stem} d="M0 -14C0 -22 -1 -28 1 -36" />
        <path className={s.leaf} d="M0 -24C-12 -24 -17 -31 -18 -38C-8 -38 -2 -33 0 -24z" />
        <path className={s.leaf} d="M1 -30C10 -31 15 -37 15 -44C6 -44 1 -39 1 -30z" />
        <g transform="translate(1 -36)">
          <g data-hm="newleaf" style={{ transform: 'scale(1)' }}>
            <path className={s.leafGold} d="M0 0C-3 -8 0 -15 6 -19C9 -11 6 -4 0 0z" />
          </g>
        </g>
      </g>

      {/* Output belt */}
      <path className={s.leg} d="M409.1 387L409.1 407" />
      <path className={`${s.leg} ${s.legBack}`} d="M450.7 363L450.7 383" />
      <polygon className={s.beltSide} points="315.6,323 426.4,387 426.4,397 315.6,333" />
      <polygon className={s.beltTop} points="357.2,299 468,363 426.4,387 315.6,323" />
      <polygon className={s.beltSide} points="468,363 426.4,387 426.4,397 468,373" />
      <path className={s.slats} data-hm="slats" d="M346.8 305L457.6 369" />
      <path className={s.slats} data-hm="slats" d="M336.4 311L447.2 375" />
      <path className={s.slats} data-hm="slats" d="M326 317L436.8 381" />

      {/* This week (example): one calendar per layout, CSS shows the right one */}
      <Agenda layout={LAYOUTS.desktop.agenda} className={s.onlyDesktop} />
      <Agenda layout={LAYOUTS.phone.agenda} className={s.onlyPhone} />

      {/* Booked cards */}
      <g>
        {CARDS.map((card, i) => (
          <g key={card.id} transform={`translate(${OUT_CENTRE[0]} ${OUT_CENTRE[1]})`}>
            <g data-hm={`bk-${i}`} style={{ opacity: 0 }}>
              <g transform={HALF}>
                <CardBase />
                <rect className={s.badge} x="0" y="14" width="4" height="64" rx="2" />
                <g transform="translate(25 22)">
                  <circle className={s.badge} r="10" />
                  <Tick />
                </g>
                <text className={`${s.kick} ${s.kickGold}`} x="44" y="28">
                  BOOKED
                </text>
                <text className={s.main} x="16" y="58">
                  {card.booked.job}
                </text>
                <text className={s.kick} x="16" y="81">
                  {card.booked.when}
                </text>
              </g>
            </g>
          </g>
        ))}
      </g>

      {/* The red marker arm, parked */}
      <g transform="translate(293.1 200)">
        <g data-hm="a1" style={rot(PARK_ANGLES[0])}>
          <path className={`${s.arm} ${s.arm1}`} d="M0 0H130" />
          <g transform="translate(130 0)">
            <g data-hm="a2" style={rot(PARK_ANGLES[1])}>
              <path className={`${s.arm} ${s.arm2}`} d="M0 0H120" />
              <g transform="translate(120 0)">
                <g data-hm="a3" style={rot(PARK_ANGLES[2])}>
                  <path className={`${s.arm} ${s.penClip}`} d="M0 0V8" />
                  <rect className={s.pen} x="-6.5" y="6" width="13" height="22" rx="3" />
                  <rect className={s.penDark} x="-6.5" y="10" width="13" height="4" />
                  <path className={s.penDark} d="M-4.5 28L0 36L4.5 28z" />
                </g>
                <circle className={s.joint} r="5" />
              </g>
            </g>
            <circle className={s.joint} r="7" />
          </g>
        </g>
        <circle className={`${s.joint} ${s.jointBase}`} r="8" />
      </g>
    </svg>
  );
}

export default memo(Scene);
