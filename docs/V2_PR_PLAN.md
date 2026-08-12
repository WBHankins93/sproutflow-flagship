# v2 Build Plan — PR Sequence for Cursor

Master plan. Supersedes `V2_CONTENT_INSTRUCTIONS.md` where they disagree (that doc's §2 titles and §3 filler cleanup are folded into PR 1 and PR 2 below).

Source of truth for design: `codex-handoff.md` + `design-system-v2.md` from the Design Makeover zip.
Source of truth for SEO/GEO/metadata: `docs/V2_SEO_GEO_SPEC.md` (new, written alongside this).

**Resolved:** phone is **(504) 326-1676** (Google Voice, New Orleans local). The `(228)` number in `data/content.ts` is dead and that file is being deleted. Route rename `/how-we-handle-your-data` → `/data-and-ownership` is **approved**.

---

## Corrections to the handoff before Cursor starts

The handoff was written against the Design system export, which is two months behind the repo. Four instructions are wrong. Fix these in the handoff or Cursor will chase ghosts.

| Handoff says | Reality in repo | Do this instead |
|---|---|---|
| "Remove Playfair Display and Fraunces entirely" | Neither is installed. `app/layout.tsx` loads `Bricolage_Grotesque` + `DM_Sans`. | Replace **Bricolage Grotesque** with Archivo. Everything else about Phase 1 stands. |
| Client marquee + `/work` source `data/workProjects.ts` | `/work` and the homepage both render from `data/projectProof.ts`. `workProjects.ts` exists but is unused by those views. | Consolidate onto **`projectProof.ts`**, add `industry` and `filterTags` there, then delete `workProjects.ts`. Do not maintain two project lists. |
| "Replaces `CustomerPathSection`… content moves to `/services`" | Correct, and confirmed in the v2 Services mockup as section "04, what usually breaks". | Keep as written. Do not delete the component until `/services` ships, or the copy is lost. |
| Phase 5.8 keeps `/how-we-handle-your-data` | Route is being renamed. | Rename to `/data-and-ownership`, add a `permanentRedirect` stub at the old path, matching how `/how-we-work` and `/case-studies` already work. |

**Also add to Phase 0 ground rules:** the mockups contain build scaffolding that must never reach a PR. Grep for and fail the build on: `{{ websitesArrow }}`, `{{ systemsArrow }}`, `{{ growthArrow }}`, `"Your words go here"`, `"Drop real captures into the empty slots"`, `"Four to six frames replace these slots"`, and raw `&#8594;` entities (use Lucide `ArrowRight`).

---

## Copy review: the v2 copy is good. Six notes.

I read the extracted copy from all nine mockups. It is genuinely in your voice — first person, short declaratives, concrete situations, no em dashes, no ban-list words. Ship it nearly as written. Six things:

1. ~~"The Sproutflow difference" is an agency trope, replace it.~~ **Overruled by Ben — keep it as written.** Rationale accepted: a named difference is what makes a company distinct, and the section earns it with concrete copy rather than claims. Ship the headline with the gold italic on "difference."

2. **"6+ years"** conflicts with the About page's "I spent six years." Pick one number and use it in both places plus the schema. If it is more than six, say the real number, since it is your strongest credibility signal against a solo-founder objection.

3. **"5 Live client builds running today"** is a stat that goes stale the moment you sign a sixth client. Move it into `data/projectProof.ts` as a derived count (`projectProof.length`) rather than a hardcoded string, so it updates itself. Same for the `/work` and `/faq` mono counts.

4. **"Enterprise delivery habits, small business economics"** appears on the homepage and again on About as "Enterprise habits, small business economics." Make them identical. Repeated verbatim it reads as a position; repeated with variation it reads as an accident. This is also your best LLM-citable sentence, see the SEO spec.

5. **Placeholder blocks that block launch:** the About page ships with `"Your words go here — send me four to six sentences in your own voice."` You are the only person who can clear that. Same for the four to six studio photographs. Everything else can go live with labeled placeholders; this cannot.

6. **Service path names are not what people search.** "Websites," "Business systems," and "Growth and support" are your internal framing and they are good for the site's spine. They are not queries. Handled in the SEO spec: the H1 keeps your language, the `<title>` and schema carry the search language. Do not let Cursor "fix" the H1s to match keywords.

---

## PR sequence

Commit often inside each PR. One PR per numbered block. Do not open PR *n+1* before *n* is merged, except where marked parallel-safe.

### PR 1 — Dead code and voice cleanup
**Parallel-safe. Do this first, it shrinks every later diff.**

- Delete `data/content.ts` and `data/services.ts`. Neither is imported by any page or component; only tests reference them. They hold the v1 copy deck, the dead `(228)` phone number, and three fabricated demo clients (`Bayou Heritage Tours`, `Créole Corner Café`, `Gulf Coast Legal`).
- Delete orphaned components: `ValuePropsSection.tsx`, `ValueSupportSection.tsx`, `BusinessSystemsSection.tsx`, `TrustBarSection.tsx`, `HomeTestimonialsSection.tsx`.
- Repoint or drop the three tests that import the deleted data: `__tests__/high-priority/data-validation.test.ts`, `__tests__/medium-priority/data-consistency.test.ts`, `__tests__/medium-priority/data-structure-validation.test.ts`. Assert against `servicePaths.ts`, `projectProof.ts`, `caseStudies.ts` instead.
- `app/not-found.tsx`: strip the four "Professional" filler comments; `"Need assistance finding something specific?"` → `"Looking for something specific?"`; `"Contact our team"` → `"Tell me what you were looking for"` (there is no team); fix the broken `href="#contact"` → `/inquiry`.
- `app/inquiry/page.tsx`: `"Ben reviews every inquiry himself."` → `"Every inquiry comes to me directly."` (first person in the title, third person in the body, same list item).
- Add the Phase 0 em-dash and scaffolding-string guards as a lint script.

**Gate:** `npm test` and `npm run build` green.

### PR 2 — Route rename + metadata base layer
**Parallel-safe with PR 1.** Implements `V2_SEO_GEO_SPEC.md` §1–§3.

- Rename `/how-we-handle-your-data` → `/data-and-ownership`; `permanentRedirect` stub at the old path; update the Footer link and label (`"How We Handle Your Data"` → `"How I Handle Your Data"`).
- `app/layout.tsx`: title template `"%s | Sproutflow Studio - New Orleans Web Design"` → `"%s | Sproutflow Studio"`. The current template adds 46 characters to every page and pushes all of them past the SERP cutoff. It also disagrees with the case study pages, which already use the short form.
- Per-page titles and descriptions per the spec table.
- `components/StructuredData.tsx`: LocalBusiness/ProfessionalService + Person(Ben) + sameAs + the corrected `(504) 326-1676`. This is the base layer.
- Add `/llms.txt` and confirm `app/sitemap.ts` + `app/robots.ts` cover the new routes.

**Gate:** Rich Results Test passes on `/`, `/work`, `/faq`. No 404s from the rename.

### PR 3 — Tokens, fonts, primitives
Handoff Phase 1 + Phase 2, with the Bricolage correction above.

- Archivo / DM Sans / Cormorant Garamond / Fira Code; type scale; `ink` + `cream` scales; delete `nature` (used today in `Header.tsx` and `not-found.tsx`, migrate both); `.grain` + `.mask-fade-x`; `/public/textures/grain.svg`; header 88px with a 48px logo.
- The six `components/ui/` primitives: `SectionShell`, `Marquee`, `StatRail`, `Pill`, `ArrowDisc`, `MediaPanel`, plus `DeviceFrame`.
- Ship a `/kitchen-sink` route rendering all seven in both `ink` and `cream`. Mark it `noindex`.

**Gate:** every existing page still builds and renders. No `nature-*` left. No Bricolage in the bundle.

### PR 4 — Homepage rebuild
Handoff Phase 3, sections 3.1–3.11, in the specified order.

Split into commits per section so a bad section can be reverted alone. Apply copy notes 1, 3, and 4 above. Use labeled `MediaPanel` placeholders wherever the client recordings have not landed — the homepage must be shippable before the video assets exist.

**Gate:** Lighthouse performance 90+ desktop with loops lazy-loaded. No letterboxed screenshots.

### PR 5 — `/services` hub and `/services/[path]`
Handoff Phase 5.3. **Highest commercial value in the whole build** — this is what makes the "top 5 per service" goal reachable, because it is the first time each service gets its own indexable URL.

Includes relocating the `CustomerPathSection` copy in as "what usually breaks." Per-path metadata, `Service` schema, and per-path FAQ subsets come from the SEO spec §4.

**Gate:** each path page has a unique title, description, `Service` schema, and at least 600 words of unique body copy.

### PR 6 — `/work` index + case study template
Handoff Phase 5.1 and 5.2. Consolidate onto `projectProof.ts`; add `industry` and `filterTags`; delete `workProjects.ts`. Filter bar, project rows, the fixed ten-section case study order, `BreadcrumbList` schema.

**Metrics: cleared.** Ben has confirmed the `result` strings in `projectProof.ts` ("50% more qualified inquiries," "2x consultation requests," "30% customer acquisition growth") are accurate and defensible. They may render. Handoff Phase 0 rule 4 is satisfied for these five; it still applies to any new metric added later.

### PR 7 — `/about`
Handoff Phase 5.4. **Blocked on your four to six sentences and the photography.** Everything else can be built with placeholders, but do not merge with `"Your words go here"` in the tree.

### PR 8 — `/faq` regroup + `/resources` hub
Handoff Phase 5.5 and 5.6. Grouped FAQ accordion with answers under 60 words, `FAQPage` schema per group. Resources hub with Guides and Notes. Resources is the engine for the GEO cadence in the SEO spec §6 — it is how the site stays fresh for LLM retrieval without touching the base layer.

### PR 9 — Inquiry form
Handoff Phase 4 and 5.7. Three steps, `sessionStorage` persistence, per-step validation, prominent optional budget field, `?path=` preselect, real confirmation state. Backend submit unchanged.

### PR 10 — Mobile
Handoff Phase 6 in full. Do not defer this into the section PRs; a single dedicated pass at 390/414/768/1024 catches the inconsistencies that per-section work misses.

**Gate:** Lighthouse mobile performance 85+, accessibility 100, every animation off under `prefers-reduced-motion`.

### PR 11 — Design system re-sync
Push the shipped v2 back to the Claude Design project so it stops serving v1. Cheap once the code is settled, and it prevents the next planning cycle from starting on stale inputs.

---

## Asset blockers

From the handoff, restated as owner actions. These gate PRs, not the whole build.

| Asset | Gates |
|---|---|
| Your About copy, 4 to 6 sentences | **PR 7** — hard blocker |
| Founder + studio photography, 4 to 6 frames | PR 7 |
| Five client site scroll recordings, 10 to 20s | PR 4, PR 5, PR 6 (placeholders acceptable to merge) |
| CRM / booking / dashboard capture | PR 5 business-systems panel |
| Full-page screenshots, 1440 and 390 | PR 6 |
| Client logos, transparent PNG 400px+ | PR 4 marquee |
| Approval on each outcome metric | **PR 6** — hard blocker |
