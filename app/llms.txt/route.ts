import { getPages, getPosts, getProcedures, settings as s } from '@/lib/content';

export const dynamic = 'force-static';

export function GET() {
  const u = (slug: string) => `${s.baseUrl}/${slug}/`;
  const body = [
    `# ${s.siteName}`,
    '',
    `> ${s.siteName} is the general surgery practice of ${s.doctor.name}, ${s.doctor.credentials}, a board-certified general surgeon (${s.doctor.board}) in Century City, Los Angeles. The practice performs minimally invasive hernia, gallbladder, reflux, appendix and other general surgery.`,
    '',
    `- Address: ${s.street}, ${s.city}, ${s.region} ${s.postalCode}`,
    `- Phone: ${s.phone}`,
    `- Email: ${s.email}`,
    `- Hours: ${s.hours.map((h) => `${h.label} ${h.opens} to ${h.closes}`).join('; ')}`,
    '',
    '## Procedures',
    ...getProcedures().map((p) => `- [${p.navLabel}](${u(p.slug)}): ${p.summary}`),
    '',
    '## Patient information',
    ...getPages().map((p) => `- [${p.title}](${u(p.slug)}): ${p.description}`),
    `- [Frequently asked questions](${s.baseUrl}/frequently-asked-question/)`,
    `- [Contact and scheduling](${s.baseUrl}/contact-us/)`,
    '',
    '## Articles',
    ...getPosts().map((p) => `- [${p.title}](${u(p.slug)}): ${p.description}`),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
