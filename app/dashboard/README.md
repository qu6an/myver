# Autocom Vite React TypeScript Tailwind (starter)

Сборка: Vite + React + TypeScript + Tailwind + Framer Motion.

Ключевые моменты:
- Проект сконвертирован из `вход2.html` (оригинал загружен). См. исходный макет. fileciteturn1file0
- Компоненты используют Framer Motion для анимаций.
- Tailwind заменил единый CSS (в проекте оставлены утилиты и базовые переменные).
- Пример корректного рендера компонента, переданного в пропсах:

```tsx
type IconProp = React.ComponentType<{className?: string}>

function IconWrapper({Icon}:{Icon:IconProp}) {
  // Правильно: использовать как компонент
  return <Icon className="w-6 h-6" />
}
```

Инструкции:
1. Установите зависимости: `npm install`
2. Запустить разработку: `npm run dev`


### Что добавлено
- ModalProvider + UI Modal (контекст + портал). Старые `alert()` заменены на вызовы модального окна через глобальный handle для быстрой миграции.
- LazyImage компонент (IntersectionObserver + native lazy-loading fallback).
- Локальные SVG-логотипы в `src/assets/partners`.
- Расширена тема Tailwind (шрифты, цвета, тени) для более точной типографики.
