"use client"

import type React from "react"

import { HelpCircle, Users, Crown, Award, GraduationCap, Headset } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    icon: HelpCircle,
    title: "Автомобильная викторина",
    description:
      "Зарабатывайте очки за правильные ответы. Победители получают реальные призы и баллы. Доступно сразу после регистрации.",
    link: "https://docs.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2Fg0gdUZqoM4qqbK8YUZPtNaBm%2FvO8YyFdQaw039xsnaGClf5GAu5lCPSzBC7j5xndq%2FJ6bpmRyOJonT3VoXnDag%3D%3D&name=%D0%9F%D0%A0%D0%90%D0%92%D0%98%D0%9B%D0%90%20%D0%92%D0%98%D0%9A%D0%A2%D0%9E%D0%A0%D0%98%D0%9D%D0%AB.pdf&nosw=1",
    linkText: "Правила PDF",
    badge: { text: "Активно", variant: "active" as const },
  },
  {
    icon: Users,
    title: "EVERYCAR",
    description:
      "Постоянная программа мотивации — уровни, задания, бонусы. Станьте частью крупнейшего сообщества СТО России с эксклюзивными условиями.",
    linkText: "Присоединиться",
    badge: { text: "Идёт набор", variant: "open" as const },
    featured: true,
  },
  {
    icon: Crown,
    title: "Автосервис года",
    description:
      "Конкурс с учётом показателей и репутации. Номинации и призы для лучших автосервисов страны. Повысьте статус вашего бизнеса.",
    link: "https://bestcto.ru/storage/bestcto_2025_pravila.pdf",
    linkText: "Правила PDF",
    badge: { text: "Скоро", variant: "soon" as const },
  },
  {
    icon: Award,
    title: "Аккредитация производителем",
    description:
      "Получите официальную аккредитацию от ведущих производителей автокомпонентов. Повысьте статус вашего автосервиса и доверие клиентов.",
    linkText: "Узнать больше",
    badge: { text: "Доступно", variant: "active" as const },
  },
  {
    icon: GraduationCap,
    title: "Академия СТО",
    description:
      "Мы обучаем автосервисные предприятия эффективным технологиям управления и лучшим методам продаж услуг и запасных частей.",
    linkText: "Узнать больше",
    badge: { text: "Доступно", variant: "active" as const },
  },
  {
    icon: Headset,
    title: "MyTeam",
    description:
      "Партнерская программа с услугами колл-центра для СТО. NPS-опросы и информирование клиентов о предложениях. Повышаем лояльность и прибыль.",
    linkText: "Узнать больше",
    badge: { text: "Доступно", variant: "active" as const },
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 text-gray-900">Наши проекты</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Шесть ключевых возможностей для роста вашего автосервиса
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group bg-white/70 backdrop-blur-md border ${
        project.featured ? "border-blue-200 bg-gradient-to-br from-blue-50/50 to-purple-50/50" : "border-gray-200/80"
      } rounded-3xl p-8 hover:-translate-y-3 hover:shadow-2xl hover:border-blue-600 transition-all duration-300 h-full flex flex-col`}
    >
      <div
        className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
          project.featured ? "bg-blue-100 text-blue-600" : "bg-blue-50 text-blue-600"
        }`}
      >
        <Icon className="w-9 h-9" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-gray-900">{project.title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{project.description}</p>

      <div className="flex items-center justify-between mt-auto">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-700 px-5 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200"
          >
            {project.linkText}
          </a>
        ) : (
          <button className="text-sm font-semibold text-white px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            {project.linkText}
          </button>
        )}

        <Badge variant={project.badge.variant}>{project.badge.text}</Badge>
      </div>
    </motion.div>
  )
}

function Badge({ variant, children }: { variant: "active" | "soon" | "open"; children: React.ReactNode }) {
  const styles = {
    active: "bg-green-50 text-green-700 border-green-200",
    soon: "bg-amber-50 text-amber-700 border-amber-200",
    open: "bg-blue-50 text-blue-700 border-blue-200",
  }

  return <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${styles[variant]}`}>{children}</span>
}
