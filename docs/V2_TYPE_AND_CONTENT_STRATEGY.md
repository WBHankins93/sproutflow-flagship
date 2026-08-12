# Typography + Content Strategy

Companion to `V2_PR_PLAN.md` and `V2_SEO_GEO_SPEC.md`.

---

## 1. Typography

### What Bricolage Grotesque is, and why your instinct is right

Bricolage Grotesque is a variable typeface by Mathieu Triay, released 2023. It has deliberately irregular details, variable width, and optical-size quirks. It was a "font of the moment" pick — it shows up on portfolio sites and creative-studio work where the personality *is* the point.

It is the wrong font for you for one specific reason: **it is fashionable.** Fashionable typefaces date. A studio whose entire pitch is "written scope, fixed quote, one person start to finish, you own everything" is selling *reliability*. The typography should read as settled, not current. In two years Bricolage will read as "built in 2024" the way a 2012 site reads as "built in 2012."

### What serious studios actually use

The typefaces that dominate high-end studio, consultancy, and product work are almost all paid licenses:

| Typeface | Foundry | Character |
|---|---|---|
| Söhne | Klim | Neutral Swiss grotesque, workhorse |
| Founders Grotesk | Klim | Slightly warm, confident, very widely used in studio work |
| Untitled Sans | Klim | Deliberately plain, "no style" as a style |
| GT America | Grilli Type | American gothic meets Swiss, extremely versatile |
| Graphik | Commercial Type | Clean, corporate-modern |
| Suisse Int'l | Swiss Typefaces | Precise, editorial |
| ABC Diatype | Dinamo | Dry, technical, contemporary |

None are on Google Fonts, and the repo loads everything through `next/font/google`. Licensing one of these is a real option later (roughly $200–600 for web), but it is not worth blocking v2 on.

**What matters:** every one of those is a *neutral-to-warm grotesque*. None is quirky. That is the category to stay inside.

### Recommendation

**Keep Archivo for display.** The handoff already specced it, and it is the right call. Archivo (Omnibus-Type) is an American grotesque in the same family as GT America — sturdy, slightly wide, confident, and completely unfashionable in the good sense. It is the closest free equivalent to the typefaces above. Nothing about it will date.

**Keep DM Sans for body.** Already in the repo, warm, highly readable at 16–18px, pairs cleanly under Archivo.

**Change one thing: drop Cormorant Garamond.** This is the actual boutique risk in the spec, not Bricolage. Cormorant is a high-contrast display serif with delicate hairlines — it reads wedding invitation, luxury brand, boutique. It is the exact register you said you do not want, and the spec uses it for the gold italic accent word in every headline, which is the most visible type on the site.

**Replace with Newsreader (italic, 400).** Google Fonts, low contrast, warm, slightly bookish. It carries the same "human voice inside a sans headline" effect without the delicacy. It reads as someone talking rather than something being announced.

**Final stack:**

| Role | Typeface | Weights | Change from handoff |
|---|---|---|---|
| Display | **Archivo** | 600, 700, 800 | none |
| Body | **DM Sans** | 400, 500, 600 | none |
| Accent italic | **Newsreader** | 400 italic | **replaces Cormorant Garamond** |
| Mono | **Fira Code** | 400, 500 | none |

That is a one-line change to PR 3. Everything else in the type spec stands.

### If you want noticeably warmer

Two alternates worth a look before PR 3 locks. Both are single-variable swaps for Archivo:

- **Figtree** — friendly geometric, rounder, more open. Warmest option. Risk: leans startup-friendly, slightly less authority.
- **Instrument Sans** — sharper and more contemporary than Archivo, still neutral. Risk: closer to the fashionable end.

My recommendation stays Archivo. It is the one that will still look right in 2031.

---

## 2. Resources architecture

Yes, `/resources` is the blog and guide section. Getting the structure right now matters more than usual, because you are running it against two goals at once: Sproutflow's authority, and your personal reputation.

### Two content types, different jobs

| | **Notes** (blog) | **Guides** |
|---|---|---|
| Length | 300–800 words | 1,200–2,500 words |
| Cadence | Weekly | Quarterly |
| Dated | Yes, shown | No, evergreen |
| Job | Freshness signal, LLM retrieval, proof of activity | Ranks for a real query, gets cited, converts |
| Schema | `Article` | `Article` + `FAQPage` where it answers questions |
| Bar | "Is this true and useful?" | "Is this the best page on the internet for this question?" |

Weekly Notes is the right instinct. It is the single highest-leverage habit for the LLM goal, because retrieval favors recent, and nothing else you do produces a fresh dated URL every week.

### Three tracks, as you described

Implement as a `track` field on each post, surfaced as filter pills on `/resources`:

1. **`websites`** — Website content. Design decisions, conversion, SEO, ownership, what to ask an agency, template vs custom.
2. **`systems`** — Internal systems. CRMs, booking flows, automation, dashboards, the operational stuff nobody else in your market writes about.
3. **`ai`** — AI. Practical application for small businesses, what it does and does not do well, what you actually use.

Track 2 is your moat. Almost nobody competing for "web design new orleans" can write credibly about CRM architecture. Weight your Notes toward `systems` and `ai` even though `websites` has more search volume — those two are where you are uncontested and where the larger retainer clients come from.

### The fourth track is a different problem

**Architecture and the road to FDE belongs on your personal portfolio, not on Sproutflow.**

Reasoning: that content's audience is senior engineers and hiring managers. Sproutflow's audience is small business owners. Mixing them weakens both — an owner evaluating you for a $12k CRM build does not want to read about your career growth, and a hiring manager does not want to wade through service marketing. Learning in public is a genuinely strong signal for senior and staff roles, and it will read stronger on a personal domain where it is clearly *yours*.

It still feeds Sproutflow indirectly: the "six years shipping enterprise software, enterprise delivery habits" claim on the About page becomes verifiable when there is a public body of architecture writing behind it. Link to it from `/about`, not from `/resources`.

### Cross-posting rule — do not skip this

If the same article exists at two URLs on two domains with no canonical, Google treats it as duplicate content and splits or suppresses both. You lose on both domains.

**The rule:**
- Every post has exactly one canonical home.
- Sproutflow-canonical: client-facing, service-adjacent, written for owners.
- Portfolio-canonical: architecture, FDE, career, technical deep-dives.
- To surface a post on the other site, publish a **short excerpt plus a link**, never the full text. Or if you do republish in full, add `<link rel="canonical">` pointing at the original.
- Some posts legitimately belong to both audiences. Pick the primary audience, make that the canonical, excerpt on the other.

### Suggested first ten Notes

Chosen because each answers a question people literally type into an LLM, which is what gets you retrieved:

1. Do I own my website if an agency builds it? (`websites`)
2. What a fixed quote actually covers, and what it does not (`websites`)
3. Squarespace vs a custom site: the honest decision rule (`websites`)
4. Why your booking form is losing leads and you cannot see it (`systems`)
5. What a small business CRM actually needs, and the six features you can skip (`systems`)
6. Missed-call text-back: what it fixes and what it does not (`systems`)
7. The handoff problem: where leads die between your site and your inbox (`systems`)
8. Where AI actually helps a five-person business right now (`ai`)
9. What I will not automate, and why a person should stay in the loop (`ai`)
10. What "you own your accounts" means in practice, account by account (`websites`)

Numbers 1, 3, 5, and 10 should graduate into full Guides once you have written the Note and seen which get traffic.

### Implementation note for PR 8

- MDX in `content/resources/*.mdx` with frontmatter: `title`, `slug`, `type: 'note' | 'guide'`, `track`, `date`, `updated`, `summary`, `readTime`, `canonical?`, `related: string[]`.
- Filter pills: All / Notes / Guides, then track pills.
- `dateModified` from `updated` in the `Article` schema. Refresh it when you meaningfully edit — LLM retrieval weights it.
- RSS feed at `/resources/feed.xml`. Cheap, and it is how aggregators and some retrieval systems discover you.

---

## 3. Service pages: how much complexity?

Short answer: **low code complexity, real content cost.** The code is a weekend. The copy is the actual project.

**Code (small):**
- One new route `app/services/[path]/page.tsx` with `generateStaticParams` over the three existing `servicePaths` ids
- One index route `app/services/page.tsx`
- Extend `data/servicePaths.ts` with per-path fields: `whoFor: string[]`, `capabilitiesExpanded: {name, detail}[]`, `checkpoints: string[]`, `faqSlugs: string[]`, `relatedCaseStudy: string`, `metaTitle`, `metaDescription`
- Reuses `SectionShell`, `MediaPanel`, `Pill`, `ProjectRow` from PR 3. No new primitives.

**Content (the real cost):** 700+ genuinely distinct words per path, three per-path FAQ subsets, and one media capture each. Three pages of copy that cannot be templated, because near-duplicate service pages are actively penalized.

**Ongoing:** near zero. Quarterly review of the descriptions, that is it.

**Verdict:** worth it, by a wide margin. It is the difference between one page competing for nine services and four pages each competing for two or three. Nothing else in the plan has that leverage. Budget a day of writing per path and do not let it get templated.
