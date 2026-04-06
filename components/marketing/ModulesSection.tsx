"use client";

import { motion } from "framer-motion";
import {
  Bot,
  MessageCircle,
  CalendarCheck,
  Star,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  ringColor: string;
  glowColor: string;
}

const modules: Module[] = [
  {
    icon: Bot,
    title: "AI Chatbot 24/7",
    description:
      "Beantwortet Anfragen in Sekunden, qualifiziert Leads automatisch. Aktiv auf Website, WhatsApp & Social Media.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    ringColor: "ring-blue-500/20",
    glowColor: "rgba(59, 130, 246, 0.25)",
  },
  {
    icon: MessageCircle,
    title: "Automatisches Follow-up",
    description:
      "WhatsApp + Email Sequenzen die Leads warm halten. Kein Lead geht mehr verloren.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    ringColor: "ring-emerald-500/20",
    glowColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    icon: CalendarCheck,
    title: "KI-Terminbuchung",
    description:
      "Bucht Termine automatisch, sendet Erinnerungen, reduziert No-Shows um 70\u201380%.",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    ringColor: "ring-violet-500/20",
    glowColor: "rgba(139, 92, 246, 0.25)",
  },
  {
    icon: Star,
    title: "Reputations-Automatisierung",
    description:
      "Sammelt Google Bewertungen automatisch nach jedem Termin. Dein Ruf w\u00e4chst auf Autopilot.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    ringColor: "ring-yellow-500/20",
    glowColor: "rgba(234, 179, 8, 0.25)",
  },
  {
    icon: Search,
    title: "Lead Scraping + Outreach",
    description:
      "Findet neue Kunden in deiner Region und kontaktiert sie automatisch. Jeden Monat.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    ringColor: "ring-cyan-500/20",
    glowColor: "rgba(6, 182, 212, 0.25)",
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
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      style={{ "--hover-glow": mod.glowColor } as React.CSSProperties}
      className="glass-card rounded-2xl p-6 sm:p-8 cursor-default transition-shadow duration-300 hover:shadow-[0_0_30px_var(--hover-glow)] group"
    >
      {/* Icon circle */}
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${mod.bgColor} ${mod.color} ring-1 ${mod.ringColor} transition-all duration-300 group-hover:scale-110`}
      >
        <Icon className="h-7 w-7" strokeWidth={1.8} />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
        {mod.title}
      </h3>

      {/* Description */}
      <p className="text-muted leading-relaxed text-sm sm:text-base">
        {mod.description}
      </p>
    </motion.div>
  );
}

export default function ModulesSection() {
  const topRow = modules.slice(0, 3);
  const bottomRow = modules.slice(3);

  return (
    <section id="module" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            5 Module. Ein System.{" "}
            <span className="gradient-text">Null Aufwand</span> f&uuml;r dich.
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Alles was du brauchst, um Kunden zu gewinnen und zu halten &mdash; vollautomatisch.
          </p>
        </motion.div>

        {/* Top row: 3 cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topRow.map((mod) => (
            <ModuleCard key={mod.title} mod={mod} />
          ))}
        </motion.div>

        {/* Bottom row: 2 cards centered */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {bottomRow.map((mod) => (
            <ModuleCard key={mod.title} mod={mod} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
