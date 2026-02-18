import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.AUTH_URL || 'http://localhost:3000';

  return {
    rules: [
      // General crawlers
      {
        userAgent: '*',
        allow: ['/p/', '/llms.txt', '/.well-known/'],
        disallow: ['/dashboard/', '/editor/', '/api/', '/login', '/register'],
      },
      // LLM crawlers — explicit allow for published pages
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Claude-Web', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended', 'cohere-ai', 'Google-Extended'],
        allow: ['/p/', '/llms.txt', '/.well-known/', '/sitemap.xml'],
        disallow: ['/dashboard/', '/editor/', '/api/', '/login', '/register'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
