import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;

  const [landingsCount, leadsCount, publishedCount, recentLandings] = await Promise.all([
    prisma.landing.count({ where: { companyId } }),
    prisma.lead.count({ where: { companyId } }),
    prisma.landing.count({ where: { companyId, status: 'PUBLISHED' } }),
    prisma.landing.findMany({
      where: { companyId },
      orderBy: { updatedAt: 'desc' },
      take: 5,
    }),
  ]);

  const stats = [
    { label: 'Total Landings', value: landingsCount, color: 'bg-blue-500' },
    { label: 'Published', value: publishedCount, color: 'bg-green-500' },
    { label: 'Total Leads', value: leadsCount, color: 'bg-purple-500' },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {session.user.name}
          </p>
        </div>
        <Link
          href="/dashboard/landings/new"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          + New Landing
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`h-12 w-12 rounded-lg ${stat.color} flex items-center justify-center text-xl font-bold text-white`}>
                {stat.value}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Landings</h2>
        {recentLandings.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No landings yet.</p>
            <Link
              href="/dashboard/landings/new"
              className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
            >
              Create your first landing page
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {recentLandings.map((landing) => (
              <div key={landing.id} className="flex items-center justify-between py-3">
                <div>
                  <Link
                    href={`/editor/${landing.id}`}
                    className="font-medium text-gray-900 hover:text-primary"
                  >
                    {landing.name}
                  </Link>
                  <p className="text-sm text-gray-500">/{landing.slug}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    landing.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-700'
                      : landing.status === 'ARCHIVED'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {landing.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
