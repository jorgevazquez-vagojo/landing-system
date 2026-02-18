'use client';

import React from 'react';

interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
  variant?: 'grid-3' | 'grid-2' | 'alternating' | 'icon-list' | 'cards';
}

function PlaceholderIcon({ name, className }: { name?: string; className?: string }) {
  const colors: Record<string, string> = {
    star: '#FBBF24',
    heart: '#F87171',
    zap: '#A78BFA',
    shield: '#34D399',
    rocket: '#60A5FA',
    check: '#10B981',
  };
  const fill = colors[name || ''] || '#6366F1';

  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill={fill} opacity="0.15" />
      <circle cx="24" cy="24" r="12" fill={fill} opacity="0.35" />
      <circle cx="24" cy="24" r="5" fill={fill} />
    </svg>
  );
}

function Grid3({ title, subtitle, items }: Omit<FeaturesProps, 'variant'>) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(items || []).map((item, i) => (
            <div
              key={i}
              className="group text-center p-8 rounded-2xl transition-all duration-300 hover:bg-gray-50 hover:shadow-lg"
            >
              <div className="flex justify-center mb-6">
                <PlaceholderIcon name={item.icon} className="w-14 h-14" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Grid2({ title, subtitle, items }: Omit<FeaturesProps, 'variant'>) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {(items || []).map((item, i) => (
            <div key={i} className="flex gap-5 p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0">
                <PlaceholderIcon name={item.icon} className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Alternating({ title, subtitle, items }: Omit<FeaturesProps, 'variant'>) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-20">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        <div className="space-y-24">
          {(items || []).map((item, i) => {
            const isReversed = i % 2 === 1;
            return (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 flex justify-center">
                  <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center shadow-inner">
                    <PlaceholderIcon name={item.icon} className="w-24 h-24" />
                  </div>
                </div>
                <div className="flex-1">
                  <span className="inline-block text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IconList({ title, subtitle, items }: Omit<FeaturesProps, 'variant'>) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        <ul className="space-y-6">
          {(items || []).map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-shrink-0 mt-1">
                <PlaceholderIcon name={item.icon} className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Cards({ title, subtitle, items }: Omit<FeaturesProps, 'variant'>) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(items || []).map((item, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="mb-6">
                <PlaceholderIcon name={item.icon} className="w-14 h-14" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const variantMap: Record<string, React.ComponentType<Omit<FeaturesProps, 'variant'>>> = {
  'grid-3': Grid3,
  'grid-2': Grid2,
  alternating: Alternating,
  'icon-list': IconList,
  cards: Cards,
};

export function Features(props: Record<string, unknown>) {
  const title = (props.title as string) || '';
  const subtitle = (props.subtitle as string) || '';
  const items = (props.items as FeatureItem[]) || [];
  const variant = (props.variant as string) || 'grid-3';

  const Component = variantMap[variant] || Grid3;

  return <Component title={title} subtitle={subtitle} items={items} />;
}
