import { Eyebrow, Heading, Section } from '@/components/v3';
import { homeCheck } from '@/data/home';
import { CHECK_LABELS, CHECK_ORDER } from '@/lib/website-check/messages';

/** The check page reads ?url= and prefills its field (the `chrome` worker owns /check). */
export const CHECK_ACTION = '/check';

/**
 * 4. Website check teaser. A plain GET form, so it works without JavaScript:
 * submitting navigates to /check?url=<value>. The list follows the checker's
 * own labels and order.
 */
export default function CheckTeaser() {
  const checks = CHECK_ORDER.map((id) => ({ id, label: CHECK_LABELS[id], detail: homeCheck.details[id] }));

  return (
    <Section tone="paper" rhythm="none" id="check" labelledBy="home-check-h" className="py-8 md:py-[var(--v3-rhythm-tight)]">
      <div className="grid gap-6 md:gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow index="01">{homeCheck.eyebrow}</Eyebrow>
          <Heading as="h2" id="home-check-h" className="mt-4">
            {homeCheck.heading}
          </Heading>
          <p className="mt-3 max-w-[52ch] font-body text-body text-[#4A574D] md:mt-4 md:text-body-lg">{homeCheck.sub}</p>

          <form action={CHECK_ACTION} method="get" className="mt-5 md:mt-8" aria-labelledby="home-check-h">
            <label htmlFor="home-check-url" className="block font-body text-body font-semibold text-primary-900">
              {homeCheck.inputLabel}
            </label>
            <div className="mt-2 flex flex-row gap-2 sm:gap-3">
              <input
                id="home-check-url"
                name="url"
                type="text"
                inputMode="url"
                autoComplete="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                placeholder={homeCheck.placeholder}
                aria-describedby="home-check-fine"
                className="min-h-[48px] w-full min-w-0 flex-1 rounded-full border-2 border-primary-900/60 bg-white px-4 sm:px-5 font-body text-base text-primary-900 placeholder:text-[#4A574D] focus-visible:border-primary-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline"
              />
              <button
                type="submit"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full border-2 border-primary-900 bg-primary-900 px-4 py-2 sm:px-6 font-body text-base font-semibold leading-tight text-cream-300 transition-colors duration-150 hover:border-primary-800 hover:bg-primary-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline"
              >
                {homeCheck.button}
              </button>
            </div>
            <p id="home-check-fine" className="mt-3 font-body text-body-sm text-[#4A574D]">
              {homeCheck.fine}
            </p>
          </form>
        </div>

        <div className="min-w-0 lg:col-span-6">
          <h3 className="font-mono text-label uppercase text-[#4A574D] [font-variant-ligatures:none]">
            {homeCheck.listHeading}
          </h3>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 md:mt-4 md:gap-x-8 md:gap-y-4">
            {checks.map((check) => (
              <li key={check.id} className="min-w-0 md:border-t md:border-primary-900/15 md:pt-3">
                <p className="flex items-baseline gap-2 font-body text-body-sm font-semibold text-primary-900 md:text-body">
                  <span aria-hidden="true" className="text-ink-700 md:hidden">
                    +
                  </span>
                  {check.label}
                </p>
                {check.detail && <p className="hidden font-body text-body-sm text-[#4A574D] md:block">{check.detail}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
