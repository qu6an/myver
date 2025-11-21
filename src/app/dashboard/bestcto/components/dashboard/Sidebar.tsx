"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Car,
  PuzzleIcon as PuzzlePiece,
  Trophy,
  GraduationCap,
  Award,
  ShoppingCart,
  Medal,
  Calendar,
  Gift,
  Settings,
  HelpCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  icon: React.ElementType
  href?: string
  submenu?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  { title: "ПАНЕЛЬ УПРАВЛЕНИЯ", icon: LayoutDashboard, href: "#" },
  {
    title: "EVERYCAR",
    icon: Car,
    submenu: [
      { title: "Соревнование", href: "#" },
      { title: "Розыгрыш билетов", href: "#" },
      { title: "Достижения", href: "#" },
      { title: "Статистика", href: "#" },
      { title: "Расчёт GRADE", href: "#" },
      { title: "Мой автосервис", href: "#" },
      { title: "Закупки", href: "#" },
    ],
  },
  {
    title: "АВТОМОБИЛЬНАЯ ВИКТОРИНА",
    icon: PuzzlePiece,
    submenu: [
      { title: "Обзор", href: "#" },
      { title: "Розыгрыш билетов", href: "#" },
      { title: "Награды", href: "#" },
      { title: "Статистика", href: "#" },
      { title: "Мой автосервис", href: "#" },
    ],
  },
  {
    title: "АВТОСЕРВИС ГОДА",
    icon: Trophy,
    submenu: [
      { title: "Мои задания", href: "#" },
      { title: "Этапы конкурса", href: "#" },
      { title: "Команда", href: "#" },
      { title: "Рейтинги", href: "#" },
      { title: "Призы и награды", href: "#" },
      { title: "Правила", href: "#" },
    ],
  },
  {
    title: "АКАДЕМИЯ СТО",
    icon: GraduationCap,
    submenu: [
      { title: "Тесты", href: "#" },
      { title: "Воркшопы", href: "#" },
      { title: "Курсы", href: "#" },
      { title: "Интенсивы", href: "#" },
      { title: "База знаний", href: "#" },
      { title: "Расписание", href: "#" },
      { title: "Отпуск за знаниями", href: "#" },
      { title: "Преподаватели", href: "#" },
    ],
  },
  {
    title: "СЕРТИФИКАЦИЯ СТО",
    icon: Award,
    submenu: [
      { title: "Условия участия", href: "#" },
      { title: "Статус", href: "#" },
      { title: "Производители", href: "#" },
    ],
  },
  {
    title: "ИНТЕРНЕТ-МАГАЗИН",
    icon: ShoppingCart,
    submenu: [
      { title: "Каталог", href: "#" },
      { title: "Корзина", href: "#" },
      { title: "Избранное", href: "#" },
      { title: "Покупки", href: "#" },
    ],
  },
  { title: "ЗАЛ СЛАВЫ", icon: Medal, href: "#" },
  { title: "КАЛЕНДАРЬ", icon: Calendar, href: "#" },
  {
    title: "БЕСПЛАТНО",
    icon: Gift,
    submenu: [
      { title: "Бесплатные вебинары", href: "#" },
      { title: "Воркшопы", href: "#" },
      { title: "Чек-листы и шаблоны", href: "#" },
      { title: "Блог", href: "#" },
      { title: "Кейсы автосервисов", href: "#" },
    ],
  },
]

const additionalItems: NavItem[] = [
  { title: "НАСТРОЙКИ", icon: Settings, href: "#" },
  {
    title: "ПОМОЩЬ",
    icon: HelpCircle,
    submenu: [
      { title: "О проекте", href: "#" },
      { title: "FAQ", href: "#" },
    ],
  },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(["АВТОСЕРВИС ГОДА"])

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-indigo-100">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <img src="https://autocom.parts/i/logo.svg" alt="АВТОКОМ" className="h-8 w-auto" />
          <span className="text-sm font-medium text-indigo-900">Личный кабинет участника</span>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Main Navigation */}
        <div>
          <div className="text-xs font-semibold text-indigo-400 mb-3 px-3">ГЛАВНАЯ</div>
          {navItems.map((item, index) => (
            <NavItemComponent
              key={item.title}
              item={item}
              index={index}
              expanded={expandedItems.includes(item.title)}
              onToggle={() => toggleSubmenu(item.title)}
            />
          ))}
        </div>

        {/* Additional Navigation */}
        <div>
          <div className="text-xs font-semibold text-indigo-400 mb-3 px-3">ДОПОЛНИТЕЛЬНО</div>
          {additionalItems.map((item, index) => (
            <NavItemComponent
              key={item.title}
              item={item}
              index={index}
              expanded={expandedItems.includes(item.title)}
              onToggle={() => toggleSubmenu(item.title)}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-indigo-100">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
          <img
            src="https://autocom.parts/i/banners/everycar_partnrs/LYNX.svg"
            alt="LYNXauto"
            className="h-8 w-auto mb-2"
          />
          <span className="text-xs text-indigo-600 font-medium">Генеральный партнер</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6 text-indigo-600" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen w-80 bg-white border-r border-indigo-100 shadow-xl z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-80 bg-white shadow-xl z-50"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-indigo-600" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function NavItemComponent({
  item,
  index,
  expanded,
  onToggle,
}: {
  item: NavItem
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  const Icon = item.icon
  const hasSubmenu = item.submenu && item.submenu.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="mb-1"
    >
      <button
        onClick={hasSubmenu ? onToggle : undefined}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
          "hover:bg-indigo-50 hover:translate-x-1",
          expanded && hasSubmenu && "bg-indigo-50",
        )}
      >
        <Icon className="w-5 h-5 text-indigo-600 flex-shrink-0" />
        <span className="text-sm font-medium text-indigo-900 flex-1 text-left">{item.title}</span>
        {hasSubmenu && (
          <ChevronRight className={cn("w-4 h-4 text-indigo-400 transition-transform", expanded && "rotate-90")} />
        )}
      </button>

      <AnimatePresence>
        {hasSubmenu && expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-8 mt-1 space-y-1">
              {item.submenu!.map((subitem) => (
                <a
                  key={subitem.title}
                  href={subitem.href}
                  className="block px-3 py-2 text-sm text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  {subitem.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
