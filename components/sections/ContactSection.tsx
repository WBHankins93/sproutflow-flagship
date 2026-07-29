import Link from 'next/link';
import { ArrowRight, Check, Mail, Phone } from 'lucide-react';

const outcomes = ['A recommendation tied to your goals and budget', 'A realistic scope and timeline', 'A fixed quote before work begins'];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#f7f4ec] py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="grid overflow-hidden border border-primary-900/20 bg-white lg:grid-cols-[1.25fr_0.75fr]">
          <div className="p-7 md:p-12 lg:p-16">
            <p className="eyebrow text-primary-700">Start a project</p>
            <h2 className="mt-5 max-w-[11ch] text-5xl text-primary-900 md:text-7xl">Tell me what you want to improve.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
              Share the basics in about five minutes. I’ll reply within one business day with the clearest next step.
            </p>
            <ul className="mt-8 grid gap-3">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-700" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/inquiry"
              className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-[0.35rem] bg-primary-900 px-6 py-3 font-bold text-white"
            >
              Tell us about your project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <aside className="flex flex-col justify-between border-t border-primary-900/20 bg-[#e5ebe2] p-7 md:p-10 lg:border-l lg:border-t-0">
            <div>
              <p className="eyebrow text-primary-700">Not ready for the brief?</p>
              <h3 className="mt-4 text-3xl text-primary-900">A short note is enough.</h3>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Tell Ben what is not working. You do not need a finished plan or the right technical language.
              </p>
            </div>
            <div className="mt-10 border-t border-primary-900/20">
              <a href="mailto:ben@sproutflow-studio.com" className="flex min-h-14 items-center gap-3 border-b border-primary-900/20 text-sm font-bold text-primary-900">
                <Mail className="h-4 w-4" />
                ben@sproutflow-studio.com
              </a>
              <a href="tel:+15043261676" className="flex min-h-14 items-center gap-3 border-b border-primary-900/20 text-sm font-bold text-primary-900">
                <Phone className="h-4 w-4" />
                (504) 326-1676
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
