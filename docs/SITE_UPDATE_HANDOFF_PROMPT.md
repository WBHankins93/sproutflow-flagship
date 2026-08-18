# Claude Code Handoff — Credibility & Conversion Update (July 2026)

> **How to use:** Fill out every `[ANSWER]` in the questionnaire below FIRST, then paste this entire file as the prompt to Claude Code from the repo root. Claude Code: if any required answer is still `[ANSWER]` or blank, STOP and ask for it before writing code — do not invent testimonials, metrics, or security claims.

---

## PART A — Questionnaire (Ben fills this out before handoff)

### A1. Testimonials (need at least 2 to proceed with Task 1)

**Testimonial 1**
- Client name: [ANSWER]
- Business name: [ANSWER]
- Role/title (e.g., Owner): [ANSWER]
- Exact quote (verbatim, do not paraphrase): [ANSWER]
- Written permission to publish confirmed (yes/no): [ANSWER]
- Associated metric, if any (with timeframe, e.g., "inquiries up 50% in 90 days post-launch"): [ANSWER]
- Link to their live site: [ANSWER]

**Testimonial 2**
- Client name: [ANSWER]
- Business name: [ANSWER]
- Role/title: [ANSWER]
- Exact quote: [ANSWER]
- Written permission confirmed (yes/no): [ANSWER]
- Associated metric: [ANSWER]
- Link: [ANSWER]

**Testimonial 3 (optional)**
- Client name: [ANSWER]
- Business name: [ANSWER]
- Role/title: [ANSWER]
- Exact quote: [ANSWER]
- Written permission confirmed (yes/no): [ANSWER]
- Associated metric: [ANSWER]
- Link: [ANSWER]

*No photos available yet — use the client's business logo or a styled-initial avatar consistent with the brand system. Do NOT use stock photos or AI-generated faces.*

### A2. Contact info
- New Google Voice number to use sitewide: (504) 326-1676
- Is the Facebook page (m.me/sproutflowstudio link on homepage) active and monitored? (yes = keep messenger CTA / no = remove): [ANSWER]

### A3. Security & trust page facts (only claims Ben can stand behind)
- Where does client site/app data live? (e.g., "US-region managed Postgres — Neon/Supabase — and Vercel"): [ANSWER]
- Client data ownership statement — can clients export everything and leave anytime? (yes/no + any caveats): [ANSWER]
- Backup posture (frequency, provider-managed?): [ANSWER]
- Who has access to client data? (e.g., "Ben only; per-client credentials; no offshore contractors"): [ANSWER]
- OK to reference Ben's professional background: "led SOC 2 Type II readiness from 34% to 100% as an SRE" — as experience, NOT as a Sproutflow certification? (yes/no): [ANSWER]
- Anything else clients ask about data/security worth answering: [ANSWER]

### A4. Portfolio decisions (pre-answered from strategy review — change if needed)
- Remove Big Butt Association card from `/work` gallery and `/case-studies` listing: **yes**
- Keep BBA case-study route live but unlinked (for direct sharing + SEO): **yes**
- Add "Shopify builds and rebuilds" line to services/add-ons section: **yes**
- Default portfolio ordering: service & professional businesses first: **yes**

---

## PART B — The prompt (paste to Claude Code with Part A completed)

You are working in the `sproutflow-flagship` repo (Next.js App Router + TypeScript + Tailwind — the live site at sproutflow-studio.com). Execute the following tasks in order. Match the existing brand system, component patterns, and data-file conventions (`data/caseStudies.ts`, `data/content.ts`, `data/services.ts`, `data/workProjects.ts`) — read them before writing anything. Work on a feature branch `credibility-update-july-2026`. Run the build and existing tests after each task; do not proceed past a broken build.

**Global honesty constraints:**
- Use ONLY the testimonial quotes, metrics, and security facts from the questionnaire — verbatim quotes, no embellishment, no invented numbers.
- The SOC 2 background is Ben's professional experience, never a Sproutflow certification. Phrase as "our founder led SOC 2 Type II readiness…" — never "we are SOC 2 certified."
- Skip any testimonial where permission ≠ yes.

### Task 1 — Testimonials
Create a reusable `Testimonial` component (quote, name, role, business, optional metric badge, logo-or-initial avatar). Place: (a) one featured testimonial on the homepage between the hero/results area and "A better website does more than look good"; (b) matching testimonial inside each corresponding case-study page; (c) if 3 exist, a second on the homepage near the pricing section. Source data from a new `data/testimonials.ts`.

### Task 2 — Security & trust page
New route `/how-we-handle-your-data` (title: "How We Handle Your Data"). Plain-language answers, one short section each: where your data lives · who owns it (the client) · who can access it · backups · what happens if we part ways · founder's security background (per A3). No jargon, no legalese tone, honest and specific. Add a footer link under Explore. Add appropriate metadata + structured data consistent with existing pages. This page differentiates us — write it for a non-technical owner deciding whether to trust us with their business systems.

### Task 3 — Portfolio restructure
In `/work`: add industry/category filter controls; default sort places service & professional businesses first (DJN, NOLA Pool, Second Line, Nealy), personal/brand work after. Remove the Big Butt Association card from `/work` and from the `/case-studies` listing grid, but keep `app/case-studies/big-butt-association` route live and indexed (it will be shared directly). Ensure no dead internal links remain to it from listing pages. Add a "Shopify builds and rebuilds" entry to the add-ons/enhancements area of the services section.

### Task 4 — Footer & social cleanup
Remove Twitter/X, Instagram, and Facebook links from the footer everywhere. Keep LinkedIn only. If questionnaire A2 says the Facebook page is not monitored, also remove the "Message on Facebook" (m.me) CTA from the homepage contact section and replace with the email CTA styling.

### Task 5 — Fix visible "Loading..." state
The nav/hero area renders a literal "Loading..." string in served HTML before hydration (visible in the raw homepage response). Find the component responsible, and either server-render it or replace the fallback with a layout-stable skeleton that never shows the word "Loading". Verify no CLS regression (check with `next build` + Lighthouse if available).

### Task 6 — Team section honesty pass
Change "Meet the Team Behind Your Success" framing to founder-direct positioning: "Meet Ben" / "You work directly with the founder — no handoffs to juniors." Keep the existing bio copy and photo; adjust only headings/framing and any plural "team" language that implies multiple staff.

### Task 7 — Phone number swap
Replace old public company phone references with the new 504 number from A2 everywhere: contact section, footer, `tel:` links, structured data/schema markup, and any metadata.

### Acceptance checklist (run before opening the PR)
- [ ] `npm run build` clean; existing tests pass
- [ ] No literal "Loading..." text in the served HTML of `/`
- [ ] BBA absent from `/work` and `/case-studies` listings; its detail route still returns 200
- [ ] Footer: LinkedIn only; no dead social links anywhere
- [ ] Every testimonial matches the questionnaire verbatim
- [ ] `/how-we-handle-your-data` linked from footer, makes zero certification claims
- [ ] Old 228 number returns zero grep hits across the repo
- [ ] Mobile pass on homepage, /work, and the new security page

Open a PR titled "Credibility & conversion update: testimonials, trust page, portfolio restructure" with a summary of each task.
