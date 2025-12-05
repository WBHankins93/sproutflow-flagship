'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { getImageUrl } from '@/lib/blob-images';

interface LogoProps {
  variant?: 'primary' | 'light' | 'dark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  animated?: boolean;
}

const LOGO_SIZES = {
  sm: { designWidth: 60, designHeight: 60, wordsWidth: 180, wordsHeight: 60 },
  md: { designWidth: 80, designHeight: 80, wordsWidth: 240, wordsHeight: 80 },
  lg: { designWidth: 100, designHeight: 100, wordsWidth: 300, wordsHeight: 100 },
  xl: { designWidth: 120, designHeight: 120, wordsWidth: 360, wordsHeight: 120 }
} as const;

export const SproutflowLogo: React.FC<LogoProps> = ({ 
  variant = 'primary',
  size = 'md',
  showText = true,
  className,
  animated = false
}) => {
  const { designWidth, designHeight, wordsWidth, wordsHeight } = LOGO_SIZES[size];
  
  const LogoContent = (
    <div className={cn(
      "flex items-center gap-3 transition-all duration-300",
      className
    )}>
      {/* Logo Design Icon */}
      <div className="relative flex-shrink-0">
        <Image
          src={getImageUrl('logo/logo-design-Photoroom.png')}
          alt="Sproutflow Studio"
          width={designWidth}
          height={designHeight}
          className="object-contain"
          priority
        />
      </div>
      
      {/* Logo Words - Replaces text */}
      {showText && (
        <div className="relative flex-shrink-0">
          <Image
            src={getImageUrl('logo/logo-words-Photoroom.png')}
            alt="Sproutflow Studio"
            width={wordsWidth}
            height={wordsHeight}
            className="object-contain"
            priority
          />
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