export function Video(props: Record<string, unknown>) {
  const url = (props.url as string) || '';
  const title = (props.title as string) || '';
  const variant = (props.variant as string) || 'embed';

  function getEmbedUrl(rawUrl: string): string {
    if (rawUrl.includes('youtube.com/watch')) {
      const id = new URL(rawUrl).searchParams.get('v');
      return `https://www.youtube.com/embed/${id}`;
    }
    if (rawUrl.includes('youtu.be/')) {
      const id = rawUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (rawUrl.includes('vimeo.com/')) {
      const id = rawUrl.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${id}`;
    }
    return rawUrl;
  }

  const embedUrl = getEmbedUrl(url);

  if (variant === 'hero-video') {
    return (
      <section className="py-16 px-4 bg-gray-900">
        <div className="mx-auto max-w-5xl text-center">
          {title && <h2 className="mb-8 text-3xl font-bold text-white">{title}</h2>}
          <div className="aspect-video overflow-hidden rounded-2xl shadow-2xl">
            {embedUrl ? (
              <iframe src={embedUrl} className="h-full w-full" allowFullScreen title={title} />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-800 text-gray-400">
                Add a YouTube or Vimeo URL
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-4xl">
        {title && <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">{title}</h2>}
        <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
          {embedUrl ? (
            <iframe src={embedUrl} className="h-full w-full" allowFullScreen title={title} />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
              Add a YouTube or Vimeo URL
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
