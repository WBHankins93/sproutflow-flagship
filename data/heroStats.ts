import { projectProof } from './projectProof';
import { getTestimonialForCaseStudy } from './testimonials';

export interface HeroStat {
  /** Headline figure, read from the source string, e.g. "35%". */
  value: string;
  /** Short description of what the figure measures. */
  label: string;
  /** Client the result belongs to. */
  note: string;
  /** The published data string the figure was read from. */
  source: string;
}

interface HeroStatSpec {
  projectId: string;
  /** Which published field holds the result for this client. */
  from: 'projectResult' | 'testimonialMetric';
  label: string;
}

/**
 * Client results shown in the homepage hero, in display order.
 *
 * The numbers are never typed here. Each one is read from a result that is
 * already published (a project proof `result` or a testimonial `metric`), so
 * the hero cannot drift from the case studies. If a source string changes
 * shape and no figure can be read from it, that stat is dropped rather than
 * shown wrong.
 */
const HERO_STAT_SPECS: HeroStatSpec[] = [
  { projectId: 'djn-services', from: 'testimonialMetric', label: 'more bookings' },
  { projectId: 'second-line-psychiatry', from: 'projectResult', label: 'more qualified inquiries' },
  { projectId: 'nealy-events', from: 'projectResult', label: 'consultation requests' },
];

/** Leading figure of a result string: "35% increase..." gives "35%", "2x consultation..." gives "2x". */
export function leadingFigure(text: string): string | null {
  const match = text.trim().match(/^(\d+(?:\.\d+)?(?:%|x))(?=\s)/i);
  return match ? match[1] : null;
}

export const heroStats: HeroStat[] = HERO_STAT_SPECS.flatMap((spec) => {
  const project = projectProof.find((entry) => entry.id === spec.projectId);
  if (!project) return [];

  const source =
    spec.from === 'testimonialMetric' ? getTestimonialForCaseStudy(spec.projectId)?.metric : project.result;
  if (!source) return [];

  const value = leadingFigure(source);
  if (!value) return [];

  return [{ value, label: spec.label, note: project.name, source }];
});
