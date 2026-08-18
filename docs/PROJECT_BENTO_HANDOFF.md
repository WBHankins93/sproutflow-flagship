# Sproutflow Services Bento — Implementation Handoff

## Objective

Replace the current four equal pricing cards and large add-ons accordion in `components/sections/ServicesSection.tsx` with a confident services bento. The interaction grammar should match Ben Hankins's portfolio project bento—quiet cards with distinct working micro-animations—while remaining unmistakably Sproutflow through its green, gold, nature imagery, and plain-language service positioning.

This is a presentation refactor, not a pricing or offer rewrite. Preserve the source-of-truth package content in `data/services.ts`, the current price ranges, timelines, "Most Popular" state, inquiry path, and honest scope constraints.

## Design Direction

- Use one framed 12-column grid with hairline borders, 18–24px gaps, 20–24px radii, and generous interior space.
- Keep the existing Bricolage Grotesk/DM Sans typography and Sproutflow green/gold palette.
- Replace lifestyle-photo headers with lightweight SVG/DOM "working systems." Nature should influence the mechanisms—seeds, roots, growth rings, branching paths—without becoming decorative clip art.
- Each tile has a visual stage, a thin divider, then concise package copy and one inquiry CTA.
- Keep the grid calm. One introductory sequence plays on entry; low-frequency ambient movement continues only while visible. Hover, keyboard focus, or tap runs the fuller micro-animation.
- Do not use pinned scrolling, canvas, autoplay video, dramatic scaling, glassmorphism, or continuous page-wide motion.

### Desktop grid

```text
┌───────────────────────────────┬───────────────────────┐
│ Foundation · 7 columns       │ Starter · 5 columns   │
├───────────────────────────────┼───────────────────────┤
│ Growth · 7 columns           │ Market Leader · 5     │
├───────────────────────────────────────────────────────┤
│ Enhancements and support strip · 12 columns          │
└───────────────────────────────────────────────────────┘
```

- Foundation leads because it is the existing popular package.
- Growth receives equal visual weight to communicate the progression beyond a basic site.
- Starter and Market Leader remain distinct but slightly narrower.
- At tablet widths, use two equal columns. On mobile, stack in this order: Foundation, Starter, Growth, Market Leader, enhancements.

## Package Micro-Worlds

### Starter — "A credible site takes root"

- A single seed settles into a simple browser frame.
- Three page leaves unfold: Home, Services, Contact.
- A small mobile viewport slides beside the desktop frame to communicate responsiveness.
- Ambient state: one leaf breathes by 1–2px. Active state: the full seed-to-site sequence runs once.

### Foundation — "Turn the site into a lead path"

- A visitor marker enters a website card, follows a highlighted path through proof and service nodes, then lands in a labeled inquiry inbox.
- The path draws from left to right; the inbox receives one new lead badge.
- Ambient state: a restrained pulse travels along the path. Active state: the complete journey and inbox receipt play.

### Growth — "Compete, measure, improve"

- Search/content signals feed a branching conversion path.
- One branch becomes a small analytics line; another grows into a CMS/content stack.
- The animation should show controlled growth, not a generic chart rising forever.
- Ambient state: the line advances by one point. Active state: inputs organize, branches connect, and the measured path resolves.

### Market Leader — "Connect the business system"

- Website, CRM, booking, automation, and analytics appear as five distinct nodes.
- A central Sproutflow hub routes a request through the system and returns a completed status.
- Use the most architectural animation here, but keep it readable to a non-technical owner.
- Ambient state: one status light changes. Active state: a customer request completes the full loop.

### Enhancements and support

- Replace the large accordion with a full-width strip of compact capability cells.
- Group items under Optimization & Strategy and Website Enhancements, preserving Shopify builds and rebuilds.
- Show 4–6 representative items initially; expose the complete lists through accessible `<details>` controls or a "View all enhancements" disclosure.
- Use small integration-style marks rather than a fifth large illustration.

## Component and Data Plan

- Keep `data/services.ts` as the package source of truth. Do not duplicate package names, prices, timelines, inclusions, or outcomes inside animation components.
- Refactor `components/sections/ServicesSection.tsx` into:
  - `ServicesBento`
  - `ServiceBentoCard`
  - `ServiceMicroWorld`
  - `ServiceEnhancementsStrip`
- Add one isolated micro-world component per package under `components/sections/services/micro-worlds/`.
- Use a typed registry keyed by the existing service IDs: `starter`, `foundation`, `growth`, and `market-leader`.
- Keep all CTAs linked to `/inquiry` and retain the current "Discuss this option" wording unless a separate copy review changes it.
- Preserve the existing popular-package flag and render it as a quiet editorial marker, not a floating promotional sticker.

## Motion Contract

- Continue using the installed `framer-motion` package.
- Use `useInView` to pause every micro-world offscreen.
- Use `useReducedMotion` for a fully composed static final frame: no autoplay, parallax, or smooth-scroll dependency.
- Animate transforms, opacity, SVG `pathLength`, and color only. Avoid layout-triggering height/width loops.
- Keep hover movement to 1–2px; no `scale(1.05)` card effects.
- Keyboard focus must activate the same meaningful state as hover. Touch must offer a clear play/toggle target and must not make animation a prerequisite for reading package information.
- Stop or pause ambient work when the page is hidden.

## Assets

- Four original inline SVG/DOM scenes; no raster animation and no stock illustration.
- Existing Sproutflow logo mark and color tokens.
- Optional subtle tree-ring texture may remain at very low opacity if it does not reduce legibility.
- No new external animation runtime.

## Accessibility and Responsive Requirements

- Preserve semantic headings, package names, prices, timelines, lists, and anchor behavior in the DOM.
- Treat illustrations as decorative unless they communicate content not repeated in text; decorative scenes use `aria-hidden`.
- All play controls require descriptive labels and visible focus treatment.
- Maintain at least 44px touch targets where a user controls animation or disclosure.
- Verify 320px, 390px, 768px, 1024px, and 1440px widths with no clipped pricing, CTA, or horizontal overflow.

## Acceptance Criteria

- All four packages render from `data/services.ts` with unchanged price ranges and inquiry destinations.
- Foundation remains identified as the popular/default package.
- Every tile has a distinct service-specific micro-animation and a static reduced-motion state.
- Animations pause offscreen and do not produce hydration warnings or layout shift.
- The enhancements strip includes Shopify builds and rebuilds and exposes all current add-on items.
- Keyboard, touch, and reduced-motion passes succeed.
- `npm run type-check`, `npm run test`, and `npm run build` pass.
- Browser review confirms the grid feels like one authored system, not four unrelated animated cards.

## Files That Must Remain Untouched

- Do not modify or replace `docs/SITE_UPDATE_HANDOFF_PROMPT.md`; it is a separate credibility and conversion workstream.
- Do not change testimonials, trust claims, contact data, social links, or portfolio ordering as part of this services-bento task.

