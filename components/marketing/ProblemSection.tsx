"use client";

import { motion } from "framer-motion";
import { PhoneOff, MessageSquareOff, CalendarX, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
  {
    icon: PhoneOff,
    title: "Verpasste Anfragen",
    description:
      "Kunden rufen an und niemand geht ran. Abends um 20 Uhr kommt eine WhatsApp \u2014 du siehst sie erst morgen. Der Kunde ist l\u00e4ngst woanders.",
  },
  {
    icon: MessageSquareOff,
    title: "Kein Follow-up",
    description:
      "80% deiner Angebote versanden ohne Nachfass. Du wei\u00dft es, aber wer hat die Zeit 50 Leads pro Woche manuell nachzutelefonieren?",
  },
  {
    icon: CalendarX,
    title: "No-Shows & Absagen",
    description:
      "Termine werden vergessen, nicht wahrgenommen, kurzfristig abgesagt. Jeder leere Slot kostet dich \u20ac80-150.",
  },
  {
    icon: EyeOff,
    title: "Unsichtbar bei Google",
    description:
      "Deine Konkurrenz hat 200 Google Bewertungen. Du hast 12. Raten wir mal wer den n\u00e4chsten Neukunden bekommt.",
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
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={cardVariants}
                className="glass-card rounded-2xl p-6 sm:p-8 group hover:border-red-500/30 transition-colors duration-300"
              >
                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400 ring-1 ring-red-500/20 group-hover:bg-red-500/15 transition-colors duration-300">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                  {point.title}
                </h3>

                {/* Description */}
                <p className="text-muted leading-relaxed text-sm sm:text-base">
                  {point.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
