import { listedProjectProof } from './projectProof';

export interface HeroStat {
  value: string;
  label: string;
  note: string;
  /** Published project fact supporting this item, not a measured business outcome. */
  source: string;
}

const liveProjects = listedProjectProof.filter((project) => project.status === 'Live');
const nealy = listedProjectProof.find((project) => project.id === 'nealy-events');
const nola = listedProjectProof.find((project) => project.id === 'nola-pool-solutions');

/** Show inspectable project facts; business-growth estimates do not belong in the hero. */
export const heroStats: HeroStat[] = [
  {
    value: String(liveProjects.length),
    label: 'featured live projects',
    note: 'Explore the work',
    source: liveProjects.map((project) => project.name).join(', '),
  },
  ...(nealy ? [{ value: 'In-house', label: 'inventory updates', note: nealy.name, source: nealy.result }] : []),
  ...(nola ? [{ value: 'Direct', label: 'quote requests', note: nola.name, source: nola.result }] : []),
];
