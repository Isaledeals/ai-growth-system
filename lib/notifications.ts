// ============================================================
// AI Growth System — External Notifications
// n8n webhook + Trinity API + Resend email
// All calls are graceful: never throw, always log
// ============================================================

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL ?? "";
const TRINITY_API_URL = process.env.TRINITY_API_URL ?? "";
const TRINITY_API_KEY = process.env.TRINITY_API_KEY ?? "";
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const RESEND_FROM =
  process.env.RESEND_FROM ?? "AI Growth System <noreply@aigrowthsystem.de>";

// ------ Types ------

export interface BookingPayload {
  type: "demo_booking";
  name: string;
  email: string;
  phone: string;
  branche: string;
  employees: string;
  problem: string;
  preferredDate: string;
  preferredTime: string;
  source: "ai-growth-system";
  receivedAt: string;
}

export interface CustomerPayload {
  type: "customer_onboarding";
  plan: "pro" | "premium";
  businessName: string;
  branche: string;
  email: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  source: "ai-growth-system";
  receivedAt: string;
}

// ------ Generic webhook caller ------

async function safeFetch(
  url: string,
  init: RequestInit,
  context: string
): Promise<{ ok: boolean; status?: number; error?: string }> {
  if (!url) {
    console.log(`[notifications] ${context}: URL not configured, skipping`);
    return { ok: false, error: "URL not configured" };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error(
        `[notifications] ${context}: HTTP ${response.status} ${response.statusText}`
      );
      return { ok: false, status: response.status };
    }

    console.log(`[notifications] ${context}: success (${response.status})`);
    return { ok: true, status: response.status };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`[notifications] ${context}: ${message}`);
    return { ok: false, error: message };
  }
}

// ------ n8n Webhook ------

export async function sendN8nWebhook(
  payload: BookingPayload | CustomerPayload
): Promise<void> {
  if (!N8N_WEBHOOK_URL) {
    console.log(
      `[notifications] n8n webhook not configured — payload type=${payload.type} dropped silently`
    );
    return;
  }

  await safeFetch(
    N8N_WEBHOOK_URL,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
    `n8n:${payload.type}`
  );
}

// ------ Trinity API ------

export async function notifyTrinity(
  endpoint: string,
  payload: Record<string, unknown>
): Promise<void> {
  if (!TRINITY_API_URL) {
    console.log(
      `[notifications] Trinity API not configured — endpoint=${endpoint} dropped silently`
    );
    return;
  }

  const url = `${TRINITY_API_URL.replace(/\/$/, "")}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (TRINITY_API_KEY) {
    headers["Authorization"] = `Bearer ${TRINITY_API_KEY}`;
  }

  await safeFetch(
    url,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
    `trinity:${endpoint}`
  );
}

// ------ Resend Email ------

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  if (!RESEND_API_KEY) {
    console.log(
      `[notifications] Resend not configured — email to=${params.to} subject="${params.subject}" dropped silently`
    );
    return;
  }

  await safeFetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: params.to,
        subject: params.subject,
        html: params.html,
      }),
    },
    `resend:${params.subject}`
  );
}

// ------ Stripe Configuration Check ------

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_SECRET_KEY.length > 10 &&
      !process.env.STRIPE_SECRET_KEY.includes("placeholder")
  );
}
