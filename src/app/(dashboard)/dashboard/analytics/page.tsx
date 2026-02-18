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

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500">Overview of your landing page performance.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Landings', value: totalLandings, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Published', value: publishedLandings, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total Leads', value: totalLeads, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Conversion Rate', value: totalLandings > 0 ? `${((totalLeads / Math.max(totalLandings, 1)) * 100).toFixed(1)}%` : '0%', color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Performing Landings</h2>
        {topLandings.length === 0 ? (
          <p className="text-gray-500">No data yet. Leads will be tracked here.</p>
        ) : (
          <div className="space-y-3">
            {topLandings.map((item, i) => (
              <div key={item.landingId} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{item.landing?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">/{item.landing?.slug}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{item._count.id}</p>
                  <p className="text-xs text-gray-500">leads</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
