'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { ShellVariant } from './SectionShell';

interface MediaPanelProps {
  /** Image or video source. When omitted, the placeholder renders instead. */
  src?: string;
  /** Poster frame for video. Required by the handoff whenever src is a video. */
  poster?: string;
  /** Label shown when src is missing, so the layout never collapses. */
  placeholder: string;
  alt?: string;
  variant?: ShellVariant;
  /** Panel height in px. */
  height?: number;
  className?: string;
}

const VIDEO = /\.(mp4|webm)$/i;

/**
 * Media slot that is safe to ship before its asset exists.
 *
 * Without src it renders a labeled, bordered panel rather than a blank box,
 * which is what lets the homepage and service pages merge ahead of the client
 * recordings. Video autoplays muted and pauses off screen.
 */
export default function MediaPanel({
  src,
  poster,
  placeholder,
  alt = '',
  variant = 'cream',
  height = 470,
  className = '',
}: MediaPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            /* Autoplay can be refused; the poster stays visible. */
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  const frame =
    variant === 'ink'
      ? 'border-white/15 bg-white/[0.04] text-white/45'
      : 'border-primary-900/15 bg-white text-text-muted';

  return (
    <div
      style={{ height }}
      className={`relative overflow-hidden rounded-xl border ${frame} ${className}`}
    >
      {!src && (
        <div className="flex h-full items-center justify-center px-6 text-center">
          <span className="text-eyebrow uppercase">{placeholder}</span>
        </div>
      )}

      {src && VIDEO.test(src) && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={alt || undefined}
          className="h-full w-full object-cover object-top"
        />
      )}

      {src && !VIDEO.test(src) && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          // Screenshots letterboxed in the previous build. Cover plus top
          // keeps the meaningful part of a page capture visible.
          className="object-cover object-top"
        />
      )}
    </div>
  );
}
