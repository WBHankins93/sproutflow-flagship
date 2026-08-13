import { Check, FileText, KeyRound } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import StatRail from '@/components/ui/StatRail';
import { listedProjectProof } from '@/data/projectProof';

const proof = [
  {
    icon: Check,
    title: 'One person throughout',
    body: 'The person on the first call is the person shaping, building, and testing the work.',
  },
  {
    icon: FileText,
    title: 'Decisions before production',
    body: 'You see the direction, written scope, and fixed quote before the build begins.',
  },
  {
    icon: KeyRound,
    title: 'Ownership at handoff',
    body: 'Your domain, accounts, data, and finished work stay under your control.',
  },
];

export default function DifferenceSection() {
  return (
    <SectionShell index="01" label="the Sproutflow difference" variant="cream" labelledBy="difference-heading">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="difference-heading" className="font-display text-display-lg text-primary-900">
            Enterprise delivery habits,{' '}
            <span className="font-accent font-normal italic text-accent-700">small business economics.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-text-secondary">
            A small studio should feel close and clear without making the work fragile. The process stays lean; the
            standards do not.
          </p>
          <StatRail
            className="mt-10"
            stats={[
              { value: String(listedProjectProof.length), label: 'live builds' },
              { value: '4', label: 'clear checkpoints' },
              { value: '1', label: 'owner of the work' },
            ]}
          />
        </div>
        <div className="grid gap-px border border-primary-900/20 bg-primary-900/20 lg:col-span-5">
          {proof.map(({ icon: Icon, title, body }) => (
            <article key={title} className="bg-white p-6">
              <Icon className="h-5 w-5 text-accent-700" aria-hidden="true" />
              <h3 className="mt-5 font-display text-xl text-primary-900">{title}</h3>
              <p className="mt-3 text-text-secondary">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
