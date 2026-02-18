import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { generateContent, type AIProvider } from '@/lib/ai/provider';
import { z } from 'zod';

const generateSchema = z.object({
  prompt: z.string().min(1),
  type: z.enum(['headline', 'description', 'cta', 'full_section', 'full_page']),
  provider: z.enum(['openai', 'anthropic', 'google']).optional(),
  context: z.object({
    industry: z.string().optional(),
    targetAudience: z.string().optional(),
    tone: z.string().optional(),
    existingContent: z.string().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const body = await req.json();
  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  // Get AI settings from company
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { aiSettings: true },
  });

  const aiSettings = (company?.aiSettings || {}) as Record<string, Record<string, string>>;
  const provider = (parsed.data.provider || Object.keys(aiSettings)[0] || 'openai') as AIProvider;
  const providerSettings = aiSettings[provider];

  if (!providerSettings?.apiKey) {
    return NextResponse.json(
      { error: `No API key configured for ${provider}. Go to Settings to add your API key.` },
      { status: 400 }
    );
  }

  try {
    const result = await generateContent(
      { provider, apiKey: providerSettings.apiKey, model: providerSettings.model },
      { prompt: parsed.data.prompt, type: parsed.data.type, context: parsed.data.context }
    );
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'AI generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
