"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Plus,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Star,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

type ContactStatus = "all" | "lead" | "kunde" | "inaktiv";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Lead" | "Kunde" | "Inaktiv";
  source: "WhatsApp" | "Web-Chat" | "Telefon" | "Google";
  lastContact: string;
  rating: number | null;
  totalBookings: number;
  avatarInitials: string;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Anna Schneider",
    email: "anna.schneider@email.de",
    phone: "+49 176 2345 6789",
    status: "Kunde",
    source: "WhatsApp",
    lastContact: "Heute",
    rating: 5,
    totalBookings: 8,
    avatarInitials: "AS",
  },
  {
    id: "2",
    name: "Thomas Krüger",
    email: "t.krueger@email.de",
    phone: "+49 151 8765 4321",
    status: "Lead",
    source: "Telefon",
    lastContact: "Heute",
    rating: null,
    totalBookings: 0,
    avatarInitials: "TK",
  },
  {
    id: "3",
    name: "Sarah Müller",
    email: "sarah.mueller@email.de",
    phone: "+49 170 1234 5678",
    status: "Kunde",
    source: "Web-Chat",
    lastContact: "Gestern",
    rating: 4,
    totalBookings: 12,
    avatarInitials: "SM",
  },
  {
    id: "4",
    name: "Michael Weber",
    email: "m.weber@email.de",
    phone: "+49 162 9876 5432",
    status: "Kunde",
    source: "WhatsApp",
    lastContact: "Gestern",
    rating: 5,
    totalBookings: 5,
    avatarInitials: "MW",
  },
  {
    id: "5",
    name: "Laura Fischer",
    email: "laura.fischer@email.de",
    phone: "+49 173 4567 8901",
    status: "Lead",
    source: "Google",
    lastContact: "Vor 2 Tagen",
    rating: null,
    totalBookings: 1,
    avatarInitials: "LF",
  },
  {
    id: "6",
    name: "Peter Hoffmann",
    email: "peter.h@email.de",
    phone: "+49 160 3456 7890",
    status: "Inaktiv",
    source: "Web-Chat",
    lastContact: "Vor 3 Monaten",
    rating: 3,
    totalBookings: 3,
    avatarInitials: "PH",
  },
  {
    id: "7",
    name: "Julia Becker",
    email: "j.becker@email.de",
    phone: "+49 177 6543 2109",
    status: "Kunde",
    source: "WhatsApp",
    lastContact: "Vor 3 Tagen",
    rating: 5,
    totalBookings: 15,
    avatarInitials: "JB",
  },
  {
    id: "8",
    name: "Stefan Wagner",
    email: "s.wagner@email.de",
    phone: "+49 155 7890 1234",
    status: "Lead",
    source: "Telefon",
    lastContact: "Vor 1 Woche",
    rating: null,
    totalBookings: 0,
    avatarInitials: "SW",
  },
  {
    id: "9",
    name: "Claudia Richter",
    email: "c.richter@email.de",
    phone: "+49 178 2345 6780",
    status: "Inaktiv",
    source: "WhatsApp",
    lastContact: "Vor 6 Monaten",
    rating: 4,
    totalBookings: 6,
    avatarInitials: "CR",
  },
  {
    id: "10",
    name: "Markus Klein",
    email: "m.klein@email.de",
    phone: "+49 163 5678 9012",
    status: "Kunde",
    source: "Web-Chat",
    lastContact: "Vor 5 Tagen",
    rating: null,
    totalBookings: 2,
    avatarInitials: "MK",
  },
];

const statusFilters: { key: ContactStatus; label: string }[] = [
  { key: "all", label: "Alle" },
  { key: "lead", label: "Leads" },
  { key: "kunde", label: "Kunden" },
  { key: "inaktiv", label: "Inaktiv" },
];

const statusColorMap: Record<string, string> = {
  Lead: "bg-blue-500/10 text-blue-400",
  Kunde: "bg-emerald-500/10 text-emerald-400",
  Inaktiv: "bg-gray-500/10 text-gray-400",
};

const statusMap: Record<string, ContactStatus> = {
  Lead: "lead",
  Kunde: "kunde",
  Inaktiv: "inaktiv",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

export default function ContactsPage() {
  const [activeStatus, setActiveStatus] = useState<ContactStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = contacts.filter((c) => {
    const matchesStatus =
      activeStatus === "all" || statusMap[c.status] === activeStatus;
    const matchesSearch =
      searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const totalContacts = contacts.length;
  const totalLeads = contacts.filter((c) => c.status === "Lead").length;
  const totalKunden = contacts.filter((c) => c.status === "Kunde").length;
  const totalInaktiv = contacts.filter((c) => c.status === "Inaktiv").length;

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
          <h1 className="text-2xl font-bold text-white">Kontakte</h1>
          <p className="text-sm text-gray-400 mt-1">
            Alle Kunden und Leads in deiner Datenbank.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
          <Plus className="w-4 h-4" />
          Kontakt hinzufügen
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-gray-900/70 border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-white">{totalContacts}</p>
          <p className="text-xs text-gray-500 mt-0.5">Gesamt</p>
        </div>
        <div className="bg-gray-900/70 border border-blue-500/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-400">{totalLeads}</p>
          <p className="text-xs text-gray-500 mt-0.5">Leads</p>
        </div>
        <div className="bg-gray-900/70 border border-emerald-500/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{totalKunden}</p>
          <p className="text-xs text-gray-500 mt-0.5">Kunden</p>
        </div>
        <div className="bg-gray-900/70 border border-gray-500/20 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-400">{totalInaktiv}</p>
          <p className="text-xs text-gray-500 mt-0.5">Inaktiv</p>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Name, E-Mail oder Telefonnummer suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/70 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {statusFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveStatus(filter.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeStatus === filter.key
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                  : "bg-gray-900/50 text-gray-500 border border-white/5 hover:text-gray-300 hover:border-white/10"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Contacts Table / List */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl overflow-hidden"
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontakt
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quelle
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Letzter Kontakt
                </th>
                <th className="text-center px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Buchungen
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aktionen
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((contact, index) => (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                        {contact.avatarInitials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {contact.name}
                        </p>
                        <p className="text-[11px] text-gray-600">
                          {contact.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-1 rounded-md text-[11px] font-medium ${
                        statusColorMap[contact.status]
                      }`}
                    >
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-400">
                      {contact.source}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-gray-500">
                      {contact.lastContact}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="text-sm text-white font-medium">
                      {contact.totalBookings}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/5">
          {filtered.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              className="p-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                    {contact.avatarInitials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {contact.name}
                    </p>
                    <p className="text-[11px] text-gray-600">{contact.email}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-md text-[11px] font-medium ${
                    statusColorMap[contact.status]
                  }`}
                >
                  {contact.status}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 ml-[52px]">
                <span className="text-[11px] text-gray-500">
                  {contact.source}
                </span>
                <span className="text-[11px] text-gray-600">
                  {contact.lastContact}
                </span>
                <span className="text-[11px] text-gray-600">
                  {contact.totalBookings} Buchungen
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Keine Kontakte gefunden.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
