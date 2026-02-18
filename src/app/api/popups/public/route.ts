import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Public endpoint — returns active popups for a landing page
export async function GET(req: NextRequest) {
  const landingId = req.nextUrl.searchParams.get('landingId');
  if (!landingId) return NextResponse.json({ error: 'landingId required' }, { status: 400 });

  const popups = await prisma.popup.findMany({
    where: { landingId, status: 'ACTIVE' },
    select: {
      id: true,
      type: true,
      content: true,
      style: true,
      triggers: true,
      targeting: true,
    },
  });

  return NextResponse.json(popups);
}

// Track popup events
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { popupId, type, visitorId, metadata } = body;

  if (!popupId || !type || !visitorId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  await prisma.popupEvent.create({
    data: {
      type,
      visitorId,
      popupId,
      metadata: metadata || {},
    },
  });

  return NextResponse.json({ success: true });
}
