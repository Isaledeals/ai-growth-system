"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Phone,
  CalendarCheck,
  MessageCircle,
  ShieldCheck,
  Star,
  UserCheck,
  Share2,
  Power,
  Zap,
  Activity,
} from "lucide-react";

interface AIModule {
  id: string;
  title: string;
  description: string;
  icon: typeof Bot;
  enabled: boolean;
}

const initialModules: AIModule[] = [
  {
    id: "chatbot",
    title: "KI-Chatbot",
    description:
      "Beantwortet Anfragen auf Website, WhatsApp, Instagram und Facebook rund um die Uhr.",
    icon: Bot,
    enabled: true,
  },
  {
    id: "phone",
    title: "KI-Telefonassistent",
    description:
      "Nimmt Anrufe entgegen, beantwortet Fragen und bucht Termine — auch nachts und am Wochenende.",
    icon: Phone,
    enabled: true,
  },
  {
    id: "booking",
    title: "Smart Terminbuchung",
    description:
      "Automatische Kalender-Sync, Bestätigungen und intelligente Terminfindung über alle Kanäle.",
    icon: CalendarCheck,
    enabled: true,
  },
  {
    id: "followup",
    title: "Automatisches Follow-up",
    description:
      "WhatsApp- und E-Mail-Sequenzen die Leads warm halten — nach 5 Min, 1 Std, 1 Tag.",
    icon: MessageCircle,
    enabled: true,
  },
  {
    id: "noshow",
    title: "No-Show Killer",
    description:
      "SMS- und WhatsApp-Erinnerungen 24h und 1h vor dem Termin. Wartelisten-Nachbesetzung bei Absagen.",
    icon: ShieldCheck,
    enabled: true,
  },
  {
    id: "reputation",
    title: "Reputations-Autopilot",
    description:
      "Automatische Review-Anfragen nach jedem Termin. Zufriedene Kunden bewerten, unzufriedene melden sich intern.",
    icon: Star,
    enabled: false,
  },
  {
    id: "reactivation",
    title: "Kundenreaktivierung",
    description:
      "Kontaktiert Kunden die seit 3, 6 oder 12 Monaten nicht mehr da waren mit personalisierten Angeboten.",
    icon: UserCheck,
    enabled: false,
  },
  {
    id: "social",
    title: "Social Media Autopilot",
    description:
      "KI generiert Posts für Instagram, Facebook und Google Business mit freien Terminen und Aktionen.",
    icon: Share2,
    enabled: false,
  },
];

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

function ToggleSwitch({
  enabled,
  onToggle,
  size = "default",
}: {
  enabled: boolean;
  onToggle: () => void;
  size?: "default" | "large";
}) {
  const trackSize = size === "large" ? "w-14 h-7" : "w-10 h-5";
  const thumbSize = size === "large" ? "w-5 h-5" : "w-3.5 h-3.5";
  const thumbTranslate = size === "large" ? "translate-x-7" : "translate-x-5";

  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${trackSize} ${
        enabled ? "bg-emerald-500" : "bg-gray-700"
      }`}
    >
      <span
        className={`inline-block rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${thumbSize} ${
          enabled ? thumbTranslate : "translate-x-1"
        } self-center`}
      />
    </button>
  );
}

export default function AutomationsPage() {
  const [modules, setModules] = useState<AIModule[]>(initialModules);

  const activeCount = modules.filter((m) => m.enabled).length;
  const allEnabled = modules.every((m) => m.enabled);

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const toggleAll = () => {
    const newState = !allEnabled;
    setModules((prev) => prev.map((m) => ({ ...m, enabled: newState })));
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Automatisierungen</h1>
        <p className="text-sm text-gray-400 mt-1">
          Steuere deine 8 KI-Module. Jedes Modul arbeitet autonom und kann
          einzeln ein- oder ausgeschaltet werden.
        </p>
      </motion.div>

      {/* Status Bar + Master Toggle */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-xl ${
              activeCount > 0
                ? "bg-emerald-500/10"
                : "bg-gray-800"
            }`}
          >
            <Activity
              className={`w-6 h-6 ${
                activeCount > 0 ? "text-emerald-400" : "text-gray-500"
              }`}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {activeCount} von {modules.length} Modulen aktiv
            </p>
            <p className="text-xs text-gray-500">
              {activeCount === modules.length
                ? "Alle Systeme laufen auf Hochtouren"
                : activeCount > 0
                ? "Einige Module sind deaktiviert"
                : "Alle Module sind ausgeschaltet"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">Alle Module</span>
          <ToggleSwitch
            enabled={allEnabled}
            onToggle={toggleAll}
            size="large"
          />
        </div>
      </motion.div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            variants={itemVariants}
            className={`bg-gray-900/70 backdrop-blur border rounded-xl p-5 transition-all duration-300 ${
              module.enabled
                ? "border-emerald-500/20 hover:border-emerald-500/40"
                : "border-white/5 hover:border-white/15 opacity-70"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-lg flex-shrink-0 ${
                    module.enabled
                      ? "bg-emerald-500/10"
                      : "bg-gray-800"
                  }`}
                >
                  <module.icon
                    className={`w-5 h-5 ${
                      module.enabled
                        ? "text-emerald-400"
                        : "text-gray-500"
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {module.title}
                    </h3>
                    {module.enabled && (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-emerald-400 font-medium">
                          Aktiv
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>

              <ToggleSwitch
                enabled={module.enabled}
                onToggle={() => toggleModule(module.id)}
              />
            </div>

            {/* Status indicator bar at bottom */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Power
                    className={`w-3 h-3 ${
                      module.enabled ? "text-emerald-400" : "text-gray-600"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-medium ${
                      module.enabled ? "text-emerald-400" : "text-gray-600"
                    }`}
                  >
                    {module.enabled ? "Eingeschaltet" : "Ausgeschaltet"}
                  </span>
                </div>
                {module.enabled && (
                  <span className="text-[11px] text-gray-600">
                    Läuft seit 14 Tagen
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <motion.div
        variants={itemVariants}
        className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 flex items-start gap-3"
      >
        <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-300">
            Tipp: Aktiviere alle Module für maximalen Effekt
          </p>
          <p className="text-xs text-blue-400/60 mt-1">
            Unsere Daten zeigen: Kunden die alle 8 Module nutzen, erzielen im
            Schnitt 340% ROI in den ersten 30 Tagen. Jedes Modul verstärkt die
            Wirkung der anderen.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
