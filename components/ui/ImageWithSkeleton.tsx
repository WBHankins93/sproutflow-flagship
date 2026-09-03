'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

/**
 * Fill-mode Image that shows a shimmering placeholder instead of a blank
 * frame while the (often blob-hosted, uncached) source loads in.
 */
export default function ImageWithSkeleton({ className = '', alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="media-shimmer absolute inset-0 bg-ink-700/40" aria-hidden="true" />
      )}
      <Image
        {...props}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
