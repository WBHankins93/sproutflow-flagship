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
  sm: { width: 200, height: 67 },
  md: { width: 300, height: 100 },
  lg: { width: 400, height: 133 },
  xl: { width: 500, height: 167 }
} as const;

export const SproutflowLogo: React.FC<LogoProps> = ({ 
  variant = 'primary',
  size = 'md',
  showText = true,
  className,
  animated = false
}) => {
  const { width, height } = LOGO_SIZES[size];
  
  const LogoContent = (
    <div className={cn(
      "flex items-center transition-all duration-300",
      className
    )}>
      {/* Main Logo */}
      <div className="relative flex-shrink-0">
        <Image
          src={getImageUrl('logo/main-logo-Photoroom.png')}
          alt="Sproutflow Studio"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
      </div>
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