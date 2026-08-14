# Sproutflow Makeover: Implementation Instructions for Codex

Target repo: `WBHankins93/sproutflow-flagship` (Next.js 14, Tailwind, TypeScript, Framer Motion).
Companion spec: `design-system-v2.md` (design rationale and tokens). This document is the build order.

Work in phases. Do not start a phase before the previous one is merged. Do not redesign anything not listed.

---

## Phase 0: Ground rules

1. **No em dashes anywhere in copy.** Add a lint check or a pre-commit grep for `—` and `&mdash;` across `data/`, `app/`, and `components/`. Replace with commas, periods, or a rewritten sentence.
2. **No new colors.** Only the tokens defined in Phase 1.
3. **Every screenshot uses `object-fit: cover; object-position: top`.** Fixed-height containers with auto-height images letterbox, which was a defect in the first build.
4. **Do not invent metrics or testimonials.** Client names may be used; outcome metrics may not, until Ben approves each one.
4. Every section must render acceptably before its media asset exists. Use a labeled placeholder, never a blank box.
5. Respect `prefers-reduced-motion` on every animation added.

---

## Phase 1: Tokens and fonts

**File: `app/layout.tsx`**

Replace the heading font. Load via `next/font/google`:

- `Archivo`, weights 600 700 800, assign to CSS var `--font-display`
- `DM Sans`, weights 400 500 600, `--font-body` (unchanged)
- `Cormorant Garamond`, weight 400 italic, `--font-accent`
- `Fira Code`, weight 400 500, `--font-mono`

Remove Playfair Display and Fraunces entirely.

**File: `tailwind.config.js`**

```js
fontFamily: {
  display: ['var(--font-display)', 'system-ui', 'sans-serif'],
  body:    ['var(--font-body)', 'system-ui', 'sans-serif'],
  accent:  ['var(--font-accent)', 'Georgia', 'serif'],
  mono:    ['var(--font-mono)', 'monospace'],
}
```

Type scale, replacing the current `fontSize` block:

```js
fontSize: {
  'display-xl': ['clamp(3rem, 5.6vw, 5.125rem)', { lineHeight: '0.94', letterSpacing: '-0.03em',  fontWeight: '700' }],
  'display-lg': ['clamp(2.25rem, 4.2vw, 4rem)',  { lineHeight: '1.0',  letterSpacing: '-0.025em', fontWeight: '700' }],
  'display-md': ['clamp(1.75rem, 2.6vw, 2.5rem)',{ lineHeight: '1.05', letterSpacing: '-0.02em',  fontWeight: '600' }],
  'h4':         ['1.25rem',   { lineHeight: '1.3',  fontWeight: '600' }],
  'body-lg':    ['1.125rem',  { lineHeight: '1.75' }],
  'body':       ['1rem',      { lineHeight: '1.7' }],
  'body-sm':    ['0.875rem',  { lineHeight: '1.65' }],
  'eyebrow':    ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.18em', fontWeight: '600' }],
  'mono-meta':  ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
}
```

Colors: add the `ink` scale, keep `primary` and `accent`, delete `nature`, change `text.secondary`, delete `background.secondary`.

```js
ink: { 900: '#141914', 800: '#1B211B', 700: '#232A23' },
cream: { 500: '#E9E2D8', 300: '#F5F1E9' },
text: { primary: '#626155', secondary: '#57604F', muted: '#7a7d72' },
```

Delete from the config: the whole `nature` scale, `background.secondary`, `boxShadow.nature` usage on dark sections (keep the token, it is still used on cream cards).

**Header sizing.** The current header logo is 30px tall and reads undersized against the new display type. Set it to 48px on desktop, 40px on mobile, and raise the header height from 64px to 88px. Nav links stay at 15px.

**File: `app/globals.css`**

Add two utilities used site wide:

```css
.grain::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .15;
  background-image: url("/textures/grain.svg");
}
.mask-fade-x { mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent); }
```

Add `/public/textures/grain.svg`: a 140x140 `feTurbulence fractalNoise baseFrequency 0.85 numOctaves 3` rect at 0.45 opacity.

**Acceptance:** every existing page still builds, headings render in Archivo, no Playfair or Fraunces in the bundle.

---

## Phase 2: Shared components

Create `components/ui/` primitives. Each takes a `variant: 'ink' | 'cream'` prop.

1. **`SectionShell.tsx`** — props: `index` (string, e.g. "01"), `label`, `variant`, `children`. Renders a 190px sticky left margin label at `top: 130px`, applies `.grain` when ink, vertical padding `clamp(4rem, 7vw, 7.25rem)`, max width 1440, horizontal padding 44px.
2. **`Marquee.tsx`** — props: `speed` (seconds), `items` (ReactNode[]), `variant: 'names' | 'promises' | 'ghost'`. Duplicates children once and translates `-50%`, linear infinite, always wrapped in `.mask-fade-x`. Pauses on `prefers-reduced-motion`.
3. **`StatRail.tsx`** — props: `stats: {value, label}[]`. Hairline dividers between cells, value in `display-md` gold, label in `body-sm`.
4. **`Pill.tsx`** — small capability tag. Ink variant: transparent with 22 percent border. Cream variant: white fill.
5. **`ArrowDisc.tsx`** — 46px circle, gold fill when active, arrow rotates 45 degrees when open.
6. **`MediaPanel.tsx`** — props: `src` (video or image), `poster`, `placeholder` (string). If no `src`, renders a bordered panel with the placeholder text so the layout never collapses. Autoplays muted looping video, `playsInline`, pauses off screen via IntersectionObserver.

**Acceptance:** Storybook or a `/kitchen-sink` route renders all six in both variants.

---

## Phase 3: Homepage rebuild

Section order, replacing the current homepage composition in `app/page.tsx`:

1. Hero
2. Client marquee strip
3. The Sproutflow difference (trust led)
4. Services
5. Work
6. Promises marquee
7. Process
8. About
9. Testimonials
10. FAQ
11. Footer CTA

### 3.1 Hero (`components/sections/HeroSection.tsx`, rewrite)

Two column grid, `1fr 620px`, vertically centered, 168px top padding.

- Left: eyebrow with a 44px gold rule, `display-xl` headline with exactly one italic accent-serif word in gold, `body-lg` subhead capped at 520px, two CTAs, then a three-cell trust rail (Ownership / Quotes / Reply) separated by 1px verticals.
- Right: laptop frame, 620px wide, 330px screen. Inside, cross-fade five client site loops, 8s each. Phone frame, 148px wide, overlaps the laptop's lower right corner at `right: -34px; bottom: -74px`.
- Below the grid: a 50px gold-to-transparent vertical rule with a 2.4s bob.

Laptop and phone frames go in `components/ui/DeviceFrame.tsx`, props `kind: 'laptop' | 'phone' | 'browser'`. Laptop screen images use `object-fit: cover; object-position: top` with the scroll transform capped at 15 percent of image height, otherwise the frame shows dead space at the bottom of each loop.

**Do not** make the laptop full width. That was the primary complaint about the previous build.

### 3.2 Client marquee

Cream strip, 26px vertical padding. Each item is two lines: client name in `display-md` at 21px, and the industry beneath in accent serif italic 13px at `#6c7264`. Gold 5px dot between items. Data comes from the consolidated `data/projectProof.ts` source.

### 3.3 The Sproutflow difference (`components/sections/DifferenceSection.tsx`, new)

**Replaces `CustomerPathSection` in the number-two slot.** Cream variant.

Two columns, `1.05fr 1fr`:
- Left: `display-lg` headline with "difference" set in gold italic accent serif, three short paragraphs, a `StatRail` (6+ years enterprise, 5 live builds, 1 person), and a secondary CTA to About.
- Right: three `ProofCard`s (small screenshot, client name, one sentence on what changed) plus a dashed footnote row about ownership.

The existing "where leads get stuck" content is **not deleted**, it moves. See Phase 5.

### 3.4 Services (`components/sections/ServicesSection.tsx`, rewrite)

Ink variant. Two columns, `1.02fr 1fr`.

- Left: three `ServiceRow`s from `data/servicePaths.ts`. Row header is mono numeral, `display-md` title, `ArrowDisc`. One open at a time, default the first open. Body reveals description, "Good fit if" line, capability pills, and a text CTA.
- Right: a sticky `MediaPanel` at `top: 130px`, 470px tall, that cross-fades to match the open service. Websites uses a client site loop. Business systems needs a CRM or booking capture. Growth needs an analytics capture.

Update `data/servicePaths.ts` capability lists to the confirmed inventory: websites gets new build, rebuild, Shopify, copy, SEO. Systems gets CRM, intake and booking, dashboards, automation, internal software. Growth gets maintenance and hosting, search and performance, new pages and content.

### 3.5 Work (`components/sections/ProjectReel.tsx`, adapt)

Keep the current editorial row concept, it tested well. Each row: mono index, eyebrow with industry and location, `display-md` title, one paragraph, scope pills, 260px tall screenshot with `object-fit: cover; object-position: top`. Alternate image side per row. Four rows on the homepage, all on `/work`.

### 3.6 Promises marquee

Ink background, hairline top and bottom borders, eyebrow-size uppercase text with gold dots. **Not gold-filled.** The gold band was rejected.

### 3.7 Process (`components/sections/ProcessSection.tsx`, rewrite)

Cream variant. Horizontal four-step timeline, dashed connector line behind the numeral circles at `top: 46px`. Circles are 92px, outlined, except step two which is gold-filled. Under each: `h4` title, `body-sm` description, two proof chips. To the right of the section headline, a white "Before you commit" panel with a 3px gold left border.

### 3.8 About (`components/sections/AboutSection.tsx`, rewrite)

Ink 700 variant. 400px founder photo left, text right. Copy must be replaced with Ben's own words, do not ship the placeholder voice. Keep the IBM and enterprise line, drop anything that reads as a sales boast.

### 3.9 Testimonials

Section label is literally "Testimonials." Rail of `TestimonialCard`s, 600px wide each, quote in accent serif italic, 64s marquee. Source `data/testimonials.ts`. Attribution without metrics.

### 3.10 FAQ

Cream variant, headline "Questions owners ask before hiring me." Five `FaqRow`s, one open at a time, first open by default. Source from `app/faq/page.tsx` content so the two stay in sync.

### 3.11 Footer CTA (`components/sections/ContactSection.tsx`, rewrite)

Ink 900. Ghost marquee of "Have a project in mind?" at 78px in 14 percent opacity across the top. Below: `display-xl` split headline, subhead, primary CTA, direct email link, and a three-cell contact rail (reply time, phone, location). **Remove the boxed "How the inquiry works" card**, fold those three steps into the inquiry page itself.

---

## Phase 4: Inquiry form

**File: `components/inquiry/InquiryForm.tsx`**

Convert to three steps with a visible progress indicator:

1. **What is happening now.** One large textarea, placeholder invites plain language. Optional business name and URL.
2. **What you want.** Service path selector (three cards from `servicePaths`), timeline select, and **budget as a free-text number field** with the helper "This stays private. It shapes what I recommend." Budget is optional but visually prominent, never buried.
3. **How to reach you.** Name, email, phone, preferred contact method.

Persist step state in `sessionStorage` so a refresh does not lose input. Validate per step, not all at once. Submit unchanged on the backend.

---

## Phase 5: Remaining pages

Every page uses `SectionShell`, the same 190px sticky index label, the same ink and cream alternation, and ends with the same `FooterCta`. No page invents a new layout language.

Global rule for page headers: ink 900 canvas, 148px top padding to clear the fixed header, eyebrow with gold rule, `display-xl` title, one `body-lg` line beneath, and where the page has a collection, a count in mono ("012 projects", "09 questions").

### 5.1 `/work` — Work index

Order: page header, filter bar, project list, closing CTA.

- **Filter bar.** Sticky under the header at `top: 88px`, ink background with a hairline bottom border. Pills: All, Websites, Shopify, Systems, Ongoing care. Active pill is gold filled with ink text. Filtering is client side, animates with a layout transition, never a full page reload. Show the result count in mono to the right of the pills.
- **Project list.** Large rows, not cards. Each row: mono index, eyebrow with industry and location, `display-md` title, one paragraph, scope pills, status chip (Live or In progress), and a 320px tall screenshot that alternates side per row. Whole row is the link. Hover lifts the row 4px and shifts the screenshot 8px.
- **Empty state.** If a filter returns nothing, show a line of copy plus a reset link. Never a blank column.
- Source `data/projectProof.ts`, including `industry` and `filterTags: string[]`.
- Closing block: "Not sure which of these is closest to your situation?" plus the primary CTA.

### 5.2 `/case-studies/[slug]` — Case study detail

Fixed section order, so every case study reads the same way:

1. **Header.** Client name as `display-xl`, industry and location eyebrow, mono meta rail (Timeline, Services, Tech, Status), and a visit-live-site link.
2. **Hero media.** Full width, 16:9, the scroll recording of the site. Falls back to the full page screenshot with a slow CSS pan if no video.
3. **The problem, in the client's words.** Cream break section. A single accent serif italic pull quote at 28px with a 3px gold left border, attributed. This is the emotional anchor of the page, give it room.
4. **What I built.** Ink section. Two columns: left is a scope list with hairline dividers and mono numbering, right is a sticky media panel showing a detail capture.
5. **How it works now.** Three to five short blocks, each one sentence of what changed plus a supporting screenshot. This replaces a metrics band while metrics are unapproved.
6. **Timeline.** Horizontal `StepTimeline` variant showing the actual project weeks, not the generic four checkpoints.
7. **Mobile screens.** Three phone frames side by side, cream background, captioned.
8. **Tech used.** Simple mono row of labels, no logo soup.
9. **Testimonial.** If one exists for that client, otherwise skip the section entirely rather than showing a placeholder.
10. **Next project.** Full width link to the next case study with its screenshot as background at 40 percent opacity.

Rules: no invented outcome metrics anywhere on this page. Where the live site has a metric that Ben has approved, it renders as a single mono line in the header meta rail, not as a hero claim.

### 5.3 `/services` and `/services/[path]`

**`/services` index.** Page header, then the three paths as full-bleed alternating blocks rather than the homepage accordion. Each block: mono numeral, `display-lg` title, outcome line, good-fit paragraph, capability pills, media panel, and a link into the detail page. Between blocks, a hairline divider with the promises marquee repeated once.

Below the three blocks, place the relocated **"Where leads get stuck"** content. Ink section, three big gold numerals, one line each, then the "what should happen instead" row. It works here as evidence that Ben understands the failure modes. It does not work as the first thing a stranger reads on the homepage.

**`/services/[path]`.** One page per path, same skeleton:

1. Header with the path name and outcome line.
2. "Who this is for" — three short fit statements, cream section.
3. "What is included" — the capability list expanded, each with one clarifying sentence, two column layout with hairline dividers.
4. Media panel, sized large. Websites uses a client loop, Business systems uses the dashboard capture, Growth uses an analytics capture.
5. "How it runs" — the four checkpoints, phrased for that path specifically.
6. One related case study, using the `ProjectRow` component.
7. FAQ subset, three questions relevant to that path.
8. CTA with the path pre-selected in the inquiry link, for example `/inquiry?path=business-systems`.

### 5.4 `/about`

1. Header: `display-xl`, "I stay close to the problem and the people living with it."
2. Founder portrait, full bleed on the right, 60/40 split with the opening copy. Ben's own words, not agency voice.
3. "Before Sproutflow" — the enterprise background as a short narrative, not a resume. Two paragraphs plus a `StatRail`.
4. "How I actually work" — five short principles, each a `h4` plus two lines. Examples drawn from real conversation: one person start to finish, written scope before building, you own the accounts, smallest useful fix first, no agency language.
5. Photography strip — four shots, cream background, varied sizes, captioned in accent serif italic.
6. "Where I am" — New Orleans, working nationwide. Small map or a photo, contact rail.
7. CTA.

### 5.5 `/faq`

- Header plus a question count in mono.
- Grouped accordion, groups in this order: Pricing and budget, Process and timeline, Ownership and handover, Working together, After launch.
- Group headings are eyebrow labels in the sticky left margin, questions fill the right column. One open at a time within the page, not per group.
- Each answer stays under 60 words. Anything longer becomes a resource article and the answer links to it.
- Bottom of page: "Still have a question?" with a direct email link, not a form.

### 5.6 `/resources`

One hub, both content types in a single filterable index.

- Header with a count.
- Filter pills: All, Guides, Notes. Optional topic pills: Websites, Systems, SEO, Owning your site.
- **Guides** render as large rows: mono index, `display-md` title, two line summary, read time, topic tag. Evergreen, no date shown.
- **Notes** render as compact rows: date in mono, title, one line. Dated, short.
- Featured guide at the top, one only, with a media panel.
- `/resources/[slug]`: narrow measure at 680px, `display-lg` title, accent serif standfirst, body at 18px with 1.75 line height, pull quotes in accent serif, code and screenshots full measure plus 80px bleed. Sticky table of contents in the left margin for guides over 1200 words. End with a related-guide row and the CTA.

### 5.7 `/inquiry`

- No page header marquee, this page is quiet on purpose.
- Left column, 40 percent: the three steps of how this works, moved here from the footer CTA. Below that, a reassurance block: "You can stop after the first checkpoint" and the reply-time promise.
- Right column, 60 percent: the three-step form from Phase 4.
- On submit, a real confirmation state rather than a toast: what happens next, when to expect a reply, and a link to a relevant guide.
- Accepts `?path=` to preselect a service path.

### 5.8 Legal and utility

`/how-we-handle-your-data` keeps its current content, restyled to the resources article layout. 404 page gets the ink canvas, a `display-lg` line, and links to Work, Services, and Contact.

---

## Phase 6: Mobile

Do not scale the desktop down. Breakpoints: `<768px` mobile, `768 to 1024px` tablet, `>1024px` desktop. The sticky 190px margin labels are desktop only.

### 6.1 Global

- Header collapses to logo, 48px tall, plus a single gold "Start" pill and a menu button. Menu opens full screen on ink 900, links at `display-md`, staggered 40ms fade in, contact details and social at the bottom.
- Horizontal padding drops from 44px to 20px. Section vertical padding drops to `clamp(3.5rem, 12vw, 5rem)`.
- Type steps down: `display-xl` to 40px, `display-lg` to 32px, `display-md` to 24px, body stays 16px. Never below 16px for body, never below 44px for a touch target.
- Sticky index labels hide. Instead, each section shows its index and label as a single inline eyebrow row above the headline.
- The custom cursor is disabled entirely on touch devices. Replace hover states with active states.
- Marquees keep the same speed but drop font size roughly 30 percent and reduce gaps.
- Grain overlay stays. It is cheap and it carries the whole visual identity.

### 6.2 Hero

Order: eyebrow, headline, subhead, primary CTA, device composition, trust rail.

- Headline at 40px, still with the one italic gold word.
- Only the primary CTA is full width. The secondary becomes a plain text link with an arrow beneath it.
- Device composition: laptop at 100 percent width with the phone overlapping its bottom right at 92px wide. Total block height capped at 300px. If that feels tight in testing, drop the phone and keep the laptop alone, do not shrink both.
- Trust rail becomes a two column grid, two rows, hairline dividers between.
- Remove the scroll indicator on mobile.

### 6.3 Sections

- **Client marquee.** Single line, name at 16px with the industry beneath at 11px. Speed unchanged.
- **Difference.** Single column. Headline, copy, `StatRail` as a horizontal three-cell strip with dividers, then the proof cards stacked full width with the screenshot on top at 140px tall.
- **Services.** Accordion stays, one open at a time. The media panel moves *inside* the open row, above the body copy, at 200px tall. The arrow disc shrinks to 40px. Numerals stay.
- **Work.** Screenshot on top at 200px, text below, always. No alternation, it reads as inconsistency at this width. Scope pills wrap to two lines maximum, then truncate.
- **Promises marquee.** Unchanged apart from size.
- **Process.** Timeline rotates to vertical. The dashed connector becomes a 1px left rail at x=46px, circles shrink to 64px and sit on the rail, content sits to the right. Gold-filled circle still marks step two.
- **About.** Photo first, full width, 4:3 crop. Then copy. `StatRail` horizontal.
- **Testimonials.** Cards drop to 300px wide, quote to 17px, marquee speed unchanged.
- **FAQ.** Rows full width, question at 18px, chevron or plus at 24px with a 44px tap target.
- **Footer CTA.** Ghost marquee drops to 40px. Headline to 36px. Contact rail becomes a stacked list. Primary CTA full width and sticky to the bottom of the viewport once the user scrolls past the work section, dismissible.

### 6.4 Page specific mobile

- `/work`: filter pills scroll horizontally in a single row with edge fade, sticky under the header. Rows stack as above.
- `/case-studies/[slug]`: hero video becomes a poster image with a tap-to-play control, autoplay only on wifi-class connections via `navigator.connection`. Mobile screens section becomes a horizontal swipe carousel with three phone frames.
- `/services/[path]`: the "what is included" two column list collapses to one column, dividers retained.
- `/resources`: guides and notes both render as compact rows. Table of contents becomes a collapsible bar pinned under the header.
- `/inquiry`: the three steps of how this works collapse into a single progress strip above the form. One field per screen where a field needs explanation, otherwise grouped. Keyboard-aware padding so the submit button is never hidden behind the keyboard.

### 6.5 Performance and QA

- Serve video as `webm` with an `mp4` fallback, poster images required, `preload="none"` on mobile.
- Screenshots via `next/image` with explicit `sizes`, AVIF and WebP.
- Test at 390px, 414px, 768px, and 1024px. Test with the largest Dynamic Island safe area inset.
- Lighthouse mobile performance target 85+, accessibility 100.
- Verify every animation is disabled under `prefers-reduced-motion`, including the marquees.

---

## Acceptance checklist

- [ ] No em dashes in any user facing string
- [ ] No Playfair, Fraunces, or DM Serif in the bundle
- [ ] No `nature-*` color usage remaining
- [ ] Every dark section has grain, no flat dark panels
- [ ] Every text heavy section has adjacent media or a labeled placeholder
- [ ] Gold is never a large background fill
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Lighthouse performance 90+ on the homepage with video loops lazy loaded
- [ ] Images use `object-fit: cover` with `object-position: top`, no letterboxing
- [ ] Client names appear without outcome metrics unless individually approved

---

## Asset dependencies

These block specific phases. Ship placeholders until they land.

| Asset | Blocks |
|---|---|
| Five client site scroll recordings, 10 to 20s | Hero, services media, case study headers |
| CRM or booking or dashboard capture | Services business systems panel |
| Full page screenshots, desktop 1440 and mobile 390 | Work rows, proof cards, case studies |
| Client logos, transparent PNG, 400px+ | Client marquee, case studies |
| Founder photography, 4 to 6 shots | About page and section |
| Logo SVG plus 1000px white PNG | Header, footer |
| Ben's own About copy, 4 to 6 sentences | About section, cannot ship without it |
