import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { slugify } from '@/lib/utils';

const createSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().optional(),
  description: z.string().optional(),
  templateId: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const landings = await prisma.landing.findMany({
    where: { companyId },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { leads: true } } },
  });

  return NextResponse.json(landings);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const role = (session.user as Record<string, unknown>).role as string;
  if (role === 'VIEWER') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const data = createSchema.parse(body);

    let sections: unknown[] = [];
    if (data.templateId) {
      const template = await prisma.template.findUnique({ where: { id: data.templateId } });
      if (template) {
        sections = template.sections as unknown[];
      }
    }

    const slug = data.slug || slugify(data.name);
    const landing = await prisma.landing.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        sections: sections as never,
        companyId,
        templateId: data.templateId,
      },
    });

    return NextResponse.json(landing, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 });
    }
    console.error('Create landing error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
