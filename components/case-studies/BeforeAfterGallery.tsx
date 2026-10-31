import Image from 'next/image';
import type { BeforeAfterPair } from '@/data/caseStudies';
import { getImageUrl } from '@/lib/blob-images';
import { Eyebrow, Heading, Section } from '@/components/v3';

interface BeforeAfterGalleryProps {
  pairs: BeforeAfterPair[];
  clientName: string;
}

type Side = 'Before' | 'After';

/**
 * Old site next to the rebuild, one row per page, on Pine.
 *
 * Captures range from about 1.5:1 to 1.95:1, so each slot is a fixed 16:10
 * box with the screenshot contained (never cropped) on a dark mat. The fixed
 * box reserves space before the image loads, and the before and after in a
 * row always line up at the same height. Pairs missing either image are
 * skipped rather than rendered half empty. Pine, so no red: "After" is Sun
 * gold (9.12:1), "Before" and captions are #C9CFC4 (8.21:1).
 */
export default function BeforeAfterGallery({ pairs, clientName }: BeforeAfterGalleryProps) {
  const complete = pairs.filter((pair) => pair.beforeSrc && pair.afterSrc);
  if (!complete.length) return null;

  return (
    <Section tone="pine" labelledBy="case-before-after-heading">
      <Eyebrow onDark>The old site and the new one</Eyebrow>
      <Heading id="case-before-after-heading" size="md" className="mt-4">
        Before and after.
      </Heading>
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
    </Section>
  );
}

function BeforeAfterFigure({ side, src, alt, caption }: { side: Side; src: string; alt: string; caption?: string }) {
  const after = side === 'After';

  return (
    <figure data-side={side.toLowerCase()}>
      <p
        aria-hidden="true"
        className={`mb-3 flex items-center gap-3 font-mono text-label uppercase [font-variant-ligatures:none] ${
          after ? 'text-forest-sungold' : 'text-[#C9CFC4]'
        }`}
      >
        <span className={`h-px w-6 ${after ? 'bg-forest-sungold' : 'bg-[#C9CFC4]/60'}`} />
        {side}
      </p>
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-xl border bg-black/25 ${
          after ? 'border-forest-sungold/50' : 'border-cream-300/20'
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
      <figcaption className="mt-3 font-body text-body-sm text-[#C9CFC4]">
        <span className="sr-only">
          {side}
          {caption ? ': ' : ''}
        </span>
        {caption}
      </figcaption>
    </figure>
  );
}
