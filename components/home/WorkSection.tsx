import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, Heading, Section } from '@/components/v3';
import { caseStudies } from '@/data/caseStudies';
import { getHomeProof, homeProof, homeWork } from '@/data/home';
import { projectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';
import BeforeAfterSlider from './BeforeAfterSlider';
import { TEXT_LINK_CLASS } from './styles';

/** 7. Work: DJN before and after, plus three compact project cards. */
export default function WorkSection() {
  const study = caseStudies.find((entry) => entry.slug === homeWork.featuredSlug);
  const pair = study?.beforeAfter?.find((entry) => entry.beforeSrc && entry.afterSrc);
  const [featured] = getHomeProof([{ projectId: homeWork.featuredProjectId, from: 'testimonialMetric' }]);
  const cards = homeWork.cardIds.flatMap((id) => projectProof.filter((project) => project.id === id));

  return (
    <Section tone="paper" rhythm="tight" id="work" labelledBy="home-work-h">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <Eyebrow index="04">{homeWork.eyebrow}</Eyebrow>
          <Heading as="h2" id="home-work-h" className="mt-4">
            {homeWork.heading}
          </Heading>
          {featured && (
            <div className="mt-6">
              <p className="font-body text-body font-semibold text-primary-900">
                {featured.project.name}{' '}
                <span className="font-normal text-[#4A574D]">· {featured.project.location}</span>
              </p>
              <p className="mt-1 font-body text-body text-[#4A574D]">{homeWork.featuredCaption}</p>
              {featured.figure && (
                <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-primary-900">
                  <span className="font-mono text-numeral tabular-nums [font-variant-ligatures:none]">
                    {featured.figure}
                  </span>
                  <span className="font-body text-body">{featured.rest}</span>
                  <span className="font-mono text-label uppercase text-[#4A574D] [font-variant-ligatures:none]">
                    {homeProof.resultTag}
                  </span>
                </p>
              )}
              <Link
                href={featured.project.href}
                className={`${TEXT_LINK_CLASS} mt-3`}
                data-cta="work-featured"
              >
                {homeWork.caseStudyLink}
                <span className="sr-only">: {featured.project.name}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
        <div className="w-full min-w-0 lg:col-span-6 lg:col-start-1 lg:row-start-1">
          {pair && (
            <BeforeAfterSlider
              before={{ src: getImageUrl(pair.beforeSrc), alt: pair.beforeAlt }}
              after={{ src: getImageUrl(pair.afterSrc), alt: pair.afterAlt }}
              label={homeWork.sliderLabel}
              hint={homeWork.sliderHint}
            />
          )}
        </div>

      </div>

      <ul className="mt-10 grid gap-x-8 gap-y-6 md:grid-cols-3">
        {cards.map((project) => (
          <li key={project.id} className="flex min-w-0 flex-col border-t-2 border-primary-900 pt-4">
            <h3 className="font-body text-body-lg font-semibold leading-snug text-primary-900">{project.name}</h3>
            <p className="font-body text-body-sm text-[#4A574D]">
              {project.industry} · {project.location}
            </p>
            <p className="mt-2 font-body text-body-sm text-primary-900">{project.summary}</p>
            <div className="mt-auto pt-2">
              <Link href={project.href} className={TEXT_LINK_CLASS} data-cta={`work-${project.id}`}>
                {homeWork.caseStudyLink}
                <span className="sr-only">: {project.name}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
