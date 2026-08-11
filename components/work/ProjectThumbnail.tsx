import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';

interface ProjectThumbnailProps {
  project: ProjectProof;
  priority?: boolean;
  showDetails?: boolean;
}

export default function ProjectThumbnail({
  project,
  priority = false,
  showDetails = true,
}: ProjectThumbnailProps) {
  return (
    <Link
      href={project.href}
      aria-label={`Read the ${project.name} case study`}
      className="group block rounded-xl focus-visible:outline-accent-500"
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-xl border border-primary-900/15 p-4 sm:p-6"
        style={{ backgroundColor: project.canvasColor }}
      >
        <div className="absolute left-5 top-4 z-10 flex items-center gap-2 sm:left-7 sm:top-6">
          <div className="relative h-8 w-20 sm:h-10 sm:w-24">
            <Image
              src={getImageUrl(project.logo)}
              alt=""
              fill
              className="object-contain object-left"
              sizes="96px"
            />
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-4 top-[4.25rem] overflow-hidden rounded-md border border-black/15 bg-white shadow-[0_18px_35px_rgba(31,42,34,0.16)] sm:inset-x-6 sm:bottom-6 sm:top-[5.25rem]">
          <div className="flex h-5 items-center gap-1.5 border-b border-black/10 bg-white px-2" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
          </div>
          <div className="relative h-[calc(100%-1.25rem)] overflow-hidden">
            <Image
              src={getImageUrl(project.screenshot)}
              alt={project.screenshotAlt}
              fill
              priority={priority}
              className="object-cover object-top transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.015]"
              sizes="(max-width: 768px) 92vw, 50vw"
            />
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 flex items-start justify-between gap-5 border-t border-primary-900/20 pt-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-primary-900">{project.name}</h3>
            <p className="mt-1 text-sm text-text-muted">{project.location}</p>
            <p className="mt-2 font-semibold" style={{ color: project.inkColor }}>
              {project.result}
            </p>
          </div>
          <ArrowUpRight
            className="mt-1 h-5 w-5 flex-none text-primary-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>
      )}
    </Link>
  );
}
