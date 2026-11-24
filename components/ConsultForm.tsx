import Script from 'next/script';

// GoHighLevel "General Surgery" form (id pqtnuyiiqT1fsKCxbH36), switched Nov 23, 2026.
// Replaces form qAI6iVCpf7SPTn7ji7QD ("General Surgery LA"). Inline layout on purpose:
// GHL's sticky-sidebar embed for this form is not used. Change FORM_ID back to roll back.
// The GHL workflow must trigger on "Form Submitted" for this form id.
// form_embed.js resizes the iframe and passes the page URL and UTMs to GHL.
// The older custom form (posted to /api/lead) is in ConsultFormApi.tsx for rollback.
const FORM_ID = 'pqtnuyiiqT1fsKCxbH36';
const FORM_NAME = 'General Surgery';
const FORM_HEIGHT = 976;

export default function ConsultForm({ heading = 'Request a consultation', headingLevel = 2 }: { heading?: string; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <div className="form form-embed" id="request">
      <H>{heading}</H>
      <p className="note">We reply within one business day. Please keep medical details brief; we will go over everything at your visit.</p>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
        style={{ width: '100%', height: `${FORM_HEIGHT}px`, border: 'none', borderRadius: '8px' }}
        id={`inline-${FORM_ID}`}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={FORM_NAME}
        data-height={String(FORM_HEIGHT)}
        data-layout-iframe-id={`inline-${FORM_ID}`}
        data-form-id={FORM_ID}
        data-cookie-consent="true"
        data-cookie-consent-provider="auto"
        title={FORM_NAME}
        loading="lazy"
      />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="lazyOnload" />
    </div>
  );
}
