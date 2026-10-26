# Sproutflow Design System v3

Binding spec for the v3 redesign (integration branch `redesign/v3`). Wave 2 builds pages from these tokens and components and should not need to make type or annotation decisions. Where this file and `docs/design-system-v2.md` disagree, this file wins.

Sources: `redesign-proposals/DIRECTION.md` section 8 (the 19 Oct 2026 type and trust entries are binding), `redesign-proposals/type/NOTES.md` (the Editorial system) and the `.mk-*` annotation kit in `redesign-proposals/redline/index.html`.

The idea in one line: the site marks up what costs a business calls with a red pen, then shows the fix, with Ben front and center. The type reads like an edited proof: a tall serif under a red pen.

QA page: `/v3-kit` (noindex, not in the sitemap) renders every component below. Remove it when Wave 2 pages ship.

---

## 1. Type: five roles

Fonts load once through `next/font/google` in `lib/fonts.ts`. Each role is a CSS variable, applied on `<body>` in `app/layout.tsx` (`${fontVariables} antialiased font-body`).

| Role | Family and weights | Tailwind | CSS variable | Use for | Never for |
|---|---|---|---|---|---|
| Hero display | Archivo 800, 900 | `font-hero` | `--font-hero` | The hero headline. One per page. | Anything else |
| Display | Instrument Serif 400, 400 italic | `font-display` | `--font-display` | Every other heading, pull quotes | Paragraphs, buttons, anything under 24px, bold |
| Body | DM Sans 400, 500, 600 | `font-body` (the body default) | `--font-body` | Paragraphs, buttons (600), fields, nav | |
| Annotation | Caveat 700 | `font-annotation` | `--font-annotation` | Redline marks and Ben's margin notes | Prices, body, headings, labels |
| Utility | Fira Code 400, 500 | `font-mono` | `--font-mono` | Prices, phone numbers, results, numerals, eyebrows, tags | Sentences |

`font-accent` is a legacy alias: `--font-accent` points at `--font-display` (set in `app/globals.css`), so old `font-accent italic` markup renders Instrument Serif italic. Newsreader is retired. Do not use `font-accent` in new code; use `Heading`'s `italic` prop.

### Rules

1. **Hero.** Archivo 900 via `<Heading size="hero">`, once per page, top of the page. `text-wrap: balance`, no hyphens. It fits in 3 lines at 375px.
2. **Display is single weight.** Instrument Serif has only 400. Never add `font-bold`, `font-semibold` or a weighted token to it: the browser would fake a bold. `app/globals.css` sets `font-synthesis: style` on headings and `.font-display` as a guard, but do not rely on it.
3. **One italic word per heading, at most, and not in every section.** Use `Heading`'s `italic` prop. Never italicize a whole heading.
4. **Display never below 24px.** The smallest display token is `display-sm` (24px floor). Card titles under 24px use body 600.
5. **Annotation is only for red marks and Ben's notes.** 8 words or fewer, never below 18px, at most one margin note per section. Red for Redline marks, Fern for Ben's notes. On a Paper chip when it sits over an image (the Redline kit does this for you).
6. **Mono for prices, labels and numerals.** Labels in capitals, tracked +0.08em. Tabular figures on, ligatures off (`tabular-nums [font-variant-ligatures:none]`). Numbers inside a sentence stay in body, except prices.
7. **Body.** Lines of 45 to 70 characters (`max-w-[60ch]` or `reading-width`). Buttons in DM Sans 600.

---

## 2. Tokens

### Font sizes (`tailwind.config.js` fontSize)

| Token | Size | Line-height | Tracking | Weight | Role |
|---|---|---|---|---|---|
| `text-hero` | clamp(2.75rem, 6vw, 5.75rem) (44 to 92px) | 0.95 | -0.035em | 900 | `font-hero` only |
| `text-display-xl` | clamp(2.5rem, 5.6vw, 5.125rem) (40 to 82px) | 1.0 | -0.01em | 400 | Page h1 when not the hero |
| `text-display-lg` | clamp(2rem, 4.2vw, 4rem) (32 to 64px) | 1.04 | -0.01em | 400 | Section h2 |
| `text-display-md` | clamp(1.5rem, 2.6vw, 2.5rem) (24 to 40px) | 1.1 | -0.005em | 400 | h3, offer names |
| `text-display-sm` | clamp(1.5rem, 2.1vw, 1.9375rem) (24 to 31px) | 1.12 | -0.005em | 400 | h4, supporting heads |
| `text-annotation` | clamp(1.125rem, 0.95rem + 0.75vw, 1.5rem) (18 to 24px) | 1.1 | 0.005em | 700 | `font-annotation` |
| `text-label` | clamp(0.75rem, 0.72rem + 0.1vw, 0.8125rem) (12 to 13px) | 1.3 | 0.08em | 500 | Mono labels, eyebrows, tags |
| `text-price` | clamp(1.75rem, 1.6rem + 0.6vw, 2.125rem) (28 to 34px) | 1 | -0.02em | 500 | Mono prices, phone |
| `text-numeral` | clamp(2.75rem, 2.4rem + 1.5vw, 3.75rem) (44 to 60px) | 1 | -0.03em | 500 | Mono result figures (35%, 2x) |
| `text-body-lg` / `text-body` / `text-body-sm` | 18 / 16 / 14px | 1.75 / 1.7 / 1.65 | | | DM Sans |

Legacy tokens kept so v2 markup still renders: `text-h4` (20px, now 400), `text-section`, `text-subsection` (400), `text-eyebrow`, `text-mono-meta`. Do not use them in v3 code. `text-hero` replaced the v2 alias of the same name.

### Colors

| Name | Tailwind | Hex | Role |
|---|---|---|---|
| Redline | `redline` | #B42318 | Red-pen marks, pins, eyebrow index, focus ring on light canvases. Never on Pine. |
| Redline ink | `redline-ink` | #9A1C13 | Red text on `redline-soft` |
| Redline soft | `redline-soft` | #FBE9E7 | Tint behind an inline problem callout |
| Pine Shadow | `primary-900` | #223528 | Text on light canvases, primary button, the dark canvas |
| Birch Paper | `cream-300` | #F4EFE3 | Default canvas; text on Pine |
| Paper | `bg-[#FBF8F1]` (`--v3-paper`) | #FBF8F1 | Lighter canvas step; note chips |
| Lichen | `cream-500` | #E4E3D2 | Seam between light sections |
| Fern | `ink-700` | #3F6B45 | Ben's notes; "the fix" marks |
| Goldenrod | `accent-500` | #D9A441 | Button fill on Pine only. Never a large fill. |
| Gold light | `accent-300` | #E7C688 | Eyebrow index and notes on Pine; focus ring on Pine |
| Ink soft | `text-[#4A574D]` (`--v3-ink-soft`) | #4A574D | Secondary text on light canvases |
| On-dark soft | `text-[#C9CFC4]` | #C9CFC4 | Secondary text on Pine |

Existing tokens are unchanged.

### Contrast (WCAG, all at least 4.5:1)

| Text on background | Ratio |
|---|---|
| Redline on Birch | 5.73 |
| Redline on white | 6.57 |
| Redline on Paper (note chips) | 6.20 |
| Redline on Lichen | 5.08 |
| Redline on Redline soft | 5.61 |
| Redline ink on Redline soft | 7.03 |
| White on Redline (pins) | 6.57 |
| Fern on Birch / Paper / Lichen | 5.38 / 5.82 / 4.77 |
| White on Fern (fix pins) | 6.18 |
| Pine on Birch / Paper / Lichen | 11.38 / 12.31 / 10.09 |
| Birch on Pine | 11.38 |
| Pine on Goldenrod (onDark button) | 5.81 |
| Ink soft on Birch / Lichen / Paper | 6.63 / 5.87 / 7.17 |
| On-dark soft on Pine | 8.21 |
| Gold light on Pine | 7.98 |
| **Redline on Pine** | **1.99: never do this.** Use `goldenrod` underlines on Pine. |

### Layout

- Max widths: `max-w-container-narrow` 768px, `max-w-container` 1280px, `max-w-container-wide` 1440px (via `Container`).
- Gutter: 16px phone, 32px from `sm`, 48px from `lg` (via `Container`).
- Vertical rhythm (CSS variables in `app/globals.css`, via `Section`): `--v3-rhythm-tight` clamp(2.5rem, 5vw, 4rem), `--v3-rhythm` clamp(3.5rem, 7vw, 6rem), `--v3-rhythm-loose` clamp(4.5rem, 9vw, 8rem).
- Page height targets: 6,000px or less at 1440 wide, 12 phone screens or fewer at 375.
- Light theme only. No dark mode.

---

## 3. Components

All server components unless noted. Import from the barrels: `@/components/v3` and `@/components/redline`.

### Container

| Prop | Type | Default | |
|---|---|---|---|
| `size` | `'narrow' \| 'default' \| 'wide'` | `'default'` | Max width |
| `as` | `'div' \| 'header' \| 'footer' \| 'article' \| 'nav'` | `'div'` | |
| `className` | `string` | | |
| `children` | `ReactNode` | required | |

```tsx
<Container size="narrow">...</Container>
```

### Section

| Prop | Type | Default | |
|---|---|---|---|
| `tone` | `'birch' \| 'paper' \| 'lichen' \| 'pine'` | `'birch'` | Canvas and default text colour |
| `rhythm` | `'tight' \| 'default' \| 'loose' \| 'none'` | `'default'` | Vertical padding token |
| `id` | `string` | | Anchor target (has `scroll-mt-20`) |
| `labelledBy` | `string` | | Sets `aria-labelledby`; pass the heading's id |
| `ariaLabel` | `string` | | Only when there is no visible heading |
| `container` | `ContainerSize \| false` | `'default'` | Wraps children in a Container; `false` to manage width yourself |
| `className` | `string` | | |
| `children` | `ReactNode` | required | |

```tsx
<Section tone="paper" id="menu" labelledBy="menu-h">
  <Eyebrow index="04">The menu</Eyebrow>
  <Heading id="menu-h" italic="Fixed">One menu. Fixed prices.</Heading>
</Section>
```

Use Pine for at most one or two sections per page (the Book section). Two neighbouring sections should not share a tone.

### Eyebrow

| Prop | Type | Default | |
|---|---|---|---|
| `children` | `ReactNode` | required | The label. Sentence text; it renders in capitals. |
| `index` | `string` | | Section number, e.g. `"03"`. Red on light, gold on Pine. |
| `onDark` | `boolean` | `false` | Set inside Pine sections |
| `as` | `'p' \| 'span' \| 'div'` | `'p'` | |
| `className` | `string` | | |

```tsx
<Eyebrow index="03">Free website check</Eyebrow>
```

### Heading

| Prop | Type | Default | |
|---|---|---|---|
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4'` | `'h2'` | Semantic level |
| `size` | `'hero' \| 'xl' \| 'lg' \| 'md' \| 'sm'` | from level: h1 xl, h2 lg, h3 md, h4 sm | Visual size |
| `id` | `string` | | For `Section labelledBy` |
| `italic` | `string` | | One word of `children` set in Instrument Serif italic. Needs string children. |
| `className` | `string` | | |
| `children` | `ReactNode` | required | |

`hero` renders `font-hero text-hero` (Archivo 900). Every other size renders `font-display text-display-{size} font-normal`. Colour is inherited from the Section. In a hero, the `italic` word renders in Instrument Serif italic.

```tsx
<Heading as="h1" size="hero" id="hero-h">
  I find what&apos;s <RedlineUnderline>costing you calls.</RedlineUnderline> Then I fix it.
</Heading>
<Heading as="h2" id="ben-h" italic="same">One person. The same one, start to finish.</Heading>
```

### ButtonLink

Wraps `next/link`. At least 48px tall, DM Sans 600, 3px focus ring with a 3px offset.

| Prop | Type | Default | |
|---|---|---|---|
| `href` | `LinkProps['href']` | required | Internal path, `tel:` or `mailto:` |
| `variant` | `'primary' \| 'secondary' \| 'onDark'` | `'primary'` | primary: Pine fill. secondary: Pine outline (light canvases only). onDark: Goldenrod fill (Pine sections). |
| `prefetch` | `LinkProps['prefetch']` | | |
| `className` | `string` | | |
| `children` | `ReactNode` | required | |
| ...rest | anchor attributes | | `aria-label`, `target`, `rel`, `onClick` and so on |

Focus ring: Redline on light canvases, Gold light on Pine.

```tsx
<ButtonLink href="/book">Book a 15-minute call</ButtonLink>
<ButtonLink href="/check" variant="secondary">Check your website free</ButtonLink>
<ButtonLink href="/book" variant="onDark">Book a 15-minute call</ButtonLink>
```

### MarginNote

Ben's handwritten note in Caveat with a small hand-drawn arrow.

| Prop | Type | Default | |
|---|---|---|---|
| `children` | `string` | required | 8 words or fewer (warns in development) |
| `arrow` | `'up' \| 'down' \| 'left' \| 'right' \| 'none'` | `'down'` | Direction the arrow points. Left and up sit before the text; right and down after. |
| `tone` | `'fern' \| 'redline' \| 'onDark'` | `'fern'` | Fern for Ben's notes; redline for a red-pen aside; onDark on Pine |
| `decorative` | `boolean` | `false` | `aria-hidden` when the note only repeats nearby text ("that's me" beside a captioned photo) |
| `as` | `'p' \| 'span'` | `'p'` | |
| `className` | `string` | | |

```tsx
<MarginNote arrow="left">that&apos;s me, I answer the phone</MarginNote>
```

### RedlineFrame (components/redline)

A `position: relative` frame for an image or illustration, with marks positioned in % over it. The frame is a CSS size container (`container: redline / inline-size` in `app/globals.css`), so its layout follows its own width, not the viewport.

| Prop | Type | Default | |
|---|---|---|---|
| `children` | `ReactNode` | required | The image. Give it real `alt` text, `width`, `height` and `sizes`. It fills the frame width. |
| `marks` | `RedlineMarkSpec[]` | `[]` | In reading order. Each mark with a `note` gets a pin number and a list entry. |
| `listLabel` | `string` | `'What I marked'` | Accessible name of the list |
| `pins` | `'auto' \| 'always'` | `'auto'` | auto: notes on the image, pins below 560px of frame width. always: pins and list at every width (good for small or busy screenshots). |
| `drawOn` | `boolean` | `true` | Draw marks on when they scroll into view |
| `caption` | `ReactNode` | | Rendered as `figcaption` |
| `className` | `string` | | |

Give the frame a definite width: normal block flow, a grid column (`minmax(0, 1fr)`) or `w-full`. As a size container it has no intrinsic width, so inside a shrink-to-fit flex item it collapses to 0.

**Wide frames (560px and up):** notes sit on the image on Paper chips; the ordered list is visually hidden but read by screen readers.
**Narrow frames (under 560px):** notes and arrows hide, numbered pins show, and the list appears under the image with the note in Caveat and `detail` in body text.

### RedlineMark (the `marks` items)

`RedlineMarkSpec` is `RedlineMarkProps` without `pin`.

| Prop | Type | Default | |
|---|---|---|---|
| `variant` | `'circle' \| 'underline' \| 'box' \| 'arrow'` | required | circle: ring a problem. underline: a weak line of text. box (dashed): an empty or missing area. arrow: point at something. |
| `x`, `y` | `number` | required | Top-left corner, % of frame width and height |
| `w`, `h` | `number` | required | Size, % of frame width and height |
| `note` | `string` | | 8 words or fewer. Lower case, like a real red pen. |
| `detail` | `string` | | Plain explanation shown under the note in the list |
| `notePlacement` | `'above' \| 'below' \| 'left' \| 'right'` | `'below'` | Note position relative to the mark (1.5% gap) |
| `noteWidth` | `number` | `30` | Note max width, % of frame width |
| `noteRotate` | `number` | `-2` | Degrees. Vary between about -3 and 2 so notes look handwritten. |
| `tone` | `'redline' \| 'fern'` | `'redline'` | fern marks the fix |
| `flip` | `'x' \| 'y' \| 'xy'` | | Mirror the shape, mostly for arrows |
| `pinAt` | `{ x: number; y: number }` | mark's top-right corner | Pin position in % |
| `delay` | `number` | `0.1 + index * 0.4` | Draw-on delay in seconds |
| `hideNarrow` | `boolean` | `false` | Hide below 560px of frame width |

Measuring marks: open the screenshot at its natural size, read the pixel box, divide by the image width (x, w) and height (y, h), times 100. Arrows usually have no note; pair them with the mark they point from.

```tsx
<RedlineFrame
  listLabel="What I marked on my homepage"
  caption="Sproutflow Studio, August 2026."
  marks={[
    { variant: 'circle', x: 49, y: 0.5, w: 49, h: 6.5, note: 'no phone number up top', detail: 'The header asks for a brief before it offers a call.' },
    { variant: 'box', x: 2, y: 72, w: 38, h: 10, note: 'the main button asks for homework', notePlacement: 'right', noteWidth: 24 },
    { variant: 'circle', x: 43.5, y: 77, w: 54, h: 6.5, note: 'proof hides in small tabs', tone: 'fern' },
  ]}
>
  <Image src="/redesign/sproutflow-v1-home.jpg" width={1600} height={1424} sizes="(min-width: 960px) 880px, 100vw" alt="..." />
</RedlineFrame>
```

### RedlineUnderline

Hand-drawn underline under headline words. Each word is an inline-block with its own complete wave, and the spaces between words stay plain text, so a phrase wraps between words at any width without losing a wave.

| Prop | Type | Default | |
|---|---|---|---|
| `children` | `string` | required | Plain text, 1 to 4 words |
| `tone` | `'redline' \| 'goldenrod'` | `'redline'` | goldenrod on Pine |
| `drawOn` | `boolean` | `true` | |
| `className` | `string` | | |

```tsx
<Heading as="h2" id="check-h">Get your website <RedlineUnderline>marked up.</RedlineUnderline> Free.</Heading>
```

### Draw-on behaviour (useRedlineDraw, client)

`DrawOn` (`'use client'`) is the only client code in the kit. It wraps the server-rendered markup and sets `data-redline-draw`; the CSS in `app/globals.css` does the drawing by animating a masking stroke's `stroke-dashoffset` from the path length to 0, then fades notes and pins in.

- Server render, no JavaScript, `prefers-reduced-motion: reduce`, or no IntersectionObserver: marks render fully drawn, with no animation.
- Already on screen when the page hydrates (for example a frame above the fold): stays drawn, so nothing flashes.
- Otherwise: hidden until 35% of the frame is in view, then drawn once.

### Accessibility

- Every mark, note chip, pin and underline wave is `aria-hidden`. The meaning is always in text: the frame's ordered list (visually hidden on wide frames, visible on narrow ones) and the image `alt`.
- `ButtonLink` has a visible 3px focus ring. Do not remove it.
- All motion respects `prefers-reduced-motion`.

---

## 4. Do and don't

| Do | Don't |
|---|---|
| `<Heading size="hero">` once, at the top of the page | Archivo anywhere else, or two hero headlines |
| `<Heading italic="same">` on one word | Italic phrases, italic in every section, `font-accent` in new code |
| `font-display` at 400 | `font-display font-bold`, `font-semibold` on any heading |
| `$1,500` in `font-mono text-price` | Prices in the serif or in Caveat |
| `35%` in `font-mono text-numeral`, label in `text-label` | Result figures in body text at the same size as the sentence |
| Caveat for "no phone number up top" on a Redline mark | Caveat for a paragraph, a heading, a button or a price |
| Notes of 8 words or fewer, 18px or more | Long sentences in a note; put them in `detail` |
| Redline on Birch, Paper, Lichen and white | Redline text or marks on Pine (1.99:1) |
| Goldenrod as the onDark button fill | Goldenrod as a section background |
| `pins="always"` for small or crowded screenshots | Overlapping note chips at desktop width |
| Real client work and client-reported results, labelled | Invented marks on a client's site without permission (DJN markup is not approved for the hero) |
| No em dashes in copy | Em dashes anywhere visible |

---

## 5. Notes for Wave 2

- **Everything heading-shaped is now the serif.** `font-display` and the global `h1` to `h6` rule render Instrument Serif. Existing pages that are not rebuilt yet still use v2 classes; they render without faux bold because of the `font-synthesis` guard, but check them: the current homepage hero (`components/sections/HeroSection.tsx`, `font-display text-display-xl`) is now a serif, and the mobile menu links in `components/layout/Header.tsx` use `font-display text-display-md`.
- Pages with `font-display` plus a bold class, to clean up when rebuilt: `components/Testimonial.tsx`, `components/sections/ClientMarqueeSection.tsx`, `components/sections/CustomerPathSection.tsx` (3 places), `components/layout/StudioLayout.tsx` (Heading levels 1 and 2), `components/website-check/CheckResults.tsx` (a price in `font-display font-bold`: should be `font-mono text-price`), `app/services/[path]/page.tsx`.
- `text-h4` (20px) is below the 24px display floor. Several v2 cards and `/check` headings use it with `font-display` (`WebsiteCheck.tsx`, `ReportRequest.tsx`, `TiersSection.tsx`). Use `Heading size="sm"` or body 600 instead when rebuilding.
- `components/ui/SectionShell.tsx` and the other v2 components are untouched. New pages use `components/v3`.
- The hero animation is a later wave. Leave a slot; do not depend on DJN's screenshot for the hero.
- `public/redesign/` holds the two QA images for `/v3-kit`. Production images still go through `getImageUrl()` and Blob.
