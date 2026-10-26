'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { BookCallLink } from '@/components/ui/BookCallLink';
import { BOOKING_CTA_LABEL, BOOKING_CTA_SHORT } from '@/lib/constants';

/** Primary navigation: the three offer categories, then the studio pages and the free check. */
const NAV_LINKS = [
  { label: 'Websites', href: '/services/websites' },
  { label: 'Systems', href: '/services/business-systems' },
  { label: 'Care', href: '/services/growth-support' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Free check', href: '/check' },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`) || (href === '/work' && pathname.startsWith('/case-studies/'));
}

// Redline focus ring on the Birch canvas (5.73:1); gold light on the Pine menu (7.98:1).
const focusLight =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline';
const focusDark =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-accent-300';

// Same look as the v3 ButtonLink primary variant (Pine fill, Birch text, 11.38:1), sized for the header bar.
const headerButton = `inline-flex min-h-11 items-center justify-center rounded-full border-2 border-primary-900 bg-primary-900 font-semibold leading-tight text-cream-300 transition-colors duration-150 hover:border-primary-800 hover:bg-primary-800 ${focusLight}`;

export default function Header() {
  const pathname = usePathname() ?? '';
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
    <header className="sticky top-0 z-50 border-b border-primary-900/10 bg-cream-300/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-container-wide items-center justify-between gap-6 px-4 sm:px-8 md:h-[80px] lg:px-12">
        <Link
          href="/"
          aria-label="Sproutflow Studio home"
          onClick={() => setOpen(false)}
          className={`flex-none rounded-sm ${focusLight}`}
        >
          <Image
            src={getImageUrl('logo/main-logo-Photoroom.png')}
            alt="Sproutflow Studio"
            width={550}
            height={183}
            className="h-10 w-auto md:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary navigation">
          <ul className="flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex min-h-11 items-center rounded-sm text-[15px] font-medium underline-offset-[6px] ${
                      active
                        ? 'text-primary-900 underline decoration-redline decoration-2'
                        : 'text-[#4A574D] hover:text-primary-900 hover:underline hover:decoration-primary-900/30'
                    } ${focusLight}`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <BookCallLink data-cta="header" className={`${headerButton} px-5 text-[15px]`}>
            {BOOKING_CTA_SHORT}
          </BookCallLink>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <BookCallLink
            data-cta="header-mobile"
            aria-label={BOOKING_CTA_LABEL}
            className={`${headerButton} px-4 text-sm`}
          >
            Book
          </BookCallLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-primary-900/25 text-primary-900 ${focusLight}`}
            aria-label="Toggle menu"
            title={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          className="fixed inset-x-0 top-[72px] h-[calc(100svh-72px)] overflow-y-auto overscroll-contain bg-primary-900 px-4 pb-10 pt-6 text-cream-300 sm:px-8 md:top-[80px] md:h-[calc(100svh-80px)] lg:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="grid">
            {NAV_LINKS.map((link, index) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex min-h-16 items-center justify-between gap-4 border-b border-cream-300/15 font-display text-display-md font-normal ${
                      active ? 'text-accent-300' : 'text-cream-300'
                    } ${focusDark}`}
                  >
                    {link.label}
                    <span
                      className="font-mono text-label tabular-nums text-accent-300 [font-variant-ligatures:none]"
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 space-y-1 text-[#C9CFC4]">
            <a
              className={`flex min-h-11 w-fit items-center rounded-sm hover:text-cream-300 ${focusDark}`}
              href="mailto:ben@sproutflow-studio.com"
            >
              ben@sproutflow-studio.com
            </a>
            <a
              className={`flex min-h-11 w-fit items-center rounded-sm font-mono tabular-nums hover:text-cream-300 ${focusDark}`}
              href="tel:+15043261676"
            >
              (504) 326-1676
            </a>
            <p className="pt-2 text-body-sm">Based in New Orleans. Working with businesses anywhere.</p>
          </div>
        </nav>
      )}
    </header>
  );
}
