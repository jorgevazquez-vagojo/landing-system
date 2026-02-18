import { prisma } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function TemplatesPage() {
  const templates = await prisma.template.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: 'desc' },
  });

  const categoryColors: Record<string, string> = {
    saas: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    marketing: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    ecommerce: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    agency: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
    events: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400',
    restaurant: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    fitness: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    finance: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400',
    realestate: 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400',
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Templates</h1>
        <p className="text-sm text-muted-foreground">Choose a template to start building your landing page.</p>
      </div>

      <div className="stagger-children grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/dashboard/landings/new"
          className="group flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:bg-primary/5"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            +
          </div>
          <h3 className="mt-4 font-semibold text-card-foreground">Blank Page</h3>
          <p className="mt-1 text-sm text-muted-foreground">Start from scratch</p>
        </Link>

        {templates.map((template) => (
          <div key={template.id} className="group rounded-xl bg-card shadow-sm ring-1 ring-border/50 transition-all hover:shadow-md hover:ring-border overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              {template.thumbnail ? (
                <img src={template.thumbnail} alt={template.name} className="h-full w-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-muted-foreground/30">{template.name.charAt(0)}</div>
                  <p className="mt-1 text-xs text-muted-foreground/50">{template.name}</p>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-card-foreground">{template.name}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[template.category] || 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'}`}>
                  {template.category}
                </span>
              </div>
              {template.description && (
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{template.description}</p>
              )}
              <a
                href={`/dashboard/landings/new?templateId=${template.id}`}
                className="inline-block rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Use Template
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
