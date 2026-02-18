import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.AUTH_URL || 'http://localhost:3000';

  const landings = await prisma.landing.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...landings.map((landing) => ({
      url: `${baseUrl}/p/${landing.slug}`,
      lastModified: landing.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    })),
  ];
}
