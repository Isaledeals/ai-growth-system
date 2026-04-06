"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/constants";

interface CaseStudyMeta {
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  ringColor: string;
  borderColor: string;
  glowColor: string;
}

interface CaseStudyExtended {
  id: string;
  business: string;
  industry: string;
  stats: { label: string; value: string }[];
  quote: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  ringColor: string;
  borderColor: string;
  glowColor: string;
}

const caseStudyMeta: Record<string, CaseStudyMeta> = {
  "zahnarzt-weber": {
    description:
      "Zahnarztpraxis mit 3 Behandlungszimmern in München. Hohe No-Show-Rate und fehlende Online-Bewertungen bremsten das Wachstum.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-300",
    ringColor: "ring-blue-500/20",
    borderColor: "border-l-blue-500",
    glowColor: "rgba(59, 130, 246, 0.25)",
  },
  "beauty-glamour": {
    description:
      "Premium Beauty Studio in Hamburg. Stamm­kunden kamen seltener, neue Kunden fanden den Salon kaum online.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-300",
    ringColor: "ring-pink-500/20",
    borderColor: "border-l-pink-500",
    glowColor: "rgba(236, 72, 153, 0.25)",
  },
  "handwerk-mueller": {
    description:
      "Handwerksbetrieb mit 12 Mitarbeitern in Stuttgart. Angebote versandeten, Neukunden-Akquise war rein auf Empfehlung.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-300",
    ringColor: "ring-amber-500/20",
    borderColor: "border-l-amber-500",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
};

const enrichedStudies: CaseStudyExtended[] = CASE_STUDIES.map((cs) => ({
  ...cs,
  ...caseStudyMeta[cs.id],
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

function CaseStudyCard({ study }: { study: CaseStudyExtended }) {
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
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      style={{ "--hover-glow": study.glowColor } as React.CSSProperties}
      className={`glass-card relative rounded-2xl overflow-hidden border-l-4 ${study.borderColor} transition-all duration-300 hover:shadow-[0_0_30px_var(--hover-glow)] hover:border-white/20 group flex flex-col`}
    >
      {/* Spotlight radial gradient that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--hover-glow), transparent 60%)",
        }}
      />

      {/* Header */}
      <div className="relative p-6 sm:p-7 pb-0">
        {/* Industry badge */}
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${study.bgColor} ${study.color} ring-1 ${study.ringColor}`}
        >
          {study.industry}
        </span>

        {/* Company name */}
        <h3 className="mt-4 text-lg sm:text-xl font-bold text-foreground">
          {study.business}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted leading-relaxed">
          {study.description}
        </p>
      </div>

      {/* Stats */}
      <div className="relative px-6 sm:px-7 py-5">
        <div className="grid grid-cols-3 gap-3">
          {study.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-surface-light/60 p-3 text-center ring-1 ring-border/50"
            >
              <div
                className={`text-lg sm:text-xl font-bold ${study.textColor} tabular-nums`}
              >
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-muted mt-0.5 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative px-6 sm:px-7 pb-6 sm:pb-7 mt-auto">
        <div className="relative rounded-xl bg-surface/80 p-4 ring-1 ring-border/30">
          <Quote className="absolute -top-2 -left-1 h-6 w-6 text-muted/30" aria-hidden="true" />
          <p className="text-sm text-muted leading-relaxed italic pl-4">
            &ldquo;{study.quote}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudiesSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full bg-accent/5 blur-3xl" />
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
            So kann dein Ergebnis aussehen.{" "}
            <span className="gradient-text">Branchenbeispiele.</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            Beispielberechnungen basierend auf Branchendurchschnittswerten und typischen Ergebnissen vergleichbarer Unternehmen.
          </p>
          <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        {/* Case study cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {enrichedStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98]"
          >
            Werde die nächste Erfolgsgeschichte
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <p className="mt-3 text-sm text-muted">
            Kostenlose Demo &middot; Keine Verpflichtung
          </p>
        </motion.div>
      </div>
    </section>
  );
}
