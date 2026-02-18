import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  landingId: z.string().min(1),
  variants: z.array(z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    weight: z.number().min(1).max(100).default(50),
    sections: z.unknown().default([]),
    isControl: z.boolean().default(false),
  })).min(2),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const experiments = await prisma.experiment.findMany({
    where: { companyId },
    include: {
      variants: true,
      landing: { select: { name: true, slug: true } },
      _count: { select: { events: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(experiments);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const { name, description, landingId, variants } = parsed.data;

  const landing = await prisma.landing.findFirst({ where: { id: landingId, companyId } });
  if (!landing) return NextResponse.json({ error: 'Landing not found' }, { status: 404 });

  const experiment = await prisma.experiment.create({
    data: {
      name,
      description,
      landingId,
      companyId,
      variants: {
        create: variants.map((v) => ({
          name: v.name,
          slug: v.slug,
          weight: v.weight,
          sections: v.sections as unknown as string,
          isControl: v.isControl,
        })),
      },
    },
    include: { variants: true },
  });

  return NextResponse.json(experiment, { status: 201 });
}
