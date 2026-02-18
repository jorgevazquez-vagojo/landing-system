import { prisma } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: 'desc' },
  });

  const categoryColors: Record<string, string> = {
    saas: 'bg-blue-100 text-blue-700',
    marketing: 'bg-green-100 text-green-700',
    ecommerce: 'bg-purple-100 text-purple-700',
    agency: 'bg-orange-100 text-orange-700',
    events: 'bg-pink-100 text-pink-700',
    restaurant: 'bg-red-100 text-red-700',
    fitness: 'bg-yellow-100 text-yellow-700',
    finance: 'bg-indigo-100 text-indigo-700',
    realestate: 'bg-teal-100 text-teal-700',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        <p className="text-sm text-gray-500">Choose a template to start building your landing page.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Blank template */}
        <Link
          href="/dashboard/landings/new"
          className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/50"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl group-hover:bg-blue-100">
            +
          </div>
          <h3 className="mt-4 font-semibold text-gray-900">Blank Page</h3>
          <p className="mt-1 text-sm text-gray-500">Start from scratch</p>
        </Link>

        {templates.map((template) => (
          <div key={template.id} className="group rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
              {template.thumbnail ? (
                <img src={template.thumbnail} alt={template.name} className="h-full w-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-gray-200">{template.name.charAt(0)}</div>
                  <p className="mt-1 text-xs text-gray-300">{template.name}</p>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[template.category] || 'bg-gray-100 text-gray-700'}`}>
                  {template.category}
                </span>
              </div>
              {template.description && (
                <p className="mb-4 text-sm text-gray-500 line-clamp-2">{template.description}</p>
              )}
              <UseTemplateButton templateId={template.id} templateName={template.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UseTemplateButton({ templateId, templateName }: { templateId: string; templateName: string }) {
  return (
    <form action={`/api/landings`} method="POST">
      <input type="hidden" name="templateId" value={templateId} />
      <input type="hidden" name="name" value={`${templateName} Copy`} />
      <a
        href={`/dashboard/landings/new?templateId=${templateId}`}
        className="inline-block rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
      >
        Use Template
      </a>
    </form>
  );
}
