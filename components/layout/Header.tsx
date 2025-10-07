'use client';

import React from 'react';
import { Container } from './StudioLayout';
import { SproutflowLogo } from '../ui/Logo';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <SproutflowLogo 
            size="md"
            animated={true}
            className="hover:scale-105 transition-transform duration-300"
          />
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#about" 
              className="text-text-secondary hover:text-primary-500 transition-colors font-body"
            >
              About
            </a>
            <a 
              href="#process" 
              className="text-text-secondary hover:text-primary-500 transition-colors font-body"
            >
              Process
            </a>
            <a 
              href="#portfolio" 
              className="text-text-secondary hover:text-primary-500 transition-colors font-body"
            >
              Portfolio
            </a>
            <a 
              href="#services" 
              className="text-text-secondary hover:text-primary-500 transition-colors font-body"
            >
              Services
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 font-body font-medium rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium text-white bg-text-primary border-2 border-text-primary hover:bg-primary-500 hover:border-primary-500 px-6 py-2.5 text-sm"
            >
              Let's Chat
            </a>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-text-secondary hover:text-primary-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </Container>
    </header>
  );
};