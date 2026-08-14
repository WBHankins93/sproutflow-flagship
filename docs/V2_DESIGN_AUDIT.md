# V2 Design Audit and Finishing Plan

Audited `codex/v2-page-skeletons` at `4ed704b`, running locally at 1440x1000 with the blob store configured.

**Verdict: the structure is right and the surface is not.** Codex built every route, wired the data model correctly, and kept the voice rules. What it did not do is *use* the design system it was given. The type scale has nine tokens; the site uses three. The accent typeface appears on one page out of seven. That is the whole reason it reads generic.

---

## 1. What is actually correct

Do not redo any of this.

- All 18 routes build and return 200, including `/services/[path]`, `/resources/[slug]`, `/about`.
- `npm run build` green, 169 tests pass, `tsc --noEmit` clean, `check:copy` clean.
- Fonts load and resolve correctly: Archivo display, DM Sans body, Newsreader accent, Fira Code mono. No Bricolage in the bundle.
- Ink and cream tokens are live; `.grain` is applied on ink sections.
- Data consolidated onto `projectProof` with `industry`, `filterTags`, `status`, `scope`, `summary`. `workProjects.ts` is gone.
- Derived counts are used, not hardcoded (`listedProjectProof.length`).
- Four useful primitives were added beyond the PR 3 set: `PageHeader`, `FooterCta`, `ProjectRow`, `FaqAccordion`.

## 2. Two things that look broken but are not

- **Images 404 locally.** They live in Vercel Blob and were deliberately removed from the repo in `323be5b`. Local dev needs `NEXT_PUBLIC_BLOB_STORE_URL=https://kektfntppap5yky4.public.blob.vercel-storage.com` in `.env.local`. I added it locally to run this audit. Production is fine. **Add this to `.env.example`** so the next person does not lose an hour on it.
- **"4 live client builds" with 5 projects.** One entry has `listed: false`. Working as designed.

---

## 3. Why it reads bland and AI-crafted

Five measured causes, most damaging first.

### 3.1 The accent typeface exists on one page

Rendered `font-accent` (Newsreader italic) instances:

| Page | Count |
|---|---|
| `/` | 19 |
| `/services` | **0** |
| `/services/websites` | **0** |
| `/work` | **0** |
| `/about` | **0** |
| `/faq` | **0** |
| `/resources` | **0** |

The homepage got the full treatment. Every other page is Archivo plus DM Sans and nothing else, which is a competent, characterless pairing that any generator would produce. **This single fact explains most of the "too bland" reaction.** The face carrying all the warmth is loaded on every page and used on one.

### 3.2 `text-h4` is used zero times, sitewide

The scale defines it. Nothing uses it. Every section therefore goes straight from a 60px headline to 16px body with no step between. There is no sub-heading layer anywhere on the site, so nothing inside a section can be emphasized relative to anything else, and long sections turn into undifferentiated text.

### 3.3 One size does nearly every job

Homepage section headings, measured:

```
Hero                            80.64px   display-xl
Difference                      60.48px   display-lg
Services                        60.48px   display-lg
Work                            60.48px   display-lg
Process                         60.48px   display-lg
About                           60.48px   display-lg
Testimonials                    60.48px   display-lg
FAQ                             60.48px   display-lg
Contact                         60.48px   display-lg
```

Eight of nine sections are pixel-identical. Every section shouts at exactly the same volume, so none of them lands. Editorial design earns attention by *withholding* it from most sections and spending it on two or three.

### 3.4 The ink and cream alternation collapsed

Top-level section backgrounds:

- **`/work`: ink, ink.** The entire page from header to footer CTA is one unbroken dark slab.
- **`/`: ink, cream, ink, ink, cream, ink, cream, cream, ink.** Two adjacent ink pairs and one adjacent cream pair.

Adjacent same-canvas sections merge visually into one long scroll with no sense of chapters. The spec called for alternation specifically to prevent this.

### 3.5 Device frames are invisible

`DeviceFrame` draws its bezel in `border-ink-800` (#1B211B). It sits on a `bg-ink-900` (#141914) section. Those differ by 7 points of luminance and read as the same color.

The result: the hero centerpiece, the first thing anyone sees, is a bare white rectangle floating on a dark field with no laptop around it. The frame is rendering; it is camouflaged. **This is a defect I introduced in PR 3**, not a Codex error.

---

## 4. Real bugs

1. **Scaffolding copy is live on the homepage.** `HeroSection.tsx:77` renders *"Client scroll recordings replace these stills when ready"* to every visitor. It also overflows its container and is clipped mid-word.
2. **The hero phone frame is positioned against the wrong ancestor.** It is `absolute -bottom-8 right-0` but its nearest positioned ancestor is the grid column, not the `max-w-[620px]` wrapper, so it drifts right and gets cut by the section's `overflow-hidden`.
3. **`check:copy` did not catch bug 1.** The scaffolding list does not include that string, and the guard only scans source for known markers. It needs a rule for the general pattern.
4. **`growth-rings.svg` was never committed.** The nature texture work from the last session is sitting untracked. `.grain` is still generic film noise everywhere, so the botanical identity decision never actually landed.

---

## 5. Plan

Five PRs. The first two are where nearly all the perceived quality lives.

### Fix 1 — `fix/type-hierarchy` (highest impact)

Establish real hierarchy. This is a copy-free, layout-free change: only classes move.

- **Assign each section a deliberate weight** instead of defaulting to `display-lg`. Rough target for the homepage: hero `display-xl`; Difference and Work get `display-lg`; Services, Process, About get `display-md`; Testimonials and FAQ get `display-md` with a smaller measure. The exact assignment is a judgment call to make with eyes on the page, but the rule is: **no more than three sections per page may share a size.**
- **Introduce `text-h4` as the sub-heading layer** in every section that currently jumps from headline to body: service rows, process steps, case study blocks, resource rows, data-and-ownership cards.
- **Vary the measure, not just the size.** Sections whose headline runs to three lines at `display-lg` should either drop a size or cap at `max-w-[18ch]`.

### Fix 2 — `fix/accent-typography` (highest impact)

Put Newsreader on every page. The pattern already exists in the hero; apply it consistently.

- **One accented phrase per page headline.** `/work` "The work, and *what changed after*." `/services` "Three paths. *Pick the closest*." `/about` "I stay close to *the problem*." Never more than one per headline.
- **All pull quotes and testimonials in accent italic.** This was in the original handoff and was not implemented.
- **Case study problem statements in accent italic**, which the handoff specified as the emotional anchor of the page.
- **Resource standfirsts in accent italic.**

Guardrail so it does not swing the other way: accent italic is for a *phrase*, never a paragraph, and never for UI labels, buttons, or nav.

### Fix 3 — `fix/section-rhythm`

- Rebuild `/work` so it alternates. At minimum the project list should sit on cream between an ink header and an ink footer CTA. A page of five dark rows in a row is the least readable thing on the site.
- Remove adjacent same-canvas pairs on `/` and `/services`.
- **Add a `SectionShell` dev-time warning** when two consecutive shells share a variant, so this cannot silently regress.

### Fix 4 — `fix/device-frames-and-hero`

- Give `DeviceFrame` visible chrome on dark: lighten the bezel, or add a hairline `border-white/15` and a real drop shadow so the laptop reads as an object.
- Delete the scaffolding caption at `HeroSection.tsx:77`.
- Add `relative` to the `max-w-[620px]` wrapper so the phone anchors correctly, and give it room so it is not clipped.
- Add a `check:copy` rule for the general pattern (`replace these`, `when ready`, `stills`, `coming soon`).

### Fix 5 — `feat/nature-texture`

Land the decision from last session. Commit `growth-rings.svg`, add a `.rings` utility layering the tree-ring motif over the existing grain at low opacity, and apply it to ink `SectionShell`s. This is the one change that puts the brand's namesake back into the visual system, and it costs no layout.

---

## 6. Sequencing

Fixes 1 and 2 are independent of each other and of 3, 4, and 5. They are also where the "AI-crafted" feeling actually lives, so do them first and look at the site again before deciding how much of 3 through 5 still matters.

Fix 4 is small and self-contained; it can ride along with anything.
