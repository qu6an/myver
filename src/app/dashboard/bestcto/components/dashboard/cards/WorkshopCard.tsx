"use client"

import { motion } from "framer-motion"
import { CalendarSearch as ChalkboardTeacher, UserPlus, MessageCircleQuestion, Calendar, User } from "lucide-react"

interface WorkshopCardProps {
  onNotify: (message: string) => void
}

export default function WorkshopCard({ onNotify }: WorkshopCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-teal-100 rounded-lg">
          <ChalkboardTeacher className="w-5 h-5 text-teal-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Ближайший воркшоп</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
          <img
            src="https://autocom.parts/storage/c/2025/01/20/1737470252_380485_74.png"
            alt="Bosch"
            className="h-12 object-contain"
          />
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 mb-2">BOSCH</div>
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            Диагностика электронных систем современных автомобилей
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Разберитесь со сложными случаями диагностики и научитесь быстро находить неисправности.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Иван Петров • Технический эксперт Bosch</span>
          </div>
          <div className="flex items-start gap-3 text-sm text-gray-600">
            <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Среда, 20 ноября 2025 • 15:00 МСК</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onNotify("Вы записаны на воркшоп")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all font-medium"
          >
            <UserPlus className="w-4 h-4" />
            УЧАСТВОВАТЬ
          </button>
          <button
            onClick={() => onNotify("Форма вопроса открыта")}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <MessageCircleQuestion className="w-4 h-4" />
            ВОПРОС
          </button>
        </div>
      </div>
    </motion.div>
  )
}
