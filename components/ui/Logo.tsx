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
  sm: { designWidth: 360, designHeight: 360, wordsWidth: 1080, wordsHeight: 360 },
  md: { designWidth: 480, designHeight: 480, wordsWidth: 1440, wordsHeight: 480 },
  lg: { designWidth: 600, designHeight: 600, wordsWidth: 1800, wordsHeight: 600 },
  xl: { designWidth: 720, designHeight: 720, wordsWidth: 2160, wordsHeight: 720 }
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