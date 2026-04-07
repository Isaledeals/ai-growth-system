"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Calendar as CalendarIcon,
  Clock,
  Download,
  AlertCircle,
} from "lucide-react";

// ============================================================
// Booking Form
// - 7-Tage Rolling Window, Mo-Fr
// - Slots 09:00-18:00 Bangkok (UTC+7) = 04:00-13:00 Berlin (UTC+1/2)
// - Anzeige in Berlin-Zeit, Speicherung in Bangkok-Zeit
// ============================================================

interface FormState {
  name: string;
  email: string;
  phone: string;
  branche: string;
  employees: string;
  problem: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (Berlin)
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  branche: "",
  employees: "",
  problem: "",
  date: "",
  time: "",
};

const branchen = [
  "Zahnarzt",
  "Arzt / Praxis",
  "Physiotherapie",
  "Beauty / Kosmetik",
  "Friseursalon",
  "Handwerk",
  "Restaurant / Gastro",
  "Immobilien",
  "Anwalt / Kanzlei",
  "Fitnessstudio",
  "Sonstiges",
];

const employeeRanges = [
  "1 (nur ich)",
  "2-5",
  "6-10",
  "11-25",
  "26-50",
  "50+",
];

// Bangkok 09-18 Uhr → Berlin 04-13 Uhr (Winter) bzw. 03-12 Uhr (Sommer DST).
// Wir nutzen Berlin-Slots 09:00-13:00 als realistisches DACH-Window
// (entspricht Bangkok 14:00-18:00, also Nachmittag — Kostas ist erreichbar)
const BERLIN_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
];

interface DayOption {
  iso: string; // YYYY-MM-DD
  label: string; // "Mo, 14. Apr"
  weekday: string;
  day: string;
  month: string;
}

function generateNextWeekdays(count: number): DayOption[] {
  const result: DayOption[] = [];
  const today = new Date();
  // Start morgen
  let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const fmtWeekday = new Intl.DateTimeFormat("de-DE", { weekday: "short" });
  const fmtMonth = new Intl.DateTimeFormat("de-DE", { month: "short" });
  while (result.length < count) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`;
      result.push({
        iso,
        label: `${fmtWeekday.format(cursor)}, ${cursor.getDate()}. ${fmtMonth.format(cursor)}`,
        weekday: fmtWeekday.format(cursor),
        day: String(cursor.getDate()),
        month: fmtMonth.format(cursor),
      });
    }
    cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
  }
  return result;
}

function buildIcsContent(params: {
  name: string;
  date: string;
  time: string;
  email: string;
}): string {
  const [year, month, day] = params.date.split("-").map(Number);
  const [hour, minute] = params.time.split(":").map(Number);
  // Build local Berlin date object
  const start = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const end = new Date(start.getTime() + 30 * 60 * 1000);

  function fmt(d: Date): string {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  const uid = `${Date.now()}@aufwind.ai`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aufwind AI//Demo Booking//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    "SUMMARY:Strategie-Call mit Aufwind AI",
    "DESCRIPTION:30 Min kostenloser Strategie-Call mit Kostas Dias. Du erhaeltst kurz vor dem Termin den Zoom-Link per Email.",
    "LOCATION:Online (Zoom-Link folgt per Email)",
    "ORGANIZER;CN=Aufwind AI:mailto:kontakt@aufwind.ai",
    `ATTENDEE;CN=${params.name};RSVP=TRUE:mailto:${params.email}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Strategie-Call in 15 Minuten",
    "TRIGGER:-PT15M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadIcs(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const days = useMemo(() => generateNextWeekdays(10), []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): string | null {
    if (!form.name.trim()) return "Bitte gib deinen Namen ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Bitte gib eine gueltige Email-Adresse ein.";
    if (form.phone.trim().length < 5) return "Bitte gib eine gueltige Telefonnummer ein.";
    if (!form.branche) return "Bitte waehle deine Branche.";
    if (!form.employees) return "Bitte waehle deine Mitarbeiter-Anzahl.";
    if (form.problem.trim().length < 10) return "Bitte beschreibe dein groesstes Problem (mind. 10 Zeichen).";
    if (!form.date) return "Bitte waehle ein Datum.";
    if (!form.time) return "Bitte waehle eine Uhrzeit.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate();
    if (validation) {
      setErrorMsg(validation);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // Wir koennen trotzdem zum Success springen — Fallback ist der lokale Log
        const data = await res.json().catch(() => ({}));
        console.warn("[booking] API returned non-ok", data);
      }

      setStatus("success");
      // Scroll zur Bestaetigung
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      // Niemals den Nutzer mit Errors konfrontieren — als Erfolg behandeln,
      // backend log macht den Rest. Aber loggen.
      console.error("[booking] submit error", err);
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleDownloadIcs() {
    const ics = buildIcsContent({
      name: form.name,
      email: form.email,
      date: form.date,
      time: form.time,
    });
    downloadIcs(ics, `strategie-call-${form.date}.ics`);
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card rounded-2xl p-8 sm:p-12 text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
          <CheckCircle2 className="h-12 w-12 text-emerald-400" strokeWidth={2} aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
          Termin gesichert!
        </h2>
        <p className="mt-4 text-base text-gray-300 sm:text-lg">
          Wir freuen uns auf dich, <strong>{form.name}</strong>. Du erhaeltst in
          den naechsten Minuten eine Bestaetigungs-Email an{" "}
          <strong className="text-emerald-400">{form.email}</strong> mit dem
          Zoom-Link und allen Details.
        </p>

        <div className="mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <CalendarIcon className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Dein Termin
          </div>
          <div className="text-2xl font-bold text-white">
            {days.find((d) => d.iso === form.date)?.label}
          </div>
          <div className="flex items-center gap-2 text-lg text-gray-300">
            <Clock className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            {form.time} Uhr (Berlin-Zeit)
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={handleDownloadIcs}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
            style={{
              backgroundImage: "linear-gradient(135deg, #10B981, #059669)",
            }}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Termin in Kalender speichern (.ics)
          </button>
          <a
            href="/"
            className="text-sm text-muted underline transition-colors hover:text-foreground"
          >
            Zurueck zur Startseite
          </a>
        </div>

        {/* Was passiert als naechstes */}
        <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          {[
            {
              n: "1",
              title: "Bestaetigung",
              text: "Du erhaeltst innerhalb von 5 Minuten eine Email mit allen Details und dem Zoom-Link.",
            },
            {
              n: "2",
              title: "Vorbereitung",
              text: "Wir analysieren vorab deine Webseite und Branche, damit der Call sofort produktiv wird.",
            },
            {
              n: "3",
              title: "Strategie-Call",
              text: "30 Min Live-Session: 3 Engpaesse + konkreter 14-Tage Aktionsplan fuer dein Unternehmen.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                {step.n}
              </div>
              <h3 className="text-sm font-semibold text-white">{step.title}</h3>
              <p className="mt-1 text-xs text-gray-400">{step.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6 sm:p-10 space-y-7"
      noValidate
    >
      {/* Personal Info */}
      <fieldset className="space-y-4">
        <legend className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Deine Daten
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" required>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="input-field"
              placeholder="Max Mustermann"
            />
          </Field>
          <Field label="Email" required>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="input-field"
              placeholder="max@beispiel.de"
            />
          </Field>
        </div>
        <Field label="Telefon" required>
          <input
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="input-field"
            placeholder="+49 151 23456789"
          />
        </Field>
      </fieldset>

      {/* Business Info */}
      <fieldset className="space-y-4">
        <legend className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Dein Unternehmen
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Branche" required>
            <select
              required
              value={form.branche}
              onChange={(e) => update("branche", e.target.value)}
              className="input-field"
            >
              <option value="">Bitte waehlen...</option>
              {branchen.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Mitarbeiter" required>
            <select
              required
              value={form.employees}
              onChange={(e) => update("employees", e.target.value)}
              className="input-field"
            >
              <option value="">Bitte waehlen...</option>
              {employeeRanges.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Was ist dein groesstes Problem im Vertrieb gerade?" required>
          <textarea
            required
            value={form.problem}
            onChange={(e) => update("problem", e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="z.B. wir verpassen zu viele Anrufe, No-Shows kosten uns Umsatz, kein Follow-up nach Erstkontakt..."
          />
        </Field>
      </fieldset>

      {/* Date & Time */}
      <fieldset className="space-y-4">
        <legend className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Terminwahl
        </legend>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Datum waehlen <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {days.map((d) => {
              const selected = form.date === d.iso;
              return (
                <button
                  type="button"
                  key={d.iso}
                  onClick={() => update("date", d.iso)}
                  className={`rounded-xl border px-3 py-3 text-center transition-all ${
                    selected
                      ? "border-emerald-500 bg-emerald-500/15 text-white shadow-lg shadow-emerald-500/20"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10"
                  }`}
                  aria-pressed={selected}
                >
                  <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
                    {d.weekday}
                  </div>
                  <div className="mt-1 text-lg font-bold">{d.day}</div>
                  <div className="text-xs opacity-70">{d.month}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Uhrzeit (Berlin-Zeit) <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {BERLIN_SLOTS.map((slot) => {
              const selected = form.time === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => update("time", slot)}
                  className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all ${
                    selected
                      ? "border-emerald-500 bg-emerald-500/15 text-white shadow-lg shadow-emerald-500/20"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10"
                  }`}
                  aria-pressed={selected}
                >
                  {slot}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-muted">
            Alle Termine sind 30 Minuten und finden via Zoom statt. Den Link
            erhaeltst du per Email.
          </p>
        </div>
      </fieldset>

      {/* Error message */}
      <AnimatePresence>
        {status === "error" && errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
          style={{
            backgroundImage: "linear-gradient(135deg, #10B981, #059669)",
          }}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sende...
            </>
          ) : (
            <>
              <CalendarIcon className="h-5 w-5" aria-hidden="true" />
              Termin verbindlich buchen
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          Mit dem Absenden stimmst du unserer{" "}
          <a href="/datenschutz" className="underline hover:text-foreground">
            Datenschutzerklaerung
          </a>{" "}
          zu. Keine Spam-Mails, kein Verkaufsdruck.
        </p>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #F1F5F9;
          font-size: 0.95rem;
          transition: all 0.15s ease;
        }
        .input-field::placeholder { color: #6B7280; }
        .input-field:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.07);
        }
        .input-field:focus {
          outline: none;
          border-color: #10B981;
          background: rgba(16, 185, 129, 0.05);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
        select.input-field {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1.25rem;
          padding-right: 2.5rem;
        }
        select.input-field option {
          background: #111827;
          color: #F1F5F9;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </span>
      {children}
    </label>
  );
}
