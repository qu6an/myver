"use client"

import { motion } from "framer-motion"
import { BarChart3, PieChart } from "lucide-react"

interface MyPointsCardProps {
  onNotify: (message: string) => void
}

export default function MyPointsCard({ onNotify }: MyPointsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Индивидуальный зачет</h2>
        </div>
        <button
          onClick={() => onNotify("Статистика обновлена")}
          className="flex items-center gap-2 px-4 py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium text-indigo-700"
        >
          <PieChart className="w-4 h-4" />
          Статистика
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard value="285" label="Место в городе" gradient="from-blue-500 to-indigo-600" delay={0.1} />
        <StatCard value="15" label="Место в области" gradient="from-purple-500 to-pink-600" delay={0.2} />
        <StatCard value="87" label="Место в округе" gradient="from-amber-500 to-orange-600" delay={0.3} />
        <StatCard value="3" label="Место в команде" gradient="from-emerald-500 to-teal-600" delay={0.4} />
      </div>
    </motion.div>
  )
}

function StatCard({
  value,
  label,
  gradient,
  delay,
}: {
  value: string
  label: string
  gradient: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${gradient} rounded-xl p-5 text-white`}
    >
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </motion.div>
  )
}