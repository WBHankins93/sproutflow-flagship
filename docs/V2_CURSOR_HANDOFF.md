# Cursor Handoff — v2 Build

Paste this file's §0 into Cursor as the opening context for every session. Then work one PR at a time from §2.

---

## 0. Context you must not lose

You are implementing a full redesign of **Sproutflow Studio** (`WBHankins93/sproutflow-flagship`), a Next.js 14 / TypeScript / Tailwind / Framer Motion site. It is a **one-person studio** run by Ben Hankins in New Orleans, LA. He builds custom websites, CRMs, booking and intake flows, dashboards, and automation for small businesses.

**Read these four docs before writing code. They are in `docs/`:**

| Doc | What it governs |
|---|---|
| `codex-handoff.md` | Design and build spec. Section layouts, component behavior, phases. |
| `design-system-v2.md` | Design rationale and tokens. |
| `V2_PR_PLAN.md` | **The build order. Overrides the handoff where they conflict.** |
| `V2_SEO_GEO_SPEC.md` | All metadata, titles, descriptions, schema. |
| `V2_TYPE_AND_CONTENT_STRATEGY.md` | Final font stack, `/resources` architecture, service page scope. |

**The handoff has four known errors** (it was written against a stale design-system export). They are corrected in `V2_PR_PLAN.md` under "Corrections to the handoff." The most important: the repo uses **Bricolage Grotesque**, not Playfair or Fraunces. Replace Bricolage with Archivo.

### Non-negotiable rules

1. **No em dashes in any user-facing string.** Use commas, periods, or rewrite. A lint check for `—` and `&mdash;` across `data/`, `app/`, `components/` ships in PR 1.
2. **Voice is first person singular.** "I" for the work, "Sproutflow" for the studio, "you" for the client. **Never "we" or "our team"** except where "we" means Ben-and-the-client ("we talk," "if we part ways"). There is no team. This is the most common violation in the existing codebase.
3. **Never invent copy, metrics, testimonials, or client outcomes.** If a string is missing, use a labeled placeholder and flag it. Ben approves all copy.
4. **Never ship build scaffolding.** Fail the build on: `{{ websitesArrow }}`, `{{ systemsArrow }}`, `{{ growthArrow }}`, `"Your words go here"`, `"Drop real captures into the empty slots"`, `"Four to six frames replace these slots"`, and raw `&#8594;` entities (use Lucide `ArrowRight`).
5. **Every section renders before its media asset exists.** Labeled placeholder, never a blank box.
6. **Respect `prefers-reduced-motion` on every animation,** including marquees.
7. **Screenshots use `object-fit: cover; object-position: top`.** Letterboxing was a defect in the previous build.
8. **Gold is never a large background fill.** It was rejected as a band.
9. **No new colors** outside the PR 3 token set.
10. **Commit often within a PR.** One commit per section or per concern, so a bad piece can be reverted alone.

### Locked decisions (do not revisit)

- **Fonts:** Archivo (display, 600/700/800), DM Sans (body, 400/500/600), Newsreader (accent italic, 400), Fira Code (mono, 400/500). Cormorant Garamond is **out** — it reads boutique. Bricolage Grotesque is **out** — it dates.
- **Phone:** `(504) 326-1676`, E.164 `+1-504-326-1676`. Byte-identical everywhere. The `(228)` number in `data/content.ts` is dead; PR 1 deletes that file.
- **Route rename:** `/how-we-handle-your-data` → `/data-and-ownership`, with a `permanentRedirect` stub at the old path.
- **Title template:** `"%s | Sproutflow Studio"`. The current one adds 46 chars and truncates every page in search results.
- **"The Sproutflow difference"** headline stays as written. Do not rewrite it.
- **Project metrics in `data/projectProof.ts` are approved** and may render.
- **Single project data source:** `data/projectProof.ts`. Add `industry` and `filterTags` to it, then delete `data/workProjects.ts`. Do not maintain two lists.
- **`CustomerPathSection` copy is not deleted** — it relocates to `/services` as "what usually breaks." Keep the component until `/services` ships.

---

## 1. Branches and PR conventions

Branch from `main`. One branch per PR below. Squash-merge.

PR description template:

```
## What
One paragraph.

## Why
Link the governing doc section, e.g. V2_PR_PLAN.md PR 3, codex-handoff.md Phase 1.

## Gates
- [ ] npm test green
- [ ] npm run build green
- [ ] <PR-specific gate from the plan>

## Not in this PR
Anything a reviewer might expect but that lands later.
```

---

## 2. PR queue

PRs 1 and 2 are parallel-safe with each other. Everything after is strictly sequential.

| # | Branch | Title | Gate |
|---|---|---|---|
| 1 | `chore/v1-cleanup` | Remove dead v1 data, orphaned sections, and voice violations | tests + build green |
| 2 | `feat/seo-metadata-base` | Metadata base layer, schema, and route rename | Rich Results passes on `/`, `/work`, `/faq`; no 404s from rename |
| 3 | `feat/design-tokens-primitives` | Type scale, color tokens, and UI primitives | no `nature-*`, no Bricolage in bundle, `/kitchen-sink` renders all primitives in both variants |
| 4 | `feat/homepage-v2` | Rebuild homepage sections | Lighthouse desktop perf 90+, no letterboxed screenshots |
| 5 | `feat/services-pages` | Services hub and per-path detail pages | each path: unique title, description, `Service` schema, 600+ words unique copy |
| 6 | `feat/work-and-case-studies` | Work index with filters and case study template | single data source, `BreadcrumbList` on every case study |
| 7 | `feat/about-page` | About page | copy approved in `V2_ABOUT_COPY.md`; **blocked on photography** |
| 8 | `feat/faq-and-resources` | FAQ regroup and resources hub | FAQ answers under 60 words, `Article` schema, RSS feed live |
| 9 | `feat/inquiry-form-v2` | Three-step inquiry form | step state survives refresh, `?path=` preselect works |
| 10 | `feat/mobile-pass` | Mobile and tablet pass | Lighthouse mobile perf 85+, a11y 100, all motion respects reduced-motion |
| 11 | `chore/design-system-resync` | Push shipped v2 back to Claude Design | — |

Full scope for each PR is in `V2_PR_PLAN.md`. Do not re-derive it from the handoff.

---

## 3. Details that get lost

Small things that are easy to miss and expensive to fix later.

**PR 1**
- `data/content.ts` and `data/services.ts` are imported by tests only, no page or component. Delete both, then repoint `__tests__/high-priority/data-validation.test.ts`, `__tests__/medium-priority/data-consistency.test.ts`, `__tests__/medium-priority/data-structure-validation.test.ts` at `servicePaths.ts` / `projectProof.ts` / `caseStudies.ts`.
- Orphaned components to delete: `ValuePropsSection.tsx`, `ValueSupportSection.tsx`, `BusinessSystemsSection.tsx`, `TrustBarSection.tsx`, `HomeTestimonialsSection.tsx`.
- `app/not-found.tsx`: the "Contact our team" CTA links to `href="#contact"`, which does not exist on a 404. Point it at `/inquiry`.
- `app/inquiry/page.tsx`: `"Ben reviews every inquiry himself."` → `"Every inquiry comes to me directly."`

**PR 2 — landed. One finding worth carrying forward.**
- **Route redirects must be declared in `next.config.js`, not as a page-level `permanentRedirect` stub.** A stub page returns 200, not 308. The existing `/how-we-work` and `/case-studies` redirects work because they are in `next.config.js`; their stub pages under `app/` are unreachable dead code and can be deleted in any later PR.
- Add `https://www.benhankins.dev/` to the `Person` node's `sameAs`. It links Ben's two web properties into one entity, which strengthens both for search and for LLM retrieval.
- `priceRange` in schema is `"$$"`, never a dollar figure.
- `areaServed` must include both New Orleans and `Country: US`. He is local but works nationwide.

**PR 3**
- `nature-*` tokens are live in `Header.tsx` and `not-found.tsx`. Migrate both before deleting the scale.
- Header goes 64px → 88px, logo 30px → 48px desktop / 40px mobile.

**PR 4**
- Do not make the laptop frame full width. That was the primary complaint about the previous build.
- Laptop screen scroll transform caps at 15% of image height, or the frame shows dead space at the end of each loop.
- Homepage stat counts derive from data (`projectProof.length`), never hardcoded. "5 live builds" goes stale the day a sixth client signs.

**PR 5**
- Per-path copy must be genuinely distinct. Near-duplicate service pages are penalized in search. Do not template the body copy.
- Path CTAs deep-link with the path preselected: `/inquiry?path=business-systems`.

**PR 8**
- Frontmatter schema: `title`, `slug`, `type: 'note' | 'guide'`, `track: 'websites' | 'systems' | 'ai'`, `date`, `updated`, `summary`, `readTime`, `canonical?`, `related: string[]`.
- `dateModified` in `Article` schema comes from `updated`.
- Any post cross-published from `benhankins.dev` must carry `canonical` pointing at the original. Full-text duplication across two domains without a canonical suppresses both.

---

## 3b. Local setup and two gotchas that cost real time

**Images 404 without an env var.** They live in Vercel Blob and were removed from
the repo in `323be5b`. Create `.env.local` with:

```
NEXT_PUBLIC_BLOB_STORE_URL=https://kektfntppap5yky4.public.blob.vercel-storage.com
```

Without it every image is a broken icon and the site looks half-built. It is in
`.env.example` now. `.env.local` is gitignored, so each machine needs its own.

**Editing `tailwind.config.js` requires a dev-server restart.** Next does not
pick up config changes through HMR. The symptom is not an error: the page
renders with *no CSS at all*, fonts fall back to Times, and every background
goes transparent, so it looks like the app is broken rather than the stylesheet
being stale. `npm run build` will pass the whole time. Kill the dev server,
`rm -rf .next`, restart.

**Verify design changes with computed styles, not screenshots.** Reading
`getComputedStyle` for font family, font size, and background colour catches
things a screenshot cannot explain, and it is how both problems above were
diagnosed.

---

## 4. Owner blockers

Cursor cannot resolve these. Flag and move on.

| Item | Blocks |
|---|---|
| Founder and studio photography, 4 to 6 frames | PR 7 |
| Five client site scroll recordings, 10 to 20s | PR 4, 5, 6 — placeholders may merge |
| CRM / booking / dashboard capture | PR 5 business-systems panel |
| Full-page screenshots, 1440 and 390 | PR 6 |
| Client logos, transparent PNG 400px+ | PR 4 marquee |
