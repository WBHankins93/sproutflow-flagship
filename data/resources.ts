export type ResourceType = 'guide' | 'note';
export type ResourceTrack = 'websites' | 'systems' | 'ai';

export interface ResourceEntry {
  slug: string;
  title: string;
  type: ResourceType;
  track: ResourceTrack;
  summary: string;
  readTime: string;
  date?: string;
  sections: string[];
  featured?: boolean;
  draft?: boolean;
}

export const resources: ResourceEntry[] = [
  {
    slug: 'what-you-should-own-after-launch',
    title: 'What you should own after a website launch',
    type: 'guide',
    track: 'websites',
    summary: 'A review skeleton for the accounts, access, files, and documentation that should leave with you.',
    readTime: 'Guide outline',
    sections: ['Domain and DNS', 'Hosting and source code', 'Analytics and search accounts', 'Handoff documentation'],
    featured: true,
    draft: true,
  },
  {
    slug: 'where-small-business-leads-get-lost',
    title: 'Where small-business leads get lost',
    type: 'guide',
    track: 'systems',
    summary: 'A review skeleton for the handoffs between a website, form, inbox, schedule, and follow-up.',
    readTime: 'Guide outline',
    sections: ['The first response', 'Missing context', 'Scheduling gaps', 'Follow-up ownership'],
    draft: true,
  },
  {
    slug: 'when-automation-should-wait',
    title: 'When automation should wait',
    type: 'note',
    track: 'ai',
    summary: 'A short-note skeleton about fixing the decision before automating the steps around it.',
    readTime: 'Note outline',
    date: '2026-08-13',
    sections: ['The repeated task', 'The decision that still needs a person', 'A smaller useful test'],
    draft: true,
  },
];

export function getResource(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
