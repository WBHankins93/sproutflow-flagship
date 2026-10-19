import { CircleCheck, CircleMinus, CircleX, TriangleAlert } from 'lucide-react';
import type { CheckStatus } from '@/lib/website-check/types';

export const STATUS_WORD: Record<CheckStatus, string> = {
  pass: 'Looks good',
  warn: 'Worth a look',
  fail: 'Needs a fix',
  unknown: 'Not checked',
};

// Every pair clears 4.5:1: primary-800 on primary-50, accent-800 on
// accent-50, red-700 on red-50, text-muted on stone-100. The word is always
// shown, so status never relies on color alone.
export const STATUS_CLASS: Record<CheckStatus, string> = {
  pass: 'bg-primary-50 text-primary-800 ring-primary-800/20',
  warn: 'bg-accent-50 text-accent-800 ring-accent-800/25',
  fail: 'bg-red-50 text-red-700 ring-red-700/25',
  unknown: 'bg-stone-100 text-text-muted ring-stone-400/40',
};

const ICONS = { pass: CircleCheck, warn: TriangleAlert, fail: CircleX, unknown: CircleMinus };

export function StatusIcon({ status, className = 'h-4 w-4' }: { status: CheckStatus; className?: string }) {
  const Icon = ICONS[status];
  return <Icon className={`flex-none ${className}`} aria-hidden="true" />;
}

export function StatusChip({ status, children }: { status: CheckStatus; children?: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full py-1 pl-1.5 pr-3 text-sm font-semibold leading-tight ring-1 ring-inset ${STATUS_CLASS[status]}`}
    >
      <StatusIcon status={status} />
      {children ?? STATUS_WORD[status]}
    </span>
  );
}
