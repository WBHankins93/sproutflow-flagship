import Image from 'next/image';
import type { BeforeAfterPair } from '@/data/caseStudies';
import { getImageUrl } from '@/lib/blob-images';
import SectionShell from '@/components/ui/SectionShell';

interface BeforeAfterGalleryProps {
  pairs: BeforeAfterPair[];
  clientName: string;
}

type Side = 'Before' | 'After';

/**
 * Old site next to the rebuild, one row per page.
 *
 * Captures range from about 1.5:1 to 1.95:1, so each slot is a fixed 16:10
 * box with the screenshot contained (never cropped) on an ink mat. The fixed
 * box reserves space before the image loads, and the before and after in a
 * row always line up at the same height. Pairs missing either image are
 * skipped rather than rendered half empty.
 */
export default function BeforeAfterGallery({ pairs, clientName }: BeforeAfterGalleryProps) {
  const complete = pairs.filter((pair) => pair.beforeSrc && pair.afterSrc);
  if (!complete.length) return null;

  return (
    <SectionShell label="before and after" variant="ink" tone="raised" labelledBy="case-before-after-heading">
      <h2 id="case-before-after-heading" className="font-display text-display-md text-cream-300">
        Before and after.
      </h2>
      <ol className="mt-10 grid gap-12 md:gap-16">
        {complete.map((pair, index) => (
          <li key={`${pair.beforeSrc}-${pair.afterSrc}`} className="grid gap-6 md:grid-cols-2 md:gap-8">
            <BeforeAfterFigure
              side="Before"
              src={pair.beforeSrc}
              alt={pair.beforeAlt || `Before: ${clientName} page ${index + 1}`}
              caption={pair.beforeCaption}
            />
            <BeforeAfterFigure
              side="After"
              src={pair.afterSrc}
              alt={pair.afterAlt || `After: ${clientName} page ${index + 1}`}
              caption={pair.afterCaption}
            />
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}

function BeforeAfterFigure({ side, src, alt, caption }: { side: Side; src: string; alt: string; caption?: string }) {
  const after = side === 'After';

  return (
    <figure data-side={side.toLowerCase()}>
      <p
        aria-hidden="true"
        className={`mb-3 flex items-center gap-3 text-eyebrow uppercase ${
          after ? 'text-accent-300' : 'text-white/55'
        }`}
      >
        <span className={`h-px w-6 ${after ? 'bg-accent-400' : 'bg-white/30'}`} />
        {side}
      </p>
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-xl border bg-ink-900 ${
          after ? 'border-accent-400/40' : 'border-white/15'
        }`}
      >
        <Image
          src={getImageUrl(src)}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center"
        />
      </div>
      <figcaption className="mt-3 text-body-sm text-white/[0.68]">
        <span className="sr-only">{side}{caption ? ': ' : ''}</span>
        {caption}
      </figcaption>
    </figure>
  );
}
