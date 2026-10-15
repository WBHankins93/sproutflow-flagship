'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_LABEL, BOOKING_CTA_SHORT } from '@/lib/constants';

const links = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-cream-300/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[88px] md:px-11">
        <Link href="/" aria-label="Sproutflow Studio home" onClick={() => setOpen(false)}>
          <Image
            src={getImageUrl('logo/main-logo-Photoroom.png')}
            alt="Sproutflow Studio"
            width={550}
            height={183}
            className="h-10 w-auto md:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              pathname.startsWith(`${link.href}/`) ||
              (link.href === '/work' && pathname.startsWith('/case-studies/'));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold ${active ? 'text-primary-800' : 'text-text-secondary hover:text-primary-800'}`}
              >
                {link.label}
              </Link>
            );
          })}
          <BookCallLink
            data-cta="header"
            className="inline-flex min-h-11 items-center rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-800"
          >
            {BOOKING_CTA_SHORT}
          </BookCallLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <BookCallLink
            data-cta="header-mobile"
            aria-label={BOOKING_CTA_LABEL}
            className="inline-flex min-h-11 items-center rounded-full bg-accent-500 px-4 text-sm font-semibold text-ink-900"
          >
            Book
          </BookCallLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-900/20"
            aria-label="Toggle menu"
            title={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="grain fixed inset-x-0 top-[72px] min-h-[calc(100svh-72px)] bg-ink-900 px-5 py-10 text-white lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="relative grid gap-1">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center justify-between border-b border-white/15 font-display text-display-md text-cream-300"
              >
                {link.label}
                <span className="font-mono text-mono-meta text-accent-300">0{index + 1}</span>
              </Link>
            ))}
            <div className="mt-10 space-y-1 text-white/60">
              <a
                className="flex min-h-11 w-fit items-center hover:text-white"
                href="mailto:ben@sproutflow-studio.com"
              >
                ben@sproutflow-studio.com
              </a>
              <p className="flex flex-wrap items-center gap-x-2">
                <a className="inline-flex min-h-11 items-center hover:text-white" href="tel:+15043261676">
                  (504) 326-1676
                </a>
                <span aria-hidden="true">·</span>
                <span>New Orleans, LA</span>
              </p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
