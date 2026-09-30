import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ConsultForm from '@/components/ConsultForm';
import Crumbs from '@/components/Crumbs';
import FaqList from '@/components/FaqList';
import JsonLd from '@/components/JsonLd';
import HerniaMap from '@/components/HerniaMap';
import Video from '@/components/Video';
import videoTitles from '@/content/videos.json';
import { getDoc, getPages, getPosts, getProcedures, settings as s } from '@/lib/content';
import { docGraph } from '@/lib/schema';

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getProcedures(), ...getPages(), ...getPosts()].map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = getDoc(params.slug);
  if (!d) return {};
  return {
    title: d.metaTitle,
    description: d.description,
    alternates: { canonical: `/${d.slug}/` },
    openGraph: {
      title: d.metaTitle,
      description: d.description,
      url: `/${d.slug}/`,
      siteName: s.siteName,
      locale: 'en_US',
      type: d.kind === 'post' ? 'article' : 'website',
      images: [{ url: '/og-default.png', width: 1200, height: 630, alt: `${s.siteName}, ${s.doctor.name}` }],
      ...(d.kind === 'post' ? { publishedTime: d.date, modifiedTime: d.updated } : {}),
    },
    twitter: { card: 'summary_large_image', title: d.metaTitle, description: d.description, images: ['/og-default.png'] },
  };
}

const longDate = (iso?: string) =>
  iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : '';

export default function DocPage({ params }: { params: { slug: string } }) {
  const d = getDoc(params.slug);
  if (!d) notFound();
  const titles = videoTitles as Record<string, string>;
  const procs = getProcedures();
  const related = d.kind === 'procedure' ? procs.filter((p) => p.slug !== d.slug && p.area === d.area).concat(procs.filter((p) => p.slug !== d.slug && p.area !== d.area)).slice(0, 5) : procs.slice(0, 5);

  const crumbs =
    d.kind === 'procedure'
      ? [{ name: 'Home', href: '/' }, { name: 'Procedures', href: '/#procedures' }, { name: d.navLabel || d.title }]
      : d.kind === 'post'
        ? [{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog/' }, { name: d.title }]
        : [{ name: 'Home', href: '/' }, { name: d.title }];

  const showByline = d.kind !== 'page' || d.slug !== 'general-surgeon-dr-babak-moein';

  return (
    <>
      <JsonLd data={docGraph(d)} />
      <div className="wrap">
        <header className="page-head">
          <Crumbs items={crumbs} />
          <h1>{d.title}</h1>
          {showByline && (
            <div className="byline">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.doctor.photo} alt="" width={40} height={40} />
              <span>
                {d.kind === 'post' ? 'Written and reviewed by ' : 'Medically reviewed by '}
                <Link href="/general-surgeon-dr-babak-moein/">{s.doctor.name}, {s.doctor.credentials}</Link>
                <br />
                {d.kind === 'post' && d.date ? <>Published <time dateTime={d.date}>{longDate(d.date)}</time>. </> : null}
                Updated <time dateTime={d.updated}>{longDate(d.updated)}</time>
              </span>
            </div>
          )}
          {d.summary && (
            <section className="quick-answer" aria-labelledby="short-answer">
              <h2 id="short-answer">The short answer</h2>
              <p>{d.summary}</p>
            </section>
          )}
        </header>

        <div className="layout">
          <article>
            {d.diagram === 'hernia' && <HerniaMap />}
            <div className="prose" dangerouslySetInnerHTML={{ __html: d.html }} />

            {d.videos.length > 0 && (
              <section style={{ marginTop: '3rem' }} aria-labelledby="videos">
                <h2 id="videos">Watch Dr. Moein explain it</h2>
                <div className="videos">
                  {d.videos.map((id) => (
                    <Video key={id} id={id} title={titles[id] || d.title} />
                  ))}
                </div>
              </section>
            )}

            {d.faqs && d.faqs.length > 0 && (
              <section style={{ marginTop: '3rem' }} aria-labelledby="faqs">
                <h2 id="faqs" style={{ marginBottom: '1rem' }}>Questions patients ask</h2>
                <FaqList faqs={d.faqs} />
              </section>
            )}

            <div style={{ marginTop: '3rem', maxWidth: 'var(--measure)' }}>
              <ConsultForm heading={`Talk with Dr. Moein about ${d.kind === 'procedure' ? (d.navLabel || '').toLowerCase() : 'your options'}`} />
            </div>
          </article>

          <aside className="aside" aria-label="Contact and related pages">
            <div className="aside-card">
              <p className="aside-title">See Dr. Moein in Century City</p>
              <p>Consultations in person or by video. Call to check your insurance before your visit.</p>
              <a className="btn btn-marker" href={`tel:${s.phoneE164}`}>Call {s.phone}</a>
              <a className="btn btn-line" href="#request">Request a consultation</a>
            </div>
            {d.headings.length > 2 && (
              <nav className="aside-card toc" aria-label="On this page">
                <p className="aside-title">On this page</p>
                <ol>
                  {d.headings.map((h) => (
                    <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>
                  ))}
                </ol>
              </nav>
            )}
            <nav className="aside-card" aria-label="Related procedures">
              <p className="aside-title small">Related procedures</p>
              <ul className="related">
                {related.map((p) => (
                  <li key={p.slug}><Link href={`/${p.slug}/`}>{p.navLabel}</Link></li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </div>
    </>
  );
}
