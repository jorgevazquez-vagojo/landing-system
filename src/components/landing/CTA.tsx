'use client';

import React from 'react';

type CTAVariant = 'simple' | 'with-image' | 'banner' | 'split';

interface CTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  image?: string;
  variant?: CTAVariant;
}

function SimpleCTA({ title, subtitle, ctaText, ctaUrl }: CTAProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={ctaUrl || '#'}
                className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function WithImageCTA({ title, subtitle, ctaText, ctaUrl, image }: CTAProps) {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gray-900 px-6 py-24 shadow-2xl sm:px-16 lg:flex lg:items-center lg:gap-x-20 lg:px-24">
          <div className="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:flex-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-6 text-lg leading-8 text-gray-300">
                {subtitle}
              </p>
            )}
            {ctaText && (
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href={ctaUrl || '#'}
                  className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
          {image && (
            <div className="relative mt-16 h-80 lg:mt-0">
              <img
                src={image}
                alt={title || 'CTA'}
                className="absolute left-0 top-0 w-[36rem] max-w-none rounded-xl shadow-xl ring-1 ring-white/10"
                width={576}
                height={320}
              />
            </div>
          )}
          {/* Background decorative gradient */}
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#cta-gradient)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="cta-gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#6366F1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}

function BannerCTA({ title, subtitle, ctaText, ctaUrl }: CTAProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={ctaUrl || '#'}
                className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
      {/* Decorative blurs */}
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-purple-300/20 to-pink-300/20" />
      </div>
      <div className="absolute -bottom-24 left-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-indigo-300/20 to-purple-300/20" />
      </div>
    </section>
  );
}

function SplitCTA({ title, subtitle, ctaText, ctaUrl, image }: CTAProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
          {/* Left side: image or decorative placeholder */}
          <div className="relative">
            {image ? (
              <img
                src={image}
                alt={title || 'CTA'}
                className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-900/10 object-cover"
              />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 ring-1 ring-gray-900/5">
                <div className="flex h-full items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 opacity-60" />
                </div>
              </div>
            )}
          </div>

          {/* Right side: content */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {subtitle}
              </p>
            )}
            {ctaText && (
              <div className="mt-10">
                <a
                  href={ctaUrl || '#'}
                  className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const variantMap: Record<CTAVariant, React.FC<CTAProps>> = {
  simple: SimpleCTA,
  'with-image': WithImageCTA,
  banner: BannerCTA,
  split: SplitCTA,
};

export function CTA(props: Record<string, unknown>) {
  const {
    title = 'Ready to get started?',
    subtitle = 'Join thousands of happy customers.',
    ctaText = 'Sign Up Now',
    ctaUrl = '#',
    image,
    variant = 'simple',
  } = props;

  const ctaProps: CTAProps = {
    title: String(title),
    subtitle: subtitle ? String(subtitle) : undefined,
    ctaText: ctaText ? String(ctaText) : undefined,
    ctaUrl: ctaUrl ? String(ctaUrl) : undefined,
    image: image ? String(image) : undefined,
    variant: variant as CTAVariant,
  };

  const VariantComponent = variantMap[ctaProps.variant || 'simple'] || SimpleCTA;

  return <VariantComponent {...ctaProps} />;
}
