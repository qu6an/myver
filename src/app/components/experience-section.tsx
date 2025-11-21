"use client"

import { Play, Video } from "lucide-react"
import { motion } from "framer-motion"

const experiences = [
  {
    client: { name: 'Сервис "ТехАвто"', location: "Москва", avatar: "СТ" },
    title: "Как мы снизили издержки на 25% за 3 месяца",
    description: "Владелец сети СТО делится опытом использования аналитики закупок и мотивации персонала.",
    duration: "2:15",
    gradient: "from-violet-500 to-purple-600",
    stats: [
      { value: "-25%", label: "Издержки" },
      { value: "+40%", label: "Вовлечённость" },
      { value: "#8", label: "В регионе" },
    ],
  },
  {
    client: { name: '"АвтоМиг"', location: "Казань", avatar: "АМ" },
    title: "EVERYCAR: рост прибыли через геймификацию",
    description: "Руководитель сервиса рассказывает о вовлечении команды через викторины и конкурсы.",
    duration: "1:48",
    gradient: "from-pink-500 to-rose-600",
    stats: [
      { value: "+35%", label: "Прибыль" },
      { value: "85%", label: "Участие" },
      { value: "#3", label: "В городе" },
    ],
  },
  {
    client: { name: '"ПрофиСервис"', location: "Санкт-Петербург", avatar: "ПС" },
    title: "От индивидуального СТО к сети с помощью аналитики",
    description: "История расширения бизнеса на основе данных и AI-рекомендаций платформы.",
    duration: "2:30",
    gradient: "from-cyan-500 to-blue-600",
    stats: [
      { value: "+3", label: "Филиала" },
      { value: "-30%", label: "Время" },
      { value: "#15", label: "В РФ" },
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="real-experience" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-gray-900">Реальный опыт автосервисов</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Посмотрите, как автосервисы используют платформу для роста и эффективности
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} index={index} />
          ))}
        </div>

        <div className="text-center fade-in">
          <button className="flex items-center gap-2 mx-auto px-6 py-3.5 text-base font-semibold text-gray-700 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl hover:bg-white hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-lg transition-all duration-200">
            <Video className="w-5 h-5" />
            Смотреть все видео-отзывы
          </button>
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({ experience, index }: { experience: (typeof experiences)[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:border-blue-600 transition-all duration-300"
    >
      {/* Video Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${experience.gradient} flex items-center justify-center`}>
          <button className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:scale-110 transition-transform duration-300 shadow-lg">
            <Play className="w-6 h-6 ml-1" fill="currentColor" />
          </button>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded">
          {experience.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
            {experience.client.avatar}
          </div>
          <div>
            <div className="font-bold text-gray-900">{experience.client.name}</div>
            <div className="text-sm text-gray-500">{experience.client.location}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{experience.title}</h3>

        <p className="text-gray-600 text-sm mb-6 leading-relaxed">{experience.description}</p>

        <div className="grid grid-cols-3 gap-3">
          {experience.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-lg font-bold text-blue-600">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
