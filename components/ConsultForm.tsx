import Script from 'next/script';

// GoHighLevel "General Surgery LA" form (id qAI6iVCpf7SPTn7ji7QD), embedded Nov 5, 2026.
// Its own form id lets a general surgery workflow trigger on "Form Submitted" for this form only.
// form_embed.js resizes the iframe and passes the page URL and UTMs to GHL.
// The previous custom form (posted to /api/lead) is in ConsultFormApi.tsx for rollback.
const FORM_ID = 'qAI6iVCpf7SPTn7ji7QD';

export default function ConsultForm({ heading = 'Request a consultation', headingLevel = 2 }: { heading?: string; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <div className="form form-embed" id="request">
      <H>{heading}</H>
      <p className="note">We reply within one business day. Please keep medical details brief; we will go over everything at your visit.</p>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
        style={{ width: '100%', height: '1227px', border: 'none', borderRadius: '8px' }}
        id={`inline-${FORM_ID}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="General Surgery LA"
        data-height="1227"
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title="General Surgery LA"
        loading="lazy"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
