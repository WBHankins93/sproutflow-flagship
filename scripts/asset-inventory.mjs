import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const ROOT = process.cwd();

/**
 * Budgets per asset class.
 *
 * `maxEdge` is the longest side. Rendered sizes are small, so 2x the largest
 * render is the ceiling; anything past that is a file nobody resized.
 */
export const CLASSES = [
  {
    id: 'client-logo',
    match: (p) => /client-logos\//.test(p) && !/-project|-homepage|home-page/.test(p),
    maxBytes: 40 * 1024,
    maxEdge: 400,
    note: 'renders 28 to 56px tall',
  },
  {
    id: 'screenshot',
    match: (p) => /client-logos\/.*(-project|-homepage|home-page)/.test(p),
    maxBytes: 400 * 1024,
    maxEdge: 2000,
    note: 'renders up to 1000px wide',
  },
  {
    id: 'brand-logo',
    match: (p) => /^logo\//.test(p),
    maxBytes: 80 * 1024,
    maxEdge: 800,
    note: 'renders up to 220px wide',
  },
  {
    id: 'photography',
    match: () => true,
    maxBytes: 500 * 1024,
    maxEdge: 2400,
    note: 'renders up to 1200px wide',
  },
];

export const classOf = (p) => CLASSES.find((c) => c.match(p));

/** Current budget inventory: work/logo paths in three data files plus header/footer marks. */
export function collectPaths() {
  const paths = new Set();
  const files = ['data/projectProof.ts', 'data/caseStudies.ts', 'data/testimonials.ts'];
  for (const f of files) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    const src = readFileSync(p, 'utf8');
    for (const m of src.matchAll(/'((?:images\/)?(?:work|logo)\/[^']+\.(?:png|jpe?g|webp|avif|svg))'/g)) {
      paths.add(m[1].replace(/^images\//, ''));
    }
  }
  // Brand assets referenced directly in components.
  for (const m of readFileSync(join(ROOT, 'components/layout/Footer.tsx'), 'utf8')
    .matchAll(/getImageUrl\('([^']+)'\)/g)) paths.add(m[1]);
  for (const m of readFileSync(join(ROOT, 'components/layout/Header.tsx'), 'utf8')
    .matchAll(/getImageUrl\('([^']+)'\)/g)) paths.add(m[1]);
  return [...paths].sort();
}

