import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { LandingRenderer } from './renderer';
import { generateStructuredData } from '@/lib/seo/schema-org';
import { extractLlmContent } from '@/lib/seo/llm-content';

export const revalidate = 60; // ISR: revalidate every 60 seconds

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.AUTH_URL || 'http://localhost:3000';
  const landing = await prisma.landing.findFirst({
    where: { slug, status: 'PUBLISHED' },
  });

  if (!landing) return {};

  const meta = (landing.seoMeta || {}) as Record<string, string>;

  return {
    title: meta.title || landing.name,
    description: meta.description || landing.description || '',
    openGraph: {
      title: meta.ogTitle || meta.title || landing.name,
      description: meta.ogDescription || meta.description || landing.description || '',
      images: meta.ogImage ? [{ url: meta.ogImage }] : [],
      type: 'website',
      url: `${baseUrl}/p/${slug}`,
      siteName: 'Landing System',
    },
    twitter: {
      card: (meta.twitterCard as 'summary' | 'summary_large_image') || 'summary_large_image',
    },
    alternates: {
      canonical: meta.canonical || `${baseUrl}/p/${slug}`,
    },
    robots: meta.noIndex ? { index: false } : { index: true, follow: true },
    other: {
      'ai-content-declaration': 'human-curated',
    },
  };
}

export default async function PublishedLandingPage({ params }: Props) {
  const { slug } = await params;
  const baseUrl = process.env.AUTH_URL || 'http://localhost:3000';
  const landing = await prisma.landing.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: { company: { select: { name: true, slug: true } } },
  });

  if (!landing) notFound();

  const sections = (landing.sections || []) as Array<{ id: string; type: string; variant?: string; props: Record<string, unknown>; order: number }>;
  const meta = (landing.seoMeta || {}) as Record<string, unknown>;

  // Auto-generate structured data from sections
  const structuredData = generateStructuredData(
    {
      name: landing.name,
      slug: landing.slug,
      description: landing.description,
      sections,
      publishedAt: landing.publishedAt,
      updatedAt: landing.updatedAt,
    },
    {
      name: landing.company.name,
      slug: landing.company.slug,
      url: baseUrl,
    },
  );

  // Add manual structured data if present
  if (meta.structuredData) {
    structuredData.push(meta.structuredData as Record<string, unknown>);
  }

  // Extract plain-text content for LLM crawlers (hidden in HTML, visible to bots)
  const llmContent = extractLlmContent(sections, landing.name, landing.description);

  return (
    <>
      {/* Structured data for search engines and LLMs */}
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Machine-readable content summary for LLM crawlers */}
      <div
        data-llm-content="true"
        style={{ display: 'none' }}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: llmContent }}
      />

      <LandingRenderer sections={sections} landingId={landing.id} />
    </>
  );
}
