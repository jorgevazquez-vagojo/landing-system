import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const availableIntegrations = [
  { type: 'binnacle', name: 'Binnacle CRM', description: 'Sync leads bidirectionally with Binnacle.', icon: '🔄', color: 'bg-blue-100' },
  { type: 'ga4', name: 'Google Analytics 4', description: 'Track page views and events with GA4.', icon: '📊', color: 'bg-yellow-100' },
  { type: 'gtm', name: 'Google Tag Manager', description: 'Manage all your tags in one place.', icon: '🏷️', color: 'bg-green-100' },
  { type: 'facebook', name: 'Meta Pixel', description: 'Track conversions from Facebook & Instagram ads.', icon: '📘', color: 'bg-indigo-100' },
  { type: 'linkedin', name: 'LinkedIn Insight', description: 'Track conversions from LinkedIn ads.', icon: '💼', color: 'bg-sky-100' },
  { type: 'tiktok', name: 'TikTok Pixel', description: 'Track conversions from TikTok ads.', icon: '🎵', color: 'bg-pink-100' },
  { type: 'google-ads', name: 'Google Ads', description: 'Import leads from Google Ads lead forms.', icon: '🎯', color: 'bg-red-100' },
  { type: 'meta-ads', name: 'Meta Lead Ads', description: 'Import leads from Facebook/Instagram lead forms.', icon: '📱', color: 'bg-purple-100' },
  { type: 'microsoft-ads', name: 'Microsoft Ads', description: 'Import leads from Microsoft Advertising.', icon: '🪟', color: 'bg-cyan-100' },
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
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="text-sm text-gray-500">Connect your landing pages with analytics, CRM, and ad platforms.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableIntegrations.map((integration) => {
          const isEnabled = enabledTypes.has(integration.type);
          return (
            <div key={integration.type} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${integration.color} text-lg`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    <p className="text-xs text-gray-500">{integration.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {isEnabled ? 'Connected' : 'Not connected'}
                </span>
                <button className="text-sm font-medium text-primary hover:underline">
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
