export interface Question {
  question: string;
  answer?: string;
}

const FOCUS =
  'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-redline';

/**
 * Questions as native disclosures. Every answer stays in the HTML (closed
 * details are still in the document), so FAQPage structured data built from
 * the same items always matches what a visitor can open. Light canvases only.
 */
export default function QuestionList({ items, className = '' }: { items: Question[]; className?: string }) {
  return (
    <div className={`border-t border-primary-900/20 ${className}`}>
      {items.map((item) => (
        <details key={item.question} className="group border-b border-primary-900/20" data-question>
          <summary
            className={`flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 font-body text-body-lg font-semibold leading-snug text-primary-900 ${FOCUS} [&::-webkit-details-marker]:hidden`}
          >
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-primary-900/30 font-mono text-body transition-transform group-open:rotate-45 motion-reduce:transition-none"
            >
              +
            </span>
          </summary>
          {item.answer && <p className="max-w-[62ch] pb-6 pr-2 font-body text-body text-[#4A574D] md:pr-12">{item.answer}</p>}
        </details>
      ))}
    </div>
  );
}
