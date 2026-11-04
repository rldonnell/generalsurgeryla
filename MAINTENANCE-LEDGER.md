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
- Facts on the hernia page that Dr. Moein must confirm before launch: emergency repair, reconstruction of failed repairs, "years of experience".
- Cost section on the hernia page intentionally has no dollar figures. Add a range only after Dr. Moein confirms it.

## Visual redesign, Oct 14, 2026 (navy and sand)
- Scope: look only. Content, schema, CMS, form, UTMs and routes were not touched. Changed files: app/globals.css, app/layout.tsx (fonts, theme color), public/icon.svg.
- Fonts are now Fraunces (headings) and Figtree (body), loaded through next/font. Nothing to host or renew.
- Token names --scrub and --marker are historical. --scrub is now navy and --marker is now terracotta. Keep the names: components and the SVG diagrams reference them.
- public/og-default.png still has the old green and violet look. Regenerate it to match before the site is shown to the doctor.
- Not yet reviewed visually by Irene or Dr. Moein. Run `npm run dev` and check the home page, a procedure page, the blog and the contact form on desktop and phone first.
- To undo: `git diff` shows every change, and `git checkout -- app/globals.css app/layout.tsx public/icon.svg` reverts them.

## GTM load timing, Oct 14, 2026
- GTM (GTM-TQVVKLDK) now loads on first scroll, tap, click or keypress, or after 10 seconds, instead of on page load. Done for page speed (mobile score 69 to 84 so far).
- Effect: visitors who leave in under 10 seconds without interacting are not tracked. Intentional, Robert prefers engaged-user data.
- If analytics ever looks low, check this first. To undo, change the Script in app/layout.tsx back to the plain loader.

## POP (Page Optimizer Pro) report script, Oct 14, 2026
- scripts/pop-report.mjs runs a POP report for one page and keyword: `node scripts/pop-report.mjs <url> "<keyword>"`. Saves raw JSON to pop-reports/ (git-ignored).
- Needs POP_API_KEY in .env.local (git-ignored). Never commit the key. Each run costs about 2 POP API calls.
- Location must match POP's list exactly (Los Angeles is "United States, California, CA, Los Angeles"). Language is lowercase ("english").
- EEAT option is not wired up yet. Re-check POP's docs (api-docs.pageoptimizer.pro) if POP changes its API.
- First report: home page, keyword "general surgeon in los angeles", POP score 19.36.
- Batch runner: `node scripts/pop-batch.mjs` runs every page in pop-keywords.json (about 2 POP calls and 3 to 6 minutes per page) and writes pop-reports/summary-DATE.csv. Run it in your own terminal, it can be stopped and resumed. Keywords in pop-keywords.json are drafts chosen by Claude, review before relying on them. Add new pages and posts to that file.
- Home page POP score after first copy pass: 19.36 to 38.84 (Oct 14, 2026).

## Interlinking map (Oct 15, 2026)
- `lib/links.ts` decides which blog posts and procedure pages link to each other (the "Related reading" and "Keep reading" blocks). Every new blog post needs a line in `postProcedures`, or it gets no procedure link and no siblings.
- Home page, 3 post titles and several pages got POP term edits. Re-score after publish with `node scripts/pop-batch.mjs --force --only <path>`.
- Next.js 14.2.33 prints a security-update warning on install. Not upgraded as part of this work. Price it separately.

## Homepage redesign, Nov 4, 2026 ("Explainer", Montserrat and Figtree)
- Approved by Robert from the design canvas "General Surgery LA homepage (Montserrat)". Bright, video-led look: white page, sky blue and sand panels, navy, one terracotta action color (#c93c22).
- Fonts: Montserrat 600/700 for headings (replaces Fraunces), Figtree body unchanged. Loaded through next/font, nothing to renew. Montserrat is free (OFL); Garet was considered and needs a paid web license, so it was not used.
- Home hero headline holds to three lines with no orphan on phones 360 to 430px wide (21px on phones, 44px max on desktop, text-wrap: balance, tighter hero side margins under 520px). If the headline copy changes, re-check this on a phone.
- New on the home page, all built from existing site copy: "What brought you here?" links to the hernia, gallbladder and appendix pages; four short videos that play inline; a four-step "what to expect" band; four blog posts as guides (slugs listed in app/page.tsx, a post that is renamed or removed simply drops out).
- Kept from the old home page: FAQ section and its FAQPage schema, the open vs minimally invasive table, the consult form and NAP/map block. Form code and UTM handling were not touched. No routes, menus or schema changed. The BodyMap diagram is no longer on the home page (component still in the repo).
- Video poster images are local copies in public/images/videos/<id>.webp so nothing loads from YouTube until a visitor taps play. A new video needs its poster added there. The hiatal hernia slot uses tX0BrRUNn8w because the PTfhHe-tcRo thumbnail carries the Healthy Life Bariatrics podcast branding.
- Several of Dr. Moein's videos show a small Healthy Life logo inside the video itself. Same videos the site already embedded. Fully clean brand separation would need versions without the logo from him.
- All pages pick up the new colors and fonts through app/globals.css tokens (--scrub and --marker names kept).
- To undo: revert the commit "Homepage redesign: Explainer layout, Montserrat headings".

## Header refresh, Nov 4, 2026
- Look only: rounded navy "GS" mark beside the name, soft shadow instead of the hard bottom rule, pill hover on desktop links, light blue hamburger "Menu" button on phones that turns navy with an X when open, cleaner phone dropdown with small uppercase section labels. Links and menu contents unchanged.
- Changed files: components/Header.tsx (mark and menu icons), app/globals.css (block headed "Header refresh"). To undo, revert the commit "Header refresh".
- Nov 4, 2026, later the same day: header bar switched to navy with white text (reversed out like the home page Hernia card). GS mark is now white with navy letters; phone menu button is a translucent white pill that turns solid white when open. Dropdown panels stay white. CSS block headed "Navy header bar" in app/globals.css; delete that block to return to the white header.
- Nov 4, 2026: home hero panel changed from light blue (Sky) to a very light terracotta, Blush #fdf1ec (token --blush, class .x-blush). Also fixed the "What brought you here?" chips, which were showing dark outlines instead of their soft tinted borders (selector specificity). BRAND-GUIDE.md updated.
- Nov 4, 2026 (afternoon): Robert's color pass. Home hero panel is now Sand #fff4e5, the same as the About Dr. Moein panel (Blush removed). Action color moved from blood-red terracotta #c93c22 to burnt orange #bd4f1c (hover #9e4016; white text 4.9:1, passes AA); the About Dr. Moein button switched from navy to this color. "Smallest incision" highlight softened from #ffe08a to #ffeab8 (--sun-soft). Favicon public/icon.svg replaced with the GS mark. BRAND-GUIDE.md and the brand book updated.
