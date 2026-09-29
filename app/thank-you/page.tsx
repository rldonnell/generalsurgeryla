import Link from 'next/link';
import { settings as s } from '@/lib/content';

export const metadata = { title: 'Thank you | General Surgery LA', robots: { index: false, follow: false } };

export default function Thanks() {
  return (
    <div className="wrap" style={{ padding: '5rem var(--gutter)', maxWidth: 720 }}>
      <h1>We have your request.</h1>
      <p style={{ fontSize: '1.15rem', color: 'var(--ink-soft)', marginTop: '1rem' }}>
        Our team will call or email you within one business day. If you would rather talk now, call <a href={`tel:${s.phoneE164}`}>{s.phone}</a>.
      </p>
      <p><Link href="/">Back to the home page</Link></p>
    </div>
  );
}
