"use client";

import { motion } from "framer-motion";
import {
  Star,
  Send,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Mail,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

const currentRating = 4.7;
const totalReviews = 142;

const reviewStats = [
  {
    label: "Gesendet",
    value: "284",
    sublabel: "Review-Anfragen",
    icon: Send,
    color: "blue",
  },
  {
    label: "Beantwortet",
    value: "156",
    sublabel: "54.9% Rate",
    icon: Mail,
    color: "purple",
  },
  {
    label: "Positive",
    value: "138",
    sublabel: "88.5%",
    icon: ThumbsUp,
    color: "emerald",
  },
  {
    label: "Negative",
    value: "8",
    sublabel: "5.1%",
    icon: ThumbsDown,
    color: "red",
  },
];

interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  platform: string;
  avatarInitials: string;
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Thomas K.",
    rating: 5,
    text: "Absolut empfehlenswert! Toller Service, super freundliches Team und sehr professionell. Komme definitiv wieder.",
    date: "Vor 2 Stunden",
    platform: "Google",
    avatarInitials: "TK",
  },
  {
    id: "2",
    author: "Sarah M.",
    rating: 4,
    text: "Sehr zufrieden mit dem Ergebnis. Kleine Wartezeit, aber dafür top Qualität. Gerne wieder!",
    date: "Vor 5 Stunden",
    platform: "Google",
    avatarInitials: "SM",
  },
  {
    id: "3",
    author: "Michael B.",
    rating: 5,
    text: "Bester Service in der Stadt! Ich bin seit 3 Jahren Stammkunde und immer begeistert. Weiter so!",
    date: "Gestern",
    platform: "Google",
    avatarInitials: "MB",
  },
  {
    id: "4",
    author: "Laura F.",
    rating: 5,
    text: "Habe einen kurzfristigen Termin bekommen und alles lief perfekt. Das Online-Buchungssystem ist super praktisch.",
    date: "Gestern",
    platform: "Google",
    avatarInitials: "LF",
  },
  {
    id: "5",
    author: "Peter H.",
    rating: 3,
    text: "Grundsätzlich zufrieden, aber die Parkplatzsituation könnte besser sein. Der Service selbst war gut.",
    date: "Vor 2 Tagen",
    platform: "Google",
    avatarInitials: "PH",
  },
  {
    id: "6",
    author: "Anna S.",
    rating: 5,
    text: "Wow, einfach nur wow! Von der Terminbuchung über den Service bis zur Nachbetreuung — alles perfekt durchdacht.",
    date: "Vor 3 Tagen",
    platform: "Google",
    avatarInitials: "AS",
  },
  {
    id: "7",
    author: "Julia W.",
    rating: 4,
    text: "Sehr professionell und zuverlässig. Die automatische Erinnerung per WhatsApp finde ich klasse!",
    date: "Vor 4 Tagen",
    platform: "Google",
    avatarInitials: "JW",
  },
];

// Star rating distribution
const ratingDistribution = [
  { stars: 5, count: 98, percentage: 69 },
  { stars: 4, count: 28, percentage: 20 },
  { stars: 3, count: 10, percentage: 7 },
  { stars: 2, count: 4, percentage: 3 },
  { stars: 1, count: 2, percentage: 1 },
];

const statColorMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  red: { bg: "bg-red-500/10", text: "text-red-400" },
};

function StarDisplay({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const starSize = size === "lg" ? "w-6 h-6" : "w-3.5 h-3.5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= rating
              ? "text-amber-400 fill-amber-400"
              : star - 0.5 <= rating
              ? "text-amber-400 fill-amber-400/50"
              : "text-gray-700"
          }`}
        />
      ))}
    </div>
  );
}

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

export default function ReviewsPage() {
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
          <h1 className="text-2xl font-bold text-white">Bewertungen</h1>
          <p className="text-sm text-gray-400 mt-1">
            Dein Online-Ruf auf einen Blick. Automatische Review-Anfragen
            arbeiten rund um die Uhr.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
          <Send className="w-4 h-4" />
          Review-Anfrage senden
        </button>
      </motion.div>

      {/* Current Rating + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Big Rating Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-emerald-400 font-medium">
              +0.3 diesen Monat
            </span>
          </div>
          <motion.p
            className="text-6xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {currentRating}
          </motion.p>
          <div className="flex justify-center mt-2">
            <StarDisplay rating={currentRating} size="lg" />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {totalReviews} Bewertungen auf Google
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Auf Google ansehen
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold text-white mb-4">
            Bewertungsverteilung
          </h3>
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16 flex-shrink-0">
                  <span className="text-sm text-gray-400 w-3">{item.stars}</span>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                </div>
                <div className="flex-1 h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" as const }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-12 text-right">
                  {item.count} ({item.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Review Request Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {reviewStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-4"
          >
            <div className={`inline-flex p-2 rounded-lg ${statColorMap[stat.color].bg} mb-3`}>
              <stat.icon className={`w-4 h-4 ${statColorMap[stat.color].text}`} />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            <p className="text-[11px] text-gray-600">{stat.sublabel}</p>
          </motion.div>
        ))}
      </div>

      {/* Reviews List */}
      <motion.div
        variants={itemVariants}
        className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-xl p-6"
      >
        <h3 className="text-sm font-semibold text-white mb-4">
          Neueste Bewertungen
        </h3>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                  {review.avatarInitials}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <p className="text-sm font-medium text-white">
                    {review.author}
                  </p>
                  <StarDisplay rating={review.rating} />
                  <span className="text-[11px] text-gray-600">
                    {review.date}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mt-1.5 leading-relaxed">
                  {review.text}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <MessageSquare className="w-3 h-3 text-gray-600" />
                  <span className="text-[11px] text-gray-600">
                    {review.platform}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
