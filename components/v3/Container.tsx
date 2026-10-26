import type { ReactNode } from 'react';

export type ContainerSize = 'narrow' | 'default' | 'wide';

/** Max-width tokens from tailwind.config.js (maxWidth). */
export const CONTAINER_SIZES: Record<ContainerSize, string> = {
  narrow: 'max-w-container-narrow', // 48rem, 768px: long reading, forms
  default: 'max-w-container', // 80rem, 1280px: most sections
  wide: 'max-w-container-wide', // 90rem, 1440px: full-bleed media rows
};

export interface ContainerProps {
  size?: ContainerSize;
  as?: 'div' | 'header' | 'footer' | 'article' | 'nav';
  className?: string;
  children: ReactNode;
}

/** Centered content column with the v3 side gutter: 16px phone, 32px tablet, 48px desktop. */
export default function Container({ size = 'default', as: Tag = 'div', className = '', children }: ContainerProps) {
  return (
    <Tag className={['mx-auto w-full px-4 sm:px-8 lg:px-12', CONTAINER_SIZES[size], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
