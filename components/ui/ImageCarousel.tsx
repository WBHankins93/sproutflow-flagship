'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/lib/blob-images';

interface Slide {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  slides: Slide[];
  intervalMs?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Cross-fades between slides absolutely stacked in the same box, so there is
 * no layout shift between frames. Pauses on prefers-reduced-motion (shows
 * the first slide only) and when there's nothing to rotate through.
 */
export default function ImageCarousel({
  slides,
  intervalMs = 4500,
  priority = false,
  sizes = '(max-width: 1024px) 92vw, 48vw',
  className = '',
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={getImageUrl(slide.src)}
          alt={slide.alt}
          fill
          priority={priority && i === 0}
          sizes={sizes}
          className={`object-cover object-top transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
