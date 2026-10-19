# generalsurgeryla.com

Marketing site for Dr. Babak Moein (general surgery: hernias, gallbladder, appendix). Built and maintained by P5 Marketing. Next.js 14 (app router), TypeScript, content as markdown in the repo, Decap CMS at `/admin`, hosted on Vercel.

Read `MAINTENANCE-LEDGER.md` before non-trivial work. It records decisions, open items, and how to undo recent changes.

## Commands
- `npm run dev` runs the local site.
- `npm run build` must pass before any commit that goes to `main`.
- `npm run lint` runs Next lint.
- `node scripts/pop-report.mjs <url> "<keyword>"` runs a Page Optimizer Pro report for one page. It costs POP API calls.
- `node scripts/pop-batch.mjs` runs every page in `pop-keywords.json`. It takes minutes per page, so leave it to the user to run in their own terminal.

## Deploy
Pushing to `main` deploys to Vercel. CMS edits arrive as `cms-drafts` pull requests that Robert reviews and merges. Run the build and confirm with the user before pushing.

## Layout
- `app/` holds routes. `app/[slug]` renders procedure and page markdown. `app/api/` has the GHL lead form, plus the auth and callback routes for the CMS.
- `content/` holds `procedures/`, `blog/`, `pages/` (markdown) and JSON for settings, FAQs and videos. Contact details live in `content/settings.json` ("Practice details" in the CMS).
- `lib/links.ts` sets the interlinking. Every new blog post needs a line in `postProcedures`.
- `lib/schema.ts` holds the JSON-LD, including the `CONDITIONS` for the six procedure pages.
- `components/` and `app/globals.css` hold the UI. The CSS token names `--scrub` (navy) and `--marker` (terracotta) are historical. Keep them, because components and SVGs reference them.
- `pop-keywords.json` maps pages to target keywords. Add new pages and posts to it.

## Rules
- Never commit secrets. `.env.local` holds the real keys (`GHL_*`, `GITHUB_*`, `POP_API_KEY`); `.env.example` lists the names only.
- Brand separation: this site is general surgery only. No links to, or copy about, Dr. Moein's other brands (bariatrics, Moein Surgical Arts, gynecomastia, XY Sculpt MD).
- Medical claims and cost figures need Dr. Moein's confirmation. The hernia page cost section deliberately has no dollar amounts.
- Keep the `noindex` rule for `*.vercel.app` hosts.
- GTM loads on interaction or after 10 seconds, on purpose. Check this first if analytics looks low.
- A change to the form or UTM handling affects performance billing. Test the form after touching it.
- Redesign work is look-only. Don't change content, schema, routes or the form as a side effect.
- Add a dated entry to `MAINTENANCE-LEDGER.md` after any change worth remembering.
