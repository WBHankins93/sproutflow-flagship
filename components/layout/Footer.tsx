import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/15 bg-primary-900 pb-24 pt-14 text-white md:pb-14 md:pt-20">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div>
            <Image
              src={getImageUrl('logo/sproutflow-white-logo.png')}
              alt="Sproutflow Studio"
              width={650}
              height={217}
              className="mb-5 h-24 w-auto"
            />
            <p className="max-w-xl font-display text-2xl italic leading-snug text-white/90 md:text-3xl">
              When the website works, make the business behind it work better.
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
              Founder-led websites and business systems, based in New Orleans and working nationwide.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-4 text-white/50">Explore</p>
            <ul className="space-y-3 text-sm text-white/75">
              <li><Link href="/#pricing" className="hover:text-white">Website pricing</Link></li>
              <li><Link href="/business-systems" className="hover:text-white">Business systems</Link></li>
              <li><Link href="/work" className="hover:text-white">Work</Link></li>
              <li><Link href="/how-we-work" className="hover:text-white">Process</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-white/50">Contact</p>
            <ul className="space-y-3 text-sm text-white/75">
              <li>New Orleans, Louisiana</li>
              <li><a href="mailto:ben@sproutflow-studio.com" className="hover:text-white">ben@sproutflow-studio.com</a></li>
              <li><a href="tel:+15043261676" className="hover:text-white">(504) 326-1676</a></li>
              <li>
                <a
                  href="https://linkedin.com/company/sproutflow-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sproutflow Studio on LinkedIn"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} Sproutflow Studio.</p>
          <Link href="/how-we-handle-your-data" className="hover:text-white">How we handle your data</Link>
        </div>
      </div>
    </footer>
  );
}
