# Asset budget fix — October 15, 2026

## Issue and resolution

The existing budget inventory failed for all 12 original assets. Previously generated derivatives lived in a gitignored staging directory and did not change the files served by the site. This implementation adds reviewable WebP copies under `public/optimized-images/` and an explicit `lib/optimized-images.json` source-to-URL manifest. The image helper selects those copies in every environment; unmapped images retain the existing configured blob/local fallback.

No originals were overwritten. No remote files were uploaded, deleted, or changed. Deployment is still required before production serves these derivatives.

## Measurements

Local originals total **17,307,795 bytes**; derivatives total **637,040 bytes**, a **96.3% reduction**. This measures source assets, not actual browser transfer bytes after Next/Image optimization.

| Asset | Output dimensions | Output bytes |
| --- | --- | --- |
| Main brand logo | 800 × 330 | 45,328 |
| White brand logo | 800 × 330 | 37,710 |
| Nealy logo | 240 × 240 | 29,380 |
| BBA homepage | 1600 × 1102 | 80,916 |
| BBA logo | 400 × 400 | 28,914 |
| DJN logo | 400 × 225 | 11,380 |
| DJN homepage | 1600 × 829 | 47,890 |
| NOLA logo | 400 × 400 | 15,292 |
| Nealy project | 1600 × 868 | 136,356 |
| NOLA project | 1600 × 876 | 144,980 |
| Second Line project | 1600 × 858 | 51,434 |
| Second Line logo | 400 × 102 | 7,460 |

## Export and coverage

`node scripts/generate-optimized-assets.mjs` regenerates derivatives and the manifest using Sharp (installed through the existing Next dependency tree). Original files must be available in the gitignored `public/images/` directory. Normal builds need only the tracked derivatives and manifest; regeneration is not a build step.

Exports preserve aspect ratio and alpha, without enlargement, cropping, recoloring, background removal, or other artwork edits. Screenshots use quality 82 and a 1600px longest edge. Logos start at quality 90; the script can lower quality only if required by the unchanged byte budgets. The detailed Nealy badge uses a 240px longest edge to stay below 40KB with alpha preserved. The previously documented Second Line background recovery is not part of this export: its original baked-in background remains. Obtaining client SVG source art remains useful.

`asset-inventory.mjs` shares the inventory and budgets between generation and checking. Coverage is deliberately explicit: work/logo references in projectProof, caseStudies, testimonials, and header/footer marks. This includes the hidden BBA project. It does **not** claim coverage of all founder photography, service imagery, demo images, or additional case-study before/after screenshots. Unmapped inventory additions are checked against the configured blob origin, or the local original when there is no origin. Missing mapped files and unreadable dimensions fail rather than skipping.

## Verification

- `npm run check:assets -- --ci`: 12 assets, 622 KiB rounded total, zero budget failures; ceilings unchanged.
- Image helper and offers targeted tests: 2 suites, 24 tests passing. Tests verify every manifest entry exists, optimized paths win even with a blob origin, optional leading slashes resolve consistently, and unmapped blob/local fallbacks remain intact.
- Visually inspected Nealy's exported badge and project screenshot: full artwork retained, legible screenshot, no crop. Whole-site browser verification belongs to the main review report.

## Rollback

Revert the manifest routing in `lib/blob-images.ts` to restore original blob/local resolution. Originals and remote storage remain available. No content-data path migration or storage cleanup is required.
