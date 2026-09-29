/* Front view of the torso. The viewer's left is the patient's right, so the
   gallbladder and appendix sit on the left of the drawing. Each violet mark
   links to the procedure page for that area. */
type Spot = { x: number; y: number; lx: number; ly: number; side: 'l' | 'r'; lines: string[]; href: string };

const spots: Spot[] = [
  { x: 158, y: 112, lx: 132, ly: 112, side: 'l', lines: ['Lipomas'], href: '/lipoma-removal-los-angeles/' },
  { x: 232, y: 230, lx: 132, ly: 230, side: 'l', lines: ['Gallbladder'], href: '/gallbladder-surgery-in-los-angeles/' },
  { x: 214, y: 398, lx: 132, ly: 380, side: 'l', lines: ['Appendix'], href: '/laparoscopic-appendectomy-in-los-angeles/' },
  { x: 226, y: 458, lx: 132, ly: 470, side: 'l', lines: ['Inguinal', 'hernia'], href: '/inguinal-hernia-surgery-in-los-angeles-ca/' },
  { x: 326, y: 106, lx: 432, ly: 96, side: 'r', lines: ['Vascular', 'access'], href: '/vascular-access-in-los-angeles/' },
  { x: 290, y: 176, lx: 432, ly: 176, side: 'r', lines: ['Hiatal hernia', 'and reflux'], href: '/expert-hiatal-hernia-surgery-in-los-angeles/' },
  { x: 280, y: 318, lx: 432, ly: 296, side: 'r', lines: ['Abdominal', 'hernia'], href: '/hernia-surgery-los-angeles-ca/' },
  { x: 347, y: 360, lx: 432, ly: 384, side: 'r', lines: ['Colonoscopy'], href: '/colonoscopy-and-endoscopy-los-angeles/' },
];

export default function BodyMap() {
  return (
    <figure className="map-figure">
      <svg className="body-map" viewBox="0 0 560 560" role="group" aria-labelledby="map-title">
        <title id="map-title">Where each procedure is performed. Choose an area to read about it.</title>
        <g transform="translate(40,0)" aria-hidden="true">
          <path className="outline" d="M215,18 C215,40 205,52 180,58 C150,66 118,72 106,96 C98,118 104,160 118,200 C130,240 142,280 146,320 C150,360 132,395 128,430 C124,470 140,505 150,540 L330,540 C340,505 356,470 352,430 C348,395 330,360 334,320 C338,280 350,240 362,200 C376,160 382,118 374,96 C362,72 330,66 300,58 C275,52 265,40 265,18 Z" />
          <path className="organ" d="M200,540 Q240,470 280,540" />
          <path className="organ" d="M240,74 L240,196" />
          <path className="organ" d="M150,196 Q240,248 330,196" />
          <path className="organ" d="M146,176 Q193,140 240,164 Q287,140 334,176" />
          <path className="organ" d="M240,112 L248,186" />
          <path className="organ-fill" d="M150,180 Q200,160 254,186 Q232,226 176,232 Q150,216 150,180 Z" />
          <ellipse className="organ-fill" cx="192" cy="230" rx="8" ry="12" style={{ opacity: .22 }} />
          <path className="organ-fill" d="M256,180 Q300,164 314,200 Q320,246 282,256 Q262,252 270,226 Q266,206 250,200 Z" />
          <path d="M178,382 L175,292 Q178,270 205,268 L280,268 Q306,270 307,292 L308,376 Q300,396 270,390 Q250,386 240,402" fill="none" stroke="var(--scrub)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" opacity=".12" />
          <path className="organ" d="M178,384 Q172,394 172,402" strokeWidth="3" />
          <circle className="organ" cx="240" cy="318" r="3.5" />
          <path className="organ" d="M166,426 Q200,456 226,472" />
          <path className="organ" d="M314,426 Q280,456 254,472" />
          <rect className="organ" x="277" y="98" width="18" height="14" rx="5" />
          <path className="organ" d="M286,98 Q280,80 262,70" />
        </g>
        {spots.map((sp) => {
          const anchor = sp.side === 'l' ? 'end' : 'start';
          const edge = sp.side === 'l' ? sp.lx + 6 : sp.lx - 6;
          return (
            <a key={sp.href} href={sp.href} className="hot" aria-label={`${sp.lines.join(' ')}: read about this procedure`}>
              <line className="lead" x1={sp.x} y1={sp.y} x2={edge} y2={sp.ly} />
              <circle className="dot" cx={sp.x} cy={sp.y} r="9" />
              <circle className="core" cx={sp.x} cy={sp.y} r="3" />
              <text x={sp.lx} y={sp.ly - (sp.lines.length - 1) * 8 + 4} textAnchor={anchor}>
                {sp.lines.map((l, i) => (
                  <tspan key={i} x={sp.lx} dy={i === 0 ? 0 : 16}>{l}</tspan>
                ))}
              </text>
            </a>
          );
        })}
      </svg>
      <figcaption>Choose an area to see how Dr. Moein treats it.</figcaption>
    </figure>
  );
}
