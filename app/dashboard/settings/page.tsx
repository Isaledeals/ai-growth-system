"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Bot,
  Bell,
  CreditCard,
  Users,
  Save,
  ExternalLink,
  Plus,
  Mail,
  Smartphone,
  MonitorSpeaker,
  Clock,
} from "lucide-react";

interface BusinessInfo {
  firmenname: string;
  branche: string;
  adresse: string;
  telefon: string;
  email: string;
  website: string;
  oeffnungszeiten: string;
}

interface AISettings {
  tonalitaet: "formell" | "informell";
  begruessung: string;
  anweisungen: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface TeamMember {
  name: string;
  email: string;
  role: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function SectionCard({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: typeof Building2;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-gray-800/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
      />
    </div>
  );
}

function ToggleRow({
  label,
  description,
  icon: Icon,
  enabled,
  onToggle,
}: {
  label: string;
  description: string;
  icon: typeof Mail;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-md bg-white/5">
          <Icon className="w-4 h-4 text-gray-400" />
        </div>
        <div>
          <p className="text-sm text-white">{label}</p>
          <p className="text-[11px] text-gray-600">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex flex-shrink-0 w-10 h-5 cursor-pointer rounded-full transition-colors duration-200 ${
          enabled ? "bg-emerald-500" : "bg-gray-700"
        }`}
      >
        <span
          className={`inline-block w-3.5 h-3.5 rounded-full bg-white shadow self-center transition-transform duration-200 ${
            enabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [business, setBusiness] = useState<BusinessInfo>({
    firmenname: "Muster Restaurant",
    branche: "Gastronomie",
    adresse: "Musterstraße 42, 80331 München",
    telefon: "+49 89 1234567",
    email: "info@muster-restaurant.de",
    website: "https://muster-restaurant.de",
    oeffnungszeiten: "Mo-Fr 11:00-22:00, Sa-So 10:00-23:00",
  });

  const [ai, setAI] = useState<AISettings>({
    tonalitaet: "informell",
    begruessung:
      "Hallo! Willkommen beim Muster Restaurant. Wie kann ich Ihnen helfen? Ich kann Ihnen bei Reservierungen, unserer Speisekarte oder allgemeinen Fragen weiterhelfen.",
    anweisungen:
      "Sei freundlich und hilfsbereit. Erwähne immer unsere aktuellen Tagesangebote. Bei Beschwerden leite sofort an das Team weiter. Maximal 3 Sätze pro Antwort.",
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    sms: true,
    push: false,
  });

  const [teamMembers] = useState<TeamMember[]>([
    { name: "Max Mustermann", email: "max@muster-restaurant.de", role: "Admin" },
    { name: "Lisa Schmidt", email: "lisa@muster-restaurant.de", role: "Manager" },
  ]);

  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
          <h1 className="text-2xl font-bold text-white">Einstellungen</h1>
          <p className="text-sm text-gray-400 mt-1">
            Verwalte dein Unternehmensprofil, KI-Konfiguration und Team.
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
            saved
              ? "bg-emerald-500 text-white"
              : "bg-gradient-to-r from-blue-500 to-emerald-500 text-white hover:opacity-90"
          }`}
        >
          <Save className="w-4 h-4" />
          {saved ? "Gespeichert!" : "Änderungen speichern"}
        </button>
      </motion.div>

      {/* Business Info */}
      <SectionCard
        title="Unternehmensinformationen"
        description="Grunddaten deines Unternehmens"
        icon={Building2}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Firmenname"
            value={business.firmenname}
            onChange={(val) => setBusiness({ ...business, firmenname: val })}
          />
          <InputField
            label="Branche"
            value={business.branche}
            onChange={(val) => setBusiness({ ...business, branche: val })}
          />
          <div className="sm:col-span-2">
            <InputField
              label="Adresse"
              value={business.adresse}
              onChange={(val) => setBusiness({ ...business, adresse: val })}
            />
          </div>
          <InputField
            label="Telefon"
            value={business.telefon}
            onChange={(val) => setBusiness({ ...business, telefon: val })}
            type="tel"
          />
          <InputField
            label="E-Mail"
            value={business.email}
            onChange={(val) => setBusiness({ ...business, email: val })}
            type="email"
          />
          <InputField
            label="Website"
            value={business.website}
            onChange={(val) => setBusiness({ ...business, website: val })}
            type="url"
          />
          <InputField
            label="Öffnungszeiten"
            value={business.oeffnungszeiten}
            onChange={(val) =>
              setBusiness({ ...business, oeffnungszeiten: val })
            }
          />
        </div>
      </SectionCard>

      {/* AI Agent Settings */}
      <SectionCard
        title="KI-Agent Konfiguration"
        description="Persönlichkeit und Verhalten deines KI-Assistenten"
        icon={Bot}
      >
        <div className="space-y-4">
          {/* Tonality Toggle */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">
              Tonalität
            </label>
            <div className="flex gap-2">
              {(["formell", "informell"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setAI({ ...ai, tonalitaet: option })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    ai.tonalitaet === option
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                      : "bg-gray-800/50 text-gray-500 border border-white/5 hover:text-gray-300"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Greeting Text */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Begrüßungstext
            </label>
            <textarea
              value={ai.begruessung}
              onChange={(e) =>
                setAI({ ...ai, begruessung: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2.5 bg-gray-800/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>

          {/* Custom Instructions */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Custom-Anweisungen
            </label>
            <textarea
              value={ai.anweisungen}
              onChange={(e) =>
                setAI({ ...ai, anweisungen: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2.5 bg-gray-800/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
              placeholder="Zusätzliche Anweisungen für den KI-Agenten..."
            />
          </div>
        </div>
      </SectionCard>

      {/* Notifications */}
      <SectionCard
        title="Benachrichtigungen"
        description="Wie möchtest du informiert werden?"
        icon={Bell}
      >
        <div className="space-y-1">
          <ToggleRow
            label="E-Mail-Benachrichtigungen"
            description="Tägliche Zusammenfassung und wichtige Alerts"
            icon={Mail}
            enabled={notifications.email}
            onToggle={() =>
              setNotifications({ ...notifications, email: !notifications.email })
            }
          />
          <ToggleRow
            label="SMS-Benachrichtigungen"
            description="Nur bei kritischen Ereignissen (Beschwerden, etc.)"
            icon={Smartphone}
            enabled={notifications.sms}
            onToggle={() =>
              setNotifications({ ...notifications, sms: !notifications.sms })
            }
          />
          <ToggleRow
            label="Push-Benachrichtigungen"
            description="Echtzeit-Updates im Browser"
            icon={MonitorSpeaker}
            enabled={notifications.push}
            onToggle={() =>
              setNotifications({ ...notifications, push: !notifications.push })
            }
          />
        </div>
      </SectionCard>

      {/* Billing */}
      <SectionCard
        title="Abrechnung"
        description="Dein aktueller Plan und Zahlungsinformationen"
        icon={CreditCard}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-emerald-500/5 border border-blue-500/10">
            <div>
              <p className="text-sm font-semibold text-white">Pro-Plan</p>
              <p className="text-xs text-gray-400">
                697,00 EUR/Monat &middot; Nächste Abrechnung: 06.05.2026
              </p>
            </div>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[11px] font-medium rounded-md">
              Aktiv
            </span>
          </div>

          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 border border-white/10 rounded-lg text-sm text-white hover:border-white/20 transition-colors"
          >
            <CreditCard className="w-4 h-4 text-gray-400" />
            Stripe Customer Portal
            <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
          </a>
        </div>
      </SectionCard>

      {/* Team */}
      <SectionCard
        title="Team"
        description="Verwalte Teammitglieder und Zugriffsrechte"
        icon={Users}
      >
        <div className="space-y-4">
          {/* Existing Members */}
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm text-white">{member.name}</p>
                    <p className="text-[11px] text-gray-600">{member.email}</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[11px] font-medium rounded-md">
                  {member.role}
                </span>
              </div>
            ))}
          </div>

          {/* Invite */}
          <div className="flex gap-2">
            <input
              type="email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              placeholder="email@beispiel.de"
              className="flex-1 px-3 py-2.5 bg-gray-800/50 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
            <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Einladen
            </button>
          </div>
        </div>
      </SectionCard>
    </motion.div>
  );
}
