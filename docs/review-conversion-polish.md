# Buyer review: conversion and visual polish

Date: October 15, 2026. Changes are local; deployment is not included.

| Issue | Resolution | Verification |
| --- | --- | --- |
| Founder photograph had an internal production note | Removed the placeholder caption while retaining the descriptive image alt text | Source inspection; full-page visual verification included in handoff checks |
| Shopify filter produced an empty portfolio | Generate filters from the tags of listed projects, so unlisted work cannot create an empty choice | Regression iterates every offered filter and checks matching project cards |
| Inquiry promised visitors could stop after step one | Copy now explains three steps, with only name and email required | Existing inquiry submission regression exercises all steps |
| Service capability pills created dense reading | Replaced pills with semantic, spaced lists; raised supporting text opacity | Desktop/mobile visual verification included in handoff checks |
| Long hero fact values could crowd narrow columns | Smaller typography for longer values, reduced mobile padding, and wrapping within grid cells; stronger label/note contrast | Source inspection; final mobile browser pass required |
| Hero texture competed with screenshots | Isolated the hero stacking context and placed its content above decorative pseudo-elements | Source inspection; visual verification included in handoff checks |
| Service/tier selection was lost on booking CTAs | Allowlisted selections now set a relevant `/book` heading and travel to `/book`, its written inquiry link, and its redirect when booking is off; inquiry-to-booking also retains selection | New regressions cover configured/off states, written fallback, redirects, and rejected unknown values/fields |

The legacy config redirect was removed: `/book` now reads request parameters and owns the disabled-booking redirect, preventing the config layer from forwarding arbitrary query fields before filtering.

Booking query propagation deliberately accepts only known service paths and tiers. Arbitrary visitor query fields, such as contact details or redirect destinations, are not forwarded. This preserves the site's inquiry preselection; it does not claim to attach that context to a submitted Cal.com booking.

## Account settings still requiring action

The calendar's event title and profile avatar are controlled by the Cal.com account, not this repository. Change the public event title to a descriptive fit-call title and upload the approved founder photograph in Cal.com, then inspect the embedded and direct calendar at desktop and mobile sizes. No account configuration or real booking was submitted by this work.

## Tests run for this change

- `npm test -- --runInBand __tests__/high-priority/booking-foundation.test.tsx __tests__/high-priority/booking-cta.test.tsx`: 28 passed.
- `npm test -- --runInBand __tests__/high-priority/review-conversion.test.tsx`: 7 passed.
- The final integrated handoff report records whole-project checks and browser validation; this note is not a claim that third-party booking or inquiry delivery was verified end to end.
