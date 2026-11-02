import Image from 'next/image';
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { getImageUrl } from '@/lib/blob-images';
import { hasPublishedResources } from '@/data/resources';
import { Container, Eyebrow } from '@/components/v3';

/** Where Ben is based, and who he works with. Shown once, in the footer. */
export const FOOTER_BASE_LINE = 'Based in New Orleans. Working with businesses anywhere.';

type FooterLink = [label: string, href: string];

const OFFER_LINKS: FooterLink[] = [
  ['Services', '/services'],
  ['Websites', '/services/websites'],
  ['Lead & Business Systems', '/services/business-systems'],
  ['Care', '/services/growth-support'],
  ['Free website check', '/check'],
];

function getStudioLinks(): FooterLink[] {
  return [
    ['Work', '/work'],
    ['About', '/about'],
    // /resources 404s until a resource is published, so only link it then.
    ...(hasPublishedResources() ? [['Resources', '/resources'] as FooterLink] : []),
    ['Common questions', '/faq'],
    ['How I handle your data', '/data-and-ownership'],
  ];
}

// Birch text on Pine (11.38:1), soft text #C9CFC4 (8.21:1), gold light focus ring (7.98:1).
const linkClass =
  'inline-flex min-h-11 items-center rounded-sm text-cream-300 underline-offset-4 hover:underline hover:decoration-accent-300 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent-300';

function LinkList({ label, id, links }: { label: string; id: string; links: FooterLink[] }) {
  return (
    <nav aria-labelledby={id}>
      <Eyebrow onDark as="p" className="mb-3">
        <span id={id}>{label}</span>
      </Eyebrow>
      <ul>
        {links.map(([text, href]) => (
          <li key={href}>
            <Link href={href} className={linkClass}>
              {text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export const Footer = () => (
  <footer className="bg-primary-900 py-[var(--v3-rhythm-tight)] text-cream-300">
    <Container>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Image
            src={getImageUrl('logo/sproutflow-white-logo.png')}
            alt="Sproutflow Studio"
            width={650}
            height={217}
            className="h-16 w-auto md:h-20"
          />
          <p className="mt-5 max-w-[42ch] text-[#C9CFC4]">
            Websites, lead systems and care for small businesses. I build them and I look after them.
          </p>
          <p className="mt-4 max-w-[42ch] font-medium text-cream-300">{FOOTER_BASE_LINE}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-8 lg:col-span-8 lg:col-start-5">
          <LinkList label="Work with me" id="footer-offers" links={OFFER_LINKS} />
          <LinkList label="Studio" id="footer-studio" links={getStudioLinks()} />
          <div>
            <Eyebrow onDark className="mb-3">
              Direct contact
            </Eyebrow>
            <ul>
              <li>
                <a className={`${linkClass} [overflow-wrap:anywhere]`} href="mailto:ben@sproutflow-studio.com">
                  ben@sproutflow-studio.com
                </a>
              </li>
              <li>
                <a
                  className={`${linkClass} font-mono tabular-nums [font-variant-ligatures:none]`}
                  href="tel:+15043261676"
                >
                  (504) 326-1676
                </a>
              </li>
              <li className="mt-2">
                <a
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream-300/25 text-cream-300 hover:border-cream-300 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent-300"
                  href="https://linkedin.com/company/sproutflow-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-12 border-t border-cream-300/15 pt-6 font-mono text-label uppercase tabular-nums text-[#C9CFC4] [font-variant-ligatures:none]">
        © {new Date().getFullYear()} Sproutflow Studio
      </p>
    </Container>
  </footer>
);
