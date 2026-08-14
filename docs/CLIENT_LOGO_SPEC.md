# Client Logo Assets — Export Spec

The code now normalises whatever it is given. This spec is how to stop needing
that normalisation, and it is the thing to hand a client when you ask for their
mark.

---

## The problem, measured

Current assets in `images/work/client-logos/`, as served:

| File | Dimensions | Aspect | Weight |
|---|---|---|---|
| `second-line.png` | 564 × 144 | 3.9:1 | 31 KB |
| `logo.png` (NOLA) | 3000 × 3000 | 1:1 | 195 KB |
| `NealyLogo.png` | 500 × 500 | 1:1 | 167 KB |
| `djn-logo.webp` | 2500 × 1406 | 1.8:1 | 281 KB |
| `bekky-no-background.png` | 1000 × 1000 | 1:1 | 542 KB |

Three separate problems:

1. **Aspect ratios span 1:1 to 3.9:1.** Dropped into one slot, a square badge
   scaled to a wordmark's width reads about four times heavier. There is no
   single box that flatters both.
2. **Source sizes span 564px to 3000px.** The 3000px file is being served for a
   40px slot.
3. **About 1.2 MB of logos**, one of them 542 KB, for marks that render at
   28 to 56 pixels tall.

Filenames are also inconsistent (`logo.png`, `NealyLogo.png`,
`bekky-no-background.png`), which makes the data file hard to scan.

---

## How the code handles it today

`components/ui/ClientLogo.tsx`:

- **Fixed by height, free in width.** Height is the constant a viewer perceives,
  so all marks sit on one optical baseline regardless of aspect.
- **`object-contain`, never `cover`.** A cropped logo is a broken logo.
- **Per-project `logoScale`** in `data/projectProof.ts` for the optical
  correction that arithmetic cannot do. Square badges are scaled to roughly
  0.72 to 0.78; the wide wordmark is the 1.0 reference. Tuned by eye.
- **Light chip on ink.** Most client marks are dark-on-transparent and vanish on
  a dark canvas. The ink variant sets them on a cream chip rather than inverting
  artwork that was never drawn for inversion.

This makes mismatched sources presentable. It does not make them good.

---

## Export spec for new logos

Ask for, in order of preference:

1. **SVG**, transparent, paths not embedded raster. Best case by a wide margin:
   one file, sharp at any size, usually under 20 KB.
2. **PNG at 2x the largest render size**, transparent background. Largest
   current render is 56px tall, so **160px tall** is plenty. Width follows the
   mark.

Requirements either way:

- **Transparent background.** No white box, no coloured card.
- **Trimmed.** No baked-in padding. `ClientLogo` supplies its own spacing, so
  built-in whitespace fights it and makes the mark look small.
- **Horizontal lockup** where the client has one. A stacked or badge lockup
  costs optical weight in a row of wordmarks.
- **Dark version.** Most marks sit on cream. A light version is only needed if
  you later drop the chip on ink.
- **Under 40 KB.** Anything larger is a raster that was never resized.

### Naming

`{project-id}-logo.{svg|png}`, matching the `id` in `projectProof.ts`:

```
second-line-psychiatry-logo.svg
nola-pool-solutions-logo.svg
nealy-events-logo.svg
djn-services-logo.svg
big-butt-association-logo.svg
```

---

## Re-export worth doing now

Not blocking, but each is quick and each pays for itself:

| Asset | Action |
|---|---|
| `bekky-no-background.png` | 542 KB for a 40px slot. Re-export at 160px tall. |
| `djn-logo.webp` | 281 KB, 2500px wide. Re-export at 160px tall. |
| `logo.png` (NOLA) | 3000 × 3000. Rename to the convention and re-export. |
| `NealyLogo.png` | Rename to the convention. |
| all | Ask each client for the SVG. Most have one and will send it. |

After re-exporting, revisit `logoScale` in `data/projectProof.ts`. Trimmed
sources need less correction, and several values may go to 1.

---

## Where logos render

- **Client marquee** (homepage) — `size="md"`, cream, no chip.
- **Project rows** (`/work`, homepage work section, related work) —
  `size="sm"`, follows the row variant.

Two places worth adding once the assets are cleaned up:

- **Case study headers**, beside the client name.
- **Testimonial cards**, where `testimonials.ts` already carries an optional
  `logoSrc`.
