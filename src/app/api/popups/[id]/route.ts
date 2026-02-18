import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const { id } = await params;

  const popup = await prisma.popup.findFirst({
    where: { id, companyId },
    include: { _count: { select: { events: true } } },
  });
  if (!popup) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(popup);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const { id } = await params;

  const existing = await prisma.popup.findFirst({ where: { id, companyId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = await req.json();
  const popup = await prisma.popup.update({ where: { id }, data: body });
  return NextResponse.json(popup);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const { id } = await params;

  const existing = await prisma.popup.findFirst({ where: { id, companyId } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.popup.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
