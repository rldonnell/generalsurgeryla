import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import settingsJson from '@/content/settings.json';
import faqsJson from '@/content/faqs.json';

export type Faq = { q: string; a: string };
export type Settings = typeof settingsJson;
export const settings: Settings = settingsJson;
export const allFaqs: Faq[] = (faqsJson as { items: Faq[] }).items;

const root = path.join(process.cwd(), 'content');

export type Heading = { id: string; text: string };

export type Doc = {
  kind: 'procedure' | 'page' | 'post';
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  html: string;
  headings: Heading[];
  videos: string[];
  updated: string;
  // procedures
  navLabel?: string;
  order?: number;
  area?: string;
  summary?: string;
  faqs?: Faq[];
  // posts
  date?: string;
  excerpt?: string;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function render(md: string) {
  const headings: Heading[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = (text: string, level: number) => {
    const id = slugify(text);
    if (level === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, '') });
    return `<h${level} id="${id}">${text}</h${level}>`;
  };
  renderer.link = (href: string, title: string | null | undefined, text: string) => {
    const external = /^https?:\/\//.test(href) && !href.includes('generalsurgeryla.com');
    const t = title ? ` title="${title}"` : '';
    return external
      ? `<a href="${href}"${t} rel="noopener" target="_blank">${text}</a>`
      : `<a href="${href}"${t}>${text}</a>`;
  };
  const html = marked.parse(md, { renderer, async: false }) as string;
  return { html, headings };
}

function readDir(dir: string, kind: Doc['kind']): Doc[] {
  const full = path.join(root, dir);
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, content } = matter(raw);
      const { html, headings } = render(content);
      return {
        kind,
        slug: f.replace(/\.md$/, ''),
        title: data.title,
        metaTitle: data.metaTitle || data.title,
        description: data.description || '',
        html,
        headings,
        videos: data.videos || [],
        updated: String(data.updated || data.date || ''),
        navLabel: data.navLabel,
        order: data.order,
        area: data.area,
        summary: data.summary,
        faqs: data.faqs || [],
        date: data.date ? String(data.date) : undefined,
        excerpt: data.excerpt,
      } as Doc;
    });
}

let cache: { procedures: Doc[]; pages: Doc[]; posts: Doc[] } | null = null;
function load() {
  if (!cache) {
    cache = {
      procedures: readDir('procedures', 'procedure').sort((a, b) => (a.order || 0) - (b.order || 0)),
      pages: readDir('pages', 'page'),
      posts: readDir('blog', 'post').sort((a, b) => String(b.date).localeCompare(String(a.date))),
    };
  }
  return cache;
}

export const getProcedures = () => load().procedures;
export const getPages = () => load().pages;
export const getPosts = () => load().posts;
export const getDoc = (slug: string) =>
  [...load().procedures, ...load().pages, ...load().posts].find((d) => d.slug === slug);
export const url = (slug: string) => `${settings.baseUrl}/${slug}/`;
