/* Front view of the abdomen showing where common hernias form.
   Dots with a page are links; the rest are labels. */
type Spot = { name: string; x: number; y: number; lx: number; ly: number; side: 'l' | 'r'; lines: string[]; href?: string };

const spots: Spot[] = [
  { name: 'Hiatal hernia', x: 290, y: 176, lx: 436, ly: 170, side: 'r', lines: ['Hiatal'], href: '/expert-hiatal-hernia-surgery-in-los-angeles/' },
  { name: 'Epigastric hernia', x: 280, y: 258, lx: 436, ly: 250, side: 'r', lines: ['Epigastric'] },
  { name: 'Umbilical hernia', x: 280, y: 318, lx: 436, ly: 318, side: 'r', lines: ['Umbilical'], href: '/umbilical-hernia-adults-2026-guide/' },
  { name: 'Spigelian hernia', x: 342, y: 356, lx: 436, ly: 386, side: 'r', lines: ['Spigelian'] },
  { name: 'Incisional hernia', x: 280, y: 392, lx: 132, ly: 380, side: 'l', lines: ['Incisional', '(at a scar)'] },
  { name: 'Inguinal hernia', x: 226, y: 458, lx: 132, ly: 452, side: 'l', lines: ['Inguinal'], href: '/inguinal-hernia-surgery-in-los-angeles-ca/' },
  { name: 'Femoral hernia', x: 206, y: 505, lx: 132, ly: 516, side: 'l', lines: ['Femoral'] },
];

export default function HerniaMap() {
  return (
    <figure className="map-figure article-figure">
      <svg className="body-map" viewBox="0 0 560 560" role="img" aria-labelledby="hm-title hm-desc">
        <title id="hm-title">Where common hernias form on the torso</title>
        <desc id="hm-desc">
          Front view of the torso. Hiatal hernias form at the diaphragm in the upper abdomen. Epigastric hernias form between the breastbone and the navel.
          Umbilical hernias form at the navel. Spigelian hernias form along the side of the abdominal wall below the navel. Incisional hernias form at a
          surgical scar. Inguinal hernias form in the groin, and femoral hernias just below the groin.
        </desc>
        <g transform="translate(40,0)" aria-hidden="true">
          <path className="outline" d="M215,18 C215,40 205,52 180,58 C150,66 118,72 106,96 C98,118 104,160 118,200 C130,240 142,280 146,320 C150,360 132,395 128,430 C124,470 140,505 150,540 L330,540 C340,505 356,470 352,430 C348,395 330,360 334,320 C338,280 350,240 362,200 C376,160 382,118 374,96 C362,72 330,66 300,58 C275,52 265,40 265,18 Z" />
          <path className="organ" d="M240,74 L240,196" />
          <path className="organ" d="M146,176 Q193,140 240,164 Q287,140 334,176" />
          <path className="organ" d="M166,426 Q200,456 226,472" />
          <path className="organ" d="M314,426 Q280,456 254,472" />
          <path className="organ" d="M240,196 L240,470" strokeDasharray="3 5" />
          <path d="M240,364 L240,432" fill="none" stroke="var(--marker)" strokeWidth="2" strokeDasharray="1 4" strokeLinecap="round" />
          <circle className="organ" cx="240" cy="318" r="3.5" />
        </g>
        {spots.map((sp) => {
          const anchor = sp.side === 'l' ? 'end' : 'start';
          const edge = sp.side === 'l' ? sp.lx + 6 : sp.lx - 6;
          const inner = (
            <>
              <line className="lead" x1={sp.x} y1={sp.y} x2={edge} y2={sp.ly} />
              <circle className="dot" cx={sp.x} cy={sp.y} r="9" />
              <circle className="core" cx={sp.x} cy={sp.y} r="3" />
              <text x={sp.lx} y={sp.ly - (sp.lines.length - 1) * 8 + 4} textAnchor={anchor}>
                {sp.lines.map((l, i) => (
                  <tspan key={i} x={sp.lx} dy={i === 0 ? 0 : 16}>{l}</tspan>
                ))}
              </text>
            </>
          );
          return sp.href ? (
            <a key={sp.name} href={sp.href} className="hot" aria-label={`${sp.name}: read more`}>{inner}</a>
          ) : (
            <g key={sp.name} className="hot static" role="presentation">{inner}</g>
          );
        })}
      </svg>
      <figcaption>Where common hernias form. Marked areas with a link have their own page.</figcaption>
    </figure>
  );
}
