import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const leads = await prisma.lead.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: { landing: { select: { name: true, slug: true } } },
    take: 200,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground">{leads.length} total leads captured</p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="rounded-xl bg-card py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-500/20">
            <svg className="h-8 w-8 text-purple-600 dark:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-card-foreground">No leads yet</h3>
          <p className="mt-1 text-muted-foreground">Leads will appear here when visitors submit forms on your landing pages.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border/50">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Landing</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Source</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map((lead) => (
                <tr key={lead.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-card-foreground">{lead.name || lead.email}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                      {lead.phone && <p className="text-sm text-muted-foreground/70">{lead.phone}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-card-foreground">{lead.landing.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
