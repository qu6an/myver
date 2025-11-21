"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

export default function Header() {
  return (
    <motion.header
      className="bg-white border-b border-indigo-100 p-6 lg:p-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900 mb-1">Добро пожаловать, Алексей!</h1>
          <p className="text-indigo-600">Мониторинг вашего прогресса в конкурсе АВТОСЕРВИС ГОДА</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
            Активный участник
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-lg text-sm font-medium">
            <Award className="w-4 h-4" />
            Номинация: Лучший механик
          </span>
        </div>
      </div>
    </motion.header>
  )
}
