"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { PhoneOff, CalendarX, StarOff, UserX } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
  {
    icon: PhoneOff,
    title: "Verpasste Anrufe",
    description:
      "Jeder 4. Anruf geht verloren weil niemand rangeht. Das sind \u00d8 \u20ac150 pro Anruf die zur Konkurrenz gehen.",
  },
  {
    icon: CalendarX,
    title: "No-Shows",
    description:
      "18% deiner Termine erscheinen nicht. Leerer Stuhl, verlorenes Geld, kein Ersatz.",
  },
  {
    icon: StarOff,
    title: "Keine Bewertungen",
    description:
      "Nur 5% der zufriedenen Kunden bewerten freiwillig. Dein Google-Profil w\u00e4chst nicht.",
  },
  {
    icon: UserX,
    title: "Schlafende Kunden",
    description:
      "62% deiner Bestandskunden waren seit 6+ Monaten nicht mehr da. Sie haben dich vergessen \u2014 nicht umgekehrt.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const GLOW_COLOR = "rgba(239, 68, 68, 0.25)";

function PainPointCard({ point }: { point: PainPoint }) {
  const Icon = point.icon;
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
      onMouseMove={handleMouseMove}
      style={{ "--hover-glow": GLOW_COLOR } as React.CSSProperties}
      className="glass-card relative rounded-2xl p-6 sm:p-8 group hover:border-red-500/30 transition-all duration-300 hover:shadow-[0_0_30px_var(--hover-glow)] overflow-hidden"
    >
      {/* Spotlight radial gradient that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--hover-glow), transparent 60%)",
        }}
      />

      {/* Icon */}
      <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 group-hover:bg-red-500/15 transition-all duration-300 group-hover:scale-110">
        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="relative text-lg sm:text-xl font-semibold text-foreground mb-2">
        {point.title}
      </h3>

      {/* Description */}
      <p className="relative text-muted leading-relaxed text-sm sm:text-base">
        {point.description}
      </p>
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle red gradient background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/5 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Kommt dir das{" "}
            <span className="text-red-400">bekannt vor</span>?
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-red-500/60" />
        </motion.div>

        {/* Pain point cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {painPoints.map((point) => (
            <PainPointCard key={point.title} point={point} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
