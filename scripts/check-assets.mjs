#!/usr/bin/env node
/**
 * Asset budget check.
 *
 * The current work/logo inventory is read locally or fetched and checked against the
 * budget for its class. Documentation alone did not stop a 542 KB logo being
 * served into a 40px slot, so this is the enforcement.
 *
 *   npm run check:assets           report only
 *   npm run check:assets -- --ci   exit non-zero on any error
 *
 * Manifest entries use tracked local files, matching the image URL helper.
 * Unmapped entries use the configured blob store or local /images fallback.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { collectPaths, classOf } from './asset-inventory.mjs';

const ROOT = process.cwd();
const CI = process.argv.includes('--ci');

function blobBase() {
  if (process.env.NEXT_PUBLIC_BLOB_STORE_URL) return process.env.NEXT_PUBLIC_BLOB_STORE_URL;
  for (const f of ['.env.local', '.env']) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    const m = readFileSync(p, 'utf8').match(/^NEXT_PUBLIC_BLOB_STORE_URL=(.+)$/m);
    if (m) return m[1].trim();
  }
  return null;
}

/** Dimensions from the file header. Enough for PNG, JPEG, WebP, GIF. */
function dimensions(buf) {
  if (buf.length < 24) return null;
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20), type: 'png' };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) { i += 1; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7), type: 'jpeg' };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return { type: 'jpeg' };
  }
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') {
    const fourcc = buf.slice(12, 16).toString();
    if (fourcc === 'VP8X') {
      return { w: buf.readUIntLE(24, 3) + 1, h: buf.readUIntLE(27, 3) + 1, type: 'webp' };
    }
    if (fourcc === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1, type: 'webp' };
    }
    if (fourcc === 'VP8 ') {
      return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff, type: 'webp' };
    }
    return { type: 'webp' };
  }
  return null;
}

const kb = (n) => `${Math.round(n / 1024)}KB`;

const base = blobBase();
const manifest = JSON.parse(readFileSync(join(ROOT, 'lib/optimized-images.json'), 'utf8'));

const paths = collectPaths();
const rows = [];

for (const path of paths) {
  const optimized = manifest[`images/${path}`];
  const localPath = optimized || (!base ? `/images/${path}` : null);
  let bytes = 0;
  let dim = null;
  let status = 0;
  try {
    let buf;
    if (localPath) {
      buf = readFileSync(join(ROOT, 'public', localPath));
      status = 200;
    } else {
      const res = await fetch(`${base.replace(/\/$/, '')}/images/${path}`, { signal: AbortSignal.timeout(15000) });
      status = res.status;
      if (res.ok) buf = Buffer.from(await res.arrayBuffer());
    }
    if (buf) {
      bytes = buf.length;
      dim = dimensions(buf);
    }
  } catch {
    status = 0;
  }

  const cls = classOf(path);
  const edge = dim && dim.w ? Math.max(dim.w, dim.h) : null;
  const problems = [];
  if (status !== 200) problems.push(localPath ? `Missing/unreadable local file: ${localPath}` : `HTTP ${status || 'failed'}`);
  else {
    if (!dim?.w || !dim?.h) problems.push('Cannot verify image dimensions');
    if (bytes > cls.maxBytes) problems.push(`${kb(bytes)} over ${kb(cls.maxBytes)} budget`);
    if (edge && edge > cls.maxEdge) problems.push(`${edge}px longest edge over ${cls.maxEdge}px`);
  }
  rows.push({ path, cls: cls.id, bytes, dim, edge, problems, status });
}

const pad = (s, n) => String(s).padEnd(n);
const widest = Math.max(...rows.map((r) => r.path.length), 10);

console.log('\nAsset budget report (work/logo inventory; not every site image)\n');
for (const r of rows) {
  const size = r.dim && r.dim.w ? `${r.dim.w}x${r.dim.h}` : r.dim?.type || '?';
  const flag = r.problems.length ? 'FAIL' : ' ok ';
  console.log(`  ${flag}  ${pad(r.path, widest)}  ${pad(r.cls, 12)} ${pad(size, 12)} ${pad(kb(r.bytes), 8)}`);
  for (const p of r.problems) console.log(`        ${p}`);
}

const failed = rows.filter((r) => r.problems.length);
const totalKb = rows.reduce((a, r) => a + r.bytes, 0);
console.log(`\n  ${rows.length} assets, ${kb(totalKb)} total, ${failed.length} over budget.`);
console.log('  Budgets and export requirements: docs/ASSET_SPEC.md\n');

if (failed.length && CI) process.exit(1);
