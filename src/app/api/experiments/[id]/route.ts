import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const { id } = await params;

  const experiment = await prisma.experiment.findFirst({
    where: { id, companyId },
    include: {
      variants: { include: { _count: { select: { events: true } } } },
      landing: { select: { name: true, slug: true } },
    },
  });

  if (!experiment) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(experiment);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const { id } = await params;

  const body = await req.json();

  const existing = await prisma.experiment.findFirst({ where: { id, companyId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.status !== undefined) {
    updateData.status = body.status;
    if (body.status === 'RUNNING' && !existing.startedAt) updateData.startedAt = new Date();
    if (body.status === 'COMPLETED') updateData.endedAt = new Date();
  }

  const experiment = await prisma.experiment.update({
    where: { id },
    data: updateData,
    include: { variants: true },
  });

  return NextResponse.json(experiment);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const { id } = await params;

  const existing = await prisma.experiment.findFirst({ where: { id, companyId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.experiment.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
