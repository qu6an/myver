"use client"

import type React from "react"

import { motion } from "framer-motion"
import { PuzzleIcon as PuzzlePiece, PlayCircle, Flame, Target, Star } from "lucide-react"

interface QuizCardProps {
  onNotify: (message: string) => void
}

export default function QuizCard({ onNotify }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
          <PuzzlePiece className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Автомобильная викторина</h2>
          <p className="text-sm text-white/80">Проверка знаний • Ежедневные вопросы</p>
        </div>
      </div>

      <p className="text-white/90 mb-6 text-sm leading-relaxed">
        Проверьте свои знания в увлекательной викторине! Отвечайте на вопросы каждый день и получайте дополнительные
        баллы.
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <QuizStat icon={Flame} value="7" label="Дней подряд" />
        <QuizStat icon={Target} value="24" label="Правильных" />
        <QuizStat icon={Star} value="+15" label="Бонусов" />
      </div>

      <motion.button
        onClick={() => onNotify("Викторина запущена")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-700 rounded-xl hover:bg-gray-50 transition-colors font-bold"
      >
        <PlayCircle className="w-5 h-5" />
        Начать викторину
      </motion.button>
    </motion.div>
  )
}

function QuizStat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType
  value: string
  label: string
}) {
  return (
    <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-center">
      <Icon className="w-5 h-5 mx-auto mb-1" />
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs text-white/80">{label}</div>
    </div>
  )
}
