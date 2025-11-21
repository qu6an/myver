# AUTOCOM Components Library

Модульная библиотека компонентов для автосервисной платформы AUTOCOM.

## Возможности

- 🎨 **Модульная архитектура** - Переиспользуемые компоненты для web и mobile
- ⚡ **TypeScript** - Полная типизация для безопасности разработки
- 🎭 **Анимации** - Framer Motion для web, Animated API для React Native
- 🎯 **Tailwind CSS v4** - Современная стилизация с дизайн-токенами
- 📚 **Storybook** - Интерактивная документация компонентов
- 📱 **React Native** - Полностью нативная версия без web зависимостей

## Быстрый старт

### Установка

\`\`\`bash
npm install
\`\`\`

### Разработка

\`\`\`bash
# Запуск Next.js приложения
npm run dev

# Запуск Storybook
npm run storybook

# Сборка проекта
npm run build
\`\`\`

## Компоненты

### AutoserviceCard

Карточка проекта/услуги с анимациями и вариантами отображения.

**Варианты:**
- `default` - Стандартный стиль
- `featured` - Акцентный стиль с градиентом
- `glass` - Прозрачный glass-эффект

**Примеры:**

\`\`\`tsx
import { AutoserviceCard } from "@/components/autoservice/AutoserviceCard"
import { HelpCircle } from 'lucide-react'

<AutoserviceCard
  project={{
    id: "quiz",
    icon: HelpCircle,
    title: "Автомобильная викторина",
    description: "Зарабатывайте очки за правильные ответы.",
    linkText: "Правила",
    badge: { text: "Активно", variant: "active" }
  }}
  variant="default"
  showTwinkle={true}
  onAction={(id) => console.log(id)}
/>
\`\`\`

### CalendarWidget

Виджет календаря событий с фильтрацией.

\`\`\`tsx
import { CalendarWidget } from "@/components/autoservice/CalendarWidget"

<CalendarWidget />
\`\`\`

## Hooks

### useTwinkle

Хук для создания sparkles анимаций.

\`\`\`tsx
const twinkles = useTwinkle({
  count: 20,
  minSize: 2,
  maxSize: 4,
  minDuration: 2,
  maxDuration: 4
})
\`\`\`

### useCalendar

Хук для управления календарем событий.

\`\`\`tsx
const {
  events,
  loading,
  addEvent,
  removeEvent,
  updateEvent,
  getUpcomingEvents,
  getEventsByType
} = useCalendar({
  autoRefresh: true,
  refreshInterval: 60000
})
\`\`\`

## React Native версия

Импортируйте `.native.tsx` версии компонентов:

\`\`\`tsx
import { AutoserviceCard } from "./components/autoservice/AutoserviceCard.native"
\`\`\`

## Storybook

Просмотр всех компонентов в интерактивном режиме:

\`\`\`bash
npm run storybook
\`\`\`

Откроется по адресу: http://localhost:6006

## Структура проекта

\`\`\`
components/autoservice/
├── AutoserviceCard.tsx          # Web версия
├── AutoserviceCard.native.tsx   # React Native версия
├── AutoserviceCard.stories.tsx  # Storybook stories
├── CalendarWidget.tsx           # Виджет календаря
├── types.ts                     # TypeScript типы
├── variants.ts                  # Варианты стилей
├── useTwinkle.ts               # Хук анимации
├── useCalendar.ts              # Хук календаря
└── README.md                    # Документация
\`\`\`

## Технологии

- **Next.js 16** - React фреймворк с App Router
- **React 19** - Библиотека UI
- **TypeScript 5** - Типизация
- **Tailwind CSS v4** - Утилитарные стили
- **Framer Motion** - Анимации
- **Storybook 8** - Документация компонентов
- **Lucide React** - Иконки
- **React Native** - Mobile приложения

## Демо

Доступна демо-страница со всеми вариантами компонентов:

\`\`\`bash
npm run dev
\`\`\`

Откройте: http://localhost:3000/demo

## Лицензия

MIT

## Контакты

- Email: support@autocom.ru
- Website: https://autocom.ru
\`\`\`
