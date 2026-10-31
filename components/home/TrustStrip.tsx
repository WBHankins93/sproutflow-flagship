import { Section } from '@/components/v3';
import { homeTrust } from '@/data/home';

/** 2. Trust strip: three promises and where Ben is based. Fern, so every colour is Birch (5.38:1); no red. */
export default function TrustStrip() {
  return (
    <Section tone="fern" rhythm="none" id="promises" ariaLabel={homeTrust.label} className="py-8 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-4 lg:items-start lg:gap-8">
      <ul className="grid gap-5 sm:grid-cols-3 sm:gap-8 lg:col-span-3">
        {homeTrust.promises.map((promise, index) => (
          <li key={promise.title} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-[0.2rem] font-mono text-label tabular-nums text-cream-300 [font-variant-ligatures:none]"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="font-body text-body text-cream-300">
              <strong className="font-semibold">{promise.title}.</strong>{' '}
              <span>{promise.body}</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="border-t border-cream-300/20 pt-4 font-body text-body text-cream-300 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
        {homeTrust.location}
      </p>
      </div>
    </Section>
  );
}
