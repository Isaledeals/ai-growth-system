"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { PhoneOff, CalendarX, StarOff, UserX, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AufwindBeam from "@/components/marketing/AufwindBeam";

const painPointIcons = [PhoneOff, CalendarX, StarOff, UserX]

interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}

interface ProblemDict {
  badge: string
  headline: string
  sub: string
  items: { title: string; description: string; stat: string; statLabel: string }[]
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

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
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-md sm:p-7"
    >
      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(239, 68, 68, 0.05) 0%, transparent 60%)",
        }}
      />

      {/* Stat pill — top right */}
      <div className="absolute right-5 top-5 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
        {point.stat}
      </div>

      {/* Icon */}
      <div className="relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500 ring-1 ring-red-100 transition-all duration-300 group-hover:bg-red-100 group-hover:scale-110">
        <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="relative text-lg font-bold text-slate-900 sm:text-xl">
        {point.title}
      </h3>

      {/* Description */}
      <p className="relative mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
        {point.description}
      </p>

      {/* Stat label */}
      <p className="relative mt-4 text-xs font-semibold uppercase tracking-wide text-red-500">
        {point.statLabel}
      </p>
    </motion.div>
  );
}

export default function ProblemSection({ dict }: { dict: ProblemDict }) {
  const painPoints: PainPoint[] = dict.items.map((item, i) => ({
    ...item,
    icon: painPointIcons[i] ?? PhoneOff,
  }))

  return (
    <section
      id="probleme"
      className="relative overflow-hidden bg-slate-50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Top/bottom border lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Very subtle background accent */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #DC2626 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-red-200 bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600">
            {dict.badge}
          </span>
          <AufwindBeam variant="badge" />
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {dict.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {dict.sub}
          </p>
          <div className="mx-auto mt-5 h-1 w-12 rounded-full bg-red-300" />
        </motion.div>

        {/* Pain point cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {painPoints.map((point) => (
            <PainPointCard key={point.title} point={point} />
          ))}
        </motion.div>

        {/* Transition statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-col items-center text-center"
        >
          <div className="mb-4 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="relative pl-6 max-w-2xl">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-blue-600 to-emerald-500" />
            <p className="text-xl font-semibold text-slate-700 sm:text-2xl">
              Das war gestern.{' '}
              <span className="text-blue-600">
                Heute macht Aufwind AI das für Sie.
              </span>
            </p>
          </div>
          <a
            href="#module"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#module')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group mt-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-100 hover:border-blue-300"
          >
            Lösung entdecken
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
