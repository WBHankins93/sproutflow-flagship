import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, Heading, Section, type SectionTone } from '@/components/v3';
import { homeProof, leadingFigure } from '@/data/home';
import { listedProjectProof } from '@/data/projectProof';
import { NUMERAL_CLASS, SOFT_TEXT, TEXT_LINK_CLASS } from './styles';

/**
 * One real project for a service page, read from data/projectProof.ts by id.
 * The result is the published string, labelled client-reported. Renders
 * nothing when the project is missing or unlisted.
 */
export default function RelatedWork({
  projectId,
  tone = 'white',
  index,
}: {
  projectId: string;
  tone?: Extract<SectionTone, 'white' | 'leaf' | 'sunlight' | 'clearing'>;
  index?: string;
}) {
  const project = listedProjectProof.find((entry) => entry.id === projectId);
  if (!project) return null;
  const figure = leadingFigure(project.result);
  const rest = figure ? project.result.trim().slice(figure.length).trim() : project.result;
  const headingId = `related-${project.id}-h`;

  return (
    <Section tone={tone} labelledBy={headingId} rhythm="tight" id="related-work">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <Eyebrow index={index}>Related work</Eyebrow>
          <Heading as="h2" size="md" id={headingId} className="mt-4">
            {project.name}
          </Heading>
          <p className={`mt-1 font-body text-body-sm ${SOFT_TEXT}`}>
            {project.industry} · {project.location}
          </p>
          <p className="mt-4 max-w-[60ch] font-body text-body-lg text-primary-900">{project.summary}</p>
          <Link href={project.href} className={`${TEXT_LINK_CLASS} mt-4`} data-cta={`related-${project.id}`}>
            Read the case study
            <span className="sr-only">: {project.name}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <p className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 border-t-2 border-primary-900 pt-4 text-primary-900 lg:col-span-5">
          {figure && <span className={`font-mono text-numeral ${NUMERAL_CLASS}`}>{figure}</span>}
          <span className="font-body text-body">{rest}</span>
          <span className={`font-mono text-label uppercase ${SOFT_TEXT} [font-variant-ligatures:none]`}>
            {homeProof.resultTag}
          </span>
        </p>
      </div>
    </Section>
  );
}
