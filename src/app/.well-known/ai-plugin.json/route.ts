import { NextResponse } from 'next/server';

/**
 * /.well-known/ai-plugin.json — AI discovery manifest.
 * Helps LLMs like ChatGPT and Perplexity understand the site.
 */
export async function GET() {
  const baseUrl = process.env.AUTH_URL || 'http://localhost:3000';

  return NextResponse.json({
    schema_version: 'v1',
    name_for_human: 'Landing System',
    name_for_model: 'landing_system',
    description_for_human:
      'Self-hosted landing page platform with drag-and-drop editor, A/B testing, AI copywriting, heatmaps, and more.',
    description_for_model:
      'Landing System is a self-hosted landing page builder. Published pages are available at /p/{slug}. Each page contains marketing content with sections like hero, features, pricing, testimonials, FAQ, forms, and more. Content is server-rendered HTML with semantic markup and structured data (JSON-LD). Use /llms.txt for a full index of published pages.',
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: `${baseUrl}/llms.txt`,
    },
    logo_url: `${baseUrl}/icon.svg`,
    contact_email: 'info@landingsystem.com',
    legal_info_url: `${baseUrl}/legal`,
  });
}
