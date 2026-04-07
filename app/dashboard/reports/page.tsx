"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Users,
  Star,
  Clock,
  Euro,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Zap,
} from "lucide-react";

interface MonthStat {
  label: string;
  value: string;
  prevValue: string;
  change: string;
  trend: "up" | "down";
  icon: typeof MessageSquare;
  color: string;
}

const monthlyStats: MonthStat[] = [
  {
    label: "Gespräche gesamt",
    value: "847",
    prevValue: "692",
    change: "+22.4%",
    trend: "up",
    icon: MessageSquare,
    color: "blue",
  },
  {
    label: "Neue Leads",
    value: "156",
    prevValue: "124",
    change: "+25.8%",
    trend: "up",
    icon: Users,
    color: "emerald",
  },
  {
    label: "Google Bewertungen",
    value: "34",
    prevValue: "21",
    change: "+61.9%",
    trend: "up",
    icon: Star,
    color: "amber",
  },
  {
    label: "Zeitersparnis",
    value: "142h",
    prevValue: "118h",
    change: "+20.3%",
    trend: "up",
    icon: Clock,
    color: "purple",
  },
];

const roiBreakdown = [
  {
    label: "Gerettete Anrufe",
    description: "87 Anrufe die sonst verpasst worden wären",
    value: "13.050",
    icon: "phone",
  },
  {
    label: "Verhinderte No-Shows",
    description: "23 Termine die sonst ausgefallen wären",
    value: "2.760",
    icon: "shield",
  },
  {
    label: "Reaktivierte Kunden",
    description: "12 Kunden die zurückgekommen sind",
    value: "3.840",
    icon: "users",
  },
  {
    label: "Neue Leads durch AI",
    description: "45 qualifizierte Leads die gebucht haben",
    value: "6.750",
    icon: "bot",
  },
];

const totalROI = 26400;
const monthlyCost = 697;
const roiPercentage = Math.round((totalROI / monthlyCost) * 100);

// Weekly trend data
const weeklyTrend = [
  { week: "KW 10", leads: 28, conversations: 165 },
  { week: "KW 11", leads: 34, conversations: 198 },
  { week: "KW 12", leads: 42, conversations: 224 },
  { week: "KW 13", leads: 52, conversations: 260 },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ReportsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Berichte</h1>
          <p className="text-sm text-gray-400 mt-1">
            Monatliche Performance-Übersicht und ROI-Analyse. Zeitraum: März
            2026.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/70 border border-white/10 rounded-lg text-sm font-medium text-white hover:border-white/20 transition-colors whitespace-nowrap">
          <Download className="w-4 h-4 text-gray-400" />
          Als PDF exportieren
        </button>
      </motion.div>

      {/* ROI Hero Card */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-emerald-500/5 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 sm:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">
              ROI diesen Monat
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
            <motion.p
              className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {totalROI.toLocaleString("de-DE")}
            </motion.p>
            <span className="text-xl text-gray-400 font-medium pb-1">EUR geschätzter Wert</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">
                {roiPercentage}% ROI
              </span>
            </div>
            <span className="text-sm text-gray-500">
              Bei {monthlyCost} EUR/Monat Systemkosten
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Dein AI Growth System hat dir diesen Monat einen geschätzten Wert
            von{" "}
            <span className="text-white font-semibold">
              {totalROI.toLocaleString("de-DE")} EUR
            </span>{" "}
            gebracht — das ist das{" "}
            <span className="text-emerald-400 font-semibold">
              {Math.round(totalROI / monthlyCost)}x
            </span>{" "}
            deiner Investition.
          </p>
        </div>
      </motion.div>

      {/* Monthly Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {monthlyStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-lg ${colorMap[stat.color].bg}`}>
                <stat.icon
                  className={`w-4 h-4 ${colorMap[stat.color].text}`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-3">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            <p className="text-[11px] text-gray-600 mt-1">
              Vormonat: {stat.prevValue}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ROI Breakdown + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI Breakdown */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Euro className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-white">
              ROI-Aufschlüsselung
            </h3>
          </div>

          <div className="space-y-3">
            {roiBreakdown.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div>
                  <p className="text-sm text-white font-medium">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-gray-600">
                    {item.description}
                  </p>
                </div>
                <span className="text-sm font-semibold text-emerald-400 whitespace-nowrap">
                  +{item.value} EUR
                </span>
              </motion.div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-sm text-white font-semibold">
                Geschätzter Gesamtwert
              </p>
              <span className="text-lg font-bold text-emerald-400">
                {totalROI.toLocaleString("de-DE")} EUR
              </span>
            </div>
          </div>
        </motion.div>

        {/* Weekly Trend */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">
              Wöchentlicher Trend
            </h3>
          </div>

          <div className="space-y-4">
            {weeklyTrend.map((week, index) => {
              const prevWeek = index > 0 ? weeklyTrend[index - 1] : null;
              const leadChange = prevWeek
                ? Math.round(
                    ((week.leads - prevWeek.leads) / prevWeek.leads) * 100
                  )
                : 0;
              const convChange = prevWeek
                ? Math.round(
                    ((week.conversations - prevWeek.conversations) /
                      prevWeek.conversations) *
                      100
                  )
                : 0;

              return (
                <motion.div
                  key={week.week}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  className="p-3 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-sm font-medium text-white">
                        {week.week}
                      </span>
                    </div>
                    {index > 0 && (
                      <span
                        className={`text-[11px] font-medium ${
                          leadChange >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {leadChange >= 0 ? "+" : ""}
                        {leadChange}% Leads
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-xs text-gray-500">Leads</span>
                      <p className="text-lg font-bold text-blue-400">
                        {week.leads}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Gespräche</span>
                      <p className="text-lg font-bold text-gray-300">
                        {week.conversations}
                      </p>
                    </div>
                    {/* Mini bar */}
                    <div className="flex-1">
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(week.leads / 60) * 100}%`,
                          }}
                          transition={{
                            delay: 0.6 + index * 0.1,
                            duration: 0.6,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Month-over-Month Comparison */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-sm font-semibold text-white mb-4">
          Vergleich zum Vormonat
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kennzahl
                </th>
                <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Februar 2026
                </th>
                <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  März 2026
                </th>
                <th className="text-right py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veränderung
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  label: "Gespräche",
                  prev: "692",
                  curr: "847",
                  change: "+22.4%",
                  up: true,
                },
                {
                  label: "Neue Leads",
                  prev: "124",
                  curr: "156",
                  change: "+25.8%",
                  up: true,
                },
                {
                  label: "Termine gebucht",
                  prev: "87",
                  curr: "112",
                  change: "+28.7%",
                  up: true,
                },
                {
                  label: "No-Show Rate",
                  prev: "8.2%",
                  curr: "4.1%",
                  change: "-50%",
                  up: true,
                },
                {
                  label: "Bewertungen",
                  prev: "21",
                  curr: "34",
                  change: "+61.9%",
                  up: true,
                },
                {
                  label: "Durchschnittsbewertung",
                  prev: "4.4",
                  curr: "4.7",
                  change: "+0.3",
                  up: true,
                },
                {
                  label: "Reaktivierte Kunden",
                  prev: "8",
                  curr: "12",
                  change: "+50%",
                  up: true,
                },
                {
                  label: "Geschätzter ROI",
                  prev: "18.200 EUR",
                  curr: "26.400 EUR",
                  change: "+45.1%",
                  up: true,
                },
              ].map((row) => (
                <tr key={row.label} className="hover:bg-white/[0.01]">
                  <td className="py-3 text-gray-300">{row.label}</td>
                  <td className="py-3 text-right text-gray-500">
                    {row.prev}
                  </td>
                  <td className="py-3 text-right text-white font-medium">
                    {row.curr}
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${
                        row.up ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {row.up ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
