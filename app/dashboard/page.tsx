"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Star,
  Bot,
  Clock,
  Plus,
  Send,
  FileText,
  Phone,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
} from "lucide-react";

const kpiCards = [
  {
    label: "Neue Leads",
    sublabel: "diese Woche",
    value: "23",
    change: "+18%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "blue",
  },
  {
    label: "Google Rating",
    sublabel: "aktuell",
    value: "4.7",
    change: "+0.3",
    trend: "up" as const,
    icon: Star,
    color: "amber",
  },
  {
    label: "AI Antwortrate",
    sublabel: "diesen Monat",
    value: "94%",
    change: "+5%",
    trend: "up" as const,
    icon: Bot,
    color: "emerald",
  },
  {
    label: "Zeitersparnis",
    sublabel: "diese Woche",
    value: "32h",
    change: "+12%",
    trend: "up" as const,
    icon: Clock,
    color: "purple",
  },
];

const recentActivity = [
  {
    type: "conversation",
    icon: MessageSquare,
    title: "Anna Schneider hat per WhatsApp geschrieben",
    time: "Vor 12 Minuten",
    status: "AI beantwortet",
    statusColor: "emerald",
  },
  {
    type: "call",
    icon: Phone,
    title: "Eingehender Anruf von +49 176 2345 6789",
    time: "Vor 34 Minuten",
    status: "Termin gebucht",
    statusColor: "blue",
  },
  {
    type: "review",
    icon: Star,
    title: 'Neue 5-Sterne Bewertung von "Thomas K."',
    time: "Vor 1 Stunde",
    status: "Google",
    statusColor: "amber",
  },
  {
    type: "conversation",
    icon: Globe,
    title: "Web-Chat Anfrage: Preise & Verfügbarkeit",
    time: "Vor 2 Stunden",
    status: "AI beantwortet",
    statusColor: "emerald",
  },
  {
    type: "call",
    icon: Phone,
    title: "Verpasster Anruf — KI hat Rückruf gebucht",
    time: "Vor 3 Stunden",
    status: "Follow-up aktiv",
    statusColor: "blue",
  },
  {
    type: "review",
    icon: Star,
    title: 'Neue 4-Sterne Bewertung von "Sarah M."',
    time: "Vor 5 Stunden",
    status: "Google",
    statusColor: "amber",
  },
];

const quickActions = [
  {
    label: "+ Lead hinzufügen",
    icon: Plus,
    color: "blue",
  },
  {
    label: "Broadcast senden",
    icon: Send,
    color: "emerald",
  },
  {
    label: "Report erstellen",
    icon: FileText,
    color: "purple",
  },
];

// Mock chart data (leads per day, last 7 days)
const chartData = [
  { day: "Mo", value: 5 },
  { day: "Di", value: 8 },
  { day: "Mi", value: 3 },
  { day: "Do", value: 7 },
  { day: "Fr", value: 12 },
  { day: "Sa", value: 6 },
  { day: "So", value: 4 },
];

const maxChartValue = Math.max(...chartData.map((d) => d.value));

const colorMap: Record<string, string> = {
  blue: "from-blue-500 to-blue-600",
  amber: "from-amber-500 to-amber-600",
  emerald: "from-emerald-500 to-emerald-600",
  purple: "from-purple-500 to-purple-600",
};

const bgColorMap: Record<string, string> = {
  blue: "bg-blue-500/10",
  amber: "bg-amber-500/10",
  emerald: "bg-emerald-500/10",
  purple: "bg-purple-500/10",
};

const textColorMap: Record<string, string> = {
  blue: "text-blue-400",
  amber: "text-amber-400",
  emerald: "text-emerald-400",
  purple: "text-purple-400",
};

const statusColorMap: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-400",
  blue: "bg-blue-500/10 text-blue-400",
  amber: "bg-amber-500/10 text-amber-400",
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

export default function DashboardOverview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Page Title */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Übersicht</h1>
        <p className="text-sm text-gray-400 mt-1">
          Dein KI-System arbeitet rund um die Uhr. Hier ist der aktuelle Status.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map((kpi) => (
          <motion.div
            key={kpi.label}
            variants={itemVariants}
            className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div
                className={`p-2.5 rounded-lg ${bgColorMap[kpi.color]}`}
              >
                <kpi.icon
                  className={`w-5 h-5 ${textColorMap[kpi.color]}`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  kpi.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                {kpi.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-white">{kpi.value}</p>
              <p className="text-sm text-gray-400 mt-0.5">
                {kpi.label}{" "}
                <span className="text-gray-600">/ {kpi.sublabel}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Chart */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Leads diese Woche
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Tägliche neue Leads
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Leads
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-3 h-48">
            {chartData.map((bar, i) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500 font-medium">
                  {bar.value}
                </span>
                <motion.div
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-500/80 to-blue-400/60 relative group"
                  initial={{ height: 0 }}
                  animate={{ height: `${(bar.value / maxChartValue) * 100}%` }}
                  transition={{
                    delay: 0.3 + i * 0.05,
                    duration: 0.6,
                    ease: "easeOut" as const,
                  }}
                >
                  <div className="absolute inset-0 rounded-t-md bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <span className="text-xs text-gray-600">{bar.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold text-white mb-4">
            Schnellaktionen
          </h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-white/5 text-sm font-medium text-white hover:border-white/20 transition-all ${bgColorMap[action.color]} hover:scale-[1.02] active:scale-[0.98]`}
              >
                <action.icon
                  className={`w-4 h-4 ${textColorMap[action.color]}`}
                />
                {action.label}
              </button>
            ))}
          </div>

          {/* Mini Stats */}
          <div className="mt-6 pt-6 border-t border-white/5">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Heute
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Gespräche</span>
                <span className="text-white font-semibold">18</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Termine gebucht</span>
                <span className="text-white font-semibold">4</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Anrufe bearbeitet</span>
                <span className="text-white font-semibold">7</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">
            Letzte Aktivitäten
          </h3>
          <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Alle anzeigen
          </button>
        </div>

        <div className="space-y-1">
          {recentActivity.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-white/[0.02] transition-colors group"
            >
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                <item.icon className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{item.title}</p>
                <p className="text-xs text-gray-600">{item.time}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${
                  statusColorMap[item.statusColor]
                }`}
              >
                {item.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
