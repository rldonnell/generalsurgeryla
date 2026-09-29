import Crumbs from '@/components/Crumbs';
import { settings as s } from '@/lib/content';

export const metadata = { title: 'Terms of Service | General Surgery LA', description: 'Terms for using the General Surgery LA website.', alternates: { canonical: '/terms-of-service/' } };

export default function Terms() {
  return (
    <div className="wrap" style={{ paddingBottom: '4rem' }}>
      <header className="page-head"><Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Terms of service' }]} /><h1>Terms of service</h1></header>
      <div className="prose">
        <p>Last updated September 29, 2026.</p>
        <h2 id="not-medical-advice">Not medical advice</h2>
        <p>Content on this website is general information about surgical conditions and procedures. It is not medical advice and does not create a doctor and patient relationship. Decisions about your care should be made with a qualified physician who has examined you. Results vary from patient to patient.</p>
        <h2 id="emergencies">Emergencies</h2>
        <p>Do not use this website or its forms for emergencies. If you have severe pain, fever with abdominal pain, or a hernia that has become hard or painful and will not go back in, call 911 or go to the nearest emergency room.</p>
        <h2 id="use-of-content">Use of content</h2>
        <p>Text, images and video on this site belong to {s.siteName} or are used with permission. You may share links to our pages but may not copy content for commercial use without written permission.</p>
        <h2 id="links">Links to other sites</h2>
        <p>We are not responsible for the content or privacy practices of websites we link to.</p>
        <h2 id="contact">Contact</h2>
        <p>Questions about these terms can be sent to <a href={`mailto:${s.email}`}>{s.email}</a>.</p>
      </div>
    </div>
  );
}
