import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-webhook-secret');
    if (secret !== process.env.GOOGLE_ADS_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    const body = await req.json();
    const { email, name, phone, landingId, companyId } = body;

    if (!email || !landingId || !companyId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        email,
        name,
        phone,
        source: 'google-ads',
        data: body,
        landingId,
        companyId,
      },
    });

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (err) {
    console.error('Google Ads webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
