"use client"

import { BarChart3, Trophy, TrendingUp, Megaphone, Play } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: BarChart3,
    title: "Сводная статистика",
    description: "По проектам и статусам участия. Отслеживайте прогресс по всем активностям",
  },
  {
    icon: Trophy,
    title: "Баллы и достижения",
    description: "Ранги сотрудников и рейтинги. Мотивируйте команду системой геймификации",
  },
  {
    icon: TrendingUp,
    title: "Ключевые показатели",
    description: "Финансы и закупки в реальном времени. Контролируйте эффективность бизнеса",
  },
  {
    icon: Megaphone,
    title: "Активные рассылки",
    description: "Задания и уведомления. Будьте в курсе новых возможностей и акций",
  },
]

export function DashboardSection() {
  return (
    <section id="dashboard" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-12 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-gray-900">Дашборд — единая точка контроля</h2>
          <p className="text-lg text-gray-600">Вся аналитика, проекты и мотивация команды в одном интерфейсе</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-8 md:p-10 mb-8 shadow-lg"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <DashboardFeature key={index} feature={feature} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-8 md:p-10 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-6 text-gray-900">Короткий тур по демо (15 секунд)</h3>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {["Ваши ключевые метрики", "Задачи и активные рассылки", "Рейтинг команды и проекты"].map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="text-gray-600 text-sm">{step}</div>
              </div>
            ))}
          </div>

          <button className="flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200">
            <Play className="w-5 h-5" />
            Открыть демо
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function DashboardFeature({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex items-start gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  )
}
