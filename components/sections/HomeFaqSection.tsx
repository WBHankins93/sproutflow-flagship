import Link from 'next/link';
import SectionShell from '@/components/ui/SectionShell';
import FaqAccordion from '@/components/ui/FaqAccordion';

const items = [
  {
    question: 'How do we decide what to build first?',
    answer:
      'We start with the customer, the operational bottleneck, and the smallest change that would make a useful difference.',
  },
  {
    question: 'Will I receive a fixed quote?',
    answer: 'Yes. You receive a written scope and fixed quote before production begins.',
  },
  {
    question: 'Who owns the finished work?',
    answer:
      'You own the domain, accounts, data, and finished work. The handoff includes documentation for the parts you need to manage.',
  },
];

export default function HomeFaqSection() {
  return (
    <SectionShell index="07" label="common questions" variant="cream" tone="raised" labelledBy="home-faq-heading">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="home-faq-heading" className="font-display text-display-sm text-primary-900">
            The practical details.
          </h2>
          <Link
            href="/faq"
            className="mt-6 inline-flex border-b border-primary-700 pb-1 font-semibold text-primary-800"
          >
            Read all questions
          </Link>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <FaqAccordion items={items} />
        </div>
      </div>
    </SectionShell>
  );
}
