import Image from 'next/image';
import { Quote, TrendingUp } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import type { TestimonialEntry } from '@/data/testimonials';

interface TestimonialProps {
  testimonial: TestimonialEntry;
  variant?: 'featured' | 'compact';
  className?: string;
}

function getInitials(name: string, business: string) {
  const source = name === 'Owner' ? business : name;
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export default function Testimonial({
  testimonial,
  variant = 'featured',
  className = '',
}: TestimonialProps) {
  const isCompact = variant === 'compact';

  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border border-primary-200 bg-white shadow-lg ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50/60" />
      <div className={`relative z-10 ${isCompact ? 'p-6 md:p-8' : 'p-8 md:p-12'}`}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-200 bg-white shadow-sm">
              {testimonial.logoSrc ? (
                <Image
                  src={getImageUrl(testimonial.logoSrc)}
                  alt={`${testimonial.business} logo`}
                  fill
                  className="object-contain p-2"
                  sizes="56px"
                />
              ) : (
                <span className="font-display text-lg font-bold text-primary-700">
                  {getInitials(testimonial.name, testimonial.business)}
                </span>
              )}
            </div>
            <figcaption>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-600">
                {testimonial.role}, {testimonial.business}
              </p>
            </figcaption>
          </div>

          {testimonial.metric && (
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white">
              <TrendingUp className="h-4 w-4" />
              {testimonial.metric}
            </div>
          )}
        </div>

        <blockquote
          className={`font-display italic leading-relaxed text-gray-800 ${
            isCompact ? 'text-xl' : 'text-2xl md:text-3xl'
          }`}
        >
          <Quote className="mb-4 h-8 w-8 text-primary-500" aria-hidden="true" />
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>
    </figure>
  );
}
