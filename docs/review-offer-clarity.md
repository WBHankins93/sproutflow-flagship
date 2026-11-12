# Offer and working-relationship review fixes

Updated October 15, 2026. This is a local implementation report, not a deployment confirmation.

## Issues addressed

| Buyer concern | Change |
| --- | --- |
| $1,500 appears to cover any website | Added Rescue versus custom scope to `/services/websites`, linked directly below the homepage Rescue offer, and explained the distinction in FAQ. Existing price and delivery condition preserved. No new custom starting price invented. |
| Unclear content, revisions, exclusions, and running costs | Added scope guidance identifying client-supplied content/access and the items to settle in the fixed quote: content help, review rounds, launch support, exclusions, hosting, domains, and software. |
| Audit deliverable is abstract | Added a tangible deliverable outline and explicitly illustrative example. Audit delivery date and credit application remain matters for written agreement. |
| Lead system is hard to picture | Added an explicitly illustrative capture → assignment/follow-up → booking/review workflow on the systems service page. It is not presented as client proof or an all-inclusive integration promise. |
| $450/month care is insufficiently defined | Added coverage and responsibility guidance covering monitoring, alerts, reporting, included changes, response expectations, costs, and continuity. Exact terms must be agreed in writing; no SLA or availability guarantee invented. |
| Hands-off owner cannot see their responsibilities | Added “What I need from you” and “What I handle” to the homepage process section and FAQ. Specifies approvals and input without claiming an arbitrary weekly cadence. |
| Maintenance testimonial is distant from care offer | Reused the full NOLA Pool Solutions quote and attribution from `data/testimonials.ts` next to the care explanation, linking to the website/upkeep case study. Does not present it as proof of a lead automation product. |
| “Book the audit” opens a discovery call | Changed label to “Discuss an audit.” Existing booking routing is preserved. |
| Service capabilities read as universally included | Changed section label to “Capabilities we can scope.” |
| Repeated generic process messaging | Replaced generic process introductions with concrete review and implementation responsibilities. |
| Faint pricing card supporting text | Raised opacity of secondary and price-note text on the dark primary tier. |

## Implementation

- `data/offerDetails.ts` centralizes detailed service scope, shared responsibilities, and support wording.
- `components/services/ServiceOfferDetails.tsx` renders that data responsively on each service detail route.
- Updated service route, homepage tier/process sections, FAQ, ownership page, and growth-support FAQ.
- Existing price sources and published commercial terms were preserved. Detailed copy refers to those existing terms, so price changes must also update these descriptions.

## Validation

On October 15, 2026:

```text
npm test -- --runInBand __tests__/medium-priority/offers.test.tsx __tests__/medium-priority/component-rendering.test.tsx
2 suites passed; 26 tests passed.
```

Earlier type-check identified concurrent booking and test-type errors outside these offer files; full integrated type-check/build and browser checks belong to the coordinating agent's final verification. This report does not assert they passed.

## Decisions still needed from the business

- Specific response commitments, monitoring cadence, reporting cadence, included-change allowance, backup coverage, and the actual continuity arrangement.
- Audit turnaround and exact credit application terms.
- Content-production/revision allowances for each quote and real recurring third-party costs.
- Any broader custom website starting price, if publishing one is useful and commercially supportable.

The site now explains that these are scoped in writing. It does not claim that unspecified service terms or a backup staffing arrangement already exist. A redacted real audit sample or demonstrated system would strengthen proof further when source material is available.

Integration follow-up: updated the stale FAQ interaction test, which previously rejected all dollar amounts, to check the current $1,500/$500 offers, compare every structured FAQ answer with its expanded visible answer, and continue rejecting retired $850/$200 prices. The immediate three-suite rerun was blocked before tests executed by a concurrent image change importing `lib/optimized-images.json` before that generated file existed. A rerun after that artifact is ready is required.

Final contrast follow-up: the dark primary tier now uses `accent-300` for its tagline and check icons; light cards retain `accent-700`. With the image manifest available, the offers suite rerun passed all 14 tests.
