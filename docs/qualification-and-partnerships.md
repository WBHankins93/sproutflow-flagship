# Qualification & Partnership Playbook

Internal reference. Not rendered on the site. The site implements Layer 1
(the /book Cal.com booking form, with /inquiry as the written alternative)
and the copy framing for Layers 2-3; everything else here is operating
discipline.

## The three-layer qualification filter

### Layer 1 - Pre-call qualification (implemented: /book, with /inquiry)
A short set of questions before anyone gets calendar time: what the business
does, the current site, budget bracket, timeline, and whether they are the
decision-maker. People who won't answer a budget bracket question won't pay
invoices either.

> **Changed 13 Oct 2026 (owner-approved):** primary CTAs now go to /book, an
> embedded Cal.com scheduler for a 15-minute fit call. /inquiry stays as the
> written alternative and is linked as the secondary option next to every
> primary booking CTA. The Layer 1 qualifying questions (business, current
> site, budget bracket, timeline, decision-maker) move onto the Cal.com
> booking form, so the call is still gated by them. The older rule that
> every CTA routes to /inquiry first no longer applies; do not reintroduce
> it.

Site enforcement:
- Primary CTAs ("Book a 15-minute call" / "Book a call") use `BookCallLink`,
  which points at /book when `NEXT_PUBLIC_CAL_LINK` is set and falls back to
  /inquiry when it is not (/book also redirects to /inquiry in that case).
- Secondary links ("Or send the details in writing" and similar) go to
  /inquiry.
- The Cal.com event's booking questions carry the Layer 1 qualifiers. The
  /inquiry form still asks budget (tier-mapped brackets + "Not sure yet"),
  timeline, and decision-maker for people who prefer writing.
- No Google Calendar (calendar.app.google) links anywhere on the site.

### Layer 2 - The discovery call is diagnosis, not pitch
Structure the call around their business outcome:
- What does a new client cost you to acquire right now?
- What is a client worth over a year?
- What happens if the site does nothing?

You are qualifying need and urgency, and anchoring the project against
revenue, not against "what websites cost." See also
discovery-call-questions-template.md.

### Layer 3 - Proposals only for qualified buyers
The Brent Weaver insight: ~1 in 10 proposals close when you write one for
everybody; ~9 in 10 when you only write them for leads who have passed
budget, authority, and need. The proposal is a confirmation document, not a
sales document. The discipline is saying no to writing proposals for
unqualified leads. That feels expensive when the pipeline is thin, and that
is exactly when it matters most.

### Layer 4 (optional, once flow exists) - Paid discovery
A $300-500 strategy session, credited toward the project if they proceed.
Filters hard and starts the relationship with them paying you. Not offered
on the site yet.

## Partnership acquisition

Criterion: trusted by NOLA small businesses at the exact moment they need a
website. Ranked by referral timing:

1. Business attorneys and CPAs/bookkeepers - they see new LLC formations; a
   brand-new business needs a site by definition
2. Commercial insurance agents - same trigger
3. Brand photographers - a business doing a brand shoot is investing in image
4. Marketing/social consultants without dev capability - they need a build
   partner constantly; highest-volume source
5. Sign and print shops
6. Commercial realtors - new location means a new or refreshed site
7. SCORE / Propeller / Idea Village mentors

### The motion - give first
Cold-asking a stranger to send clients fails. Send them a referral or a warm
intro before asking for anything. Then the outreach:

> "I run a web design studio here in New Orleans and my clients keep asking
> me who I'd recommend for [bookkeeping/photography/legal]. I'd rather send
> them to someone I've actually met. Coffee this week? 20 minutes."

### The meeting
Learn what a good referral looks like for them first. Then describe yours:
"small business owner, embarrassed by their current site or has none, budget
starting around $850." Agree on the handoff mechanic: a warm email intro
with both parties copied beats "I'll pass along your card."

### Referral fees
- Attorneys and CPAs: reciprocity, not money. Many are ethically restricted
  from accepting fees; offering one can sour the meeting.
- Photographers and marketing consultants: a 10% referral fee or reciprocal
  project work is normal and welcomed.

### Maintenance
One touch per month minimum. Close the loop when their referral lands:
"that intro you made turned into a project, thank you, here's what we
built." Closed-loop feedback is what keeps a partner referring.

Target: 8 coffee meetings booked in 3 weeks; expect 4-5 to become real
reciprocal relationships.
