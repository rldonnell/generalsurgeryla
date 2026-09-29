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
