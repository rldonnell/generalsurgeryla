# General Surgery LA brand guide

Website design system for generalsurgeryla.com, the "Explainer" look approved November 4, 2026.
Use this guide for any new page, section, graphic, email or social post for General Surgery LA.
The code is the source of truth: tokens live in `app/globals.css`, fonts in `app/layout.tsx`.

## 1. Brand in one line

General surgery in Los Angeles, through the smallest incision that works.

The site should feel bright, calm and plain-spoken: a surgeon who explains things clearly, not a hospital system.
It leads with Dr. Moein explaining conditions on video, then sends people to the right procedure page.

## 2. Brand separation (non-negotiable)

- This brand is general surgery only: hernia, gallbladder and appendix.
- No links to, copy about, or logos of Dr. Moein's other brands (bariatrics, Healthy Life Bariatrics, Moein Surgical Arts, gynecomastia, XY Sculpt MD).
- Check every video thumbnail and image for another brand's logo before using it. Several of his videos carry a small Healthy Life logo inside the video itself; use the cleanest ones and never feature a thumbnail where that logo is prominent.
- No cosmetic surgery references. No robotic surgery references.

## 3. Logo and name

- **Name:** General Surgery LA. Always written in full, "LA" in capitals, no periods.
- **Sub line:** Dr. Babak Moein, MD, FACS.
- **Mark:** the letters "GS" in Montserrat Bold inside a rounded square (corner radius about 30% of the width).
  - On the navy header: white square, navy letters.
  - On white or light backgrounds: navy square, white letters.
- **Lockup:** mark on the left, name and sub line stacked on the right, vertically centered. Gap between mark and text equals about a third of the mark's width.
- Minimum mark size: 32px on screen.
- Don't stretch, recolor, outline or add effects to the mark. Don't use the old green, violet or serif versions.

## 4. Color

| Role | Name | Hex | CSS token | Use it for |
|---|---|---|---|---|
| Ink | Navy | `#0e1a2b` | `--ink`, `--scrub-deep` | Headlines, body text on light, header bar, dark panels, footer |
| Body soft | Slate | `#3d4a5c` | `--ink-soft` | Paragraphs, captions, secondary text |
| Action | Burnt orange | `#bd4f1c` | `--marker` | Every button (including About Dr. Moein), "go" links, play buttons. Nothing decorative |
| Action hover | Deep burnt orange | `#9e4016` | `--marker-deep` | Hover and pressed state of buttons |
| Link | Clinic blue | `#1f4f8f` | `--scrub` | Inline text links, small section labels |
| Panel | Sage | `#eef2e6`, border `#dae2ca` | `--sage`, `--sage-line`, `.x-sage` | Appendix service card and chooser chip |
| Panel | Fog (replaces Sky) | `#f1f1f1`, border `#dddddd` | `--fog`, `--fog-line`; `--sky` and `--mist` point to it | Hernia chip and guides, testimonials, "Watch" posters, tables, body map, nav hovers |
| Panel | Sand | `#fff4e5` | `--sand` | Home page hero, doctor panel, gallbladder card and gallbladder guides |
| Highlight | Soft sun | `#ffeab8` | `--sun-soft` | The one highlighted phrase in a headline ("smallest incision") |
| Accent on navy | Sun | `#ffe08a` | `--sun` | Step labels and small accents on navy only |
| Ground | White | `#ffffff` | `--paper` | Page background, cards on colored panels |
| Rule | Mist line | `#dbe3ee` | `--rule` | Hairlines, table borders, input borders |

**Topic color coding.** Hernia content sits on Sky with a blue label (`#1f4f8f`). Gallbladder content sits on Sand with an amber label (`#8a4b12`). Appendix sits on Sky with a burnt orange border tint because it is urgent.

**Proportion.** Roughly 70% white, 20% Sand and Sky panels, 10% Navy. Burnt orange appears only where someone can act.

**Contrast (WCAG 2.1).** Every pairing below passes AA for normal text.

| Text | Background | Ratio |
|---|---|---|
| Navy | White | 17.5:1 |
| Slate | White | 9.0:1 |
| Slate | Sky | 7.9:1 |
| Slate | Sand | 8.3:1 |
| White | Burnt orange | 4.9:1 |
| Burnt orange | White | 4.9:1 |
| Burnt orange | Sand | 4.5:1 |
| Navy | Soft sun | 14.7:1 |
| Clinic blue | White | 8.2:1 |
| Amber label | Sand | 6.2:1 |
| White | Navy | 17.5:1 |
| Light grey `#c4cedb` | Navy | 11.0:1 |
| Sun | Navy | 13.6:1 |

Don't put burnt orange text on Sky for small text, and don't put Slate on Navy.

## 5. Typography

| Use | Font | Weight | Size (desktop) | Notes |
|---|---|---|---|---|
| Home page headline | Montserrat | 600 Semi-bold | 44px max, 21px on phones | Must hold to three lines on phones 360 to 430px wide with no orphan word |
| Page headlines (H1) | Montserrat | 600 | about 42px | `text-wrap: balance` |
| Section headings (H2) | Montserrat | 600 | about 34px | Sentence case |
| Card headings (H3) | Montserrat | 600 | 20 to 26px | |
| Labels and step numbers | Montserrat | 700 | 12 to 14px | Uppercase, letter spacing 0.06em |
| Body | Figtree | 400 | 17px, line height 1.65 | |
| Emphasis and buttons | Figtree | 600 to 700 | 15 to 17px | |

- Headings use a slight negative letter spacing (minus 0.02em).
- Sentence case everywhere. No all-caps headlines.
- Keep "Los Angeles" on one line (use a non-breaking space between the words).
- One highlighted phrase per headline at most, in Soft sun with a small rounded background.
- Both fonts are free Google Fonts (SIL Open Font License), loaded through `next/font`. Nothing to renew. Garet was considered and rejected because it needs a paid web license.

## 6. Shape, space and depth

- **Panels:** 32px corner radius, set 16px in from the page edge (10px on phones). Panel padding scales from 32px on phones to 72px on desktop.
- **Cards:** 20 to 24px radius. Chips and small cards: 14px. Inputs: 8px.
- **Buttons:** 14px radius (not full pills), at least 50px tall. Phone tap targets never under 44px.
- **Pills:** fully rounded only for small labels, the menu button and the "1 million views" style badges.
- **Shadows:** soft and low, used to lift video cards and the header. No hard borders around panels.
- **Section spacing:** 48px on phones up to 88px on desktop between sections.
- **Content width:** 1280px max for text and grids; panels can run to 1376px.

## 7. Components

| Component | Look | Where in code |
|---|---|---|
| Header bar | Navy, white text, white GS mark, burnt orange Call button on desktop, translucent white Menu pill on phones | `components/Header.tsx`, CSS "Navy header bar" |
| Primary button | Burnt orange, white text | `.btn-marker` |
| Secondary button | White fill on colored panels, or navy fill | `.btn-white`, `.btn-ink` |
| Outline button | Navy outline, used sparingly | `.btn-line` |
| Hero | Sky panel, headline, pill badge, "What brought you here?" chooser, tilted video card | `.x-hero` |
| Chooser chips | Three tinted chips: hernia (blue), gallbladder (amber), appendix (red tint) | `.x-chooser` |
| Video card | 9:16 vertical, 20px radius, play button lower left; hero version has a centered burnt orange play button | `components/ShortVideo.tsx` |
| Service cards | Hernia in Navy with link list, Gallbladder on Sand with image, Appendix on Sky | `.x-services` |
| Steps band | Navy panel, four translucent cards, Sun step labels | `.x-steps` |
| Guide cards | Sky or Sand by topic, small uppercase topic label, Montserrat title | `.x-guides` |
| Testimonials | Sky cards, Figtree medium | `.x-quotes` |
| Contact block | Navy panel, white form card | `#contact` on the home page |
| Mobile call bar | Fixed bottom bar: "Call the office" and "Book a consult" | `components/CallBar.tsx` |

## 8. Imagery and video

- Lead with Dr. Moein's own short videos. They are the strongest proof on the site.
- Video posters are local 9:16 images in `public/images/videos/<youtube-id>.webp` (360 by 640). Videos load from YouTube only after a tap.
- Medical illustrations: clean, clinical, consistent lighting. Prefer the existing laparoscopic illustrations.
- Photos of Dr. Moein: real, in scrubs or a clinical setting. No stock photos of other doctors or patients.
- No AI-generated people. No graphic surgical photos on the home page.
- Icons: simple line icons with rounded ends, 2px stroke, in Navy or White. No emoji.

## 9. Voice and copy

- Plain language a patient can read after a scan report: say what the condition is, how the operation is done, and what recovery looks like.
- Calm and specific, never salesy. No superlatives ("best", "top", "world-class").
- Approved phrasing: "mostly laparoscopic", "most patients go home the same day", "board-certified general surgeon", "Century City".
- Never mention robotic surgery. Don't use "many patients" where the site says "most patients".
- Medical claims, outcomes and any cost figures need Dr. Moein's confirmation before publishing. The hernia cost section intentionally has no dollar amounts.
- Appendicitis is always framed as urgent.
- No em dashes in site copy.

## 10. Quick do and don't

**Do**
- Use one burnt orange action per area.
- Match panel color to topic (hernia Sky, gallbladder Sand).
- Check the home headline on a real phone after any copy change.

**Don't**
- Use serif fonts, the old green or violet palette, or the old navy-and-sand serif look.
- Add other Moein brands, logos or links.
- Use burnt orange as decoration, or add gradients or heavy borders.

## Change log

- Nov 4, 2026: Home hero is now Sand (matches the doctor panel). Action color changed from the redder #c93c22 to a warmer Burnt orange #bd4f1c, and the About Dr. Moein button uses it too. Headline highlight softened to #ffeab8. Favicon updated to the GS mark.
- Nov 4, 2026: Guide created for the Explainer redesign (Montserrat and Figtree, Sky and Sand panels, navy header bar).
