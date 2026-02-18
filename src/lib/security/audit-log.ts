// ---------------------------------------------------------------------------
// Audit log — records security-relevant actions via Prisma
// ---------------------------------------------------------------------------

import { prisma } from '@/lib/db';

/**
 * Parameters for logging an auditable action.
 */
export interface AuditLogParams {
  /** Machine-readable action name (e.g. "landing.publish", "user.login"). */
  action: string;
  /** Entity type (e.g. "Landing", "User", "Lead"). */
  entity: string;
  /** Primary key of the affected entity. */
  entityId?: string | null;
  /** Arbitrary JSON-serialisable details about the action. */
  details?: Record<string, unknown>;
  /** ID of the user who performed the action. */
  userId?: string | null;
  /** ID of the company context. */
  companyId: string;
}

/**
 * Represents a persisted audit log entry.
 */
export interface AuditLogEntry {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  details: Record<string, unknown>;
  userId: string | null;
  companyId: string;
  createdAt: Date;
}

/**
 * Persist an audit log entry to the database.
 *
 * This function is intentionally fire-and-forget safe: it catches and logs
 * errors internally so callers do not need to wrap it in try/catch. However
 * it also returns the created record when successful, so callers *can* await
 * it for confirmation.
 *
 * @param params - The action details to record.
 * @returns The created audit log entry, or `null` if the write failed.
 *
 * @example
 * ```ts
 * await logAction({
 *   action: 'landing.publish',
 *   entity: 'Landing',
 *   entityId: landing.id,
 *   details: { slug: landing.slug, status: 'PUBLISHED' },
 *   userId: session.user.id,
 *   companyId: session.user.companyId,
 * });
 * ```
 */
export async function logAction(params: AuditLogParams): Promise<AuditLogEntry | null> {
  try {
    const entry = await prisma.auditLog.create({
      data: {
        action: params.action,
        entity: params.entity,
        entityId: params.entityId ?? null,
        details: (params.details ?? {}) as any,
        userId: params.userId ?? null,
        companyId: params.companyId,
      },
    });

    return entry as AuditLogEntry;
  } catch (error) {
    console.error('[audit-log] Failed to write audit log entry:', error);
    return null;
  }
}

/**
 * Query audit log entries with optional filters.
 *
 * @param filters - Partial match filters.
 * @param limit   - Maximum number of entries to return (default 50).
 * @returns Array of matching audit log entries, newest first.
 */
export async function queryAuditLog(
  filters: {
    companyId: string;
    action?: string;
    entity?: string;
    entityId?: string;
    userId?: string;
  },
  limit = 50,
): Promise<AuditLogEntry[]> {
  const where: Record<string, unknown> = {
    companyId: filters.companyId,
  };

  if (filters.action) where.action = filters.action;
  if (filters.entity) where.entity = filters.entity;
  if (filters.entityId) where.entityId = filters.entityId;
  if (filters.userId) where.userId = filters.userId;

  const entries = await prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return entries as AuditLogEntry[];
}
