# Buyer review fixes and handoff

Date: October 15, 2026
Branch: `codex/buyer-review-fixes`
Baseline: `be2a840` (includes the already-merged Formspree default fix)

## Scope and delivery

This work follows the desktop/mobile buyer review and recent-change review. Three subagents worked in parallel on proof integrity, offer clarity, and conversion/design. Usage-limit interruptions paused the agents; their saved changes were preserved and resumed. The primary agent integrates changes, runs project checks, verifies the production build in the browser, and maintains this issue register.

Changes are local. No commit, push, merge, production deployment, live inquiry, calendar booking, or account-settings change is included. The pre-existing untracked `CLAUDE_CODE_HANDOFF.md` is preserved.

## Issue register

| ID | Finding | Resolution / acceptance condition |
| --- | --- | --- |
| BR-01 | Internal photography instruction visible below founder image | Remove production note and extend copy guard to prevent recurrence. Retain founder image and alt text. |
| BR-02 | Headline growth percentages lack measurement context | Replace standalone 50%, 30%, and 2x claims with delivered capabilities across hero, portfolio, case studies, and metadata. Preserve historical approval record and verbatim testimonials. See proof report for restoration criteria. |
| BR-03 | DJN quote is presented beside independently stated metrics | Keep quote unchanged; identify its figure as client-reported wherever the quote appears. |
| BR-04 | Rescue price can be mistaken for the price of all websites | Distinguish $1,500 five-page Rescue from custom work quoted to scope; explain content, revisions, extras, and recurring cost boundaries. |
| BR-05 | Audit deliverable and credit are abstract | Explain deliverable outline and illustrative recommendation. Keep existing $500 credit promise; delivery date and application are agreed in writing, not invented here. |
| BR-06 | Lead-system proof leans toward website screenshots | Add a clearly illustrative capture → assignment/follow-up → booking/review workflow. Real measured systems case study or walkthrough remains a content opportunity requiring actual client material. |
| BR-07 | Buyer cannot assess their workload | Add owner-versus-Ben responsibilities and approval checkpoints. Avoid unsupported estimates of client hours or a universal update cadence. |
| BR-08 | Care coverage, failure response, costs, continuity unclear | Explain what the written care agreement must settle. Align backup/recovery wording. Specific coverage and response commitments remain business decisions. |
| BR-09 | Hands-off reassurance is distant from care offer | Reuse existing NOLA Pool testimonial beside ongoing care without changing attribution or inventing client identity. |
| BR-10 | Audit CTA implies immediate purchase/booking of paid audit | Use introductory discussion wording consistent with the fit-call destination. |
| BR-11 | Booking loses selected service/tier | Preserve only allowlisted service/tier context through booking and written inquiry fallback. Do not forward arbitrary query data or claim Cal.com stores it. |
| BR-12 | Generic calendar title/avatar | Repository framing improved; Cal.com account title and profile photo require authenticated account configuration. No account change made. |
| BR-13 | Inquiry says visitors can stop after first checkpoint | State the actual three-step flow and only-required name/email fields. |
| BR-14 | Shopify portfolio filter is empty | Derive available filters from listed projects; test every offered category. |
| BR-15 | Service pills dense and supporting copy faint | Use semantic capability lists and improve readability while keeping existing identity. |
| BR-16 | Hero texture competes with project imagery | Keep decorative layers behind hero content. Verify desktop and narrow layouts. |
| BR-17 | Anonymous Owner testimonials | Preserve approved attribution. Actual names/roles require client permission; do not manufacture stronger endorsements. |
| BR-18 | Source images fail existing asset budget | Local optimization and asset verification tracked in asset report; original remote files must remain untouched. |

## External/business follow-up

- **Cal.com:** set an approved founder photo and a descriptive event title such as “15-minute Sproutflow fit call”; inspect both embedded and direct calendar after saving. Availability works in the earlier live review; no appointment was made.
- **Measurement evidence:** supply baseline/comparison dates, counts, definitions, source, and client approval before restoring exact growth claims. Earlier founder approval is documented; this review does not assert the figures are false.
- **Support offer:** decide actual monitoring coverage, alert recipients, response targets, included work allowance, reporting cadence, recurring vendor costs, and continuity arrangements before making them universal public promises.
- **Audit terms:** decide turnaround and credit application details before publishing fixed terms.
- **Client attribution:** obtain consent to publish actual names for currently anonymous testimonials.
- **Delivery acceptance:** a real Formspree receipt and Cal.com confirmation require an intentional production test and inbox/calendar verification. Unit tests and rendering checks do not establish delivery.

## Final status

Repository fixes are complete and verified locally. BR-01, BR-03–05, BR-07, BR-09–11, BR-13–16, and BR-18 are implemented. BR-02 is mitigated by removing unsupported standalone numerical presentation; source collection remains open. BR-06 has an illustrative workflow; a real client walkthrough remains optional future content. BR-08 explains agreement boundaries, but Ben still needs to define actual service commitments. BR-12 and BR-17 require account configuration or client consent and are not represented as completed.

## Verification

Final integrated checks on October 15, 2026:

| Check | Result |
| --- | --- |
| `npm test -- --runInBand` | PASS: 17 suites, 227 tests; final run after integration |
| `npm run type-check` | PASS |
| `npm run build` | PASS: production compilation, type validation, and 30 generated pages; `/book` remains dynamic for context/redirect handling |
| `npm run check:copy` | PASS |
| `npm run check:assets -- --ci` | PASS: 12 inventory assets, 637,040 bytes total, zero over budget |
| `git diff --check` | PASS |

Initial failures were corrected: outdated FAQ no-price expectation, custom Jest matcher typing, async booking PageProps typing, copy-guard test environment, and temporary missing image manifest during generation. Final checks above supersede intermediate failures in individual workstream notes.

Build emitted non-blocking stale `baseline-browser-mapping` and Browserslist dataset warnings. No dependency upgrade was bundled into this copy/layout change. The repository's standalone `npm run lint` is not a validated gate (README already identifies the Next/ESLint setup limitation); no claim of a separate lint pass is made.

Production-server browser verification used `npm run start -- --port 3100`:

- Desktop homepage, service capability lists, pricing cards, new systems scope section, and contextual audit booking page inspected visually.
- Narrow viewport requested at 390 × 844; browser reported 375 CSS pixels of document content width. Homepage, all three service detail pages, work, FAQ, ownership, Nealy case study, inquiry, and booking had equal document client/scroll widths (no page-level horizontal overflow).
- Homepage founder production note absent; checked homepage images had no completed broken images. New hero capability values fit the narrow proof rail.
- `/book?tier=lead-flow-audit` showed the audit heading. Its written fallback retained the tier and preselected Lead capture and follow-up. All three inquiry steps were navigated without entering personal data or submitting.
- Mobile Systems filter showed matching projects; Shopify was absent. Regression tests exercise all offered filters.
- Mobile Cal.com embed loaded the calendar and available time slots. No booking was confirmed. Calendar title/avatar are still the account-controlled originals.
- Browser error log returned no entries at the checked point. This is a scoped smoke check, not an exhaustive browser/device or accessibility audit.

Screenshots are saved in `docs/review-evidence/`: homepage desktop/mobile, pricing desktop, system-scope desktop, and booking mobile. These are local build evidence, not production-deployment evidence.

## Release and rollback

Review the complete working diff and untracked files before committing. In particular include the JSON manifest, new components/data/helpers/tests/scripts, and **all 12 files in `public/optimized-images/`**. These derivatives are intentionally outside the ignored originals directory and must travel with the image-helper change. Do not add `.env.local`, ignored source-image folders, or unrelated pre-existing handoff material.

No production change has occurred. A later release should repeat verification if source changes, deploy a preview, inspect that preview, and only publish under the user's release instructions. To undo the local image routing, revert the manifest lookup in `lib/blob-images.ts`; original blob assets are unchanged. To roll back the full change after a future commit, revert that change commit rather than deleting unrelated work.

## Workstream reports

- [Proof integrity](review-proof-integrity.md)
- [Offer clarity](review-offer-clarity.md)
- [Conversion and visual polish](review-conversion-polish.md)
- [Asset optimization](review-assets.md)
