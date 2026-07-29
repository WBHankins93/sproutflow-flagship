'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';

const navLinks = [
  { label: 'Websites', href: '/#pricing' },
  { label: 'Business systems', href: '/business-systems' },
  { label: 'Work', href: '/work' },
  { label: 'Process', href: '/how-we-work' },
  { label: 'About', href: '/#about' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-900/15 bg-[#f7f4ec]/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-[90rem] items-center justify-between gap-5 px-5 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src={getImageUrl('logo/main-logo-Photoroom.png')}
            alt="Sproutflow Studio"
            width={550}
            height={183}
            className="h-11 w-auto"
            priority
          />
          <span className="hidden max-w-[15rem] border-l border-primary-900/20 pl-3 font-display text-sm italic leading-tight text-primary-900 xl:block">
            When the website works, make the business behind it work better.
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = link.href === '/business-systems'
              ? pathname === '/business-systems'
              : link.href === '/work'
                ? pathname === '/work'
                : link.href === '/how-we-work'
                  ? pathname === '/how-we-work'
                  : false;
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
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+15043261676"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary-800"
          >
            <Phone className="h-4 w-4" />
            (504) 326-1676
          </a>
          <Link
            href="/inquiry"
            className="inline-flex min-h-11 items-center gap-2 rounded-[0.35rem] bg-primary-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-[0.35rem] border border-primary-900/20 text-primary-900 lg:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="border-t border-primary-900/15 bg-[#f7f4ec] lg:hidden">
          <nav className="mx-auto max-w-[90rem] px-5 py-5" aria-label="Mobile navigation">
            <div className="grid">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-12 items-center justify-between border-b border-primary-900/10 text-base font-semibold text-primary-900"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              <Link
                href="/inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-[0.35rem] bg-primary-900 px-5 font-bold text-white"
              >
                Tell us about your project
              </Link>
              <a
                href="tel:+15043261676"
                className="flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-text-secondary"
              >
                <Phone className="h-4 w-4" />
                (504) 326-1676
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
