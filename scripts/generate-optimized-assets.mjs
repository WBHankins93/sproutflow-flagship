#!/usr/bin/env node
/** Non-destructive local derivatives; no upload, cropping, background removal or artwork edits. */
import sharp from 'sharp';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { collectPaths, classOf } from './asset-inventory.mjs';

const manifest = {};
let before = 0;
let after = 0;
for (const path of collectPaths()) {
  const cls = classOf(path);
  const input = await readFile(join('public/images', path));
  const outputPath = `/optimized-images/${path.replace(/\.[^.]+$/, '.webp')}`;
  // This detailed square badge needs 240px to stay under 40KB with its alpha intact.
  const edge = path.endsWith('/NealyLogo.png') ? 240 : cls.id === 'screenshot' ? 1600 : cls.maxEdge;
  let result;
  // Lower quality only as needed to satisfy the unchanged weight budget.
  for (const quality of cls.id === 'screenshot' ? [82, 76, 70] : [90, 82, 76, 70]) {
    result = await sharp(input)
      .resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true })
      .webp({ quality, alphaQuality: 100, effort: 6 })
      .toBuffer();
    if (result.length <= cls.maxBytes) break;
  }
  if (result.length > cls.maxBytes) throw new Error(`${path} still exceeds ${cls.maxBytes} bytes; review the export manually.`);
  await mkdir(dirname(join('public', outputPath)), { recursive: true });
  await writeFile(join('public', outputPath), result);
  manifest[`images/${path}`] = outputPath;
  before += input.length;
  after += result.length;
  console.log(`${path}: ${input.length} -> ${result.length} bytes`);
}
await writeFile('lib/optimized-images.json', `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${Object.keys(manifest).length} local derivatives: ${before} -> ${after} bytes. Originals unchanged; nothing uploaded.`);
