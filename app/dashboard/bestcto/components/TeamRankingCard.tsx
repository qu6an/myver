"use client"

import { motion } from "framer-motion"
import { Users, Trophy } from "lucide-react"

interface TeamRankingCardProps {
  onNotify: (message: string) => void
}

export default function TeamRankingCard({ onNotify }: TeamRankingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-emerald-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <Users className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Командный зачет</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RankingCard value="8" label="Место в городе" icon={Trophy} color="blue" delay={0.1} />
        <RankingCard value="23" label="Место в области" icon={Trophy} color="purple" delay={0.2} />
        <RankingCard value="65" label="Место в округе" icon={Trophy} color="amber" delay={0.3} />
      </div>
    </motion.div>
  )
}

function RankingCard({
  value,
  label,
  icon: Icon,
  color,
  delay,
}: {
  value: string
  label: string
  icon: any
  color: string
  delay: number
}) {
  const colorClasses = {
    blue: "from-blue-500 to-indigo-600",
    purple: "from-purple-500 to-pink-600", 
    amber: "from-amber-500 to-orange-600",
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-5 text-white`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5" />
        <div className="text-3xl font-bold">{value}</div>
      </div>
      <div className="text-sm opacity-90">{label}</div>
    </motion.div>
  )
}
