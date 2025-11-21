# Autoservice Components

Модульная библиотека компонентов для платформы АВТОКОМ.

## Структура

\`\`\`
components/autoservice/
├── AutoserviceCard.tsx          # Web версия (Next.js + Framer Motion)
├── AutoserviceCard.native.tsx   # React Native версия
├── AutoserviceCard.stories.tsx  # Storybook stories
├── types.ts                     # TypeScript типы
├── variants.ts                  # Варианты стилей
├── useTwinkle.ts               # Хук для анимации sparkles
├── useCalendar.ts              # Хук для календаря событий
└── README.md                    # Документация
\`\`\`

## Установка

### Web (Next.js)

\`\`\`bash
npm install framer-motion lucide-react
\`\`\`

### React Native

\`\`\`bash
npm install react-native-reanimated react-native-gesture-handler
npx pod-install # для iOS
\`\`\`

## Использование

### Web версия

\`\`\`tsx
import { AutoserviceCard } from "@/components/autoservice/AutoserviceCard"
import { HelpCircle } from 'lucide-react'

const project = {
  id: "quiz",
  icon: HelpCircle,
  title: "Автомобильная викторина",
  description: "Зарабатывайте очки за правильные ответы.",
  linkText: "Правила",
  badge: { text: "Активно", variant: "active" },
}

<AutoserviceCard 
  project={project} 
  variant="default"
  showTwinkle={true}
  onAction={(id) => console.log(id)}
/>
\`\`\`

### React Native версия

\`\`\`tsx
import { AutoserviceCard } from "./components/autoservice/AutoserviceCard.native"

<AutoserviceCard 
  project={project}
  variant="featured"
  onAction={(id) => handleAction(id)}
/>
\`\`\`

### Hooks

#### useTwinkle

\`\`\`tsx
import { useTwinkle } from "./useTwinkle"

const twinkles = useTwinkle({ 
  count: 20, 
  minSize: 2, 
  maxSize: 4 
})
\`\`\`

#### useCalendar

\`\`\`tsx
import { useCalendar } from "./useCalendar"

const { events, addEvent, getUpcomingEvents } = useCalendar({
  autoRefresh: true,
  refreshInterval: 60000
})
\`\`\`

## Storybook

Запуск:

\`\`\`bash
npm run storybook
\`\`\`

Просмотр всех вариантов компонента в интерактивном режиме.

## Варианты

- **default**: Стандартный стиль
- **featured**: Акцентный стиль с градиентом
- **glass**: Стеклянный эффект

## Badge статусы

- **active**: Зелёный (активно)
- **soon**: Оранжевый (скоро)
- **open**: Синий (открыта регистрация)

## Лицензия

MIT
\`\`\`

```json file="" isHidden
