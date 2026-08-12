import type { ShellVariant } from './SectionShell';

export interface Stat {
  value: string;
  label: string;
}

interface StatRailProps {
  stats: Stat[];
  variant?: ShellVariant;
  className?: string;
}

/**
 * Horizontal rail of headline numbers with hairline dividers.
 *
 * Values should be derived from data wherever possible. A hardcoded
 * "5 live builds" goes stale the day a sixth client signs.
 */
export default function StatRail({ stats, variant = 'cream', className = '' }: StatRailProps) {
  const divider = variant === 'ink' ? 'border-white/20' : 'border-primary-900/20';
  const value = variant === 'ink' ? 'text-accent-300' : 'text-accent-700';
  const label = variant === 'ink' ? 'text-white/65' : 'text-text-secondary';

  return (
    <dl className={`grid grid-cols-3 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`px-4 first:pl-0 last:pr-0 ${index > 0 ? `border-l ${divider}` : ''}`}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className={`block font-display text-display-md ${value}`}>{stat.value}</span>
            <span className={`mt-1 block text-body-sm ${label}`}>{stat.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
