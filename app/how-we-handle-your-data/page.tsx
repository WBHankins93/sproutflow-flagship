import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'How I Handle Your Data',
  description:
    'Plain-language answers about where Sproutflow Studio client data lives, who owns it, who can access it, backups, exports, and security background.',
  alternates: {
    canonical: '/data-and-ownership',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function HowWeHandleYourDataRedirect() {
  permanentRedirect('/data-and-ownership');
}
