import Link from 'next/link';
import Crumbs from '@/components/Crumbs';
import JsonLd from '@/components/JsonLd';
import { getPosts, settings as s } from '@/lib/content';
import { breadcrumbs, IDS } from '@/lib/schema';

export const metadata = {
  title: 'General Surgery Blog | Dr. Moein, Los Angeles',
  description: 'Plain-language guides from Los Angeles general surgeon Dr. Babak Moein on hernias, gallbladder disease, and recovery after surgery.',
  alternates: { canonical: '/blog/' },
};

const fmt = (iso?: string) => (iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : '');

export default function Blog() {
  const posts = getPosts();
  return (
    <div className="wrap">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Blog', '@id': `${s.baseUrl}/blog/#blog`, url: `${s.baseUrl}/blog/`, name: `${s.siteName} Blog`, publisher: { '@id': IDS.clinic },
              blogPost: posts.map((p) => ({ '@id': `${s.baseUrl}/${p.slug}/#article` })) },
            breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }]),
          ],
        }}
      />
      <header className="page-head">
        <Crumbs items={[{ name: 'Home', href: '/' }, { name: 'Blog' }]} />
        <h1>Guides from Dr. Moein</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: '1.15rem', maxWidth: '60ch', marginTop: '1rem' }}>
          Straight answers about the conditions we treat and what surgery and recovery are really like.
        </p>
      </header>
      <ul className="post-list" style={{ paddingBottom: '4rem' }}>
        {posts.map((p) => (
          <li key={p.slug}>
            <time dateTime={p.date}>{fmt(p.date)}</time>
            <h2><Link href={`/${p.slug}/`}>{p.title}</Link></h2>
            <p>{p.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
