import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { LandingRenderer } from './renderer';

export const revalidate = 60; // ISR: revalidate every 60 seconds

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    },
    twitter: {
      card: (meta.twitterCard as 'summary' | 'summary_large_image') || 'summary_large_image',
    },
    robots: meta.noIndex ? { index: false } : undefined,
  };
}

export default async function PublishedLandingPage({ params }: Props) {
  const { slug } = await params;
  const landing = await prisma.landing.findFirst({
    where: { slug, status: 'PUBLISHED' },
    include: { company: { select: { name: true } } },
  });

  if (!landing) notFound();

  const sections = (landing.sections || []) as Array<{ id: string; type: string; variant?: string; props: Record<string, unknown>; order: number }>;
  const meta = (landing.seoMeta || {}) as Record<string, unknown>;

  return (
    <>
      {meta.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(meta.structuredData) }}
        />
      )}
      <LandingRenderer sections={sections} landingId={landing.id} />
    </>
  );
}
