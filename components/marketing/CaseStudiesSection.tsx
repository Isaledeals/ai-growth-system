"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";

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
}

const caseStudyStyles = [
  { color: "text-blue-600",  bgColor: "bg-blue-50",  textColor: "text-blue-700",  ringColor: "ring-blue-200",  borderColor: "border-l-blue-500" },
  { color: "text-pink-600",  bgColor: "bg-pink-50",  textColor: "text-pink-700",  ringColor: "ring-pink-200",  borderColor: "border-l-pink-500" },
  { color: "text-amber-600", bgColor: "bg-amber-50", textColor: "text-amber-700", ringColor: "ring-amber-200", borderColor: "border-l-amber-500" },
]

interface CaseStudiesDict {
  headline: string
  headlineHighlight: string
  sub: string
  items: {
    id: string
    business: string
    industry: string
    description: string
    quote: string
    stats: { label: string; value: string }[]
  }[]
  cta: string
  ctaSub: string
}

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
      className={`spotlight-card bg-white rounded-2xl overflow-hidden border border-slate-200 border-l-4 ${study.borderColor} shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col`}
    >
      {/* Spotlight overlay */}
      <div className="spotlight-overlay" />

      {/* Header */}
      <div className="relative p-6 sm:p-7 pb-0">
        {/* Industry badge */}
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${study.bgColor} ${study.color} ring-1 ${study.ringColor}`}
        >
          {study.industry}
        </span>

        {/* Company name */}
        <h3 className="mt-4 text-lg sm:text-xl font-bold text-slate-900">
          {study.business}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          {study.description}
        </p>
      </div>

      {/* Stats */}
      <div className="relative px-6 sm:px-7 py-5">
        <div className="grid grid-cols-3 gap-3">
          {study.stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl ${study.bgColor} p-3 text-center ring-1 ${study.ringColor}`}
            >
              <div
                className={`text-lg sm:text-xl font-bold ${study.textColor} tabular-nums`}
              >
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative px-6 sm:px-7 pb-6 sm:pb-7 mt-auto">
        <div className="relative rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <Quote className="absolute -top-2 -left-1 h-6 w-6 text-blue-400" aria-hidden="true" />
          <p className="text-sm text-slate-600 leading-relaxed italic pl-4">
            &ldquo;{study.quote}&rdquo;
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudiesSection({ dict }: { dict: CaseStudiesDict }) {
  const enrichedStudies: CaseStudyExtended[] = dict.items.map((item, i) => ({
    ...item,
    ...(caseStudyStyles[i] ?? caseStudyStyles[0]),
  }))

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-blue-50 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] rounded-full bg-emerald-50 blur-3xl opacity-60" />
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {dict.headline}{" "}
            <span className="gradient-text">{dict.headlineHighlight}</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
            {dict.sub}
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
            href="/buchen"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-[0.98]"
          >
            {dict.cta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </a>
          <p className="mt-3 text-sm text-slate-500">
            {dict.ctaSub}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
