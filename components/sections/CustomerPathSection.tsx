import { ArrowDown, BellRing, ClipboardList, MousePointerClick, Send, UserRoundCheck } from 'lucide-react';
import { Container } from '../layout/StudioLayout';

const frictionPoints = [
  {
    icon: MousePointerClick,
    title: 'A visitor lands on the site',
    text: 'They cannot quickly tell what you do or why your business is the right fit.',
  },
  {
    icon: ClipboardList,
    title: 'The next step feels like work',
    text: 'The form asks too much, the service choices are vague, or the booking path breaks.',
  },
  {
    icon: BellRing,
    title: 'Follow-up depends on memory',
    text: 'A good lead waits in an inbox while the team handles the work already on the calendar.',
  },
];

const betterPath = [
  { icon: MousePointerClick, label: 'Understand the offer' },
  { icon: Send, label: 'Take one clear next step' },
  { icon: UserRoundCheck, label: 'Get a useful response' },
];

export default function CustomerPathSection() {
  return (
    <section aria-labelledby="customer-path-heading" className="bg-primary-950 py-20 text-white md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-300">Where leads get stuck</p>
            <h2 id="customer-path-heading" className="font-display text-4xl font-semibold leading-[0.98] text-white sm:text-5xl">
              A good business can still be hard to buy from.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
              Usually there is no single broken tool. The trouble lives in the handoffs between the website, the form, and the person who needs to reply.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="grid gap-3">
              {frictionPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <li key={point.title} className="grid grid-cols-[3rem_1fr] gap-4 border border-white/15 p-5 sm:grid-cols-[3rem_13rem_1fr] sm:items-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-accent-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-white">
                      <span className="mr-2 text-sm text-white/45" aria-hidden="true">0{index + 1}</span>
                      {point.title}
                    </h3>
                    <p className="col-start-2 leading-relaxed text-white/65 sm:col-start-3">{point.text}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-7 border-t border-white/20 pt-7">
              <p className="mb-5 font-display text-2xl font-semibold text-white">What should happen instead</p>
              <ol className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                {betterPath.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.label} className="contents">
                      <div className="flex min-h-20 items-center gap-3 bg-white p-4 text-primary-950">
                        <Icon className="h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
                        <span className="text-sm font-semibold leading-snug">{step.label}</span>
                      </div>
                      {index < betterPath.length - 1 && (
                        <ArrowDown className="mx-auto h-4 w-4 text-accent-300 sm:-rotate-90" aria-hidden="true" />
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
