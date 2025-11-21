"use client"

import { motion } from "framer-motion"
import { Users, Eye, UserPlus, Trophy } from "lucide-react"

interface TeamCardProps {
  onNotify: (message: string) => void
}

const members = [
  { role: "Руководитель", name: "█████", score: 320, rank: "Топ-5 в Москве" },
  { role: "Мастер-консультант", name: "█████", score: 275, rank: "Топ-15 в Москве" },
  { role: "Механик", name: "Алексей Волков (Вы)", score: 285, rank: "Топ-15 в Москве" },
]

export default function TeamCard({ onNotify }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Команда Автосервиса "Вилгуд"</h2>
        </div>
        <button
          onClick={() => onNotify("Детали команды загружены")}
          className="flex items-center gap-2 px-4 py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium text-blue-700"
        >
          <Eye className="w-4 h-4" />
          Подробнее
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 4 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-1">Роль</div>
                <div className="font-semibold text-gray-900">{member.role}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Имя</div>
                <div className="font-semibold text-gray-900">{member.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Баллы</div>
                <div className="font-semibold text-indigo-600">{member.score} баллов</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Рейтинг</div>
                <div className="font-semibold text-purple-600">{member.rank}</div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Add Member Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="border-2 border-dashed border-indigo-300 rounded-xl p-6 text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-3">
            <UserPlus className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Добавить участника в команду</h3>
          <p className="text-sm text-gray-600 mb-4">Для участия в командном зачете необходимы все три роли</p>
          <button
            onClick={() => onNotify("Форма приглашения открыта")}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            <UserPlus className="w-4 h-4" />
            Пригласить участника
          </button>
        </motion.div>
      </div>

      {/* Team Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-indigo-700 mb-1">КОМАНДНЫЙ ЗАЧЕТ</div>
            <div className="text-3xl font-bold text-indigo-900 mb-1">880 баллов</div>
            <div className="text-xs text-gray-600">Сумма лучших баллов по ролям</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-pink-700 mb-1">Место в Москве</div>
            <div className="flex items-center gap-2 text-3xl font-bold text-pink-600">
              3 <Trophy className="w-8 h-8" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
