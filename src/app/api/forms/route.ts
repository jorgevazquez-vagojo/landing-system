import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1),
  steps: z.array(z.unknown()).default([]),
  settings: z.record(z.unknown()).default({}),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const forms = await prisma.formDefinition.findMany({
    where: { companyId },
    include: { _count: { select: { submissions: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(forms);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const body = await req.json();
  const parsed = formSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const form = await prisma.formDefinition.create({
    data: {
      name: parsed.data.name,
      steps: parsed.data.steps as unknown as string,
      settings: parsed.data.settings as unknown as string,
      companyId,
    },
  });

  return NextResponse.json(form, { status: 201 });
}
