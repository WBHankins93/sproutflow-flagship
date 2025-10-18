// components/Header.tsx
import Image from 'next/image';

export default function Header() {
  return (
    <header className="sticky top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-nature-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16"> {/* Reduced from h-20 */}
          
          {/* Logo + Brand */}
          <a href="#" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
            <a href="#work" className="text-base font-medium text-text-secondary hover:text-primary-600 transition-colors">
              Work
            </a>
            <a href="#services" className="text-base font-medium text-text-secondary hover:text-primary-600 transition-colors">
              Services
            </a>
            <a href="#process" className="text-base font-medium text-text-secondary hover:text-primary-600 transition-colors">
              Process
            </a>
            <a href="#about" className="text-base font-medium text-text-secondary hover:text-primary-600 transition-colors">
              About
            </a>
            <a 
              href="#contact" 
              className="ml-4 px-6 py-2.5 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
            >
              Let&apos;s Talk
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
}