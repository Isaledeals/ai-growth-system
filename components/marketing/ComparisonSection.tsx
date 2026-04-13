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

type DictCellValue = string | boolean;

function parseCellValue(val: DictCellValue): CellType {
  if (val === true) return { kind: "check" }
  if (val === false) return { kind: "x" }
  const s = String(val)
  // Detect green text values
  if (s.startsWith("Ab €") || s === "48 Stunden") return { kind: "text", value: s, color: "green" }
  // Detect red
  if (s.startsWith("€") || s === "Monate" || s === "3–6 Monate") return { kind: "text", value: s, color: "red" }
  // Yellow for rest
  return { kind: "text", value: s, color: "yellow" }
}

interface ComparisonDict {
  headline: string
  headlineHighlight: string
  sub: string
  colOurs: string
  colTools: string
  colAgency: string
  colFeature: string
  rows: { feature: string; ours: DictCellValue; tools: DictCellValue; agency: DictCellValue }[]
  mobileLabels: { tools: string; agency: string }
  srYes: string
  srNo: string
}

const lightColorClasses: Record<"green" | "yellow" | "red", string> = {
  green: "text-emerald-700 font-semibold",
  yellow: "text-amber-600 font-medium",
  red: "text-red-500 font-medium",
};

function Cell({ cell, isOurs = false, srYes = "Ja", srNo = "Nein" }: { cell: CellType; isOurs?: boolean; srYes?: string; srNo?: string }) {
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
        <span className="sr-only">{srYes}</span>
      </span>
    );
  }
  if (cell.kind === "x") {
    return (
      <span className="inline-flex items-center justify-center rounded-full bg-red-50 p-1">
        <X className="h-4 w-4 text-red-400" strokeWidth={3} aria-hidden="true" />
        <span className="sr-only">{srNo}</span>
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

function MobileComparisonCard({ row, dict }: { row: ComparisonRow; dict: ComparisonDict }) {
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
            {dict.colOurs}
          </span>
          <Cell cell={row.ours} isOurs srYes={dict.srYes} srNo={dict.srNo} />
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50">
          <span className="text-xs text-muted">{dict.mobileLabels.tools}</span>
          <Cell cell={row.tools} srYes={dict.srYes} srNo={dict.srNo} />
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50">
          <span className="text-xs text-muted">{dict.mobileLabels.agency}</span>
          <Cell cell={row.agency} srYes={dict.srYes} srNo={dict.srNo} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ComparisonSection({ dict }: { dict: ComparisonDict }) {
  const rows: ComparisonRow[] = dict.rows.map((r) => ({
    feature: r.feature,
    ours: parseCellValue(r.ours),
    tools: parseCellValue(r.tools),
    agency: parseCellValue(r.agency),
  }))

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
            {dict.headline}{" "}
            <span className="gradient-text">{dict.headlineHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
            {dict.sub}
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
                    {dict.colFeature}
                  </th>
                  {/* Aufwind AI — highlighted header */}
                  <th className="px-6 py-5 text-center text-sm font-bold text-blue-700 bg-blue-50/80">
                    <span className="gradient-text text-base">{dict.colOurs}</span>
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-muted">
                    {dict.colTools}
                  </th>
                  <th className="px-6 py-5 text-center text-sm font-medium text-muted">
                    {dict.colAgency}
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
                      <Cell cell={row.ours} isOurs srYes={dict.srYes} srNo={dict.srNo} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell cell={row.tools} srYes={dict.srYes} srNo={dict.srNo} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Cell cell={row.agency} srYes={dict.srYes} srNo={dict.srNo} />
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
            <MobileComparisonCard key={row.feature} row={row} dict={dict} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
