import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

/**
 * POST /api/checkout
 *
 * Public endpoint — creates a Stripe Checkout session.
 * Uses the company's Stripe Secret Key (BYOK model).
 *
 * Body: { products, successUrl, cancelUrl, stripeSecretKey? }
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { products, successUrl, cancelUrl } = body;

  // Use environment variable for Stripe secret key
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in environment.' },
      { status: 400 }
    );
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return NextResponse.json({ error: 'Products are required' }, { status: 400 });
  }

  try {
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-01-28.clover' });

    const lineItems = products.map((product: {
      name: string;
      description?: string;
      price: number;
      currency?: string;
      image?: string;
    }) => ({
      price_data: {
        currency: (product.currency || 'usd').toLowerCase(),
        product_data: {
          name: product.name,
          ...(product.description && { description: product.description }),
          ...(product.image && { images: [product.image] }),
        },
        unit_amount: Math.round(product.price * 100), // Convert to cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${req.nextUrl.origin}?checkout=success`,
      cancel_url: cancelUrl || `${req.nextUrl.origin}?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    const message = err instanceof Error ? err.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
