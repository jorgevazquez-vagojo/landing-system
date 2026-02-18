interface StatItem {
  value: string;
  label: string;
}

export function Stats(props: Record<string, unknown>) {
  const items = (props.items as StatItem[]) || [];
  const variant = (props.variant as string) || 'row';

  if (items.length === 0) {
    return (
      <section className="py-12 px-4 bg-blue-600">
        <p className="text-center text-white/70">Add stats to showcase your numbers.</p>
      </section>
    );
  }

  if (variant === 'cards') {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl bg-white p-6 text-center shadow-sm border border-gray-100">
              <p className="text-4xl font-bold text-blue-600">{item.value}</p>
              <p className="mt-2 text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-blue-600 py-12 px-4">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-12 md:gap-16">
        {items.map((item, i) => (
          <div key={i} className="text-center">
            <p className="text-4xl font-bold text-white">{item.value}</p>
            <p className="mt-1 text-sm text-blue-100">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
