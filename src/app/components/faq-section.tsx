"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "Сколько стоит подключение?",
    answer:
      "Базовые функции полностью бесплатны. Премиум-функции доступны от 2990₽/месяц. Первые 14 дней — полный доступ ко всем функциям бесплатно.",
  },
  {
    question: "Как быстро можно начать работу?",
    answer:
      "Регистрация занимает 2 минуты. После подтверждения email вы сразу получаете доступ к платформе. Настройка базовых функций — 15-30 минут.",
  },
  {
    question: "Нужно ли техническое образование для работы с платформой?",
    answer:
      "Нет, интерфейс интуитивно понятен. Мы предоставляем подробные инструкции и видеоуроки. Техподдержка помогает 24/7.",
  },
  {
    question: "Можно ли интегрировать с моей текущей системой учёта?",
    answer:
      "Да, у нас есть API для интеграции с популярными системами учёта. Наша техническая команда поможет с настройкой интеграции.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-gray-900 fade-in">Частые вопросы</h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-2xl overflow-hidden hover:border-blue-600 transition-colors duration-300"
    >
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left">
        <span className="font-bold text-gray-900 pr-4">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
