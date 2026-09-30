# Maintenance ledger: generalsurgeryla.com

Shipped by P5 Marketing, Sept 2026. Stack: Next.js 14, Vercel, markdown in repo, Decap CMS at /admin.

## What needs ongoing care
- **Contact info** (phone, email, address, hours, map embed): edit in CMS under "Practice details". Address changes must also update the map embed URL.
- **GoHighLevel form key** (GHL_API_KEY or GHL_PRIVATE_TOKEN): rotate if leaked. Test the form after any rotation.
- **GitHub OAuth App** for /admin login: breaks if the domain, repo name, or Vercel project name changes.
- **Decap version** is pinned in public/admin/index.html. Upgrade deliberately.
- **Content review**: short answers and FAQs were drafted by P5 and need Dr. Moein's sign-off. Re-review yearly.
- **Privacy and Terms** are basic drafts. Attorney review pending.
- **Schema**: check Search Console enhancements monthly for errors.
- **Attribution**: form UTMs feed GHL. Performance billing depends on this working.

## Roles
- Robert approves and merges each cms-drafts pull request into main. Irene reviews the site once before it goes to Dr. Moein, not on each pull.

## Exit condition
- Maintenance continues while the performance fee is being paid.

## Brand separation (keep this site standing on its own)
- Dr. Moein runs other brands (bariatrics, Moein Surgical Arts, gynecomastia, XY Sculpt MD). This site is general surgery only: hernias, gallbladder, appendix.
- No links to, or copy about, the other brands on this site. No shared social accounts.
- Own phone number and own email on this domain. The street address is shared with his other listings, so never create a second Google Business Profile at it without checking Google's rules first.
- Same-topic pages on the other sites can compete with this one in search. Review before publishing new blog topics.

## Technical SEO items added Sept 30, 2026
- Social share image: public/og-default.png. Regenerate if the practice name or photo changes.
- Google Business Profile URL: add it under "Practice details" in the CMS once the profile is verified. It feeds the clinic schema.
- Video schema: fill real upload dates into content/video-dates.json ({"videoId": "YYYY-MM-DD"}). Videos without a date get no VideoObject markup on purpose.
- Condition and procedure schema for the six procedure pages lives in lib/schema.ts (CONDITIONS). Update it if the page content changes.
- *.vercel.app hosts send noindex. The real domain does not. Do not remove this rule.
- Facts on the hernia page that Dr. Moein must confirm before launch: robotic repair, emergency repair, reconstruction of failed repairs, "years of experience".
- Cost section on the hernia page intentionally has no dollar figures. Add a range only after Dr. Moein confirms it.
