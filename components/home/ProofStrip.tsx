import Image from 'next/image';
import { Heading, Section } from '@/components/v3';
import { getHomeProof, homeProof } from '@/data/home';
import { getImageUrl } from '@/lib/blob-images';

const LOGO_HEIGHT = 32;

/** 3. Proof strip: the four client sites and what each owner reported. */
export default function ProofStrip() {
  const items = getHomeProof();

  return (
    <Section tone="white" rhythm="none" className="py-8 md:py-[var(--v3-rhythm-tight)]" id="results" labelledBy="home-proof-h">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
      <Heading as="h2" size="sm" id="home-proof-h" className="max-w-[36ch] lg:col-span-3">
        {homeProof.heading}
      </Heading>
      <div className="min-w-0 lg:col-span-9">
      <ul className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 lg:gap-x-8">
        {items.map(({ project, figure, rest, result }) => {
          const scale = project.logoScale ?? 1;
          const height = Math.round(LOGO_HEIGHT * scale);
          const width = Math.round(height * project.logoAspect);
          return (
            <li key={project.id} className="flex min-w-0 flex-col border-t border-primary-900/15 pt-4">
              <div className="flex h-8 items-center">
                <Image
                  src={getImageUrl(project.logo)}
                  alt=""
                  width={width}
                  height={height}
                  className="max-w-full object-contain object-left"
                  style={{ height, width: 'auto' }}
                />
              </div>
              <p className="mt-4">
                {figure ? (
                  <>
                    <span className="block font-mono text-numeral tabular-nums text-primary-900 [font-variant-ligatures:none]">
                      {figure}
                    </span>{' '}
                    <span className="mt-1 block font-body text-body-sm text-primary-900">{rest}</span>
                  </>
                ) : (
                  <span className="block font-body text-body text-primary-900">{result}</span>
                )}
              </p>
              <p className="mt-3 font-body text-body-sm font-semibold text-primary-900">{project.name}</p>
              <p className="font-body text-body-sm text-[#4A574D]">{project.location}</p>
              <p className="mt-2 font-mono text-label uppercase text-[#4A574D] [font-variant-ligatures:none]">
                {homeProof.resultTag}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 font-body text-body-sm text-[#4A574D]">{homeProof.source}</p>
      </div>
      </div>
    </Section>
  );
}
