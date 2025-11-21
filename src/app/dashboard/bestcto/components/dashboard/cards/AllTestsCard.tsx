"use client"

import { motion } from "framer-motion"
import { ListTodo, RefreshCw, Play, BarChart3, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface AllTestsCardProps {
  onNotify: (message: string) => void
}

const tests = [
  {
    status: "active" as const,
    title: "ТЕСТ 3 | 1-10 МАРТА",
    progress: 30,
    current: "45/150",
    remaining: "Осталось: 2 дня 14 часов",
    action: "Продолжить тест",
    icon: Play,
  },
  {
    status: "completed" as const,
    title: "ТЕСТ 2 | 14-28 ФЕВРАЛЯ",
    progress: 90,
    current: "135/150 баллов",
    remaining: "Завершено",
    action: "Анализ ответов",
    icon: BarChart3,
  },
  {
    status: "upcoming" as const,
    title: "ТЕСТ 4 | 10-23 МАРТА",
    progress: 0,
    current: "Доступно через: 7 дней",
    remaining: "",
    action: "Напомнить мне",
    icon: Bell,
  },
]

export default function AllTestsCard({ onNotify }: AllTestsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <ListTodo className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Все тесты</h2>
        </div>
        <button
          onClick={() => onNotify("Тесты обновлены")}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Обновить
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {tests.map((test, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ y: -4 }}
            className={cn(
              "border-2 rounded-xl p-5",
              test.status === "active" && "border-indigo-300 bg-indigo-50",
              test.status === "completed" && "border-green-300 bg-green-50",
              test.status === "upcoming" && "border-gray-300 bg-gray-50",
            )}
          >
            <div
              className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4",
                test.status === "active" && "bg-indigo-600 text-white",
                test.status === "completed" && "bg-green-600 text-white",
                test.status === "upcoming" && "bg-gray-400 text-white",
              )}
            >
              {test.status === "active" && "Активный"}
              {test.status === "completed" && "Завершен"}
              {test.status === "upcoming" && "Скоро"}
            </div>

            <h3 className="font-bold text-gray-900 mb-4">{test.title}</h3>

            <div className="mb-4">
              <div className="bg-gray-200 rounded-full h-2 mb-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${test.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={cn(
                    "h-full rounded-full",
                    test.status === "active" && "bg-indigo-600",
                    test.status === "completed" && "bg-green-600",
                    test.status === "upcoming" && "bg-gray-400",
                  )}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-700 font-medium">{test.current}</span>
                {test.remaining && <span className="text-gray-500">{test.remaining}</span>}
              </div>
            </div>

            <button
              onClick={() => onNotify(`${test.action}`)}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors",
                test.status === "active" && "bg-indigo-600 text-white hover:bg-indigo-700",
                test.status === "completed" && "border-2 border-green-600 text-green-700 hover:bg-green-50",
                test.status === "upcoming" && "border-2 border-gray-400 text-gray-700 hover:bg-gray-100",
              )}
            >
              <test.icon className="w-4 h-4" />
              {test.action}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
