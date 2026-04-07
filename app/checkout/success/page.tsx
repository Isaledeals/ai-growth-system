import type { Metadata } from "next";
import Link from "next/link";
import SuccessTracker from "@/components/marketing/SuccessTracker";

export const metadata: Metadata = {
  title: "Willkommen an Bord — Aufwind AI",
  description:
    "Vielen Dank fuer dein Vertrauen. So geht es jetzt weiter mit deinem Aufwind AI.",
  robots: {
    index: false,
    follow: false,
  },
};

interface PageProps {
  searchParams: Promise<{ session_id?: string; plan?: string }>;
}

const nextSteps = [
  {
    n: "1",
    title: "Bestaetigung & Zugang",
    text: "Du erhaeltst innerhalb von 5 Minuten eine Bestaetigungs-Email mit deinem Dashboard-Zugang und Onboarding-Link.",
  },
  {
    n: "2",
    title: "Setup-Call mit Kostas",
    text: "Innerhalb von 24 Stunden meldet sich Kostas persoenlich, um den Setup-Call zu vereinbaren — wir konfigurieren alles fuer dich.",
  },
  {
    n: "3",
    title: "Live in 5-7 Tagen",
    text: "Dein Aufwind AI ist innerhalb von 5-7 Werktagen live. Ab Tag 1 verpasst du keine Anfrage mehr.",
  },
];

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id ?? "";
  const plan = params.plan ?? "pro";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Tracker — fires the n8n customer onboarding webhook on mount */}
      <SuccessTracker sessionId={sessionId} plan={plan} />

      {/* Header */}
      <header className="border-b border-border/50 bg-gray-950/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #3B82F6, #10B981)",
            }}
          >
            Aufwind AI
          </Link>
        </nav>
      </header>

      {/* Hero — Confirmation */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #10B981, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Checkmark icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/15 ring-4 ring-emerald-500/30">
            <svg
              className="h-12 w-12 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <span className="mt-6 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400">
            {plan === "premium" ? "Premium-Plan aktiv" : "Pro-Plan aktiv"}
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Willkommen an Bord!
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Deine Buchung war erfolgreich. Du hast soeben den ersten Schritt
            gemacht, dein Unternehmen zu skalieren — vollautomatisch.
            Wir freuen uns riesig, mit dir zu arbeiten.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            Was passiert als{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #3B82F6, #10B981)",
              }}
            >
              n&auml;chstes
            </span>
            ?
          </h2>

          <div className="grid gap-5 sm:grid-cols-3">
            {nextSteps.map((step) => (
              <div
                key={step.n}
                className="glass-card rounded-2xl p-6 transition-all hover:border-emerald-500/30"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-base font-bold text-emerald-400">
                  {step.n}
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Setup Call buchen */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="glass-card rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-blue-500/5 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Direkt durchstarten?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-300">
              Buche jetzt direkt deinen Setup-Beratungs-Call und wir starten
              das Onboarding noch heute. Schnellster Weg zum Live-System.
            </p>
            <Link
              href="/buchen"
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:brightness-110 hover:shadow-emerald-500/30 sm:text-lg"
              style={{
                backgroundImage: "linear-gradient(135deg, #10B981, #059669)",
              }}
            >
              Setup-Call buchen
            </Link>
            <p className="mt-4 text-xs text-muted">
              Fragen? Schreib uns an{" "}
              <a
                href="mailto:kostasdias.dubai@gmail.com"
                className="underline hover:text-foreground"
              >
                kostasdias.dubai@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-[#060A14] py-8">
        <div className="mx-auto max-w-3xl px-4 text-center text-xs text-muted sm:px-6 lg:px-8">
          <p>
            &copy; 2026 Aufwind AI &middot; DIAS SALES SOLUTIONS - FZCO
          </p>
        </div>
      </footer>
    </div>
  );
}
