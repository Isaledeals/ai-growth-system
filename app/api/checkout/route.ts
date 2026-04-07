// ============================================================
// AI Growth System — Create Checkout Session
// POST /api/checkout
// ============================================================
//
// Body (alle Felder optional ausser plan):
//   { plan: 'pro' | 'premium', email?, businessName?, branche? }
//
// Wenn STRIPE_SECRET_KEY nicht gesetzt ist, antwortet die Route mit
// HTTP 503 + { fallbackUrl: "/buchen" }, sodass der Client den Nutzer
// graceful auf die Demo-Buchung umleiten kann.
// ============================================================

import { type NextRequest } from "next/server";
import { createCheckoutSession, isStripeReady, type Plan } from "@/lib/stripe";

interface CheckoutRequestBody {
  plan: Plan;
  branche?: string;
  businessName?: string;
  email?: string;
}

function isValidPlan(value: unknown): value is Plan {
  return value === "pro" || value === "premium";
}

export async function POST(request: NextRequest): Promise<Response> {
  // Graceful degradation: Stripe nicht konfiguriert → Booking-Fallback
  if (!isStripeReady()) {
    console.warn(
      "[checkout] STRIPE_SECRET_KEY missing — returning fallback to /buchen"
    );
    return Response.json(
      {
        error: "Stripe nicht verfuegbar",
        fallbackUrl: "/buchen",
      },
      { status: 503 }
    );
  }

  let body: Partial<CheckoutRequestBody>;
  try {
    body = (await request.json()) as Partial<CheckoutRequestBody>;
  } catch {
    return Response.json(
      { error: "Invalid JSON body", fallbackUrl: "/buchen" },
      { status: 400 }
    );
  }

  if (!isValidPlan(body.plan)) {
    return Response.json(
      {
        error: "Invalid or missing plan. Must be 'pro' or 'premium'.",
        fallbackUrl: "/buchen",
      },
      { status: 400 }
    );
  }

  try {
    const origin = request.nextUrl.origin;
    const successUrl = `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${body.plan}`;
    const cancelUrl = `${origin}/#preise`;

    console.log(
      `[checkout] Creating session: plan=${body.plan}, branche=${body.branche ?? "-"}, business=${body.businessName ?? "-"}`
    );

    const session = await createCheckoutSession({
      plan: body.plan,
      branche: body.branche,
      businessName: body.businessName,
      email: body.email,
      successUrl,
      cancelUrl,
    });

    console.log(`[checkout] Session created: id=${session.id}`);

    return Response.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[checkout] Error creating session: ${message}`);

    return Response.json(
      {
        error: "Checkout konnte nicht erstellt werden",
        fallbackUrl: "/buchen",
      },
      { status: 500 }
    );
  }
}
