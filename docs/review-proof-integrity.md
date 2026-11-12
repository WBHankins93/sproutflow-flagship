# Proof integrity review — October 14, 2026

## Decision and evidence

The earlier review flagged unsupported presentation of business-growth metrics. This change does not declare those results false. `docs/V2_PR_PLAN.md` records Ben's approval of the 50%, 30%, and 2x result strings. However, the repository does not supply measurement periods, baseline/follow-up counts, metric definitions, or client-approved measurement source records. The Nealy case-study source explicitly called its 2x figure an estimate approved by Ben in June 2026. Founder approval alone does not resolve those provenance gaps.

| Claim | Treatment | Evidence needed before restoring as measured proof |
| --- | --- | --- |
| Second Line: 50% more qualified inquiries | Removed from case-study headline, body, stats, card, metadata, project result, and extracted testimonial badge | Definition of qualified inquiry, baseline and comparison dates/counts, source and client approval |
| NOLA Pool: 30% customer acquisition growth | Removed from case-study copy, stats, metadata, project result, and testimonial badge | Customer definition, baseline and comparison dates/counts, attribution and client approval |
| NOLA Pool: #1 local Google ranking | Removed from metadata | Query, geography, date, ranking source and qualification of variability |
| Nealy: 2x/doubled consultation requests | Removed from case-study copy, stats, metadata, and project result | Actual counts and periods, definition of consultation request, source and client approval; an estimate must remain explicitly labeled |
| DJN: 35% increase in total bookings | Preserved verbatim within the existing client testimonial; badge explicitly says client-reported; contextual note accompanies quote | Measurement period/methodology before promotion as independently measured outcome |

## Implemented

- Homepage proof rail now uses the number of listed live projects and existing project capabilities (team-managed inventory and direct quote intake). It does not extract growth numbers from testimonials.
- Case-study and portfolio copy describes delivered capabilities instead of unsupported numerical growth. Metadata uses the same factual framing.
- Existing testimonial quotes and names remain unchanged. No invented client name, permission, or new endorsement was added. DJN measurement context renders on the homepage, shared testimonial component, and case-study layout.
- Notification descriptions now state that email notifications occur on submission; they no longer imply guaranteed human response or that no inquiry can go unanswered.
- Existing delivery timelines and company history remain as previously published project facts; this review did not independently audit project records or client analytics.

## Verification

Targeted tests cover hero provenance, absence of the removed figures in case-study data (including metadata) and project results, preservation and qualification of DJN's quote, and Work-page rendering. Integration verification and browser review are tracked in the overall handoff report.

## Follow-up requiring source material

Collect dated client-approved measurements before reinstating numerical growth claims. Obtain client consent and actual names before replacing anonymous Owner attributions. The historical approval note in `docs/V2_PR_PLAN.md` is retained as provenance, not current permission to restore unsupported presentation.
