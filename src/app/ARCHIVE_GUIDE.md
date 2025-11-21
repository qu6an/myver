# Руководство по сборке архива компонентов AUTOCOM

## Структура архива

Архив должен содержать следующие директории и файлы:

\`\`\`
autocom-components/
├── components/
│   └── autoservice/
│       ├── AutoserviceCard.tsx
│       ├── AutoserviceCard.native.tsx
│       ├── AutoserviceCard.stories.tsx
│       ├── CalendarWidget.tsx
│       ├── types.ts
│       ├── variants.ts
│       ├── useTwinkle.ts
│       ├── useCalendar.ts
│       └── README.md
├── .storybook/
│   ├── main.ts
│   └── preview.tsx
├── app/
│   └── demo/
│       └── page.tsx
├── package.json
├── ARCHIVE_GUIDE.md
└── README.md
\`\`\`

## Шаги для сборки архива

### 1. Использование встроенной функции v0

В v0 UI:
1. Нажмите на три точки в правом верхнем углу блока с кодом
2. Выберите "Download ZIP"
3. Архив будет загружен автоматически

### 2. Ручная сборка (альтернатива)

Если вы работаете локально:

\`\`\`bash
# Создайте временную директорию
mkdir autocom-components
cd autocom-components

# Скопируйте необходимые файлы
cp -r components/autoservice ./components/
cp -r .storybook ./
cp -r app/demo ./app/
cp package.json ./
cp ARCHIVE_GUIDE.md ./
cp README.md ./

# Создайте архив
cd ..
zip -r autocom-components.zip autocom-components/
\`\`\`

### 3. GitHub экспорт

В v0 UI:
1. Нажмите на иконку GitHub в правом верхнем углу
2. Выберите "Push to GitHub"
3. Клонируйте репозиторий локально
4. Создайте архив нужных компонентов

## Что входит в архив

### Web версия (Next.js)
- ✅ Полностью типизированные TypeScript компоненты
- ✅ Framer Motion анимации
- ✅ Tailwind CSS v4 стили
- ✅ Storybook конфигурация
- ✅ Демо-страница с примерами

### React Native версия
- ✅ Нативные компоненты без web зависимостей
- ✅ React Native Animated API
- ✅ StyleSheet оптимизация
- ✅ Полная совместимость с iOS/Android

### Hooks
- ✅ useTwinkle - анимация sparkles эффектов
- ✅ useCalendar - управление календарем событий

### Storybook
- ✅ Интерактивная документация
- ✅ Все варианты компонентов
- ✅ Playground для экспериментов

## Установка из архива

\`\`\`bash
# Распакуйте архив
unzip autocom-components.zip
cd autocom-components

# Установите зависимости
npm install

# Запустите Storybook
npm run storybook

# Или запустите демо
npm run dev
# Откройте http://localhost:3000/demo
\`\`\`

## Требования

### Web
- Node.js 18+
- Next.js 16+
- React 19+
- TypeScript 5+

### React Native
- React Native 0.72+
- React Native Reanimated 3+
- React Native Gesture Handler 2+

## Поддержка

Вопросы и предложения направляйте в issues проекта или на почту support@autocom.ru
\`\`\`
