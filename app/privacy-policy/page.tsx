import Crumbs from '@/components/Crumbs';
import { settings as s } from '@/lib/content';

export const metadata = { title: 'Privacy Policy | General Surgery LA', description: 'How General Surgery LA collects, uses and protects information submitted through this website.', alternates: { canonical: '/privacy-policy/' } };

export default function Privacy() {
  return (
    <div className="wrap" style={{ paddingBottom: '4rem' }}>
      <header className="page-head"><Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Privacy policy' }]} /><h1>Privacy policy</h1></header>
      <div className="prose">
        <p>Last updated September 29, 2026.</p>
        <p>This policy explains how {s.siteName} collects and uses information through this website. It covers the website only. Medical records created as part of your care are protected under federal and California law and described in our separate Notice of Privacy Practices, available from the office.</p>
        <h2 id="what-we-collect">What we collect</h2>
        <p>When you send a consultation request, we collect the name, email address, phone number and message you provide, along with the page you were on and how you arrived at the site. We also use cookies and analytics tools, including Google Tag Manager and Google Analytics, to understand how visitors use the site.</p>
        <h2 id="how-we-use-it">How we use it</h2>
        <p>We use your contact details to respond to your request and schedule appointments. We use analytics data to improve the website and measure our advertising. We do not sell your personal information.</p>
        <h2 id="please-limit-medical-details">Please limit medical details</h2>
        <p>Website forms and email are not a secure way to send detailed medical information. Please keep your message brief. We will review your history with you in person or by phone.</p>
        <h2 id="service-providers">Service providers</h2>
        <p>We share information with companies that help us run the practice, such as our patient communication and scheduling platform and our website and analytics providers, only as needed to provide those services.</p>
        <h2 id="your-choices">Your choices</h2>
        <p>California residents may request access to or deletion of personal information collected through this website. You can block cookies in your browser settings. To make a request, email <a href={`mailto:${s.email}`}>{s.email}</a> or call <a href={`tel:${s.phoneE164}`}>{s.phone}</a>.</p>
        <h2 id="contact">Contact</h2>
        <p>{s.siteName}, {s.street}, {s.city}, {s.region} {s.postalCode}.</p>
      </div>
    </div>
  );
}
