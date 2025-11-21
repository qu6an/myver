"use client"

import { motion } from "framer-motion"
import { Rocket, TrendingUp, Car } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md border border-gray-200/80 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-sm"
            >
              <Car className="w-4 h-4 text-blue-600" />
              Для автосервисов • Мотивация • Аналитика
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed"
            >
              Платформа управления автосервисом с геймификацией, аналитикой, обучением и мотивацией персонала.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight bg-gradient-to-br from-gray-900 via-gray-800 to-blue-600 bg-clip-text text-transparent"
            >
              Управляйте автосервисом и участвуйте в проектах АВТОКОМ
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button className="flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-200 relative overflow-hidden group">
                <Rocket className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Создать аккаунт — бесплатно</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <button className="flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-gray-700 bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl hover:bg-white hover:-translate-y-0.5 hover:border-blue-600 hover:shadow-lg transition-all duration-200">
                <TrendingUp className="w-5 h-5" />
                Посмотреть демо-дашборд
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-4"
            >
              <StatCard value="+35%" label="Рост вовлечённости" delay={0.4} />
              <StatCard value="-25%" label="Снижение издержек" delay={0.5} />
              <StatCard value="8000+" label="Автосервисов в сети" delay={0.6} />
            </motion.div>
          </div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <AuthForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-2xl p-6 text-center hover:-translate-y-2 hover:shadow-xl hover:border-blue-600 transition-all duration-300"
    >
      <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-sm text-gray-600 font-medium">{label}</div>
    </motion.div>
  )
}

function AuthForm() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Вход в систему</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200">
          Войти
        </button>

        <div className="text-center text-sm text-gray-600 space-y-2 pt-4">
          <p>
            Нет аккаунта?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Зарегистрироваться
            </a>
          </p>
          <p>
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Забыли пароль?
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
