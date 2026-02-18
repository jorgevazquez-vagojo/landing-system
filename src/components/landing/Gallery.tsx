interface GalleryImage {
  src: string;
  alt?: string;
}

export function Gallery(props: Record<string, unknown>) {
  const images = (props.images as GalleryImage[]) || [];
  const variant = (props.variant as string) || 'grid';

  if (images.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                Image {n}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'masonry') {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl columns-2 gap-4 md:columns-3">
          {images.map((img, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <img src={img.src} alt={img.alt || ''} className="w-full rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((img, i) => (
            <div key={i} className="aspect-video overflow-hidden rounded-lg">
              <img src={img.src} alt={img.alt || ''} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
