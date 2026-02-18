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
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-6">
        {/* Company info */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Company</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">Name</label>
              <p className="text-gray-900">{company.name}</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">Slug</label>
              <p className="text-gray-500">{company.slug}</p>
            </div>
          </div>
        </div>

        {/* Team members */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Team Members</h2>
          <div className="space-y-3">
            {company.users.map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : user.role === 'EDITOR' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Domains */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Custom Domains</h2>
          {company.domains.length === 0 ? (
            <p className="text-sm text-gray-500">No custom domains configured. Your landings are available at the default URL.</p>
          ) : (
            <div className="space-y-2">
              {company.domains.map((domain) => (
                <div key={domain.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="font-mono text-sm text-gray-900">{domain.hostname}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${domain.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
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
