'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Check, LockKeyhole } from 'lucide-react';

type LaunchData = {
  name: string;
  email: string;
  business: string;
  currentWebsite: string;
  pages: string;
  contentReady: boolean;
  carePlan: boolean;
};

const initialData: LaunchData = {
  name: '',
  email: '',
  business: '',
  currentWebsite: '',
  pages: '',
  contentReady: false,
  carePlan: false,
};

const inputClass = 'min-h-12 w-full rounded-[0.35rem] border border-primary-900/20 bg-white px-4 py-3 text-primary-900 placeholder:text-text-muted focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700/20';

export default function LaunchIntakeForm() {
  const [data, setData] = useState(initialData);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const submitGuard = useRef(false);

  const updateText = (field: keyof LaunchData) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitGuard.current) return;
    if (!data.name.trim() || !data.email.trim() || !data.business.trim() || !data.pages.trim()) {
      setMessage('Complete the required fields.');
      return;
    }
    if (!data.contentReady || !data.carePlan) {
      setMessage('Confirm the content and Care plan requirements to continue.');
      return;
    }
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;
    if (!formId) {
      setMessage('The form is unavailable right now. Email ben@sproutflow-studio.com instead.');
      return;
    }

    submitGuard.current = true;
    setSending(true);
    setMessage('');
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Launch website intake',
          product: 'Launch — $500 fixed + $200/month Care, 12-month minimum',
          name: data.name,
          email: data.email,
          business: data.business,
          current_website: data.currentWebsite,
          requested_pages: data.pages,
        }),
      });
      if (!response.ok) throw new Error('Failed');
      setSent(true);
    } catch {
      submitGuard.current = false;
      setSending(false);
      setMessage('The form did not send. Try again or email ben@sproutflow-studio.com.');
    }
  };

  if (sent) {
    return (
      <div className="border border-primary-900/20 bg-white p-7 md:p-10">
        <Check className="h-7 w-7 text-primary-700" />
        <h2 className="mt-5 text-4xl text-primary-900">Your Launch intake is in.</h2>
        <p className="mt-4 text-text-secondary">Ben will review your content and reply within one business day with the start date and payment link.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-primary-900/20 bg-white p-6 md:p-10" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-primary-900">
          Name *
          <input className={`${inputClass} mt-2`} value={data.name} onChange={updateText('name')} autoComplete="name" required />
        </label>
        <label className="text-sm font-semibold text-primary-900">
          Email *
          <input className={`${inputClass} mt-2`} type="email" value={data.email} onChange={updateText('email')} autoComplete="email" required />
        </label>
        <label className="text-sm font-semibold text-primary-900">
          Business name *
          <input className={`${inputClass} mt-2`} value={data.business} onChange={updateText('business')} autoComplete="organization" required />
        </label>
        <label className="text-sm font-semibold text-primary-900">
          Current website
          <input className={`${inputClass} mt-2`} type="url" value={data.currentWebsite} onChange={updateText('currentWebsite')} placeholder="https://" />
        </label>
      </div>
      <label className="mt-5 block text-sm font-semibold text-primary-900">
        What should the three pages cover? *
        <textarea className={`${inputClass} mt-2 min-h-32 resize-y`} value={data.pages} onChange={updateText('pages')} placeholder="Example: Home, Services, Contact" required />
      </label>
      <div className="mt-6 space-y-4 border-y border-primary-900/15 py-6">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
          <input
            type="checkbox"
            checked={data.contentReady}
            onChange={(event) => setData((current) => ({ ...current, contentReady: event.target.checked }))}
            className="mt-1 h-4 w-4 rounded border-primary-900/30 text-primary-700 focus:ring-primary-700"
          />
          I understand Launch uses text and photos I supply and includes one revision round.
        </label>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
          <input
            type="checkbox"
            checked={data.carePlan}
            onChange={(event) => setData((current) => ({ ...current, carePlan: event.target.checked }))}
            className="mt-1 h-4 w-4 rounded border-primary-900/30 text-primary-700 focus:ring-primary-700"
          />
          I understand the $500 setup requires the $200/month Care plan for 12 months.
        </label>
      </div>
      {message && <p className="mt-5 text-sm font-semibold text-red-800" role="alert">{message}</p>}
      <button
        type="submit"
        disabled={sending}
        className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-[0.35rem] bg-primary-900 px-6 py-3 font-bold text-white disabled:opacity-60"
      >
        {sending ? 'Sending…' : 'Send Launch intake'}
        {!sending && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-muted">
        <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        These details are used only to respond to this intake.
      </p>
    </form>
  );
}
