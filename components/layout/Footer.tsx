// components/layout/Footer.tsx - FIXED VERSION
'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Heading, BodyText } from './StudioLayout';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';

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
    <footer className="bg-primary-900 text-white py-12 md:py-16">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Company Info with Logo - Left aligned */}
          <div>
            <Image 
              src={getImageUrl('logo/main-logo-Photoroom.png')} 
              alt="Sproutflow Studio"
              width={650}  
              height={217}
              className="h-40 md:h-44 w-auto mb-6"
              priority
            />
            <BodyText className="text-white/80 mb-6 max-w-md">
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
          
          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-white/80">
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
          
          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Let&apos;s Connect</h3>
            <ul className="space-y-2 text-white/80">
              <li>New Orleans, LA</li>
              <li>
                <a 
                  href="mailto:ben@sproutflow-studio.com"
                  className="hover:text-white transition-colors"
                >
                  ben@sproutflow-studio.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+12283271082"
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
      </Container>
    </footer>
  );
};