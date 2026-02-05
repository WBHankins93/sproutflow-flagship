// components/layout/StudioLayout.tsx - Professional Layout System

import React from 'react';
import { motion } from 'framer-motion';

// Professional Container Components
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'wide' | 'narrow';
}

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  size = 'default' 
}) => {
  const sizeClasses = {
    default: 'max-w-container',
    wide: 'max-w-container-wide', 
    narrow: 'max-w-container-narrow'
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
};

// Professional Section Component
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'default' | 'sm' | 'lg' | 'none';
  background?: 'white' | 'nature' | 'secondary';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  padding = 'default',
  background = 'white',
  id
}) => {
  const paddingClasses = {
    default: 'section-padding',
    sm: 'section-padding-sm',
    lg: 'section-padding-lg',
    none: ''
  };

  const backgroundClasses = {
    white: 'bg-white',
    nature: 'bg-nature-50',
    secondary: 'bg-nature-50'
  };

  return (
    <section id={id} className={`${paddingClasses[padding]} ${backgroundClasses[background]} ${className}`}>
      {children}
    </section>
  );
};

// Professional Grid System
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 2,
  gap = 'lg',
  className = ''
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

// Professional Card Component (Minimal & Clean)
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  padding = 'lg'
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hover 
    ? 'hover:-translate-y-1 hover:shadow-medium hover:border-primary-500 transition-all duration-200' 
    : '';

  return (
    <div className={`
      bg-white border border-nature-200 rounded-2xl
      ${paddingClasses[padding]}
      ${hoverClasses}
      ${className}
    `}>
      {children}
    </div>
  );
};

// Professional Typography Components
interface HeadingProps {
  children: React.ReactNode;
  level: 1 | 2 | 3;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level,
  className = '',
  as
}) => {
  const Component: React.ElementType = (as ?? (`h${level}` as unknown)) as React.ElementType;
  
  const levelClasses = {
    1: 'font-display text-hero font-semibold text-text-primary',
    2: 'font-display text-section font-semibold text-text-primary',
    3: 'font-body text-subsection font-semibold text-text-primary'
  };

  return React.createElement(
    Component,
    { className: `${levelClasses[level]} ${className}` },
    children
  );
};

interface BodyTextProps {
  children: React.ReactNode;
  size?: 'sm' | 'base' | 'lg';
  color?: 'primary' | 'secondary' | 'muted';
  className?: string;
}

export const BodyText: React.FC<BodyTextProps> = ({
  children,
  size = 'base',
  color = 'secondary',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-body-sm',
    base: 'text-body',
    lg: 'text-body-lg'
  };

  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary', 
    muted: 'text-text-muted'
  };

  return (
    <p className={`font-body ${sizeClasses[size]} ${colorClasses[color]} ${className}`}>
      {children}
    </p>
  );
};

// Professional Button Components
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  icon
}) => {
  const baseClasses = 'inline-flex items-center gap-2 font-body font-medium rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-medium';
  
  const variantClasses = {
    primary: 'text-white bg-text-primary border-2 border-text-primary hover:bg-primary-500 hover:border-primary-500',
    secondary: 'text-text-primary bg-transparent border-2 border-text-primary hover:bg-text-primary hover:text-white'
  };

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

// Professional Animation Wrapper
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
