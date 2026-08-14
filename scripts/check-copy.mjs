#!/usr/bin/env node
/**
 * Copy guard for the v2 build.
 *
 * Enforces the non-negotiable copy rules from docs/V2_CURSOR_HANDOFF.md:
 *   1. No em dashes in user-facing strings.
 *   2. No build scaffolding from the design mockups.
 *   3. No raw HTML arrow entities (use the Lucide ArrowRight icon).
 *   4. No "our team" / "the team" voice violations. Sproutflow is one person.
 *
 * Run: npm run check:copy
 */

import { readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { readdirSync, statSync } from 'node:fs'

const ROOT = process.cwd()
const SCAN_DIRS = ['app', 'components', 'data', 'lib']
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mdx']
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '__tests__'])

const RULES = [
  {
    id: 'em-dash',
    test: /—|&mdash;/,
    message: 'Em dash found. Use a comma, a period, or rewrite the sentence.',
  },
  {
    id: 'scaffolding',
    test: /\{\{\s*\w+Arrow\s*\}\}|Your words go here|Drop real captures into the empty slots|Four to six frames replace these slots/,
    message: 'Design mockup scaffolding found. Replace with real content or a labeled placeholder component.',
  },
  {
    // The literal markers above only catch strings someone already knew to ban.
    // This catches the shape of "this asset is not real yet" copy, which is how
    // "Client scroll recordings replace these stills when ready" shipped to the
    // homepage and survived a passing guard run.
    id: 'placeholder-prose',
    test: /\b(replace these|replaces? this (?:still|image|placeholder)|when ready|real (?:captures?|photography|footage) (?:go|goes|drop)|coming soon|placeholder (?:copy|text|image)|final copy (?:to|goes)|will be added after|page skeleton|content review|is ready for your review|to be written|pending review)\b/i,
    message: 'Reads like placeholder prose describing a missing asset. Use a MediaPanel placeholder prop instead of shipping the sentence.',
  },
  {
    id: 'arrow-entity',
    test: /&#8594;|&rarr;/,
    message: 'Raw HTML arrow entity found. Use the Lucide ArrowRight icon instead.',
  },
  {
    id: 'team-voice',
    // Narrow on purpose. A bare "our team" is legitimate inside a client
    // testimonial, where the client is talking about their own team. Only
    // flag phrasings that can only be Sproutflow referring to itself.
    test: /\b(contact our team|our team of|reach out to our team|the team at Sproutflow|our staff|we're a team|Sproutflow's team)\b/i,
    message: 'Voice violation. Sproutflow is one person. Use "I" for the work and "Sproutflow" for the studio.',
  },
]

/** Lines carrying this marker are skipped. Use sparingly, with a reason. */
const IGNORE_MARKER = 'copy-guard-ignore'

function walk(dir, files = []) {
  let entries
  try {
    entries = readdirSync(dir)
  } catch {
    return files
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const stats = statSync(full)
    if (stats.isDirectory()) {
      walk(full, files)
    } else if (EXTENSIONS.some(ext => entry.endsWith(ext))) {
      files.push(full)
    }
  }
  return files
}

const violations = []

for (const dir of SCAN_DIRS) {
  for (const file of walk(join(ROOT, dir))) {
    const lines = readFileSync(file, 'utf8').split('\n')
    lines.forEach((line, index) => {
      if (line.includes(IGNORE_MARKER)) return
      for (const rule of RULES) {
        if (rule.test.test(line)) {
          violations.push({
            file: relative(ROOT, file).split(sep).join('/'),
            line: index + 1,
            rule: rule.id,
            message: rule.message,
            excerpt: line.trim().slice(0, 120),
          })
        }
      }
    })
  }
}

if (violations.length === 0) {
  console.log('Copy guard: clean.')
  process.exit(0)
}

console.error(`Copy guard: ${violations.length} violation(s).\n`)
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.rule}]`)
  console.error(`    ${v.message}`)
  console.error(`    > ${v.excerpt}\n`)
}
process.exit(1)
