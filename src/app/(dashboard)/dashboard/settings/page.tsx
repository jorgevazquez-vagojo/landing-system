import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      users: { select: { id: true, name: true, email: true, role: true, createdAt: true } },
      domains: true,
    },
  });

  if (!company) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      <div className="stagger-children space-y-6">
        <div className="rounded-xl bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Company</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Name</label>
              <p className="text-card-foreground">{company.name}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Slug</label>
              <p className="text-muted-foreground">{company.slug}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Team Members</h2>
          <div className="space-y-3">
            {company.users.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 transition-colors hover:bg-muted">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' : user.role === 'EDITOR' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">Custom Domains</h2>
          {company.domains.length === 0 ? (
            <p className="text-sm text-muted-foreground">No custom domains configured. Your landings are available at the default URL.</p>
          ) : (
            <div className="space-y-2">
              {company.domains.map((domain) => (
                <div key={domain.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3">
                  <span className="font-mono text-sm text-card-foreground">{domain.hostname}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${domain.verified ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'}`}>
                    {domain.verified ? 'Verified' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
