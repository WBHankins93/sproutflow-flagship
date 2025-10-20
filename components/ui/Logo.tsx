'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface LogoProps {
  variant?: 'primary' | 'light' | 'dark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const LOGO_SIZES = {
  sm: { width: 32, height: 32, textSize: 'text-lg' },
  md: { width: 48, height: 48, textSize: 'text-xl' },
  lg: { width: 64, height: 64, textSize: 'text-2xl' },
  xl: { width: 96, height: 96, textSize: 'text-3xl' }
} as const;

export const SproutflowLogo: React.FC<LogoProps> = ({ 
  variant = 'primary',
  size = 'md',
  showText = true,
  className,
  animated = false
}) => {
  const { width, height, textSize } = LOGO_SIZES[size];
  
  // Logo path based on variant (we'll export these from Canva)
  const getLogoPath = () => {
    switch (variant) {
      default:
        return '/images/logo/sproutflow-main-logo.png'; // main-sprout from Canva
    }
  };

  const getTextColors = () => {
    switch (variant) {
      case 'light':
        return { primary: 'text-white', secondary: 'text-white/80' };
      case 'dark':
        return { primary: 'text-neutral-900', secondary: 'text-neutral-600' };
      case 'monochrome':
        return { primary: 'text-neutral-900', secondary: 'text-neutral-600' };
      default:
        return { primary: 'text-primary-500', secondary: 'text-text-secondary' }; // Using existing color system
    }
  };

  const textColors = getTextColors();
  
  const LogoContent = (
    <div className={cn(
      "flex items-center gap-3 transition-all duration-300",
      className
    )}>
      {/* Logo Mark */}
      <div className="relative flex-shrink-0">
        <Image
          src={getLogoPath()}
          alt="Sproutflow Studio - Where Small Businesses Come Alive Online"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>
      
      {/* Brand Text - Using existing typography system */}
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            "font-display font-semibold tracking-tight leading-none",
            textSize,
            textColors.primary
          )}>
            Sproutflow
          </span>
          <span className={cn(
            "text-xs font-body font-medium tracking-wider uppercase leading-none mt-0.5",
            textColors.secondary
          )}>
            Studio
          </span>
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        className="cursor-pointer"
      >
        {LogoContent}
      </motion.div>
    );
  }

  return LogoContent;
};