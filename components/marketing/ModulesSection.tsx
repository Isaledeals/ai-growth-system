"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
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
  color: string;
  bgColor: string;
  ringColor: string;
  glowColor: string;
}

const modules: Module[] = [
  {
    icon: Bot,
    title: "KI-Chatbot 24/7",
    description:
      "Beantwortet Kundenanfragen in Sekunden — auf Website, WhatsApp, Instagram und Facebook. Qualifiziert Leads automatisch und bucht direkt Termine.",
    painPoint: "62% der Anfragen kommen außerhalb der Öffnungszeiten",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    ringColor: "ring-blue-500/20",
    glowColor: "rgba(59, 130, 246, 0.25)",
  },
  {
    icon: Phone,
    title: "KI-Telefonassistent",
    description:
      "Dein virtueller Mitarbeiter am Telefon. Nimmt jeden Anruf an, beantwortet Fragen, bucht Termine — auch um 23 Uhr oder am Wochenende.",
    painPoint: "Jeder verpasste Anruf = Ø €150 verlorener Umsatz",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    ringColor: "ring-rose-500/20",
    glowColor: "rgba(244, 63, 94, 0.25)",
  },
  {
    icon: CalendarCheck,
    title: "Smart Terminbuchung",
    description:
      "Kunden buchen online, per Chat oder am Telefon. Automatische Kalender-Synchronisation, Bestätigungen und intelligente Terminfindung.",
    painPoint: "Manuelles Hin-und-Her kostet 5+ Stunden pro Woche",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    ringColor: "ring-violet-500/20",
    glowColor: "rgba(139, 92, 246, 0.25)",
  },
  {
    icon: MessageCircle,
    title: "Automatisches Follow-up",
    description:
      "WhatsApp- und Email-Sequenzen die Interessenten warm halten. Nach 5 Min, 1 Std, 1 Tag — bis der Termin steht. Kein Lead geht mehr verloren.",
    painPoint: "80% der Leads brauchen 3-5 Kontaktpunkte bis zur Buchung",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    ringColor: "ring-emerald-500/20",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    icon: ShieldCheck,
    title: "No-Show Killer",
    description:
      "SMS- und WhatsApp-Erinnerungen 24h und 1h vor dem Termin. Bei Absage: Wartelisten-Nachbesetzung in Minuten statt leerem Stuhl.",
    painPoint: "No-Shows kosten lokale Unternehmen Ø €800-2.000/Monat",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    ringColor: "ring-amber-500/20",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
  {
    icon: Star,
    title: "Reputations-Autopilot",
    description:
      "Nach jedem Termin geht automatisch eine Review-Anfrage raus. Zufriedene Kunden bewerten auf Google, unzufriedene melden sich direkt bei dir.",
    painPoint: "Nur 5% der zufriedenen Kunden hinterlassen freiwillig eine Bewertung",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    ringColor: "ring-yellow-500/20",
    glowColor: "rgba(234, 179, 8, 0.25)",
  },
  {
    icon: UserCheck,
    title: "Kundenreaktivierung",
    description:
      "Automatisch Kunden kontaktieren die seit 3, 6 oder 12 Monaten nicht mehr da waren. Personalisierte Nachrichten mit Angeboten bringen sie zurück.",
    painPoint: "Bestehende Kunden zurückzugewinnen kostet 5x weniger als Neukunden",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    ringColor: "ring-cyan-500/20",
    glowColor: "rgba(6, 182, 212, 0.25)",
  },
  {
    icon: Share2,
    title: "Social Media Autopilot",
    description:
      "KI generiert Posts für Instagram, Facebook und Google Business. Automatische Updates wie freie Termine, neue Bewertungen oder Aktionen.",
    painPoint: "Konsistente Social-Media-Präsenz bringt 3x mehr Anfragen",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
    ringColor: "ring-indigo-500/20",
    glowColor: "rgba(99, 102, 241, 0.25)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ModuleCard({ mod }: { mod: Module }) {
  const Icon = mod.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--spotlight-x", `${x}px`);
    card.style.setProperty("--spotlight-y", `${y}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      onMouseMove={handleMouseMove}
      style={{ "--hover-glow": mod.glowColor } as React.CSSProperties}
      className="glass-card relative rounded-2xl p-6 cursor-default border border-white/10 transition-all duration-300 hover:shadow-[0_0_30px_var(--hover-glow)] hover:border-white/20 group overflow-hidden flex flex-col"
    >
      {/* Spotlight radial gradient that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--hover-glow), transparent 60%)",
        }}
      />

      {/* Icon circle */}
      <div
        className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${mod.bgColor} ${mod.color} ring-1 ${mod.ringColor} transition-all duration-300 group-hover:scale-110`}
      >
        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="relative text-base sm:text-lg font-semibold text-foreground mb-2">
        {mod.title}
      </h3>

      {/* Description */}
      <p className="relative text-muted leading-relaxed text-sm flex-1">
        {mod.description}
      </p>

      {/* Pain Point badge */}
      <div className="relative mt-4 pt-3 border-t border-white/5">
        <span
          className={`inline-block text-xs font-medium px-3 py-1.5 rounded-full ${mod.bgColor} ${mod.color} ring-1 ${mod.ringColor}`}
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
    <section id="module" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            8 Module. Ein System.{" "}
            <span className="gradient-text">Null Aufwand f&uuml;r dich.</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Jedes Modul l&ouml;st ein echtes Alltagsproblem &mdash; vollautomatisch.
          </p>
        </motion.div>

        {/* Top row: 4 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {bottomRow.map((mod) => (
            <ModuleCard key={mod.title} mod={mod} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
