import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const ruleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  conditions: z.array(z.unknown()).default([]),
  actions: z.array(z.unknown()).default([]),
  priority: z.number().default(0),
  enabled: z.boolean().default(true),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const rules = await prisma.personalizationRule.findMany({
    where: { companyId },
    orderBy: { priority: 'desc' },
  });

  return NextResponse.json(rules);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const body = await req.json();
  const parsed = ruleSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const rule = await prisma.personalizationRule.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      conditions: parsed.data.conditions as unknown as string,
      actions: parsed.data.actions as unknown as string,
      priority: parsed.data.priority,
      enabled: parsed.data.enabled,
      companyId,
    },
  });

  return NextResponse.json(rule, { status: 201 });
}
