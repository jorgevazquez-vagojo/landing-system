import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  const session = await auth();
  if (!session?.user) return null;

  const companyId = (session.user as Record<string, unknown>).companyId as string;
  const media = await prisma.media.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Media Library</h1>
          <p className="text-sm text-muted-foreground">{media.length} files</p>
        </div>
        <label className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md">
          Upload File
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      {media.length === 0 ? (
        <div className="rounded-xl bg-card py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-card-foreground">No media yet</h3>
          <p className="mt-1 text-muted-foreground">Upload images to use in your landing pages.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-lg bg-muted ring-1 ring-border/50 transition-all hover:ring-border hover:shadow-md">
              {item.type.startsWith('image/') ? (
                <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <span className="text-sm">{item.name}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <p className="w-full truncate px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
