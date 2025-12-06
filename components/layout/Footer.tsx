// components/layout/Footer.tsx - FIXED VERSION
'use client';

import React from 'react';
import { BodyText } from './StudioLayout';
import { SproutflowLogo } from '../ui/Logo';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/sproutflow-studio', // Update with real link
      icon: Linkedin
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/sproutflowstudio', // Update with real link
      icon: Twitter
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/sproutflowstudio', // Update with real link
      icon: Instagram
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/sproutflowstudio', // Update with real link
      icon: Facebook
    }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr] gap-8 md:gap-12">
          
          {/* Company Info with Logo - Slightly wider */}
          <div>
            <SproutflowLogo 
              variant="light"
              size="lg"
              className="mb-4"
            />
            <BodyText className="text-white/80 mb-4 text-sm">
              Where small businesses come alive online. Enterprise psychology with 
              small business heart – because every growth story deserves professional quality.
            </BodyText>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}
                  className="hover:text-white transition-colors"
                >
                  Foundation Package
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}
                  className="hover:text-white transition-colors"
                >
                  Growth Package
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => { e.preventDefault(); handleNavClick('#services'); }}
                  className="hover:text-white transition-colors"
                >
                  Market Leader Package
                </a>
              </li>
            </ul>
          </div>
          
          {/* Let's Connect */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Let&apos;s Connect</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>New Orleans, LA</li>
              <li>
                <a 
                  href="mailto:hello@sproutflowstudio.com"
                  className="hover:text-white transition-colors"
                >
                  ben@sproutflow-studio.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+15045550000"
                  className="hover:text-white transition-colors"
                >
                  (228) 327-1082 
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/60">
          <BodyText size="sm">
            &copy; {currentYear} Sproutflow Studio. All rights reserved. Growing together since 2025.
          </BodyText>
        </div>
      </div>
    </footer>
  );
};