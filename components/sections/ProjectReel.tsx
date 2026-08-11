'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { projectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';

const REEL_INTERVAL = 5000;

export default function ProjectReel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeProject = projectProof[activeIndex];

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduceMotion(query.matches);

    updatePreference();
    query.addEventListener('change', updatePreference);
    return () => query.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectProof.length);
    }, REEL_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused, reduceMotion]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        className="relative rounded-xl border border-primary-900/15 px-3 pb-5 pt-8 sm:px-6 sm:pb-7 sm:pt-10"
        style={{ backgroundColor: activeProject.canvasColor }}
      >
        <div className="mx-auto w-full max-w-[44rem]">
          <div className="relative aspect-[16/10] rounded-[0.8rem] border-[6px] border-primary-950 bg-primary-950 p-1 shadow-[0_24px_55px_rgba(31,42,34,0.22)] sm:border-[10px]">
            <div className="absolute left-1/2 top-1 z-20 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/70 sm:top-1.5" aria-hidden="true" />
            <div className="relative h-full overflow-hidden rounded-sm bg-white">
              {projectProof.map((project, index) => (
                <Image
                  key={project.id}
                  src={getImageUrl(project.screenshot)}
                  alt={index === activeIndex ? project.screenshotAlt : ''}
                  fill
                  priority={index === 0}
                  aria-hidden={index !== activeIndex}
                  className={`object-contain object-top transition-opacity duration-500 motion-reduce:transition-none ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  sizes="(max-width: 1024px) 94vw, 50vw"
                />
              ))}
            </div>
          </div>
          <div className="mx-auto h-2 w-[76%] rounded-b-full bg-primary-900/35" aria-hidden="true" />
        </div>

        <div className="mt-5 flex items-end justify-between gap-5 border-t border-black/15 pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: activeProject.inkColor }}>
              Live project
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-primary-950 sm:text-2xl">
              {activeProject.name}
            </p>
            <p className="mt-1 text-sm font-semibold" style={{ color: activeProject.inkColor }}>
              {activeProject.result}
            </p>
          </div>
          <Link
            href={activeProject.href}
            aria-label={`Read the ${activeProject.name} case study`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-black/20 bg-white/70 text-primary-900 hover:bg-white"
          >
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="Choose a featured project">
          {projectProof.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              aria-label={`Show ${project.name}`}
              className={`min-h-11 rounded-md border px-2 text-left text-xs font-semibold transition-colors ${
                index === activeIndex
                  ? 'border-primary-800 bg-primary-800 text-white'
                  : 'border-primary-900/15 bg-white/65 text-primary-900 hover:border-primary-700'
              }`}
            >
              {project.name.replace(' Psychiatry', '').replace(' Solutions', '')}
            </button>
          ))}
        </div>
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setIsPaused((current) => !current)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-primary-900/20 bg-white/65 text-primary-900 hover:border-primary-700"
            aria-label={isPaused ? 'Play project reel' : 'Pause project reel'}
          >
            {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}
