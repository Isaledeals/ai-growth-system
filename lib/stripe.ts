// ============================================================
// Aufwind AI — Stripe Client & Helpers
// ============================================================

import Stripe from "stripe";

// Lazy-init: only fail at runtime, not at build time
let _stripe: Stripe | null = null;

function getStripeKey(): string | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.length < 10 || key.includes("placeholder")) return null;
  return key;
}

export function isStripeReady(): boolean {
  return getStripeKey() !== null;
}

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = getStripeKey();
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set");
  }
  _stripe = new Stripe(key, { typescript: true });
  return _stripe;
}

// Backwards-compat proxy: callers can still `import { stripe } from "./stripe"`
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    const s = getStripe();
    // @ts-expect-error dynamic prop access
    const value = s[prop];
    return typeof value === "function" ? value.bind(s) : value;
  },
});

// ------ Price IDs ------

export const PRICE_IDS = {
  pro: {
    monthly: "price_1TJHYy3OGNnjB7n16Y8F0Q0h",       // €697/Mo
    setup: "price_1TJHZI3OGNnjB7n18zaM9fDm",           // €499 one-time setup
  },
  premium: {
    monthly: "price_1TJHh93OGNnjB7n1S4sS4U6s",         // €1.297/Mo
    // No setup fee for premium
  },
} as const;

export type Plan = "pro" | "premium";

// ------ Checkout Session Creator ------

interface CreateCheckoutParams {
  plan: Plan;
  branche?: string;
  businessName?: string;
  email?: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession({
  plan,
  branche,
  businessName,
  email,
  successUrl,
  cancelUrl,
}: CreateCheckoutParams): Promise<Stripe.Checkout.Session> {
  const stripeClient = getStripe();

  // Typed via Parameters<> — works because `checkout.sessions.create` accepts
  // `SessionCreateParams` as its first argument. The `line_items` prop on that
  // type is `Array<Stripe.Checkout.SessionCreateParams.LineItem>`.
  type CreateArgs = Parameters<Stripe["checkout"]["sessions"]["create"]>[0];
  type LineItem = NonNullable<NonNullable<CreateArgs>["line_items"]>[number];

  // Subscription line item — Stripe Checkout in subscription mode allows
  // additional one-time prices in line_items; they appear on the first invoice.
  const lineItems: LineItem[] = [
    {
      price:
        plan === "premium"
          ? PRICE_IDS.premium.monthly
          : PRICE_IDS.pro.monthly,
      quantity: 1,
    },
  ];

  if (plan === "pro") {
    lineItems.push({ price: PRICE_IDS.pro.setup, quantity: 1 });
  }

  const sharedMetadata = {
    branche: branche ?? "default",
    businessName: businessName ?? "",
    plan,
  };

  const params: NonNullable<CreateArgs> = {
    mode: "subscription",
    // payment_method_types omitted → Stripe uses dashboard default (Card + alle aktivierten)
    // SEPA Debit muss erst im Stripe Dashboard aktiviert werden, bevor wir es hinzufügen
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: sharedMetadata,
    subscription_data: {
      metadata: sharedMetadata,
    },
    allow_promotion_codes: true,
    billing_address_collection: "required",
    locale: "de",
  };

  // Email is optional — if not provided, Stripe collects it on the checkout page
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    params.customer_email = email;
  }

  const session = await stripeClient.checkout.sessions.create(params);
  return session;
}

// ------ Subscription Management ------

export async function getSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return stripe.subscriptions.retrieve(subscriptionId);
}

export async function cancelSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function reactivateSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription> {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}

// ------ Customer Helpers ------

export async function getCustomer(
  customerId: string
): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
  return stripe.customers.retrieve(customerId);
}

export async function getCustomerByEmail(
  email: string
): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({ email, limit: 1 });
  return customers.data[0] ?? null;
}
