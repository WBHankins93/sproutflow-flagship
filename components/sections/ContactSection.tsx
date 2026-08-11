import Link from 'next/link';
import { ArrowRight, Banknote, FileText, Mail, MessageSquareText, Phone } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const nextSteps = [
  { icon: MessageSquareText, label: 'You share what is happening now.' },
  { icon: Banknote, label: 'Add a comfortable budget if you have one.' },
  { icon: FileText, label: 'I recommend a scope and fixed quote.' },
];

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-background-primary py-20 md:py-28">
      <Container>
        <div className="grid border-y border-primary-900/20 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">Start with what you know</p>
            <h2 id="contact-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl lg:text-6xl">
              Tell me what needs to work better.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              A sentence or two is enough. You can share your budget privately, skip the questions you cannot answer yet, and ask for a recommendation before deciding anything.
            </p>

            <ol className="mt-8 grid gap-3 sm:grid-cols-3">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.label} className="border-t border-primary-900/20 pt-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-100 text-primary-800">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-sm font-semibold leading-relaxed text-primary-900">
                      <span className="mr-1 text-accent-700" aria-hidden="true">0{index + 1}.</span> {step.label}
                    </p>
                  </li>
                );
              })}
            </ol>

            <Link href="/inquiry" className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary-800 px-7 py-3.5 font-semibold text-white hover:bg-primary-700">
              Tell me about your project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <aside className="mt-10 border-t border-primary-900/20 pt-7 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h3 className="font-display text-2xl font-semibold text-primary-900">Prefer a short note?</h3>
            <p className="mt-3 leading-relaxed text-text-secondary">Contact me directly. I reply within one business day.</p>
            <div className="mt-7 space-y-3">
              <a href="mailto:ben@sproutflow-studio.com" className="flex min-h-12 items-center gap-3 rounded-lg border border-primary-900/15 bg-white p-4 text-primary-900 hover:border-primary-600">
                <Mail className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Email</span>
                  <span className="mt-0.5 block break-all text-sm font-semibold">ben@sproutflow-studio.com</span>
                </span>
              </a>
              <a href="tel:+15043261676" className="flex min-h-12 items-center gap-3 rounded-lg border border-primary-900/15 bg-white p-4 text-primary-900 hover:border-primary-600">
                <Phone className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">Phone</span>
                  <span className="mt-0.5 block text-sm font-semibold">(504) 326-1676</span>
                </span>
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
