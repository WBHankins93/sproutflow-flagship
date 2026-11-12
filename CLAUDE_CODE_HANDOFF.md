# Claude Code handoff: launch the Lead Operations offer

## Objective

Finish and release Sproutflow's focused business-systems offer for service businesses. The offer should explain how Sproutflow captures, coordinates, and follows through on leads without implying that Sproutflow sells lead lists.

## Current state

- Repository: `WBHankins93/sproutflow-flagship`
- Current branch: `feature/lead-operations-offer`
- Current commit: `58885b0`
- The branch tracks `origin/feature/lead-operations-offer` and was clean when this handoff was written.
- `main` was at `acc1495` when this handoff was written.
- The offer implementation has already passed type checking, 169 tests, the copy guard, and a production build in the originating work session.

Read `README.md` and follow its content and verification rules before changing shared copy.

## Product decision

Publicly offer only these three choices:

1. Lead Flow Audit
2. Lead Capture and Follow-Up System
3. Ongoing System Care

The operating model is:

- **Capture:** forms, calls, emails, referrals, customer details, requirements, photos, location, source, and consent.
- **Coordinate:** clean and deduplicate, qualify, prioritize, assign ownership, track status, and connect estimating, scheduling, and customer records.
- **Follow through:** acknowledge, notify, remind, follow up on estimates, confirm bookings, reactivate lost leads, and report conversion and response time.

AI is an implementation advantage inside the system. It is not the product claim by itself. Sproutflow builds reliable workflows around the client's existing tools and does not sell leads.

## Work to complete

1. Review the branch diff against the latest `origin/main` and preserve the focused offer above.
2. Resolve any drift from `main` without discarding either branch's work.
3. Verify service naming, navigation, inquiry flow, metadata, structured data, and mobile presentation.
4. Confirm that all metrics, testimonials, security claims, and case-study claims are sourced and permitted.
5. Open a focused PR for the offer, or update the existing PR if one already exists.
6. After explicit user approval, merge and verify the production deployment at `sproutflow-studio.com`.
7. Capture desktop and mobile proof of the offer pages for later launch and career materials.

## Verification

```bash
npm run type-check
npm test -- --runInBand
npm run check:copy
npm run check:assets
npm run build
```

In a production-style browser run, check `/`, `/work`, `/how-we-handle-your-data`, `/case-studies`, and `/inquiry`, plus every new offer route.

## Deliverables

- A focused PR with a concise before/after summary.
- Green verification results.
- A short deployment verification note and screenshot set after approval.

Do not expand this into generic CRM consulting, lead resale, or a new software platform. Do not push, merge, or deploy without explicit instruction in this project.
