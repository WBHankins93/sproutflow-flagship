# Sproutflow Design System v2

Spec for the makeover. Supersedes the bound token-only system where they conflict. Handoff-ready for Codex.

---

## 1. Type: invert the hierarchy

The current system leads with genteel serifs (Cormorant, Playfair). That is the root of the blandness: a serif headline over body copy has exactly one register, so every section looks the same. v2 leads with a tight grotesk in near-caps and demotes the serif to accent.

| Role | v1 (retire) | v2 | Usage |
|---|---|---|---|
| Display | Cormorant Garamond | **Archivo**, 700 / 800 | Hero and section headlines. Uppercase or sentence case, tracking -0.03em, line-height 0.92 to 1.0 |
| Heading | Playfair Display | **Archivo**, 600 | H3, card titles, service row titles |
| Accent | Fraunces | **Cormorant Garamond italic**, 400 | Pull quotes, testimonials, one emphasis word inside a headline |
| Body | DM Sans | **DM Sans**, 400 / 500 | Unchanged |
| Mono | Fira Code | **Fira Code** | Numerals in service rows, case study meta, 01. 02. 03. |

Alternative display if Archivo reads too neutral: Space Grotesk (more character, slightly quirkier) or Archivo Expanded for the hero only.

Scale (desktop):
- `display-xl` 82px / 0.94 / -0.03em, hero only
- `display-lg` 64px / 1.0 / -0.025em, section headlines
- `display-md` 40px / 1.05, service rows and project titles
- `h4` 20px / 1.3, card titles
- `body-lg` 18px / 1.75, `body` 16px / 1.7, `body-sm` 14px / 1.65
- `eyebrow` 11px / 600 / 0.18em / uppercase
- `mono-meta` 13 to 15px / 0.08em

Rules:
- One italic serif word per headline, maximum. It is a spice, not a font.
- Never set body copy in the accent serif.
- Numerals in section indices and service rows are always mono, always gold.

---

## 2. Color: same palette, new roles

Keep the green, gold, and cream. What changes is dominance and the retirement of two tokens.

**Canvas:** dark-dominant with warm light breaks.

| Token | Hex | Role in v2 |
|---|---|---|
| `ink-900` | `#141914` | Primary page canvas, deepest sections and footer CTA |
| `ink-800` | `#1B211B` | Secondary dark, work section |
| `ink-700` | `#232A23` | Tertiary dark, about and diagnostic sections |
| `cream-500` | `#E9E2D8` | Light break sections, primary text on dark |
| `white` | `#FFFFFF` | Cards inside light sections only |
| `gold-500` | `#C49A45` | Promoted to real accent: numerals, rules, active states, one CTA per screen |
| `gold-600` | `#a67d2d` | Gold text on cream, meets contrast |
| `green-600` | `#4d5e4c` | Buttons and links inside light sections |
| `green-500` | `#5F755E` | Radial glows, shadow tint |

Retire: `nature-300` ash gray (muddies against warm neutrals), `text-secondary #445E69` (reads blue, use `#57604F`), `bg-secondary #EDDDC0` (dutch white fights the cream).

Text on dark: `#F5F1E9` for headlines, `rgba(233,226,216,0.72)` body, `rgba(233,226,216,0.44)` tertiary.

Rules:
- Gold is never a background for a large area. The gold marquee band was the proof.
- Maximum two background values per screen, plus the footer.
- Every dark section carries the grain overlay. Flat dark is what reads cheap.

---

## 3. Component layer

The system currently ships zero components, which is why every section collapses into "eyebrow, headline, paragraph." These are the twelve the site actually needs. Each should exist as a real component with props, not a one-off.

**Structure**
1. `SectionShell` — sticky margin label (index plus name), grain overlay, canvas variant (ink / cream), consistent 114 to 118px vertical rhythm.
2. `MarqueeStrip` — three variants: client names with industry sub-line, eyebrow promises with gold dots, oversized ghost headline for the footer. Never gold-filled.
3. `StatRail` — 2 to 4 cells, hairline dividers, display numeral plus one line of context.

**Content**
4. `ServiceRow` — mono numeral, display title, arrow disc (filled gold when open), expandable body with good-fit line and capability pills. Pairs with a sticky `MediaPanel` that swaps on open.
5. `MediaPanel` — the fix for text-heavy sections. Holds a video loop, a screenshot, or a drop slot. Every dense text section needs one adjacent.
6. `ProofCard` — small screenshot, client name, one sentence on what changed. Trust building, not problem shaming.
7. `ProjectRow` — alternating editorial row: index, industry and location eyebrow, title, one-paragraph summary, scope pills, screenshot bleeding toward the edge. Filterable variant for the Work index.
8. `StepTimeline` — horizontal, dashed connector, circular numeral (one filled gold to mark the current or key step), proof chips under each step.
9. `TestimonialCard` — accent serif quote, attribution line, optional client logo. Rail or static grid.
10. `FaqRow` — full-width, hairline divider, plus / minus glyph, one open at a time.
11. `InquiryPanel` — three-step form: what is happening, what you want, how to reach you. Budget is a free-text field with a privacy note, present from step one.
12. `FooterCta` — ghost marquee headline, oversized split headline, direct contact rail, no boxed summary card.

Each component gets: a dark variant and a light variant, a hover state, and a reduced-motion fallback.

---

## 4. Media and texture library

Nothing here is optional. Sections without media are the sections that read bland.

**Textures**
- `grain.svg` — feTurbulence noise, 14 to 16 percent opacity, on every dark section
- `dot-grid` — radial-gradient dot pattern, 5 percent, for light sections
- `radial-glow` — green 45 percent radial, one per screen maximum, behind the hero

**Frames**
- Laptop frame: 620px wide default, 330px screen, side by side with the hero headline, never full width
- Phone frame: 148px wide, overlapping the laptop's lower right corner
- Browser frame: for Shopify and storefront work

**Video and imagery slots**
- Hero: 5-site scrolling loop, 8s per site
- Services: one media panel per service, swaps on open
- Case studies: header video, mobile screens, one system capture
- About: founder photography, 4 to 6 real shots

**Motion**
- Scroll reveals: opacity plus 26px rise, view-timeline driven
- Marquees: 34 to 64s linear, always masked at both edges
- Cursor: 14px dot, scales to 30px on links and 46px on CTAs
- No spring, no bounce, no parallax on text

---

## 5. Copy rules

- No em dashes, anywhere. Use commas, periods, or restructure the sentence.
- Lead with trust and difference, not with the customer's failures. The diagnostic section is fine as a supporting beat, never as the first thing after the hero.
- Section labels stay literal. "Testimonials," not "In their words."
- One idea per section. If two sections list similar things in similar ways, one of them is wrong.
- No pricing tiers. Fixed quote after conversation.
- Sprout, Leaf, Bloom, Flourish is retired.
