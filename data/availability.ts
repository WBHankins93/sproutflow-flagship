// data/availability.ts - Weekend-mode availability copy (Nov 2026).
//
// Ben works a full-time engineering role, so Sproutflow takes a small number of
// weekend projects. Every reply and turnaround promise on the site reads from
// here, so the numbers cannot drift apart. To change the reply window, change
// REPLY_WINDOW and the sentences built from it. Copy rules: Ben's "I" voice,
// no em dashes.

/** How long a new inquiry waits for a reply, at most. */
export const REPLY_WINDOW = '5 business days';

export const availability = {
  /** Site-wide notice bar above the header. */
  notice: `I’ve taken a full-time engineering role, so Sproutflow now takes a small number of weekend projects. I still read every inquiry myself and reply within ${REPLY_WINDOW}.`,
  /** Short line under booking CTAs. Cal.com availability must be Saturdays only for this to be true. */
  callNote: 'Calls are on Saturdays.',
  /** Reply promise for forms and contact lines. */
  replyLine: `I reply within ${REPLY_WINDOW}.`,
  /** Site Care is not sold to new clients right now. */
  careNote: 'Open to current clients only right now.',
  /** One line for the about copy. */
  aboutLine: 'I now work full time as an engineer and run Sproutflow on weekends.',
  faq: {
    question: 'Are you taking new work?',
    answer:
      'Yes, a small number of projects. I work a full-time engineering job, so Sproutflow builds happen on weekends. That means longer timelines than before, and the same fixed price, ownership, and 30 days of fixes after launch.',
  },
} as const;
