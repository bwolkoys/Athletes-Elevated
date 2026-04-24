'use client';

import { useState } from 'react';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function NewsletterForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', interest: '', message: ''
  });
  const [status, setStatus] = useState<null | 'loading' | 'success' | 'error'>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '', interest: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-10 rounded border border-[#69aaf6]/30 bg-[#f5f8ff] px-8 py-10 text-center">
        <p className="text-[22px] font-semibold text-[#122863]">You&apos;re on the list! 🎉</p>
        <p className="mt-2 text-sm text-[#64748b]">We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <div className={`${dmSans.className} mt-10 flex flex-col gap-4`}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          placeholder="First name"
          value={form.firstName}
          onChange={set('firstName')}
          className="w-full rounded border border-[#122863]/12 bg-[#f5f8ff] px-4.5 py-3.5 text-sm outline-none transition focus:border-[#69aaf6] focus:bg-white"
        />
        <input
          placeholder="Last name"
          value={form.lastName}
          onChange={set('lastName')}
          className="w-full rounded border border-[#122863]/12 bg-[#f5f8ff] px-4.5 py-3.5 text-sm outline-none transition focus:border-[#69aaf6] focus:bg-white"
        />
      </div>
      <input
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={set('email')}
        className="w-full rounded border border-[#122863]/12 bg-[#f5f8ff] px-4.5 py-3.5 text-sm outline-none transition focus:border-[#69aaf6] focus:bg-white"
      />
      <select
        value={form.interest}
        onChange={set('interest')}
        className="w-full cursor-pointer appearance-none rounded border border-[#122863]/12 bg-[#f5f8ff] px-4.5 py-3.5 text-sm outline-none transition focus:border-[#69aaf6]"
      >
        <option value="">I&apos;m interested in...</option>
        <option>Athlete updates</option>
        <option>Brand partnerships</option>
        <option>Community impact</option>
        <option>General updates</option>
      </select>
      <textarea
        placeholder="Tell us a bit more"
        value={form.message}
        onChange={set('message')}
        className="min-h-27.5 w-full resize-y rounded border border-[#122863]/12 bg-[#f5f8ff] px-4.5 py-3.5 text-sm outline-none transition focus:border-[#69aaf6]"
      />
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        className="self-start rounded bg-[#69aaf6] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0d1e4a] transition hover:-translate-y-0.5 hover:bg-[#a8ccf8] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Submitting...' : 'Join The List'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-500">Something went wrong — please try again.</p>
      )}
    </div>
  );
}