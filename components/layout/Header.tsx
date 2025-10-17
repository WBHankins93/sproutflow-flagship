'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-soft' 
            : 'bg-white'
        }`}
      >
        <div className="max-w-container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C16 4 12 8 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 8 16 4 16 4Z" fill="#5F755E"/>
                <path d="M16 28V16" stroke="#5F755E" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M16 16C16 16 20 18 22 20C23.1046 21.1046 23.1046 22.8954 22 24C20.8954 25.1046 19.1046 25.1046 18 24C16 22 16 16 16 16Z" fill="#5F755E" opacity="0.7"/>
                <path d="M16 16C16 16 12 18 10 20C8.89543 21.1046 8.89543 22.8954 10 24C11.1046 25.1046 12.8954 25.1046 14 24C16 22 16 16 16 16Z" fill="#5F755E" opacity="0.7"/>
              </svg>
              <span className="font-display text-2xl font-semibold text-text-primary">Sproutflow</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#portfolio" className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors">
                Work
              </a>
              <a href="#services" className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors">
                Services
              </a>
              <a href="#process" className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors">
                Process
              </a>
              <a href="#about" className="text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors">
                About
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors shadow-soft"
              >
                Let's Talk
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-primary-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden" style={{ top: '80px' }}>
          <nav className="flex flex-col p-6 gap-6">
            <a
              href="#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-text-secondary hover:text-primary-600 transition-colors py-2 border-b border-nature-200"
            >
              Work
            </a>
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-text-secondary hover:text-primary-600 transition-colors py-2 border-b border-nature-200"
            >
              Services
            </a>
            <a
              href="#process"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-text-secondary hover:text-primary-600 transition-colors py-2 border-b border-nature-200"
            >
              Process
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-text-secondary hover:text-primary-600 transition-colors py-2 border-b border-nature-200"
            >
              About
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-6 py-3 bg-primary-600 text-white rounded-md text-center font-medium hover:bg-primary-700 transition-colors mt-4"
            >
              Let's Talk
            </a>
          </nav>
        </div>
      )}
    </>
  );
}