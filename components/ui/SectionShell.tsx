import type { ReactNode } from 'react';

export type ShellVariant = 'ink' | 'cream';

interface SectionShellProps {
  /** Two-digit section index, e.g. "01". Rendered in the sticky margin label. */
  index?: string;
  /** Short label beside the index, e.g. "ways to work together". */
  label?: string;
  variant?: ShellVariant;
  id?: string;
  /** Passed through to aria-labelledby on the section element. */
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}

const VARIANTS: Record<ShellVariant, string> = {
  ink: 'grain bg-ink-900 text-white',
  cream: 'bg-cream-300 text-text-primary',
};

/**
 * Standard section wrapper for v2 pages.
 *
 * Every section on every page uses this, so the ink and cream alternation and
 * the sticky margin label stay consistent. The 190px margin label is desktop
 * only; below lg it collapses into an inline eyebrow above the content.
 */
export default function SectionShell({
  index,
  label,
  variant = 'cream',
  id,
  labelledBy,
  className = '',
  children,
}: SectionShellProps) {
  const hasMarginLabel = Boolean(index || label);

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative overflow-hidden ${VARIANTS[variant]} ${className}`}
    >
      <div className="relative mx-auto flex max-w-[1440px] gap-0 px-5 py-[clamp(3.5rem,12vw,5rem)] md:px-11 md:py-[clamp(4rem,7vw,7.25rem)] lg:gap-8">
        {hasMarginLabel && (
          <>
            {/* Desktop: sticky margin label */}
            <div className="hidden w-[190px] flex-none lg:block">
              <div className="sticky top-[130px]">
                {index && (
                  <span
                    className={`block font-mono text-mono-meta ${
                      variant === 'ink' ? 'text-accent-300' : 'text-accent-700'
                    }`}
                  >
                    {index}
                  </span>
                )}
                {label && (
                  <span
                    className={`mt-2 block text-eyebrow uppercase ${
                      variant === 'ink' ? 'text-white/55' : 'text-text-muted'
                    }`}
                  >
                    {label}
                  </span>
                )}
              </div>
            </div>

            {/* Mobile and tablet: inline eyebrow row */}
            <p
              className={`absolute left-5 top-[clamp(2rem,7vw,2.75rem)] flex items-center gap-2 text-eyebrow uppercase lg:hidden ${
                variant === 'ink' ? 'text-white/55' : 'text-text-muted'
              }`}
            >
              {index && (
                <span className={variant === 'ink' ? 'text-accent-300' : 'text-accent-700'}>
                  {index}
                </span>
              )}
              {label}
            </p>
          </>
        )}

        <div className={`min-w-0 flex-1 ${hasMarginLabel ? 'pt-8 lg:pt-0' : ''}`}>{children}</div>
      </div>
    </section>
  );
}
