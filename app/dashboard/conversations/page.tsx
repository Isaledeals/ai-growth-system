"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MessageSquare,
  Phone,
  Globe,
  Bot,
  User,
  Clock,
  Filter,
} from "lucide-react";

type Channel = "all" | "whatsapp" | "web" | "phone";

interface Conversation {
  id: string;
  customerName: string;
  channel: "WhatsApp" | "Web-Chat" | "Telefon";
  channelIcon: typeof MessageSquare;
  lastMessage: string;
  timestamp: string;
  status: "AI" | "Manuell";
  unread: boolean;
  avatarInitials: string;
}

const conversations: Conversation[] = [
  {
    id: "1",
    customerName: "Anna Schneider",
    channel: "WhatsApp",
    channelIcon: MessageSquare,
    lastMessage: "Kann ich morgen um 14 Uhr einen Termin bekommen?",
    timestamp: "Vor 12 Min",
    status: "AI",
    unread: true,
    avatarInitials: "AS",
  },
  {
    id: "2",
    customerName: "Thomas Krüger",
    channel: "Telefon",
    channelIcon: Phone,
    lastMessage: "Anruf: Preisanfrage für Komplett-Paket. Termin gebucht für Freitag 10:00.",
    timestamp: "Vor 34 Min",
    status: "AI",
    unread: true,
    avatarInitials: "TK",
  },
  {
    id: "3",
    customerName: "Sarah Müller",
    channel: "Web-Chat",
    channelIcon: Globe,
    lastMessage: "Vielen Dank für die schnelle Antwort! Ich melde mich nächste Woche.",
    timestamp: "Vor 1 Std",
    status: "AI",
    unread: false,
    avatarInitials: "SM",
  },
  {
    id: "4",
    customerName: "Michael Weber",
    channel: "WhatsApp",
    channelIcon: MessageSquare,
    lastMessage: "Haben Sie auch samstags geöffnet?",
    timestamp: "Vor 2 Std",
    status: "AI",
    unread: false,
    avatarInitials: "MW",
  },
  {
    id: "5",
    customerName: "Laura Fischer",
    channel: "Telefon",
    channelIcon: Phone,
    lastMessage: "Anruf: Beschwerde über Wartezeit. Weiterleitung an Manager.",
    timestamp: "Vor 3 Std",
    status: "Manuell",
    unread: false,
    avatarInitials: "LF",
  },
  {
    id: "6",
    customerName: "Peter Hoffmann",
    channel: "Web-Chat",
    channelIcon: Globe,
    lastMessage: "Wo kann ich parken wenn ich zu Ihnen komme?",
    timestamp: "Vor 4 Std",
    status: "AI",
    unread: false,
    avatarInitials: "PH",
  },
  {
    id: "7",
    customerName: "Julia Becker",
    channel: "WhatsApp",
    channelIcon: MessageSquare,
    lastMessage: "Super, dann bis Donnerstag! Danke für die Erinnerung.",
    timestamp: "Vor 5 Std",
    status: "AI",
    unread: false,
    avatarInitials: "JB",
  },
  {
    id: "8",
    customerName: "Stefan Wagner",
    channel: "Telefon",
    channelIcon: Phone,
    lastMessage: "Anruf: Terminverschiebung von Montag auf Mittwoch. Bestätigt.",
    timestamp: "Vor 6 Std",
    status: "AI",
    unread: false,
    avatarInitials: "SW",
  },
  {
    id: "9",
    customerName: "Claudia Richter",
    channel: "WhatsApp",
    channelIcon: MessageSquare,
    lastMessage: "Ich würde gerne einen Termin für nächste Woche vereinbaren.",
    timestamp: "Gestern",
    status: "AI",
    unread: false,
    avatarInitials: "CR",
  },
  {
    id: "10",
    customerName: "Markus Klein",
    channel: "Web-Chat",
    channelIcon: Globe,
    lastMessage: "Welche Zahlungsmethoden akzeptieren Sie?",
    timestamp: "Gestern",
    status: "AI",
    unread: false,
    avatarInitials: "MK",
  },
];

const channelFilters: { key: Channel; label: string; icon: typeof MessageSquare }[] = [
  { key: "all", label: "Alle", icon: Filter },
  { key: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { key: "web", label: "Web-Chat", icon: Globe },
  { key: "phone", label: "Telefon", icon: Phone },
];

const channelMap: Record<string, Channel> = {
  WhatsApp: "whatsapp",
  "Web-Chat": "web",
  Telefon: "phone",
};

const channelColorMap: Record<string, string> = {
  WhatsApp: "bg-green-500/10 text-green-400",
  "Web-Chat": "bg-blue-500/10 text-blue-400",
  Telefon: "bg-purple-500/10 text-purple-400",
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

export default function ConversationsPage() {
  const [activeChannel, setActiveChannel] = useState<Channel>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = conversations.filter((c) => {
    const matchesChannel =
      activeChannel === "all" || channelMap[c.channel] === activeChannel;
    const matchesSearch =
      searchQuery === "" ||
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const totalAI = conversations.filter((c) => c.status === "AI").length;
  const totalManual = conversations.filter((c) => c.status === "Manuell").length;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white">Gespräche</h1>
        <p className="text-sm text-gray-400 mt-1">
          Alle Kundeninteraktionen auf einen Blick — Chat, Telefon und Web.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900/70 border border-white/10 text-sm">
          <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-400">Gesamt:</span>
          <span className="text-white font-semibold">{conversations.length}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-sm">
          <Bot className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-gray-400">AI bearbeitet:</span>
          <span className="text-emerald-400 font-semibold">{totalAI}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-sm">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-gray-400">Manuell:</span>
          <span className="text-amber-400 font-semibold">{totalManual}</span>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div variants={itemVariants} className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Gespräch suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900/70 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Channel Filters */}
        <div className="flex flex-wrap gap-2">
          {channelFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveChannel(filter.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeChannel === filter.key
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                  : "bg-gray-900/50 text-gray-500 border border-white/5 hover:text-gray-300 hover:border-white/10"
              }`}
            >
              <filter.icon className="w-3.5 h-3.5" />
              {filter.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Conversations List */}
      <motion.div variants={itemVariants} className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Keine Gespräche gefunden.</p>
          </div>
        ) : (
          filtered.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer hover:scale-[1.005] ${
                conversation.unread
                  ? "bg-gray-900/90 border-blue-500/20 hover:border-blue-500/40"
                  : "bg-gray-900/50 border-white/5 hover:border-white/15"
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                    conversation.unread
                      ? "bg-gradient-to-br from-blue-500 to-emerald-500 text-white"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {conversation.avatarInitials}
                </div>
                {conversation.unread && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-[#0A0F1C]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p
                    className={`text-sm font-medium truncate ${
                      conversation.unread ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {conversation.customerName}
                  </p>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                      channelColorMap[conversation.channel]
                    }`}
                  >
                    {conversation.channel}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {conversation.lastMessage}
                </p>
              </div>

              {/* Meta */}
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-1 text-[11px] text-gray-600">
                  <Clock className="w-3 h-3" />
                  {conversation.timestamp}
                </div>
                <span
                  className={`inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    conversation.status === "AI"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {conversation.status === "AI" ? (
                    <Bot className="w-2.5 h-2.5" />
                  ) : (
                    <User className="w-2.5 h-2.5" />
                  )}
                  {conversation.status}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
