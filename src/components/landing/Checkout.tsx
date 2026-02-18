'use client';

import { useState } from 'react';

interface CheckoutProps {
  variant?: string;
  title?: string;
  description?: string;
  products?: Array<{
    name: string;
    description?: string;
    price: number;
    currency?: string;
    image?: string;
  }>;
  buttonText?: string;
  successUrl?: string;
  cancelUrl?: string;
  stripePublishableKey?: string;
}

export function Checkout({
  variant = 'default',
  title = 'Complete Your Purchase',
  description,
  products = [],
  buttonText = 'Pay Now',
  successUrl,
  cancelUrl,
  stripePublishableKey,
}: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout() {
    if (!stripePublishableKey || products.length === 0) {
      setError('Checkout not configured');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products,
          successUrl: successUrl || window.location.href + '?checkout=success',
          cancelUrl: cancelUrl || window.location.href + '?checkout=cancelled',
          stripePublishableKey,
        }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('Checkout failed. Please try again.');
      setLoading(false);
    }
  }

  const formatPrice = (price: number, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
  };

  const total = products.reduce((sum, p) => sum + p.price, 0);
  const currency = products[0]?.currency || 'USD';

  if (variant === 'minimal') {
    return (
      <section className="py-12 px-4">
        <div className="mx-auto max-w-md text-center">
          {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
          <p className="mt-2 text-3xl font-bold text-blue-600">{formatPrice(total, currency)}</p>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processing...' : buttonText}
          </button>
        </div>
      </section>
    );
  }

  if (variant === 'card') {
    return (
      <section className="py-16 px-4">
        <div className="mx-auto max-w-lg">
          <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200">
            {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
            {description && <p className="mt-2 text-gray-600">{description}</p>}

            <div className="mt-6 space-y-4">
              {products.map((product, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center gap-3">
                    {product.image && (
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      {product.description && <p className="text-sm text-gray-500">{product.description}</p>}
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{formatPrice(product.price, product.currency || currency)}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">{formatPrice(total, currency)}</span>
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : buttonText}
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="mx-auto max-w-2xl">
        {title && <h2 className="text-center text-3xl font-bold text-gray-900">{title}</h2>}
        {description && <p className="mt-3 text-center text-lg text-gray-600">{description}</p>}

        <div className="mt-10 rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
          <div className="divide-y divide-gray-100">
            {products.map((product, i) => (
              <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  {product.image && (
                    <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    {product.description && <p className="mt-0.5 text-sm text-gray-500">{product.description}</p>}
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">{formatPrice(product.price, product.currency || currency)}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">{formatPrice(total, currency)}</span>
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Redirecting to payment...' : buttonText}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Secure checkout powered by Stripe
          </div>
        </div>
      </div>
    </section>
  );
}
