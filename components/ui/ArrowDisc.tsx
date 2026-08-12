import { ArrowRight } from 'lucide-react';
import type { ShellVariant } from './SectionShell';

interface ArrowDiscProps {
  /** Rotates the arrow 45 degrees and fills the disc gold. */
  open?: boolean;
  variant?: ShellVariant;
  className?: string;
  size?: number;
}

/**
 * Circular arrow affordance for accordion rows.
 *
 * Decorative. The row's own button carries the accessible name and
 * aria-expanded, so this is hidden from assistive tech.
 */
export default function ArrowDisc({
  open = false,
  variant = 'cream',
  className = '',
  size = 46,
}: ArrowDiscProps) {
  const idle =
    variant === 'ink'
      ? 'border-white/25 text-white/70'
      : 'border-primary-900/20 text-primary-800';
  const active = 'border-accent-500 bg-accent-500 text-ink-900';

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`inline-flex flex-none items-center justify-center rounded-full border transition-colors duration-200 motion-reduce:transition-none ${
        open ? active : idle
      } ${className}`}
    >
      <ArrowRight
        className={`h-5 w-5 transition-transform duration-200 motion-reduce:transition-none ${
          open ? '-rotate-45' : ''
        }`}
      />
    </span>
  );
}
