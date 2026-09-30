import Link from 'next/link';
import { getProcedures, settings as s } from '@/lib/content';

export const patientCare = [
  { href: '/pre-and-post-instructions/', label: 'Before and after surgery' },
  { href: '/general-surgery-insurance/', label: 'Insurance' },
  { href: '/general-surgery-financing/', label: 'Financing' },
  { href: '/frequently-asked-question/', label: 'Frequently asked questions' },
];

export default function Header() {
  const procs = getProcedures();
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label={`${s.siteName} home`}>
          <span className="brand-name">{s.siteName}</span>
          <span className="brand-sub">{s.doctor.name}, {s.doctor.credentials}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <details>
            <summary>Procedures</summary>
            <div className="menu">
              {procs.map((p) => (
                <Link key={p.slug} href={`/${p.slug}/`}>{p.navLabel}</Link>
              ))}
            </div>
          </details>
          <details>
            <summary>Patient care</summary>
            <div className="menu">
              {patientCare.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </details>
          <Link href="/general-surgeon-dr-babak-moein/">About Dr. Moein</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/contact-us/">Contact</Link>
        </nav>
        <a className="btn btn-marker header-call" href={`tel:${s.phoneE164}`}>
          Call <span className="num">{s.phone}</span>
        </a>
        <details className="menu-toggle">
          <summary>Menu</summary>
          <div className="mobile-menu">
            <p className="menu-title">Procedures</p>
            {procs.map((p) => (
              <Link key={p.slug} href={`/${p.slug}/`}>{p.navLabel}</Link>
            ))}
            <p className="menu-title">Patient care</p>
            {patientCare.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
            <p className="menu-title">Practice</p>
            <Link href="/general-surgeon-dr-babak-moein/">About Dr. Moein</Link>
            <Link href="/blog/">Blog</Link>
            <Link href="/contact-us/">Contact</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
