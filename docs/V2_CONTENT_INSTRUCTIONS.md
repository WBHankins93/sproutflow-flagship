# v2 Content & Title Changes — Implementation Instructions

Status: ready to implement. No design work required.
Scope: every page in `app/`, plus the shared header/footer and the data files behind them.

---

## 0. Read this first: Design has no v2

I pulled all three Claude Design projects. There is **no v2 waiting in Design.**

The `Sproutflow Studio Design System` project (`6c042769-0d10-42d0-a225-f9f662465fbc`, last updated **2026-06-05**) contains the **v1-era** site:

| Design project still shows | Codebase actually ships (PR #15, 2026-08-11) |
|---|---|
| Full-bleed nature-photo hero, "Websites that turn visitors into paying customers" | Editorial split hero, "Make it easier for customers to choose you." |
| Playfair Display / Cormorant Garamond / Fraunces | Bricolage Grotesque + DM Sans |
| 4 priced tiers (Starter → Market Leader, $850–$7,500+) | 3 unpriced service paths (Websites / Business systems / Growth and support) |
| Sprout → Leaf → Bloom → Flourish process | Four unnamed checkpoints |
| "No Forms Required" contact section | `/inquiry` form as the primary path |
| "we / our team" voice | "I" (Ben) voice |
| Phone `(228) 327-1082` | Phone `(504) 326-1676` |

Two of the design files even carry the comment `// Faithful recreation of components/sections/ValuePropsSection.tsx` — a component the homepage no longer imports. **Design is two months behind the code, not ahead of it.**

**Action:** treat Design as a stale mirror. Two options, pick one:
- **A (recommended):** finish the content work below in code first, then re-sync Design from the shipped codebase in one pass so it stops giving stale answers.
- **B:** update Design first if you need something visual to react to before approving copy.

Design's **foundations** (color tokens, shadow/radius scale, logo assets in `assets/logo/`) are still accurate and can stay as-is. Only the `ui_kits/website/` prototype and the copy examples in `README.md` are stale.

**Conflict to resolve before anything ships:** the phone number. Design + `data/content.ts` say `(228) 327-1082`; `Footer.tsx` and `ContactSection.tsx` say `(504) 326-1676`. Tell me which is correct — I won't guess on a real contact detail.

---

## 1. Voice rules (apply to every change below)

Derived from the copy already shipped in PR #15 — this is the standard, not a new direction.

**Do:**
- First person singular: **"I"** for the work, **"Sproutflow"** for the studio as an entity.
- Second person **"you"** for the client.
- Short declarative sentences. One idea per sentence.
- Concrete situations over abstractions: "a good lead waits in an inbox" beats "suboptimal lead management."
- Headlines are complete sentences ending in a period: *"Tell me what needs to work better."*
- Claims only where they can be attributed to a named client.
- Plain punctuation. Periods and commas. No em dashes in body copy.

**Don't:**
- **Never "we / our team."** It contradicts the entire positioning that you do the work. This is the single most common violation in the codebase right now.
- No third person about yourself. "Ben reviews every inquiry himself" inside a list that otherwise says "I" reads like a bio someone else wrote.
- Ban list: *leverage, utilize, robust, solution(s), journey, elevate, unlock, empower, seamless, tailored, bespoke, holistic, cutting-edge, world-class, best-in-class, transform your business, take it to the next level, in today's digital landscape, testament to, delve into, at the end of the day.*
- No adjective stacking ("strategic, professional, results-driven").
- No superlatives without a number behind them.
- No rhetorical-question openers ("Ever wonder why…?").
- No "Professional" as a filler qualifier.

---

## 2. Page titles

### 2a. Fix the title template — do this first, it changes every page

`app/layout.tsx` line ~26:

```
template: "%s | Sproutflow Studio - New Orleans Web Design"
```

That adds **46 characters** to every page title, pushing all of them past Google's ~60-char display limit. It also disagrees with the case study pages, which already use the short form (`${caseStudy.metaTitle} | Sproutflow Studio`).

**Change to:**
```
template: "%s | Sproutflow Studio"
```

Then let each page carry "New Orleans" in its own title only where it earns the space.

### 2b. Per-page title changes

| File | Current `title` | Change to | Why |
|---|---|---|---|
| `app/layout.tsx` (default) | `Sproutflow Studio \| Web Design & Custom Business Software in New Orleans, LA` (76) | `Sproutflow Studio \| Web Design & Business Systems in New Orleans` (63) | "Custom Business Software" is not language a client searches. Trims to fit. |
| `app/page.tsx` (absolute) | `Custom Websites & Business Systems \| Sproutflow Studio - New Orleans Web Design` (79) | `Web Design & Business Systems in New Orleans \| Sproutflow Studio` (63) | Leads with the search term, ends with brand. |
| `app/faq/page.tsx` | `Frequently Asked Questions` | `Common Questions` | "Frequently Asked Questions" is boilerplate. Matches the H1's plain register. |
| `app/inquiry/page.tsx` | `Tell Me About Your Project` | `Start a Project` | Title Case on a spoken-voice sentence reads wrong in a browser tab. Keep the spoken line as the H1, not the title. |
| `app/how-we-handle-your-data/page.tsx` | `How We Handle Your Data` | `How I Handle Your Data` | Voice fix — see §3. Rename the route too (§2c). |
| `app/work/page.tsx` | `Client Work` | keep | Already correct. |
| `app/case-studies/*/page.tsx` | `${metaTitle} \| Sproutflow Studio` | keep | Already using the short form. |
| `app/case-studies/page.tsx`, `app/how-we-work/page.tsx` | `Work & Results`, `How We Work` | keep | Redirect stubs, `robots: noindex`. Not worth touching. |

### 2c. One route rename (decide before implementing)

`/how-we-handle-your-data` → `/data-and-ownership`

Rationale: the current slug is a sentence, it's the longest URL on the site, and "We" in the slug contradicts the voice everywhere else. If you'd rather not touch a live URL, keep the route and only change the visible title and body copy — say so and I'll skip the rename. If we do rename, add a `permanentRedirect` stub the same way `/how-we-work` and `/case-studies` already work.

### 2d. H1 changes

Only one H1 needs work.

- `app/work/page.tsx` — `"What changed, shown with the work."` → **`"The work, and what changed after."`**
  The current line inverts naturally and reads like it's missing a word. Same promise, cleaner.

All other H1s stay as-is. `"Make it easier for customers to choose you."`, `"Tell me what needs to work better."`, `"The practical details."`, `"A good business can still be hard to buy from."` are all correct and on-voice.

---

## 3. AI filler cleanup, page by page

### 3a. Delete the dead files — this is where most of the filler lives

`data/content.ts` (251 lines) and `data/services.ts` (524 lines) are **imported by no page and no component.** Only the test suite references them. They are the v1 copy deck and they are full of exactly the filler you want gone:

> "Three service levels, one standard of excellence" · "Strategic discovery process that ensures your website aligns with business goals" · "Enhanced brand perception and authority" · "Scalable platform for business expansion" · "Where Small Businesses Come Alive Online" · "Revenue-focused digital architecture built for measurable growth" · "Let's start something beautiful"

They also carry **live liabilities**: the conflicting phone number, and three fabricated portfolio entries (`Bayou Heritage Tours`, `Créole Corner Café`, `Gulf Coast Legal`, all `isDemo: true`) that will read as fake clients if anything ever renders them.

**Instructions:**
1. Delete `data/content.ts` and `data/services.ts`.
2. Update or delete the three test files that import them: `__tests__/high-priority/data-validation.test.ts`, `__tests__/medium-priority/data-consistency.test.ts`, `__tests__/medium-priority/data-structure-validation.test.ts`. Point the surviving assertions at `data/servicePaths.ts`, `data/projectProof.ts`, and `data/caseStudies.ts` instead.
3. Run `npm test` and confirm green before moving on.

Also orphaned (imported by nothing, safe to delete in the same pass): `components/sections/ValuePropsSection.tsx`, `ValueSupportSection.tsx`, `BusinessSystemsSection.tsx`, `TrustBarSection.tsx`, `HomeTestimonialsSection.tsx`. Each carries v1 copy in the old "we" voice.

### 3b. `app/not-found.tsx` — worst offender still rendering

Four problems on one small page:

1. **"Professional" used four times as a filler comment**: `// app/not-found.tsx - Professional 404 Page`, `{/* Professional 404 Design */}`, `{/* Professional Navigation Options */}`, `{/* Professional Contact Option */}`. Delete all four qualifiers. Keep the comments only if they say something a reader doesn't already see.
2. **"Need assistance finding something specific?"** → **"Looking for something specific?"**
3. **"Contact our team"** → **"Tell me what you were looking for"**. There is no team. This is the clearest voice break on the site.
4. **Broken link**: that CTA points to `href="#contact"`, but `#contact` only exists on the homepage — on a 404 it scrolls nowhere. Change to `href="/inquiry"`.

Also: `"The page you're looking for doesn't exist or may have been moved."` → `"That page doesn't exist anymore."` Shorter, and drops the hedged "or may have been."

### 3c. `app/inquiry/page.tsx` — third-person slip

The `nextSteps` array mixes voices inside three consecutive lines:

```
{ title: 'I read the details', text: 'Ben reviews every inquiry himself.' }
```

First person in the title, third person in the body, same list item. Change `text` to **`'Every inquiry comes to me directly.'`**

The other two steps ("We talk if useful" / "You get a fixed quote") are fine — "we" there means you-and-the-client, which is correct usage.

### 3d. `components/layout/Footer.tsx`

- Explore link label `"How We Handle Your Data"` → `"How I Handle Your Data"` (and update `href` if §2c is approved).
- Body line is fine. Leave it.

### 3e. `app/how-we-handle-your-data/page.tsx`

Sweep the page for "we/our" and convert to "I/my", except where "we" means you-and-the-client. Specific section headings to change:
- `"If we part ways"` → keep ("we" = both parties, correct).
- `"Founder security background"` → `"Why I take this seriously"`. The current heading is a résumé label, not a sentence, and "Founder" is you referring to yourself in the abstract.

### 3f. Pages that need no copy changes

I read these in full and they're already on-voice. **Don't touch them:**
- `components/sections/HeroSection.tsx`
- `components/sections/CustomerPathSection.tsx`
- `components/sections/ServicesSection.tsx` + `data/servicePaths.ts`
- `components/sections/WorktableSection.tsx`
- `components/sections/ProcessSection.tsx`
- `components/sections/AboutSection.tsx`
- `components/sections/ContactSection.tsx`
- `app/faq/page.tsx` (all 8 answers)
- `app/work/page.tsx` body copy (H1 only, per §2d)

---

## 4. Suggested order

1. Resolve the two open questions: **phone number** (§0) and **route rename yes/no** (§2c).
2. Delete dead files + fix tests (§3a) — biggest filler reduction, zero visual risk.
3. Title template + per-page titles (§2a, §2b).
4. Voice fixes: 404, inquiry, footer, data page (§3b–§3e).
5. Work page H1 (§2d).
6. `npm test` + `npm run build`, then visual check of `/`, `/work`, `/inquiry`, `/faq`, `/404`.
7. Re-sync Design from the shipped code (§0, option A).

---

## 5. Two open questions for you

1. **Phone number** — `(504) 326-1676` or `(228) 327-1082`?
2. **Route rename** — rename `/how-we-handle-your-data` to `/data-and-ownership`, or leave the URL and only change the visible copy?
