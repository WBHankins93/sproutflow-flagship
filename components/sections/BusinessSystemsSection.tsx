import Link from 'next/link';
import { ArrowRight, Boxes, Gauge, Workflow } from 'lucide-react';

const capabilities = [
  { icon: Gauge, title: 'See the work', copy: 'Dashboards that put jobs, customers, and operating numbers in one place.' },
  { icon: Workflow, title: 'Move it forward', copy: 'Automated intake, follow-up, scheduling, and document work.' },
  { icon: Boxes, title: 'Run every location', copy: 'Shared platforms with the right configuration and access for each location.' },
];

export default function BusinessSystemsSection() {
  return (
    <section className="bg-primary-900 text-white">
      <div className="border-b border-white/15">
        <div className="mx-auto max-w-[90rem] px-5 py-16 md:px-8 md:py-24">
          <p className="eyebrow text-primary-200">Behind the website</p>
          <h2 className="mt-6 max-w-[17ch] text-5xl leading-[0.98] md:text-7xl">
            When the website works, make the business behind it work <em className="text-primary-200">better.</em>
          </h2>
        </div>
      </div>

      <div className="mx-auto grid max-w-[90rem] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-white/15 p-6 md:p-10 lg:border-b-0 lg:border-r">
          <p className="eyebrow text-white/45">Working product demo</p>
          <p className="mt-5 font-body text-7xl font-bold tabular-nums text-primary-200 md:text-8xl">64</p>
          <p className="mt-2 max-w-sm font-display text-3xl leading-tight">locations designed to operate through one platform.</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
            Built around a real franchise operations problem, ready to demonstrate live, and designed to connect with existing systems rather than replace everything at once.
          </p>
        </div>

        <div>
          {capabilities.map((item) => (
            <div key={item.title} className="grid gap-4 border-b border-white/15 p-6 last:border-b-0 sm:grid-cols-[auto_0.7fr_1.3fr] sm:items-center md:p-8">
              <item.icon className="h-5 w-5 text-primary-200" />
              <h3 className="font-body text-lg font-bold tracking-normal">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/60">{item.copy}</p>
            </div>
          ))}
          <div className="border-t border-white/15 p-6 md:p-8">
            <Link
              href="/business-systems"
              className="inline-flex min-h-12 items-center gap-2 rounded-[0.35rem] bg-white px-6 py-3 font-bold text-primary-900"
            >
              Explore business systems
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
