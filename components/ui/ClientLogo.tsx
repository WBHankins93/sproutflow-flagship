import Image from 'next/image';
import type { ProjectProof } from '@/data/projectProof';
import { getImageUrl } from '@/lib/blob-images';

type LogoVariant = 'ink' | 'cream';
type LogoSize = 'sm' | 'md' | 'lg';

interface ClientLogoProps {
  project: ProjectProof;
  variant?: LogoVariant;
  size?: LogoSize;
  /** Renders a light chip behind the mark. Required on ink. */
  chip?: boolean;
  className?: string;
}

/** Optical box height per size, in px. */
const BOX: Record<LogoSize, number> = { sm: 28, md: 40, lg: 56 };

/**
 * Client logo, normalised.
 *
 * The source marks range from a 3.9:1 wordmark to several 1:1 badges. Dropped
 * into a fixed slot they look wrong together: a square badge scaled to the same
 * width as a wordmark reads roughly four times heavier. So the box is fixed by
 * *height*, width is allowed to vary, and each project carries a `logoScale`
 * for the optical correction that maths alone cannot do.
 *
 * Most client marks are dark on transparent and disappear on ink, so the ink
 * variant sits them on a light chip rather than trying to invert artwork that
 * was never designed for it.
 */
export default function ClientLogo({
  project,
  variant = 'cream',
  size = 'md',
  chip = variant === 'ink',
  className = '',
}: ClientLogoProps) {
  const box = BOX[size];
  const scale = project.logoScale ?? 1;
  const height = Math.round(box * scale);

  const mark = (
    <span className="relative block" style={{ height, width: height * 4 }}>
      <Image
        src={getImageUrl(project.logo)}
        alt={`${project.name} logo`}
        fill
        sizes={`${height * 4}px`}
        // contain, never cover: a cropped logo is a broken logo.
        className="object-contain object-left"
      />
    </span>
  );

  if (!chip) {
    return <span className={`inline-flex items-center ${className}`}>{mark}</span>;
  }

  return (
    <span
      className={`inline-flex items-center rounded-lg bg-cream-300 px-4 ${className}`}
      style={{ height: box + 20 }}
    >
      {mark}
    </span>
  );
}
