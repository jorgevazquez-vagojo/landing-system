import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const [totalLeads, totalLandings, publishedLandings, recentLeads] = await Promise.all([
    prisma.lead.count({ where: { companyId } }),
    prisma.landing.count({ where: { companyId } }),
    prisma.landing.count({ where: { companyId, status: 'PUBLISHED' } }),
    prisma.lead.groupBy({
      by: ['landingId'],
      where: { companyId },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    }),
  ]);

  const topLandings = await Promise.all(
    recentLeads.map(async (group) => {
      const landing = await prisma.landing.findUnique({
        where: { id: group.landingId },
        select: { name: true, slug: true, status: true },
      });
      return { ...group, landing };
    })
  );

  const stats = [
    { label: 'Total Landings', value: totalLandings, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/20' },
    { label: 'Published', value: publishedLandings, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-500/20' },
    { label: 'Total Leads', value: totalLeads, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-500/20' },
    { label: 'Conversion Rate', value: totalLandings > 0 ? `${((totalLeads / Math.max(totalLandings, 1)) * 100).toFixed(1)}%` : '0%', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-100 dark:bg-orange-500/20' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">Overview of your landing page performance.</p>
      </div>

      <div className="stagger-children mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">Top Performing Landings</h2>
        {topLandings.length === 0 ? (
          <p className="text-muted-foreground">No data yet. Leads will be tracked here.</p>
        ) : (
          <div className="space-y-3">
            {topLandings.map((item, i) => (
              <div key={item.landingId} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-card-foreground">{item.landing?.name || 'Unknown'}</p>
                    <p className="text-xs text-muted-foreground">/{item.landing?.slug}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-card-foreground">{item._count.id}</p>
                  <p className="text-xs text-muted-foreground">leads</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
