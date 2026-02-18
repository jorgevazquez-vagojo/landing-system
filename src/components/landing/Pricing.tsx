interface Plan {
  name: string;
  price: string;
  description?: string;
  features: string[];
  ctaText?: string;
  highlighted?: boolean;
}

export function Pricing(props: Record<string, unknown>) {
  const title = (props.title as string) || 'Pricing';
  const subtitle = (props.subtitle as string) || '';
  const plans = (props.plans as Plan[]) || [];
  const variant = (props.variant as string) || 'three-tier';

  if (plans.length === 0) {
    return (
      <section id="pricing" className="py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-gray-500">Add pricing plans to showcase your offers.</p>
        </div>
      </section>
    );
  }

  if (variant === 'single' && plans[0]) {
    const plan = plans[0];
    return (
      <section id="pricing" className="py-16 px-4">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <div className="mt-8 rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-lg">
            <p className="text-lg font-semibold text-gray-900">{plan.name}</p>
            <p className="mt-2 text-5xl font-bold text-gray-900">{plan.price}</p>
            {plan.description && <p className="mt-2 text-gray-500">{plan.description}</p>}
            <ul className="mt-6 space-y-3 text-left">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className="mt-8 block rounded-lg bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700 transition-colors">
              {plan.ctaText || 'Get Started'}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-16 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-3 text-lg text-gray-500">{subtitle}</p>}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-white p-8 shadow-sm ${
                plan.highlighted ? 'border-2 border-blue-500 shadow-lg ring-1 ring-blue-500/20' : 'border border-gray-200'
              }`}
            >
              <p className="text-lg font-semibold text-gray-900">{plan.name}</p>
              <p className="mt-2 text-4xl font-bold text-gray-900">{plan.price}</p>
              {plan.description && <p className="mt-2 text-sm text-gray-500">{plan.description}</p>}
              <ul className="mt-6 space-y-3">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-4 w-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 block rounded-lg py-3 text-center font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.ctaText || 'Get Started'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
