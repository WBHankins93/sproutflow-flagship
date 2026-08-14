import type { Metadata } from 'next';
import { FileSearch, MessageSquareText, ReceiptText } from 'lucide-react';
import { InquiryForm } from '@/components/inquiry/InquiryForm';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Start a Project',
  description:
    'Tell me what needs to work better. Name and email are the only required fields. Reply within one business day.',
  alternates: { canonical: '/inquiry' },
};

const pathMap: Record<string, string> = {
  websites: 'Websites that earn trust',
  'business-systems': 'Systems that remove friction',
  'growth-support': 'Ongoing growth and support',
};
const steps = [
  { icon: FileSearch, title: 'I read the details', body: 'Every inquiry comes to me directly.' },
  { icon: MessageSquareText, title: 'We talk if useful', body: 'A short call helps clarify the right starting point.' },
  {
    icon: ReceiptText,
    title: 'You get a fixed quote',
    body: 'Scope, timing, and cost are written down before work starts.',
  },
];

type Props = { searchParams: Promise<{ path?: string }> };

export default async function InquiryPage({ searchParams }: Props) {
  const { path } = await searchParams;
  return (
    <>
      <section className="bg-cream-300 py-14 md:py-20">
        <div className="mx-auto grid max-w-[1186px] gap-12 px-5 md:px-11 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="text-eyebrow uppercase text-accent-700">Start with what you know</p>
            <h1 className="mt-5 font-display text-display-lg text-primary-900">Tell me what needs to work better.</h1>
            <p className="mt-5 text-body-lg text-text-secondary">
              You can stop after the first checkpoint. A polished brief is not required.
            </p>
            <ol className="mt-10 border-t border-primary-900/20">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-primary-900/20 py-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary-900/20">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-primary-900">
                      <span className="mr-2 font-mono text-xs text-accent-700">0{index + 1}</span>
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-text-secondary">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-text-muted">I reply within one business day.</p>
          </aside>
          <div className="border-t border-primary-900/20 pt-8 lg:col-span-7 lg:col-start-6">
            <InquiryForm initialProjectType={path ? pathMap[path] || '' : ''} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
