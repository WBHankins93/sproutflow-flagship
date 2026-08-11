import Link from 'next/link';
import { ArrowRight, Check, Mail, Phone } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const nextSteps = [
  'A recommendation based on your goals and comfortable budget',
  'A realistic scope and timeline',
  'A fixed quote before any work begins',
];

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-background-secondary py-20 md:py-28">
      <Container>
        <div className="grid overflow-hidden rounded-xl border border-primary-900/20 bg-white lg:grid-cols-12">
          <div className="p-7 sm:p-10 lg:col-span-8 lg:p-14">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">Start a conversation</p>
            <h2 id="contact-heading" className="max-w-3xl font-display text-4xl font-semibold leading-[0.98] text-primary-900 sm:text-5xl lg:text-6xl">
              Tell us what needs to work better.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              You do not need a finished brief or the perfect terminology. Share the problem, your best guess at a comfortable investment, and what a good result would change for the business.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {nextSteps.map((step) => (
                <li key={step} className="flex items-start gap-2 border-t border-primary-900/15 pt-3 text-sm leading-relaxed text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-primary-600" aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <Link href="/inquiry" className="group mt-9 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-primary-800 px-7 py-3.5 font-semibold text-white hover:bg-primary-700">
              Share your project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <aside className="border-t border-primary-900/20 bg-primary-50 p-7 sm:p-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:p-10">
            <h3 className="font-display text-2xl font-semibold text-primary-900">Prefer a short note?</h3>
            <p className="mt-3 leading-relaxed text-text-secondary">Contact Ben directly. A sentence or two is enough to get started.</p>
            <div className="mt-8 space-y-3">
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
