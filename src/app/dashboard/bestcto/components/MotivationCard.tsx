"use client"

import { motion } from "framer-motion"
import { Rocket, PlayCircle } from "lucide-react"

interface MotivationCardProps {
  onNotify: (message: string) => void
}

export default function MotivationCard({ onNotify }: MotivationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white text-center"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="inline-block mb-4"
      >
        <Rocket className="w-12 h-12" />
      </motion.div>

      <h3 className="text-2xl font-bold mb-3">Вы в 35 баллах от ТОП-10 Москвы!</h3>
      <p className="text-white/90 mb-6 leading-relaxed">
        Пройдите Тест 3 на максимальный результат и повысьте шансы на выход в региональный финал.
      </p>

      <motion.button
        onClick={() => onNotify("Переход к тестированию")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-colors font-bold"
      >
        <PlayCircle className="w-5 h-5" />К тестированию
      </motion.button>
    </motion.div>
  )
}
