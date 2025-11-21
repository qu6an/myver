"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface StatCardProps {
  value: string
  label: string
  gradient: string
  delay: number
  specialty?: {
    manager: string
    mechanic: string
    consultant: string
  }
}

export default function StatCard({ value, label, gradient, delay, specialty }: StatCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasSpecialty = specialty && label.includes("команде")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-4xl font-bold mb-2">{value}</div>
          <div className="text-sm opacity-90">{label}</div>
        </div>
        {hasSpecialty && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Показать по специальностям"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>

      {hasSpecialty && isExpanded && specialty && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-white/30 space-y-2"
        >
          <div className="flex justify-between text-sm">
            <span className="opacity-80">Руководитель</span>
            <span className="font-semibold">{specialty.manager}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="opacity-80">Механик</span>
            <span className="font-semibold">{specialty.mechanic}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="opacity-80">Мастер-консультант</span>
            <span className="font-semibold">{specialty.consultant}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
