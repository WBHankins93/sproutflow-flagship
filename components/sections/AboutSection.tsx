import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="paper-grain bg-[#e5ebe2] py-20 md:py-28">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative aspect-[4/5] overflow-hidden border border-primary-900/20 bg-primary-100">
            <Image
              src="/images/ben-hankins-2026.png"
              alt="Ben Hankins, founder of Sproutflow Studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="absolute -bottom-5 -right-2 border border-primary-900/20 bg-[#f7f4ec] px-5 py-4 text-sm font-bold text-primary-900 md:-right-6">
            New Orleans based · Working nationwide
          </div>
        </div>

        <div className="lg:pl-8">
          <p className="eyebrow text-primary-700">Meet Ben</p>
          <h2 className="mt-5 max-w-[12ch] text-5xl text-primary-900 md:text-7xl">
            You will work with me, not a team you never meet.
          </h2>
          <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-text-secondary md:text-lg">
            <p>
              I’m Ben Hankins. I started Sproutflow after watching good New Orleans businesses lose work to competitors who were simply easier to find, trust, and buy from.
            </p>
            <p>
              The person on your first call is the person who writes the scope, shapes the pages, builds the site, and answers the phone after launch.
            </p>
            <p className="font-semibold text-primary-900">
              One point of contact. No sales handoff. No disappearing act.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 border-y border-primary-900/20">
            <div className="border-r border-primary-900/20 py-5 pr-5">
              <p className="font-body text-3xl font-bold text-primary-900">One</p>
              <p className="mt-1 text-xs text-text-muted">partner, strategy through launch</p>
            </div>
            <div className="py-5 pl-5">
              <p className="font-body text-3xl font-bold text-primary-900">Direct</p>
              <p className="mt-1 text-xs text-text-muted">access before and after launch</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
