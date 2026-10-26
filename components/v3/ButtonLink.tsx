import Link, { type LinkProps } from 'next/link';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

export type ButtonLinkVariant = 'primary' | 'secondary' | 'onDark';

const BASE =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 px-6 py-2 text-center font-body text-base font-semibold leading-tight no-underline transition-colors duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px]';

/** Fill, text and focus ring per variant. Text pairs: 11.38:1, 11.38:1, 5.81:1. */
export const BUTTON_LINK_VARIANTS: Record<ButtonLinkVariant, string> = {
  // Pine fill on light canvases.
  primary:
    'border-primary-900 bg-primary-900 text-cream-300 hover:border-primary-800 hover:bg-primary-800 focus-visible:outline-redline',
  // Pine outline on light canvases. Not for Pine sections.
  secondary:
    'border-primary-900 bg-transparent text-primary-900 hover:bg-primary-900/[0.06] focus-visible:outline-redline',
  // Goldenrod fill on Pine sections.
  onDark:
    'border-accent-500 bg-accent-500 text-primary-900 hover:border-accent-400 hover:bg-accent-400 focus-visible:outline-accent-300',
};

export interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'> {
  href: LinkProps['href'];
  variant?: ButtonLinkVariant;
  prefetch?: LinkProps['prefetch'];
  className?: string;
  children: ReactNode;
}

/** A link styled as a button: at least 48px tall, visible focus ring. Wraps next/link. */
export default function ButtonLink({ href, variant = 'primary', prefetch, className = '', children, ...rest }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      prefetch={prefetch}
      className={[BASE, BUTTON_LINK_VARIANTS[variant], className].filter(Boolean).join(' ')}
      data-variant={variant}
      {...rest}
    >
      {children}
    </Link>
  );
}
