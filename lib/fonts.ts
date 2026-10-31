// lib/fonts.ts
//
// Design system v3 type: five roles, each exported as a CSS variable.
// See docs/design-system-v3.md for the rules that go with each role.
//
//   --font-hero        Archivo 800/900. The hero headline only.
//   --font-display     Instrument Serif 400, normal and italic. Every other heading.
//   --font-body        DM Sans 400/500/600. Paragraphs, buttons, fields, nav.
//   --font-annotation  Caveat 700. Redline marks and Ben's margin notes only.
//   --font-mono        Fira Code 400/500. Prices, labels, numerals, eyebrows.
//
// --font-accent is not loaded separately. app/globals.css aliases it to
// --font-display so older `font-accent italic` markup renders Instrument
// Serif italic. Newsreader is retired.
//
// next/font requires each loader call at module scope, assigned to a const.
import { Archivo, Caveat, DM_Sans, Fira_Code, Instrument_Serif } from 'next/font/google';

export const fontHero = Archivo({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-hero',
  display: 'swap',
});

// Single weight. Never set it bold: the browser would synthesize a faux bold.
export const fontDisplay = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

export const fontBody = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const fontAnnotation = Caveat({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-annotation',
  display: 'swap',
});

export const fontMono = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

/** The five roles, keyed by the CSS variable each one sets. */
export const FONT_ROLES = {
  hero: '--font-hero',
  display: '--font-display',
  body: '--font-body',
  annotation: '--font-annotation',
  mono: '--font-mono',
} as const;

export type FontRole = keyof typeof FONT_ROLES;

/** Space-separated variable classes. Apply once, on <body>. */
export const fontVariables = [fontHero, fontDisplay, fontBody, fontAnnotation, fontMono]
  .map((font) => font.variable)
  .join(' ');
