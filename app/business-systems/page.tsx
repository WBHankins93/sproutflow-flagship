import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Boxes, Check, Gauge, Link2, ShieldCheck, Workflow, X } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

const SCOPING_CALL_URL = 'https://calendar.app.google/hMkRd7yqsovDwZuL7';

export const metadata: Metadata = {
  title: 'Business Systems & Workflow Automation',
  description:
    'Internal tools, workflow automation, and multi-location platforms for teams running important work through spreadsheets, inboxes, and text messages.',
  alternates: { canonical: '/business-systems' },
};

const capabilities = [
  {
    icon: Gauge,
    title: 'Operating dashboards',
    copy: 'Bring jobs, customers, exceptions, and the numbers your team checks every day into one useful view.',
  },
  {
    icon: Workflow,
    title: 'Workflow automation',
    copy: 'Move intake, follow-up, scheduling, missed-call response, and document work forward without another manual handoff.',
  },
  {
    icon: Boxes,
    title: 'Multi-location platforms',
    copy: 'Give each location the right configuration and access while the central team keeps a shared operating picture.',
  },
  {
    icon: Link2,
    title: 'AI inside the workflow',
    copy: 'Use models for a defined job—sorting requests, drafting replies, extracting details—not as a vague consulting add-on.',
  },
];

const engagementShape = [
  ['Platform build', 'One-time', 'The shared system, integrations, roles, and reporting.'],
  ['Location setup', 'One-time per location', 'Configuration, data, training, and rollout support, priced by volume.'],
  ['Support & hosting', 'Monthly per location', 'Infrastructure, monitoring, updates, and a defined support agreement.'],
];

const process = [
  ['Operational audit', 'Map the actual work, exceptions, owners, and systems already in place.'],
  ['Architecture', 'Define a phased plan and the smallest pilot that can prove the model.'],
  ['Pilot location', 'Run the system with a limited group and fix what real use exposes.'],
  ['Rollout', 'Move location by location with training, checks, and clear ownership.'],
  ['Ongoing support', 'Monitor the system, handle updates, and improve it as the operation changes.'],
];

export default function BusinessSystemsPage() {
  return (
    <>
      <section className="paper-grain border-b border-primary-900/15 bg-[#f7f4ec]">
        <div className="mx-auto grid min-h-[650px] max-w-[90rem] items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="eyebrow text-primary-700">Business systems</p>
            <h1 className="mt-6 max-w-[12ch] text-[clamp(3.4rem,7vw,7.2rem)] leading-[0.9] text-primary-900">
              The lead came in. Everything after that is still <em className="text-primary-600">manual.</em>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              Sproutflow builds the operating layer between your website and the work your team is still moving through spreadsheets, inboxes, and text messages.
            </p>
            <a
              href={SCOPING_CALL_URL}
              className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-[0.35rem] bg-primary-900 px-6 py-3 font-bold text-white"
            >
              Book a scoping call
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="border border-primary-900/20 bg-white p-5 shadow-[16px_18px_0_rgba(40,69,47,0.12)] md:p-8">
            <div className="flex items-center justify-between border-b border-primary-900/15 pb-4">
              <p className="eyebrow text-primary-700">Operations layer</p>
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-bold text-primary-800">Live demo</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-7">
              {['Location 01', 'Location 18', 'Location 64'].map((location) => (
                <div key={location} className="border border-primary-900/15 bg-[#f7f4ec] p-3 text-center text-[0.65rem] font-bold text-primary-800">
                  {location}
                </div>
              ))}
            </div>
            <div className="relative border border-primary-900 bg-primary-900 px-5 py-8 text-center text-white">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 text-xs font-bold text-primary-900">Shared platform</div>
              <p className="font-display text-3xl">One operating picture</p>
              <div className="mt-5 grid grid-cols-3 gap-2 text-[0.65rem] text-white/65">
                <span>Jobs</span><span>Customers</span><span>Exceptions</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-7">
              {['Existing POS', 'Email & SMS', 'Accounting'].map((system) => (
                <div key={system} className="border border-primary-900/15 p-3 text-center text-[0.65rem] font-bold text-text-secondary">
                  {system}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-[90rem] px-5 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="eyebrow text-primary-200">Working product demo</p>
              <p className="mt-7 font-body text-[clamp(5rem,12vw,10rem)] font-bold leading-none tabular-nums text-primary-200">64</p>
              <h2 className="mt-3 max-w-[10ch] text-4xl md:text-6xl">locations. One shared system.</h2>
            </div>
            <div className="border-t border-white/20">
              {[
                ['The problem', 'A central operator needs visibility across dozens of locations without forcing every team to abandon the tools they already use.'],
                ['The approach', 'A multi-tenant platform connects to existing systems, separates location data, and gives central operators a consistent view.'],
                ['The rollout', 'Per-location configuration supports a pilot-first rollout instead of a risky all-at-once switch.'],
                ['What is proven', 'The platform is built and available to demonstrate live. Commercial rollout to a paying franchise client is not claimed.'],
              ].map(([label, copy]) => (
                <div key={label} className="grid gap-3 border-b border-white/20 py-6 sm:grid-cols-[0.65fr_1.35fr]">
                  <h3 className="font-body text-base font-bold tracking-normal text-white">{label}</h3>
                  <p className="text-sm leading-relaxed text-white/60">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[90rem] px-5 md:px-8">
          <p className="eyebrow text-primary-700">What we build</p>
          <h2 className="mt-5 max-w-[13ch] text-5xl text-primary-900 md:text-7xl">Less chasing. Better visibility.</h2>
          <div className="mt-12 grid border-l border-t border-primary-900/20 md:grid-cols-2">
            {capabilities.map((item) => (
              <article key={item.title} className="border-b border-r border-primary-900/20 p-7 md:p-10">
                <item.icon className="h-6 w-6 text-primary-700" />
                <h3 className="mt-12 text-3xl text-primary-900">{item.title}</h3>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-secondary">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="paper-grain bg-[#e5ebe2] py-20 md:py-28">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 md:px-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-primary-700">How cost is structured</p>
            <h2 className="mt-5 max-w-[10ch] text-5xl text-primary-900 md:text-6xl">A model that scales predictably.</h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-text-secondary">
              Exact numbers follow a scoping call. The shape of the engagement does not change.
            </p>
          </div>
          <div className="border-t border-primary-900/20">
            {engagementShape.map(([name, cadence, copy]) => (
              <div key={name} className="grid gap-3 border-b border-primary-900/20 py-6 sm:grid-cols-[0.75fr_0.7fr_1.4fr]">
                <p className="font-bold text-primary-900">{name}</p>
                <p className="text-sm font-semibold text-primary-700">{cadence}</p>
                <p className="text-sm leading-relaxed text-text-secondary">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ec] py-20 md:py-28">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div className="border border-primary-900/20 bg-white p-7 md:p-10">
            <Check className="h-6 w-6 text-primary-700" />
            <h2 className="mt-8 text-4xl text-primary-900 md:text-5xl">This is a fit when…</h2>
            <ul className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary">
              <li>Several people or locations repeat the same manual work.</li>
              <li>The cost of missed follow-up or poor visibility is material.</li>
              <li>Your current tools are close, but the gaps keep creating workarounds.</li>
              <li>You can assign an internal owner for decisions and rollout.</li>
            </ul>
          </div>
          <div className="border border-primary-900/20 bg-primary-900 p-7 text-white md:p-10">
            <X className="h-6 w-6 text-primary-200" />
            <h2 className="mt-8 text-4xl md:text-5xl">Use off-the-shelf software when…</h2>
            <ul className="mt-8 space-y-4 text-sm leading-relaxed text-white/65">
              <li>One person can solve the problem with a standard tool and a cleaner process.</li>
              <li>The workflow changes every week and no one owns the decision.</li>
              <li>The main requirement is copying a large established product for a smaller price.</li>
              <li>There is no budget for implementation, training, and ongoing support.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 md:px-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <ShieldCheck className="h-8 w-8 text-primary-700" />
            <p className="eyebrow mt-6 text-primary-700">Engineering credibility</p>
            <h2 className="mt-5 max-w-[10ch] text-5xl text-primary-900 md:text-6xl">Built with production discipline.</h2>
          </div>
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              Ben spent four years at IBM working on enterprise cloud systems, followed by site reliability work with responsibility for production uptime and SOC 2 readiness.
            </p>
            <p>
              That background shows up in plain decisions: managed infrastructure, documented ownership, least-privilege access, monitoring, tested rollouts, and a system that does not depend on one laptop staying alive.
            </p>
            <p className="font-semibold text-primary-900">
              You own the product. Critical infrastructure runs on maintained vendors. Support and continuity are written into the engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="paper-grain bg-[#e5ebe2] py-20 md:py-28">
        <div className="mx-auto max-w-[90rem] px-5 md:px-8">
          <p className="eyebrow text-primary-700">Engagement process</p>
          <h2 className="mt-5 max-w-[12ch] text-5xl text-primary-900 md:text-7xl">Pilot before rollout.</h2>
          <div className="mt-12 border-t border-primary-900/20">
            {process.map(([name, copy], index) => (
              <div key={name} className="grid gap-3 border-b border-primary-900/20 py-6 sm:grid-cols-[4rem_0.75fr_1.5fr]">
                <span className="font-body text-sm font-bold tabular-nums text-primary-600">0{index + 1}</span>
                <h3 className="font-body text-lg font-bold tracking-normal text-primary-900">{name}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-900 py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
          <p className="eyebrow text-primary-200">Start with the operation</p>
          <h2 className="mt-6 text-5xl md:text-7xl">Show Ben where the work gets stuck.</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
            A scoping call is for mapping the problem and deciding whether custom software is the right answer.
          </p>
          <a
            href={SCOPING_CALL_URL}
            className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-[0.35rem] bg-white px-6 py-3 font-bold text-primary-900"
          >
            Book a scoping call
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
