import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';

const explore = [
  ['Services', '/services'],
  ['Work', '/work'],
  ['About', '/about'],
  ['Resources', '/resources'],
  ['Common questions', '/faq'],
  ['How I handle your data', '/data-and-ownership'],
];

export const Footer = () => (
  <footer className="border-t border-white/15 bg-ink-900 py-12 text-white">
    <div className="mx-auto max-w-[1440px] px-5 md:px-11">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src={getImageUrl('logo/sproutflow-white-logo.png')}
            alt="Sproutflow Studio"
            width={650}
            height={217}
            className="h-20 w-auto"
          />
          <p className="mt-6 max-w-md text-white/60">
            Websites and business systems that make it easier for customers to choose you and easier for your team to
            follow through.
          </p>
        </div>
        <div className="md:col-span-3 md:col-start-7">
          <p className="text-eyebrow uppercase text-white/40">Explore</p>
          <ul className="mt-5 space-y-3 text-white/70">
            {explore.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-eyebrow uppercase text-white/40">Direct contact</p>
          <div className="mt-5 space-y-3 text-white/70">
            <a className="block hover:text-white" href="mailto:ben@sproutflow-studio.com">
              ben@sproutflow-studio.com
            </a>
            <a className="block hover:text-white" href="tel:+15043261676">
              (504) 326-1676
            </a>
            <a
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:border-white"
              href="https://linkedin.com/company/sproutflow-studio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <p className="mt-12 border-t border-white/15 pt-6 font-mono text-xs text-white/35">
        © {new Date().getFullYear()} Sproutflow Studio · New Orleans, Louisiana
      </p>
    </div>
  </footer>
);
