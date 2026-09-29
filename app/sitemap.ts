import type { MetadataRoute } from 'next';
import { getPages, getPosts, getProcedures, settings as s } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${s.baseUrl}${p}`;
  const today = new Date().toISOString().slice(0, 10);
  return [
    { url: u('/'), lastModified: today, changeFrequency: 'monthly', priority: 1 },
    ...getProcedures().map((d) => ({ url: u(`/${d.slug}/`), lastModified: d.updated, changeFrequency: 'monthly' as const, priority: 0.9 })),
    ...getPages().map((d) => ({ url: u(`/${d.slug}/`), lastModified: d.updated, changeFrequency: 'yearly' as const, priority: 0.6 })),
    { url: u('/frequently-asked-question/'), lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
    { url: u('/blog/'), lastModified: getPosts()[0]?.updated || today, changeFrequency: 'weekly', priority: 0.6 },
    ...getPosts().map((d) => ({ url: u(`/${d.slug}/`), lastModified: d.updated || d.date, changeFrequency: 'yearly' as const, priority: 0.6 })),
    { url: u('/contact-us/'), lastModified: today, changeFrequency: 'yearly', priority: 0.7 },
    { url: u('/privacy-policy/'), lastModified: '2026-09-29', changeFrequency: 'yearly', priority: 0.1 },
    { url: u('/terms-of-service/'), lastModified: '2026-09-29', changeFrequency: 'yearly', priority: 0.1 },
  ];
}
