"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Trophy, GraduationCap, Gamepad2 } from "lucide-react"
import { useCalendar } from "./useCalendar"
import type { CalendarEvent } from "./types"

const eventIcons = {
  quiz: Gamepad2,
  competition: Trophy,
  training: GraduationCap,
  other: Calendar,
}

const eventColors = {
  quiz: "bg-blue-50 text-blue-600 border-blue-200",
  competition: "bg-purple-50 text-purple-600 border-purple-200",
  training: "bg-green-50 text-green-600 border-green-200",
  other: "bg-gray-50 text-gray-600 border-gray-200",
}

export function CalendarWidget() {
  const [selectedType, setSelectedType] = useState<CalendarEvent["type"] | "all">("all")

  const { events, loading, addEvent, getUpcomingEvents, getEventsByType } = useCalendar({
    initialEvents: [
      {
        id: "1",
        title: "Автомобильная викторина",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        type: "quiz",
        description: "Еженедельная викторина с призами",
      },
      {
        id: "2",
        title: "Конкурс Автосервис года",
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        type: "competition",
        description: "Начало приёма заявок",
      },
      {
        id: "3",
        title: "Вебинар: Управление автосервисом",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        type: "training",
        description: "Академия СТО",
      },
    ],
    autoRefresh: true,
    refreshInterval: 60000,
  })

  const displayEvents = selectedType === "all" ? getUpcomingEvents(30) : getEventsByType(selectedType)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-md border border-gray-200/80 rounded-3xl p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Календарь событий</h3>
        {loading && <div className="text-sm text-gray-500">Обновление...</div>}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        <FilterButton active={selectedType === "all"} onClick={() => setSelectedType("all")}>
          Все
        </FilterButton>
        <FilterButton active={selectedType === "quiz"} onClick={() => setSelectedType("quiz")}>
          Викторины
        </FilterButton>
        <FilterButton active={selectedType === "competition"} onClick={() => setSelectedType("competition")}>
          Конкурсы
        </FilterButton>
        <FilterButton active={selectedType === "training"} onClick={() => setSelectedType("training")}>
          Обучение
        </FilterButton>
      </div>

      <div className="space-y-4">
        {displayEvents.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Нет предстоящих событий</p>
        ) : (
          displayEvents.map((event, index) => <EventCard key={event.id} event={event} index={index} />)
        )}
      </div>
    </motion.div>
  )
}

function FilterButton({
  active,
  children,
  onClick,
}: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
        active ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  )
}

function EventCard({ event, index }: { event: CalendarEvent; index: number }) {
  const Icon = eventIcons[event.type]
  const colorClass = eventColors[event.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors duration-200"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
        <p className="text-xs text-gray-500">
          {event.date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  )
}
