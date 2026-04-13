"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import AufwindBeam from "@/components/marketing/AufwindBeam";
import TracingBeam from "@/components/ui/TracingBeam";
import {
  Bot,
  Phone,
  CalendarCheck,
  MessageCircle,
  ShieldCheck,
  Star,
  UserCheck,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  painPoint: string;
  iconBg: string;
  iconColor: string;
  iconGlow: string;
  badgeBg: string;
  badgeText: string;
  spotlightColor: string;
}

const modules: Module[] = [
  {
    icon: Bot,
    title: "KI-Chatbot 24/7",
    description:
      "Beantwortet Kundenanfragen in Sekunden — auf Website, WhatsApp, Instagram und Facebook. Qualifiziert Leads automatisch und bucht direkt Termine.",
    painPoint: "62% der Anfragen kommen außerhalb der Öffnungszeiten",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    iconGlow: "rgba(37, 99, 235, 0.25)",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700",
    spotlightColor: "rgba(37, 99, 235, 0.07)",
  },
  {
    icon: Phone,
    title: "KI-Telefonassistent",
    description:
      "Dein virtueller Mitarbeiter am Telefon. Nimmt jeden Anruf an, beantwortet Fragen, bucht Termine — auch um 23 Uhr oder am Wochenende.",
    painPoint: "Jeder verpasste Anruf = Ø €150 verlorener Umsatz",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    iconGlow: "rgba(225, 29, 72, 0.25)",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700",
    spotlightColor: "rgba(225, 29, 72, 0.07)",
  },
  {
    icon: CalendarCheck,
    title: "Smart Terminbuchung",
    description:
      "Kunden buchen online, per Chat oder am Telefon. Automatische Kalender-Synchronisation, Bestätigungen und intelligente Terminfindung.",
    painPoint: "Manuelles Hin-und-Her kostet 5+ Stunden pro Woche",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    iconGlow: "rgba(124, 58, 237, 0.25)",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
    spotlightColor: "rgba(124, 58, 237, 0.07)",
  },
  {
    icon: MessageCircle,
    title: "Automatisches Follow-up",
    description:
      "WhatsApp- und Email-Sequenzen die Interessenten warm halten. Nach 5 Min, 1 Std, 1 Tag — bis der Termin steht. Kein Lead geht mehr verloren.",
    painPoint: "80% der Leads brauchen 3-5 Kontaktpunkte bis zur Buchung",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    iconGlow: "rgba(5, 150, 105, 0.25)",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    spotlightColor: "rgba(5, 150, 105, 0.07)",
  },
  {
    icon: ShieldCheck,
    title: "No-Show Killer",
    description:
      "SMS- und WhatsApp-Erinnerungen 24h und 1h vor dem Termin. Bei Absage: Wartelisten-Nachbesetzung in Minuten statt leerem Stuhl.",
    painPoint: "No-Shows kosten lokale Unternehmen Ø €800-2.000/Monat",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    iconGlow: "rgba(217, 119, 6, 0.25)",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    spotlightColor: "rgba(217, 119, 6, 0.07)",
  },
  {
    icon: Star,
    title: "Reputations-Autopilot",
    description:
      "Nach jedem Termin geht automatisch eine Review-Anfrage raus. Zufriedene Kunden bewerten auf Google, unzufriedene melden sich direkt bei dir.",
    painPoint: "Nur 5% der zufriedenen Kunden bewerten freiwillig",
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    iconGlow: "rgba(202, 138, 4, 0.25)",
    badgeBg: "bg-yellow-50",
    badgeText: "text-yellow-700",
    spotlightColor: "rgba(202, 138, 4, 0.07)",
  },
  {
    icon: UserCheck,
    title: "Kundenreaktivierung",
    description:
      "Automatisch Kunden kontaktieren die seit 3, 6 oder 12 Monaten nicht mehr da waren. Personalisierte Nachrichten mit Angeboten bringen sie zurück.",
    painPoint: "Bestehende Kunden zurückgewinnen kostet 5x weniger",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    iconGlow: "rgba(8, 145, 178, 0.25)",
    badgeBg: "bg-cyan-50",
    badgeText: "text-cyan-700",
    spotlightColor: "rgba(8, 145, 178, 0.07)",
  },
  {
    icon: Share2,
    title: "Social Media Autopilot",
    description:
      "KI generiert Posts für Instagram, Facebook und Google Business. Automatische Updates wie freie Termine, neue Bewertungen oder Aktionen.",
    painPoint: "Konsistente Präsenz bringt 3x mehr Anfragen",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    iconGlow: "rgba(79, 70, 229, 0.25)",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700",
    spotlightColor: "rgba(79, 70, 229, 0.07)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ModuleCard({ mod }: { mod: Module }) {
  const Icon = mod.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--spotlight-x", `${x}px`);
      card.style.setProperty("--spotlight-y", `${y}px`);
      card.style.setProperty("--spotlight-color", mod.spotlightColor);
    },
    [mod.spotlightColor]
  );

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      onMouseMove={handleMouseMove}
      className="spotlight-card light-card relative rounded-2xl p-6 cursor-default transition-all duration-300 group flex flex-col"
    >
      {/* Spotlight overlay — color-aware per card */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--spotlight-color, rgba(37,99,235,0.07)) 0%, transparent 65%)",
        }}
      />

      {/* Glassmorphic icon container */}
      <div className="relative mb-4 flex-shrink-0">
        <div
          className={`
            relative flex h-12 w-12 items-center justify-center rounded-xl
            backdrop-blur-sm border border-white/60
            transition-transform duration-300 group-hover:scale-110
            ${mod.iconBg}
          `}
          style={{
            boxShadow: `0 2px 8px ${mod.iconGlow}, inset 0 1px 0 rgba(255,255,255,0.8)`,
          }}
        >
          {/* Inner glow ring */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${mod.iconGlow} 0%, transparent 70%)`,
            }}
          />
          <Icon
            className={`relative h-6 w-6 ${mod.iconColor}`}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="relative text-base sm:text-lg font-semibold text-foreground mb-2">
        {mod.title}
      </h3>

      {/* Description */}
      <p className="relative text-muted leading-relaxed text-sm flex-1">
        {mod.description}
      </p>

      {/* Pain Point Badge */}
      <div className="relative mt-4 pt-3 border-t border-slate-100">
        <span
          className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full ${mod.badgeBg} ${mod.badgeText}`}
        >
          {mod.painPoint}
        </span>
      </div>
    </motion.div>
  );
}

export default function ModulesSection() {
  const topRow = modules.slice(0, 4);
  const bottomRow = modules.slice(4);

  return (
    <section
      id="module"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
    >
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-emerald-50 opacity-50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <AufwindBeam variant="badge" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            8 KI-Module. Ein System.{" "}
            <span className="gradient-text">Null Aufwand.</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Jedes Modul l&ouml;st ein konkretes Problem das dir t&auml;glich Geld kostet.
          </p>
        </motion.div>

        <TracingBeam>
          {/* Top row: 4 cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {topRow.map((mod) => (
              <ModuleCard key={mod.title} mod={mod} />
            ))}
          </motion.div>

          {/* Bottom row: 4 cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {bottomRow.map((mod) => (
              <ModuleCard key={mod.title} mod={mod} />
            ))}
          </motion.div>
        </TracingBeam>
      </div>
    </section>
  );
}
