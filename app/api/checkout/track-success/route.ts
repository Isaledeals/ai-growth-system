// ============================================================
// AI Growth System — Track Checkout Success
// POST /api/checkout/track-success
// ============================================================
// Wird vom SuccessTracker-Client nach erfolgreichem Stripe-Checkout
// aufgerufen. Liefert n8n-Onboarding-Trigger und Trinity-Notifikation.
// Quelle der Wahrheit fuer Provisioning bleibt der Stripe-Webhook.
// ============================================================

import { type NextRequest } from "next/server";
import { sendN8nWebhook, notifyTrinity } from "@/lib/notifications";

interface TrackBody {
  sessionId: string;
  plan: string;
}

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = (await request.json()) as Partial<TrackBody>;

    if (!body.sessionId || typeof body.sessionId !== "string") {
      return Response.json({ error: "sessionId required" }, { status: 400 });
    }

    const plan = body.plan === "premium" ? "premium" : "pro";

    console.log(
      `[track-success] session=${body.sessionId} plan=${plan}`
    );

    // Fire-and-forget — Trinity wird das Profil im Webhook anlegen,
    // hier nur als zusaetzliche Notification.
    void sendN8nWebhook({
      type: "customer_onboarding",
      plan,
      businessName: "",
      branche: "",
      email: "",
      stripeCustomerId: "",
      stripeSubscriptionId: "",
      source: "ai-growth-system",
      receivedAt: new Date().toISOString(),
    });

    void notifyTrinity("/api/customers/checkout-success", {
      sessionId: body.sessionId,
      plan,
      timestamp: new Date().toISOString(),
    });

    return Response.json({ tracked: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[track-success] error: ${message}`);
    // Niemals 500 — Tracking-Fehler darf den User nicht stoeren
    return Response.json({ tracked: false }, { status: 200 });
  }
}
