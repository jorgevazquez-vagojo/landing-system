interface Testimonial {
  name: string;
  role?: string;
  quote: string;
  avatar?: string;
}

export function Testimonials(props: Record<string, unknown>) {
  const title = (props.title as string) || 'What our customers say';
  const items = (props.items as Testimonial[]) || [];
  const variant = (props.variant as string) || 'cards';

  if (items.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-gray-500">Add testimonials to build trust.</p>
        </div>
      </section>
    );
  }

  if (variant === 'grid') {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">{title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <div key={i} className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-gray-600 italic">&ldquo;{item.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    {item.role && <p className="text-sm text-gray-500">{item.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">{title}</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
              <div className="mb-4 text-3xl text-blue-500">&ldquo;</div>
              <p className="mb-6 text-gray-600 leading-relaxed">{item.quote}</p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-sm font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  {item.role && <p className="text-sm text-gray-500">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
