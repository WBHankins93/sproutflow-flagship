'use client';

import { useState } from 'react';
import Link from 'next/link';
import { servicePaths } from '@/data/servicePaths';
import ArrowDisc from '@/components/ui/ArrowDisc';
import Pill from '@/components/ui/Pill';
import ServiceMedia from './ServiceMedia';

export default function ServicesAccordion() {
  const [openId, setOpenId] = useState(servicePaths[0].id);

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-7">
        {servicePaths.map((path, index) => {
          const open = path.id === openId;
          const panelId = `service-panel-${path.id}`;
          return (
            <article key={path.id} className="border-t border-white/20">
              <button
                type="button"
                onClick={() => setOpenId(path.id)}
                aria-expanded={open}
                aria-controls={panelId}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-6 text-left md:gap-7 md:py-8"
              >
                <span className="font-mono text-mono-meta text-accent-300">0{index + 1}</span>
                <span>
                  <span className="block text-eyebrow uppercase text-white/55">{path.eyebrow}</span>
                  <span className="mt-1 block font-display text-display-md text-cream-300">{path.title}</span>
                </span>
                <ArrowDisc open={open} variant="ink" />
              </button>
              <div id={panelId} hidden={!open} className="pb-9 pl-0 md:pl-12">
                <div className="mb-6 lg:hidden">
                  <ServiceMedia path={path.id} height={300} />
                </div>
                <p className="max-w-2xl text-body-lg text-white/[0.72]">{path.outcome}</p>
                <p className="mt-4 max-w-2xl text-white/60">{path.goodFit}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {path.capabilities.map((capability) => (
                    <Pill key={capability} variant="ink">
                      {capability}
                    </Pill>
                  ))}
                </div>
                <Link
                  href={`/services/${path.id}`}
                  className="mt-7 inline-flex min-h-11 items-center border-b border-accent-400 pb-1 font-semibold text-white"
                >
                  Explore {path.eyebrow.toLowerCase()}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-32">
          <ServiceMedia path={openId} height={430} />
        </div>
      </div>
    </div>
  );
}
