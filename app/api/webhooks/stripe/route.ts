// ============================================================
// Aufwind AI — Stripe Webhook Handler
// POST /api/webhooks/stripe
// ============================================================

import { type NextRequest } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  provisionTenant,
  activatePlan,
  updatePlan,
  deactivateTenant,
  markPaymentSuccessful,
  syncCustomerData,
} from "@/lib/provisioning";
import { startDunningFlow, cancelDunningFlow } from "@/lib/dunning";
import {
  sendN8nWebhook,
  notifyTrinity,
  type CustomerPayload,
} from "@/lib/notifications";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// ------ Helpers ------

function resolvePlan(subscription: Stripe.Subscription): "pro" | "premium" {
  // Check subscription metadata first
  const metaPlan = subscription.metadata?.plan;
  if (metaPlan === "pro" || metaPlan === "premium") return metaPlan;

  // Fallback: determine plan by price amount
  const item = subscription.items.data[0];
  if (!item) return "pro";

  const amount = item.price.unit_amount ?? 0;
  // Premium is €1.297/Mo = 129700 cents
  if (amount >= 100000) return "premium";
  return "pro";
}

// ------ Event Handlers ------

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  console.log(
    `[webhook] checkout.session.completed: session=${session.id}`
  );

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id ?? "";

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? "";

  const plan = (session.metadata?.plan as "pro" | "premium") ?? "pro";
  const branche = session.metadata?.branche ?? "default";
  const businessName =
    session.metadata?.businessName ?? "Neuer Kunde";
  const email =
    session.customer_details?.email ??
    session.customer_email ??
    "";

  if (!customerId || !subscriptionId) {
    console.log(
      "[webhook] checkout.session.completed: Missing customerId or subscriptionId, skipping provisioning"
    );
    return;
  }

  const { tenant, welcomeEmail } = await provisionTenant({
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    plan,
    businessName,
    branche,
    email,
  });

  console.log(
    `[webhook] Tenant provisioned: id=${tenant.id}, plan=${tenant.plan}, welcome email queued for ${welcomeEmail.to}`
  );

  // n8n Webhook fuer Customer Onboarding (graceful)
  const customerPayload: CustomerPayload = {
    type: "customer_onboarding",
    plan,
    businessName,
    branche,
    email,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    source: "aufwind-ai",
    receivedAt: new Date().toISOString(),
  };
  void sendN8nWebhook(customerPayload);

  // Trinity Customer-Profil anlegen / speichern in
  // /root/trinity/data/growth-customers.json
  void notifyTrinity("/api/customers/growth", {
    type: "checkout_completed",
    tenant: {
      id: tenant.id,
      plan: tenant.plan,
      business: tenant.business,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      createdAt: tenant.createdAt,
    },
  });
}

async function handleSubscriptionCreated(
  subscription: Stripe.Subscription
): Promise<void> {
  console.log(
    `[webhook] customer.subscription.created: sub=${subscription.id}`
  );

  const plan = resolvePlan(subscription);
  const result = await activatePlan(subscription.id, plan);

  if (result) {
    console.log(
      `[webhook] Subscription activated: tenant=${result.id}, plan=${plan}`
    );
  } else {
    // Tenant may not exist yet if checkout.session.completed fires later
    console.log(
      `[webhook] Subscription created but tenant not yet provisioned: sub=${subscription.id}`
    );
  }
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
): Promise<void> {
  console.log(
    `[webhook] customer.subscription.updated: sub=${subscription.id}, status=${subscription.status}`
  );

  const plan = resolvePlan(subscription);

  if (subscription.status === "active") {
    const result = await updatePlan(subscription.id, plan);
    if (result) {
      console.log(
        `[webhook] Subscription updated: tenant=${result.id}, plan=${plan}`
      );
    }
  } else if (
    subscription.status === "past_due" ||
    subscription.status === "unpaid"
  ) {
    console.log(
      `[webhook] Subscription status is ${subscription.status}: sub=${subscription.id}`
    );
  }
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
): Promise<void> {
  console.log(
    `[webhook] customer.subscription.deleted: sub=${subscription.id}`
  );

  const result = await deactivateTenant(subscription.id);
  if (result) {
    console.log(
      `[webhook] Tenant deactivated: tenant=${result.id}`
    );
  }
}

async function handleInvoicePaid(
  invoice: Stripe.Invoice
): Promise<void> {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id ?? "";

  console.log(
    `[webhook] invoice.paid: invoice=${invoice.id}, customer=${customerId}`
  );

  if (!customerId) return;

  // Cancel any active dunning flow
  cancelDunningFlow(customerId);

  const result = await markPaymentSuccessful(customerId);
  if (result) {
    console.log(
      `[webhook] Payment successful: tenant=${result.id}, status=${result.status}`
    );
  }
}

async function handleInvoicePaymentFailed(
  invoice: Stripe.Invoice
): Promise<void> {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id ?? "";

  console.log(
    `[webhook] invoice.payment_failed: invoice=${invoice.id}, customer=${customerId}`
  );

  if (!customerId) return;

  await startDunningFlow(customerId, invoice.id);
  console.log(
    `[webhook] Dunning flow started for customer ${customerId}`
  );
}

async function handleCustomerUpdated(
  customer: Stripe.Customer
): Promise<void> {
  console.log(
    `[webhook] customer.updated: customer=${customer.id}`
  );

  await syncCustomerData(customer.id, {
    email: customer.email ?? undefined,
    name: customer.name ?? undefined,
    phone: customer.phone ?? undefined,
  });

  console.log(
    `[webhook] Customer data synced for ${customer.id}`
  );
}

// ------ Main Webhook Route ------

export async function POST(request: NextRequest): Promise<Response> {
  if (!WEBHOOK_SECRET) {
    console.error(
      "[webhook] STRIPE_WEBHOOK_SECRET is not set"
    );
    return new Response("Webhook secret not configured", {
      status: 500,
    });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      console.error("[webhook] Missing stripe-signature header");
      return new Response("Missing stripe-signature header", {
        status: 400,
      });
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      WEBHOOK_SECRET
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    console.error(
      `[webhook] Signature verification failed: ${message}`
    );
    return new Response(`Webhook signature verification failed: ${message}`, {
      status: 400,
    });
  }

  console.log(
    `[webhook] Received event: type=${event.type}, id=${event.id}`
  );

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "customer.subscription.created":
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription
        );
        break;

      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription
        );
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription
        );
        break;

      case "invoice.paid":
      case "invoice.payment_succeeded":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(
          event.data.object as Stripe.Invoice
        );
        break;

      case "customer.updated":
        await handleCustomerUpdated(
          event.data.object as Stripe.Customer
        );
        break;

      default:
        console.log(
          `[webhook] Unhandled event type: ${event.type}`
        );
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Unknown error";
    console.error(
      `[webhook] Error processing event ${event.type}: ${message}`
    );
    // Return 200 to prevent Stripe from retrying — log for investigation
    return new Response(
      JSON.stringify({ received: true, error: message }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
