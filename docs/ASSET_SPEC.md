# Asset Spec and Budgets

Every image the site serves, what it may weigh, and how to export it.

Enforced by `npm run check:assets`, which fetches each referenced asset,
measures it, and reports anything over budget. Add `-- --ci` to fail a build on
violations.

**Current state: 12 assets, 16.9 MB, all 12 over budget.** Documentation alone
did not prevent that, which is why the check exists.

---

## Budgets

| Class | Max weight | Max longest edge | Renders at |
|---|---|---|---|
| `client-logo` | 40 KB | 400 px | 28 to 56 px tall |
| `brand-logo` | 80 KB | 800 px | up to 220 px wide |
| `screenshot` | 400 KB | 2000 px | up to 1000 px wide |
| `photography` | 500 KB | 2400 px | up to 1200 px wide |

The ceiling is roughly 2x the largest render size. Past that is a file nobody
resized.

Next/Image resizes on serve, so a visitor does not download the 4 MB original.
The cost lands instead on blob storage, on Vercel image optimisation, and on
the first request for each new size, which is uncached and slow.

---

## Screenshots are the expensive problem

| File | Dimensions | Weight |
|---|---|---|
| `nps-project.png` | 2182 × 1194 | **4033 KB** |
| `nealy-project.png` | 2194 × 1190 | **3981 KB** |
| `bba-homepage.png` | 2562 × 1764 | 3137 KB |
| `djn-new-home-page.png` | 3312 × 1716 | 2838 KB |
| `second-line-project.png` | 2198 × 1178 | 1231 KB |

About 15 MB, and `second-line-project.png` is the homepage hero. All are PNG,
which is the wrong format for a photographic page capture.

**Fix: re-export as WebP at 1600px wide, quality 82.** Expect roughly 150 to
250 KB each, a 90 percent reduction with no visible difference at render size.
PNG is only right for a mark with flat colour and hard edges.

---

## Brand logos

| File | Dimensions | Weight |
|---|---|---|
| `logo/sproutflow-white-logo.png` | 1592 × 656 | 298 KB |
| `logo/main-logo-Photoroom.png` | 1024 × 422 | 169 KB |

Both are your own mark, so an SVG almost certainly exists. Using it removes
these from the budget entirely and makes the header sharp at any size.

---

## Client logos, measured

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

## Optimisation already done

Every asset has been re-exported locally to WebP and staged in
`optimized-assets/` (gitignored). Measured results:

| Asset | Before | After | Saving |
|---|---|---|---|
| `nps-project` | 4032 KB | 126 KB | 97% |
| `nealy-project` | 3980 KB | 131 KB | 97% |
| `bba-homepage` | 3137 KB | 72 KB | 98% |
| `djn-new-home-page` | 2837 KB | 44 KB | 99% |
| `second-line-project` | 1230 KB | 49 KB | 96% |
| `bekky-no-background` | 542 KB | 24 KB | 96% |
| `sproutflow-white-logo` | 298 KB | 28 KB | 91% |
| `djn-logo` | 281 KB | 11 KB | 96% |
| `logo` (NOLA) | 194 KB | 9 KB | 96% |
| `main-logo-Photoroom` | 168 KB | 42 KB | 75% |
| `NealyLogo` | 166 KB | 60 KB | 64% |
| `second-line` | 30 KB | 7 KB | 77% |

**16.9 MB to 608 KB, a 97% reduction.** Screenshots at 1600px wide, q82.
Logos at 400px longest edge, q90, alpha preserved. Brand logos at 800px.

### Uploading them

Blob writes need `BLOB_READ_WRITE_TOKEN` in `.env.local`. Get it from the Vercel
dashboard under Storage, your blob store, the tokens tab. Then:

```bash
npx tsx scripts/upload-optimized-assets.ts --dry-run
npx tsx scripts/upload-optimized-assets.ts --apply-paths
npm run check:assets
```

The script uploads everything staged, reads the data files to find what each
asset is *currently* referenced as rather than assuming an extension, and
rewrites those references. Old blobs are left in place, so a bad upload rolls
back by reverting the data files alone. Delete the originals once the new
assets are confirmed live.

---

## The Second Line logo, recovered

`second-line.png` was RGBA with **every pixel fully opaque**: the white
background was baked in, so it would have rendered as a solid rectangle
wherever every other mark floats.

The background was uniform white across 87 percent of the image, so it was
recoverable. The staged version un-mattes from white, deriving alpha from pixel
luminance and normalising so the darkest ink returns to fully opaque. Result:
87 percent transparent, 10 percent anti-aliased edge, real alpha channel, 12 KB.

**This is a recovery, not a substitute for the original.** Un-matting cannot
invent detail the flattening destroyed, and a wordmark this thin is mostly
anti-aliased edge. Still worth asking the client for the SVG. Until then the
staged file is a genuine improvement over a white box.

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

## Running the check

```bash
npm run check:assets
```

Requires `NEXT_PUBLIC_BLOB_STORE_URL`. Without it the check skips rather than
failing, so it never blocks a fresh clone.

Run it after adding any asset, and before asking whether the site feels slow.

---

## Where logos render

- **Client marquee** (homepage) — `size="md"`, cream, no chip.
- **Project rows** (`/work`, homepage work section, related work) —
  `size="sm"`, follows the row variant.

Two places worth adding once the assets are cleaned up:

- **Case study headers**, beside the client name.
- **Testimonial cards**, where `testimonials.ts` already carries an optional
  `logoSrc`.
