import type { ReactNode } from 'react';
import type { ShellVariant } from './SectionShell';

interface PillProps {
  children: ReactNode;
  variant?: ShellVariant;
  className?: string;
}

/** Small capability tag. Used in service rows, project rows, and case studies. */
export default function Pill({ children, variant = 'cream', className = '' }: PillProps) {
  const styles =
    variant === 'ink'
      ? 'border-white/[0.22] bg-transparent text-white/75'
      : 'border-primary-900/15 bg-white text-text-primary';

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-body-sm leading-none ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
