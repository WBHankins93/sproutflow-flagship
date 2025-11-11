// components/layout/Header.tsx - FIXED VERSION
'use client';

import { useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

type NavLink = {
  label: string;
  href: string;
  type: 'route' | 'anchor';
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { label: 'Work', href: '/work', type: 'route' },
    { label: 'Services', href: '#services', type: 'anchor' },
    { label: 'Process', href: '#process', type: 'anchor' },
    { label: 'About', href: '#about', type: 'anchor' },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleHomeLink = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    closeMobileMenu();
    if (pathname === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (link: NavLink) => {
    closeMobileMenu();

    if (link.type === 'route') {
      if (pathname !== link.href) {
        router.push(link.href);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (pathname !== '/') {
      const target = link.href.startsWith('#') ? `/${link.href}` : link.href;
      router.push(target);
      return;
    }

    const element = document.querySelector(link.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', link.href);
    }
  };

  return (
    <header className="sticky top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-nature-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo + Brand */}
          <Link 
            href="/" 
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            onClick={(e) => {
              handleHomeLink(e);
            }}
          >
            <Image 
              src="/images/sproutflow-main-logo.png" 
              alt="Sproutflow"
              width={48}  
              height={48}
              className="h-12 w-auto"
              priority
            />
            <span className="font-display text-2xl md:text-3xl font-semibold text-text-primary">
              Sproutflow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = link.type === 'route' && pathname === link.href;
              return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className={`text-base font-medium transition-colors ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-text-secondary hover:text-primary-600'
                }`}
              >
                {link.label}
              </a>
            );
            })}
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick({ label: "Contact", href: "#contact", type: "anchor" });
              }}
              className="ml-4 px-6 py-2.5 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
            >
              Let&apos;s Talk
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-nature-200 bg-white shadow-lg">
          <nav className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link);
                }}
                className="block px-4 py-2 text-base font-medium text-text-secondary hover:text-primary-600 hover:bg-nature-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick({ label: "Contact", href: "#contact", type: "anchor" });
              }}
              className="block w-full px-6 py-3 bg-primary-600 text-white text-center rounded-full font-semibold hover:bg-primary-700 transition-colors mt-4"
            >
              Let&apos;s Talk
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}