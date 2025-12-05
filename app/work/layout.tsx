import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Web Design Portfolio | Sproutflow Studio New Orleans',
  description:
    'View our portfolio of professional web design projects for New Orleans businesses. Real websites for real businesses - see how we help small businesses compete with enterprise-level web presence.',
  keywords: [
    'web design portfolio New Orleans',
    'website design examples New Orleans',
    'small business websites New Orleans',
    'professional web design portfolio',
    'New Orleans web design projects'
  ],
  alternates: {
    canonical: '/work',
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

