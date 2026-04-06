"use client";

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
    ours: { kind: "text", value: "Ab €997", color: "green" },
    tools: { kind: "text", value: "€500-2.000+", color: "red" },
    agency: { kind: "text", value: "€3.000-10.000", color: "red" },
  },
  {
    feature: "Setup-Zeit",
    ours: { kind: "text", value: "48 Stunden", color: "green" },
    tools: { kind: "text", value: "Wochen", color: "yellow" },
    agency: { kind: "text", value: "Monate", color: "red" },
  },
  {
    feature: "AI Chatbot 24/7",
    ours: { kind: "check" },
    tools: { kind: "text", value: "Teilweise", color: "yellow" },
    agency: { kind: "check" },
  },
  {
    feature: "Automatisches Follow-up",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "check" },
  },
  {
    feature: "KI-Terminbuchung",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "check" },
  },
  {
    feature: "Google Reviews",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "text", value: "Manuell", color: "yellow" },
  },
  {
    feature: "Lead Scraping",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "text", value: "Extra Kosten", color: "yellow" },
  },
  {
    feature: "Alles aus einer Hand",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "check" },
  },
  {
    feature: "Kein technisches Wissen nötig",
    ours: { kind: "check" },
    tools: { kind: "x" },
    agency: { kind: "check" },
  },
  {
    feature: "ROI in 30 Tagen",
    ours: { kind: "check" },
    tools: { kind: "text", value: "Unsicher", color: "yellow" },
    agency: { kind: "text", value: "3-6 Monate", color: "red" },
  },
];

const colorClasses: Record<"green" | "yellow" | "red", string> = {
  green: "text-emerald-400",
  yellow: "text-yellow-400",
  red: "text-red-400",
};

function Cell({ cell }: { cell: CellType }) {
  if (cell.kind === "check") {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/15 p-1">
        <Check className="h-4 w-4 text-emerald-400" strokeWidth={3} />
      </span>
    );
  }
  if (cell.kind === "x") {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-red-500/15 p-1">
        <X className="h-4 w-4 text-red-400" strokeWidth={3} />
      </span>
    );
  }
  return (
    <span className={`text-sm font-medium ${colorClasses[cell.color]}`}>
      {cell.value}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ComparisonSection() {
  return (
    <section
      id="vergleich"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
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
            Warum{" "}
            <span className="gradient-text">AI Growth System</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
            Vergleiche selbst &mdash; und entscheide, was f&uuml;r dein
            Unternehmen am meisten Sinn macht.
          </p>
        </motion.div>

        {/* ── Desktop Table (hidden on small screens) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="hidden md:block"
        >
          <motion.div variants={fadeUpVariants} className="glass-card overflow-hidden rounded-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-5 text-sm font-medium text-muted">
                    Feature
                  </th>
                  <th className="relative px-6 py-5 text-center text-sm font-semibold text-foreground">
                    {/* Glow highlight column header */}
                    <span className="gradient-text">AI Growth System</span>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-muted">
                    Einzeltools
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
                    className={`border-b border-border/30 transition-colors hover:bg-white/[0.02] ${
                      i === rows.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-300">
                      {row.feature}
                    </td>
                    {/* Highlighted column */}
                    <td
                      className="relative px-6 py-4 text-center"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(16,185,129,0.04) 0%, rgba(59,130,246,0.04) 100%)",
                      }}
                    >
                      {/* Left glow border */}
                      {i === 0 && (
                        <div
                          className="pointer-events-none absolute inset-y-0 left-0 w-px"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(16,185,129,0.5), rgba(59,130,246,0.5))",
                          }}
                        />
                      )}
                      {i === 0 && (
                        <div
                          className="pointer-events-none absolute inset-y-0 right-0 w-px"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(16,185,129,0.5), rgba(59,130,246,0.5))",
                          }}
                        />
                      )}
                      <Cell cell={row.ours} />
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

            {/* Persistent glow borders on "our" column */}
            <div
              className="pointer-events-none absolute inset-y-0 left-[25%] w-[25%]"
              style={{
                boxShadow:
                  "inset 1px 0 0 rgba(16,185,129,0.25), inset -1px 0 0 rgba(59,130,246,0.25)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* ── Mobile: Stacked Cards (visible on small screens) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-4 md:hidden"
        >
          {rows.map((row) => (
            <motion.div
              key={row.feature}
              variants={fadeUpVariants}
              className="glass-card rounded-xl p-5"
            >
              <h3 className="mb-3 text-sm font-semibold text-foreground">
                {row.feature}
              </h3>
              <div className="flex flex-col gap-2">
                {/* Our value — highlighted */}
                <div className="flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
                  <span className="text-xs font-medium text-emerald-400">
                    AI Growth System
                  </span>
                  <Cell cell={row.ours} />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-muted">Einzeltools</span>
                  <Cell cell={row.tools} />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs text-muted">Agentur</span>
                  <Cell cell={row.agency} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
