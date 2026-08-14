# SEO + GEO Spec — Metadata Base Layer & Maintenance Cadence

Goal: rank top 5 for **each service, separately**, and get cited when someone asks an LLM for a New Orleans web/systems person.

The Design Makeover handoff contains no SEO work at all. This document fills that gap. It is implemented across PR 2 (base layer), PR 5 (service pages), PR 6 (case studies), and PR 8 (resources).

---

## 0. The strategic problem, stated plainly

You currently have **one page** competing for **nine services**. That is the entire reason you are not in the top 5 for any of them.

Google and every LLM retrieval system rank *pages*, not businesses. One page mentioning websites, CRMs, booking flows, automation, dashboards, Shopify, SEO, hosting, and maintenance is beaten by nine competitors each of whom has one dedicated page. This is not a copy problem or a backlink problem. It is a URL-count problem.

**The fix is PR 5.** Every service that you want to rank for separately needs its own URL with its own title, its own schema, and its own body copy. Nothing else in this document matters as much.

### Your service inventory vs. what people actually type

Your three paths are the right spine for the site. They are not queries. Keep your language in the H1; put search language in the `<title>` and schema.

| Your path | Real queries underneath it |
|---|---|
| Websites | web design new orleans, website designer new orleans, website redesign, small business website, shopify developer new orleans |
| Business systems | crm developer new orleans, custom booking system, business process automation, internal tools / admin dashboard, small business software |
| Growth and support | website maintenance, website care plan, local seo new orleans, site speed optimization |

### Two-stage URL plan

**Stage 1 (PR 5, now):** three hub pages. `/services`, `/services/websites`, `/services/business-systems`, `/services/growth-support`. This alone takes you from one competing page to four.

**Stage 2 (after v2 ships, one page at a time):** spoke pages for the highest-intent queries, each linked from its parent hub.
`/services/websites/shopify`, `/services/websites/redesign`, `/services/business-systems/crm`, `/services/business-systems/booking-and-intake`, `/services/business-systems/automation`, `/services/growth-support/maintenance`, `/services/growth-support/seo`.

Do **not** build all of Stage 2 at once. Thin duplicate service pages are penalized. Ship one every two to three weeks, each with 700+ words of genuinely distinct copy, its own FAQ, and at least one linked case study. Seven spokes at that pace is roughly five months, which is also roughly how long the hubs need to mature anyway.

---

## 1. Title and description formulas

60-character budget for titles including the ` | Sproutflow Studio` suffix (20 chars). Descriptions 140–158 chars, written to be clicked, not stuffed.

**Template (PR 2):** `"%s | Sproutflow Studio"`

| Route | Title | Description |
|---|---|---|
| `/` (absolute) | `Web Design & Business Systems in New Orleans \| Sproutflow Studio` | `Custom websites, CRMs, booking flows, and automation for New Orleans small businesses. One person start to finish. Written scope, fixed quote.` |
| `/services` | `Services` | `Three ways to work together: websites, business systems, ongoing growth and support. No packages or tiers. Scope written after we talk.` |
| `/services/websites` | `Web Design in New Orleans` | `Custom website design and development for New Orleans small businesses. New builds, rebuilds, and Shopify. You own the domain, code, and accounts.` |
| `/services/business-systems` | `CRM & Business Automation` | `Custom CRMs, booking and intake flows, dashboards, and automation for small businesses. Stop losing leads in the handoff between tools.` |
| `/services/growth-support` | `Website Maintenance & SEO` | `Ongoing hosting, maintenance, search and performance reviews for small business websites. Measured improvements without giving up ownership.` |
| `/work` | `Client Work` | `Websites and business systems built for service businesses, professional practices, and independent brands in New Orleans and nationwide.` |
| `/case-studies/[slug]` | `{clientName}: {oneLineOutcome}` | Per case study, from `caseStudies.ts`. Lead with the business situation, not the tech. |
| `/about` | `About Ben Hankins` | `Six years building software inside large companies, including IBM. Now bringing that delivery discipline to owner-run businesses in New Orleans.` |
| `/faq` | `Common Questions` | `Answers on scope, timelines, pricing, ownership, and what happens after launch. Written for owners deciding whether to hire.` |
| `/resources` | `Guides & Notes` | `Practical guides on websites, business systems, SEO, and owning your own site. Written for small business owners, not other agencies.` |
| `/inquiry` | `Start a Project` | `Tell me what needs to work better. Name and email are the only required fields. Reply within one business day.` |
| `/data-and-ownership` | `How I Handle Your Data` | `Where your data lives, who can access it, backups, and what happens if we part ways. You own the domain, hosting, analytics, and code.` |

**Rule for Cursor:** titles and descriptions live in each route's `metadata` export. Never generate them from a shared helper that interpolates keywords — that produces the near-duplicate metadata Google collapses.

---

## 2. Structured data — the base layer

Goes in `components/StructuredData.tsx` (PR 2). This is the part you set once and rarely touch. It is also the single highest-leverage thing for LLM citation, because retrieval systems parse JSON-LD directly and it removes all ambiguity about who you are.

**Site-wide (in `app/layout.tsx`):**

1. **`ProfessionalService`** (better fit than `LocalBusiness` for a service studio)
   - `name`, `url`, `logo`, `image`, `description`
   - `telephone: "+1-504-326-1676"` — **use this exact E.164 form everywhere**
   - `email`, `address` (New Orleans, LA), `geo`
   - `areaServed`: New Orleans + `Country: US` (you work nationwide; say both)
   - `priceRange` — use `"$$"`, not dollar figures
   - `founder` → the Person node
   - `sameAs`: LinkedIn, Facebook, Instagram, **and the Google Business Profile URL**
   - `hasOfferCatalog` listing the three service paths, each linking its `/services/[path]` URL

2. **`Person`** for Ben — `name`, `jobTitle`, `worksFor`, `alumniOf`/`knowsAbout`, `sameAs` (LinkedIn). LLMs answering "who should I hire in New Orleans" resolve to *people* as often as companies. Most solo studios omit this entirely.

3. **`WebSite`** with `publisher` pointing at the ProfessionalService node.

**Per route:**
- `/services/[path]` → **`Service`** with `serviceType`, `provider`, `areaServed`, `hasOfferCatalog` of capabilities (PR 5)
- `/case-studies/[slug]` → **`Article`** + **`BreadcrumbList`**, `datePublished` + `dateModified` (PR 6)
- `/faq` and each service FAQ subset → **`FAQPage`** (already present on `/faq`, extend in PR 5/8)
- `/resources/[slug]` → **`Article`** with `author` → the Person node (PR 8)
- Every non-home route → **`BreadcrumbList`**

**Non-negotiable:** name, address, and phone must be byte-identical across the site, the schema, the Google Business Profile, and every directory. Inconsistent NAP is the most common local-SEO self-inflicted wound, and you already have one live conflict — the `(228)` number in `data/content.ts`. PR 1 deletes that file, which closes it.

---

## 3. Google Business Profile

Not a code task, but it outranks most on-page work for local queries and nothing in the handoff mentions it.

- Claim/verify the profile with the **(504)** number so it matches the site.
- Add all three service paths as **Services** on the profile, with the same names used in `hasOfferCatalog`.
- Post the `/work` case studies as Updates as they publish.
- Ask each of the five current clients for a review. Five real local reviews will move you further on "web design new orleans" than any amount of on-page work in this document.

---

## 4. GEO — getting cited by LLMs

Different mechanism from search. LLMs retrieve passages and synthesize; they cite sources that are **unambiguous, self-contained, factual, and attributable**. Optimize for extractability.

**Write extractable sentences.** A passage gets cited when it survives being lifted out of context. `"Sproutflow Studio is a one-person web design and business systems studio in New Orleans, run by Ben Hankins."` is citable. `"We bring enterprise thinking to small business."` is not — no entity, no location, no fact. Your v2 copy is already strong here; the spine sentence **"Enterprise delivery habits, small business economics"** is the most quotable line in the set. Make it identical on the homepage and About (see PR plan copy note 4) so it reinforces rather than fragments.

**Answer the question in the first sentence.** Every FAQ answer and every guide should lead with the direct answer, then explain. Retrieval chunks the top of a section far more often than the middle.

**Ship `/llms.txt`** (PR 2). Plain markdown at the root: who you are, where you are, what you do, the three service URLs, contact, and a one-line description of each key page. Cheap, increasingly respected, and almost no competitor in your market has one.

**Entity consistency.** Same business name, same person name, same phone, same city everywhere — site, schema, GBP, LinkedIn, directories. LLMs build entity graphs; conflicting facts make you an unreliable source and you get dropped from the answer.

**Publish the questions people ask LLMs.** "Should I use Squarespace or a custom site?" "How much does a small business website cost in New Orleans?" "Do I own my website if an agency builds it?" Your FAQ already answers three of these well. Each deserves a `/resources` guide, because a dedicated 800-word page gets retrieved where a 60-word accordion answer does not.

**Structured over prose.** Tables, numbered steps, and clear headings get chunked and cited more reliably than flowing paragraphs. The v2 layouts already favor this.

---

## 5. What "top 5 for each service" actually requires

Honest sequencing, so you can judge progress:

| Layer | Effort | Time to effect |
|---|---|---|
| One indexable page per service (PR 5) | High | 2–4 months to index and settle |
| Metadata + schema base layer (PR 2) | Low | 2–6 weeks |
| Google Business Profile + 5 reviews | Low, not code | 2–8 weeks, largest local lift |
| Case studies with real client names (PR 6) | Medium | 1–3 months, compounding |
| Resources cadence (PR 8 + §6) | Ongoing | 3–9 months, compounding |
| Spoke service pages (Stage 2) | High, staged | 4–8 months |

Realistic read: metadata and GBP move you inside two months. Top 5 on competitive heads like "web design new orleans" is a 6–12 month effort and depends on reviews and links as much as on this repo. Top 5 on the specific, lower-volume terms — "crm developer new orleans," "custom booking system small business" — is achievable in 3–6 months because almost nobody is targeting them with a dedicated page. **Those are where you will win first, and they convert better.**

---

## 6. Maintenance cadence

The base layer is built to be durable. Here is what actually needs touching, and when.

| Layer | Contents | Cadence | Trigger |
|---|---|---|---|
| **Base — set once** | Title template, brand name, NAP, `sameAs`, logo, `ProfessionalService` + `Person` + `WebSite` schema, canonical structure, robots, `/data-and-ownership` | **Review every 6 months** | Only on a real business change: number, address, legal name, new social profile |
| **Semi-static** | Service titles/descriptions, `hasOfferCatalog`, capability lists, `areaServed`, FAQ schema, `/llms.txt` | **Quarterly** | Adding or dropping a service; noticing a query you should own |
| **Live counts** | "5 live builds," `/work` and `/faq` mono counts, `StatRail` | **Automatic** | Derive from `projectProof.length` etc. Never hardcode — see PR plan copy note 3 |
| **Case studies** | New `/case-studies/[slug]`, `dateModified` | **Per project** | Every completed client project. Highest-value recurring SEO act you perform |
| **Resources — Notes** | Short dated posts | **Monthly, 1–2** | This is the freshness signal. Skipping it is what makes a site go quiet |
| **Resources — Guides** | Evergreen 800+ word answers | **Quarterly, 1** | Target one LLM-style question per guide |
| **Google Business Profile** | Updates, photos, review requests | **Monthly** | Post each new case study; request a review at every project close |
| **Audit** | Search Console coverage, CTR by query, broken links, schema validation, LLM spot-check | **Quarterly** | See §7 |

### Why the LLM layer needs more frequent attention than classic SEO

Search engines cache and rank on a slow cycle. LLM retrieval increasingly favors recent, well-structured content, and models re-index on their own schedule with no way for you to request a crawl. The practical consequence: **a site that publishes nothing for six months disappears from LLM answers faster than it drops in Google rankings.**

The monthly Note in `/resources` is the cheapest possible defense. Two hundred words on a real decision you made for a real client. It does not need to be an essay — it needs to exist, be dated, and be factual.

### Quarterly audit checklist

1. Search Console: which queries produce impressions but no clicks? Those are title/description rewrites, not new pages.
2. Any service page not indexed after 8 weeks → thin content, expand it.
3. Validate all schema (Rich Results Test) — Google changes requirements without notice.
4. Spot-check GEO: ask ChatGPT, Claude, Gemini, and Perplexity *"who should I hire to build a small business website in New Orleans?"* and *"who builds custom CRMs for small businesses in New Orleans?"* Record whether you appear and what they say about you. This is your only real feedback signal for GEO, so keep the answers in a log to see the trend.
5. Confirm NAP still identical across site, schema, GBP, LinkedIn, directories.
6. Refresh `dateModified` on any case study or guide you meaningfully edited.
