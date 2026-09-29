import Link from 'next/link';
import { getProcedures, settings as s } from '@/lib/content';
import { patientCare } from './Header';

export default function Footer() {
  const procs = getProcedures();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">{s.siteName}</div>
            <address className="nap" style={{ marginTop: '.75rem' }}>
              {s.street}<br />
              {s.city}, {s.region} {s.postalCode}<br />
              <a href={`tel:${s.phoneE164}`}>{s.phone}</a><br />
              <a href={`mailto:${s.email}`}>{s.email}</a>
            </address>
            <p style={{ marginTop: '.75rem' }}>
              {s.hours.map((h) => (
                <span key={h.label}>{h.label}: {fmt(h.opens)} to {fmt(h.closes)}<br /></span>
              ))}
            </p>
          </div>
          <div>
            <h2>Procedures</h2>
            <ul>{procs.map((p) => <li key={p.slug}><Link href={`/${p.slug}/`}>{p.navLabel}</Link></li>)}</ul>
          </div>
          <div>
            <h2>Patient care</h2>
            <ul>{patientCare.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2>Practice</h2>
            <ul>
              <li><Link href="/general-surgeon-dr-babak-moein/">About Dr. Moein</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
              <li><Link href="/contact-us/">Contact</Link></li>
              {s.social.map((x) => <li key={x.url}><a href={x.url} rel="noopener me" target="_blank">{x.name}</a></li>)}
            </ul>
          </div>
        </div>
        <p className="disclaimer">
          The information on this website is for general education and is not medical advice. Every patient is different, and results vary. If you think you have a surgical emergency, such as severe abdominal pain, a hernia that has become hard or painful and will not go back in, or signs of appendicitis, call 911 or go to the nearest emergency room.
        </p>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} {s.siteName}. All rights reserved.</span>
          <span><Link href="/privacy-policy/">Privacy policy</Link> &nbsp; <Link href="/terms-of-service/">Terms of service</Link></span>
        </div>
      </div>
    </footer>
  );
}

export function fmt(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${ap}`;
}
