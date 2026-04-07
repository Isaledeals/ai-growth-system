// ============================================================
// AI Growth System — Monthly Auto-Report Generator
// Generates structured report data + HTML email for each tenant
// ============================================================

import type {
  Tenant,
  Conversation,
  Contact,
  Review,
  Appointment,
} from "./supabase/types";
import { type HealthScoreResult, getZoneLabel, getZoneColor } from "./health-score";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MonthlyReportData {
  tenantId: string;
  businessName: string;
  reportMonth: string; // "2026-04"
  period: { from: string; to: string };

  // Core metrics
  totalConversations: number;
  conversationsByChannel: Record<string, number>;
  aiHandledPercent: number;

  newLeads: number;
  leadsBySource: Record<string, number>;

  newReviews: number;
  averageRating: number;
  reviewsByPlatform: Record<string, number>;

  appointmentsBooked: number;
  appointmentsCompleted: number;
  noShows: number;
  noShowsPrevented: number; // reminded + completed (vs. baseline no-show rate)

  // Calculated value
  estimatedTimeSavedMinutes: number;
  estimatedTimeSavedHours: number;
  estimatedValue: number;
  planPrice: number;
  roi: number; // estimatedValue / planPrice

  // Month-over-month comparison
  comparison: {
    conversations: ChangeMetric;
    leads: ChangeMetric;
    reviews: ChangeMetric;
    appointments: ChangeMetric;
  };

  // Health score
  healthScore: HealthScoreResult;
}

export interface ChangeMetric {
  current: number;
  previous: number;
  change: number;       // absolute
  changePercent: number; // percentage
  direction: "up" | "down" | "flat";
}

// ---------------------------------------------------------------------------
// Plan prices (must match PRICING in constants.ts)
// ---------------------------------------------------------------------------

const PLAN_PRICES: Record<string, number> = {
  pro: 697,
  premium: 1297,
};

// Industry average revenue per conversation (conservative)
const AVG_REVENUE_PER_CONVERSATION = 45; // EUR

// Average time saved per AI conversation (minutes)
const MINUTES_PER_CONVERSATION = 5;

// Baseline no-show rate without reminders
const BASELINE_NO_SHOW_RATE = 0.18;

// ---------------------------------------------------------------------------
// Helper: calculate change metric
// ---------------------------------------------------------------------------

function calcChange(current: number, previous: number): ChangeMetric {
  const change = current - previous;
  const changePercent =
    previous > 0 ? Math.round((change / previous) * 100) : current > 0 ? 100 : 0;
  const direction: ChangeMetric["direction"] =
    change > 0 ? "up" : change < 0 ? "down" : "flat";
  return { current, previous, change, changePercent, direction };
}

// ---------------------------------------------------------------------------
// Main report generation
// ---------------------------------------------------------------------------

export interface GenerateReportInput {
  tenant: Tenant;
  conversations: Conversation[];       // current month
  prevConversations: Conversation[];    // previous month
  contacts: Contact[];                  // current month
  prevContacts: Contact[];              // previous month
  reviews: Review[];                    // current month
  prevReviews: Review[];                // previous month
  appointments: Appointment[];          // current month
  prevAppointments: Appointment[];      // previous month
  healthScore: HealthScoreResult;
}

export function generateMonthlyReport(
  input: GenerateReportInput
): MonthlyReportData {
  const {
    tenant,
    conversations,
    prevConversations,
    contacts,
    prevContacts,
    reviews,
    prevReviews,
    appointments,
    prevAppointments,
    healthScore,
  } = input;

  const now = new Date();
  const reportMonth = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, "0")}`;
  // Previous month date range
  const firstOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // --- Conversations ---
  const totalConversations = conversations.length;
  const conversationsByChannel: Record<string, number> = {};
  let aiHandled = 0;
  for (const c of conversations) {
    conversationsByChannel[c.channel] =
      (conversationsByChannel[c.channel] || 0) + 1;
    if (c.handled_by === "ai") aiHandled++;
  }
  const aiHandledPercent =
    totalConversations > 0
      ? Math.round((aiHandled / totalConversations) * 100)
      : 0;

  // --- Leads ---
  const newLeads = contacts.length;
  const leadsBySource: Record<string, number> = {};
  for (const ct of contacts) {
    const src = ct.source || "manual";
    leadsBySource[src] = (leadsBySource[src] || 0) + 1;
  }

  // --- Reviews ---
  const newReviews = reviews.length;
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating =
    newReviews > 0 ? Math.round((totalRating / newReviews) * 10) / 10 : 0;
  const reviewsByPlatform: Record<string, number> = {};
  for (const r of reviews) {
    reviewsByPlatform[r.platform] =
      (reviewsByPlatform[r.platform] || 0) + 1;
  }

  // --- Appointments ---
  const appointmentsBooked = appointments.length;
  const appointmentsCompleted = appointments.filter(
    (a) => a.status === "completed"
  ).length;
  const noShows = appointments.filter((a) => a.status === "no_show").length;
  // No-shows prevented = expected no-shows (baseline) - actual no-shows
  const expectedNoShows = Math.round(appointmentsBooked * BASELINE_NO_SHOW_RATE);
  const noShowsPrevented = Math.max(0, expectedNoShows - noShows);

  // --- Value calculations ---
  const estimatedTimeSavedMinutes = totalConversations * MINUTES_PER_CONVERSATION;
  const estimatedTimeSavedHours = Math.round(estimatedTimeSavedMinutes / 60);
  const estimatedValue =
    totalConversations * AVG_REVENUE_PER_CONVERSATION +
    noShowsPrevented * 120; // avg no-show cost
  const planPrice = PLAN_PRICES[tenant.plan] || PLAN_PRICES.pro;
  const roi =
    planPrice > 0 ? Math.round((estimatedValue / planPrice) * 100) / 100 : 0;

  // --- Month-over-month comparison ---
  const comparison = {
    conversations: calcChange(totalConversations, prevConversations.length),
    leads: calcChange(newLeads, prevContacts.length),
    reviews: calcChange(newReviews, prevReviews.length),
    appointments: calcChange(appointmentsBooked, prevAppointments.length),
  };

  return {
    tenantId: tenant.id,
    businessName: tenant.business_name,
    reportMonth,
    period: {
      from: firstOfPrevMonth.toISOString().split("T")[0],
      to: lastOfPrevMonth.toISOString().split("T")[0],
    },
    totalConversations,
    conversationsByChannel,
    aiHandledPercent,
    newLeads,
    leadsBySource,
    newReviews,
    averageRating,
    reviewsByPlatform,
    appointmentsBooked,
    appointmentsCompleted,
    noShows,
    noShowsPrevented,
    estimatedTimeSavedMinutes,
    estimatedTimeSavedHours,
    estimatedValue,
    planPrice,
    roi,
    comparison,
    healthScore,
  };
}

// ---------------------------------------------------------------------------
// HTML email generation (German, branded)
// ---------------------------------------------------------------------------

export function generateReportHTML(report: MonthlyReportData): string {
  const zoneColor = getZoneColor(report.healthScore.zone);
  const zoneLabel = getZoneLabel(report.healthScore.zone);

  const changeArrow = (m: ChangeMetric) =>
    m.direction === "up"
      ? `<span style="color:#10B981">&#9650; +${m.changePercent}%</span>`
      : m.direction === "down"
        ? `<span style="color:#EF4444">&#9660; ${m.changePercent}%</span>`
        : `<span style="color:#6B7280">&#8212; 0%</span>`;

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monatsbericht — ${report.businessName}</title>
</head>
<body style="margin:0;padding:0;background:#0A0F1C;font-family:'Inter',Arial,sans-serif;color:#E5E7EB;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111827;border-radius:12px;overflow:hidden;">

    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,#3B82F6,#10B981);padding:32px 24px;text-align:center;">
        <h1 style="margin:0;font-size:24px;color:#FFFFFF;font-weight:700;">
          Dein Monatsbericht
        </h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">
          ${report.businessName} — ${report.reportMonth}
        </p>
      </td>
    </tr>

    <!-- Health Score -->
    <tr>
      <td style="padding:24px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(17,24,39,0.7);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:20px;">
          <tr>
            <td style="text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9CA3AF;">Health Score</p>
              <p style="margin:0;font-size:48px;font-weight:800;color:${zoneColor};">${report.healthScore.score}</p>
              <p style="margin:4px 0 0;font-size:14px;color:${zoneColor};font-weight:600;">${zoneLabel}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Key Metrics -->
    <tr>
      <td style="padding:0 24px 24px;">
        <h2 style="margin:0 0 16px;font-size:18px;color:#F9FAFB;">Deine Ergebnisse</h2>
        <table width="100%" cellpadding="0" cellspacing="8">
          <tr>
            <td width="50%" style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:16px;text-align:center;">
              <p style="margin:0;font-size:28px;font-weight:700;color:#3B82F6;">${report.totalConversations}</p>
              <p style="margin:4px 0 0;font-size:12px;color:#9CA3AF;">Gespraeche</p>
              <p style="margin:4px 0 0;font-size:11px;">${changeArrow(report.comparison.conversations)}</p>
            </td>
            <td width="50%" style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:16px;text-align:center;">
              <p style="margin:0;font-size:28px;font-weight:700;color:#10B981;">${report.newLeads}</p>
              <p style="margin:4px 0 0;font-size:12px;color:#9CA3AF;">Neue Leads</p>
              <p style="margin:4px 0 0;font-size:11px;">${changeArrow(report.comparison.leads)}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.2);border-radius:8px;padding:16px;text-align:center;">
              <p style="margin:0;font-size:28px;font-weight:700;color:#F59E0B;">${report.newReviews}</p>
              <p style="margin:4px 0 0;font-size:12px;color:#9CA3AF;">Neue Bewertungen</p>
              <p style="margin:4px 0 0;font-size:11px;">${changeArrow(report.comparison.reviews)} | &#9733; ${report.averageRating}</p>
            </td>
            <td width="50%" style="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.2);border-radius:8px;padding:16px;text-align:center;">
              <p style="margin:0;font-size:28px;font-weight:700;color:#8B5CF6;">${report.appointmentsBooked}</p>
              <p style="margin:4px 0 0;font-size:12px;color:#9CA3AF;">Termine gebucht</p>
              <p style="margin:4px 0 0;font-size:11px;">${changeArrow(report.comparison.appointments)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Impact Stats -->
    <tr>
      <td style="padding:0 24px 24px;">
        <h2 style="margin:0 0 16px;font-size:18px;color:#F9FAFB;">Dein Impact</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(17,24,39,0.7);border:1px solid rgba(59,130,246,0.2);border-radius:8px;">
          <tr>
            <td style="padding:16px;border-bottom:1px solid rgba(255,255,255,0.05);">
              <table width="100%">
                <tr>
                  <td style="font-size:14px;color:#9CA3AF;">No-Shows verhindert</td>
                  <td style="text-align:right;font-size:14px;font-weight:600;color:#10B981;">${report.noShowsPrevented}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px;border-bottom:1px solid rgba(255,255,255,0.05);">
              <table width="100%">
                <tr>
                  <td style="font-size:14px;color:#9CA3AF;">KI-Anteil Gespraeche</td>
                  <td style="text-align:right;font-size:14px;font-weight:600;color:#3B82F6;">${report.aiHandledPercent}%</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px;border-bottom:1px solid rgba(255,255,255,0.05);">
              <table width="100%">
                <tr>
                  <td style="font-size:14px;color:#9CA3AF;">Zeitersparnis</td>
                  <td style="text-align:right;font-size:14px;font-weight:600;color:#F59E0B;">~${report.estimatedTimeSavedHours} Stunden</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px;border-bottom:1px solid rgba(255,255,255,0.05);">
              <table width="100%">
                <tr>
                  <td style="font-size:14px;color:#9CA3AF;">Geschaetzter Wert</td>
                  <td style="text-align:right;font-size:14px;font-weight:600;color:#10B981;">&euro;${report.estimatedValue.toLocaleString("de-DE")}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px;">
              <table width="100%">
                <tr>
                  <td style="font-size:14px;color:#9CA3AF;">ROI</td>
                  <td style="text-align:right;font-size:18px;font-weight:800;color:#10B981;">${report.roi}x</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Recommendations -->
    ${
      report.healthScore.recommendations.length > 0
        ? `<tr>
      <td style="padding:0 24px 24px;">
        <h2 style="margin:0 0 16px;font-size:18px;color:#F9FAFB;">Empfehlungen</h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.2);border-radius:8px;padding:16px;">
          ${report.healthScore.recommendations
            .map(
              (r) =>
                `<tr><td style="padding:8px 16px;font-size:13px;color:#D1D5DB;">&#8226; ${r}</td></tr>`
            )
            .join("")}
        </table>
      </td>
    </tr>`
        : ""
    }

    <!-- Footer -->
    <tr>
      <td style="padding:24px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
        <p style="margin:0;font-size:12px;color:#6B7280;">
          Dieser Bericht wurde automatisch erstellt von deinem AI Growth System.
        </p>
        <p style="margin:8px 0 0;font-size:12px;color:#6B7280;">
          Fragen? Antworte einfach auf diese Email.
        </p>
        <p style="margin:16px 0 0;font-size:11px;color:#4B5563;">
          DIAS SALES SOLUTIONS - FZCO | Dubai, UAE
        </p>
      </td>
    </tr>

  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Plain text version (for email clients that don't support HTML)
// ---------------------------------------------------------------------------

export function generateReportPlainText(report: MonthlyReportData): string {
  const lines = [
    `MONATSBERICHT — ${report.businessName}`,
    `Zeitraum: ${report.period.from} bis ${report.period.to}`,
    ``,
    `HEALTH SCORE: ${report.healthScore.score}/100 (${getZoneLabel(report.healthScore.zone)})`,
    ``,
    `=== ERGEBNISSE ===`,
    `Gespraeche: ${report.totalConversations} (${formatChange(report.comparison.conversations)})`,
    `Neue Leads: ${report.newLeads} (${formatChange(report.comparison.leads)})`,
    `Neue Bewertungen: ${report.newReviews} (Schnitt: ${report.averageRating} Sterne)`,
    `Termine gebucht: ${report.appointmentsBooked} (${formatChange(report.comparison.appointments)})`,
    `No-Shows verhindert: ${report.noShowsPrevented}`,
    ``,
    `=== IMPACT ===`,
    `KI-Anteil: ${report.aiHandledPercent}%`,
    `Zeitersparnis: ~${report.estimatedTimeSavedHours} Stunden`,
    `Geschaetzter Wert: EUR ${report.estimatedValue}`,
    `ROI: ${report.roi}x`,
    ``,
  ];

  if (report.healthScore.recommendations.length > 0) {
    lines.push(`=== EMPFEHLUNGEN ===`);
    for (const r of report.healthScore.recommendations) {
      lines.push(`- ${r}`);
    }
    lines.push(``);
  }

  lines.push(
    `---`,
    `Automatisch erstellt von AI Growth System`,
    `DIAS SALES SOLUTIONS - FZCO`
  );

  return lines.join("\n");
}

function formatChange(m: ChangeMetric): string {
  if (m.direction === "up") return `+${m.changePercent}%`;
  if (m.direction === "down") return `${m.changePercent}%`;
  return "0%";
}
