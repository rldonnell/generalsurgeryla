import Crumbs from '@/components/Crumbs';
import ConsultForm from '@/components/ConsultForm';
import JsonLd from '@/components/JsonLd';
import { fmt } from '@/components/Footer';
import { settings as s } from '@/lib/content';
import { breadcrumbs, IDS } from '@/lib/schema';

export const metadata = {
  title: 'Contact General Surgeon Dr. Babak Moein, MD in Los Angeles',
  description: 'Contact Dr. Babak Moein in Century City, Los Angeles to schedule a consultation for hernia, gallbladder, reflux or other general surgery. Call (310) 861-4093.',
  alternates: { canonical: '/contact-us/' },
};

export default function Contact() {
  return (
    <div className="wrap">
      <JsonLd data={{ '@context': 'https://schema.org', '@graph': [
        { '@type': 'ContactPage', '@id': `${s.baseUrl}/contact-us/#webpage`, url: `${s.baseUrl}/contact-us/`, name: metadata.title, about: { '@id': IDS.clinic }, isPartOf: { '@id': IDS.website } },
        breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact-us/' }]),
      ] }} />
      <header className="page-head">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Contact' }]} />
        <h1>Schedule a consultation</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: '1.15rem', maxWidth: '60ch', marginTop: '1rem' }}>
          Questions about hernia repair, gallbladder removal, reflux surgery, insurance, or pricing? Call the office or send a request and we will get back to you within one business day. In-person and video consultations are available.
        </p>
      </header>
      <div className="contact-grid" style={{ paddingBottom: '4rem' }}>
        <ConsultForm heading="Send a request" />
        <div>
          <address className="nap">
            <strong>{s.siteName}</strong>
            {s.street}<br />{s.city}, {s.region} {s.postalCode}<br />
            <a href={`tel:${s.phoneE164}`}>{s.phone}</a><br />
            <a href={`mailto:${s.email}`}>{s.email}</a>
          </address>
          <p style={{ marginTop: '1rem' }}>
            {s.hours.map((h) => <span key={h.label}>{h.label}: {fmt(h.opens)} to {fmt(h.closes)}<br /></span>)}
          </p>
          <iframe className="map" src={s.mapEmbed} title="Map to General Surgery LA in Century City" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  );
}
