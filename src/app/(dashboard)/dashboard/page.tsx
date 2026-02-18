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
    { label: 'Total Landings', value: landingsCount, icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-500/20' },
    { label: 'Published', value: publishedCount, icon: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-100 dark:bg-green-500/20' },
    { label: 'Total Leads', value: leadsCount, icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-500/20' },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user.name}
          </p>
        </div>
        <Link
          href="/dashboard/landings/new"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          + New Landing
        </Link>
      </div>

      <div className="stagger-children mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}>
                <svg className={`h-6 w-6 ${stat.color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">Recent Landings</h2>
        {recentLandings.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
            </div>
            <p className="text-muted-foreground">No landings yet.</p>
            <Link
              href="/dashboard/landings/new"
              className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
            >
              Create your first landing page
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentLandings.map((landing) => (
              <div key={landing.id} className="flex items-center justify-between py-3 transition-colors hover:bg-accent/50 -mx-2 px-2 rounded-lg">
                <div>
                  <Link
                    href={`/editor/${landing.id}`}
                    className="font-medium text-card-foreground hover:text-primary transition-colors"
                  >
                    {landing.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">/{landing.slug}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    landing.status === 'PUBLISHED'
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                      : landing.status === 'ARCHIVED'
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'
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
