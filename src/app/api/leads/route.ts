import { NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

const createLeadSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  landingId: z.string().optional(),
  source: z.string().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const leads = await prisma.lead.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: { landing: { select: { name: true, slug: true } } },
    take: 200,
  });

  return NextResponse.json(leads);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createLeadSchema.parse(body);

    if (!data.landingId) {
      return NextResponse.json({ error: 'landingId is required' }, { status: 400 });
    }

    const landing = await prisma.landing.findUnique({
      where: { id: data.landingId },
      select: { id: true, companyId: true },
    });

    if (!landing) {
      return NextResponse.json({ error: 'Landing not found' }, { status: 404 });
    }

    const lead = await prisma.lead.create({
      data: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        data: {
          message: data.message,
          company: data.company,
          subject: data.subject,
        },
        source: data.source || 'form',
        landingId: landing.id,
        companyId: landing.companyId,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 });
    }
    console.error('Create lead error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
