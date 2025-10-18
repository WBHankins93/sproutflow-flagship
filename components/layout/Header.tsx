// components/layout/Header.tsx - FIXED VERSION
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { SproutflowLogo } from '../ui/Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-nature-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo + Brand */}
          <a 
            href="#home" 
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-medium text-text-secondary hover:text-primary-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
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
                  handleNavClick(link.href);
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
                handleNavClick('#contact');
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