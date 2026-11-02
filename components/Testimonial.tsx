import Image from 'next/image';
import { getImageUrl } from '@/lib/blob-images';
import { getTestimonialByline, type TestimonialEntry } from '@/data/testimonials';

interface TestimonialProps {
  testimonial: TestimonialEntry;
  className?: string;
}

/**
 * A client quote, verbatim, with the attribution exactly as published
 * (getTestimonialByline). v3: the quote in the display serif at 400, the
 * byline in body. Colour comes from the Section tone (Pine on light tones).
 * The metric is not shown here: results carry their own client-reported label.
 */
export default function Testimonial({ testimonial, className = '' }: TestimonialProps) {
  return (
    <figure className={className}>
      <blockquote className="font-display text-display-sm font-normal">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        {testimonial.logoSrc && (
          <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full border border-primary-900/15 bg-forest-white">
            <Image src={getImageUrl(testimonial.logoSrc)} alt="" fill sizes="48px" className="object-contain p-2" />
          </span>
        )}
        <span className="font-body text-body font-semibold">{getTestimonialByline(testimonial)}</span>
      </figcaption>
    </figure>
  );
}
