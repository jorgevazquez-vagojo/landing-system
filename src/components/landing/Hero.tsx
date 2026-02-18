'use client';

import React from 'react';

type HeroVariant = 'centered' | 'split' | 'image-right' | 'video-bg' | 'gradient' | 'minimal';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  image?: string;
  variant?: HeroVariant;
}

function CenteredHero({ title, subtitle, ctaText, ctaUrl, image }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl">
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
          {image && (
            <div className="mt-16 flow-root sm:mt-20">
              <div className="rounded-2xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-3xl lg:p-4">
                <img
                  src={image}
                  alt={title || 'Hero'}
                  className="rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                  width={2432}
                  height={1442}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Subtle background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-200 to-sky-200 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
    </section>
  );
}

function SplitHero({ title, subtitle, ctaText, ctaUrl, image }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-16 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:shrink-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href={ctaUrl || '#'}
                className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
        {image && (
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
            <div className="max-w-3xl flex-none sm:max-w-md lg:max-w-none">
              <img
                src={image}
                alt={title || 'Hero'}
                className="w-[48rem] rounded-2xl shadow-2xl ring-1 ring-gray-900/10"
                width={768}
                height={512}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ImageRightHero({ title, subtitle, ctaText, ctaUrl, image }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:px-8 lg:py-40">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href={ctaUrl || '#'}
                className="rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
        <div className="mt-16 flex items-center justify-center lg:mt-0">
          {image ? (
            <img
              src={image}
              alt={title || 'Hero'}
              className="w-full max-w-lg rounded-2xl shadow-2xl ring-1 ring-gray-900/10 object-cover"
            />
          ) : (
            <div className="aspect-[4/3] w-full max-w-lg rounded-2xl bg-gradient-to-br from-indigo-100 to-sky-100 ring-1 ring-gray-900/5" />
          )}
        </div>
      </div>
    </section>
  );
}

function VideoBgHero({ title, subtitle, ctaText, ctaUrl, image }: HeroProps) {
  return (
    <section className="relative isolate min-h-[600px] overflow-hidden bg-gray-900 lg:min-h-[700px]">
      {/* Background image/video overlay */}
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gray-900/70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />

      <div className="mx-auto flex min-h-[600px] max-w-7xl items-center px-6 lg:min-h-[700px] lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-xl">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={ctaUrl || '#'}
                className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5"
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

function GradientHero({ title, subtitle, ctaText, ctaUrl, image }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-16 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:shrink-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              {subtitle}
            </p>
          )}
          {ctaText && (
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href={ctaUrl || '#'}
                className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5"
              >
                {ctaText}
              </a>
            </div>
          )}
        </div>
        {image && (
          <div className="mx-auto mt-16 flex max-w-2xl lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-20">
            <div className="max-w-3xl flex-none sm:max-w-md lg:max-w-none">
              <img
                src={image}
                alt={title || 'Hero'}
                className="w-[48rem] rounded-2xl shadow-2xl ring-1 ring-white/10"
                width={768}
                height={512}
              />
            </div>
          </div>
        )}
      </div>
      {/* Decorative gradient blobs */}
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-purple-300/30 to-pink-300/30" />
      </div>
      <div className="absolute -bottom-24 left-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-indigo-300/30 to-purple-300/30" />
      </div>
    </section>
  );
}

function MinimalHero({ title, subtitle, ctaText, ctaUrl }: HeroProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg leading-8 text-gray-500">
            {subtitle}
          </p>
        )}
        {ctaText && (
          <div className="mt-8">
            <a
              href={ctaUrl || '#'}
              className="inline-flex items-center gap-x-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500"
            >
              {ctaText}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

const variantMap: Record<HeroVariant, React.FC<HeroProps>> = {
  centered: CenteredHero,
  split: SplitHero,
  'image-right': ImageRightHero,
  'video-bg': VideoBgHero,
  gradient: GradientHero,
  minimal: MinimalHero,
};

export function Hero(props: Record<string, unknown>) {
  const {
    title = 'Build Something Amazing',
    subtitle = 'Start creating your next great project today.',
    ctaText = 'Get Started',
    ctaUrl = '#',
    image,
    variant = 'centered',
  } = props;

  const heroProps: HeroProps = {
    title: String(title),
    subtitle: subtitle ? String(subtitle) : undefined,
    ctaText: ctaText ? String(ctaText) : undefined,
    ctaUrl: ctaUrl ? String(ctaUrl) : undefined,
    image: image ? String(image) : undefined,
    variant: variant as HeroVariant,
  };

  const VariantComponent = variantMap[heroProps.variant || 'centered'] || CenteredHero;

  return <VariantComponent {...heroProps} />;
}
