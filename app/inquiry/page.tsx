import { ArrowDown, FileSearch, MessageSquareText, ReceiptText } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/StudioLayout';
import { InquiryForm } from '@/components/inquiry/InquiryForm';

export const metadata = {
  title: 'Start a Project',
  description:
    'Share what you need with Sproutflow Studio. Only your name and email are required, and you can include a comfortable budget privately.',
  alternates: { canonical: '/inquiry' },
};

const nextSteps = [
  { icon: FileSearch, title: 'I read the details', text: 'Every inquiry comes to me directly.' },
  { icon: MessageSquareText, title: 'We talk if useful', text: 'A short call helps clarify the right starting point.' },
  { icon: ReceiptText, title: 'You get a fixed quote', text: 'Scope, timing, and cost are written down before work starts.' },
];

export default function InquiryPage() {
  return (
    <>
      <header className="bg-background-primary py-14 md:py-20">
        <Container>
          <div className="grid gap-10 border-t border-primary-900 pt-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Start with what you know</p>
              <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.95] text-primary-950 sm:text-6xl lg:text-7xl">
                Tell me what needs to work better.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl">
                Name and email are the only required fields. Add a link, a rough idea, or a comfortable budget if it helps explain the situation.
              </p>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">What happens next</p>
              <ol className="space-y-3">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.title} className="grid grid-cols-[2.75rem_1fr] gap-3 border-t border-primary-900/15 pt-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-100 text-primary-800">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-semibold text-primary-900"><span className="mr-1 text-accent-700" aria-hidden="true">0{index + 1}.</span> {step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-text-secondary">{step.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </aside>
          </div>
          <ArrowDown className="mt-10 h-6 w-6 text-accent-700" aria-hidden="true" />
        </Container>
      </header>

      <section className="bg-white pb-20 pt-8 md:pb-28 md:pt-12">
        <Container size="narrow">
          <InquiryForm />
        </Container>
      </section>

      <Footer />
    </>
  );
}
