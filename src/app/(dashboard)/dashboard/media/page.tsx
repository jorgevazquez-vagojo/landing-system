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
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500">{media.length} files</p>
        </div>
        <label className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Upload File
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      {media.length === 0 ? (
        <div className="rounded-xl bg-white py-16 text-center shadow-sm">
          <div className="text-4xl">🖼️</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">No media yet</h3>
          <p className="mt-1 text-gray-500">Upload images to use in your landing pages.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {media.map((item) => (
            <div key={item.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {item.type.startsWith('image/') ? (
                <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
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
