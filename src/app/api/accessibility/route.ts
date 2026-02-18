import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { auditSections } from '@/lib/accessibility';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const body = await req.json();
  const { landingId } = body;

  if (!landingId) return NextResponse.json({ error: 'landingId required' }, { status: 400 });

  const landing = await prisma.landing.findFirst({
    where: { id: landingId, companyId },
    select: { sections: true },
  });

  if (!landing) return NextResponse.json({ error: 'Landing not found' }, { status: 404 });

  const sections = (landing.sections || []) as Array<{ id: string; type: string; props: Record<string, unknown> }>;
  const result = auditSections(sections);

  // Save audit result
  const audit = await prisma.accessibilityAudit.create({
    data: {
      landingId,
      companyId,
      score: result.score,
      issues: result.issues as unknown as string,
      summary: result.summary as unknown as string,
    },
  });

  return NextResponse.json({ ...result, id: audit.id });
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const landingId = req.nextUrl.searchParams.get('landingId');

  const where: Record<string, unknown> = { companyId };
  if (landingId) where.landingId = landingId;

  const audits = await prisma.accessibilityAudit.findMany({
    where,
    include: { landing: { select: { name: true, slug: true } } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json(audits);
}
