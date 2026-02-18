import { NextResponse } from 'next/server';
import { getTemplate } from '@/lib/templates';

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/templates/:slug
 *
 * Returns full template definition including all sections.
 */
export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);

  if (!template) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }

  return NextResponse.json(template, {
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' },
  });
}
