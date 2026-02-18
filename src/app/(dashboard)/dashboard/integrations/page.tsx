import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const availableIntegrations = [
  { type: 'binnacle', name: 'Binnacle CRM', description: 'Sync leads bidirectionally with Binnacle.', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', color: 'bg-blue-100 dark:bg-blue-500/20' },
  { type: 'ga4', name: 'Google Analytics 4', description: 'Track page views and events with GA4.', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'bg-yellow-100 dark:bg-yellow-500/20' },
  { type: 'gtm', name: 'Google Tag Manager', description: 'Manage all your tags in one place.', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', color: 'bg-green-100 dark:bg-green-500/20' },
  { type: 'facebook', name: 'Meta Pixel', description: 'Track conversions from Facebook & Instagram ads.', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', color: 'bg-indigo-100 dark:bg-indigo-500/20' },
  { type: 'linkedin', name: 'LinkedIn Insight', description: 'Track conversions from LinkedIn ads.', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z', color: 'bg-sky-100 dark:bg-sky-500/20' },
  { type: 'tiktok', name: 'TikTok Pixel', description: 'Track conversions from TikTok ads.', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z', color: 'bg-pink-100 dark:bg-pink-500/20' },
  { type: 'google-ads', name: 'Google Ads', description: 'Import leads from Google Ads lead forms.', icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122', color: 'bg-red-100 dark:bg-red-500/20' },
  { type: 'meta-ads', name: 'Meta Lead Ads', description: 'Import leads from Facebook/Instagram lead forms.', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'bg-purple-100 dark:bg-purple-500/20' },
  { type: 'microsoft-ads', name: 'Microsoft Ads', description: 'Import leads from Microsoft Advertising.', icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z', color: 'bg-cyan-100 dark:bg-cyan-500/20' },
];

export default async function IntegrationsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const integrations = await prisma.integration.findMany({
    where: { companyId },
  });

  const enabledTypes = new Set(integrations.filter((i) => i.enabled).map((i) => i.type));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
        <p className="text-sm text-muted-foreground">Connect your landing pages with analytics, CRM, and ad platforms.</p>
      </div>

      <div className="stagger-children grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableIntegrations.map((integration) => {
          const isEnabled = enabledTypes.has(integration.type);
          return (
            <div key={integration.type} className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/50 transition-all hover:shadow-md hover:ring-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${integration.color}`}>
                    <svg className="h-5 w-5 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={integration.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{integration.name}</h3>
                    <p className="text-xs text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${isEnabled ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-muted text-muted-foreground'}`}>
                  {isEnabled ? 'Connected' : 'Not connected'}
                </span>
                <button className="text-sm font-medium text-primary transition-colors hover:underline">
                  {isEnabled ? 'Configure' : 'Connect'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
