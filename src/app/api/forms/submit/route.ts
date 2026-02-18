import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Public endpoint — form submissions
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { formId, visitorId, data, step, isComplete } = body;

  if (!formId || !visitorId) {
    return NextResponse.json({ error: 'formId and visitorId required' }, { status: 400 });
  }

  const form = await prisma.formDefinition.findUnique({ where: { id: formId } });
  if (!form) return NextResponse.json({ error: 'Form not found' }, { status: 404 });

  // Find existing submission or create new
  let submission = await prisma.formSubmission.findFirst({
    where: { formId, visitorId, isComplete: false },
    orderBy: { createdAt: 'desc' },
  });

  if (submission) {
    const existingData = (submission.data || {}) as Record<string, unknown>;
    submission = await prisma.formSubmission.update({
      where: { id: submission.id },
      data: {
        data: { ...existingData, ...data },
        completedSteps: step !== undefined ? step + 1 : submission.completedSteps + 1,
        isComplete: isComplete || false,
      },
    });
  } else {
    submission = await prisma.formSubmission.create({
      data: {
        formId,
        visitorId,
        data: data || {},
        completedSteps: step !== undefined ? step + 1 : 1,
        isComplete: isComplete || false,
      },
    });
  }

  return NextResponse.json(submission);
}
