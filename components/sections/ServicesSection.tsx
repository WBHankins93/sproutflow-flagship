import Link from 'next/link';
import { ArrowRight, Check, CornerDownRight } from 'lucide-react';

const websitePackages = [
  {
    name: 'Core',
    price: 'Starting at $2,000',
    line: 'A focused website built to turn attention into inquiries.',
    includes: ['Semi-custom design shaped to your goals', 'Content management system', 'SEO foundation and conversion tracking'],
    tone: 'light',
  },
  {
    name: 'Custom',
    price: 'Starting at $4,500',
    line: 'For sites that need original design, deeper content, or application features.',
    includes: ['Fully custom design and copy', 'Catalogs, integrations, and custom workflows', 'Custom motion and no preset ceiling'],
    tone: 'dark',
  },
];

const recurringPlans = [
  {
    name: 'Care',
    price: '$200/month',
    copy: 'Managed hosting, security updates, performance monitoring, and small content changes.',
  },
  {
    name: 'Growth',
    price: '$400/month',
    copy: 'Everything in Care, plus Google Business Profile management, review support, and ongoing SEO/GEO work.',
  },
];

export default function ServicesSection() {
  return (
    <section id="pricing" className="paper-grain bg-[#f7f4ec] py-20 md:py-28">
      <div className="mx-auto max-w-[90rem] px-5 md:px-8">
        <div className="grid gap-8 border-b border-primary-900/20 pb-10 md:grid-cols-[0.75fr_1.25fr] md:items-end">
          <div>
            <p className="eyebrow text-primary-700">Website pricing</p>
            <h2 className="mt-4 max-w-[10ch] text-5xl text-primary-900 md:text-7xl">A clear place to start.</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-text-secondary md:justify-self-end">
            The starting price sets the scope, not the final number. You approve a written scope, timeline, and fixed quote before work begins.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {websitePackages.map((tier) => (
            <article
              key={tier.name}
              className={`flex min-h-[410px] flex-col border p-7 md:p-10 ${
                tier.tone === 'dark'
                  ? 'border-primary-900 bg-primary-900 text-white'
                  : 'border-primary-900/25 bg-white text-primary-900'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className={`eyebrow ${tier.tone === 'dark' ? 'text-primary-200' : 'text-primary-700'}`}>{tier.name}</p>
                <p className={`text-sm font-bold ${tier.tone === 'dark' ? 'text-white/75' : 'text-text-secondary'}`}>{tier.price}</p>
              </div>
              <h3 className="mt-12 max-w-[16ch] text-4xl md:text-5xl">{tier.line}</h3>
              <ul className={`mt-8 space-y-3 text-sm ${tier.tone === 'dark' ? 'text-white/70' : 'text-text-secondary'}`}>
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/inquiry?package=${tier.name.toLowerCase()}`}
                className={`mt-auto inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-[0.35rem] px-6 py-3 font-bold ${
                  tier.tone === 'dark' ? 'bg-white text-primary-900' : 'bg-primary-900 text-white'
                }`}
              >
                Discuss {tier.name.toLowerCase()}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-5 grid border border-primary-900/20 bg-[#e5ebe2] lg:grid-cols-[0.8fr_1fr_1fr_auto] lg:items-center">
          <div className="border-b border-primary-900/15 p-6 lg:border-b-0 lg:border-r">
            <p className="eyebrow text-primary-700">Launch</p>
            <p className="mt-2 font-display text-3xl text-primary-900">$500 fixed</p>
            <p className="mt-1 text-xs font-semibold text-text-muted">Plus Care · 12-month minimum</p>
          </div>
          <div className="border-b border-primary-900/15 p-6 lg:border-b-0 lg:border-r">
            <p className="font-bold text-primary-900">Just need to be found online?</p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Up to three pages on a template foundation, using content you supply.
            </p>
          </div>
          <div className="border-b border-primary-900/15 p-6 text-sm leading-relaxed text-text-secondary lg:border-b-0 lg:border-r">
            Google Business Profile setup · 5–7 day turnaround · one revision round
          </div>
          <div className="p-5">
            <Link
              href="/launch"
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap font-bold text-primary-900 underline decoration-primary-500 underline-offset-4"
            >
              Start here
              <CornerDownRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-primary-700">After launch</p>
            <h3 className="mt-4 max-w-[11ch] text-4xl text-primary-900 md:text-5xl">Support with an actual price.</h3>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-text-secondary">
              Both plans have defined support time and written exclusions. Your domain, site, and accounts remain yours.
            </p>
          </div>
          <div className="border-t border-primary-900/20">
            {recurringPlans.map((plan) => (
              <div key={plan.name} className="grid gap-3 border-b border-primary-900/20 py-6 sm:grid-cols-[0.5fr_0.65fr_1.6fr]">
                <p className="font-bold text-primary-900">{plan.name}</p>
                <p className="font-body font-bold tabular-nums text-primary-700">{plan.price}</p>
                <p className="text-sm leading-relaxed text-text-secondary">{plan.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
