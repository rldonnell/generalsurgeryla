import type { MetadataRoute } from 'next';
import { settings as s } from '@/lib/content';

// AI crawlers are explicitly welcome: being quoted by ChatGPT, Perplexity,
// Gemini and Google AI Overviews is part of the goal for this site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/thank-you/'] },
      { userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot'], allow: '/' },
    ],
    sitemap: `${s.baseUrl}/sitemap.xml`,
    host: s.baseUrl,
  };
}
