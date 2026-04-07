// ============================================================
// AI Growth System — Demo Booking API
// POST /api/booking
// ============================================================
//
// Speichert das Booking lokal (data/bookings.json), feuert n8n + Trinity
// Webhooks und sendet eine Bestaetigungs-Email via Resend.
// Alle externen Calls sind graceful — die Route antwortet IMMER 200,
// solange das Booking persistiert werden konnte.
// ============================================================

import { type NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  sendN8nWebhook,
  notifyTrinity,
  sendEmail,
  type BookingPayload,
} from "@/lib/notifications";

interface BookingRequestBody {
  name: string;
  email: string;
  phone: string;
  branche: string;
  employees: string;
  problem: string;
  date: string; // YYYY-MM-DD (Berlin)
  time: string; // HH:MM (Berlin)
}

interface StoredBooking extends BookingRequestBody {
  id: string;
  receivedAt: string;
  source: string;
  userAgent: string;
  ip: string;
}

// ------ Storage ------

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readBookings(): Promise<StoredBooking[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf-8");
    return JSON.parse(raw) as StoredBooking[];
  } catch {
    return [];
  }
}

async function persistBooking(booking: StoredBooking): Promise<void> {
  const bookings = await readBookings();
  bookings.push(booking);
  await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

// ------ Validation ------

function isString(v: unknown, min: number = 1): v is string {
  return typeof v === "string" && v.trim().length >= min;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(body: Partial<BookingRequestBody>): string | null {
  if (!isString(body.name)) return "Name fehlt";
  if (!isString(body.email) || !isValidEmail(body.email)) return "Email ungueltig";
  if (!isString(body.phone, 5)) return "Telefon ungueltig";
  if (!isString(body.branche)) return "Branche fehlt";
  if (!isString(body.employees)) return "Mitarbeiter fehlt";
  if (!isString(body.problem, 5)) return "Problem fehlt";
  if (!isString(body.date) || !/^\d{4}-\d{2}-\d{2}$/.test(body.date!)) {
    return "Datum ungueltig";
  }
  if (!isString(body.time) || !/^\d{2}:\d{2}$/.test(body.time!)) {
    return "Uhrzeit ungueltig";
  }
  return null;
}

// ------ Email template ------

function buildConfirmationEmail(b: BookingRequestBody): string {
  return `<!doctype html>
<html lang="de">
  <body style="font-family:Arial,sans-serif;background:#0A0F1C;color:#F1F5F9;padding:32px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:auto;background:#111827;border-radius:16px;padding:32px;border:1px solid #1F2937;">
      <tr><td>
        <h1 style="font-size:24px;margin:0 0 16px;color:#10B981;">Termin best&auml;tigt!</h1>
        <p style="font-size:16px;line-height:1.6;color:#D1D5DB;">Hi ${b.name},</p>
        <p style="font-size:16px;line-height:1.6;color:#D1D5DB;">
          dein 30-Min&uuml;tiger Strategie-Call mit Kostas Dias ist gesichert. Hier sind die Details:
        </p>
        <div style="background:#0A0F1C;border:1px solid #1F2937;border-radius:12px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px;color:#9CA3AF;font-size:13px;text-transform:uppercase;letter-spacing:1px;">Termin</p>
          <p style="margin:0;font-size:20px;font-weight:bold;color:#fff;">${b.date} um ${b.time} Uhr (Berlin)</p>
        </div>
        <p style="font-size:15px;line-height:1.6;color:#D1D5DB;">
          Kurz vor dem Termin erh&auml;ltst du den Zoom-Link per Email. Falls du etwas vorbereiten m&ouml;chtest, &uuml;berlege dir vorab:
        </p>
        <ul style="font-size:15px;line-height:1.8;color:#D1D5DB;">
          <li>Wie viele Anfragen verlierst du aktuell pro Woche?</li>
          <li>Wo verbringst du die meiste Zeit mit manueller Arbeit?</li>
          <li>Was w&auml;re dein realistisches Wachstumsziel f&uuml;r 90 Tage?</li>
        </ul>
        <p style="font-size:15px;line-height:1.6;color:#D1D5DB;">
          Bis bald,<br/>
          Kostas &amp; Team AI Growth System
        </p>
      </td></tr>
    </table>
  </body>
</html>`;
}

// ------ Route Handler ------

export async function POST(request: NextRequest): Promise<Response> {
  let body: Partial<BookingRequestBody>;
  try {
    body = (await request.json()) as Partial<BookingRequestBody>;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validate(body);
  if (validation) {
    return Response.json({ error: validation }, { status: 400 });
  }

  const validBody = body as BookingRequestBody;

  // 1. Persist locally — always
  const booking: StoredBooking = {
    ...validBody,
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    source: "ai-growth-system",
    userAgent: request.headers.get("user-agent") ?? "",
    ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "",
  };

  try {
    await persistBooking(booking);
    console.log(`[booking] Persisted booking id=${booking.id} email=${booking.email}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown";
    console.error(`[booking] Failed to persist: ${message}`);
    // weitermachen — wir wollen den Nutzer nicht bestrafen, wenn der Disk schreibt fehlschlaegt
  }

  // 2. n8n Webhook (graceful)
  const n8nPayload: BookingPayload = {
    type: "demo_booking",
    name: validBody.name,
    email: validBody.email,
    phone: validBody.phone,
    branche: validBody.branche,
    employees: validBody.employees,
    problem: validBody.problem,
    preferredDate: validBody.date,
    preferredTime: validBody.time,
    source: "ai-growth-system",
    receivedAt: booking.receivedAt,
  };
  // Fire-and-forget — kein await, blockt nicht den Response
  void sendN8nWebhook(n8nPayload);

  // 3. Trinity Customer-Profil anlegen (graceful)
  void notifyTrinity("/api/customers/lead", {
    source: "ai-growth-system",
    type: "demo_booking",
    booking,
  });

  // 4. Bestaetigungs-Email
  void sendEmail({
    to: validBody.email,
    subject: "Dein Strategie-Call ist gesichert | AI Growth System",
    html: buildConfirmationEmail(validBody),
  });

  // 5. Interne Notification an Kostas
  if (process.env.NOTIFICATION_EMAIL) {
    void sendEmail({
      to: process.env.NOTIFICATION_EMAIL,
      subject: `[NEW DEMO] ${validBody.name} - ${validBody.branche}`,
      html: `<h2>Neue Demo-Buchung</h2>
<p><strong>Name:</strong> ${validBody.name}</p>
<p><strong>Email:</strong> ${validBody.email}</p>
<p><strong>Telefon:</strong> ${validBody.phone}</p>
<p><strong>Branche:</strong> ${validBody.branche}</p>
<p><strong>Mitarbeiter:</strong> ${validBody.employees}</p>
<p><strong>Termin:</strong> ${validBody.date} um ${validBody.time} (Berlin)</p>
<p><strong>Problem:</strong></p>
<blockquote>${validBody.problem}</blockquote>`,
    });
  }

  return Response.json({
    success: true,
    bookingId: booking.id,
  });
}
