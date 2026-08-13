'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer?: string;
}

export default function FaqAccordion({ items, variant = 'cream' }: { items: FaqItem[]; variant?: 'cream' | 'ink' }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const dark = variant === 'ink';

  return (
    <div className={dark ? 'border-t border-white/20' : 'border-t border-primary-900/20'}>
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.question} className={dark ? 'border-b border-white/20' : 'border-b border-primary-900/20'}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="grid min-h-16 w-full grid-cols-[1fr_44px] items-center gap-5 py-4 text-left"
            >
              <span className={`font-display text-xl ${dark ? 'text-cream-300' : 'text-primary-900'}`}>
                {item.question}
              </span>
              <span className="flex h-11 w-11 items-center justify-center" aria-hidden="true">
                {open ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              </span>
            </button>
            {open && (
              <div className={`max-w-3xl pb-6 pr-14 leading-relaxed ${dark ? 'text-white/65' : 'text-text-secondary'}`}>
                {item.answer || <p className="italic">Answer copy is ready for your review.</p>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
