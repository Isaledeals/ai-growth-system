"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/lib/constants";

interface CaseStudyExtended {
  id: string;
  business: string;
  industry: string;
  stats: { label: string; value: string }[];
  description: string;
  quote: string;
  color: string;
  bgColor: string;
  textColor: string;
  ringColor: string;
  borderColor: string;
}

const caseStudyMeta: Record<
  string,
  {
    description: string;
    quote: string;
    color: string;
    bgColor: string;
    textColor: string;
    ringColor: string;
    borderColor: string;
  }
> = {
  "zahnarzt-weber": {
    description:
      "Zahnarztpraxis mit 3 Behandlungszimmern in München. Hohe No-Show-Rate und fehlende Online-Bewertungen bremsten das Wachstum.",
    quote:
      "Seit wir das System nutzen, hat sich unsere No-Show-Rate drastisch reduziert. Die automatischen Erinnerungen und die Bewertungsautomatisierung laufen komplett im Hintergrund — wir konzentrieren uns endlich wieder auf unsere Patienten.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-300",
    ringColor: "ring-blue-500/20",
    borderColor: "border-l-blue-500",
  },
  "beauty-glamour": {
    description:
      "Premium Beauty Studio in Hamburg. Stamm­kunden kamen seltener, neue Kunden fanden den Salon kaum online.",
    quote:
      "Innerhalb von 60 Tagen hatten wir 40 neue Google Bewertungen und reaktivierten 20% unserer inaktiven Kunden. Das sind 2.400 Euro Extra-Umsatz — jeden Monat, ganz automatisch.",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    textColor: "text-pink-300",
    ringColor: "ring-pink-500/20",
    borderColor: "border-l-pink-500",
  },
  "handwerk-mueller": {
    description:
      "Handwerksbetrieb mit 12 Mitarbeitern in Stuttgart. Angebote versandeten, Neukunden-Akquise war rein auf Empfehlung.",
    quote:
      "Früher haben wir 70% unserer Angebote nie nachgefasst. Jetzt macht das System das automatisch — und wir gewinnen 8 Neukunden pro Monat. Die 15 Stunden Zeitersparnis pro Woche nutzen wir für die eigentliche Arbeit.",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-300",
    ringColor: "ring-amber-500/20",
    borderColor: "border-l-amber-500",
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
            Echte Ergebnisse.{" "}
            <span className="gradient-text">Echte Unternehmen.</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl mx-auto">
            So profitieren lokale Unternehmen bereits von unserem KI-System.
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
            <motion.div
              key={study.id}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className={`glass-card rounded-2xl overflow-hidden border-l-4 ${study.borderColor} transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20 flex flex-col`}
            >
              {/* Header */}
              <div className="p-6 sm:p-7 pb-0">
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
              <div className="px-6 sm:px-7 py-5">
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
              <div className="px-6 sm:px-7 pb-6 sm:pb-7 mt-auto">
                <div className="relative rounded-xl bg-surface/80 p-4 ring-1 ring-border/30">
                  <Quote className="absolute -top-2 -left-1 h-6 w-6 text-muted/30" />
                  <p className="text-sm text-muted leading-relaxed italic pl-4">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                </div>
              </div>
            </motion.div>
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
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98]"
          >
            Werde die nächste Erfolgsgeschichte
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-3 text-sm text-muted">
            Kostenlose Demo &middot; Keine Verpflichtung
          </p>
        </motion.div>
      </div>
    </section>
  );
}
