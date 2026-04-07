// ============================================================
// AI Growth System — Dunning Flow Logic
// State machine for handling failed payments
// Actual email/SMS sending will be via n8n webhooks later
// ============================================================

import {
  getTenantByStripeCustomerId,
  pauseTenant,
  deactivateTenant,
} from "./provisioning";

// ------ Dunning State Machine ------

export type DunningStage =
  | "payment_failed"       // Day 1: Send first email
  | "second_notice"        // Day 3: Send second email + SMS
  | "final_warning"        // Day 7: Send "will be paused" email
  | "account_paused"       // Day 14: Pause account
  | "account_deactivated"; // Day 30: Deactivate account

export interface DunningEvent {
  id: string;
  stripeCustomerId: string;
  stripeInvoiceId: string;
  stage: DunningStage;
  scheduledAt: string;
  executedAt: string | null;
  action: string;
}

// In-memory dunning schedule (persisted to JSON in production / Supabase later)
const dunningSchedules: Map<string, DunningEvent[]> = new Map();

// ------ N8N Webhook Placeholders ------

async function sendDunningEmail(
  email: string,
  stage: DunningStage,
  businessName: string
): Promise<void> {
  // TODO: Replace with actual n8n webhook call
  const subjects: Record<DunningStage, string> = {
    payment_failed: "Zahlung fehlgeschlagen - Aktion erforderlich",
    second_notice: "Erinnerung: Zahlung noch ausstehend",
    final_warning:
      "Letzte Warnung: Ihr Konto wird in 7 Tagen pausiert",
    account_paused: "Ihr Konto wurde pausiert",
    account_deactivated: "Ihr Konto wurde deaktiviert",
  };

  console.log(
    `[dunning] EMAIL -> ${email} | Stage: ${stage} | Subject: ${subjects[stage]} | Business: ${businessName}`
  );
}

async function sendDunningSms(
  phone: string,
  stage: DunningStage,
  businessName: string
): Promise<void> {
  // TODO: Replace with actual n8n webhook call / Twilio
  console.log(
    `[dunning] SMS -> ${phone} | Stage: ${stage} | Business: ${businessName}`
  );
}

// ------ Dunning Flow Orchestrator ------

export async function startDunningFlow(
  stripeCustomerId: string,
  stripeInvoiceId: string
): Promise<DunningEvent[]> {
  const tenant = await getTenantByStripeCustomerId(stripeCustomerId);
  if (!tenant) {
    console.log(
      `[dunning] Cannot start dunning flow: tenant not found for customer ${stripeCustomerId}`
    );
    return [];
  }

  const now = new Date();

  // Create the full dunning schedule
  const schedule: DunningEvent[] = [
    {
      id: crypto.randomUUID(),
      stripeCustomerId,
      stripeInvoiceId,
      stage: "payment_failed",
      scheduledAt: now.toISOString(), // Day 1 (immediately)
      executedAt: null,
      action: "Send payment failed email",
    },
    {
      id: crypto.randomUUID(),
      stripeCustomerId,
      stripeInvoiceId,
      stage: "second_notice",
      scheduledAt: addDays(now, 3).toISOString(), // Day 3
      executedAt: null,
      action: "Send second email + SMS",
    },
    {
      id: crypto.randomUUID(),
      stripeCustomerId,
      stripeInvoiceId,
      stage: "final_warning",
      scheduledAt: addDays(now, 7).toISOString(), // Day 7
      executedAt: null,
      action: "Send final warning email",
    },
    {
      id: crypto.randomUUID(),
      stripeCustomerId,
      stripeInvoiceId,
      stage: "account_paused",
      scheduledAt: addDays(now, 14).toISOString(), // Day 14
      executedAt: null,
      action: "Pause account (disable AI)",
    },
    {
      id: crypto.randomUUID(),
      stripeCustomerId,
      stripeInvoiceId,
      stage: "account_deactivated",
      scheduledAt: addDays(now, 30).toISOString(), // Day 30
      executedAt: null,
      action: "Deactivate account completely",
    },
  ];

  dunningSchedules.set(stripeCustomerId, schedule);

  // Execute the first step immediately
  await executeDunningStage(stripeCustomerId, "payment_failed");

  console.log(
    `[dunning] Dunning flow started for customer ${stripeCustomerId}, invoice ${stripeInvoiceId}`
  );

  return schedule;
}

export async function executeDunningStage(
  stripeCustomerId: string,
  stage: DunningStage
): Promise<void> {
  const tenant = await getTenantByStripeCustomerId(stripeCustomerId);
  if (!tenant) {
    console.log(
      `[dunning] Cannot execute stage ${stage}: tenant not found`
    );
    return;
  }

  const schedule = dunningSchedules.get(stripeCustomerId);
  if (schedule) {
    const event = schedule.find((e) => e.stage === stage);
    if (event) {
      event.executedAt = new Date().toISOString();
    }
  }

  switch (stage) {
    case "payment_failed":
      await sendDunningEmail(
        tenant.business.email,
        stage,
        tenant.business.name
      );
      console.log(
        `[dunning] Day 1: Payment failed email sent to ${tenant.business.email}`
      );
      break;

    case "second_notice":
      await sendDunningEmail(
        tenant.business.email,
        stage,
        tenant.business.name
      );
      if (tenant.business.phone) {
        await sendDunningSms(
          tenant.business.phone,
          stage,
          tenant.business.name
        );
      }
      console.log(
        `[dunning] Day 3: Second notice email + SMS sent for ${tenant.business.name}`
      );
      break;

    case "final_warning":
      await sendDunningEmail(
        tenant.business.email,
        stage,
        tenant.business.name
      );
      console.log(
        `[dunning] Day 7: Final warning sent to ${tenant.business.email}`
      );
      break;

    case "account_paused":
      await pauseTenant(tenant.stripeSubscriptionId);
      await sendDunningEmail(
        tenant.business.email,
        stage,
        tenant.business.name
      );
      console.log(
        `[dunning] Day 14: Account paused for ${tenant.business.name}`
      );
      break;

    case "account_deactivated":
      await deactivateTenant(tenant.stripeSubscriptionId);
      await sendDunningEmail(
        tenant.business.email,
        stage,
        tenant.business.name
      );
      console.log(
        `[dunning] Day 30: Account deactivated for ${tenant.business.name}`
      );
      break;
  }
}

// ------ Cancel Dunning (e.g., when payment succeeds) ------

export function cancelDunningFlow(stripeCustomerId: string): void {
  if (dunningSchedules.has(stripeCustomerId)) {
    dunningSchedules.delete(stripeCustomerId);
    console.log(
      `[dunning] Dunning flow cancelled for customer ${stripeCustomerId} (payment recovered)`
    );
  }
}

// ------ Get Dunning Status ------

export function getDunningStatus(
  stripeCustomerId: string
): DunningEvent[] | null {
  return dunningSchedules.get(stripeCustomerId) ?? null;
}

// ------ Utility ------

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
