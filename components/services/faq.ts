// components/services/faq.ts - The /faq questions and their FAQPage schema.
//
// Answers are written for the 29 Oct offers: the Starter landing page, the
// Lead Flow Audit, Site Care and the custom quote. Every price, scope line and
// time is read from data/catalog.ts, so a catalog change updates the answers.
// Site Care is optional (nothing in the catalog requires it).

import { customQuote, formatOfferPrice, formatShortPrice, getOffer, type CatalogOffer } from '@/data/catalog';
import { homeTrust } from '@/data/home';
import type { Question } from './QuestionList';

export interface FaqGroup {
  /** Section id and anchor (`/faq#prices`). */
  id: string;
  eyebrow: string;
  label: string;
  items: Required<Question>[];
}

function offer(key: 'starter' | 'audit' | 'care'): CatalogOffer {
  const found = getOffer(key);
  if (!found) throw new Error(`Missing catalog offer: ${key}`);
  return found;
}

/** "Live within 5 business days after content arrives." to "live within 5 business days after content arrives". */
function lower(sentence: string): string {
  return sentence.charAt(0).toLowerCase() + sentence.slice(1).replace(/\.$/, '');
}

export function buildFaqGroups(): FaqGroup[] {
  const starter = offer('starter');
  const audit = offer('audit');
  const care = offer('care');
  const starterPrice = formatShortPrice(starter);
  const auditPrice = formatShortPrice(audit);

  return [
    {
      id: 'prices',
      eyebrow: 'Prices',
      label: 'Prices and offers',
      items: [
        {
          question: 'How much does a website cost?',
          answer: `The ${starter.name.toLowerCase()} is ${starterPrice}. Anything bigger, like a multi-page site, booking or an online store, is a custom quote: after a 15-minute call I send written options at fixed prices within 2 business days. ${customQuote.range}`,
        },
        {
          question: `What is in the ${starter.name.toLowerCase()}?`,
          answer: `${starter.summary} One round of changes is included.`,
        },
        {
          question: 'Is the price really fixed?',
          answer: `Yes. The ${starter.name.toLowerCase()}, the ${audit.name} and ${care.name} cost what the menu says. For anything else I send written options with the scope, the price and the timeline, and I don’t start until you’ve agreed to one. Custom projects are paid in parts, not all up front.`,
        },
        {
          question: `What do I get from a ${audit.name}?`,
          answer: `For ${auditPrice}, I map the path from first inquiry to booked work, review the tools and handoffs you use now, and hand you a prioritized plan with a fixed build quote. The fee is credited toward any build, and the written agreement says when the audit is delivered.`,
        },
      ],
    },
    {
      id: 'timing',
      eyebrow: 'Timing',
      label: 'Process and timing',
      items: [
        {
          question: 'How fast can it be live?',
          answer: `A ${starter.name.toLowerCase()} is ${lower(starter.priceNote ?? starter.line)}. Larger sites and lead systems take longer, and the written option says exactly when.`,
        },
        {
          question: 'What happens after I book a call?',
          answer:
            'We talk for 15 minutes about what is getting in the way. Within 2 business days you get written options with fixed prices. Once you pick one, I build it with a check-in every week, then launch it with 30 days of fixes.',
        },
        {
          question: 'What do I need to have ready?',
          answer:
            'For the first call, nothing but the problem. For the build, I need your content and photos, access to the accounts the site depends on, and one person who can approve the direction and the launch.',
        },
        {
          question: 'How involved do I need to be?',
          answer:
            'Less than you might think. You review working pages at the weekly check-ins and approve the launch. I handle the design, build, testing and handoff, so you never manage anything technical.',
        },
      ],
    },
    {
      id: 'ownership',
      eyebrow: 'Ownership',
      label: 'Ownership and handover',
      items: [
        {
          question: 'Who owns the finished work?',
          answer:
            'You do. The domain, code, accounts and data are in your name. I document the handoff, and if care ever ends, I remove my access.',
        },
        {
          question: 'What if we stop working together?',
          answer:
            'You leave with everything. I help export the data you need, transfer ownership where the provider supports it, and remove my access once the handoff is done.',
        },
      ],
    },
    {
      id: 'working-together',
      eyebrow: 'Working together',
      label: 'Working with me',
      items: [
        {
          question: 'Who will I be working with?',
          answer:
            'Me. Sproutflow Studio is just me: I take the first call, build the work and pick up after launch. No account managers, no handoffs.',
        },
        {
          question: 'Do you work with businesses outside New Orleans?',
          answer: `Yes. ${homeTrust.location} Calls, reviews and approvals all happen remotely.`,
        },
        {
          question: 'I already have a website. Can you help?',
          answer:
            'Yes. The free website check shows what a customer runs into first. Whether the site needs a fix, a rebuild or a lead system behind it, I lay out the options after a 15-minute call.',
        },
      ],
    },
    {
      id: 'after-launch',
      eyebrow: 'After launch',
      label: 'After launch',
      items: [
        {
          question: 'What happens if something breaks after launch?',
          answer: `${homeTrust.promises[2].body} After that, ${care.name} is there if you want it.`,
        },
        {
          question: `What does ${care.name} cost, and do I need it?`,
          answer: `${formatOfferPrice(care)}. I watch your forms, domain and email, keep things updated, and fix what breaks. It is optional, and you keep ownership whether or not you keep me on.`,
        },
        {
          question: 'Who notices when something fails, and what if you are unavailable?',
          answer:
            'Before care starts, I write down what I watch, who gets the alerts and how quickly I respond. You keep an owner account for every critical service, and the handoff notes list what another developer would need to pick up the work.',
        },
      ],
    },
  ];
}

/** schema.org FAQPage for exactly the questions on the page. */
export function faqSchema(groups: FaqGroup[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: groups
      .flatMap((group) => group.items)
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
  };
}
