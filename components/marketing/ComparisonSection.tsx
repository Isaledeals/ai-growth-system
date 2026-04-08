"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

type CellType =
  | { kind: "text"; value: string; color: "green" | "yellow" | "red" }
  | { kind: "check" }
  | { kind: "x" };

interface ComparisonRow {
  feature: string;
  ours: CellType;
  tools: CellType;
  agency: CellType;
}

const rows: ComparisonRow[] = [
  {
    feature: "Monatliche Kosten",
    ours: { kind: "text", value: "Ab \u20AC697", color: "green" },
    tools: { kind: "text", value: "\u20AC500\u20132.000+", color: "red" },
    agency: { kind: "text", value: "\u20AC3.000\u201310.000", color: "red" },
  },
  {
    feature: "Setup-Zeit",
    ours: { kind: "text", value: "48 Stunden", color: "green" },
    tools: { kind: "text", value: "Wochen", color: "yellow" },
    agency: { kind: "text", value: "Monate", color: "red" },
  },
  {
    feature: "24/7 Verf\u00fcgbarkeit",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "x" },
  },
  {
    feature: "Kostet weniger als \u20AC0,50/h",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "x" },
  },
  {
    feature: "Kein Training n\u00f6tig",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "check" },
  },
  {
    feature: "Sofort einsatzbereit",
    ours: { kind: "check" },
    tools: { kind: "text", value: "Wochen", color: "yellow" },
    agency: { kind: "text", value: "Monate", color: "red" },
  },
  {
    feature: "Keine Fehler",
    ours: { kind: "check" },
    tools: { kind: "text", value: "Teilweise", color: "yellow" },
    agency: { kind: "x" },
  },
  {
    feature: "Skalierbar",
    ours: { kind: "check" },
    tools: { kind: "text", value: "Begrenzt", color: "yellow" },
    agency: { kind: "text", value: "Extra Kosten", color: "red" },
  },
  {
    feature: "No-Show Killer + Warteliste",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "x" },
  },
  {
    feature: "Google Reviews Autopilot",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "text", value: "Manuell", color: "yellow" },
  },
  {
    feature: "ROI in 30 Tagen",
    ours: { kind: "check" },
    tools: { kind: "text", value: "Unsicher", color: "yellow" },
    agency: { kind: "text", value: "3\u20136 Monate", color: "red" },
  },
];

const lightColorClasses: Record<"green" | "yellow" | "red", string> = {
  green: "text-emerald-700 font-semibold",
  yellow: "text-amber-600 font-medium",
  red: "text-red-500 font-medium",
};

function Cell({ cell, isOurs = false }: { cell: CellType; isOurs?: boolean }) {
  if (cell.kind === "check") {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full p-1 ${
          isOurs ? "bg-emerald-100" : "bg-slate-100"
        }`}
      >
        <Check
          className={`h-4 w-4 ${isOurs ? "text-emerald-600" : "text-slate-400"}`}
          strokeWidth={3}
          aria-hidden="true"
        />
        <span className="sr-only">Ja</span>
      </span>
    );
  }
  if (cell.kind === "x") {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-red-50 p-1">
        <X className="h-4 w-4 text-red-400" strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">Nein</span>
      </span>
    );
  }
  return (
    <span className={`text-sm ${lightColorClasses[cell.color]}`}>
      {cell.value}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
} as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function DesktopTableCard({ children }: { children: React.ReactNode }) {
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
      variants={fadeUpVariants}
      onMouseMove={handleMouseMove}
      className="spotlight-card light-card relative overflow-hidden rounded-2xl group transition-all duration-300"
    >
      <div className="spotlight-overlay" />
      {children}
    </motion.div>
  );
}

function MobileComparisonCard({ row }: { row: ComparisonRow }) {
  return (
    <motion.div
      variants={fadeUpVariants}
      className="light-card rounded-xl p-5"
    >
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        {row.feature}
      </h3>
      <div className="flex flex-col gap-2">
        {/* Aufwind AI — highlighted */}
        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-3 py-2">
          <span className="text-xs font-semibold text-blue-700">
            Aufwind AI
          </span>
          <Cell cell={row.ours} isOurs />
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50">
          <span className="text-xs text-muted">Mitarbeiter / Tools</span>
          <Cell cell={row.tools} />
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50">
          <span className="text-xs text-muted">Agentur</span>
          <Cell cell={row.agency} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ComparisonSection() {
  return (
    <section
      id="vergleich"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 bg-slate-50"
    >
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-blue-100 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-emerald-100 opacity-20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Aufwind AI{" "}
            <span className="gradient-text">vs. Alles andere</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
            Vergleiche selbst &mdash; und entscheide, was f&uuml;r dein
            Unternehmen am meisten Sinn macht.
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="hidden md:block"
        >
          <DesktopTableCard>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-5 text-sm font-medium text-muted w-[35%]">
                    Feature
                  </th>
                  {/* Aufwind AI — highlighted header */}
                  <th className="px-6 py-5 text-center text-sm font-bold text-blue-700 bg-blue-50/80">
                    <span className="gradient-text text-base">Aufwind AI</span>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-muted">
                    Mitarbeiter / GoHighLevel
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-muted">
                    Agentur
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr
                    key={row.feature}
                    variants={fadeUpVariants}
                    className={`border-b border-slate-100 transition-colors hover:bg-slate-50/80 ${
                      i === rows.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {row.feature}
                    </td>
                    {/* Highlighted column */}
                    <td className="relative px-6 py-4 text-center bg-blue-50/40">
                      <Cell cell={row.ours} isOurs />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell cell={row.tools} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell cell={row.agency} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </DesktopTableCard>
        </motion.div>

        {/* Mobile: Stacked Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-4 md:hidden"
        >
          {rows.map((row) => (
            <MobileComparisonCard key={row.feature} row={row} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
