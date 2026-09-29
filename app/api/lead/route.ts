import { NextResponse } from 'next/server';

// Consultation requests go straight into Dr. Moein's GoHighLevel account.
// The key stays on the server. Set ONE of these in Vercel:
//   GHL_PRIVATE_TOKEN + GHL_LOCATION_ID  (LeadConnector API v2, preferred)
//   GHL_API_KEY                          (legacy location API key, v1, what the WordPress site used)

type Body = Record<string, string | null | undefined>;
const clip = (v: unknown, n = 500) => String(v ?? '').trim().slice(0, n);

export async function POST(req: Request) {
  let b: Body;
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }

  if (b.company) return NextResponse.json({ ok: true }); // honeypot filled, quietly drop

  const firstName = clip(b.firstName, 80);
  const lastName = clip(b.lastName, 80);
  const email = clip(b.email, 160);
  const phone = clip(b.phone, 40);
  if (!firstName || !email || !phone || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Please fill in your name, email and phone.' }, { status: 422 });
  }

  const source = clip(b.utm_source, 80) || 'direct';
  const today = new Date().toISOString().slice(0, 10);
  const tags = ['generalsurgeryla.com', 'website form', `utm:${source}`, today];
  const notes = {
    comments: clip(b.message, 2000) || 'empty message',
    referred_by: clip(b.referrer, 300),
    attribution: source,
    utm_source: source,
    utm_medium: clip(b.utm_medium, 80),
    utm_campaign: clip(b.utm_campaign, 120),
    landing_page: clip(b.page, 300),
  };

  try {
    let res: Response;
    if (process.env.GHL_PRIVATE_TOKEN && process.env.GHL_LOCATION_ID) {
      res = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          locationId: process.env.GHL_LOCATION_ID,
          firstName, lastName, email, phone,
          source: 'generalsurgeryla.com',
          tags,
          ...(process.env.GHL_CF_COMMENTS_ID ? { customFields: [{ id: process.env.GHL_CF_COMMENTS_ID, field_value: notes.comments }] } : {}),
        }),
      });
    } else if (process.env.GHL_API_KEY) {
      res = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.GHL_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, name: `${firstName} ${lastName}`.trim(), email, phone, website: notes.landing_page, source: 'website', tags, customField: notes }),
      });
    } else {
      console.error('lead: no GoHighLevel credentials configured');
      return NextResponse.json({ error: 'Form is not connected yet.' }, { status: 503 });
    }
    if (!res.ok) {
      console.error('lead: GHL rejected', res.status, await res.text().catch(() => ''));
      return NextResponse.json({ error: 'Could not save your request.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('lead: request failed', e);
    return NextResponse.json({ error: 'Could not save your request.' }, { status: 502 });
  }
}
