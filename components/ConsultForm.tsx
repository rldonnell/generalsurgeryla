'use client';
import { useState } from 'react';

export default function ConsultForm({ heading = 'Request a consultation', headingLevel = 2 }: { heading?: string; headingLevel?: 2 | 3 }) {
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const H = `h${headingLevel}` as 'h2' | 'h3';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const f = new FormData(e.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const body = {
      firstName: f.get('firstName'),
      lastName: f.get('lastName'),
      email: f.get('email'),
      phone: f.get('phone'),
      message: f.get('message'),
      company: f.get('company'), // honeypot
      page: window.location.href,
      referrer: document.referrer || 'direct',
      utm_source: params.get('utm_source') || 'direct',
      utm_medium: params.get('utm_medium') || 'none',
      utm_campaign: params.get('utm_campaign') || 'none',
    };
    try {
      const res = await fetch('/api/lead/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed');
      window.location.href = '/thank-you/';
    } catch (err) {
      setState('error');
      setMsg('Your request did not go through. Please call the office, or try again in a minute.');
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} id="request" style={{ position: 'relative' }}>
      <H>{heading}</H>
      <p className="note">We reply within one business day. Please keep medical details brief; we will go over everything at your visit.</p>
      <div className="row">
        <div><label htmlFor="firstName">First name</label><input id="firstName" name="firstName" autoComplete="given-name" required /></div>
        <div><label htmlFor="lastName">Last name</label><input id="lastName" name="lastName" autoComplete="family-name" required /></div>
      </div>
      <div className="row">
        <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
        <div><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" required /></div>
      </div>
      <label htmlFor="message">What would you like help with?</label>
      <textarea id="message" name="message" placeholder="For example: a bulge in my groin, or gallbladder pain after meals" />
      <div className="hp" aria-hidden="true"><label htmlFor="company">Company</label><input id="company" name="company" tabIndex={-1} autoComplete="off" /></div>
      <button className="btn btn-marker" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending request' : 'Send request'}
      </button>
      {state === 'error' && <p className="error" role="alert">{msg}</p>}
    </form>
  );
}
