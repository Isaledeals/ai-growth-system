import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import BrancheCard from "@/components/marketing/BrancheCard";
import { getAllBranchenTemplates } from "@/lib/branchen-templates";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "KI-Automatisierung nach Branche | Aufwind AI",
  description:
    "Maßgeschneiderte KI-Lösungen für Zahnärzte, Friseure, Handwerk, Beauty, Gastro, Physio & Anwälte. Mehr Termine, weniger Arbeit — vollautomatisch.",
  keywords: [
    "KI Automatisierung Branchen",
    "KI für Zahnärzte",
    "KI für Friseure",
    "KI für Handwerk",
    "KI für Beauty",
    "KI für Gastro",
    "KI für Physio",
    "KI für Anwälte",
    "Branchen-Automatisierung",
  ],
  alternates: {
    canonical: "/branche",
  },
  openGraph: {
    title: "KI-Automatisierung nach Branche | Aufwind AI",
    description:
      "Maßgeschneiderte KI-Lösungen für lokale Unternehmen. Wähle deine Branche und entdecke, wie wir dein Wachstum automatisieren.",
    url: `${SITE_CONFIG.domain}/branche`,
    siteName: "Aufwind AI",
    locale: "de_DE",
    type: "website",
  },
};

export default function BranchenOverviewPage() {
  const branchen = getAllBranchenTemplates();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0F1C] pb-24 pt-32">
        {/* Hintergrund-Effekte */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div className="h-[600px] w-[900px] rounded-full bg-gradient-to-b from-blue-500/10 via-emerald-500/5 to-transparent blur-3xl" />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-gray-500">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-300">Branchen</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blue-300">
              Branchen-Lösungen
            </span>
            <h1 className="mb-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              KI-Automatisierung für{" "}
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                deine Branche
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">
              Jede Branche hat eigene Herausforderungen. Unsere KI-Lösungen sind
              maßgeschneidert für die Anforderungen deines Geschäfts — vom
              ersten Anruf bis zur Folgebuchung.
            </p>
          </div>

          {/* Branchen-Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {branchen.map((branche, index) => (
              <BrancheCard key={branche.slug} branche={branche} index={index} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-gray-900/70 to-emerald-500/10 p-10 text-center backdrop-blur-sm">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl font-bold text-white sm:text-4xl">
              Deine Branche nicht dabei?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-400">
              Unser System passt sich jedem lokalen Dienstleister an. Buche
              einen kostenlosen Demo-Call und erfahre, wie wir deinen Betrieb
              automatisieren.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={SITE_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
              >
                Kostenlosen Demo-Call buchen
              </a>
              <Link
                href="/#preise"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Preise ansehen
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
