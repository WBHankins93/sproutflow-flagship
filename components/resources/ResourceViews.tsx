import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, Heading, Section } from '@/components/v3';
import ProjectCta from '@/components/case-studies/ProjectCta';
import { TEXT_LINK_CLASS } from '@/components/case-studies/proof';
import { Footer } from '@/components/layout/Footer';
import type { ResourceEntry } from '@/data/resources';
import ResourceIndex from './ResourceIndex';

const LABEL_BASE = 'font-mono text-label uppercase tabular-nums [font-variant-ligatures:none]';
const LABEL = `${LABEL_BASE} text-[#4A574D]`;

function ResourcesCta() {
  return (
    <ProjectCta
      id="resources-cta-h"
      cta="resources"
      heading="Rather talk it through?"
      body="Book a 15-minute call. Bring the question you have about your website or your leads, and I will give you a straight answer."
    />
  );
}

/**
 * /resources index. Tones: clearing (header) · leaf (featured, when there is
 * one) · white (the library) · fern (call to action) · Pine footer.
 */
export function ResourceIndexView({ published }: { published: ResourceEntry[] }) {
  const featured = published.find((resource) => resource.featured);
  const count = `${String(published.length).padStart(2, '0')} ${published.length === 1 ? 'entry' : 'entries'}`;

  return (
    <>
      <Section tone="clearing" labelledBy="resources-h">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-8">
            <Eyebrow>Guides and notes</Eyebrow>
            <Heading as="h1" id="resources-h" italic="written" className="mt-5">
              Useful answers, written down.
            </Heading>
            <p className="mt-6 max-w-[60ch] font-body text-body-lg text-[#4A574D]">
              Longer guides for decisions that deserve context. Short notes for patterns I keep seeing in the work.
            </p>
          </div>
          <p className={`${LABEL} lg:col-span-4 lg:text-right`}>{count}</p>
        </div>
      </Section>
      {featured && (
        <Section tone="leaf" labelledBy="resources-featured-h">
          <div className="max-w-3xl">
            <Eyebrow>{`Featured ${featured.type}`}</Eyebrow>
            <Heading id="resources-featured-h" className="mt-5">
              {featured.title}
            </Heading>
            <p className="mt-5 max-w-[60ch] font-body text-body-lg">{featured.summary}</p>
            <Link href={`/resources/${featured.slug}`} className={`${TEXT_LINK_CLASS} mt-6`}>
              {`Read the ${featured.type}`}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Section>
      )}
      <Section tone="white" labelledBy="resources-library-h">
        <h2 id="resources-library-h" className="sr-only">
          The library
        </h2>
        <ResourceIndex resources={published} />
      </Section>
      <ResourcesCta />
      <Footer />
    </>
  );
}

/** One resource. Tones: clearing (header) · white (the sections) · fern (call to action) · Pine footer. */
export function ResourceArticle({ resource }: { resource: ResourceEntry }) {
  return (
    <>
      <Section tone="clearing" labelledBy="resource-h" container="narrow">
        <Eyebrow>{`${resource.type} · ${resource.track}`}</Eyebrow>
        <Heading as="h1" size="lg" id="resource-h" className="mt-5">
          {resource.title}
        </Heading>
        <p className="mt-6 max-w-[60ch] font-body text-body-lg text-[#4A574D]">{resource.summary}</p>
        <p className={`${LABEL} mt-6`}>{resource.readTime}</p>
      </Section>
      <Section tone="white" ariaLabel={resource.title} container="narrow">
        <ol className="space-y-12">
          {resource.sections.map((section, index) => (
            <li key={section}>
              <span aria-hidden="true" className={`${LABEL_BASE} text-redline`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <Heading size="md" className="mt-3">
                {section}
              </Heading>
            </li>
          ))}
        </ol>
      </Section>
      <ResourcesCta />
      <Footer />
    </>
  );
}
