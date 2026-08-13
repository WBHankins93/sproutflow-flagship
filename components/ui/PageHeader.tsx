import type { ReactNode } from 'react';
import AccentPhrase from './AccentPhrase';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  /** Substring of `title` to set in the accent face. One phrase per headline. */
  titleAccent?: string;
  intro: string;
  count?: string;
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, titleAccent, intro, count, children }: PageHeaderProps) {
  return (
    <header className="grain rings relative overflow-hidden bg-ink-900 text-white">
      <div className="relative mx-auto max-w-[1440px] px-5 pb-16 pt-24 md:px-11 md:pb-24 md:pt-32 lg:pt-36">
        <div className="grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-8">
          <div className="flex items-start justify-between lg:block">
            <p className="flex items-center gap-3 text-eyebrow uppercase text-white/55">
              <span className="h-px w-8 bg-accent-400" aria-hidden="true" />
              {eyebrow}
            </p>
            {count && <p className="font-mono text-mono-meta text-accent-300 lg:mt-8">{count}</p>}
          </div>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 className="max-w-[15ch] font-display text-display-xl text-cream-300 lg:col-span-8">
                {titleAccent ? <AccentPhrase accent={titleAccent}>{title}</AccentPhrase> : title}
              </h1>
            <div className="lg:col-span-4">
              <p className="text-body-lg text-white/[0.68]">{intro}</p>
              {children && <div className="mt-6">{children}</div>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
