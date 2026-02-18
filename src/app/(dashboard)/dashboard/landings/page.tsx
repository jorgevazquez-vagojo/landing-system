import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { DeleteLandingButton } from './delete-button';

export const dynamic = 'force-dynamic';

export default async function LandingsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const landings = await prisma.landing.findMany({
    where: { companyId },
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { leads: true } } },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Landings</h1>
        <Link
          href="/dashboard/landings/new"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          + New Landing
        </Link>
      </div>

      {landings.length === 0 ? (
        <div className="rounded-xl bg-card py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-card-foreground">No landings yet</h3>
          <p className="mt-1 text-muted-foreground">Create your first landing page to get started.</p>
          <Link
            href="/dashboard/landings/new"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create Landing
          </Link>
        </div>
      ) : (
        <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {landings.map((landing) => (
            <div key={landing.id} className="group rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/50 transition-all hover:shadow-md hover:ring-border">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-card-foreground">{landing.name}</h3>
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
              {landing.description && (
                <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{landing.description}</p>
              )}
              <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span>{landing._count.leads} leads</span>
                <span>Updated {formatDate(landing.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/editor/${landing.id}`}
                  className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  Edit
                </Link>
                {landing.status === 'PUBLISHED' && (
                  <Link
                    href={`/p/${landing.slug}`}
                    target="_blank"
                    className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
                  >
                    View
                  </Link>
                )}
                <DeleteLandingButton landingId={landing.id} landingName={landing.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
