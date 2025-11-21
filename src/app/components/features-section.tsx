"use client"

import { Gamepad2, TrendingUp, Users } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Gamepad2,
    title: "Геймификация и мотивация",
    description:
      "Викторины, задания, система баллов и наград повышают вовлечённость команды на 35%. Сотрудники видят свой прогресс и получают реальные призы.",
  },
  {
    icon: TrendingUp,
    title: "Прозрачная аналитика",
    description:
      "Полный контроль над закупками, клиентами и KPI. Снижайте издержки до 25% с помощью точных данных и AI-прогнозов.",
  },
  {
    icon: Users,
    title: "Участие в проектах EVERYCAR",
    description:
      "Станьте частью крупнейшего сообщества СТО России. Получайте доступ к эксклюзивным проектам, бонусам и партнёрским условиям.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-gray-900 fade-in">
          Почему выбирают АВТОКОМ
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-3xl p-8 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-600 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
          <Icon className="w-7 h-7" />
        </div>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  )
}
