"use client"

import { motion } from "framer-motion"
import { BarChart3, PieChart } from "lucide-react"
import StatCard from "./StatCard"

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
          <h2 className="text-xl font-bold text-gray-900">Мои баллы</h2>
        </div>
        <button
          onClick={() => onNotify("Статистика обновлена")}
          className="flex items-center gap-2 px-4 py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors text-sm font-medium text-indigo-700"
        >
          <PieChart className="w-4 h-4" />
          Статистика
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          value="3"
          label="Место в команде"
          gradient="from-emerald-500 to-teal-600"
          delay={0.1}
          specialty={{
            manager: "2",
            mechanic: "5",
            consultant: "1",
          }}
        />
        <StatCard value="15" label="Место в городе" gradient="from-blue-500 to-indigo-600" delay={0.2} />
        <StatCard value="42" label="Место в области" gradient="from-purple-500 to-pink-600" delay={0.3} />
        <StatCard value="87" label="Место в округе" gradient="from-amber-500 to-orange-600" delay={0.4} />
      </div>
    </motion.div>
  )
}
