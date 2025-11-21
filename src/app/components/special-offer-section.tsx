"use client"

import { Zap, Unlock, Gift, Eye, Rocket, Check, Shield, Ban } from "lucide-react"
import { motion } from "framer-motion"

const benefits = [
  {
    icon: Unlock,
    title: "Полный доступ к структуре знаний",
    description: "Изучите всю систему обучения — от основ до продвинутых тем управления автосервисом",
  },
  {
    icon: Gift,
    title: "Бесплатные стартовые уроки",
    description: "Получите доступ к ключевым вводным материалам без каких-либо обязательств",
  },
  {
    icon: Eye,
    title: "Прозрачность содержания",
    description: "Увидите названия и описание всех курсов, модулей и практических кейсов",
  },
  {
    icon: Rocket,
    title: "Мгновенный доступ",
    description: "Начните изучение сразу после регистрации. Никаких ожиданий и сложных процедур",
  },
]

const features = ["Полный обзор системы", "Доступ к стартовым урокам", "Техническая поддержка", "Без привязки карты"]

export function SpecialOfferSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 border border-blue-200/80 backdrop-blur-xl rounded-3xl p-8 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/20 to-transparent pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg shadow-blue-500/30">
              <Zap className="w-4 h-4" />
              ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
              Бесплатный доступ к экосистеме знаний АВТОКОМ
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Узнайте секреты управления автосервисом, которые помогут удвоить прибыль уже в этом месяце
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 relative z-10">
            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} benefit={benefit} index={index} />
              ))}
            </div>

            {/* CTA Card */}
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/80 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full text-2xl font-bold mb-4">
                  3 ДНЯ
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Бесплатного гостевого доступа</h3>
              </div>

              <div className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-2xl text-gray-400 line-through">4 990₽</span>
                  <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    0₽
                  </span>
                </div>
                <div className="text-gray-600 text-sm">первые 3 дня</div>
              </div>

              <a
                href="https://autocom.parts/academy/kursy/baza-znaniy/oplata/testoviy_dostup"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-200 mb-6"
              >
                <Rocket className="w-5 h-5" />
                ПОЛУЧИТЬ БЕСПЛАТНЫЙ ДОСТУП
              </a>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Ваши данные в безопасности</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Ban className="w-4 h-4 text-gray-500" />
                  <span>Без спама и навязчивых рассылок</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BenefitCard({ benefit, index }: { benefit: (typeof benefits)[0]; index: number }) {
  const Icon = benefit.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white/60 backdrop-blur-md border border-gray-200/60 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
    </motion.div>
  )
}
