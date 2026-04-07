import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/marketing/BookingForm";

export const metadata: Metadata = {
  title: "Demo buchen — Aufwind AI",
  description:
    "30 Minuten Strategie-Call mit Kostas Dias, Gruender von DIAS SALES SOLUTIONS. Kostenlos, unverbindlich, individuell auf dein Unternehmen.",
  alternates: {
    canonical: "/buchen",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const trustSignals = [
  { label: "Kostenlos", value: "0 EUR" },
  { label: "Dauer", value: "30 Min" },
  { label: "Verpflichtung", value: "Keine" },
];

export default function BuchenPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
          <Link
            href="/"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            &larr; Zur&uuml;ck
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        {/* Background orbs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
          style={{
            backgroundImage: "radial-gradient(circle, #3B82F6, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 top-20 h-[350px] w-[350px] translate-x-1/2 rounded-full opacity-15 blur-[100px]"
          style={{
            backgroundImage: "radial-gradient(circle, #10B981, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-400">
            Strategie-Call
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            30 Min Strategie-Call <br className="hidden sm:block" />
            mit{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #3B82F6, #10B981)",
              }}
            >
              Kostas
            </span>
            {" "}&mdash; kostenlos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Wir analysieren live dein Unternehmen, identifizieren die 3 groessten
            Engpaesse in deiner Kundengewinnung und zeigen dir, wie du sie mit KI
            in 14 Tagen automatisierst. Kein Verkaufsgespraech, sondern echte
            Strategie.
          </p>

          {/* Trust signals row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustSignals.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="relative px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <BookingForm />
        </div>
      </section>

      {/* Footer note */}
      <footer className="border-t border-border/50 bg-[#060A14] py-10">
        <div className="mx-auto max-w-3xl px-4 text-center text-xs text-muted sm:px-6 lg:px-8">
          <p>
            Deine Daten werden DSGVO-konform verarbeitet und nicht an Dritte
            weitergegeben.
          </p>
          <p className="mt-2">
            <Link href="/datenschutz" className="underline hover:text-foreground">
              Datenschutz
            </Link>
            {" "}&middot;{" "}
            <Link href="/impressum" className="underline hover:text-foreground">
              Impressum
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
