"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Gift, Trophy, Medal } from "lucide-react"

export default function PrizesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Gift className="w-5 h-5 text-amber-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Призы в вашей номинации</h2>
      </div>

      <div className="space-y-4">
        <PrizeCard
          place="1"
          icon={Trophy}
          gradient="from-amber-400 to-yellow-500"
          value="30 000 ₽"
          description="Сертификат на оборудование и инструменты"
          delay={0.1}
        />
        <PrizeCard
          place="2"
          icon={Medal}
          gradient="from-gray-300 to-gray-400"
          value="15 000 ₽"
          description="Сертификат на профессиональные инструменты"
          delay={0.2}
        />
      </div>
    </motion.div>
  )
}

function PrizeCard({
  place,
  icon: Icon,
  gradient,
  value,
  description,
  delay,
}: {
  place: string
  icon: React.ElementType
  gradient: string
  value: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="border border-gray-200 rounded-xl overflow-hidden"
    >
      <div className={`bg-gradient-to-r ${gradient} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6" />
            <div>
              <div className="font-bold">{place} место</div>
              <div className="text-xs opacity-90">Лучший механик</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
    </motion.div>
  )
}
