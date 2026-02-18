interface Logo {
  name: string;
  url?: string;
  image?: string;
}

export function LogoCloud(props: Record<string, unknown>) {
  const title = (props.title as string) || 'Trusted by leading companies';
  const logos = (props.logos as Logo[]) || [];
  const variant = (props.variant as string) || 'simple';

  const placeholders = logos.length > 0 ? logos : [
    { name: 'Company 1' }, { name: 'Company 2' }, { name: 'Company 3' },
    { name: 'Company 4' }, { name: 'Company 5' },
  ];

  return (
    <section className="py-12 px-4">
      <div className="mx-auto max-w-6xl">
        {variant === 'with-title' && (
          <h2 className="mb-8 text-center text-lg font-medium text-gray-500">{title}</h2>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {placeholders.map((logo, i) => (
            <div key={i} className="flex h-12 items-center px-4">
              {logo.image ? (
                <img src={logo.image} alt={logo.name} className="h-8 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
              ) : (
                <span className="text-lg font-bold text-gray-300">{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
