// ============================================================
// AI Growth System — Health Score Calculation
// Deterministic scoring: 0-100 based on tenant activity & status
// ============================================================

import type { Tenant, HealthEvent } from "./supabase/types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type HealthZone = "champion" | "healthy" | "at_risk" | "critical";

export interface HealthScoreResult {
  score: number;
  zone: HealthZone;
  breakdown: HealthScoreBreakdown;
  recommendations: string[];
}

export interface HealthScoreBreakdown {
  loginFrequency: number;
  aiAgentUsage: number;
  featureAdoption: number;
  paymentStatus: number;
  penalties: number;
  penaltyDetails: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WEIGHTS = {
  // Positive signals (max 75 total)
  LOGIN_DAILY: 30,
  LOGIN_WEEKLY: 15,
  LOGIN_NONE: 0,

  AI_USAGE_HIGH: 25,    // >20 conversations/week
  AI_USAGE_MEDIUM: 15,  // >5 conversations/week
  AI_USAGE_LOW: 0,      // 0 conversations/week

  FEATURE_REVIEWS: 10,
  FEATURE_AUTOMATIONS: 10,

  PAYMENT_ON_TIME: 10,

  // Negative signals
  PENALTY_NO_LOGIN_7D: -15,
  PENALTY_AI_DISABLED: -20,
  PENALTY_SUPPORT_TICKET: -10,  // per ticket
  PENALTY_PAYMENT_FAILED: -25,
  PENALTY_DOWNGRADE_REQUEST: -30,
} as const;

const ZONE_THRESHOLDS: { min: number; zone: HealthZone }[] = [
  { min: 90, zone: "champion" },
  { min: 70, zone: "healthy" },
  { min: 50, zone: "at_risk" },
  { min: 0, zone: "critical" },
];

// ---------------------------------------------------------------------------
// Helper: count events of a given type within a time window
// ---------------------------------------------------------------------------

function countEvents(
  events: HealthEvent[],
  type: HealthEvent["event_type"],
  sinceMs: number
): number {
  const cutoff = Date.now() - sinceMs;
  return events.filter(
    (e) => e.event_type === type && new Date(e.created_at).getTime() >= cutoff
  ).length;
}

// ---------------------------------------------------------------------------
// Helper: check if any event of type exists within window
// ---------------------------------------------------------------------------

function hasEvent(
  events: HealthEvent[],
  type: HealthEvent["event_type"],
  sinceMs: number
): boolean {
  return countEvents(events, type, sinceMs) > 0;
}

// ---------------------------------------------------------------------------
// Time constants (milliseconds)
// ---------------------------------------------------------------------------

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_WEEK = 7 * ONE_DAY;
const THIRTY_DAYS = 30 * ONE_DAY;

// ---------------------------------------------------------------------------
// Main calculation
// ---------------------------------------------------------------------------

export function calculateHealthScore(
  tenant: Tenant,
  events: HealthEvent[]
): HealthScoreResult {
  const breakdown: HealthScoreBreakdown = {
    loginFrequency: 0,
    aiAgentUsage: 0,
    featureAdoption: 0,
    paymentStatus: 0,
    penalties: 0,
    penaltyDetails: [],
  };

  const recommendations: string[] = [];

  // ---- 1. Login Frequency (max 30 points) ----
  const loginCount30d = countEvents(events, "login", THIRTY_DAYS);
  const loginCount7d = countEvents(events, "login", ONE_WEEK);

  if (loginCount30d >= 20) {
    // ~daily login
    breakdown.loginFrequency = WEIGHTS.LOGIN_DAILY;
  } else if (loginCount7d >= 1) {
    // at least weekly
    breakdown.loginFrequency = WEIGHTS.LOGIN_WEEKLY;
    recommendations.push(
      "Tipp: Taeglich einloggen gibt dir den besten Ueberblick ueber deine KI-Performance."
    );
  } else {
    breakdown.loginFrequency = WEIGHTS.LOGIN_NONE;
    recommendations.push(
      "Du warst laenger nicht eingeloggt. Schau rein — deine KI arbeitet fuer dich!"
    );
  }

  // ---- 2. AI Agent Usage (max 25 points) ----
  const conversationsThisWeek = countEvents(events, "conversation", ONE_WEEK);

  if (conversationsThisWeek > 20) {
    breakdown.aiAgentUsage = WEIGHTS.AI_USAGE_HIGH;
  } else if (conversationsThisWeek > 5) {
    breakdown.aiAgentUsage = WEIGHTS.AI_USAGE_MEDIUM;
  } else {
    breakdown.aiAgentUsage = WEIGHTS.AI_USAGE_LOW;
    recommendations.push(
      "Dein KI-Agent hat diese Woche wenige Gespraeche gefuehrt. Pruefe ob alle Kanaele aktiv sind."
    );
  }

  // ---- 3. Feature Adoption (max 20 points) ----
  const modules = tenant.modules;

  if (modules?.reputation) {
    breakdown.featureAdoption += WEIGHTS.FEATURE_REVIEWS;
  } else {
    recommendations.push(
      "Aktiviere den Reputations-Autopilot fuer automatische Google-Bewertungen."
    );
  }

  // Count active automation modules (followup, noshow, reactivation, social)
  const automationModules = [
    modules?.followup,
    modules?.noshow,
    modules?.reactivation,
    modules?.social,
  ];
  const activeAutomations = automationModules.filter(Boolean).length;

  if (activeAutomations >= 2) {
    breakdown.featureAdoption += WEIGHTS.FEATURE_AUTOMATIONS;
  } else {
    recommendations.push(
      "Aktiviere mehr Automatisierungen (Follow-up, No-Show Killer) fuer maximalen ROI."
    );
  }

  // ---- 4. Payment Status (max 10 points) ----
  const paymentFailed30d = hasEvent(events, "payment_failed", THIRTY_DAYS);

  if (!paymentFailed30d) {
    breakdown.paymentStatus = WEIGHTS.PAYMENT_ON_TIME;
  }

  // ---- 5. Penalties ----
  // No login in 7 days
  const lastLogin = tenant.last_login_at
    ? new Date(tenant.last_login_at).getTime()
    : 0;
  const daysSinceLogin = (Date.now() - lastLogin) / ONE_DAY;

  if (daysSinceLogin > 7) {
    breakdown.penalties += WEIGHTS.PENALTY_NO_LOGIN_7D;
    breakdown.penaltyDetails.push(
      `Kein Login seit ${Math.floor(daysSinceLogin)} Tagen (-15)`
    );
  }

  // AI agent disabled
  if (!tenant.ai_enabled) {
    breakdown.penalties += WEIGHTS.PENALTY_AI_DISABLED;
    breakdown.penaltyDetails.push("KI-Agent deaktiviert (-20)");
    recommendations.push(
      "Dein KI-Agent ist deaktiviert! Aktiviere ihn um keine Anfragen zu verpassen."
    );
  }

  // Support complaints (last 30 days)
  const supportTickets = countEvents(events, "support_ticket", THIRTY_DAYS);
  if (supportTickets > 0) {
    const penalty = supportTickets * WEIGHTS.PENALTY_SUPPORT_TICKET;
    breakdown.penalties += penalty;
    breakdown.penaltyDetails.push(
      `${supportTickets} Support-Ticket(s) (${penalty})`
    );
  }

  // Payment failed
  if (paymentFailed30d) {
    breakdown.penalties += WEIGHTS.PENALTY_PAYMENT_FAILED;
    breakdown.penaltyDetails.push("Zahlung fehlgeschlagen (-25)");
  }

  // Downgrade request (check metadata in settings_change events)
  const downgradeRequested = events.some(
    (e) =>
      e.event_type === "settings_change" &&
      e.metadata &&
      (e.metadata as Record<string, unknown>).action === "downgrade_request" &&
      new Date(e.created_at).getTime() >= Date.now() - THIRTY_DAYS
  );

  if (downgradeRequested) {
    breakdown.penalties += WEIGHTS.PENALTY_DOWNGRADE_REQUEST;
    breakdown.penaltyDetails.push("Downgrade angefragt (-30)");
  }

  // ---- Calculate total score ----
  const rawScore =
    breakdown.loginFrequency +
    breakdown.aiAgentUsage +
    breakdown.featureAdoption +
    breakdown.paymentStatus +
    breakdown.penalties;

  // Clamp to 0-100
  const score = Math.max(0, Math.min(100, rawScore));

  // Determine zone
  const zone =
    ZONE_THRESHOLDS.find((z) => score >= z.min)?.zone ?? "critical";

  return {
    score,
    zone,
    breakdown,
    recommendations,
  };
}

// ---------------------------------------------------------------------------
// Zone label helpers (German, for user-facing display)
// ---------------------------------------------------------------------------

export function getZoneLabel(zone: HealthZone): string {
  switch (zone) {
    case "champion":
      return "Champion";
    case "healthy":
      return "Gesund";
    case "at_risk":
      return "Gefaehrdet";
    case "critical":
      return "Kritisch";
  }
}

export function getZoneColor(zone: HealthZone): string {
  switch (zone) {
    case "champion":
      return "#10B981"; // green
    case "healthy":
      return "#3B82F6"; // blue
    case "at_risk":
      return "#F59E0B"; // amber
    case "critical":
      return "#EF4444"; // red
  }
}

// ---------------------------------------------------------------------------
// Determine if a tenant should receive an auto-intervention
// ---------------------------------------------------------------------------

export interface Intervention {
  type: "email" | "call" | "telegram_alert";
  priority: "low" | "medium" | "high" | "urgent";
  message: string;
}

export function getInterventions(result: HealthScoreResult): Intervention[] {
  const interventions: Intervention[] = [];

  if (result.zone === "critical") {
    interventions.push({
      type: "telegram_alert",
      priority: "urgent",
      message: `KRITISCH: Health Score ${result.score}/100. Sofortige Aktion noetig.`,
    });
    interventions.push({
      type: "call",
      priority: "urgent",
      message:
        "Persoenlicher Anruf notwendig — Kunde droht abzuspringen.",
    });
  }

  if (result.zone === "at_risk") {
    interventions.push({
      type: "email",
      priority: "high",
      message:
        "Wir haben bemerkt, dass einige Features nicht aktiv sind. Lass uns gemeinsam optimieren!",
    });
  }

  if (result.zone === "champion") {
    interventions.push({
      type: "email",
      priority: "low",
      message:
        "Du gehoerst zu unseren Top-Kunden! Empfiehl uns weiter und erhalte einen Monat gratis.",
    });
  }

  return interventions;
}
