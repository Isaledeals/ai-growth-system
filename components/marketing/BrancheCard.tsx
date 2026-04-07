"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Scissors,
  Wrench,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Scale,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { BranchenTemplate } from "@/lib/branchen-templates";

// Icon-Mapping für Branchen
const ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  Scissors,
  Wrench,
  Sparkles,
  UtensilsCrossed,
  HeartPulse,
  Scale,
};

interface BrancheCardProps {
  branche: BranchenTemplate;
  index?: number;
}

export default function BrancheCard({ branche, index = 0 }: BrancheCardProps) {
  const Icon = ICON_MAP[branche.icon] ?? Stethoscope;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut" as const,
      }}
    >
      <Link
        href={`/branche/${branche.slug}`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900/70 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-gray-900/90"
      >
        {/* Gradient-Akzent oben */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Hintergrund-Glow */}
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex h-full flex-col">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 ring-1 ring-white/10">
            <Icon className="h-6 w-6 text-blue-400" />
          </div>

          <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl font-bold text-white">
            {branche.name}
          </h3>

          <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-400">
            {branche.description}
          </p>

          <div className="flex items-center text-sm font-medium text-blue-400 transition-all group-hover:text-blue-300">
            Mehr erfahren
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
