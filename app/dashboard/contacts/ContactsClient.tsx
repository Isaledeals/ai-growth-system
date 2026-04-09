"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Plus,
  Phone,
  Mail,
  Calendar,
  ChevronDown,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/supabase";
import { updateLeadStatus } from "./actions";

// ---------------------------------------------------------------------------
// Types & helpers
// ---------------------------------------------------------------------------

type FilterKey = "all" | LeadStatus;

const STATUS_LABELS: Record<LeadStatus, string> = {
  neu: "Neu",
  kontaktiert: "Kontaktiert",
  demo_gebucht: "Demo gebucht",
  angebot: "Angebot",
  abschluss: "Abschluss",
  verloren: "Verloren",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  neu: "bg-blue-500/10 text-blue-400",
  kontaktiert: "bg-yellow-500/10 text-yellow-400",
  demo_gebucht: "bg-purple-500/10 text-purple-400",
  angebot: "bg-orange-500/10 text-orange-400",
  abschluss: "bg-emerald-500/10 text-emerald-400",
  verloren: "bg-red-500/10 text-red-400",
};

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Alle" },
  { key: "neu", label: "Neu" },
  { key: "kontaktiert", label: "Kontaktiert" },
  { key: "demo_gebucht", label: "Demo gebucht" },
  { key: "angebot", label: "Angebot" },
  { key: "abschluss", label: "Abschluss" },
  { key: "verloren", label: "Verloren" },
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffH = diffMs / (1000 * 60 * 60);
  if (diffH < 1) return "Gerade eben";
  if (diffH < 24) return `Vor ${Math.floor(diffH)}h`;
  if (diffH < 48) return "Gestern";
  if (diffH < 168) return `Vor ${Math.floor(diffH / 24)} Tagen`;
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

// ---------------------------------------------------------------------------
// Status dropdown (inline, no modal)
// ---------------------------------------------------------------------------

function StatusDropdown({
  leadId,
  current,
}: {
  leadId: string;
  current: LeadStatus;
}) {
  const [open, setOpen] = useState(false);
  const [optimistic, setOptimistic] = useState<LeadStatus>(current);
  const [pending, startTransition] = useTransition();

  const handleSelect = (status: LeadStatus) => {
    setOptimistic(status);
    setOpen(false);
    startTransition(async () => {
      await updateLeadStatus(leadId, status);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={pending}
        className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-opacity ${
          STATUS_COLORS[optimistic]
        } ${pending ? "opacity-60" : "hover:opacity-80"}`}
      >
        {STATUS_LABELS[optimistic]}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-20 bg-gray-900 border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-[160px]">
            {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => handleSelect(s)}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition-colors ${
                  s === optimistic ? "text-white font-medium" : "text-gray-400"
                }`}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main client component
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

interface Props {
  leads: Lead[];
}

export default function ContactsClient({ leads }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = leads.filter((l) => {
    const matchesFilter = activeFilter === "all" || l.status === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.phone ?? "").includes(q);
    return matchesFilter && matchesSearch;
  });

  // Stats
  const counts = leads.reduce(
    (acc, l) => {
      acc[l.status] = (acc[l.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Leads & Kontakte</h1>
          <p className="text-sm text-gray-400 mt-1">
            {leads.length} Einträge aus Supabase
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Lead hinzufügen
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {(Object.keys(STATUS_LABELS) as LeadStatus[]).map((s) => (
          <div
            key={s}
            className="bg-gray-900/70 border border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-white/20 transition-colors"
            onClick={() => setActiveFilter(s)}
          >
            <p className={`text-2xl font-bold ${STATUS_COLORS[s].split(" ")[1]}`}>
              {counts[s] ?? 0}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">{STATUS_LABELS[s]}</p>
          </div>
        ))}
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Name, E-Mail oder Telefon suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/70 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === f.key
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                  : "bg-gray-900/50 text-gray-500 border border-white/5 hover:text-gray-300 hover:border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Leads Table */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl overflow-hidden"
      >
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Branche</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Termin</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Eingang</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{lead.name}</p>
                        <p className="text-[11px] text-gray-600">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusDropdown leadId={lead.id} current={lead.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-400">{lead.branche ?? "—"}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    {lead.preferred_date ? (
                      <span className="text-sm text-gray-400">
                        {lead.preferred_date}
                        {lead.preferred_time ? ` · ${lead.preferred_time}` : ""}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-500">{formatDate(lead.created_at)}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={`mailto:${lead.email}`}
                        className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                      {lead.preferred_date && (
                        <span className="p-1.5 rounded-md text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/5">
          {filtered.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className="p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">
                    {getInitials(lead.name)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{lead.name}</p>
                    <p className="text-[11px] text-gray-600">{lead.email}</p>
                  </div>
                </div>
                <StatusDropdown leadId={lead.id} current={lead.status} />
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-3 ml-[52px]">
                <span className="text-[11px] text-gray-500">{lead.branche ?? "—"}</span>
                {lead.preferred_date && (
                  <span className="text-[11px] text-gray-600">
                    {lead.preferred_date}
                    {lead.preferred_time ? ` · ${lead.preferred_time}` : ""}
                  </span>
                )}
                <span className="text-[11px] text-gray-600">{formatDate(lead.created_at)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              {leads.length === 0
                ? "Noch keine Leads vorhanden. Bookings erscheinen hier automatisch."
                : "Keine Leads für diesen Filter."}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
